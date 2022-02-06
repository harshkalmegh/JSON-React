import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDTWaBagk38GVCcnpcxihEtrtBz7ajQN-4",
    authDomain: "sign-in-2266f.firebaseapp.com",
    projectId: "sign-in-2266f",
    storageBucket: "sign-in-2266f.appspot.com",
    messagingSenderId: "317477335149",
    appId: "1:317477335149:web:cdd5372a829248073e0f64"
};
  
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)