import React, {useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase/config';

// =======Import contexts=====
import Post from './store/postContext';


 //  =====Import Components=====
 
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import ViewPost from './Pages/ViewPost';
import SearchResult from './Pages/searchResult';


function App() { 

   const {user,setUser} = useContext(AuthContext)
  const {app}=useContext(FirebaseContext)
  useEffect(() => {
   
      const auth = getAuth(app);
     const subscribe= onAuthStateChanged(auth,(user)=>{
      setUser(user)
     })
  });   

  return (
    <div>
    <Post>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signup' element={<Signup/>}/> 
        <Route exact path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/viewPost' element={<ViewPost/>}/>
        <Route exact path='/searchResult' element={<SearchResult/>}/>
        </Routes>
      </Router>
      </Post>
    </div>    
  );
}

export default App;
