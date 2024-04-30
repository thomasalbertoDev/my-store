import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

// Fungsi untuk menggambil semua data dari firestore
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// Fungsi untuk menggambil data berdasarkan id dari firestore
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

// Fungsi untuk menggambil data berdasarkan field dari firestore
export async function retrieveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, '==', value));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// Fungsi untuk menambahkan data ke firestore
export async function addData(collectionName: string, data: any, callback: Function) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

// Fungsi untuk mengupdate data dari firestore
export async function updateData(collectionName: string, id: string, data: any, callback: Function) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

// Fungsi untuk menghapus data dari firestore
export async function deleteData(collectionName: string, id: string, callback: Function) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}
