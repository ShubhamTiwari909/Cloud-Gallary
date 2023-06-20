import Image from 'next/image'
import React from 'react'
import PhotoGallary1 from "../../src/images/PhotoGallary1.jpg"
import PhotoGallary2 from "../../src/images/PhotoGallary2.jpg"
import PhotoGallary3 from "../../src/images/PhotoGallary3.jpg"

function ImageGallary() {
    const images = [PhotoGallary1,PhotoGallary2,PhotoGallary3]
  return (
    <div>
        {
            images.map((image,idx) => {
                return (
                    <Image key={idx} src={image} alt='Photo Gallary' className='mb-10' />
                )
            })
        }
    </div>
  )
}

export default ImageGallary