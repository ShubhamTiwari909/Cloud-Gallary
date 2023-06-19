import { useEffect } from 'react'
import { signupWithGoogle } from "../firebase/signinOperations"
import { AiOutlineGooglePlus } from "react-icons/ai";
import styles from "@/styles/Login.module.css"

import "regenerator-runtime/runtime.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Para from './atoms/text/Para';
import H1 from './atoms/text/H1';
import Button from './atoms/Button';

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
                    <H1 className='mt-5 text-2xl md:text-6xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>WELCOME TO W-DRIVE</H1>
                    <Para className='mt-10 text-lg text-center md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>Your Personal Cloud Gallary</Para>
                    <Para className='mt-4 text-lg md:text-2xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-white'>Just say login or click the button below</Para>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <Button className="btn--glow" type="button" onClick={() => signupWithGoogle(router)}>
                    <strong className='flex gap-2 items-center'>Sign in <AiOutlineGooglePlus color='#ffffff' size="1.5rem" /></strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>

                    <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </Button>
            </div>
        </section>
    )
}

export default Login