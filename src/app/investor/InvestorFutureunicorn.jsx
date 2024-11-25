import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from "../common/Footer";
import Sidebar from './common/Sidebar';
import Sidebar2 from './common/Sidebar2';
import Innerreferral from './components/Referral';
import InvestorFutureunicornpage from './components/InvestorFutureunicornpage.jsx';

class InvestorFutureunicorn extends Component {
    
  render() {
    return (
      <div>
        <Header />
        <div className='row '>
        <div className='hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse' id="navbarSupportedContent">
            <section></section>
            <Sidebar/>
        </div>
      <div className='hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ' >
            <section></section>
            <Sidebar2  /> 
        </div>
        <div className='col-md-9 col-12 my-5' style={{ marginTop:50 }}>
          <div className='' style={{marginTop:65}}>
            
              <h2 className='text-center mb-5'> Future Unicorn</h2>
          </div>
            <InvestorFutureunicornpage 
                investor_id={localStorage.getItem('investor_id')}
            />
            <br/><br/>
          </div>
          <div className='col-2'></div>
      </div>
      <div className=''></div>

      <Footer />
    </div>
    )
  }
}
export default InvestorFutureunicorn;

