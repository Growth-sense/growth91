import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Urldata = ({setid}) => {
  const search = useLocation().search;
  const id=new URLSearchParams(search).get("id");
  useEffect(()=>{
    // || !cid
    console.log(id ,"asdsd");
    if(!id){
    //   window.location.assign('/');
    }else{
      setid(id);
      // setOtp(otp);
      console.log(id);
    }
  },[setid ,id]);
  return(
    <div></div>
  )
}

export default Urldata;