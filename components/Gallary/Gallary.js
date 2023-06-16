import React, { useMemo, useEffect, useContext } from 'react'
import { getData } from "../../firebase/Gallary/dbOperations"
import GallaryCard from "./GallaryCard"
import GallaryForm from "./GallaryForm"
import styles from "@/styles/Gallary.module.css"
import { AppContext } from '../Context'
import { getFolderSize } from '../..//firebase/Gallary/folderOperations'
import { deleteAllImages } from '../../firebase/Gallary/dbOperations'

  

function Gallary({ folderName, folderUrl }) {
    const { images, setImages, overlay,
        selectAll, setSelectAll,
        deleteAll, setDeleteAll } = useContext(AppContext)
    useEffect(() => {
        // Find all the prefixes and items.
        getData(setImages, folderUrl)
    }, [folderUrl])

    const imagesList =  useMemo(() => 
        images.map(({ id, imageUrl, imageName, createdAt, size, contentType }) => {
            return (
                <GallaryCard
                    key={id}
                    id={id}
                    imageUrl={imageUrl}
                    imageName={imageName}
                    createdAt={createdAt}
                    size={size}
                    contentType={contentType}
                    folderUrl={folderUrl}
                />
            )
        }), [images])

    return (
        <div className='gallary'>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div className='px-4 mt-24 md:mt-32 pt-2 pb-10'>
                <div className={`flex gap-5 items-center fixed
                ${selectAll ? "w-full bg-slate-800 top-16 right-0 justify-center px-2 py-6 z-103" : "justify-end right-2 bottom-10 md:bottom-16 z-102"}`}>
                    <button type="checkbox"
                        className='px-3 py-2 bg-purple-700 text-slate-100 rounded-xl text-xs'
                        onClick={(e) => {
                            setSelectAll(!selectAll)
                        }}>Select Images</button>
                    <button
                        className={`px-3 py-2 font-semibold text-red-500 bg-red-100 border-2 border-red-300 rounded-lg text-xs ${selectAll ? "" : "hidden"}`}
                        onClick={() => {
                            deleteAllImages(deleteAll, setImages, folderUrl)
                            setSelectAll(false)
                            setDeleteAll([])
                        }}>Delete Selected Images</button>
                </div>

                <h1 className='text-center text-2xl font-bold text-slate-100 mt-6'>{folderName === "default" ? "Default" : folderName}</h1>

                <div className='flex justify-center fixed bottom-0 py-1.5 z-100 w-full bg-slate-700 text-white -ml-4
                md:bottom-3 md:right-3 md:w-fit md:px-4 md:py-2 md:rounded-lg'>
                    <p className='text-center text-sm rounded-xl'>
                        Storage: {(getFolderSize(images) / 1024).toFixed(3)} mb
                    </p>
                </div>

                <GallaryForm folderName={folderUrl} />
                <section className={`my-10 flex gap-8 flex-wrap px-4 justify-center  `}>
                    {images.length === 0 ? <h1 className="text-center"></h1> :
                       imagesList
                    }
                </section>
            </div>
        </div>
    )
}

export default Gallary
