import {useContext } from 'react'
import { getFolders, addFolderToDB, updateFolderToDB } from "../../firebase/Gallary/folderOperations";
import InputGroup from "./InputGroup";
import formStyles from '@/styles/Form.module.css'
import { AppContext } from "../Context"

function FolderForm() {
    const { folder, setFolder, updateId, setFolders, update, setUpdate } = useContext(AppContext)


    return (
        <div className="w-full fixed top-18 md:top-19 flex gap-4  justify-center flex-wrap z-100 py-3 bg-slate-200 -ml-6">
            <form className={`flex gap-8 flex-wrap items-center`}>
                <InputGroup
                    title=""
                    type="text"
                    name="Folder name"
                    placeholder="Enter Folder Name"
                    className={formStyles.input_sm}
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                />
                {update ?
                    <div className="flex gap-8 justify-center flex-wrap p-x-4">
                        <button onClick={(e) => {
                            updateFolderToDB(e, folder, setFolder, updateId)
                            getFolders(setFolders)
                            setUpdate(false)
                        }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Update</button>
                        <button className={`${formStyles.button_sm} ${formStyles.button_cancel}`} onClick={() => {
                            setFolder("")
                            setUpdate(false)
                        }}>Cancel</button>
                    </div>
                    :
                    <button onClick={(e) => {
                        addFolderToDB(e, folder, setFolder)
                        getFolders(setFolders)
                    }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Add</button>
                }
            </form>
        </div>
    )
}

export default FolderForm