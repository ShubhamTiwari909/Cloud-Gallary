import { useState, useContext, useEffect } from 'react';
import styles from '@/styles/Form.module.css'
import InputGroup from '../mini-components/InputGroup'
import { handleUpload } from '../../firebase/Gallary/GallaryUpload';
import { addImageToDB, getData } from "../../firebase/Gallary/dbOperations"
import { AppContext } from '../Context';
import Link from 'next/link'
import { RxDoubleArrowLeft } from "react-icons/rx"
import PropTypes from "prop-types";

function GallaryForm({ folderName }) {
    const { setImages, setOverlay } = useContext(AppContext);

    const [file, setFile] = useState([]);
    const [url, setUrl] = useState([])
    const [success, setSuccess] = useState(0);
    const [successUpload, setSuccessUpload] = useState(false)
    const [targetFiles, setTargetFiles] = useState([])
    const [toggleUpload, setToggleUpload] = useState(false)

    useEffect(() => {
        const Files = [...file]
        Files.forEach((element) => {
            element.percent = 0
        });
        setTargetFiles(Files)
    }, [file])


    return (
        <>
            <p className={successUpload ? "fixed top-0 -ml-4 w-full text-center py-3 bg-green-500 text-white" : "hidden"}>Files Uploaded Successfully</p>
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
                            e.preventDefault()
                            if(targetFiles.length < 21){
                                handleUpload(e, targetFiles, folderName, setUrl, setSuccess)
                                setOverlay(true)
                                setToggleUpload(true)
                            }
                            else{
                                alert("Please Select not more than 20 files")
                            }
                        }}
                        className={`${styles.button_sm} ${styles.button_blue}`}>Add</button>
                </form>
            </div>

            <div className={`fixed right-0 top-2/4 -translate-y-2/4 px-6 pt-3 rounded-xl bg-white h-3/4 z-104
                  ${toggleUpload ? "block" : "hidden"}`}>
                <p className="text-slate-700 mb-2">Files Uploaded: {success}</p>
                <div className="overflow-auto h-3/4 space-y-4 mb-3 w-52 md:w-96 max-w-sm">
                    {targetFiles ? targetFiles.map(item => {
                        return <div key={item.name} className="">
                            <p className="text-ellipse">{item.name === undefined ?
                                <span></span>
                                :
                                item.name.slice(0, 60)
                            }
                            </p>
                            <div className={`mt-1 flex justify-center items-center rounded-lg bg-green-500 h-5 text-white text-center text-sm`} style={{ width: `${item.percent}%` }}>
                                {item.percent}%
                            </div>
                        </div>
                    }) : <span></span>}
                </div>
                <button className={`${styles.button_sm} ${[...file].length === success ? styles.button_purple : "bg-slate-400"}`} onClick={(e) => {
                    addImageToDB(e, url, setUrl, folderName, setSuccessUpload)
                    setTimeout(() => {
                        getData(setImages, folderName)
                    }, 1000);
                    setSuccess(0)
                    setTargetFiles([])
                    setOverlay(false);
                    setToggleUpload(false)
                }} disabled={[...file].length === success ? "" : "disabled"}>
                    {[...file].length === success ? "Upload" : "Waiting..."}
                </button>
            </div>
        </>
    )
}

GallaryForm.propTypes = {
    file: PropTypes.array,
    setFile: PropTypes.func,

    percent: PropTypes.array,
    setPercent: PropTypes.func,

    url: PropTypes.array,
    setUrl: PropTypes.func,

    success: PropTypes.number,
    setSuccess: PropTypes.func,

    successUpload: PropTypes.bool,
    setSuccessUpload: PropTypes.func
}
export default GallaryForm

