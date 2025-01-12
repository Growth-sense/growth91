import React from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');
  const status = new URLSearchParams(search).get('status');

    return (
      <section style={{ backgroundColor: '#fafcff',marginTop:0,paddingTop:78 }}>
        <div className="container payment-success-section">
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-auto">
              <div className="payment-success-card">
                  <div className="icon">
                    <i style={{color:'#d42323'}} className='bx bxs-x-circle'></i>
                  </div>
                  <h2 style={{
                    color:'#f00',
                    textAlign:'center',
                    fontSize: 28,
                    marginBottom: 18,
                  }}>
                    Transaction {status=='cancel' ? 'Cancelled' : 'Error!'}
                  </h2>
                  <span>Transaction Number: {referenceId}</span>
                  <hr/>
                  <div className="row d-flex" style={{ marginTop: 50 }}>
                    <div className="col-sm-12 col-lg-12 col-xs-12" >
                      <h5 style={{display:'inline'}}>Amount :</h5>
                      <h5 style={{display:'inline', float:'right' }} >&#8377;{amount}</h5>
                    </div>
                    {/* <div className="col-sm-6 col-lg-6  col-xs-6" >
                    </div> */}
                  </div>
                  <a href="/deals" 
                  style={{
                    background:'#d42323',
                    padding:'10px 36px',
                    display:'flex',
                    justifyContent:'center',
                  }}
                  >Back to Deals</a>
              </div>
              <div className="col-xs-4  col-sm-4 col-md-4 col-lg-4 "> <img  className='img-thumbnail mx-auto' src="./assets/images/error.svg" style={{border:"0", backgroundColor:"rgb(250, 252, 255)"}} alt="" /></div>
              {/* <img className='err-media' src="./assets/images/error.svg" alt="error image"           
              style={{width:'100%',maxWidth:374}}
              /> */}
            </div>
          </div>
        </div>
      </section>
    )
}

export default Error;
// ${process.env.REACT_APP_BASE_URL}success?order_id=1655221235_7_6_NaN&amount=5000.00&referenceId=885288304