import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";


export const AppCountext=createContext();
const AppCountextProvider=(props)=>{
    const navigate=useNavigate()
    const [userData,setUserData]=useState(null);
    const [chatData,setChatData]=useState(null);
  
    const loadUserData= async(uid)=>{
        try{
            const userRef = doc(db,'users',uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            console.log(userData)
            setUserData(userData)
          if(userData.avatar && userData.name){
            navigate('/chat')
          }else{
            navigate('/profileupdate')
          }
          await updateDoc(userRef,{
            lastSeen:Date.now()
          })
          setInterval(async()=>{
              if(auth.chatUser)
                await updateDoc(userRef,{
                    lastSeen:Date.now()
                  })
          },60000)
        }catch(error){

        }
    }

    const value={
        userData,setUserData,
        chatData,setChatData,
        loadUserData
    }
    return (
        <AppCountext.Provider value={value}>
             {props.children}
        </AppCountext.Provider>
    )
}
export default AppCountextProvider
