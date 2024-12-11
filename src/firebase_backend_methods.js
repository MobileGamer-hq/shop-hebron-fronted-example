/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    addDoc,
    getDocs,
    collection,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getPerformance } from "firebase/performance";
import { Admin, Buyer, Seller, User } from "./data_models.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-CUy9mSpjohjoA3ho9HJNo5OgkBwCjZU",
    authDomain: "sample-project-99753.firebaseapp.com",
    projectId: "sample-project-99753",
    storageBucket: "sample-project-99753.firebasestorage.app",
    messagingSenderId: "882283716814",
    appId: "1:882283716814:web:2a791f36b6fe015eac309f",
    measurementId: "G-X2JNZ6BTK5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const performance = getPerformance(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Utility function to add data to Firestore
export const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

// Utility function to update Firestore data
export const updateData = async (collectionName, id, updatedData) => {
    try {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, updatedData, { merge: true });
        console.log(`Document ${id} in ${collectionName} updated successfully`);
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};

// Enhanced signUp function
export const signUp = async (username, email, password, role) => {
    console.log("Signing Up....");
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        console.log("Signed Up")

        // Create a new user object
        const newUser = {
            ...User,
            id: userId,
            name: username,
            login: {
                email: email,
                password: password,
            },
            role: role,
            contact_info: {
                contact_email: email,
            },
            roleData: role.toLowerCase() === "admin" ? Admin : role.toLowerCase() === "seller" ? Seller : Buyer,
        };
        console.log("New User Created")
        console.log(newUser)

        // Add to Firestore
        await setDoc(doc(db, "Users", userId), newUser);
        console.log("User successfully signed up and added to Firestore");
    } catch (error) {
        console.error("Error during sign-up: ", error.message);
        throw error;
    }
};

// Sign-in function with improved error handling
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", userCredential.user.uid);
    } catch (error) {
        console.error("Error during sign-in: ", error.message);
        throw error;
    }
};

// Google sign-up with Firestore check
export const signUpWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const userId = user.uid;

        // Check if user exists in Firestore
        const userRef = doc(db, "Users", userId);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            const newUser = {
                ...User,
                id: userId,
                name: user.displayName,
                login: {
                    email: user.email,
                    password: "password",
                },
                contact_info: {
                    contact_email: user.email,
                },
            };

            await setDoc(userRef, newUser);
            console.log("Google user added to Firestore");
        } else {
            console.log("User already exists in Firestore");
        }
    } catch (error) {
        console.error("Error during Google sign-up: ", error.message);
        throw error;
    }
};

// Logout function
export const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error during logout: ", error.message);
        throw error;
    }
};

// Utility function to delete data
export const deleteData = async (collectionName, id) => {
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        console.log(`Document ${id} in ${collectionName} deleted successfully`);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
};
