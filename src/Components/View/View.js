import React,{useEffect,useContext,useState, createContext} from 'react';
import { collection,query,where,getDocs} from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';

function View() {
    const{postDetails,setPostDetails}=useContext(PostContext) 
    const [userDetails,setUserDetails] = useState()
    const {db}=useContext(FirebaseContext)
    const {userId}= postDetails
    console.log("POSTDET",postDetails); 

  useEffect(()=>{
  
    const fetchUser=(async()=>{ 

     const usersCollection = collection(db, 'users');
     const q = query(usersCollection, where('id', '==', userId));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       console.log("DOC IS: ",doc.id, '=>', doc.data());
       setUserDetails(doc.data())
      })
    })
    fetchUser()
  },[]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src= {postDetails.imageURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
      {userDetails &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.mobile_no}</p>
        </div>     }
      </div>
    </div>
  );
}
export default View;
