import Head from "next/head"
import { useRouter } from 'next/router'
import Gallary from "../../../components/Gallary"
import Link from 'next/link'
import { RxDoubleArrowLeft } from "react-icons/rx"
const Folder = () => {
    const router = useRouter()
    const { folder, folderName } = router.query

    return (
        <>
            <Head>
                <title>{folderName}</title>
            </Head>
            <div className="mt-24">
                <Link href="/folders/navigation"
                    className='fixed left-1.5 text-black flex gap-2 items-center px-4 py-2 rounded-full bg-slate-200 text-sm'>
                    <RxDoubleArrowLeft size="1rem" />Folders</Link>
                <Gallary folderName={folderName} folderUrl={folder} />
            </div>
        </>
    )
}

export default Folder


