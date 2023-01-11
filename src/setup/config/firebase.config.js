import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyAET9nyNsU_kTbuG5jMFFJxAn3S2XuXU2o",
    authDomain: "pixel-war-esd-thomas.firebaseapp.com",
    projectId: "pixel-war-esd-thomas",
    storageBucket: "pixel-war-esd-thomas.appspot.com",
    messagingSenderId: "735644169756",
    appId: "1:735644169756:web:7c80c4445272d1545a51d9"
};

const firebaseApp = initializeApp(firebaseConfig);

const firestoreDb = getFirestore(firebaseApp);

export default firestoreDb;