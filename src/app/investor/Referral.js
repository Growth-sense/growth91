import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from "../common/Footer";
import Sidebar from './common/Sidebar';
import Sidebar2 from './common/Sidebar2';
import Innerreferral from './components/Referral';

class Referral extends Component {
    
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
          <div className='col-md-10 col-12'>
            <Innerreferral 
                investor_id={localStorage.getItem('investor_id')}
            />
            <br/><br/>
          </div>
          <div className='col-2'></div>
      </div>
      <Footer />
    </div>
    )
  }
}
export default Referral;

