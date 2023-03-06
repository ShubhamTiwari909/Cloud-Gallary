import { useState } from 'react';
import styles from '@/styles/Form.module.css'
import InputGroup from '../mini-components/InputGroup'
import { handleUpload } from '../../firebase/Gallary/GallaryUpload';
import { addImageToDB, getData } from "../../firebase/Gallary/dbOperations"


function GallaryForm({ setImages, folderName, setOverlay }) {
    const [file, setFile] = useState([]);
    const [percent, setPercent] = useState([]);
    const [url, setUrl] = useState([])
    const [success, setSuccess] = useState(0);
    const [successUpload, setSuccessUpload] = useState(false)

    return (
        <>
            <p className={successUpload ? "fixed top-0 w-full text-center py-3 bg-green-500 text-white" : "hidden"}>"Files Uploaded Successfully"</p>
            <form className="flex gap-8 justify-center items-center flex-wrap mt-5">
                <InputGroup
                    title="Choose a File"
                    type="file"
                    name="file"
                    placeholder=""
                    className={styles.input_file}
                    onChange={(e) => {
                        setFile(e.target.files)
                    }}
                    labelClassname={styles.file_label}
                    accept="image/*"
                />
                <button
                    onClick={(e) => {
                        handleUpload(e, file, folderName, setUrl, setPercent, setSuccess)
                        setOverlay(true)
                    }}
                    className={`${styles.button_sm} ${styles.button_blue}`}>Add</button>
                <div className={`fixed right-0 top-2/4 -translate-y-2/4 px-6 pt-3 rounded-xl bg-white h-3/4 z-101
                  ${percent.length === 0 ? "hidden" : "block"}`}>
                    <p className="text-slate-700 mb-2">Total Files: {success}</p>
                    <div className="overflow-auto h-3/4 space-y-4 mb-3 w-48 md:w-96 max-w-sm">
                        {percent ? percent.map(item => {
                            return <p key={item.name}>{item.name === undefined ? <span></span> : item.name.slice(0, 10)}- {item.value} % done</p>
                        }) : <span></span>}
                    </div>
                    <button className={`${styles.button_sm} ${[...file].length === success ? styles.button_purple : "bg-slate-400"}`} onClick={(e) => {
                        addImageToDB(e, url, setUrl, folderName, setSuccessUpload)
                        setTimeout(() => {
                            getData(setImages, folderName)
                        }, 1000);
                        setPercent([])
                        setSuccess(false)
                        setOverlay(false);
                    }} disabled={[...file].length === success ? "" : "disabled"}>Upload</button>
                </div>
                {/* <p>{success}</p> file counts */}

            </form>
        </>
    )
}


export default GallaryForm

