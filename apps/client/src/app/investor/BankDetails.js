import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from "../common/Footer";
import { message, Spin } from 'antd';
import Bridge from '../constants/Bridge';

export default class BankDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountno:'',
            ifsccode:'',
            formloader:false,
            id: '',
            interestedArr:[],
        }
    }

    componentDidMount() {
        let id = localStorage.getItem('investor_id');
        this.setState({ id: id });
    }

    onChangeifsc= (e) => {
        
        this.setState({
            ifsccode: e.target.value
        });
    }

    onChangeaccountno= (e) => {
        
        this.setState({
            accountno: e.target.value
        });
    }

    onSelectInterest = (value) => {
        let interestedArr = this.state.interestedArr;
        if(interestedArr.includes(value)) {
            interestedArr.splice(interestedArr.indexOf(value), 1);
        } else {
            interestedArr.push(value);
        }
        this.setState({
            interestedArr: interestedArr
        });
    }

    updatedetails = () => {
        if(this.state.accountno == '') {
            message.warning('Please enter account number');
            return;
        }
        if(this.state.ifsccode == '') {
            message.warning('Please enter IFSC Code');
            return;
        }
        if(this.state.accountno.length < 9) {
            message.warning('Please enter valid Account Number');
            return;
        }
        if(this.state.ifsccode.length != 11) {
            message.warning('Please enter valid IFSC Code');
            return;
        }

        this.setState({ formloader:true });

        let params = {
            accountno: this.state.accountno,
            ifsccode: this.state.ifsccode,
            id: this.state.id,
            intrestedin: this.state.interestedArr,
        }

        // $('#exampleModal,.modal-backdrop').removeClass('show');

        Bridge.investor.updatebankdetails(params).then((result) => {
            if (result.status == 1) {
              message.success(result.message);
              this.setState({
                formloader:false,
              });
              setTimeout(() => {
                window.location.assign('/investor-dashboard');
              },3000);
            } else {
              message.warning(result.message);
              this.setState({
                formloader:false,
              });
            }
        });


    }


  render() {
    return (
      <div>
        <Header />
       
        <section>
            <div className='m-5 ppnt'>
                <div className=' m-3 py-3'>
                    <h1>Complete your profile</h1>
                    <big className='text-secondary'><b>Help us with your Bank Account details and we'll make investing as easy as it can possibly get</b></big>
                </div>

                <div className='m-3 py-3'>
                    <Spin spinning={this.state.formloader}>
                    <form>
                        <div className="container">
                        <ul className="progressbar text-center">
                                <li className="actived active">KYC</li>
                                <li className="active">Bank Details</li>
                            </ul>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-12 m-auto">
                                    <div className="login mt-5" >
                                    
                                    <label ><b>Bank Account Number:</b></label>
                                    <input 
                                        type="text" 
                                        name="account" 
                                        className="form-input-field mt-4 mb-5" 
                                        placeholder='Account Number' 
                                        onChange={(e)=>this.onChangeaccountno(e)}
                                        value={this.state.accountno}
                                    /> 

                                    <label ><b>IFSC Code:</b></label>
                                    <input 
                                        type="text" 
                                        name="ifsc" 
                                        className="form-input-field mt-3" 
                                        placeholder='IFSC Code' 
                                        onChange={(e)=>this.onChangeifsc(e)}
                                        value={this.state.ifsccode}
                                    />  
                                    </div>   
                                    <div className='d-flex justify-content-end'>
                                        <button type="button" 
                                        className="small-button-dark prime-bg " 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal">
                                        submit
                                        </button>
                                    </div>    

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1>Please Choose startup sector you're interested in</h1>
                                                </div>
                                                <div className="row modal-body">

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12' htmlFor="healthTech">
                                                                 <input type="checkbox" id="healthTech" name="healthTech" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3' onClick={() => this.onSelectInterest('healthTech')}>healthTech</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto  mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12' htmlFor="edTech">
                                                                 <input type="checkbox" id="edTech" name="edTech" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('edTech')}
                                                                 >edTech</span>
                                                            </label>                                                                
                                                            
                                                        </div>  
                                                         
                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="finTech">
                                                                 <input type="checkbox" id="finTech" name="finTech" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('finTech')}
                                                                 >finTech</span>
                                                            </label>                                                                
                                                            
                                                        </div> 

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12'  htmlFor="artificialIntelligence">
                                                                 <input type="checkbox" id="artificialIntelligence" name="artificialIntelligence" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('artificialIntelligence')}
                                                                 >artificialIntelligence</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12' htmlFor="augmentedReality">
                                                                 <input type="checkbox" id="augmentedReality" name="augmentedReality" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('augmentedReality')}
                                                                 >augmentedReality</span>
                                                            </label>                                                                
                                                            
                                                        </div>

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="virtualReality">
                                                                 <input type="checkbox" id="virtualReality" name="virtualReality" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('virtualReality')}
                                                                 >virtualReality</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="blockChain">
                                                                 <input type="checkbox" id="blockChain" name="blockChain" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('blockChain')}
                                                                 >blockChain</span>
                                                            </label>                                                                
                                                            
                                                        </div> 

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="ECommerce">
                                                                 <input type="checkbox" id="ECommerce" name="ECommerce" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('ECommerce')}
                                                                 >ECommerce</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto mt-5 '>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="insurTech">
                                                                 <input type="checkbox" id="insurTech" name="insurTech" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('insurTech')}
                                                                 >insurTech</span>
                                                            </label>                                                                
                                                            
                                                        </div>  

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="electricVehicle">
                                                                 <input type="checkbox" id="electricVehicle" name="electricVehicle" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('electricVehicle')}
                                                                 >electricVehicle</span>
                                                            </label>                                                                
                                                            
                                                        </div> 

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="foodAndBeverages">
                                                                 <input type="checkbox" id="foodAndBeverages" name="foodAndBeverages" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('foodAndBeverages')}
                                                                 >foodAndBeverages</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto mt-5 '>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="cryptoCurrency">
                                                                 <input type="checkbox" id="cryptoCurrency" name="cryptoCurrency" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('cryptoCurrency')}
                                                                 >cryptoCurrency</span>
                                                            </label>                                                                
                                                            
                                                        </div> 

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="agriTech">
                                                                 <input type="checkbox" id="agriTech" name="agriTech" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('agriTech')}
                                                                 >agriTech</span>
                                                            </label>                                                                
                                                            
                                                        </div> 

                                                        <div className='col-4 mx-auto mt-5'>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="saas">
                                                                 <input type="checkbox" id="saas" name="saas" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('saas')}
                                                                 >saas</span>
                                                            </label>                                                                
                                                            
                                                        </div>      

                                                        <div className='col-4 mx-auto mt-5 '>                                                                                                             
                                                            
                                                            <label className='col-12 ' htmlFor="entertainment">
                                                                 <input type="checkbox" id="entertainment" name="entertainment" value="Bike" hidden />
                                                                 <span className='col-12 btn btn-secondary p-3'
                                                                 onClick={() => this.onSelectInterest('entertainment')}
                                                                 >entertainment</span>
                                                            </label>                                                                
                                                            
                                                        </div>   
                                                    
                                                </div>
                                                <div className="modal-footer">
                                                    <div className='d-flex justify-content-end'>
                                                        <button type="button" 
                                                        onClick={this.updatedetails}
                                                        className="small-button-dark prime-bg">Submit</button>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                    
                                    <hr style={{ 
                                        border: '1px solid rgb(170 167 167)',
                                        background: '#ddd',
                                        margin: '33px 0',
                                    }}/>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                    </Spin>
                </div>
            </div>
            
        </section>
        
        <Footer />
      </div>
    )
  }
}
