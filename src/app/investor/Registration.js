
import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Switch, Spin, message } from 'antd';
import Bridge from '../constants/Bridge';
import WebFooter from '../common/WebFooter';
class InvestorRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            riskstatus:false,
            limitedstatus:false,
            divesestatus :false,
            cancellationstatus :false,
            researchstatus:false,
            formloader:false,
            amount:0,
        }
    }
    componentDidMount() {
        if(!localStorage.getItem('reg_id')) {
            window.location.assign('/Signup');
        }
        this.getsettings();
    }
    getsettings = () => {
        Bridge.admin.settings.getsettings().then((result) => {
          if (result.status == 1) {
            this.setState({
              amount:result.data[0].amount,
            });
          }
        });
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
    finish = () => {
        // if(this.state.riskstatus==false) {
        //     message.warning('Please Accept the Term and Condition');
        //     return;
        //   }else if(this.state.limitedstatus==false) {
        //     message.warning('Please Accept the Term and Condition');
        //     return;
        //   } else if(this.state.divesestatus==false) {
        //     message.warning('Please Accept the Term and Condition');
        //     return;
        //   } else if(this.state.cancellationstatus==false) {
        //     message.warning('Please Accept the Term and Condition');
        //     return;
        //   }
        //   else if(this.state.researchstatus==false){
        //     message.warning('Please Accept the Term and Condition')
        //     return
        //   }

        this.setState({
            formloader: true
        });
        let params = {
            riskstatus:this.state.riskstatus==true ? '1' : '0',
            limitedstatus:this.state.limitedstatus==true ? '1' : '0',
            divesestatus: this.state.divesestatus==true ? '1' : '0',
            cancellationstatus: this.state.cancellationstatus==true ? '1' : '0',
            researchstatus:this.state.researchstatus==true ? '1' : '0',
            id: localStorage.getItem('reg_id'),
        }
        Bridge.investor.updaterstatus(params).then((result) => {
            if (result.status == 1) {
                this.setState({formloader: false});
                if(localStorage.getItem('member_type')!='premium'){
                    message.success(result.message);
                }
                if(localStorage.getItem('member_type')=='premium'){
                    this.pay();
                }else{
                    setTimeout(() => {
                        localStorage.removeItem('reg_id');
                        window.location.assign('/Login');
                    },2000);
                }
            } else {
              this.setState({
                formloader: false,
              });
            }
        });
    }
    // pa
    pay=()=>{
        let order_id='order-01';
        let user_id=localStorage.getItem('reg_id');
        let amount=this.state.amount;
        let url=`${process.env.REACT_APP_BASE_URL}cashfree/register/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}`;
        window.location.assign(url);
    }
  render() {
    return (
      <div>
        <Header />
        <section>
            <div className='m-5 ppnt'>
                <div className=' m-3 py-3'>
                    <h1>Become an Investor</h1>
                    <big className='text-secondary'><b>To invest through Growth91, you must understand the basics of Startup Investing. Please acknowledge that you are aware of the following:</b></big>
                </div>

                <div className='m-3 py-3'>
                    <Spin spinning={this.state.formloader}>
                        <form>
                            <big ><b>
                                <h5 className='mt-5'>1. Risk</h5>
                                <p>Investing in startups is extremely risky. You should only invest an amount you can afford to lose completely without changing your lifestyle.</p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Switch 
                                        name='riskstatus'
                                        value={this.state.riskstatus}
                                        onChange={this.onChangeRisk} 
                                    /> 
                                    <p>I understand that I can lose the money I'm investing</p>  
                                </div>                        
                            </b></big>
                            <big ><b>
                                <h5 className='mt-5'>2. Limited Transfer</h5>
                                <p>Investment in startups is highly illiquid as such companies are unlisted/private and cannot be sold easily on an exchange or similar secondary trading platform.</p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Switch 
                                        name='limitedstatus'
                                        value={this.state.limitedstatus}
                                        onChange={this.onChangeLimited} 
                                    />  
                                    <p>I understand that it may be difficult to transfer my investments</p>  
                                </div>                        
                            </b></big>
                            <big ><b>
                                <h5 className='mt-5'>3. Diversification</h5>
                                <p>Startup investing is highly speculative and every investment may result in a loss. By investing small amounts across multiple deals, you can reduce yours compared to a large investment in a single company.</p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Switch 
                                        name='divesestatus'
                                        value={this.state.divesestatus}
                                        onChange={this.onChangeDiverse} 
                                    />  
                                    <p>I understand that it's safer to split money across many investments across asset classes</p>  
                                </div>                        
                            </b></big>
                            <big ><b>
                                <h5 className='mt-5'>4. Cancellation</h5>
                                <p>Investment in startups is highly illiquid as such companies are unlisted/private and cannot be sold easily on an exchange or similar secondary trading platform.</p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Switch 
                                        name='cancellationstatus'
                                        value={this.state.cancellationstatus}
                                        onChange={this.onChangeCancellationstatus} 
                                    />  
                                    <p>I understand that it may be difficult to transfer my investments</p>  
                                </div>                        
                            </b></big>
                            <big ><b>
                                <h5 className='mt-5'>5. Research</h5>
                                <p>Do your own research. Read the documents provided by each company. Get independent legal, accounting and financial advice. If you have any questions or need more information, reach out to us via support.</p>
                                <div className='d-flex flex-row my-4 p-4 radio-sec'>
                                    <Switch 
                                        name='researchstatus'
                                        value={this.state.researchstatus}
                                        onChange={this.onChangeReasearch} 
                                    /> 
                                    <p>I understand that doing research is my own responsibility</p>  
                                </div>                        
                            </b></big>
                            <div className='d-flex justify-content-end'>
                                {localStorage.getItem('member_type')=='premium' ? (
                                    <button type='button' className='black-button prime-bg'
                                    onClick={this.finish}
                                    >Pay</button>
                                ):(
                                    <button type='button' className='black-button prime-bg'
                                        onClick={this.finish}
                                    >Finish</button>
                                )}
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

export default InvestorRegistration;
