import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

  useEffect(()=>{
    if(!order_id || !amount || !referenceId) {
      window.location.assign('/investor-dashboard');
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
                <div class="payment_header" 
                style={{background:'#d42323'}}>
                    <div class="check">
                      <i class='bx bx-x' style={{fontSize:45}}></i>
                    </div>
                </div>
                <div class="content">
                  <h1>Payment Error!</h1>
                  <p>Membership renewal process is failed.</p>
                  <a href="/investor-dashboard" style={{background:'#d42323'}}>Retry to renew membership</a>
                </div>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Error;