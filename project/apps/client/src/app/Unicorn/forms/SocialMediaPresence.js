
import React, { Component } from 'react';
import { message, Spin } from 'antd';

import $ from 'jquery';
import Bridge from '../../constants/Bridge';
class SocialMediaPresence extends Component {

  constructor(props) {
    super(props);
    this.state = {
      linkdin:'',
      facebook:'',
      instagram:'',
      youtube:'',
      others:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
    }
  }

  componentDidMount() {
    if(localStorage.getItem('founder_id')) {
      this.setState({founder_id:localStorage.getItem('founder_id')});
       let id = localStorage.getItem('founder_id');
     
    }
    $('#selected-field').focus();
    this.props.check();
  }

  getData = (id) => {
   let params = {
      founder_id: this.props.id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
            linkdin: result.data[0].linkdin,
            facebook: result.data[0].facebook,
            instagram: result.data[0].instagram,
            youtube: result.data[0].youtube,
            others: result.data[0].others,
        });
        if(result.data[0].linkdin) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
   updatefounder = () => {
 if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
   
    let params={
      linkdin:this.state.linkdin,
      facebook:this.state.facebook,
      instagram:this.state.instagram,
      youtube:this.state.youtube,
      others:this.state.others,
      founder_id: this.state.founder_id,
      no:9,
      main_founder_id:localStorage.getItem('founder_id'),
      f9_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {

      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:true },);
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Social media details are updated successfully.',6);
        } else {
          message.success('Social media details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  saveandproceed=()=>{
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());
  }

  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  render() {

    let active=false;

    return (
      <div>
         <section className="StepForm-section" style={{display:"block"}}>
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                     
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
                          >Social Media Presence</span>
                        </div>
                        <hr/>
                      </div>

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">LinkedIn</label>
                              <textarea  
                                type="text" 
                                name='tudSocialLinkedIn'
                                id="selected-field"
                                value={this.props.unicorn.tudSocialLinkedIn}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Facebook</label>
                              <textarea  
                                type="text" 
                                name='tudSocialFacebook'
                                value={this.props.unicorn.tudSocialFacebook}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Instagram</label>
                              <textarea  
                                type="text" 
                                name='tudSocialInsta'
                                value={this.props.unicorn.tudSocialInsta}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Youtube</label>
                              <textarea  
                                type="text" 
                                name='tudSocialYouTube'
                                value={this.props.unicorn.tudSocialYouTube}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>                            <div className="form-group">
                              <label for="">Others</label>
                              <textarea  
                                type="text" 
                                name='tudSocialOthers'
                                value={this.props.unicorn.tudSocialOthers}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                             <div className="form-group  justify-content-between" style={{display:"none !important"}}>
                              <div className='arrow-buttons'>
                                <button 
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: '#fff',
                                  border: '1px solid #29176f',
                                  color: '#29176f',
                                }} 
                                onClick={this.prev}
                                class="submit-button"><i className='bx bx-chevron-left'></i></button>
                                <button 
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: active==false ? '#fff' : '#fff',
                                  border: active==false ? '1px solid #29176f' : '1px solid #29176f',
                                  color: active==false ? '#29176f' : '#29176f',
                                }} 
                                onClick={this.next}
                                class="submit-button">
                                  <i className='bx bx-chevron-right'></i>
                                </button>
                              </div>
                              <div>
                              
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </Spin>
          </section>
       </div>
    )
  }
}

export default SocialMediaPresence;
