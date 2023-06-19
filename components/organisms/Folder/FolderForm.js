import { useContext } from 'react'
import { getFolders, addFolderToDB, updateFolderToDB } from "../../../firebase/Gallary/folderOperations";
import InputGroup from "@/components/atoms/InputGroup";
import formStyles from '@/styles/Form.module.css'
import { AppContext } from "../../Context"
import Button from '@/components/atoms/Button';

function FolderForm({ setToggle }) {
    const { folder, setFolder, updateId, setFolders, update, setUpdate } = useContext(AppContext)

    return (
        <form className={`flex gap-8 flex-wrap items-center justify-center`}>
            <InputGroup
                type="text"
                className={formStyles.input_sm}
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                title=""
                name="Folder name"
                placeholder="Enter Folder Name"
            />
            {update ?
                <div className="flex gap-8 justify-center flex-wrap p-x-4">
                    <Button onClick={(e) => {
                        updateFolderToDB(e, folder, setFolder, updateId)
                        getFolders(setFolders)
                        setUpdate(false)
                        setToggle("")
                    }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Update</Button>
                    <Button className={`${formStyles.button_sm} ${formStyles.button_cancel}`} onClick={() => {
                        setFolder("")
                        setUpdate(false)
                        setToggle("")
                    }}>Cancel</Button>
                </div>
                :
                // <Button onClick={(e) => {
                //     addFolderToDB(e, folder, setFolder)
                //     getFolders(setFolders)
                //     setToggle("")
                // }} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Add</Button>
                <Button onClick={(e) => {
                    addFolderToDB(e, folder, setFolder)
                    getFolders(setFolders)
                    setToggle("")
                }}
                    className="btn--blue-hover">
                    Add
                </Button>
            }
        </form>

    )
}

export default FolderForm