import { useState, useContext, useMemo } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FcViewDetails, FcEmptyTrash, FcDeleteDatabase } from "react-icons/fc";
import { VscSymbolColor } from "react-icons/vsc";
import { toast } from 'react-toastify';
import { getId, deleteFolder, deleteFolderImages, updateFolderColor } from "../../../firebase/Gallary/folderOperations";
import { AppContext } from '../../Context';
import styles from "@/styles/Gallary.module.css";
import Details from '@/molecules/Details';
import PropTypes from "prop-types";
import Button from '@/components/atoms/Button';

const FolderSettings = ({ id, folderName, folderUrl, createdAt, setToggle }) => {
    const { images, setUpdate, updateId, setUpdateId, setFolder, setFolders, overlay, setOverlay } = useContext(AppContext);

    const [settings, setSettings] = useState(false);
    const [detailPopup, setDetailPopup] = useState(false);
    const [colorsPopup, setColorsPopup] = useState(false);

    const colors = useMemo(() => [
        "#FFACAC", "#FFBFA9", "#FFEBB4", "#3A98B9", "#F7C8E0", "#B9F3E4", "#E3DFFD", "#B9F3FC",
        "#FFCEFE", "#E3ACF9", "#D7E9B9", "#9EA1D4", "#CEEDC7", "#ADA2FF", "#F8F988", "#DEBACE"
    ], []);

    const colorsList = useMemo(() =>
        colors.map((color, index) => (
            <Button
                key={index}
                className="w-6 h-6 md:h-10 md:w-10 rounded-full border border-slate-700"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                    updateFolderColor(e, updateId, color, setFolders);
                    setOverlay(false);
                    setColorsPopup(false);
                }}
            ></Button>
        )),
        [colors]
    );

    const handleToggleSettings = () => {
        setSettings(!settings);
    };

    const handleRenameClick = () => {
        getId(id, setUpdateId, folderName, setFolder);
        setUpdate(true);
        setSettings(false);
        setToggle("ADD");
    };

    const handleDetailsClick = () => {
        setDetailPopup(true);
        setOverlay(true);
    };

    const handleColorsClick = () => {
        getId(id, setUpdateId, folderName, setFolder);
        setColorsPopup(true);
        setOverlay(true);
    };

    const handleEmptyFolderClick = () => {
        deleteFolderImages(folderUrl, images);
        setSettings(false);
        toast.error('Folder is emptied');
    };

    const handleDeleteClick = () => {
        deleteFolder(id, setFolders, folderUrl, images);
        setSettings(false);
        toast.error('Folder is deleted');
    };

    return (
        <>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div onMouseLeave={() => setSettings(false)}>
                <Button
                    className="absolute right-1 top-4"
                    onClick={handleToggleSettings}
                >
                    <BiDotsVerticalRounded color='black' />
                </Button>
                <div className={`flex flex-col items-start gap-4 text-slate-800 font-semibold absolute z-50 right-1 top-2 px-4 py-2 rounded-lg bg-white ${settings ? "" : "hidden"}`}
                    onMouseLeave={() => setSettings(false)}>
                    <Button className='text-sm flex gap-2 items-center' onClick={handleRenameClick}>
                        <MdDriveFileRenameOutline /> Rename
                    </Button>
                    <Button className='text-sm flex gap-2 items-center' onClick={handleDetailsClick}>
                        <FcViewDetails /> Details
                    </Button>
                    <Button className='text-sm flex gap-2 items-center' onClick={handleColorsClick}>
                        <VscSymbolColor /> Color
                    </Button>
                    <Button className='text-sm flex gap-2 items-center' onClick={handleEmptyFolderClick}>
                        <FcEmptyTrash /> Empty Folder
                    </Button>
                    <Button className='text-sm flex gap-2 items-center' onClick={handleDeleteClick}>
                        <FcDeleteDatabase /> Delete
                    </Button>
                </div>
            </div>

            {/* COLOR PALETTE */}
            <div className={`${colorsPopup ? "" : "hidden"} w-72 md:w-96 fixed absolute-center z-106 mt-2 bg-white p-5 rounded-lg`}>
                <div className="flex flex-wrap gap-3">
                    {colorsList}
                </div>
                <Button className='text-sm absolute top-2 right-2' onClick={() => {
                    setOverlay(false);
                    setColorsPopup(false);
                }}>
                    <RxCross1 size="16px" color='crimson' />
                </Button>
            </div>

            <Details
                details={[
                    { name: "Name", value: folderName },
                    { name: "Created-at", value: createdAt },
                    { name: "ID", value: id }
                ]}
                detailPopup={detailPopup}
                setDetailPopup={setDetailPopup}
                setOverlay={setOverlay}
            />
        </>
    );
};

FolderSettings.propTypes = {
    id: PropTypes.string,
    folderName: PropTypes.string,
    folderUrl: PropTypes.string,
    createdAt: PropTypes.string,
    setToggle: PropTypes.func
};

export default FolderSettings;
