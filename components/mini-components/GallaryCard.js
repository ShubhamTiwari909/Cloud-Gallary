import { useState,useContext } from "react"
import { MdDeleteSweep } from "react-icons/md"
import { BiCloudDownload } from "react-icons/bi"
import { RxCross1 } from "react-icons/rx"
import { deleteImage } from "../../firebase/Gallary/dbOperations"
import styles from '@/styles/Gallary.module.css'
import CopyContent from "../../methods/CopyContent";
import { FaCopy } from "react-icons/fa"
import { FcViewDetails } from "react-icons/fc"
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share"
import Details from "./Details"
import { saveAs } from 'file-saver';
import Image from "next/image"
import { AppContext } from "../Context"

function GallaryCard({ id, folderUrl, imageUrl, imageName, createdAt, size, contentType }) {
    const {setImages, setOverlay, selectAll, deleteAll, setDeleteAll} = useContext(AppContext)
    const [detailPopup, setDetailPopup] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [urlCopiedText, setUrlCopiedText] = useState(false)
    const [tick,setTick] = useState(false)
    return (
        <div className="relative p-3 border-2 border-purple-400 bg-slate-900 text-white rounded-xl flex flex-col justify-between min-h-200">
            <Image src={imageUrl}
                alt="Gallary Image"
                className={`border-2 h-48 border-white rounded-lg ${fullScreen ? `${styles.full_screen} z-101 cursor-pointer` : ""}`}
                width={200}
                height={200}
                onClick={() => {
                    setFullScreen(true)
                    setOverlay(true)
                }} unoptimized />
            <div className={`${fullScreen ? "d-none" : "flex justify-between px-4 mt-3"}`}>
                <button className="p-1 rounded-full border-2 border-red-400"
                    onClick={(e) => {
                        deleteImage(id, setImages, imageName, folderUrl)
                    }}><MdDeleteSweep size="1.5rem" color="rgb(255, 81, 116)" /></button>
                <button className="p-1 rounded-full border-2 border-blue-400"
                    onClick={() => {
                        saveAs(imageUrl, imageName)
                    }}>
                    <BiCloudDownload size="1.5rem" color='rgb(81, 217, 255)' />
                </button>
                <button className='text-sm' onClick={() => {
                    setDetailPopup(true)
                    setOverlay(true)
                }}>
                    <FcViewDetails className="p-1 rounded-full border-2 border-blue-400" size="2rem" />
                </button>
                <Details
                    details={[
                        { name: "Name", value: imageName },
                        { name: "CreatedAt", value: createdAt },
                        { name: "Size", value: (Number(size) / 1024).toFixed(3) + "mb" },
                        { name: "Content-Type", value: contentType },
                        { name: "ID", value: id },
                        {
                            button: <button className="flex text-black items-center mt-2 text-sm md:text-lg" onClick={() => {
                                CopyContent(imageUrl)
                                setUrlCopiedText(true)
                                setTimeout(() => {
                                    setUrlCopiedText(false)
                                }, 1000);
                            }}><FaCopy /> Copy Url <span className="text-sm font-semibold ml-3">{urlCopiedText ? "Copied!" : ""}</span></button>
                        }
                    ]}
                    detailPopup={detailPopup}
                    setDetailPopup={setDetailPopup}
                    setOverlay={setOverlay}
                />
            </div>
            <div className="flex gap-8 justify-center items-center mt-5">
                <FacebookShareButton url={imageUrl}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={imageUrl}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <label htmlFor={id} className={`relative cursor-pointer ${selectAll ? "" : "hidden"}`}>
                    <input
                        id={id}
                        value={imageName}
                        className={"appearance-none w-5 h-5 rounded-md ring-2 ring-red-400"}
                        type="checkbox"
                        onChange={(e) => {
                            if(!selectAll){
                                e.target.checked = false;
                            }
                            if (e.target.checked) {
                                setDeleteAll([...deleteAll, { id: id, imageName: imageName }])
                                setTick(true)
                            }
                            else {
                                let removedValue = deleteAll.filter(value => value.id !== id)
                                setDeleteAll(removedValue)
                                setTick(false)
                            }
                        }}
                    />
                    <span className={`absolute top-1 left-0.5 block w-4 h-2 -rotate-45 border-l border-l-red-400 border-b border-b-red-400
                    ${tick ? "" : "hidden"}`}></span>
                </label>
            </div>

            <button
                className={fullScreen ? "fixed z-101 bg-white text-black rounded-md p-4 top-1.5 right-1.5" : "hidden"}
                onClick={() => {
                    setFullScreen(false)
                    setOverlay(false)
                }}><RxCross1 /></button>
        </div>
    )
}

export default GallaryCard