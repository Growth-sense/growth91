
import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import { DealDetailMobile } from './common/DealDetailMobile';
import { Tabs, Collapse, message, Modal, Spin  } from 'antd';
import { ExclamationCircleOutlined,PlusOutlined } from '@ant-design/icons';
import Apis from './constants/Apis';
import moment from 'moment';
import Bridge from './constants/Bridge';
// import AnimatedNumber from 'react-animated-number';



const { Panel } = Collapse;
const { TabPane } = Tabs;


class DealDetailsInstapay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deal_id:'',
      investor_id:'',
      deal_name:'',
      deal_description:'',
      isPrivate:false,
      isFunded:false,
      tags:[],
      logo:'',
      youtube_url:'',
      dealenddays:0,
      kycstatus:false,
      bankstatus:false,
      amount:0,
      minamount:0,
      investmentmodal:false,
      confirmmodalstatus:false,
      deduct:false,
      agree:'',
      isInvested:false,
      name:'',
      email:'',
      mobile:'',
      conveniencefees:100,
      gst:0,
      amountplusgst:0,
      processingfees:0.0,
      totalamount:0.0,
      tdsstatus:false,
      legalfee:0.0,
      legalplusprocessing:0.0,
      label:'',
      percentage:0,
      tdsdeductedamount:0,
      order_token:'',
      pdffile:'',
      pitch_files:'',
      pitch_list:[],
    }
  }

  


  callback = (key) => {
    
  }

  componentDidMount() {
    let deal_id = localStorage.getItem('deal_id');
    this.setState({ deal_id: deal_id },() => {
      this.getDeals();
      this.get_pitch_list();
    });

    if(localStorage.getItem('investor_id')){
      let investor_id = localStorage.getItem('investor_id');
      this.setState({ investor_id: investor_id },() => this.getstatusdata());

      if(localStorage.getItem('deal_id') && localStorage.getItem('investor_id')){
        this.getinvestmentdetails();
      }
    }
    this.getdealsettings();
    this.getordertoken();
  }

  getordertoken = () => {
    Bridge.getcashfreetoken().then((result) => {
      let orderToken = result.order_token;
      this.setState({ order_token: orderToken });
    });
  }

  // get post list
  getdealsettings = () => {
    this.setState({ formloader: true });
    Bridge.admin.settings.getdealsettings().then((result) => {
      if (result.status == 1) {
        this.setState({
          label: result.data[0].label,
          percentage: result.data[0].percentage,
        });
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }

  get_pitch_list = () => {
    this.setState({ loading:true });
    let params = {
      deal_id: localStorage.getItem('deal_id'),
    }
    Bridge.deal.get_image_list_of_pitch(params).then((result) => {
      if (result.status == 1) {        
        let arr=[];
        for(let data of result.data){
          let pitchImg=Apis.IMAGEURL+'deal/pitch_images/'+data.deal_id+'/'+data.image;
          data.img=pitchImg;
          arr=[...arr,data];
        }
        arr.sort((a,b) => (a.pitch_order > b.pitch_order) ? 1 : ((b.pitch_order > a.pitch_order) ? -1 : 0));
        console.log('arr',arr);
        this.setState({pitch_list:arr,loading:false});
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  getinvestmentdetails = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: localStorage.getItem('investor_id'),
      deal_id: localStorage.getItem('deal_id'),
    }
    Bridge.investor.getinvestmentdetails(params).then((result) => {
      if (result.status == 1) {
        if(result.data != ''){
          this.setState({ isInvested: true });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  // DealDetailMobile = () =>{
  //   const [toggleState, setToggleState] = useState(1);
  
  //   const toggleTab = (index) => {
  //     setToggleState(index);
  //   }


  // get deal list
  getstatusdata = () => {
    this.setState({ loading: true });
    let params = {
      id: this.state.investor_id
    }
    Bridge.users.getstatusdata(params).then((result) => {
      if (result.status == 1) {
        
        this.setState({
          kycstatus: result.data[0].kycstatus,
          bankstatus: result.data[0].ifsc_code ? true : false,
          loading: false,
          name:result.data[0].first_name +' '+result.data[0].last_name,
          email:result.data[0].email,
          mobile:result.data[0].mobile,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  }

  // get deal list
  getDeals = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          loading: false,
        });
        for(let d of result.data) {
          if(d.deal_id == this.state.deal_id) {
            let logourl = Apis.IMAGEURL+'deal/logo/'+d.deal_id+'/'+d.logo;
            let dealEndDate= moment(d.deal_end_date);
            let currentDate=moment();
            let days =this.getDifferenceInDays(currentDate,dealEndDate);
            let differece=days.toFixed();
            
            let pdffile = `${process.env.REACT_APP_BASE_URL}api/uploads/deal/pitch/${d.deal_id}/${d.pitch_file}`;
            let pitchImg = Apis.IMAGEURL+'deal/pitch_images/'+d.deal_id+'/'+d.pitch_files;
            this.setState({
              deal_name: d.name,
              deal_description:d.Muliples_of,
              isPrivate:d.deal_type=='Private' ? true : false,
              isFunded:d.deal_status=='Closed' ? true : false,
              tags:d.deal_category ? JSON.parse(d.deal_category) : [],
              logo:logourl,
              youtube_url:d.youtubelink,
              dealenddays: d.deal_end_date ? differece : 0,
              minamount:d.Min_inv_amt,
              amount: d.Min_inv_amt,
              pdffile: pdffile,
              pitch_files: pitchImg,
            },() => this.calculategst())
          }
        }
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  }

  getDifferenceInDays = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  showalertmessage  = () => {
    message.warning('Please complete your KYC process or bank details to access this deal.');
  }

  showmodal = () => {
    if(this.state.amount < this.state.minamount){
      message.warning('Minimum investment amount is '+this.state.minamount);
      return;
    }
    
    if(this.state.kycstatus =='' || this.state.bankstatus == false){
      this.showalertmessage();
      return;
    }
    if(this.state.agree == false){
      message.warning('Please agree to terms and conditions');
      return;
    }
    // show razorpay
    this.showrazorpay('2');
  }

  showModal1 = () => {
    if(this.state.kycstatus!='Approved'){
      message.warning('Dear Investor,You need to complete the KYC before you can invest in the deal.',10);
      setTimeout(()=>{
        window.location.assign('/investor-kyc');
      },2000);
      return;
    }
    this.setState({
      investmentmodal:true,
    })
  };

  handleOk1 = () => {
    this.setState({
      investmentmodal:false,
    })
  };

  handleCancel1 = () => {
    this.setState({
      investmentmodal:false,
    })
  };

  showModal2 = () => {
    this.setState({
      confirmmodalstatus:true,
    })
  };

  handleOk2 = () => {
    this.setState({
      confirmmodalstatus:false,
    })
  };

  handleCancel2 = () => {
    this.setState({
      confirmmodalstatus:false,
    })
  };

  onChangeCheckbox = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });

    if(e.target.name == 'deduct'){
      if(e.target.checked == true){
        let processingfees = parseFloat((this.state.amount/100)*parseFloat(this.state.percentage));
        let tdsamount= parseFloat(processingfees/100)*10;
        let minusamt = parseFloat(processingfees - tdsamount);
        
        this.setState({
          processingfees:minusamt,
          tdsdeductedamount: tdsamount,
        })
      } else {
        let processingfees = parseFloat((this.state.amount/100)*parseFloat(this.state.percentage));
        this.setState({
          processingfees:processingfees,
          tdsdeductedamount: 0,
        })
      }
    }
  };

  // investing your money
  invest = () => {
    if(Number(this.state.amount) < Number(this.state.minamount)){
      message.warning('Minimum investment amount is '+this.state.minamount);
      return;
    }
    if(this.state.agree != true) {
      message.warning('Please agree to terms and conditions');
      return;
    }
    
    let investor_id= this.state.investor_id;
    let deal_id= this.state.deal_id;
    let Investment_amt= this.state.amount;
    let deductstatus= this.state.deduct==true ? '1' : '0';
    let agreestatus= this.state.agree==true ? '1' : '0';
    let payment_ref= this.state.order_token;
    let tdsstatus= this.state.tdsstatus==true ? '1' : '0';
    let processingfees= this.state.processingfees;
    let gst= this.state.gst;
    let legalfees= this.state.legalfee;
    let order_id = 'order-01';
    
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php?investor_id=${investor_id}&deal_id=${deal_id}&deductstatus=${deductstatus}&agreestatus=${agreestatus}&payment_ref=${payment_ref}&tdsstatus=${tdsstatus}&processingfees=${processingfees}&gst=${gst}&legalfees=${legalfees}&Investment_amt=${Investment_amt}&order_id=${order_id}`;
    // console.log('url',url);
    window.location.assign(url);
  }

  loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () =>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

showrazorpay = async () => {
    let res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if(!res) {
        message.warning('You are offline');
        return;
    }
    const options = {
        key: 'rzp_test_kLw6tif291d4Qb',
        currency:'INR',
        amount: this.state.totalamount && parseInt(this.state.totalamount*100),
        name: 'Growth 91',
        description: 'Thanks you for investing in company.',
        image:'./logo.jpeg',
        handler: (response) => {
          message.success('Payment is done successfully.');
          this.invest(response.razorpay_payment_id);
        },
        prefill: {
          name:this.state.name,
          email: this.state.email,
          contact: this.state.mobile,
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#00612e"
        }
    };

    // toggleclass=()=>{
    //   const [toggleState, setToggleState] = useState(1)
  
    // const toggleTab = (index) => {
    //   setToggleState(index)
    //   } };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  }

  calculategst = () => {

    let legalfee = parseFloat((this.state.amount/100)*parseFloat(this.state.percentage));
    let processingfees = parseFloat((this.state.amount/100)*parseFloat(this.state.percentage));
    let legalplusprocessing = parseFloat(legalfee)+parseFloat(processingfees);

    // gst and total amount with gst
    let gst = parseFloat((legalfee/100)*18);

    let amt= parseFloat(this.state.amount);
    // parseFloat(gst) + 
    this.setState({
      gst:gst.toFixed(2),
      legalfee: legalfee.toFixed(2),
      amountplusgst:amt.toFixed(2),
      processingfees: legalfee.toFixed(2),
      totalamount: (amt+parseFloat(legalfee)).toFixed(2),
    })
    return gst;
  }

  checkfortds = (type) => {
    if(type == '1'){
      let tenper= parseFloat(this.state.totalamount) - parseFloat((this.state.amount/100)*10);
      this.setState({
        tdsstatus:true,
        totalamount: tenper.toFixed(2),
      } , () => this.showrazorpay());
    } else {
      this.setState({
        tdsstatus:false,
      } , () => this.showrazorpay());
    }
  }


  render() {

    const genExtra = () => (
      <PlusOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    );



    
    
        
    return (
      <div>
        <WebHeader />

        <section className="deals-details-page" style={{ marginTop:181 }}>
          <div className="container main-section">
            <div className="row">

              
                <div className="col-lg-5">
                <Spin spinning={this.state.loading}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {/* Image is static */}
                    
                      <img src="./web/images/iplogo.jpg" alt='deal-img' className="img-fluid"/>

                      <h5>Instapay</h5>
                    </div>
                  
                  </div>
                  <div className='d-flex tags'>
                   
                      <div className='hero-tag'                      
                      style={{
                        background: 'rgb(41 23 111)',
                        color: '#fff',
                      }}    
                      > 
                        Payment
                      </div>
                   
                  </div>
                  <p>
                  InstantPay is India’s largest Neo Banking platform delivering full stack banking services to individuals and businesses of all sizes
                  </p>
                  <div className='percentage-values'>
                    <div>
                        <h3>17.00%</h3>
                        <span>RAISED</span>
                    </div>
                    <div style={{ textAlign: 'right', }}>
                        <h3>8 Days</h3>
                        <span>BEFORE CAMPAIGN ENDS</span>
                    </div>
                  </div>
                  <div className='progress-bar'>
                    <div className='active'></div> 
                  </div>
                  
                    <div className='button-group'>
                      <a className='prime-bg' href="/Login">Login</a>
                      <button className='share-button'>
                        <i className='bx bxs-share'></i>
                      </button>
                    </div>
                  {/* (
                    <> 
                     <div className='button-group'>
                          <a href="#" className="black-button prime-bg" 
                          onClick={() => this.showalertmessage()}
                          >Payment</a>
                          <button className='share-button'>
                            <i className='bx bxs-share'></i>
                          </button>
                        </div>
                       (
                        <div className='button-group'>
                          {this.state.isFunded==true ? (
                            <a 
                              href="#" 
                              className="black-button prime-bg"
                            >
                              Deal is closed
                            </a>
                          ) : this.state.isInvested==true ? (
                            <a style={{ 
                              padding:'11px 7px',
                            }} href="#!" onClick={() => this.showModal1()} className="black-button prime-bg"
                            >
                              You have already invested. Do you want to reinvest?
                            </a>
                          ): (this.state.isPrivate==true ? (
                            <a href="#" className="black-button prime-bg"
                            >Private Deal</a>
                          ):(
                            <a href="#" className="black-button prime-bg"
                            onClick={() => this.showModal1()}
                            >
                              Payment
                            </a>
                          ))}
                          <button className='share-button'>
                            <i className='bx bxs-share'></i>
                          </button>
                        </div>
                      )} 
                      
                      </>
                   */}
                  </Spin>
                </div>
              

              {/* <Modal 
                title={`Invest in ${this.state.deal_name}`} 
                visible={this.state.investmentmodal} 
                onOk={this.handleOk1} 
                onCancel={this.handleCancel1}
                width={600}
                footer={false}
              >
                <div className="row modal-body">

                  <div className="login mt-3" >
                      
                    <label ><b>Amount: (Minimum investment amount should be Rs. {this.state.minamount})</b></label>
                    <input 
                      type="text" 
                      name="amount" 
                      className="form-input-field mt-4 " 
                      placeholder='amount' 
                      value={this.state.amount}
                      onChange={(e) => {
                        this.setState({
                          amount: e.target.value
                        },() => this.calculategst())
                      }}
                    /> 

                  </div>  

                  <div className=' d-flex justify-content-center modal-table'>
                    <table className='table-ict col-12 m-5'>
                      <tr className='text-center'>
                        <th>Particulars</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>Convenience Fees
                          <br/><span>{this.state.label}</span>
                        </td>
                        <td lassName='text-center'>{this.state.processingfees}</td>
                      </tr>
                      <tr>
                        <td>Investment Ammount
                          <br/><span>Includes GST - 18%</span>
                        </td>
                        <td lassName='text-center'>
                          {this.state.amountplusgst}
                        </td>
                      </tr>
                      {/* <tr>
                        <td>GST - 18%</td>
                        <td lassName='text-center'>{this.state.gst}</td>
                      </tr> *
                      <tr>
                        <td>Total</td>
                        <td lassName='text-center'>
                          {parseFloat(this.state.totalamount).toFixed(2)}
                        </td>
                      </tr>
                       {this.state.deduct && (
                        <tr>
                          <td>TDS Deducted</td>
                          <td lassName='text-center'>
                            {parseFloat(this.state.tdsdeductedamount).toFixed(2)}
                          </td>
                        </tr>
                      )} 
                    </table>
                  </div>

                  <div className='m-3'>
                    <label className="container-check">I Agree to the all terms of uses and have read all Privacy Policy
                      <input type="checkbox" name="agree" onChange={this.onChangeCheckbox}  />
                      <span className="checkmark"></span>
                    </label>

                    {/* <label className="container-check">I will deduct TDS on service charges and deposit to Income tax on time
                      <input type="checkbox" name="deduct" onChange={this.onChangeCheckbox}  />
                      <span className="checkmark"></span>
                    </label> 

                  <div className="col-11">
                    <button type="button" className="login-button bg-primary mx-4" 
                    onClick={this.invest}>Pay Online</button>
                    <input onClick={this.invest} type="button" value='Pay Offline' className="login-button mx-4 my-3">
                    </input>
                  </div>
                  </div>
              </Modal> */}



              {/* <Modal 
                title="Deduct TDS" 
                visible={this.state.confirmmodalstatus} 
                onOk={this.handleOk2} 
                onCancel={this.handleCancel2}
                width={700}
                footer={false}
              >
                <div className="row">

                  <div style={{width: '100%'}}>
                  <p style={{margin: '10px', maxWidth: '100%'}}>TDS is applicable according to Section-194j of the income Tex act, 1961.</p> 
                  <p style={{margin: '10px', maxWidth: '100%'}}>Rate: 10%</p> <br/>
                  <p style={{margin: '10px', maxWidth: '100%'}}><b>Do you want to Deduct TDS?</b></p>
                  </div>

                  <div className="col-11">
                    <button type="button" 
                    className="login-button bg-primary mt-4 mx-4"
                    onClick={()=> this.invest()}
                    >Yes</button>
                    <input 
                    type="button" 
                    value='No Thanks' 
                    onClick={()=> this.invest()}
                    className="login-button mx-4 my-3"></input>

                  </div>

                </div>
              </Modal> */}
                          

                <div className="col-lg-7">
                  <iframe 
                    style={{
                      boxShadow: '0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)',
                      borderRadius:3,
                      // marginLeft: 65,
                    }}
                    width="100%" 
                    height="335" 
                    src="https://www.youtube.com/watch?v=PJaWa3Zyxlw&t=10s" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  
                </div>       
            </div>


            <div className='container extra-info'
            style={{ maxWidth:1075 }}>
              {/* <div className='row align-items-center'>
                <div className='col-lg-4'>
                    <h3>Artment's AMA</h3>
                    <p>
                      <strong>What Is An AMA?</strong><br/><br/>
                      AMA (Ask Me Anything) is a 45-60 minute online zoom session for investors to directly interact with the startup founders and ask any questions that they have regarding the startup or the campaign.
                    </p>
                </div>
                <div className='col-lg-3'>
                  <div className='middle'>
                    <span>Recorded On</span>
                    <p>
                      7:00 PM <br/>
                      26th Apr 2022
                    </p>
                  </div>
                </div>
                <div className='col-lg-5'>
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/tqgt5Arx4wM" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div> */}
            </div>
            
            <div className='container home-decor-section'>
              <h1 className='text-center'>Home Decor - Market Overview</h1>
              <div className='row'>
                <div className='col-lg-4'>
                    <div className='single text-center'>
                      <h2>₹34,00,000</h2>
                      <p>Funding amount</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='single text-center'>
                      <h2>51-100</h2>
                      <p>Employees are working</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='single text-center'>
                      <h2>12</h2>
                      <p>Startups funded in past 5 years</p>
                    </div>
                </div>  
                  
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <p className='mb-0 pr-2'>Powered by</p>
                <img src='./assets/images/deals-details/hackstrap.webp'
                style={{
                  maxWidth: 85,
                  height: 15,
                }} />
              </div>
            </div>


            <div className='container highlight-section'>
              <h1>Highlights</h1>
              <div className='row'>
                <div className='col-lg-6'>
                    <div className='single text-center'>
                      <img src='./assets/images/deals-details/highlights/1.webp' />
                      <p>120k+ Customers</p>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='single text-center'>
                      <img src='./assets/images/deals-details/highlights/2.webp' />
                      <p>70Crore+ Revenues so far</p>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='single text-center'>
                      <img src='./assets/images/deals-details/highlights/3.webp' />
                      <p>Selected in Amazon Global Selling Accelerator Program</p>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='single text-center'>
                      <img src='./assets/images/deals-details/highlights/4.webp' />
                      <p>Made In India Brand</p>
                    </div>
                </div>  
              </div>
            </div>

          </div>
        </section>  


       <div className='pitch-mobile'>

        {/* <DealDetailMobile/> */}

        <div className='pitch-btn-mobile row '>
                {/* <div className='col-2'>
                  
                </div> */}
                <div className='col'>
                  <a className='support-button' type="button" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Pitch </a>
                </div>
                <div className='col'>
                  <a className='support-button' type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">FAQ </a>
                </div>
                <div className='col' >
                  <a className='support-button' type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample3">Deal</a>
                </div>
                <div className='col'>
                  <a className='support-button' type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample4" aria-expanded="true" aria-controls="multiCollapseExample4">Team </a>
                </div>
               
        </div>
       <div className='container pitch-div mt-3 collapse multi-collapse show'  id="multiCollapseExample1">
                  
                  
                  <img                      
                    src="./web/images/ippitch.png"
                    style={{
                      width:'100%',                           
                    }}
                  />
             
             
            </div>
            <div className="container mt-4 collapse multi-collapse "  id="multiCollapseExample2">
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <h1 className='text-center'>About InstantPay</h1>
                        <Collapse
                          defaultActiveKey={['1']}
                          onChange={this.callback}
                          expandIconPosition='left'
                        >
                          <Panel header="Instapay Registration — How it is Useful and How to Apply?" key="1" extra={genExtra()}>
                            <div>
                              The backbone of the Indian economy, Micro, Small, and Medium Enterprises (MSMEs) play a vital role in the development of the country as a whole. With the growth and progress of these small-scale industries, the economy of India flourishes. The Instapay Registration for MSMEs is a big boost for new and existing businesses.
                            </div>
                          </Panel>
                          <Panel header="What is Instapay Registration or MSME Registration?" key="2" extra={genExtra()}>
                            <div>
                            Launched by the Ministry of MSME, Instapay Registration is completely online, paperless, and there is no cost or fee for registration. Simple and easy, the registration can be done in the government portal, i.e. https://Instapayregistration.gov.in/Government-India/Ministry-MSME-registration.htm.
                            </div>
                          </Panel>
                          <Panel header="Benefits of Instapay Registration?" key="3" extra={genExtra()}>
                            <div>
                            Government registration for MSMEs provides entrepreneurs with a unique identification number and a recognition certificate. The primary objective here is to provide full benefits to the MSME industries in India, including but not limited.
                            </div>
                          </Panel>
                          <Panel header="Requirement for Registration?" key="4" extra={genExtra()}>
                            <div>
                              Our AOV is Rs.2,900/-, and CAC is Rs.950/- with 26% repeat customers every month.
                            </div>
                          </Panel>
                                                
                        </Collapse>

                        <h1 className='text-center'>About Growth91</h1>
                        <Collapse
                          defaultActiveKey={['1']}
                          onChange={this.callback}
                          expandIconPosition='left'
                        >
                          <Panel header="Do these startups undergo due diligence?" key="7" extra={genExtra()}>
                            <div>
                              Startups are displayed to the investors only after due diligence has been conducted by us and an independent screening committee specially formed for the purpose of conducting due diligence of the same.
                            </div>
                          </Panel>
                          <Panel header="What kind of documentation will I need to sign?" key="8" extra={genExtra()}>
                            <div>
                              Each investor must sign the T-SAFE agreement and agree to a Risk Disclosure agreement.
                            </div>
                          </Panel>
                          <Panel header="Do you offer any guarantee or returns?" key="9" extra={genExtra()}>
                            <div>
                              No, we do not guarantee any returns.
                            </div>
                          </Panel>
                          <Panel header="If I invest in a startup and they fail to reach their funding goal, will I be refunded?" key="10" extra={genExtra()}>
                            <div>
                              Yes, if a company fails to meet their funding goal all investments in that company will be cancelled and refunded within 15 working days to the bank account from which the investment has been made. Please note, there will be no interest or any other form of compensation paid on these returned funds.
                            </div>
                          </Panel>
                        </Collapse>
                      </div>
                    </div>
                  </div>

                  <div className="container mt-4 collapse multi-collapse "  id="multiCollapseExample3">
                  <div className="row">
                    <div className="col-lg-10 m-auto">
                      <h1>Documents</h1>
                      <div className="row document-section">
                        <div className="col-lg-6">
                          <p className='mb-0 pb-0'>
                          InstantPay is India’s largest Neo Banking platform delivering full stack banking services to individuals and businesses of all sizes.
                          <br/><br/>Founded in July 2015 by three IIT Kharagpur graduates, smallcase was started to introduce a new generation of investors to the Indian equity markets using technology in 2013 

                          </p>
                        </div>
                        <div className="col-lg-6">
                          <div className="download-section">
                            <div className="d-flex">
                              <p className='mb-0 pb-0'>Company Certificates</p>
                              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 37.15 46.63" stroke="#e5e5e5"><g fill="currentColor" stroke="#e5e5e5"><path d="M25.09.85a1.1 1.1 0 00-.8-.35H6.5a6.02 6.02 0 00-6 5.98v33.66a6.02 6.02 0 006 5.99h24.15a6.02 6.02 0 006-5.99V13.42a1.19 1.19 0 00-.32-.77zm.32 3.54l7.53 7.9h-4.9a2.63 2.63 0 01-2.63-2.62zm5.24 39.53H6.5a3.82 3.82 0 01-3.8-3.78V6.48A3.82 3.82 0 016.5 2.7h16.7v6.97a4.82 4.82 0 004.84 4.83h6.4v25.64a3.81 3.81 0 01-3.79 3.78zm0 0"></path><path d="M27.65 36.32H9.5a1.1 1.1 0 100 2.2h18.16a1.1 1.1 0 10-.01-2.2zm0 0"></path><path d="M17.77 32.36a1.1 1.1 0 001.6 0l6.47-6.93a1.1 1.1 0 10-1.61-1.5l-4.55 4.88V16.78a1.1 1.1 0 00-2.2 0V28.8l-4.55-4.88a1.1 1.1 0 00-1.6 1.5zm0 0"></path></g></svg>
                            </div>
                            <div className="d-flex">
                              <p className='mb-0 pb-0'>Company Due Dilligence</p>
                              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 37.15 46.63" stroke="#e5e5e5"><g fill="currentColor" stroke="#e5e5e5"><path d="M25.09.85a1.1 1.1 0 00-.8-.35H6.5a6.02 6.02 0 00-6 5.98v33.66a6.02 6.02 0 006 5.99h24.15a6.02 6.02 0 006-5.99V13.42a1.19 1.19 0 00-.32-.77zm.32 3.54l7.53 7.9h-4.9a2.63 2.63 0 01-2.63-2.62zm5.24 39.53H6.5a3.82 3.82 0 01-3.8-3.78V6.48A3.82 3.82 0 016.5 2.7h16.7v6.97a4.82 4.82 0 004.84 4.83h6.4v25.64a3.81 3.81 0 01-3.79 3.78zm0 0"></path><path d="M27.65 36.32H9.5a1.1 1.1 0 100 2.2h18.16a1.1 1.1 0 10-.01-2.2zm0 0"></path><path d="M17.77 32.36a1.1 1.1 0 001.6 0l6.47-6.93a1.1 1.1 0 10-1.61-1.5l-4.55 4.88V16.78a1.1 1.1 0 00-2.2 0V28.8l-4.55-4.88a1.1 1.1 0 00-1.6 1.5zm0 0"></path></g></svg>
                            </div>
                            <button className='download-button'>Download</button>
                          </div>
                        </div>
                      </div>

                      <h1>Deal Terms</h1>
                      <section className="deal-terms-section">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="info">
                                  <span>End Date</span>
                                  <h4>31th oct, 2022</h4>
                              </div>
                              <div className="info">
                                <span> Min Investment</span>
                                <h4> 1,000rs</h4>
                              </div>
                              <div className="info">
                                <span><i className='bx bxs-lock-alt'></i>1,60,00,000 Target</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>


                      <h1>About Artment</h1>
                      <section className="deal-about-artment-section">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="info">
                                  <span>Legal Name</span>
                                  <h4>InstantPay Private Limited</h4>
                              </div>
                              <div className="info">
                                <span>Founded</span>
                                <h4>February, 2013</h4>
                              </div>
                              <div className="info">
                                <span>Form</span>
                                <h4>Private</h4>
                              </div>
                              <div className="info">
                                <span>Employees</span>
                                <h4>51-100</h4>
                              </div>
                              <div className="info">
                                <span>Website</span>
                                <h4>
                                  <a style={{ color:'rgb(7, 211, 252)' }} href="https://theartment.com/" target="_blank">
                                    https://InstantPay.com/
                                  </a>
                                </h4>
                              </div>
                              <div className="info">
                                <span>Social Icons</span>
                                <div className='social-icons'>
                                  <a href='#'>
                                    <i className='bx bxl-facebook fs-19'></i>
                                  </a> 
                                  <a href='#'>
                                    <i className='bx bxl-linkedin fs-19'></i>
                                  </a>
                                  <a href='#'>
                                    <i className='bx bxl-instagram fs-19' ></i>
                                  </a>
                                </div>
                              </div>
                              <div className="info">
                                <span>Headquarters</span>
                                <h4>Delhi [HQ]
                                  B1/A5, Mohan Cooperative Industrial Estate
                                  New Delhi - 110044 
                                  , India</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>


                <div className="container meet-the-team-section collapse multi-collapse "  id="multiCollapseExample4"
            style={{ maxWidth:921 }}>
              <h2 className="text-center">Meet the Team</h2>
              <div className="row">

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./web/images/ashneer1.jpg" alt=""/>
                        <div className='intro'>
                          <h3>Ashneer Grover</h3>
                          <span>CEO</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.facebook.com/ashneergrover/' target="_blank">
                              <i className='bx bxl-facebook'></i>
                            </a>
                            <a href='https://www.linkedin.com/in/ashneergrover/' target="_blank"><i className='bx bxl-linkedin'></i></a>
                            <a href='https://www.instagram.com/ashneergrover/' target="_blank"><i className='bx bxl-instagram' ></i></a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Business Economics graduate with 18 years of eCommerce experience and Banking. <br/><br/>

                        Started selling on Bharatpay in the year 2018. Digital Marketing Expert with hands-on experience in paid ads and website optimisation.
                      </p>
                    </div>
                  </div>

                  {/* <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/2.webp" alt=""/>
                        <div className='intro'>
                          <h3>Aanchal Agarwal</h3>
                          <span>CEO</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/aanchal-agarwal-65991459/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                            </a>
                            <a href='https://instagram.com/aanchal5783?r=nametag'>
                              <i className='bx bxl-instagram' ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>
                      CA finalist and CFA scholar. Specialisation in MIS, Audit, Budgeting, Working Capital Management, etc. <br/><br/>

                      Optimises and leads company’s operations, efficiency and finances.
                      </p>
                    </div>
                  </div> */}

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/3.webp" alt=""/>
                        <div className='intro'>
                          <h3>Kritika Agarwal</h3>
                          <span>Marketing Lead</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/kritika-agarwal-5b33618b/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Post graduate from NIFT. Seasoned marketing professional with 5+ years of experience in performance marketing with multiple D2C brands managing their e-commerce branding, social media engagement, experience targeted PPC campaigns and user growth.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/4.webp" alt=""/>
                        <div className='intro'>
                          <h3>Kush Rawat</h3>
                          <span>Creative Lead</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/kush-rawat-21050212a/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                              </a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Creative professional with an a graduate degree from Indian Institute of Photography. Having worked with Zomato, Quickr and IAAH in the past, Kush sets the creative lens of Artment though his advanced skills in photography and creative production.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/5.webp" alt=""/>
                        <div className='intro'>
                          <h3>Rohit Guha</h3>
                          <span>Advisor</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/rohitguha/'
                            target="_blank">
                              <i className='bx bxl-linkedin'></i></a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Over three decades in the business of International Trade/Exports, eCommerce, and Supply Chain Management of hard and soft line lifestyle products.<br/><br/>

                        Skilled in International & Domestic Business Development of Lifestyle Trade of Furniture, Decor, Furnishing servicing American & European Retailers, Speciality Stores, Boutique Stores sourcing and buying from India.<br/><br/>

                        Rohit Guha serves as the key advisor for Merchandising and Supply Chain setup.
                      </p>
                    </div>
                  </div>

              </div>
            </div>

       </div>

        


        <section className="deals-details-page pitch-dask" >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Pitch" key="1">
              
                <div className='pitch-div'>
                  
                  
                      <img                      
                        src="./web/images/ippitch.png"
                        style={{
                          width:'100%',                           
                        }}
                      />
                 
                 
                </div>
              
            </TabPane>
            <TabPane tab="FAQ" key="2">
              <section className="faq-section">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <h1 className='text-center'>About InstantPay</h1>
                        <Collapse
                          defaultActiveKey={['1']}
                          onChange={this.callback}
                          expandIconPosition='left'
                        >
                          <Panel header="Instapay Registration — How it is Useful and How to Apply?" key="1" extra={genExtra()}>
                            <div>
                              The backbone of the Indian economy, Micro, Small, and Medium Enterprises (MSMEs) play a vital role in the development of the country as a whole. With the growth and progress of these small-scale industries, the economy of India flourishes. The Instapay Registration for MSMEs is a big boost for new and existing businesses.
                            </div>
                          </Panel>
                          <Panel header="What is Instapay Registration or MSME Registration?" key="2" extra={genExtra()}>
                            <div>
                            Launched by the Ministry of MSME, Instapay Registration is completely online, paperless, and there is no cost or fee for registration. Simple and easy, the registration can be done in the government portal, i.e. https://Instapayregistration.gov.in/Government-India/Ministry-MSME-registration.htm.
                            </div>
                          </Panel>
                          <Panel header="Benefits of Instapay Registration?" key="3" extra={genExtra()}>
                            <div>
                            Government registration for MSMEs provides entrepreneurs with a unique identification number and a recognition certificate. The primary objective here is to provide full benefits to the MSME industries in India, including but not limited.
                            </div>
                          </Panel>
                          <Panel header="Requirement for Registration?" key="4" extra={genExtra()}>
                            <div>
                              Our AOV is Rs.2,900/-, and CAC is Rs.950/- with 26% repeat customers every month.
                            </div>
                          </Panel>
                                                
                        </Collapse>

                        <h1 className='text-center'>About Growth91</h1>
                        <Collapse
                          defaultActiveKey={['1']}
                          onChange={this.callback}
                          expandIconPosition='left'
                        >
                          <Panel header="Do these startups undergo due diligence?" key="7" extra={genExtra()}>
                            <div>
                              Startups are displayed to the investors only after due diligence has been conducted by us and an independent screening committee specially formed for the purpose of conducting due diligence of the same.
                            </div>
                          </Panel>
                          <Panel header="What kind of documentation will I need to sign?" key="8" extra={genExtra()}>
                            <div>
                              Each investor must sign the T-SAFE agreement and agree to a Risk Disclosure agreement.
                            </div>
                          </Panel>
                          <Panel header="Do you offer any guarantee or returns?" key="9" extra={genExtra()}>
                            <div>
                              No, we do not guarantee any returns.
                            </div>
                          </Panel>
                          <Panel header="If I invest in a startup and they fail to reach their funding goal, will I be refunded?" key="10" extra={genExtra()}>
                            <div>
                              Yes, if a company fails to meet their funding goal all investments in that company will be cancelled and refunded within 15 working days to the bank account from which the investment has been made. Please note, there will be no interest or any other form of compensation paid on these returned funds.
                            </div>
                          </Panel>
                        </Collapse>
                      </div>
                    </div>
                  </div>
              </section>
            </TabPane>
            <TabPane tab="Deal Terms" key="3">
              <section className="deal-terms-section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 m-auto">
                      <h1>Documents</h1>
                      <div className="row document-section">
                        <div className="col-lg-6">
                          <p className='mb-0 pb-0'>
                          InstantPay is India’s largest Neo Banking platform delivering full stack banking services to individuals and businesses of all sizes.
                          <br/><br/>Founded in July 2015 by three IIT Kharagpur graduates, smallcase was started to introduce a new generation of investors to the Indian equity markets using technology in 2013 

                          </p>
                        </div>
                        <div className="col-lg-6">
                          <div className="download-section">
                            <div className="d-flex">
                              <p className='mb-0 pb-0'>Company Certificates</p>
                              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 37.15 46.63" stroke="#e5e5e5"><g fill="currentColor" stroke="#e5e5e5"><path d="M25.09.85a1.1 1.1 0 00-.8-.35H6.5a6.02 6.02 0 00-6 5.98v33.66a6.02 6.02 0 006 5.99h24.15a6.02 6.02 0 006-5.99V13.42a1.19 1.19 0 00-.32-.77zm.32 3.54l7.53 7.9h-4.9a2.63 2.63 0 01-2.63-2.62zm5.24 39.53H6.5a3.82 3.82 0 01-3.8-3.78V6.48A3.82 3.82 0 016.5 2.7h16.7v6.97a4.82 4.82 0 004.84 4.83h6.4v25.64a3.81 3.81 0 01-3.79 3.78zm0 0"></path><path d="M27.65 36.32H9.5a1.1 1.1 0 100 2.2h18.16a1.1 1.1 0 10-.01-2.2zm0 0"></path><path d="M17.77 32.36a1.1 1.1 0 001.6 0l6.47-6.93a1.1 1.1 0 10-1.61-1.5l-4.55 4.88V16.78a1.1 1.1 0 00-2.2 0V28.8l-4.55-4.88a1.1 1.1 0 00-1.6 1.5zm0 0"></path></g></svg>
                            </div>
                            <div className="d-flex">
                              <p className='mb-0 pb-0'>Company Due Dilligence</p>
                              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 37.15 46.63" stroke="#e5e5e5"><g fill="currentColor" stroke="#e5e5e5"><path d="M25.09.85a1.1 1.1 0 00-.8-.35H6.5a6.02 6.02 0 00-6 5.98v33.66a6.02 6.02 0 006 5.99h24.15a6.02 6.02 0 006-5.99V13.42a1.19 1.19 0 00-.32-.77zm.32 3.54l7.53 7.9h-4.9a2.63 2.63 0 01-2.63-2.62zm5.24 39.53H6.5a3.82 3.82 0 01-3.8-3.78V6.48A3.82 3.82 0 016.5 2.7h16.7v6.97a4.82 4.82 0 004.84 4.83h6.4v25.64a3.81 3.81 0 01-3.79 3.78zm0 0"></path><path d="M27.65 36.32H9.5a1.1 1.1 0 100 2.2h18.16a1.1 1.1 0 10-.01-2.2zm0 0"></path><path d="M17.77 32.36a1.1 1.1 0 001.6 0l6.47-6.93a1.1 1.1 0 10-1.61-1.5l-4.55 4.88V16.78a1.1 1.1 0 00-2.2 0V28.8l-4.55-4.88a1.1 1.1 0 00-1.6 1.5zm0 0"></path></g></svg>
                            </div>
                            <button className='download-button'>Download</button>
                          </div>
                        </div>
                      </div>

                      <h1>Deal Terms</h1>
                      <section className="deal-terms-section">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="info">
                                  <span>End Date</span>
                                  <h4>31th oct, 2022</h4>
                              </div>
                              <div className="info">
                                <span> Min Investment</span>
                                <h4> 1,000rs</h4>
                              </div>
                              <div className="info">
                                <span><i className='bx bxs-lock-alt'></i>1,60,00,000 Target</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>


                      <h1>About Artment</h1>
                      <section className="deal-about-artment-section">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="info">
                                  <span>Legal Name</span>
                                  <h4>InstantPay Private Limited</h4>
                              </div>
                              <div className="info">
                                <span>Founded</span>
                                <h4>February, 2013</h4>
                              </div>
                              <div className="info">
                                <span>Form</span>
                                <h4>Private</h4>
                              </div>
                              <div className="info">
                                <span>Employees</span>
                                <h4>51-100</h4>
                              </div>
                              <div className="info">
                                <span>Website</span>
                                <h4>
                                  <a style={{ color:'rgb(7, 211, 252)' }} href="https://theartment.com/" target="_blank">
                                    https://InstantPay.com/
                                  </a>
                                </h4>
                              </div>
                              <div className="info">
                                <span>Social Icons</span>
                                <div className='social-icons'>
                                  <a href='#'>
                                    <i className='bx bxl-facebook fs-19'></i>
                                  </a> 
                                  <a href='#'>
                                    <i className='bx bxl-linkedin fs-19'></i>
                                  </a>
                                  <a href='#'>
                                    <i className='bx bxl-instagram fs-19' ></i>
                                  </a>
                                </div>
                              </div>
                              <div className="info">
                                <span>Headquarters</span>
                                <h4>Delhi [HQ]
                                  B1/A5, Mohan Cooperative Industrial Estate
                                  New Delhi - 110044 
                                  , India</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
            </section>
            </TabPane>
            <TabPane tab="People" key="4">
            <div className="container meet-the-team-section"
            style={{ maxWidth:921 }}>
              <h2 className="text-center">Meet the Team</h2>
              <div className="row">

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./web/images/ashneer1.jpg" alt=""/>
                        <div className='intro'>
                          <h3>Ashneer Grover</h3>
                          <span>CEO</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.facebook.com/ashneergrover/' target="_blank">
                              <i className='bx bxl-facebook'></i>
                            </a>
                            <a href='https://www.linkedin.com/in/ashneergrover/' target="_blank"><i className='bx bxl-linkedin'></i></a>
                            <a href='https://www.instagram.com/ashneergrover/' target="_blank"><i className='bx bxl-instagram' ></i></a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Business Economics graduate with 18 years of eCommerce experience and Banking. <br/><br/>

                        Started selling on Bharatpay in the year 2018. Digital Marketing Expert with hands-on experience in paid ads and website optimisation.
                      </p>
                    </div>
                  </div>

                  {/* <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/2.webp" alt=""/>
                        <div className='intro'>
                          <h3>Aanchal Agarwal</h3>
                          <span>CEO</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/aanchal-agarwal-65991459/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                            </a>
                            <a href='https://instagram.com/aanchal5783?r=nametag'>
                              <i className='bx bxl-instagram' ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>
                      CA finalist and CFA scholar. Specialisation in MIS, Audit, Budgeting, Working Capital Management, etc. <br/><br/>

                      Optimises and leads company’s operations, efficiency and finances.
                      </p>
                    </div>
                  </div> */}

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/3.webp" alt=""/>
                        <div className='intro'>
                          <h3>Kritika Agarwal</h3>
                          <span>Marketing Lead</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/kritika-agarwal-5b33618b/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Post graduate from NIFT. Seasoned marketing professional with 5+ years of experience in performance marketing with multiple D2C brands managing their e-commerce branding, social media engagement, experience targeted PPC campaigns and user growth.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/4.webp" alt=""/>
                        <div className='intro'>
                          <h3>Kush Rawat</h3>
                          <span>Creative Lead</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/kush-rawat-21050212a/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                              </a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Creative professional with an a graduate degree from Indian Institute of Photography. Having worked with Zomato, Quickr and IAAH in the past, Kush sets the creative lens of Artment though his advanced skills in photography and creative production.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/5.webp" alt=""/>
                        <div className='intro'>
                          <h3>Rohit Guha</h3>
                          <span>Advisor</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/rohitguha/'
                            target="_blank">
                              <i className='bx bxl-linkedin'></i></a>
                          </div>
                        </div>
                      </div>
                      <p>
                        Over three decades in the business of International Trade/Exports, eCommerce, and Supply Chain Management of hard and soft line lifestyle products.<br/><br/>

                        Skilled in International & Domestic Business Development of Lifestyle Trade of Furniture, Decor, Furnishing servicing American & European Retailers, Speciality Stores, Boutique Stores sourcing and buying from India.<br/><br/>

                        Rohit Guha serves as the key advisor for Merchandising and Supply Chain setup.
                      </p>
                    </div>
                  </div>

              </div>
            </div>
            </TabPane>
          </Tabs>    
        </section>   

        <WebFooter />
      </div>
    )
  }
}

export default DealDetailsInstapay;
