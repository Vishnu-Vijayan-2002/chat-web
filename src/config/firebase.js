// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyANj3F_25W3cxmMuVq1oRphQe52soo9omI",
  authDomain: "chat-app-web-a92a8.firebaseapp.com",
  projectId: "chat-app-web-a92a8",
  storageBucket: "chat-app-web-a92a8.appspot.com",
  messagingSenderId: "98358656967",
  appId: "1:98358656967:web:b3d434f0463d7c8c9823e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db=getFirestore(app)


const signup =async(username,email,password)=>{
   try{

    const res=await createUserWithEmailAndPassword(auth,email,password)
    const user=res.user;
    await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey, There i am using chat app",
        lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
    })
   }catch(error){
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}
const login=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
          console.error(error);
          toast.error(error.code.split('/')[1].split('-').join(" "))

          
    }
}
const logout= async()=>{
    try
    {
        await  signOut(auth)
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
     
}
export {signup,login,logout,auth,db}