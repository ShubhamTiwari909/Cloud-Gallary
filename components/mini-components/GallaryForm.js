import { useState } from 'react';
import styles from '@/styles/Form.module.css'
import InputGroup from '../mini-components/InputGroup'
import { handleUpload } from '../../firebase/Gallary/GallaryUpload';
import { addImageToDB, getData } from "../../firebase/Gallary/dbOperations"

function GallaryForm({ setImages, folderName }) {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [url, setUrl] = useState("")

    return (
        <form className="flex gap-8 justify-center items-center flex-wrap mt-5">
            <InputGroup
                title="Choose a File"
                type="file"
                name="file"
                placeholder=""
                className={styles.input_file}
                onChange={(e) => {
                    setFile(e.target.files[0])
                }}
                labelClassname={styles.file_label}
                accept="image/*" />
            <button
                onClick={(e) => handleUpload(e, file, folderName, setUrl, setPercent)}
                className={`${styles.button_sm} ${styles.button_blue}`}>Add</button>
            <p>{percent} % done</p>
            <button className={`${styles.button_sm} ${percent === 100 ? styles.button_purple : "hidden"}`} onClick={(e) => {
                addImageToDB(e, url, setUrl, folderName)
                getData(setImages, folderName)
                setPercent(0)
            }} disabled={percent === 100 ? "" : "disabled"}>Upload</button>
        </form>
    )
}


export default GallaryForm

