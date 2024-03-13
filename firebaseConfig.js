// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc } from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "hemmingsk-c41c7.firebaseapp.com",
  projectId: "hemmingsk-c41c7",
  storageBucket: "hemmingsk-c41c7.appspot.com",
  messagingSenderId: "635212315810",
  appId: process.env.FIREBASE_APPID,
  measurementId: "G-D75FFDJHC8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export async function getHemmingsCookie() { 
    const docRef = doc(firestore, "hemmings", "cookie");
    const docSnap = await getDoc(docRef);
    const { currentCookie } = docSnap.data();
    return currentCookie;
} 

export function getLink(query) { 
    return `https://www.hemmings.com/stories-api/search/listings?adtype=cars-for-sale&page=1&q=${query}&sort_by=recommended`
}

export async function checkDescription(id) { 
  const docRef = doc(firestore, "descriptions", id);
  const doc = await getDoc(docRef);
  if (doc.exists()) { 
    return await doc.data();
  } else { 
    return null;
  }
}

export async function createDescription(id, description) { 
  try { 
    await setDoc(doc(firestore, "description", id), { 
      description: description
    })
    return true;
  } catch (e) { return false; }
}