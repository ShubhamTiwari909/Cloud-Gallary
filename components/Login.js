import React from 'react'
import { signupWithGoogle } from "../firebase/signinOperations"
import { FcGoogle } from "react-icons/fc";
import styles from "@/styles/Login.module.css"

function Login({ router }) {
    return (
        <section className={styles.container}>
            <div>
                <h1 className='mt-10 text-2xl md:text-6xl text-center text-white'>WELCOME TO W-DRIVE </h1>
                <p className='text-white text-lg text-center md:text-3xl mt-4'>Your Personal Cloud Gallary</p>
            </div>
            <div className="flex justify-center mt-3">
                <button className={`bg-white py-4 px-10 rounded-2xl flex gap-1.5 items-center`} onClick={() => signupWithGoogle(router)}>Sign in <FcGoogle /></button>
            </div>
        </section>
    )
}

export default Login