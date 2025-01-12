import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');
  const [Url,setUrl]=useState('');
  const[PathName,setPathName]=useState('');

  useEffect(()=>{
    if(order_id && amount && referenceId) {
      if(localStorage.getItem("investor_id"))
      {
        setUrl('/investor-portfolio')
        setPathName('Vieww All Purchased Document')
      //window.location.assign('/investor-portfolio');
      }
      else if(localStorage.getItem("founder_id"))
      {
        setUrl('/founder-as-investor-portfolio')
        setPathName('View All Purchased Documents')
      //  window.location.assign('/founder-as-investor-portfolio');
      }else{
        setUrl('/investor-portfolio')
        setPathName('View All Purchased Documents')
       // window.location.assign('/investor-portfolio');
      }
    }else{
      setUrl('/investor-portfolio')
      setPathName('View All Purchased Documents')
    }
  },[])

    return (
      <div 
        class="container register-payment-page"
        style={{maxWidth:'100%',height:'100vh'}}
      >
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
              <div class="payment">
                <div class="payment_header" style={{background:'rgb(0 221 255)'}}>
                    <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
                </div>
                <div class="content">
                  <h1>Transaction success!</h1>
                  <p>Your payment process is completed successfully..</p>
                  <a href={Url} style={{background:'rgb(0 221 255)'}}>{PathName}</a>
                </div>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Success;