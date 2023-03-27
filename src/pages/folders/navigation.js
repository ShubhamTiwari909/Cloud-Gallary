import Head from 'next/head'
import { useEffect, useContext } from 'react'
import FolderNavbar from '../../../components/Folder/FolderNavbar'
import { AppContext } from '../../../components/Context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Folder = () => {
    const { setTokenId } = useContext(AppContext)
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        setTokenId(token)
    }, [])
    return (
        <>
            <Head>
                <title>Folder Navigation</title>
            </Head>
            <ToastContainer />
            <div className="mt-24">
                <FolderNavbar />
            </div>
        </>
    )
}

export default Folder