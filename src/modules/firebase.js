import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCxX9DZbrzNCrm6erQS3oumCWwEwbTIUig",
    authDomain: "office-breakfast.firebaseapp.com",
    projectId: "office-breakfast",
    storageBucket: "office-breakfast.appspot.com",
    messagingSenderId: "400832963899",
    appId: "1:400832963899:web:ccf4ee10ead891dacd431e",
    measurementId: "G-LVE0Z9PM03"
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app);

