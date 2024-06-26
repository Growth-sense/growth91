import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import Footer from './common/Footer';
import Slider from "react-slick";
import axios from 'axios';


class MembershipPlan extends Component {

    componentDidMount() {
        this.checforip();
    }

    checforip = () => {
        // get ip address
        // axios({
        //     method: 'get',
        //     url: '${process.env.REACT_APP_BASE_URL}verification/getipaddress.php',
        //     headers: {
        //      // 'Authorization': `bearer ${token}`,
        //     'Content-Type': 'application/json'
        //     }, 
        // }).then((response) => {
        //     // console.log('response', response);
        // });

        // pan verification is done
        // axios({
        //     method: 'post',
        //     url: '${process.env.REACT_APP_BASE_URL}verification/pan.php',
        //     headers: {
        //      // 'Authorization': `bearer ${token}`,
        //     'Content-Type': 'application/json'
        //     }, 
        // }).then((response) => {
        //     console.log('pan verification response', response);
        //     if(response.data.valid === true) {
        //         console.log('valid pan');
        //     }
        // });

        // adhar verification is done
        // axios({
        //     method: 'post',
        //     url: '${process.env.REACT_APP_BASE_URL}verification/adhar.php',
        //     headers: {
        //      // 'Authorization': `bearer ${token}`,
        //     'Content-Type': 'application/json'
        //     }, 
        // }).then((response) => {
        //     console.log('adhar verification response', response);
        //     if(response.data.valid === true) {
        //         console.log('valid adhar');
        //     } else {
        //         console.log('Invalid adhar');
        //     }
        // });
    }
  
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div>
        <WebHeader />
        <section className="pricing-section">
        <div className="container">
            <div className="heading-title">
                {/* <h2>Thanks for Joining Growth91 Community as regular member.</h2> */}
                <img src="/web/5264.jpg" 
              className="d-inline-block align-top img-fluid" alt="Growth91" />
              

                <h4 className='text-center'>We would like to invite you to upgrade to Premium Membership
                to avail the exclusive benefits.<br/> <br/><br/>As a bonus, we are extending <span style={{fontSize: '22px', color: 'green'}}>"100% Discount"</span> to upgrade
Membership.</h4>

                {/* <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> */}
            </div>
            <ul className="nav nav-pills" id="pills-tab1" role="tablist">
                {/* <li className="nav-item" role="presentation">
                  <button className=" " id="pills-home-tab1" data-bs-toggle="pill" data-bs-target="#pills-home1" type="button">Monthly</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="active" id="pills-profile-tab2" data-bs-toggle="pill" data-bs-target="#pills-profile2" type="button">Yearly</button>
                </li> */}
            </ul>
              <div className="tab-content" id="pills-tabContent1">
                <div className="tab-pane fade show active overflow-v" id="pills-home1" >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="pracing-item disabled">
                                <div className="top-left"> 
                                    <p>Free</p>
                                </div>
                                <div className="top-area">
                                <i className='bx bx-donate-heart' style={{fontSize: '40px', color: 'green'}}></i>

                                    <p> Regular Membership</p>
                                    {/* <p className='text-success'><del className='text-secondary' style={{fontSize: "20px"} }>100</del> Free</p> */}

                                </div>
                                <ul className='text-left ' style={{textAline: 'left'}}>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>Access to Company Documents</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>View Company Performance </li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>Invest </li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-times text-danger" aria-hidden="true"></i></span>Preview of opportunities (24~48 hrs)</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-times text-danger" aria-hidden="true"></i></span>Priority for invest</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-times text-danger" aria-hidden="true"></i></span>Priority in Equity</li>
                                </ul>
                                <p className='text-success text-center mb-3' style={{fontSize: "24px"} }> Free </p>

                                {/* <a  className="buy-now-disabled">Activated Plan</a> */}
                                <p  className="buy-now-disabled mb-5 py-1">Activated Plan</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="pracing-item ">
                                <div className="top-left">
                                    <p>100% off</p>
                                </div>
                                <div className="top-area">
                                <i className='bx bxs-dollar-circle' style={{fontSize: '40px', color: 'gold'}}></i>
                                    <p> Premium Membership</p>
                                    {/* <p className='text-success'><del className='text-secondary' style={{fontSize: "20px"} }>1000</del> 500 &#x20b9;</p> */}

                                </div>
                                <ul>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>Access to Company Documents</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>Invest </li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success"></i></span>View Company Performance </li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success" aria-hidden="true"></i></span>Preview of opportunities (24~48 hrs)</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success" aria-hidden="true"></i></span>Priority for invest</li>
                                    <li className='ps-md-5 ps-0'><span><i className="fa fa-check text-success" aria-hidden="true"></i></span>Priority in Equity</li>
                                </ul>
                                <p className='text-success text-center mb-3' style={{fontSize: "24px"} }><del className='text-secondary' style={{fontSize: "20px"} }>&#x20b9; 1,000</del> &#x20b9; 900 </p>

                                <a href="#" className="buy-now mb-5">Upgrade Plan Now</a>
                            </div>
                        </div>
                        {/* <div className="col-lg-4">
                            <div className="pracing-item">
                                <div className="top-left">
                                    <p>8.50%</p>
                                </div>
                                <div className="top-area">
                                    <img src="images/icon003.svg" alt="img"/>
                                    <p>MoneyPro Premium</p>
                                </div>
                                <ul>
                                    <li><span><i className="fal fa-check"></i></span>Maximum Deposit 12000</li>
                                    <li><span><i className="fal fa-check"></i></span>Minimum Deposit 15000</li>
                                    <li><span><i className="fal fa-check"></i></span>Up to 120 User Available</li>
                                </ul>
                                <a href="#" className="buy-now">Buy Now</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                
              </div>
        </div>
    </section>

        

          <WebFooter />
      </div>
    )
  }
}

export default MembershipPlan;
