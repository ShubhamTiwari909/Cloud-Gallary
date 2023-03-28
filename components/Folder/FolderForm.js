import { useContext } from 'react'
import { getFolders, addFolderToDB, updateFolderToDB } from "../../firebase/Gallary/folderOperations";
import InputGroup from "../mini-components/InputGroup";
import formStyles from '@/styles/Form.module.css'
import { AppContext } from "../Context"

function FolderForm({ setToggle }) {
    const { folder, setFolder, updateId, setFolders, update, setUpdate } = useContext(AppContext)

    return (
        <form className={`flex gap-8 flex-wrap items-center justify-center`}>
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
                        setToggle("")
                    }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Update</button>
                    <button className={`${formStyles.button_sm} ${formStyles.button_cancel}`} onClick={() => {
                        setFolder("")
                        setUpdate(false)
                        setToggle("")
                    }}>Cancel</button>
                </div>
                :
                <button onClick={(e) => {
                    addFolderToDB(e, folder, setFolder)
                    getFolders(setFolders)
                    setToggle("")
                }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Add</button>
            }
        </form>

    )
}

export default FolderForm