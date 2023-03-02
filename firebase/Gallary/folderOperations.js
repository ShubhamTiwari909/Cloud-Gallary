import { addDoc, updateDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { database } from "../firebaseConfig";
import { ref, deleteObject, listAll } from "firebase/storage";
import storage from "../firebaseConfig"


export const addFolderToDB = (e, folderName, setFolderName) => {
    e.preventDefault();
    if (folderName === "" || folderName.startsWith(" ")) {
        alert("Please enter some text")
    }
    else {
        const randomNumber = Math.floor(Math.random() * 99999999999);
        const databaseRef = collection(database, `/Todos/FoldersName/${sessionStorage.getItem("uid")}/`)
        addDoc(databaseRef, {
            folderName: folderName,
            folderUrl: `${folderName}${randomNumber}`,
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
        const databaseRef = doc(database, `/Todos/FoldersName/${sessionStorage.getItem("uid")}/`, updateId)
        updateDoc(databaseRef, {
            folderName: folderName,
        }).then(() => {
            setFolderName("")
        }).catch((err) => {
            console.error(err)
        })
    }
}

export const getFolders = async (setFolders) => {
    const databaseRef = collection(database, `/Todos/FoldersName/${sessionStorage.getItem("uid")}`)
    await getDocs(databaseRef)
        .then(response => {
            setFolders(response.docs.map(data => {
                return { ...data.data(), id: data.id }
            }))
        })
}


export const deleteFolder = (id, setFolders, folderUrl, images) => {

    images.forEach(image => {
        const urlRef = doc(database, `/Todos/Images/${sessionStorage.getItem("uid")}/${folderUrl}/images`, image.id)
        deleteDoc(urlRef).then(() => {
            console.log("Url Deleted", image.id)
        }).catch(err => {
            console.error(err)
        })
    });

    const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem("uid")}/${folderUrl}`);

    listAll(storageRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef).then(() => {
                    console.log("Image Deleted", itemRef.name)
                }).catch((error) => {
                    console.log("Uh-oh, an error occurred!")
                });
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    /* Deleting the folder from the database. */
    const fieldToDelete = doc(database, `/Todos/FoldersName/${sessionStorage.getItem("uid")}`, id);
    deleteDoc(fieldToDelete, id)
        .then(() => {
            getFolders(setFolders)
        }).catch(err => {
            console.error(err)
        })


}


