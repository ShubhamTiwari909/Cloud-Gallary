import Head from "next/head"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Login from "../../components/Login"
import { AppContext } from "../../components/Context"

function Signin() {
    const router = useRouter()
    const {setUid} = useContext(AppContext)
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        if (token) {
            router.push("/folders/navigation")
        }
    }, [])

    return (
        <>
        <Head>
            <title>Login | W-DRIVE</title>
        </Head>
            <Login router={router} />
        </>
    )
}

export default Signin
