import storage from "../firebase/firebaseConfig"

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

export function handleUpload(file,setUrl,setPercent) {
    if (!file) {
        alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setUrl(url)
        });
    });
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ); // update progress
            setPercent(percent);
        },
        (err) => console.log(err)
    );
}