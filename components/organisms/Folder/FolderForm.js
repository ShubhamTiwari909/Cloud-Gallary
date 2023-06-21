import { useContext } from 'react';
import { getFolders, addFolderToDB, updateFolderToDB } from "../../../firebase/Gallary/folderOperations";
import InputGroup from "@/components/atoms/InputGroup";
import formStyles from '@/styles/Form.module.css';
import { AppContext } from "../../Context";
import Button from '@/components/atoms/Button';

function FolderForm({ setToggle }) {
    const { folder, setFolder, updateId, setFolders, update, setUpdate } = useContext(AppContext);

    const handleFolderChange = (e) => {
        setFolder(e.target.value);
    };

    const handleUpdate = (e) => {
        updateFolderToDB(e, folder, setFolder, updateId);
        getFolders(setFolders);
        setUpdate(false);
        setToggle("");
    };

    const handleCancel = () => {
        setFolder("");
        setUpdate(false);
        setToggle("");
    };

    const handleAddFolder = (e) => {
        addFolderToDB(e, folder, setFolder);
        getFolders(setFolders);
        setToggle("");
    };

    return (
        <form className={`flex gap-8 flex-wrap items-center justify-center`}>
            <InputGroup
                type="text"
                className={formStyles.input_sm}
                value={folder}
                onChange={handleFolderChange}
                title=""
                name="Folder name"
                placeholder="Enter Folder Name"
            />
            {update ? (
                <div className="flex gap-8 justify-center flex-wrap p-x-4">
                    <Button onClick={handleUpdate} className={`${formStyles.button_sm} ${formStyles.button_blue}`}>Update</Button>
                    <Button className={`${formStyles.button_sm} ${formStyles.button_cancel}`} onClick={handleCancel}>Cancel</Button>
                </div>
            ) : (
                <Button onClick={handleAddFolder} className="btn--blue-hover">
                    Add
                </Button>
            )}
        </form>
    );
}

export default FolderForm;
