
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';
import $ from 'jquery';
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
      this.getData(id);
    }
    $('#selected-field').focus();
    this.props.check();
  }

  getData = (id) => {
    let params = {
      founder_id: id
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
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:true },() => this.getData(this.state.founder_id));
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
         <section className="StepForm-section">
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
                          >Application</span>
                        </div>
                        <hr/>
                      </div>

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">LinkedIn</label>
                              <input 
                                type="text" 
                                name='linkdin'
                                id="selected-field"
                                value={this.state.linkdin}
                                onChange={(e) => this.setState({linkdin: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Facebook</label>
                              <input 
                                type="text" 
                                name='facebook'
                                value={this.state.facebook}
                                onChange={(e) => this.setState({facebook: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Instagram</label>
                              <input 
                                type="text" 
                                name='instagram'
                                value={this.state.instagram}
                                onChange={(e) => this.setState({instagram: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Youtube</label>
                              <input 
                                type="text" 
                                name='youtube'
                                value={this.state.youtube}
                                onChange={(e) => this.setState({youtube: e.target.value}) }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Others</label>
                              <input 
                                type="text" 
                                name='others'
                                value={this.state.others}
                                onChange={(e) => this.setState({others: e.target.value}) }
                              />
                            </div>
                             <div className="form-group d-flex justify-content-between">
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
                                <button 
                                  style={{ width:116,marginRight:13 }}
                                  class="submit-button" 
                                  onClick={() => this.save()}
                                >Save</button>
                                <button 
                                  style={{ width:190 }}
                                  class="submit-button" 
                                  onClick={() => this.saveandproceed()}
                                >Validate & Proceed</button>
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
