import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

    return (
      <section style={{ backgroundColor: '#fafcff',marginTop:0,paddingTop:78 }}>
        <div className="container payment-success-section">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="payment-success-card">
                  <div className="icon">
                    <i className='bx bxs-check-circle'></i>
                  </div>
                  <h3>Transaction Successful!</h3>
                  <span>Transaction Number: {referenceId}</span>
                  <hr/>

                  <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-lg-7">
                      <p>Amount Paid:</p>
                    </div>
                    <div className="col-lg-5">
                      <p style={{ textAlign:'right' }}>₹{amount}</p>
                    </div>
                  </div>

                  <a href="/deals">Check the deals</a>
                  
              </div>

              <img src="./assets/images/men.png" alt="" />

            </div>
          </div>
        </div>
      </section>
    )
}

export default Success;
// ${process.env.REACT_APP_BASE_URL}success?order_id=1655221235_7_6_NaN&amount=5000.00&referenceId=885288304