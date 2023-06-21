import { useState, useContext } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { BiCloudDownload } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { BsArrowsFullscreen } from "react-icons/bs";
import { deleteImage } from "../../../firebase/Gallary/dbOperations";
import styles from '@/styles/Gallary.module.css';
import CopyContent from "@/methods/CopyContent";
import { FaCopy } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import Details from "@/molecules/Details";
import { saveAs } from 'file-saver';
import Image from "next/image";
import { AppContext } from "../../Context";
import PropTypes from "prop-types";
import Button from "@/components/atoms/Button";

function GallaryCard({ id, folderUrl, imageUrl, imageName, createdAt, size, contentType }) {
    const { setImages, setOverlay, selectAll, deleteAll, setDeleteAll } = useContext(AppContext);
    const [detailPopup, setDetailPopup] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [urlCopiedText, setUrlCopiedText] = useState(false);
    const [tick, setTick] = useState(false);

    const handleDeleteImage = () => {
        deleteImage(id, setImages, imageName, folderUrl);
    };

    const handleDownloadImage = () => {
        saveAs(imageUrl, imageName);
    };

    const handleDetailsClick = () => {
        setDetailPopup(true);
        setOverlay(true);
    };

    const handleCopyUrl = () => {
        CopyContent(imageUrl);
        setUrlCopiedText(true);
        setTimeout(() => {
            setUrlCopiedText(false);
        }, 1000);
    };

    const handleCheckboxChange = (e) => {
        if (!selectAll) {
            e.target.checked = false;
        }
        if (e.target.checked) {
            setDeleteAll([...deleteAll, { id: id, imageName: imageName }]);
            setTick(true);
        } else {
            let removedValue = deleteAll.filter((value) => value.id !== id);
            setDeleteAll(removedValue);
            setTick(false);
        }
    };

    return (
        <div className={`relative p-3 border-2 ${contentType.includes("image") ? "border-blue-400" : "border-red-400"} bg-slate-900 text-white rounded-xl flex flex-col justify-between min-h-200`}>
            {contentType.includes("image") ? (
                <>
                    <Image
                        src={imageUrl}
                        alt="Gallary Image"
                        className={`border-2 h-48 border-white rounded-lg ${fullScreen ? `${styles.full_screen} z-105 cursor-pointer` : ""}`}
                        width={200}
                        height={200}
                        onClick={() => {
                            setFullScreen(true);
                            setOverlay(true);
                        }}
                        unoptimized
                    />
                    {/* Cross icon for closing full view image */}
                    <Button
                        className={fullScreen ? "fixed z-106 bg-white text-black rounded-md p-4 top-1.5 right-1.5" : "hidden"}
                        onClick={() => {
                            setFullScreen(false);
                            setOverlay(false);
                        }}
                    >
                        <RxCross1 />
                    </Button>
                </>
            ) : (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                    <div className="h-48 w-48">
                        <Viewer fileUrl={imageUrl} />
                    </div>
                </Worker>
            )}

            <div className={`${fullScreen ? "hidden" : "flex justify-between px-4 mt-3"}`}>
                <Button className="p-1 rounded-full border-2 border-red-400" onClick={handleDeleteImage}>
                    <MdDeleteSweep size="1.5rem" color="rgb(255, 81, 116)" />
                </Button>
                <Button className="p-1 rounded-full border-2 border-blue-400" onClick={handleDownloadImage}>
                    <BiCloudDownload size="1.5rem" color="rgb(81, 217, 255)" />
                </Button>
                <Button className='text-sm' onClick={handleDetailsClick}>
                    <FcViewDetails className={`p-1 rounded-full border-2 ${contentType.includes("image") ? "border-blue-400" : "border-red-400"}`} size="2rem" />
                </Button>
                <Details
                    details={[
                        { name: "Name", value: imageName },
                        { name: "Created-at", value: createdAt },
                        { name: "Size", value: (Number(size) / 1024).toFixed(3) + "mb" },
                        { name: "Content-Type", value: contentType },
                        { name: "ID", value: id },
                        {
                            button: (
                                <Button className="flex text-black items-center mt-2 text-sm md:text-lg" onClick={handleCopyUrl}>
                                    <FaCopy /> Copy Url <span className="text-sm font-semibold ml-3">{urlCopiedText ? "Copied!" : ""}</span>
                                </Button>
                            ),
                        },
                    ]}
                    detailPopup={detailPopup}
                    setDetailPopup={setDetailPopup}
                    setOverlay={setOverlay}
                />
            </div>
            <div className={`${fullScreen ? "hidden" : "flex"} gap-8 justify-center items-center mt-5`}>
                <FacebookShareButton url={imageUrl}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={imageUrl}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <a href={imageUrl} className="border border-white rounded-full p-1.5" target="_blank" rel="noopener noreferrer" >
                    <BsArrowsFullscreen size="1rem" color="#ffffff" />
                </a>

                <label htmlFor={id} className={`relative cursor-pointer ${selectAll ? "" : "hidden"}`}>
                    <input
                        id={id}
                        value={imageName}
                        className={"appearance-none w-5 h-5 rounded-md ring-2 ring-red-400"}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                    />
                    <span className={`absolute top-1 left-0.5 block w-4 h-2 -rotate-45 border-l border-l-red-400 border-b border-b-red-400 ${tick ? "" : "hidden"}`}></span>
                </label>
            </div>
        </div>
    );
}

GallaryCard.propTypes = {
    id: PropTypes.string,
    folderUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    imageName: PropTypes.string,
    createdAt: PropTypes.string,
    size: PropTypes.number,
    contentType: PropTypes.string,
};

export default GallaryCard;
