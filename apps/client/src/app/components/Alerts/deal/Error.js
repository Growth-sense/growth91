import React from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {

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
                    <i style={{color:'#d42323'}} className='bx bxs-x-circle'></i>
                  </div>
                  <h2 style={{
                    color:'#f00',
                    textAlign:'center',
                    fontSize: 28,
                    marginBottom: 18,
                  }}>Transaction Error!</h2>
                  <span>Transaction Number: {referenceId}</span>
                  <hr/>
                  <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-lg-7">
                      <p>Amount Need To Pay:</p>
                    </div>
                    <div className="col-lg-5">
                      <p style={{ textAlign:'right' }}>₹{amount}</p>
                    </div>
                  </div>
                  <a href="/Signup" 
                  style={{
                    background:'#d42323',
                    padding:'10px 36px',
                    display:'flex',
                    justifyContent:'center',
                  }}
                  >Retry Payment</a>
              </div>
              <img src="./assets/images/error.svg" alt="error image" 
              style={{width:'100%',maxWidth:374}}
              />
            </div>
          </div>
        </div>
      </section>
    )
}

export default Error;
// ${process.env.REACT_APP_BASE_URL}success?order_id=1655221235_7_6_NaN&amount=5000.00&referenceId=885288304