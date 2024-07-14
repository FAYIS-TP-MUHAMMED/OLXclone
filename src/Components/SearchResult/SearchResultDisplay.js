import React,{useContext} from 'react'
import './SearchResultDisplay.css'
import { useNavigate as navigate } from 'react-router-dom'
import { PostContext} from '../../store/postContext'; 

import Heart from '../../assets/Heart'


function SearchResultDisplay(props) {
    const{result} = props;
    const {postDetails,setPostDetails}= useContext(PostContext);
    console.log("RESULT: ",result)
  return (
    <div>
        <div className='container'>
          <h5>Search Result</h5>

          <div className="cards">
            {result?.map(item=>{
          return <div
           className="card"  onClick={()=>{ setPostDetails(item);navigate('/viewPost')} }>
           <div className="favorite">
             <Heart></Heart>
          </div>
          <div className="image">
            <img src={item.imageURL} alt="" />
          </div>
          <div className="content">
             <p className="rate">&#x20B9;{item.price}</p>
             <span className="kilometer">{item.category}</span>
             <p className="name">{item.name}</p>
          </div>
          <div className="date">
            <span>{item.date}</span>
            </div>
           </div> 
                }) || null  }
           </div> 

      </div>
    </div>
  )
}

export default SearchResultDisplay;
