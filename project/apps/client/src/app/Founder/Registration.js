
import React, { Component } from 'react';
import WebHeader from '../common/WebHeader';
import Footer from "../common/Footer";
import { message, Spin } from 'antd';
import Bridge from '../constants/Bridge';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      companyemail:'',
      flinkedinurl1:'',
      flinkedinurl2:'',
      rcompanyname:'',
      companylinkedinurl:'',
      companywebsiteurl:'',
      previousfundrounds:'',
      productdescription:'',
      tractiondescription:'',
      currentrevenue:'',
      currentteamsize:'',
      raiseincommunity:'',
      isGrowth91fitforyou:'',
      commitments:'',
      interestedraisingprivatefund: '',
      loading:false,
    }
  }

  register = () => {
    
    if(!this.state.name) {
      message.warning('Please enter your name');
      return;
    } else if(!this.state.companyemail) {
      message.warning('Please enter your company email');
      return;
    } else if(!this.state.flinkedinurl1) {
      message.warning('Please enter your founder linkedin url.');
      return;
    } else if(!this.state.rcompanyname) {
      message.warning('Please enter your registered company name.');
      return;
    } else if(!this.state.companylinkedinurl) {
      message.warning('Please enter your company"s linkedin url.');
      return;
    } else if(!this.state.previousfundrounds) {
      message.warning('Please enter your previous fund rounds.');
      return;
    } else if(!this.state.productdescription) {
      message.warning('Please describe about your product.');
      return;
    } else if(!this.state.tractiondescription) {
      message.warning('Please describe the traction.');
      return;
    }else if(!this.state.currentrevenue) {
      message.warning('Please enter the current revenue.');
      return;
    }else if(!this.state.currentteamsize) {
      message.warning('Please enter the current size of team members');
      return;
    }else if(!this.state.raiseincommunity) {
      message.warning('Please enter the answer Why do you want to raise in the community? ');
      return;
    }else if(!this.state.isGrowth91fitforyou) {
      message.warning('Please enter the answer for Growth91 is fit for you?');
      return;
    }else if(!this.state.commitments) {
      message.warning('Invalid commitments.');
      return;
    } else if(!this.state.interestedraisingprivatefund) {
      message.warning('Please select yes or not for interest.');
      return;
    }
    
    let params={
      name:this.state.name,
      companyemail:this.state.companyemail,
      flinkedinurl1:this.state.flinkedinurl1,
      flinkedinurl2:this.state.flinkedinurl2,
      rcompanyname:this.state.rcompanyname,
      companylinkedinurl:this.state.companylinkedinurl,
      companywebsiteurl:this.state.companywebsiteurl,
      previousfundrounds:this.state.previousfundrounds,
      productdescription:this.state.productdescription,
      tractiondescription:this.state.tractiondescription,
      currentrevenue:this.state.currentrevenue,
      currentteamsize:this.state.currentteamsize,
      raiseincommunity:this.state.raiseincommunity,
      istykefitforyou:this.state.isGrowth91fitforyou,
      commitments:this.state.commitments,
      interestedraisingprivatefund: this.state.interestedraisingprivatefund,
    }
    this.setState({
      loading: true,
    });
    Bridge.fundRaiseRegistration(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          name:'',
          companyemail:'',
          flinkedinurl1:'',
          flinkedinurl2:'',
          rcompanyname:'',
          companylinkedinurl:'',
          companywebsiteurl:'',
          previousfundrounds:'',
          productdescription:'',
          tractiondescription:'',
          currentrevenue:'',
          currentteamsize:'',
          raiseincommunity:'',
          isGrowth91fitforyou:'',
          commitments:'',
          interestedraisingprivatefund: '',
          loading:false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });

  }

  changeStatus = (param) => {
    this.setState({
      interestedraisingprivatefund: param,
    });
  }

  render() {
    return (
      <div>
        <WebHeader />
        <section className="rfoundation-section" style={{
          marginTop:180
        }}>
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1>Raise with Growth91</h1>
                      <p>Tell us a little about your company. This will help us understand your business better.</p>

                      <div className="line-seperator">
                        <div style={{
                          position: 'absolute',
                          top: -10,
                          background: '#fff',
                          paddingRight: 16,
                        }}>
                          <span
                          style={{
                            background: '#fff',
                            width: 119,
                            height: 20,
                            zIndex: 4,
                            position: 'relative',
                            paddingRight: 10,
                          }}
                          >Application</span>
                        </div>
                        <hr/>
                      </div>

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-9">
                            <div className="form-group">
                              <label for="">Your Name <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your name"
                                name='name'
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Company Email <span className="text-danger">*</span></label>
                              <input 
                                  type="email" 
                                  placeholder="Enter your ccmpany Email"
                                  name='companyemail'
                                  value={this.state.companyemail}
                                  onChange={(e) => this.setState({companyemail: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Founder's LinkedIn URL <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Founder's LinkedIn URL 1"
                                name='flinkedinurl1'
                                value={this.state.flinkedinurl1}
                                onChange={(e) => this.setState({flinkedinurl1: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Founder's LinkedIn URL </label>
                              <input 
                                type="text" 
                                placeholder="Founder's LinkedIn URL 2"
                                name='flinkedinurl2'
                                value={this.state.flinkedinurl2}
                                onChange={(e) => this.setState({flinkedinurl2: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Registered Company Name <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your registered Company Name"
                                name='rcompanyname'
                                value={this.state.rcompanyname}
                                onChange={(e) => this.setState({rcompanyname: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Company's LinkedIn Page <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your company's LinkedIn Page URL"
                                name='companylinkedinurl'
                                value={this.state.companylinkedinurl}
                                onChange={(e) => this.setState({companylinkedinurl: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Website <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your company's website URL"
                                name='companywebsiteurl'
                                value={this.state.companywebsiteurl}
                                onChange={(e) => this.setState({companywebsiteurl: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Describe your previous fundraising rounds <span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='previousfundrounds'
                                value={this.state.previousfundrounds}
                                onChange={(e) => this.setState({previousfundrounds: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Describe your product <span className="text-danger">*</span></label>
                              <textarea 
                              id="" cols="30" rows="6"
                              name='productdescription'
                              value={this.state.productdescription}
                              onChange={(e) => this.setState({productdescription: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Describe the traction <span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tractiondescription'
                                value={this.state.tractiondescription}
                                onChange={(e) => this.setState({tractiondescription: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Describe the revenue you are making <span className="text-danger">*</span></label>
                              <input 
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                placeholder="Enter your current revenue"
                                name='currentrevenue'
                                value={this.state.currentrevenue}
                                onChange={(e) => this.setState({currentrevenue: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">How big is the team? <span className="text-danger">*</span></label>
                              <input 
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                placeholder="Enter your current team size"
                                name='currentteamsize'
                                value={this.state.currentteamsize}
                                onChange={(e) => this.setState({currentteamsize: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Why do you want to raise in the community? <span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='raiseincommunity'
                                value={this.state.raiseincommunity}
                                onChange={(e) => this.setState({raiseincommunity: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What makes you think Growth91 is the right fit for you? <span className="text-danger">*</span></label>
                              <textarea id="" cols="30" rows="6"
                                name='isGrowth91fitforyou'
                                value={this.state.isGrowth91fitforyou}
                                onChange={(e) => this.setState({isGrowth91fitforyou: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Do you have any existing commitments? <span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='commitments'
                                value={this.state.commitments}
                                onChange={(e) => this.setState({commitments: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group ">
                                <label for="">Would you be interested in raising a Private Round? <span className="text-danger">*</span></label>
                                <div className='button-grp'> 
                                  <button 
                                  className={this.state.interestedraisingprivatefund=='Yes' && 'active'} 
                                  onClick={() => this.changeStatus('Yes')}
                                  >Yes</button>
                                  <button 
                                  className={this.state.interestedraisingprivatefund=='No' && 'active'} 
                                  onClick={() => this.changeStatus('No')}
                                  >No</button>
                                </div>
                            </div>
                            <div className="form-group d-flex justify-content-end">
                              <button className="submit-button"
                              onClick={this.register}
                              >Submit</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </Spin>
          </section>
        <Footer />
      </div>
    )
  }
}

export default Registration;
