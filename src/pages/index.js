import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Login from "@/components/Login"

function Signin() {
    const router = useRouter()
    useEffect(() => {
        let token = sessionStorage.getItem("Token")
        if (token) {
            router.push("/home")
        }
    }, [])

    return (
        <div>
            <Head>
                <title>Login | W-DRIVE</title>
            </Head>
            <Login router={router} />
        </div>
    )
}

export default Signin
