import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from "../common/Footer";
import Sidebar from './common/Sidebar2';
import { 
   Breadcrumb, 
  Card, message,
  Spin,Checkbox,Radio,
Input } from 'antd';
import Bridge from '../constants/Bridge';

class NationalityDetails extends Component {

    constructor(props) {
        super(props);                                                        
        this.state = {
            companyName: "",
            nationality:'',
            riskstatus:false,
            limitedstatus:false,                  
            divesestatus :false,
            cancellationstatus :false,
            researchstatus:false,
            formloader:false,
            typeofmember:'Indian Resident',
        }
    }
    
    onChangeMembertype = (e) => {
        this.setState({typeofmember:e.target.value});
        // console.log("kkk:",this.state.typeofmember);
    }
    onChangeRisk = (checked) => {
        this.setState({
            riskstatus:checked
        });
    }
    onChangeLimited = (checked) => {
        this.setState({
            limitedstatus:checked
        });
    }
    onChangeDiverse = (checked) => {
        this.setState({
            divesestatus:checked
        });
    }
    onChangeCancellationstatus = (checked) => {
        this.setState({
            cancellationstatus:checked
        });
    }
    onChangeReasearch = (checked) => {
        this.setState({
            researchstatus:checked
        });
    }
    finish=()=>{
      this.setState({formloader:true});
      let params = {
          id: localStorage.getItem('investor_id'),
          is_founder:'1',
      }
      Bridge.investor.updaterstatus(params).then((result) => {
          if (result.status == 1) {
              localStorage.setItem('investor_is_founder',1);
              this.setState({formloader:false});
              message.success('You have been registered as founder.');
              setTimeout(() => {
                  window.location.assign('/founder-dashboard');
              },2000);
          } else {
            this.setState({formloader:false});
          }
      });
  }
  handleChangeSelect = (e) => {
    this.setState({
      nationality:e.target.value,
    });
  }
  onSelectedCheckbox=(e)=>{
    this.setState({riskstatus:e.target.checked}); 
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
      <div className='hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ' >
            <section></section>
            <Sidebar  /> 
        </div>

          <div className='col col-md-10 pb-4'>
              <div style={{ marginTop:130}}>
                <Card 
                bordered
                title="Investor as Founder" 
                style={{ margin: 16 }}>
                <Breadcrumb
                  style={{ margin:'0' }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Investor as Founder</Breadcrumb.Item>
                </Breadcrumb>
                {/* main form  */}
                <div className="row">
                    <div className='col-12'>
                        <ul className="disc-list">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <label>
                            Company Name{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            className="form-input-field"
                            value={this.state.companyName}
                            onChange={(e) =>
                            this.setState({ companyName: e.target.value })
                            }
                        />
                        <div className='d-flex'>
                            <button type='button' className='black-button prime-bg'
                                onClick={this.finish}
                            >Submit</button>
                        </div>
                    </div>
                </div>
                {/* main form  */}

                
                </Card>
              </div>

                {/* How do i invest? */}
                <section id='hdii'>
                    
                </section>
            </div>

          <div className='col-md-2 col-0'></div>

      </div>
  
      <Footer />
  
  </div>
    )
  }
}
export default NationalityDetails;
