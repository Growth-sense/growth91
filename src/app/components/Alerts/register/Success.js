import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

  useEffect(()=>{
    if(localStorage.getItem('reg_id')) {
      localStorage.removeItem('reg_id');
    }
    setTimeout(()=>{
      window.location.assign('/deals');
    },10000);
  },[])

    return (
      <div 
        class="container register-payment-page"
        style={{maxWidth:'100%',height:'100vh'}}
      >
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
              <div class="payment">
                <div class="payment_header" style={{backgroundColor:'#0fa80f'}}>
                    <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
                </div>
                <div class="content">
                  <h1 style={{color:'#000 !important'}}>Payment Success !</h1>
                  <p>You have been upgraded membership successfully.</p>
                  <a href="/deals" style={{background:'#0fa80f'}}>Start Investing</a>
                </div>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Success;