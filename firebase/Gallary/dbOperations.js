import storage from '../firebaseConfig';
import { addDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { database } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage"

export const addImageToDB = async (e, url, setUrl, folderName, setSuccessUpload) => {
    e.preventDefault();

    const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem('uid')}/${folderName}/images`);
    const uploadPromises = url.map((item) => {
        return addDoc(databaseRef, {
            imageUrl: item.url,
            imageName: item.filename,
            contentType: item.contentType,
            size: item.size,
            createdAt: item.createdAt,
        });
    });

    try {
        await Promise.all(uploadPromises);
        setSuccessUpload(true);
        setTimeout(() => {
            setSuccessUpload(false);
        }, 2000);
        setUrl([]);
    } catch (error) {
        console.error(error);
    }
};


export const getData = async (setImages, folderName) => {
  try {
    const databaseRef = collection(database, `/Gallary/Images/${sessionStorage.getItem('uid')}/${folderName}/images`);
    const querySnapshot = await getDocs(databaseRef);

    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ ...doc.data(), id: doc.id });
    });

    setImages(images);
  } catch (error) {
    console.error(error);
  }
};


export const deleteImage = async (id, setImages, filename, folderName) => {
  const fieldToDelete = doc(database, `/Gallary/Images/${sessionStorage.getItem('uid')}/${folderName}/images`, id);
  const storageRef = ref(storage, `/GlobalImages/${sessionStorage.getItem('uid')}/${folderName}/${filename}`);

  try {
    await Promise.all([deleteObject(storageRef), deleteDoc(fieldToDelete, id)]);
    await getData(setImages, folderName);
  } catch (error) {
    console.error(error);
  }
};


export const getStorageSize = async (folders, setFolderStorage) => {
  try {
    let sum = 0;
    const result = [];

    const promises = folders.map(async (folder) => {
      const databaseRef = collection(
        database,
        `/Gallary/Images/${sessionStorage.getItem('uid')}/${folder.folderUrl}/images`
      );

      const querySnapshot = await getDocs(databaseRef);
      result.push(...querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id })));

      const currentSum = result.reduce((accumulator, curValue) => accumulator + curValue.size, 0);
      sum += currentSum;
    });

    await Promise.all(promises);
    setFolderStorage((sum / 1048576).toFixed(3));
  } catch (error) {
    console.error(error);
  }
};


export const deleteAllImages = (allImages, setImages, folderName) => {
    allImages.forEach(image => {
        deleteImage(image.id, setImages, image.imageName, folderName)
    });
}

