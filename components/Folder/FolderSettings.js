import { useState, useContext, useMemo } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { RxCross1 } from "react-icons/rx"
import { MdDriveFileRenameOutline } from "react-icons/md"
import { FcViewDetails, FcEmptyTrash, FcDeleteDatabase } from "react-icons/fc"
import { VscSymbolColor } from "react-icons/vsc"
import { toast } from 'react-toastify';
import { getId, deleteFolder, deleteFolderImages, updateFolderColor } from "../../firebase/Gallary/folderOperations"
import { AppContext } from '../Context'
import styles from "@/styles/Gallary.module.css"
import Details from '../mini-components/Details'
import PropTypes from "prop-types";


function FolderSettings({ id, folderName, folderUrl, createdAt, setToggle }) {
    const { images, setUpdate, updateId, setUpdateId, setFolder, setFolders, overlay, setOverlay } = useContext(AppContext)

    const [settings, setSettings] = useState(false)
    const [detailPopup, setDetailPopup] = useState(false)
    const [colorsPopup, setColorsPopup] = useState(false)

    const colors = ["#FFACAC", "#FFBFA9", "#FFEBB4", "#3A98B9", "#F7C8E0", "#B9F3E4", "#E3DFFD", "#B9F3FC",
        "#FFCEFE", "#E3ACF9", "#D7E9B9", "#9EA1D4", "#CEEDC7", "#ADA2FF", "#F8F988", "#DEBACE"]


    const colorsList = useMemo(() =>
        colors.map((color, index) => {
            return (
                <button key={index} className="w-6 h-6 md:h-10 md:w-10 rounded-full border border-slate-700" style={{ backgroundColor: color }}
                    onClick={(e) => {
                        updateFolderColor(e, updateId, color, setFolders)
                        setOverlay(false)
                        setColorsPopup(false)
                    }}></button>
            )
        }), [colors])
    return (
        <>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div onMouseLeave={() => setSettings(false)}>
                <button className="absolute right-1 top-4"
                    onClick={() => setSettings(!settings)}
                ><BiDotsVerticalRounded color='black' /></button>
                <div className={`flex flex-col items-start gap-4 text-slate-800 font-semibold absolute z-50 right-1 top-2 px-4 py-2 rounded-lg bg-white
                                ${settings ? "" : "hidden"}`}
                    onMouseLeave={() => setSettings(false)}>
                    <button className='text-sm flex gap-2 items-center' onClick={() => {
                        getId(id, setUpdateId, folderName, setFolder)
                        setUpdate(true)
                        setSettings(false)
                        setToggle("ADD")
                    }}><MdDriveFileRenameOutline /> Rename</button>
                    <button className='text-sm flex gap-2 items-center' onClick={() => {
                        setDetailPopup(true)
                        setOverlay(true)
                    }}>
                        <FcViewDetails /> Details
                    </button>
                    <button className='text-sm flex gap-2 items-center' onClick={(e) => {
                        getId(id, setUpdateId, folderName, setFolder)
                        setColorsPopup(true);
                        setOverlay(true)
                    }}>
                        <VscSymbolColor /> Color
                    </button>
                    <button className='text-sm flex gap-2 items-center' onClick={() => {
                        deleteFolderImages(folderUrl, images)
                        setSettings(false)
                        toast.error('Folder is emptied')
                    }}><FcEmptyTrash /> Empty Folder</button>
                    <button className='text-sm flex gap-2 items-center' onClick={() => {
                        deleteFolder(id, setFolders, folderUrl, images)
                        setSettings(false)
                        toast.error('Folder is deleted')
                    }}><FcDeleteDatabase /> Delete</button>
                </div>
            </div>

            {/* COLOR PALLETE */}
            <div className={`${colorsPopup ? "" : "hidden"} w-72 md:w-96 fixed absolute-center z-104 mt-2 bg-white p-5 rounded-lg`
            }>
                <div className="flex flex-wrap gap-3">
                    {colorsList}
                </div>
                <button className='text-sm absolute top-2 right-2' onClick={() => {
                    setOverlay(false)
                    setColorsPopup(false)
                }}>
                    <RxCross1 size="16px" color='crimson' />
                </button>
            </div >


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
    )
}

FolderSettings.propTypes = {
    settings: PropTypes.bool,
    detailPopup: PropTypes.bool,
    setSettings: PropTypes.func,
    setDetailPopup: PropTypes.func,
}

export default FolderSettings