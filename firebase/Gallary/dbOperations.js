import storage from '../firebaseConfig';
import { addDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { database } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage"
export const addImageToDB = (e, url, setUrl, folderName) => {
    e.preventDefault();
    const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderName}/images`)
    addDoc(databaseRef, {
        imageUrl: url.url,
        imageName: url.filename,
        imageId: Math.floor(Math.random() * 9999999),
    }).then(() => {
        setUrl({ url: "", filename: "" })
    }).catch((err) => {
        console.error(err)
    })
}

export const getData = async (setImages, folderName) => {
    const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderName}/images`)
    await getDocs(databaseRef)
        .then(response => {
            setImages(response.docs.map(data => {
                return { ...data.data(), id: data.id }
            }))
        })
}


export const deleteImage = (id, setImages, filename, folderName) => {
    console.log(filename)
    const fieldToDelete = doc(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderName}/images`, id)
    const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem("uid")}/${folderName}/${filename}`);
    // Delete the file
    deleteObject(storageRef).then(() => {
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!")
    });

    deleteDoc(fieldToDelete, id)
        .then(() => {
            getData(setImages,folderName)

        }).catch(err => {
            console.error(err)
        })
}

