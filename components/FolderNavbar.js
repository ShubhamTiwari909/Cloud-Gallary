import { useState, useEffect } from "react";
import Link from "next/link";
import InputGroup from "./mini-components/InputGroup";
import styles from '@/styles/Gallary.module.css'
import formStyles from '@/styles/Form.module.css'
import { getFolders, addFolderToDB, updateFolderToDB } from "../firebase/Gallary/folderOperations";
import { AiTwotoneFolderOpen } from "react-icons/ai"
import FolderSettings from "./mini-components/FolderSettings";
import { getStorageSize } from '../firebase/Gallary/dbOperations'

function FolderNavbar() {
    const [folder, setFolder] = useState("");
    const [folders, setFolders] = useState([])
    const [update, setUpdate] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [folderStorage, setFolderStorage] = useState(0)

    useEffect(() => {
        getFolders(setFolders)
        setTimeout(() => {
            getStorageSize(folders,setFolderStorage)
        }, 1000);
    }, [folderStorage])

    return (
        <>
            <div className={`${styles.foldersNav}`}>
                <div className='flex justify-center fixed bottom-3 right-3 z-100'>
                    <button className='text-center mt-2 text-sm bg-slate-700 text-white px-4 py-2 rounded-xl'
                        onClick={() =>
                            getStorageSize(folders,setFolderStorage)
                        }>
                        Get Storage: {folderStorage} GB
                    </button>
                </div>
                <form className="flex gap-8 flex-wrap justify-center items-center">
                    <InputGroup
                        title="Folder Name"
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
                <ul className={styles.foldersList}>
                    <li className={`${styles.folderLink}`}>
                        <Link href={{
                            pathname: `/folders/default`,
                            query: {
                                folderName: "Default"
                            }
                        }} className="text-black flex gap-4 items-center">
                            <AiTwotoneFolderOpen color="black" size="20px" /> Default
                        </Link>
                    </li>
                    {folders.map(({ id, folderName, folderUrl, createdAt }) => {
                        return (
                            <li key={id} className={`${styles.folderLink} relative`}>
                                <Link href={{
                                    pathname: `/folders/${folderUrl}`,
                                    query: {
                                        folderName: folderName
                                    }
                                }} className={`text-black flex gap-4 items-center`}>
                                    <AiTwotoneFolderOpen color="black" size="20px" />  {folderName.slice(0, 10)}
                                </Link>
                                <FolderSettings
                                    id={id}
                                    folderName={folderName}
                                    folderUrl={folderUrl}
                                    createdAt={createdAt}
                                    setUpdateId={setUpdateId}
                                    setFolder={setFolder}
                                    setUpdate={setUpdate}
                                    setFolders={setFolders}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default FolderNavbar

