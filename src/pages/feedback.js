import { useState } from "react"
import Head from "next/head"
import styles from "@/styles/Form.module.css";
import { addFeedbackToDB } from "../../firebase/Feedback";
const Folder = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [feedbackMessage, setFeedbackMessage] = useState("")

    const submitFeedback = (e) => {
        e.preventDefault()
        if(username === "" || email === "" || feedbackMessage === "" || username.startsWith(" ")
        || email.startsWith(" ") || feedbackMessage.startsWith(" ")){
            alert("Please Fill All the Fields");
        }
        else{
            addFeedbackToDB(username,setUsername, email, setEmail,feedbackMessage,setFeedbackMessage)
        }
    }

    return (
        <>
            <Head>
                <title>Feedback Form</title>
            </Head>
            <div className={`${styles.formBg} px-4 pt-16`}>
                <h1 className="text-white text-center text-3xl">Feedback Form</h1>
                <form className={`${styles.blurBg} grid grid-cols-1 gap-y-5`}>
                    <div className="grid grid-cols-2 items-center">
                        <label className="text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            name="Username"
                            placeholder="your name"
                            className={styles.input_md}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <label className="text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="your email"
                            className={styles.input_md}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <label className="text-white">Feedback</label>
                        <textarea
                            className={styles.input_md}
                            placeholder="your feedback"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            required>
                        </textarea>
                    </div>
                    <button className="block border-none px-4 py-2 rounded-xl bg-white text-slate-700"
                    onClick={(e) => submitFeedback(e)}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Folder


