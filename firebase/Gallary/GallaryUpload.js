import storage from "../firebaseConfig"
import {ref,uploadBytesResumable,getDownloadURL,getMetadata} from "firebase/storage";

export function handleUpload(e, targetFiles, folderName, setUrl, setSuccess) {
    e.preventDefault();
    if (!targetFiles) {
        alert("Please choose a file first!");
    }
    else {
        let filesCount = 0;
        let percentage;
        const selectedFiles = []
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
                    item.percent = percentage

                },
                (err) => console.log(err)
            );
        });
        setUrl(selectedFiles)
    }
}