import Head from "next/head"
import { useRouter } from 'next/router'
import Gallary from "@/components/organisms/Gallary/Gallary"

const Folder = () => {
    const router = useRouter()
    const { folder, folderName } = router.query
    return (
        <>
            <Head>
                <title>{folderName}</title>
            </Head>
            <div className="mt-32">
                <Gallary folderName={folderName} folderUrl={folder} />
            </div>
        </>
    )
}

export default Folder


