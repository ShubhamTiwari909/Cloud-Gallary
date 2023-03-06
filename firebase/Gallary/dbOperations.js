import storage from '../firebaseConfig';
import { addDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { database } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage"
export const addImageToDB = (e, url, setUrl, folderName,setSuccessUpload) => {
    e.preventDefault();

    url.forEach(url => {
        const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderName}/images`)
        addDoc(databaseRef, {
            imageId: Math.floor(Math.random() * 9999999),
            imageUrl: url.url,
            imageName: url.filename,
            contentType: url.contentType,
            size: url.size,
            createdAt: url.createdAt
        }).then(() => {
            setSuccessUpload(true)
            setTimeout(() => {
                setSuccessUpload(false)
            }, 2000);
        }).catch((err) => {
            console.error(err)
        })
    })
    setUrl([])
}

export const getData = async (setImages, folderName) => {
    const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderName}/images`)
    await getDocs(databaseRef)
        .then(response => {
            setImages(response.docs.map(data => {
                return { ...data.data(), id: data.id }
            }))
        }).catch(err => {
            console.error(err)
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
            getData(setImages, folderName)

        }).catch(err => {
            console.error(err)
        })
}



export const getStorageSize = async (folders, setFolderStorage) => {
    const result = []
    let sum = 0
    folders.forEach((folder) => {
        const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folder.folderUrl}/images`)
        getDocs(databaseRef)
            .then(response => {
                result.push(...response.docs.map(data => {
                    return { ...data.data(), id: data.id }
                }))
                const currentSum = result.reduce(function (accumulator, curValue) {
                    return accumulator + curValue.size
                }, 0)
                sum += currentSum
                setFolderStorage((sum / 1048576).toFixed(3));
            }).catch(error => {
                console.error(error)
            })
    });
}
