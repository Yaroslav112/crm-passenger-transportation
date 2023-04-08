import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCG6KL4JbsZjnDcC2C_xJ9D-yaJlqBLycI",
    authDomain: "crm-passenger-transporta-5fb91.firebaseapp.com",
    projectId: "crm-passenger-transporta-5fb91",
    storageBucket: "crm-passenger-transporta-5fb91.appspot.com",
    messagingSenderId: "351738582017",
    appId: "1:351738582017:web:f3eea0f6fd6546d2225c00"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);






