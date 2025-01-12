import { initializeApp } from 'firebase/app';
import{getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAOd7ux-Tsk_USDMRWD6uj34ghGedQ_D3I",
    authDomain: "Growth91-354005.firebaseapp.com",
    projectId: "Growth91-354005",
    storageBucket: "Growth91-354005.appspot.com",
    messagingSenderId: "290651829512",
    appId: "1:290651829512:web:fa76bed21fd784a2bb68bd",
    measurementId: "G-6L5KRMHTKJ"
  };
  
 const app=initializeApp(firebaseConfig);
export const authentication= getAuth(app)