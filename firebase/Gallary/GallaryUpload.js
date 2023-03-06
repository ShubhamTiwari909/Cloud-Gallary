import storage from "../firebaseConfig"
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getMetadata
} from "firebase/storage";

export function handleUpload(e, file, folderName, setUrl, setPercent, setSuccess) {
    e.preventDefault();
    if (!file) {
        alert("Please choose a file first!");
    }
    let filesCount = 0;
    let percentage;
    const selectedFiles = []
    const percentages = []
    const targetFiles = [...file];
    targetFiles.forEach(item => {
        const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem("uid")}/${folderName}/${item.name}`);
        const uploadTask = uploadBytesResumable(storageRef, item);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                getMetadata(snapshot.ref)
                    .then((metadata) => {
                        selectedFiles.push({
                            url: url, filename: metadata.name, createdAt: metadata.timeCreated.substring(0, 10),
                            size: metadata.size / 1024, contentType: metadata.contentType
                        })
                        filesCount++
                        setSuccess(filesCount)
                    })
                    .catch((error) => {
                    });
            });
        });
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                percentage = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                if (percentage === 100) {
                    percentages.push({ name: item.name, value: percentage })
                }
            },
            (err) => console.log(err)
        );
        setPercent(percentages)
    });
    setUrl(selectedFiles)
}