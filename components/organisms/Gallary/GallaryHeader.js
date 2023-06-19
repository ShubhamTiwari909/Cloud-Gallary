import {useContext} from 'react'
import { AppContext } from '../../Context'
import { deleteAllImages } from '../../../firebase/Gallary/dbOperations'
import Button from '@/components/atoms/Button'

function GallaryHeader({folderUrl}) {
    const { setImages,
        selectAll, setSelectAll,
        deleteAll, setDeleteAll } = useContext(AppContext)
  return (
    <div className={`flex gap-5 items-center fixed
    ${selectAll ? "w-full bg-slate-800 top-16 md:top-20 right-0 justify-center px-2 py-6 z-103" : "justify-end right-2 bottom-10 md:bottom-16 z-102"}`}>
        <Button type="checkbox"
            className='px-3 py-2 bg-purple-700 text-slate-100 rounded-xl text-xs'
            onClick={(e) => {
                setSelectAll(!selectAll)
            }}>Select Images</Button>
        <Button
            className={`px-3 py-2 font-semibold text-red-500 bg-red-100 border-2 border-red-300 rounded-lg text-xs ${selectAll ? "" : "hidden"}`}
            onClick={() => {
                deleteAllImages(deleteAll, setImages, folderUrl)
                setSelectAll(false)
                setDeleteAll([])
            }}>Delete Selected Images</Button>
    </div>
  )
}

export default GallaryHeader