import React, { Fragment, setState, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL, updateMetadata } from 'firebase/storage';
import { doc, addDoc ,collection } from 'firebase/firestore';
import { useNavigate} from 'react-router-dom';

const Create = () => {
 const [name,setName]=useState('')
 const [category,setCategory]= useState('')
 const [price,setPrice]=useState(0)
 const [image,setImg]=useState('')

 const {storage,db} = useContext(FirebaseContext) 
 const {user} = useContext(AuthContext)
const navigate=useNavigate()

  const handleSubmit=async(e)=>{
      e.preventDefault();
      
     const storageref= ref(storage,'images/'+image.name)
      uploadBytes(storageref,image).then((snapshot)=>{
         const metadata = {
            contentType: image.type,
            contentDisposition:'inline'
         }
         updateMetadata(snapshot.ref,metadata).then(async()=>{
           
         getDownloadURL(snapshot.ref).then(async(imageURL)=>{  
          const userId = user.uid;
          const date = new Date().toDateString();
          
          const productCollection = collection(db, 'products');
          const docRef = await addDoc(productCollection, {
            userId,
            date,
            name,
            category,
            price,
            imageURL
          });
          navigate('/')
         })  
      })
      })
 }   
    
      
 
  return (
    <Fragment>
      <Header />
      <card>
        <div className='wrapper'>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price"
             onChange={(e)=>setPrice(e.target.value)} 
             />
            <br />
        
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src= {URL.createObjectURL(image)}></img>}
          
            <br />
            <input type="file" onChange={(e)=>setImg(e.target.files[0])}  />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
