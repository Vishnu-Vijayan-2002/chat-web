import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import SignUp from './component/SignUp';
import Chat from './component/Chat';
import ProfileUpdate from './component/Profile/ProfileUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import ChatBox from './component/ChatBox/ChatBox';
import { AppCountext } from './context/AppContext';

function App() {
  const navigate = useNavigate()
  const {loadUserData}=useContext(AppCountext)
  useEffect(()=>{
     onAuthStateChanged(auth, async(user)=>{
        if(user){
          navigate('/chat')
          console.log(user)
          await loadUserData(user.uid)
        }else{
          navigate('/')

        }
     })
  },[])

  return (
    <>
    <ToastContainer/>
   
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/register' element={<SignUp insideRegister/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/chatbox' element={<ChatBox/>}/>
        <Route path='/profileupdate' element={<ProfileUpdate/>}/>
      </Routes>
    </>
  )
}

export default App
