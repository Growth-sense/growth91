import React, { Component } from 'react';
import Header from '../../common/Header';
import Footer from "../../common/Footer";
import Sidebar from '../common/Sidebar';
import InnerReferral from '../../investor/components/Referral';

class Referral extends Component {
  
  render() {
    return (
      <div style={{background: 'rgba(0, 0, 0, 0.036)'}}>
      <Header />
      <section></section>
  
      <div className='row'>
      
      {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
            style={{ width:'fit-content' }}> */}
      <div className='hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse' id="navbarSupportedContent">
            {/* <section></section> */}
            <Sidebar/>
        </div>
      <div className='hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ' >
            {/* <section></section> */}
            <Sidebar/> 
        </div>

          <div className='  col col-lg-8 pb-4 ' >
            <InnerReferral 
              investor_id={localStorage.getItem('founder_id')} 
            />
          </div>
          <div className='col-lg-2 col-0'></div>
      </div>
      <Footer/>
    </div>
    )
  }
}
export default Referral;
