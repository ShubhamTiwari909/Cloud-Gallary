import { addDoc, collection } from 'firebase/firestore'
import { database } from "./firebaseConfig";

export const addFeedbackToDB = (username, setUsername, email, setEmail, message, setMessage) => {
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substring(0, 10);
    const databaseRef = collection(database, `/Gallary/Feedbacks/feebacks`)
    addDoc(databaseRef, {
        feedbackId: Math.floor(Math.random() * 9999999),
        userId:sessionStorage.getItem("uid"),
        username: username,
        email: email,
        message: message,
        date: date
    }).then(() => {
        setUsername("");
        setEmail("");
        setMessage("");
    }).catch((err) => {
        console.error(err)
    })
}