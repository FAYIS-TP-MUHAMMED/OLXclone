import React,{useEffect,useContext,useState} from 'react';
import { collection, getDocs,} from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate} from 'react-router-dom';
import { PostContext} from '../../store/postContext';
import firebase from 'firebase/compat/app';

function Posts() {

  const{app,db} = useContext(FirebaseContext)
  const[products,setProducts]= useState([])
  const[sortedProducts,setSortedProducts]= useState([])
  const navigate= useNavigate()
  const {postDetails,setPostDetails}= useContext(PostContext)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const snapshot = await getDocs(productCollection);
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allPost);
        console.log("allPost is:", allPost[1]);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const sortedArray = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log("sortedArray",sortedArray)
      setSortedProducts(sortedArray);
    }
  }, [products]);

    
  return (
    <div className="postParentDiv">

      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div> 
        <div className="cards">

        { products.map(product=>{
        return <div
            className="card"  onClick={()=>{ setPostDetails(product);navigate('/viewPost')} }>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageURL} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div> 
              })   }

        </div> 
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {sortedProducts.map(product=>{ 
         return <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageURL} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div> 
            })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
