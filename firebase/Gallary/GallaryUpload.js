import storage from "../firebaseConfig"
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getMetadata
} from "firebase/storage";

export function handleUpload(e, file, url, setUrl, setPercent) {
    e.preventDefault();

    if (!file) {
        alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem("uid")}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            getMetadata(snapshot.ref)
                .then((metadata) => {
                    setUrl({ url: url, filename: metadata.name })
                })
                .catch((error) => {
                });
        });
        setTimeout(() => {
            console.log(url)
        }, 3000);
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