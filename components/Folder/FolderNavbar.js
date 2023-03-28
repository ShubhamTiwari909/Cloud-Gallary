import { useState, useEffect, useContext, useMemo } from "react";
import Link from "next/link";
import styles from '@/styles/Gallary.module.css'
import { getFolders } from "../../firebase/Gallary/folderOperations";
import { AiTwotoneFolderOpen, AiOutlineFolderAdd } from "react-icons/ai"
import { CgSearchLoading } from "react-icons/cg"
import FolderSettings from "./FolderSettings";
import FolderForm from "./FolderForm";
import { getStorageSize } from '../../firebase/Gallary/dbOperations'
import { AppContext } from '../Context'
import { searchFilter } from "../../methods/SearchFilter";
import Search from "../mini-components/Search"
import PropTypes from "prop-types";



function FolderNavbar() {
    const { folders, setFolders, folderStorage, setFolderStorage, search } = useContext(AppContext)

    const [toggle, setToggle] = useState("")
    useEffect(() => {
        getFolders(setFolders)
        setTimeout(() => {
            getStorageSize(folders, setFolderStorage)
        }, 1000);
    }, [folderStorage])

    const foldersList = useMemo(() => 
    folders
    .filter((folders) => searchFilter(folders, search))
    .map(({ id, folderName, folderUrl, createdAt, color }) => {
        return (
            <li key={id} className={`${styles.folderLink} relative`} style={{ backgroundColor: color }}>
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
                    setToggle={setToggle}
                />
            </li>
        )
    }), [folders])

    return <>
        <div className={`${styles.foldersNav}`}>
            <div className='flex justify-center fixed bottom-3 right-3 z-100'>
                <button className='text-center mt-2 text-sm bg-slate-700 text-white px-4 py-2 rounded-xl'
                    onClick={() =>
                        getStorageSize(folders, setFolderStorage)
                    }>
                    Get Storage: {folderStorage} GB
                </button>
            </div>
            <div className="w-full fixed top-18 md:top-19 flex flex-col z-100 py-3 bg-slate-200 -ml-6">
                <div className="flex justify-around">
                    <button onClick={() => {
                        toggle === "" || toggle === "SEARCH" ? setToggle("ADD") : setToggle("");
                    }}><AiOutlineFolderAdd className="text-2xl md:text-4xl" color="black" /></button>
                    <button onClick={() => {
                        toggle === "" || toggle === "ADD" ? setToggle("SEARCH") : setToggle("")
                    }}><CgSearchLoading className="text-2xl md:text-4xl" color="black" /></button>
                </div>
                <div className={`flex justify-center ${toggle === "ADD" || toggle === "SEARCH" ? "mt-3" : ""}`}>
                    {toggle === "ADD" ? <FolderForm setToggle={setToggle} /> : ""}
                    {toggle === "SEARCH" ? <Search /> : ""}
                </div>
            </div>
            <ul className={styles.foldersList}>
                {folders.length === 0 ? <h2 className="text-center text-3xl md:text-6xl lg:text-9xl">No Folders</h2> :
                    foldersList
                }
            </ul>
        </div>
    </>;
}

FolderNavbar.propTypes = {
    toggle: PropTypes.string,
    setToggle: PropTypes.func
}

export default FolderNavbar

