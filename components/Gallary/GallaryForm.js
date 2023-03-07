import { useState, useContext } from 'react';
import styles from '@/styles/Form.module.css'
import InputGroup from '../mini-components/InputGroup'
import { handleUpload } from '../../firebase/Gallary/GallaryUpload';
import { addImageToDB, getData } from "../../firebase/Gallary/dbOperations"
import { AppContext } from '../Context';
import Link from 'next/link'
import { RxDoubleArrowLeft } from "react-icons/rx"

function GallaryForm({ folderName }) {
    const { setImages, setOverlay } = useContext(AppContext);

    const [file, setFile] = useState([]);
    const [percent, setPercent] = useState([]);
    const [url, setUrl] = useState([])
    const [success, setSuccess] = useState(0);
    const [successUpload, setSuccessUpload] = useState(false)

    return (
        <>
            <p className={successUpload ? "fixed top-0 w-full text-center py-3 bg-green-500 text-white" : "hidden"}>Files Uploaded Successfully</p>
            <div className="w-full fixed top-18 md:top-19 flex gap-4 justify-end md:justify-center flex-wrap z-102 py-2.5 md:py-4 px-2 bg-slate-200 -ml-4">
                <Link href="/folders/navigation"
                    className='fixed left-1.5 top-19 md:top-24 z-102 text-slate-100 flex gap-2 items-center px-4 py-2 rounded-full bg-slate-600 text-sm'>
                    <RxDoubleArrowLeft size="1rem" />Folders</Link>
                <form className="flex gap-4 justify-center items-center flex-wrap">
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
                </form>
            </div>
            <div className={`fixed right-0 top-2/4 -translate-y-2/4 px-6 pt-3 rounded-xl bg-white h-3/4 z-104
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
        </>
    )
}


export default GallaryForm

