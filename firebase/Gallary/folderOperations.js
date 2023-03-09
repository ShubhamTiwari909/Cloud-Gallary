import { addDoc, updateDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { database } from "../firebaseConfig";
import { ref, deleteObject, listAll } from "firebase/storage";
import storage from "../firebaseConfig"


export const addFolderToDB = (e, folderName, setFolderName) => {
    e.preventDefault();
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substring(0, 10);
    if (folderName === "" || folderName.startsWith(" ")) {
        alert("Please enter some text")
    }
    else {
        const randomNumber = Math.floor(Math.random() * 99999999999);
        const databaseRef = collection(database, `/Gallary/FoldersName/${sessionStorage.getItem("uid")}/`)
        addDoc(databaseRef, {
            folderName: folderName,
            folderUrl: `${folderName}${randomNumber}`,
            createdAt: date,
            color:"rgb(218, 220, 221)"
        }).then(() => {
            setFolderName("")
        }).catch((err) => {
            console.error(err)
        })
    }
}

// Update task
export const getId = (id, setUpdateId, folderName, setFolder) => {
    setUpdateId(id)
    setFolder(folderName)
}


export const updateFolderToDB = (e, folderName, setFolderName, updateId) => {
    e.preventDefault();
    if (folderName === "" || folderName.startsWith(" ")) {
        alert("Please enter some text")
    }
    else {
        const databaseRef = doc(database, `/Gallary/FoldersName/${sessionStorage.getItem("uid")}/`, updateId)
        updateDoc(databaseRef, {
            folderName: folderName,
        }).then(() => {
            setFolderName("")
        }).catch((err) => {
            console.error(err)
        })
    }
}

export const updateFolderColor = (e, updateId,color,setFolders) => {
    e.preventDefault(e)
    const databaseRef = doc(database, `/Gallary/FoldersName/${sessionStorage.getItem("uid")}/`, updateId)
        updateDoc(databaseRef, {
            color:color === "" ? "rgb(218, 220, 221)" : color
        }).then(() => {
            getFolders(setFolders)
        }).catch((err) => {
            console.error(err)
        })
}

export const getFolders = async (setFolders) => {
    const databaseRef = collection(database, `/Gallary/FoldersName/${sessionStorage.getItem("uid")}`)
    await getDocs(databaseRef)
        .then(response => {
            setFolders(response.docs.map(data => {
                return { ...data.data(), id: data.id }
            }))
        })
}


export const deleteFolderImages = (folderUrl, images) => {
    images.forEach(image => {
        const urlRef = doc(database, `/Gallary/Images/${sessionStorage.getItem("uid")}/${folderUrl}/images`, image.id)
        deleteDoc(urlRef).then(() => {
        }).catch(err => {
            console.error(err)
        })
    });

    const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem("uid")}/${folderUrl}`);

    listAll(storageRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef).then(() => {
                }).catch((error) => {
                    console.log("Uh-oh, an error occurred!")
                });
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

}

export const deleteFolder = (id, setFolders, folderUrl, images) => {

    deleteFolderImages(folderUrl, images)
    /* Deleting the folder from the database. */
    const fieldToDelete = doc(database, `/Gallary/FoldersName/${sessionStorage.getItem("uid")}`, id);
    deleteDoc(fieldToDelete, id)
        .then(() => {
            getFolders(setFolders)
        }).catch(err => {
            console.error(err)
        })
}

export const getFolderSize = (images) => {
    let sum = 0
    images.forEach(element => {
        sum += Number(element.size)
    });
    return sum
}


