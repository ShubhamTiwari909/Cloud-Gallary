import {useEffect} from 'react'
import { signupWithGoogle } from "../firebase/signinOperations"
import { FcGoogle } from "react-icons/fc";
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
        if(transcript.toLocaleLowerCase().includes("login")){
            signupWithGoogle(router)
            SpeechRecognition.stopListening()
        }
    }, [transcript])
    
    
    
    return (
        <section className={styles.container}>
            <div>
                <h1 className='mt-10 text-2xl md:text-6xl text-center text-white'>WELCOME TO W-DRIVE</h1>
                <p className='mt-10 text-lg md:text-2xl text-center text-white'>Just say login or click the button below</p>
                <p className='text-white text-lg text-center md:text-3xl mt-4'>Your Personal Cloud Gallary</p>
            </div>
            <div className="flex justify-center mt-3">
                <button className={`bg-white py-4 px-10 rounded-2xl flex gap-1.5 items-center`} onClick={() => signupWithGoogle(router)}>Sign in <FcGoogle /></button>
            </div>
        </section>
    )
}

export default Login