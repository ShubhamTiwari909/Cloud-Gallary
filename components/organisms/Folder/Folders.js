import { useState, useEffect, useContext } from "react";
import styles from '@/styles/Gallary.module.css'
import { getFolders } from "../../../firebase/Gallary/folderOperations";
import { getStorageSize } from '../../../firebase/Gallary/dbOperations'
import { AppContext } from '../../Context'
import PropTypes from "prop-types";
import Button from "@/components/atoms/Button";
import FolderBlock from "./FolderBlock";
import FolderHeader from "./FolderHeader";



function FolderNavbar() {
    const { folders, setFolders, folderStorage, setFolderStorage } = useContext(AppContext)

    const [toggle, setToggle] = useState("")
    useEffect(() => {
        getFolders(setFolders)
        setTimeout(() => {
            getStorageSize(folders, setFolderStorage)
        }, 1000);
    }, [folderStorage])


    return <>
        <div className={`${styles.foldersNav}`}>
            <div className='flex justify-center fixed bottom-3 right-3 z-100'>
                <Button className='text-center mt-2 text-sm bg-slate-700 text-white px-4 py-2 rounded-xl'
                    onClick={() =>
                        getStorageSize(folders, setFolderStorage)
                    }>
                    Get Storage: {folderStorage} GB
                </Button>
            </div>
        
            <FolderHeader toggle={toggle} setToggle={setToggle} />

            <FolderBlock toggle={toggle} setToggle={setToggle} />
        </div>
    </>;
}

FolderNavbar.propTypes = {
    toggle: PropTypes.string,
    setToggle: PropTypes.func
}

export default FolderNavbar

