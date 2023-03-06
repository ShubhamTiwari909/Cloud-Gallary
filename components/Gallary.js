import React, { useState, useEffect, useContext } from 'react'
import { getData } from "../firebase/Gallary/dbOperations"
import GallaryCard from "./mini-components/GallaryCard"
import GallaryForm from "./mini-components/GallaryForm"
import styles from "@/styles/Gallary.module.css"
import { AppContext } from './Context'
import { getFolderSize } from '../firebase/Gallary/folderOperations'
import { deleteAllImages } from '../firebase/Gallary/dbOperations'

function Gallary({ folderName, folderUrl }) {
    const [overlay, setOverlay] = useState(false)
    const { images, setImages } = useContext(AppContext)
    const [selectAll, setSelectAll] = useState(false)
    const [deleteAll, setDeleteAll] = useState([])
    useEffect(() => {
        // Find all the prefixes and items.
        getData(setImages, folderUrl)
    }, [folderUrl])

    return (
        <>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div className='px-4'>
                <div className={`flex gap-5 items-center fixed top-20 z-100
                ${selectAll ? "w-full bg-black right-0 justify-center px-2 py-4" : "justify-end right-2"}`}>
                    <button type="checkbox"
                        className='px-3 py-2 bg-purple-700 text-slate-100 rounded-xl text-sm'
                        onClick={(e) => {
                            setSelectAll(!selectAll)
                        }}>Select Images</button>
                    <button
                        className={`px-3 py-2 font-semibold text-red-500 bg-red-100 border-2 border-red-300 rounded-lg text-sm ${selectAll ? "" : "hidden"}`}
                        onClick={() => {
                            deleteAllImages(deleteAll, setImages, folderUrl)
                            setSelectAll(false)
                            setDeleteAll([])
                        }}>Delete Selected Images</button>
                </div>
                <h1 className='text-center text-2xl font-bold text-slate-700'>{folderName === "default" ? "Default" : folderName}</h1>
                <div className='flex justify-center fixed bottom-0 py-1.5 z-100 w-full bg-slate-700 text-white -ml-4
                md:bottom-3 md:right-3 md:w-fit md:px-4 md:py-2 md:rounded-lg'>
                    <p className='text-center text-sm rounded-xl'>
                        Storage: {(getFolderSize(images) / 1024).toFixed(3)} mb
                    </p>
                </div>

                <GallaryForm setImages={setImages} folderName={folderUrl} setOverlay={setOverlay} />
                <section className={`mt-10 flex gap-8 flex-wrap p-x-4 justify-center `}>
                    {images.length === 0 ? <h1 className="text-center"></h1> :
                        images.map(({ id, imageUrl, imageName, createdAt, size, contentType }) => {
                            return (
                                <GallaryCard
                                    key={id}
                                    id={id}
                                    folderUrl={folderUrl}
                                    setImages={setImages}
                                    imageName={imageName}
                                    imageUrl={imageUrl}
                                    createdAt={createdAt}
                                    size={size}
                                    contentType={contentType}
                                    setOverlay={setOverlay}
                                    selectAll={selectAll}
                                    deleteAll={deleteAll}
                                    setDeleteAll={setDeleteAll} />
                            )
                        })}
                </section>
            </div>
        </>
    )
}

export default Gallary
