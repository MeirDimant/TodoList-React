import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const refs = {
  todosColRef: collection(db, "todoLists"),
  userListRef: "",
};

export const setUserListRef = (userId) => {
  refs.userListRef = collection(refs.todosColRef, userId, "items");
};

export const authenticateAnonymously = () => {
  return signInAnonymously(getAuth(app));
};

export const createTodoList = (userName) => {
  const itemsColRef = collection(db, "TodoLists");
  return addDoc(itemsColRef, {
    created: serverTimestamp(),
    users: [{ name: userName }],
  });
};

export const streamItems = (snapshot, error) => {
  try {
    const queryTodos = query(refs.userListRef, orderBy("created"));
    return onSnapshot(queryTodos, snapshot, error);
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (title) => {
  try {
    return await addDoc(refs.userListRef, {
      title,
      created: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => {
  let docRef = doc(refs.userListRef, id);
  try {
    deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};

export const handleItemCheck = (id, checked) => {
  let docRef = doc(refs.userListRef, id);
  try {
    updateDoc(docRef, {
      checked,
    });
  } catch (error) {}
};
