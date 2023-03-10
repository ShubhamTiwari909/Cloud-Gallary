import { addDoc, collection } from 'firebase/firestore'
import { database } from "./firebaseConfig";

export const addFeedbackToDB = (username, setUsername, email, setEmail, message, setMessage,issueLevel,setIssueLevel) => {
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString();
    const databaseRef = collection(database, `/Gallary/Feedbacks/feedbacks`)
    addDoc(databaseRef, {
        feedbackId: Math.floor(Math.random() * 9999999),
        userId:sessionStorage.getItem("uid"),
        username: username,
        email: email,
        message: message,
        date: date,
        issueLevel:issueLevel
    }).then(() => {
        setUsername("");
        setEmail("");
        setMessage("");
        setIssueLevel(1)
    }).catch((err) => {
        console.error(err)
    })
}