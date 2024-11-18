import React, { Component } from 'react';
import Header from '../../common/Header';
import Footer from "../../common/Footer";
import Sidebar from '../common/Sidebar';
import FormTab2 from '../Form3/FormTab2';
class Startup extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse' id="navbarSupportedContent">
            <section></section>
            <Sidebar />
          </div>
          <div className='hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ' >
            <section></section>
            <Sidebar /> 
          </div>
          <div className='col col-md-10 pb-4'>
            <FormTab2/>
          </div>
          <div className='col-md-2 col-0'></div>
        </div>
        <Footer/>
      </div>
    )
  }
}
export default Startup;