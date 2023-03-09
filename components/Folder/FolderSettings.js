import { useState, useContext } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { RxCross1 } from "react-icons/rx"
import { getId, deleteFolder, deleteFolderImages, updateFolderColor } from "../../firebase/Gallary/folderOperations"
import { AppContext } from '../Context'
import styles from "@/styles/Gallary.module.css"
import Details from '../mini-components/Details'
import PropTypes from "prop-types";


function FolderSettings({ id, folderName, folderUrl, createdAt }) {
    const { images, setUpdate, updateId,setUpdateId, setFolder, setFolders, overlay, setOverlay } = useContext(AppContext)

    const [settings, setSettings] = useState(false)
    const [detailPopup, setDetailPopup] = useState(false)
    const [colorsPopup, setColorsPopup] = useState(false)

    const colors = ["#FFACAC","#FFBFA9","#FFEBB4","#3A98B9","#F7C8E0","#B9F3E4","#E3DFFD","#B9F3FC",
                   "#FFCEFE","#E3ACF9","#D7E9B9","#9EA1D4","#CEEDC7","#ADA2FF","#F8F988","#DEBACE"]

    return (
        <>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div onMouseLeave={() => setSettings(false)}>
                <button className="absolute right-1 top-4"
                    onClick={() => setSettings(!settings)}
                ><BiDotsVerticalRounded /></button>
                <div className={`flex flex-col items-start gap-2 absolute z-50 right-1 top-2 px-4 py-2 rounded-lg bg-white
                                ${settings ? "" : "hidden"}`}
                    onMouseLeave={() => setSettings(false)}>
                    <button className='text-sm' onClick={() => {
                        getId(id, setUpdateId, folderName, setFolder)
                        setUpdate(true)
                        setSettings(false)
                    }}>Rename</button>
                    <button className='text-sm' onClick={() => {
                        setDetailPopup(true)
                        setOverlay(true)
                    }}>
                        Details
                    </button>
                    <button className='text-sm' onClick={(e) => {
                        getId(id, setUpdateId, folderName, setFolder)
                        setColorsPopup(true);
                        setOverlay(true)
                    }}>
                        Color
                    </button>
                    <button className='text-sm text-red-600' onClick={() => {
                        deleteFolderImages(folderUrl, images)
                        setSettings(false)
                    }}>Empty Folder</button>
                    <button className='text-sm text-red-600' onClick={() => {
                        deleteFolder(id, setFolders, folderUrl, images)
                        setSettings(false)
                    }}>Delete</button>
                </div>
            </div>

            {/* COLOR PALLETE */}
            <div className={`${colorsPopup ? "" : "hidden"} w-72 md:w-96 fixed absolute-center z-104 mt-2 bg-white p-5 rounded-lg`
            }>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color,index) => {
                        return (
                            <button key={index} className="w-6 h-6 md:h-10 md:w-10 rounded-full border border-slate-700" style={{ backgroundColor: color }}
                            onClick={(e) => {
                                updateFolderColor(e,updateId,color,setFolders)
                                setOverlay(false)
                                setColorsPopup(false)
                            }}></button>
                        )
                    })}
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
                    { name: "CreatedAt", value: createdAt },
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