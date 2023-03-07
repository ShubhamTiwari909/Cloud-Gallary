import { useState, useContext } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { getId, deleteFolder } from "../../firebase/Gallary/folderOperations"
import { AppContext } from '../Context'
import styles from "@/styles/Gallary.module.css"
import Details from '../mini-components/Details'

function FolderSettings({ id, folderName, folderUrl, createdAt }) {
    const { images, setUpdate, setUpdateId, setFolder, setFolders } = useContext(AppContext)

    const [settings, setSettings] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [detailPopup, setDetailPopup] = useState(false)

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
                    <button className='text-sm text-red-600' onClick={() => {
                        deleteFolder(id, setFolders, folderUrl, images)
                        setSettings(false)
                    }}>Delete</button>
                </div>
            </div>
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

export default FolderSettings