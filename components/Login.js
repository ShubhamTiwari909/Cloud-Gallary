import React from 'react'
import Image from "next/image";
import { signupWithGoogle, signupWithGithub } from "../firebase/signinOperations"
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai"
import styles from "@/styles/Login.module.css"
import Logo from "../src/images/logo.png"

function Login({router}) {
    return (
        <section className={styles.container}>
            <div className={styles.welcomeMessage}>
                <Image src={Logo} width="150" height="150" alt="logo" />
                <h1>WELCOME TO W-DRIVE </h1>
            </div>
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <div className={styles.buttonGroup}>
                    <button className={styles.signinButton} onClick={() => signupWithGoogle(router)}>Sign in <FcGoogle /></button>
                </div>
            </div>
        </section>
    )
}

export default Login