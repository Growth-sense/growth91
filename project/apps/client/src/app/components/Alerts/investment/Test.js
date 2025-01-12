import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Bridge from '../../../constants/Bridge';

const Success = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

  // useBeforeunload((event) => {
    // event.preventDefault();
    

    // return "Do you really want to leave our brilliant application?";
  // });

  const get_details=()=>{
    let params={
      investor_id:'118',
    }
    Bridge.transaction_success(params).then((result) => {
      if (result.status == 1) {
        console.log('result',result);
      } else {
      }
    });
  }

  useEffect(() => {
    setTimeout(()=>{
      get_details();
    },4000);
  }, [])
  

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