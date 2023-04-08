import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
} from "firebase/auth";
import { app } from "../firebase-config";

export async function signIn(email, password) {
    const auth = getAuth(app);

    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        return e.message
    }
}

export async function signInGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()

    try {
        return await signInWithPopup(auth, provider)
    } catch (e) {
        return e.message
    }
}

export async function signUp(email, password) {
    const auth = getAuth(app);

    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        return e.message
    }
}

export async function signInFacebook() {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider()

    try {
        return await signInWithPopup(auth, provider)
    } catch (e) {
        return e.message
    }
}

