import { useContext, useEffect, useState } from "react"
import Head from "next/head"
import styles from "@/styles/Form.module.css";
import { addFeedbackToDB } from "../../firebase/Feedback";
import Para from "@/components/atoms/text/Para";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import { AppContext } from "@/components/Context";
const Feedback= () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [feedbackMessage, setFeedbackMessage] = useState("")
    const [issueLevel, setIssueLevel] = useState(1)

    const levels = [
        {
            level: 1,
            color: "bg-green-600"
        },
        {
            level: 2,
            color: "bg-green-400"
        },
        {
            level: 3,
            color: "bg-yellow-300"
        },
        {
            level: 4,
            color: "bg-orange-400"
        },
        {
            level: 5,
            color: "bg-red-600"
        },
    ]
    const submitFeedback = (e) => {
        e.preventDefault()
        if (username === "" || email === "" || feedbackMessage === "" || username.startsWith(" ")
            || email.startsWith(" ") || feedbackMessage.startsWith(" ")) {
            alert("Please Fill All the Fields");
        }
        else {
            addFeedbackToDB(username, setUsername, email, setEmail, feedbackMessage, setFeedbackMessage, issueLevel, setIssueLevel)
        }
    }

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
                <title>Feedback Form</title>
            </Head>
            <div className={`${styles.formBg} px-4 pt-28 pb-10 flex justify-center min-h-screen`}>
                <div className="container">
                    <div className="dark-form-card">
                        <a className="singup">Feedback Form</a>
                        <div className="inputBox1">
                            <input
                                type="text"
                                name="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                            <span className="user">Username</span>
                        </div>

                        <div className="inputBox">
                            <input
                                type="email"
                                name="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <span>Email</span>
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                required />
                            <span>Message</span>
                        </div>

                        <div className="items-center">
                            <Para className="text-slate-100 text-center mb-4 font-semibold text-lg">Issue Level</Para>
                            <div className="grid grid-cols-5 gap-7 items-center text-center text-white">
                                {levels.map(({ level, color }, index) => {
                                    return (
                                        <span key={index} className={`inline-block w-6 h-6 rounded-full ${color}
                                    ${issueLevel === level ? "ring-1 ring-white" : ""}`}
                                            onClick={() => {
                                                setIssueLevel(level)
                                            }}></span>
                                    )
                                })}
                            </div>
                        </div>

                        <Button className="submit" onClick={(e) => submitFeedback(e)}>Submit</Button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback


