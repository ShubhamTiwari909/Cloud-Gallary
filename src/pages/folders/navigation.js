import Head from 'next/head'
import { useEffect, useContext } from 'react'
import FolderNavbar from '../../../components/Folder/FolderNavbar'
import { AppContext } from '../../../components/Context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"

const Folder = () => {
    const router = useRouter()
    const { setTokenId } = useContext(AppContext)
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        setTokenId(token)
        if (!token) {
            router.push("/")
        }
    }, [])
    return (
        <>
            <Head>
                <title>Folder Navigation</title>
            </Head>
            <ToastContainer />
            <div className="folder--nav">
                <FolderNavbar />
            </div>
        </>
    )
}

export default Folder