/* import { createContext,useState } from "react";

export const PostContext=createContext(null)

export default function Post({children}){
    const[postDetails,setPostDetails]= useState({})
    
    return(
        <PostContext.Provider value={{postDetails,setPostDetails}}>
        {children}
        </PostContext.Provider>
    )
}   */

import { createContext, useState, useEffect } from "react";

export const PostContext = createContext(null);

export default function Post({ children }) {
    const [postDetails, setPostDetails] = useState(() => {
        // Retrieve the initial state from localStorage
        const savedPostDetails = localStorage.getItem('postDetails');
        return savedPostDetails ? JSON.parse(savedPostDetails) : {};
    });

    useEffect(() => {
        // Save postDetails to localStorage whenever it changes
        localStorage.setItem('postDetails', JSON.stringify(postDetails));
    }, [postDetails]);

    return (
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
            {children}
        </PostContext.Provider>
    );
}


