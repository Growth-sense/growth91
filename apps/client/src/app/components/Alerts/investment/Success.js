import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Bridge from '../../../constants/Bridge';

const Success = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

  // const get_details=()=>{
  //   if(order_id){
  //     let params={
  //       order_id:order_id,
  //     }
  //     Bridge.transaction_success(params).then((result) => {                       
  //       if (result.status == 1) {} 
  //     });
  //   }
  // }
  useEffect(() => {
    // get_details();
  }, []);

  return (
   
    <section style={{ backgroundColor: '#fafcff', marginTop: 0, paddingTop: 78 }}>
      <div className="container payment-success-section">
      <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-auto">
            <div className=" card payment-success-card">
              <div className="icon">
                <i className='bx bxs-check-circle'></i>
              </div>
              <h3>Transaction Successful!</h3>
              <span>Transaction Number: {referenceId}</span>
              <hr />
              <div className="row d-flex" style={{ marginTop: 50 }}>
                    <div className="col-sm-12 col-lg-12 col-xs-12" >
                      <h5 style={{display:'inline'}}>Amount Paid:</h5>
                      <h5 style={{display:'inline', float:'right' }} >&#8377;{amount}</h5>
                    </div>
                    {/* <div className="col-sm-6 col-lg-6  col-xs-6" >
                    </div> */}
                  </div>
              <div className="row">
                <div className='col-sm-6 col-md-6'><a href="/deals"
                >View More Deals</a></div>
               {(localStorage.getItem("founder_id"))?
                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center'>
                  <a href="/founder-as-investor-dashboard" className='anchor_mobile'
                  >Go To Dashboard</a></div>:<div className='col-sm-6 col-md-6 col-lg-6 text-center'>
                  <a href="/investor-dashboard" 
                  >Go To Dashboard</a></div>}
              </div>
            </div>
           <div className="col-xs-4  col-sm-4 col-md-4 col-lg-4 "> <img  className='img-thumbnail mx-auto' src="./assets/images/men.png" style={{border:"0", backgroundColor:"rgb(250, 252, 255)"}} alt="" /></div>
          </div>
        </div>
      </div>
    </section>
  
  )
}

export default Success;
// ${process.env.REACT_APP_BASE_URL}success?order_id=1655221235_7_6_NaN&amount=5000.00&referenceId=885288304