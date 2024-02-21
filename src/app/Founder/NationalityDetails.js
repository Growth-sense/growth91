import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from "../common/Footer";
import Sidebar from './common/Sidebar';
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
       
        if(!this.state.typeofmember){
            message.warning('Please select nationality first.');
            return
        }
        if(this.state.riskstatus==false){
            message.warning('Please Accept the Term and Condition');
            return
        }
      this.setState({formloader:true});
      let params = {
          riskstatus:this.state.riskstatus==true ? '1' : '0',
          limitedstatus:this.state.limitedstatus==true ? '1' : '0',
          divesestatus: this.state.divesestatus==true ? '1' : '0',
          cancellationstatus: this.state.cancellationstatus==true ? '1' : '0',
          researchstatus:this.state.researchstatus==true ? '1' : '0',
          id: localStorage.getItem('founder_id'),
          is_investor:'1',
          nationality:this.state.typeofmember,
      }
      console.log('Nationality:',params);
      Bridge.investor.updaterstatus(params).then((result) => {
          if (result.status == 1) {
              localStorage.setItem('founder_is_investor',1);
              this.setState({formloader:false});
              message.success('You have been registered as investor.');
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
                title="Founder as investor" 
                style={{ margin: 16 }}>
                <Breadcrumb
                  style={{ margin:'0' }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Founder as investor</Breadcrumb.Item>
                </Breadcrumb>
                <br/><br/>

                {/* main form  */}
                <div className="row">
                    <div className="col-lg-12">
                        <Radio.Group
                            className="typeofmember-radio" 
                            onChange={this.onChangeMembertype} 
                            value={this.state.typeofmember}
                            style={{marginBottom:25}}
                        >
                            <Radio value={'Indian Resident'}>Indian Resident</Radio>
                            <Radio value={'Non Resident'}>Non Resident</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className='m-3'>
                    <Spin spinning={this.state.formloader}>
                    <big ><b>
                                <h4 className='mt-2 pb-3'>
                                    Investor Agreement and Risk Disclosure
                                </h4>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    As an investor, I am fully aware that investing in startups is extremely risky. I will only invest money that I can afford to lose completely without changing my lifestyle.
                                </p>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    I also note that investments in startups are highly illiquid as such companies are unlisted or private and cannot be sold easily on an exchange or similar secondary trading platform.
                                </p>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    As startup business plans are mostly based on ideas, future projections, and the strength and vision of the founding team, the future course of business is subjected to multiple external and internal risks. Accordingly, I understand that investing in multiple startup deals will help mitigate my risk.    
                                </p>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    Before investing, I shall do my own research and due diligence, in addition to reading the documents provided by the company, and get independent legal, accounting, and financial advice.     
                                </p>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    As all the investment decisions are taken by me without any external influence by the company or the Growth91 platform; I, in all circumstances, indemnify the company and Growth91 for any direct or indirect loss or damage of any kind, including financial loss.
                                </p>
                                <p style={{fontSize:17,paddingBottom:20,textAlign:'justify'}}>
                                    By signing this agreement, I agree to all the terms and conditions mentioned above and posted by Growth91 on the website in the future from time to time.
                                </p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Checkbox
                                        onChange={this.onSelectedCheckbox}
                                        value={this.state.riskstatus}
                                    >
                                        <p>
                                            &nbsp;&nbsp;I confirm that I read, understood, and agree.
                                        </p>  
                                    </Checkbox>
                                </div>                        
                            </b></big>
                            <div className='d-flex justify-content-end'>
                                <button type='button' className='black-button prime-bg'
                                    onClick={this.finish}
                                >Submit</button>
                            </div>
                    </Spin>
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
