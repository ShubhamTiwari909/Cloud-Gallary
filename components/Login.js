import { useEffect } from 'react'
import { signupWithGoogle } from "../firebase/signinOperations"
import { AiOutlineGooglePlus } from "react-icons/ai";
import styles from "@/styles/Login.module.css"

import "regenerator-runtime/runtime.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Login({ router }) {
    const {
        transcript,
    } = useSpeechRecognition();

    useEffect(() => {
        SpeechRecognition.startListening()
    }, [])

    useEffect(() => {
        if (transcript.toLocaleLowerCase().includes("login")) {
            signupWithGoogle(router)
            SpeechRecognition.stopListening()
        }
    }, [transcript])

    return (
        <section className={styles.container}>
            <div className='card'>
                <div className='card-content'>
                    <h1 className='mt-5 text-2xl md:text-6xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>WELCOME TO W-DRIVE</h1>
                    <p className='mt-10 text-lg text-center md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>Your Personal Cloud Gallary</p>
                    <p className='mt-4 text-lg md:text-2xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>Just say login or click the button below</p>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <button className="btn--glow" type="button" onClick={() => signupWithGoogle(router)}>
                    <strong className='flex gap-2 items-center'>Sign in <AiOutlineGooglePlus color='#ffffff' size="1.5rem" /></strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>

                    <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </button>
                {/* <button className={`bg-white py-4 px-10 rounded-2xl flex gap-1.5 items-center`} onClick={() => signupWithGoogle(router)}>Sign in <FcGoogle /></button> */}
            </div>
        </section>
    )
}

export default Login