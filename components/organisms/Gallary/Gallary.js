import React, { useMemo, useEffect, useContext } from 'react'
import { getData } from "@/firebase/Gallary/dbOperations"
import GallaryCard from "./GallaryCard"
import GallaryForm from "./GallaryForm"
import styles from "@/styles/Gallary.module.css"
import { AppContext } from '../../Context'
import { getFolderSize } from '../../../firebase/Gallary/folderOperations'
import GallaryHeader from './GallaryHeader'
import H1 from '@/components/atoms/text/H1'
import Para from '@/components/atoms/text/Para'

  

function Gallary({ folderName, folderUrl }) {
    const { images, setImages, overlay } = useContext(AppContext)
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
    
                <GallaryHeader folderUrl={folderUrl}  />

                <H1 className='text-center text-2xl font-bold text-slate-100 mt-6'>{folderName === "default" ? "Default" : folderName}</H1>

                <div className='flex justify-center fixed bottom-0 py-1.5 z-100 w-full bg-slate-700 text-white -ml-4
                md:bottom-3 md:right-3 md:w-fit md:px-4 md:py-2 md:rounded-lg'>
                    <Para className='text-center text-sm rounded-xl'>
                        Storage: {(getFolderSize(images) / 1024).toFixed(3)} mb
                    </Para>
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
