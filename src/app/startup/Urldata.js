import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Urldata = ({setEmail,setOtp,setFounderId}) => {
  const search = useLocation().search;
  const email=new URLSearchParams(search).get("email");
  const otp=new URLSearchParams(search).get("secret");
  const founder_id=new URLSearchParams(search).get("founder_id");
  useEffect(()=>{
    // || !cid
    if(!email || !otp || !founder_id){
      window.location.assign('/');
    }else{
      setEmail(email);
      setOtp(otp);
      setFounderId(founder_id);
    }
  },[]);
  return(
    <div></div>
  )
}

export default Urldata;