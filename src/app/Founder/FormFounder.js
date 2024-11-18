import React, { Component } from 'react';
import Header from '../common/Header';
import Sidebar from './common/Sidebar';
import FounderNewRegister from './forms/FounderNewRegister';
import Footer from "../common/Footer";
import Bridge from '../constants/Bridge';
import Success from './forms/Success';

class FormFounder extends Component {

  constructor(props){
    super(props);
    this.state={
      show:'',
    }
  }
  componentDidMount(){
    this.getData();
  }

  getData = () => {
    let id = localStorage.getItem('founder_id');
    let params = {
      founder_id: id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        if(result.data[0].send_me_copy_of_response){
          this.setState({show:true});
        }else{
          this.setState({show:false});
        }
      } else{
        this.setState({show:false});
      }
    });
  }

  render() {
    return (
        <div>
        <Header />
        <div className='row'>
          <div className='hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse' id="navbarSupportedContent">
              <section></section>
              <Sidebar/>
          </div>
          <div className='hiw-nav sidebar-max col-md-2 col-12 py-3 px-0 ' >
              <section></section>
              <Sidebar />
          </div>

          
          <div className='col-md col-12'>
            {this.state.show==true && <Success />}
            {this.state.show==false && <FounderNewRegister />}
          </div>
        </div>
        <Footer />
    </div>
    )
  }
}
export default FormFounder;
