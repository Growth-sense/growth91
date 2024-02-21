import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Fetchurldata = ({setEmail}) => {
  const search = useLocation().search;
  const referral_code=new URLSearchParams(search).get("id");
  useEffect(()=>{
    if(!referral_code){
      // window.location.assign('/');
    }else{
      setEmail(referral_code);
    }
  },[]);

  return(
    <div></div>
  )
}

export default Fetchurldata;