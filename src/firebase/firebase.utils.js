import firebase from "firebase/app";

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDoTMY6RZsM28-YhIFd9Gf3gCCR7c8MfUs",
    authDomain: "udemy-demo-48089.firebaseapp.com",
    projectId: "udemy-demo-48089",
    storageBucket: "udemy-demo-48089.appspot.com",
    messagingSenderId: "724631161074",
    appId: "1:724631161074:web:dca49e09053269c2c8286b",
    measurementId: "G-GP2JKLVM6W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    // console.log(snapShot)

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log("error creating at ",err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;