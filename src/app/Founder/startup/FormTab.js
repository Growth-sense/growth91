
import React, { Component } from 'react';
class FormTab extends Component {
  constructor(props){
    super(props);
    this.state={
      user_role:'',
    }
  }
  render() {
    return (
      <div>
        <section className="rfoundation-section" 
          style={{marginTop:100}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>Strengths of Core Team, Founder and Advisor</h1>
                  <p>Tell us a little about your company. This will help us understand your business better.</p>
                </div>
                {this.state.user_role=='' && (
                  <div className="col-lg-12">
                    <div className="form-group ">
                      <label for="">Please select your role.<span className="text-danger">*</span></label>
                      <div className='button-grp'> 
                      <button 
                        className={this.state.user_role=='Founder' && 'active'} 
                        onClick={() => this.setState({user_role:'Founder'})}
                        style={{marginRight:10}}
                      >Founder</button>
                      <button 
                        className={this.state.user_role=='Core Team Member' && 'active'} 
                        onClick={() => this.setState({user_role:'Core Team Member'})}
                        style={{marginRight:10}}
                      >Core Team Member
                      </button>
                      <button 
                        className={this.state.user_role=='Advisor' && 'active'} 
                        onClick={() => this.setState({user_role:'Advisor'})}
                      >
                      Advisor
                      </button>
                      </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </section>
      </div>
    )
  }
}
export default FormTab;