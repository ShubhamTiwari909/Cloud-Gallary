import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from '@/styles/Gallary.module.css'
import { getFolders } from "../firebase/Gallary/folderOperations";
import { AiTwotoneFolderOpen } from "react-icons/ai"
import FolderSettings from "./mini-components/FolderSettings";
import { getStorageSize } from '../firebase/Gallary/dbOperations'
import FolderForm from "./mini-components/FolderForm";
import { AppContext } from './Context'


function FolderNavbar() {
    const { folder, setFolder, folders, setFolders, update, setUpdate,
        updateId, setUpdateId, folderStorage, setFolderStorage } = useContext(AppContext)


    useEffect(() => {
        getFolders(setFolders)
        setTimeout(() => {
            getStorageSize(folders, setFolderStorage)
        }, 1000);
    }, [folderStorage])

    return (
        <>
            <div className={`${styles.foldersNav}`}>
                <div className='flex justify-center fixed bottom-3 right-3 z-100'>
                    <button className='text-center mt-2 text-sm bg-slate-700 text-white px-4 py-2 rounded-xl'
                        onClick={() =>
                            getStorageSize(folders, setFolderStorage)
                        }>
                        Get Storage: {folderStorage} GB
                    </button>
                </div>
                <FolderForm />
                <ul className={styles.foldersList}>
                    {folders.length === 0 ? <h2 className="text-center text-3xl md:text-6xl lg:text-9xl">No Folders</h2> :folders.map(({ id, folderName, folderUrl, createdAt }) => {
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

