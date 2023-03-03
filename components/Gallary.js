import React, { useState, useEffect,useContext } from 'react'
import { getData } from "../firebase/Gallary/dbOperations"
import GallaryCard from "./mini-components/GallaryCard"
import GallaryForm from "./mini-components/GallaryForm"
import styles from "@/styles/Gallary.module.css"
import { AppContext } from './Context'

function Gallary({folderName,folderUrl}) {
    const [overlay, setOverlay] = useState(false)
    const {images,setImages} = useContext(AppContext)
    

    useEffect(() => {
        // Find all the prefixes and items.
        getData(setImages,folderUrl)
    }, [folderUrl])

    return (
        <>
            <div className={`${overlay ? styles.overlay : ''}`}></div>
            <div>
                <h1 className='text-center text-2xl font-bold text-slate-700'>{folderName === "default"  ? "Default" : folderName}</h1>
                <GallaryForm setImages={setImages} folderName={folderUrl} />
                <section className={`mt-10 flex gap-8 flex-wrap p-x-4 justify-center `}>
                    {images.length === 0 ? <h1 className="text-center">No images</h1> :
                        images.map(({ id, imageUrl, imageName,createdAt,size,contentType }) => {
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
                                setOverlay={setOverlay} />
                            )
                        })}
                </section>
            </div>
        </>
    )
}

export default Gallary
