import React,{useState,useContext} from 'react';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')
  const navigate= useNavigate()

  const handleLogin=(e)=>{
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(()=>{
            console.log("user loggedin")
            navigate('/')
            
        }).catch(e)
          console.log('Login error :',e)    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
