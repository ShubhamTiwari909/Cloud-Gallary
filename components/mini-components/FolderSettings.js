import { useState, useContext } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { getId, deleteFolder } from "../../firebase/Gallary/folderOperations"
import { AppContext } from '../Context'


function FolderSettings({ id, folderName, folderUrl, setUpdate, setUpdateId, setFolder, setFolders }) {
    const { images } = useContext(AppContext)
    const [settings, setSettings] = useState(false)
    return (
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
                    deleteFolder(id, setFolders, folderUrl, images)
                    setSettings(false)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default FolderSettings