import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const Logout=()=>{
    
    const  history = useHistory(); 
    useEffect(() => {
     fetch(' http://localhost:5000/auth/logout ',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            
        },
        //credentials:"include"
     }).then((res)=>{
        history.push('/login', {replace:true})
        if (!res.status ===200){
            const error=new Error(res.error);
            throw error;
        }
     }).catch((err)=>{
        console.log(err);
     });
    },[]);
    
}
export default Logout;