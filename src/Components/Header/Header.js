import React,{useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../store/Context';
import {FirebaseContext} from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
 
import SearchResultDisplay from '../SearchResult/SearchResultDisplay'; //for pop

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
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
      useEffect(() => {
        const fetchListings = async () => {
          try {
            const listingRef = collection(db, 'products');
            let q = listingRef;
            if (searchQuery) {
              q = query(listingRef, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
            }
            const snapshot = await getDocs(q);
            const results = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            console.log("Result: ",results)
            setSearchResult(results);
          } catch (error) {
            console.error("ERROR WHILE SEARCH", error);
          }
        };
    
        fetchListings();
      }, [searchQuery]);
   

 
  
   


  return (
    <div>
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India' />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction" onClick={(e)=>{if(searchQuery){
                                            navigate('/searchResult')} }}>
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
      
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{ navigate('/create')}}>SELL</span>
          </div>
        </div>
      </div>
        
    </div>
    < SearchResultDisplay className='hidden' result={searchResult} />
    </div>
  );
 }


export default Header;
