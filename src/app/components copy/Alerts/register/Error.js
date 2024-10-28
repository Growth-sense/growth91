import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');
  const status = new URLSearchParams(search).get('done');

  useEffect(()=>{
    // if(localStorage.getItem('reg_id')) {
    //   // localStorage.removeItem('reg_id');
    // }
    // setTimeout(()=>{
    //   window.location.assign('/Login');
    // },10000);
  },[])


    return (
      <div 
        class="container register-payment-page"
        style={{maxWidth:'100%',height:'100vh'}}
      >
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
              <div class="payment">
                <div class="payment_header" 
                style={{background:'#d42323'}}>
                    <div class="check">
                      <i class='bx bx-x' style={{fontSize:45}}></i>
                    </div>
                </div>
                <div class="content">
                  <h1>Payment {status=='cancelled' ? 'Cancelled': 'Error!'}</h1>
                  <p>Process of upgrading membership is {status=='cancelled' ? 'cancelled': 'failed'}. Please try again!</p>
                  <a href="/deals" style={{background:'#d42323'}}>Start Investing</a>
                </div>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Error;