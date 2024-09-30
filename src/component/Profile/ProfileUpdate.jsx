import React, { useEffect } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from './../../lib/Upload';

function ProfileUpdate() {
    const navigate=useNavigate();
    const [image,setImage]=useState(false);
    const [name,setName]=useState("");
    const [bio,setBio]=useState("");
    const [uid,setUid]=useState("");
    const[pervImage,setPervImage]=useState("")

    const profileUpdate = async (event)=>{
       event.preventDefault();
       try{
         
        if(!pervImage && !image){
            toast.error("Upload profile picture")
        }
        const docRef = doc(db,"users",uid)
        if(image){
            const imagUrl = await Upload(image);
            setPervImage(imagUrl);
            await updateDoc(docRef,{
                avatar:imagUrl,
                bio:bio,
                name:name
            })
            
        }
        else{
            await updateDoc(docRef,{
                bio:bio,
                name:name
            })

        }
       }catch(error){
        console.log(image)
        console.log(uid)
       }
    }

    useEffect(()=>{
         onAuthStateChanged(auth,async(user)=>{
            if(user){
                setUid(user.id)
                const docRef=doc(db,"users",user.uid);
                const docSnap=await getDoc(docRef);
                if(docSnap.data().name)
                {
                    setName(docSnap.data().name)
                }
                if(docSnap.data().bio)
                    {
                        setBio(docSnap.data().bio)
                    }
                    if(docSnap.data().avatar)
                        {
                            setPervImage(docSnap.data().avatar)
                        }
            }else{
                navigate('/')
            }
         })
    },[])
  return (
    <div className='profile'>
        <div className='profile-container'>
            <form onSubmit={profileUpdate}>
                <h3>Profile Details</h3>
                <label htmlFor="avatar">
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file"   id="avatar" accept='.png,.jpg,.jpeg'  hidden/>
                    <img   src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
                    Upload profile image
                </label>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='User Name' required/>
                <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write profile bio'></textarea>
                <button type='submit'>Save</button>
            </form>
            <img className='profile-pic' src={image? URL.createObjectURL(image): assets.logo_icon} alt="" />
        </div> 
    </div>
  )
}

export default ProfileUpdate
