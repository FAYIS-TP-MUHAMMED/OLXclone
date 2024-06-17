import React, { useState,useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut, updateProfile} from "firebase/auth";
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const [Username,setUsername]= useState('')
  const [email,setEmail]= useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]= useState('')

  const {app} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleSignup =async(e)=>{
    e.preventDefault()
    console.log({app})
    const auth = getAuth();
    try{
      createUserWithEmailAndPassword(auth, email, password).then(async(result)=>{
        console.log("RESI=ULT=",result.user)
        await updateProfile(result.user, { displayName: Username }).then(async()=>{
          const usersCollection = collection(db, 'users');
          try {
            await addDoc(usersCollection, {
              id:result.user.uid,
              username:Username,
              mobile_no:phone
            })
            console.log("Document written with ID: ",);
          
          } catch (e) {
            console.log("ERROR IS ", e)
          }
        }).then(()=>{
          navigate('/login')
        })
      })
    }catch (e){
      console.log('Error while signing', e);
    }
  }; 

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img> 

        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
