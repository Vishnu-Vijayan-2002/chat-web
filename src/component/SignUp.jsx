import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'
import { signup,login } from '../config/firebase';

function SignUp({insideRegister}) {
    const Navigate=useNavigate()
  const [userInputs,setUserInputs]=useState({
    username:"",email:"",password:""
  })
  console.log(userInputs);
  // Registeration code
  const handleRegister= async(e)=>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password)
    {
      // api call
      signup(userInputs.username,userInputs.email,userInputs.password)
        
    
    }else{
        toast.warning("Pleas fill the form completely")
    }
  }
  const handleLogin = async (e) =>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      //api call
     

          setUserInputs({email:"",password:""})
          login(userInputs.email,userInputs.password)
       
    }else{
      toast.warning("Please fill the form completely!!!")
    }
  }
  return (
    <div className='main-conatiner'>
         <div className=''>
     <div className="container ">
        <Link to={'/'} style={{textDecoration:'none'}} className='fw-bolder'><i className='fa-solid fa-arrow-left'></i> Back to Home</Link>
        <div className="card shadow p-5">
          <div className='row'>
           
            <div className="col lg 6">
              <h1 className='fw-bolder mt-2'>
                <i className='main-head'></i>Chat App
              </h1>
              <h5 className='fw-bolder mt-2 head'>Sign {insideRegister? 'up':'in'} to your Account</h5>
              <form>
                {
                  insideRegister &&
                  <FloatingLabel
          controlId="floatingInputName"
          label="Username"
          className="mb-2"
        >
          <Form.Control value={userInputs.username} onChange={(e)=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="Username" />
        </FloatingLabel>
                }
                <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-2"
        >
          <Form.Control value={userInputs.email} onChange={(e)=>setUserInputs({...userInputs,email:e.target.value})} type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control value={userInputs.password} onChange={(e)=>setUserInputs({...userInputs,password:e.target.value})} type="password" placeholder="Password" />
        </FloatingLabel>
        {
          insideRegister ?  
          <div className='mt-2'>
            <button onClick={handleRegister} className='btn btn-primary'>Register</button>
            <p className='mt-2'>Alredy an Account ? Click here to <Link to={'/'} style={{color:'blue'}}>Login</Link></p>
          </div>
          :
          <div className='mt-3'>
          <button onClick={handleLogin} className='btn btn-primary'>Login</button>
          <p className='mt-2'>New User ? Click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p>
        </div>
        }
              </form>
            </div>
          </div>
        </div>
     </div>
     <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
    </div>
  )
}

export default SignUp
