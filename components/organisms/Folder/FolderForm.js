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
        updateFolderToDB(e, folder, setFolder, updateId); // update the folder name in database
        getFolders(setFolders); // get the updated folder name from the database
        setUpdate(false); // set the update toggle to false
        setToggle(""); // close the form
    };

    const handleCancel = () => {
        setFolder(""); // set the folder name input to an empty string
        setUpdate(false); // set the update toggle to false
        setToggle(""); // close the form
    };

    const handleAddFolder = (e) => {
        addFolderToDB(e, folder, setFolder); // add the folder name to the database
        getFolders(setFolders); // get the updated folder name from the database
        setToggle(""); // close the form
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
