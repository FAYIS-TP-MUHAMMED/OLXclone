import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../store/Context';
import {FirebaseContext} from '../../store/Context';


import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import Heart from '../../assets/Heart'; 
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

import Memo from '../../assets/dropdownAssets/Memo'
import Card from '../../assets/dropdownAssets/card' 
import Help from '../../assets/dropdownAssets/Help' 
import Settings from '../../assets/dropdownAssets/Settings';
import Logout from '../../assets/dropdownAssets/LogoutSvg';

import { signOut, getAuth } from 'firebase/auth';



function Header() {
   const {user,setUser} = useContext(AuthContext)
  //  const{firebaseApp}= useContext(FirebaseContext)
   const navigate=useNavigate()

   
  const [showUserDetails,setShowUserDetails]=useState(false)
   const handleUserDetailsClick = () => {
    setShowUserDetails(prev => !prev);
  };

   const handleLogout = async()=> {
    const auth = getAuth();
    await signOut(auth) 
     setUser(null)
     navigate('/login')
    }
  
   


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        <div className="loginPage">
      {user ? (
        <div>
          <div className='dropdown'> 
          <span className='userName' onClick={handleUserDetailsClick}>
            {user.displayName} <Arrow></Arrow>
          </span>
          <div className='dropdownMain'>
           {showUserDetails && (
            <div className="dropdownContent">
              <div className="myProfile children">
                <div className='avathar'></div>
                <div className='profileName'>{user.displayName}</div>
              </div>
              <div className='profileEdit children'>
                <p>View and edit profile</p>
              </div>
              <hr/>
              <div className='child'>
                 <p><span className='heart'><Heart></Heart></span> My ADS</p>
                 <p><span><Memo></Memo></span>My Bussiness Packages</p>
                 <p><span><Card></Card></span>Bought Packages & Billing</p>
                 <hr/>
                 <p><span><Help></Help></span>Help</p>
                 <p><span><Settings></Settings></span>Settings</p>
                 <hr/>
                 <p onClick={handleLogout}><span><Logout></Logout></span>Logout</p>
              </div> 
            </div>
           )}
           </div>
          </div>
        </div>
      ) : (
        <span onClick={()=>{navigate('/login')}}>Login</span>
      )}
      </div>
         
      {/* <div className="loginPage">
      {user ? (
        <div>
          <div className='dropdown'> 
          <span className='userName' onClick={handleUserDetailsClick}>
            {user.displayName}
            <hr/>
          </span>
           {showUserDetails && (
            <div className="userDetails">
              <p>User Profile</p>
              <span onClick={handleLogout}>Logout</span>
            </div>
           )}
          </div>
        </div>
      ) : (
        <span onClick={()=>{navigate('/login')}}>Login</span>
      )}
      </div>  */}
      
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{ navigate('/create')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
