import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import Footer from './common/Footer';
import Slider from "react-slick";
import axios from 'axios';


class ReferLogin extends Component {
    
  
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
        <section className="banner_section">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                {/* <!-- <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div> --> */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="slider-area">
                                <div className="item">
                                    <div className="row align-items-center">
                                        <div className="col-lg-7">
                                            <div className="left-content">
                                                <h2 className="wow fadeInUp " data-wow-delay="0.3s">Refer & Earn <br/> ₹1,000
                                                </h2>
                                                <p className="wow fadeInUp" data-wow-delay="0.5s">When your friend makes their first Grip Investment
                                                    {/* <span className="">
                                                        <br/>Are you a founder? <a href="#" className="" 
                                                        style={{ color: "#FF9C1A" }}>Raise capital on Growth91</a>
                                                    </span> */}
                                                </p>

                                                <form className="input_box wow fadeInUp" data-wow-delay="0.7s">
                                                    <div className="form-wraper">
                                                        <a href="/Signup" className="theme-btn" type="button">Earn More</a>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="Refer" data-wow-delay="0.6s" 
                                            style={{
                                              color: "#29176F",
                                              background: "white",
                                              margin: "20px 2px",
                                              width:"90%",
                                              border: "2px solid #ff9c1a",
                                              borderRadius: "20px",
                                              padding: "60px 20px"
                                            }}>
                                              <h4>Refer Now</h4>
                                            <p className="wow fadeInUp" data-wow-delay="0.5s">You can earn ₹10,000 and more! How?
                                                    {/* <span className="">
                                                        <br/>Are you a founder? <a href="#" className="" 
                                                        style={{ color: "#FF9C1A" }}>Raise capital on Growth91</a>
                                                    </span> */}
                                                </p>

                                                <form className="input_box wow fadeInUp" data-wow-delay="0.7s">
                                                
                                                  <label>Login to refer your friends</label>
                                                  <input type="email" value="" placeholder="Email Or Phone Number"
                                                   style={{
                                                    color: "gray",
                                                    margin: "20px 2px",
                                                    width:"90%",
                                                    border: "2px solid #ff9c1a",
                                                    borderRadius: "50px",
                                                    padding: "20px"
                                                  }}></input>
                                                    <div className="form-wraper ">
                                                        <a href="/Signup" className="theme-btn" type="button">Earn More</a>
                                                    </div>
                                                    
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                   
                </div>
            </div>
        </section>

        <section className="features-section">
            <div className="container-fluid">
                <div className="container">
                    <div className="heading-title">
                        <h6><span></span> EARN MORE <span></span></h6>
                        <h2>We have <span style={{ color: "#ff9c1a", fontSize: "36px"}}>More</span> Rewards for Grip Lovers</h2>
                        {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
                    </div>
                    <div className="row">
                        <div className=" col-md-6">
                            <div className="item ">
                                <div className="icon text-center">
                                    <img src="./web/Gmoney.png" width={'40px'} alt="img"/>
                                </div>
                                <h4>1,000 Growt91 Money / Referral</h4>
                                <p>Refer to your frend and earn Growth91 Money</p>
                                {/* <a href="featured.html">Know more</a> */}
                            </div>
                        </div>
                        <div className=" col-md-6">
                            <div className="item">
                                <div className="icon">
                                    <img src="./web/Gmoney.png" width={'40px'} alt="img"/>
                                </div>
                                <h4>Use Growt91 Money/ Growth91 Coin</h4>
                                <p>Use Growt91 Moneyto upgrage membership or to buy paid Documents</p>
                                {/* <a href="featured.html">Know more</a> */}
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-6">
                            <div className="item">
                                <div className="icon">
                                    <img src="./web/images/icon2.png" alt="img"/>
                                </div>
                                <h4>2,000 Rs / Referral</h4>
                                <p>Refer 6 to 25 frend</p>
                                <a href="featured.html">Know more</a> 
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

        {/* comment for coomit */}



    <section className="how-we-work-section">
            <div className="container">
                <div className="heading-title">
                    <h6><span></span> HOW IT WORKS? <span></span></h6>
                    <h2>It’s really simple to <span style={{ color: "#ff9c1a", fontSize: "36px"}}>earn!</span></h2>
                    
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="item">
                            <div className="icon">
                            <img src="./web/friendship.png" width={'80px'} alt="img"/>
                            <span>1</span>
                            </div>
                            <p>Step 1</p>
                            <h3>Refer your friend</h3>
                            <div className="arrow-img">
                                <img src="./web/images/arrow1.svg" alt="img"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="item">
                            <div className="icon icon-tow">
                                <img src="./web/investment.png" width={'80px'} alt="img"/>
                                <span>2</span>
                            </div>
                            <p>Step 2</p>
                            <h3>Friend Invest ₹1,000</h3>
                            <div className="arrow-img" style={{ top: 60 }}>
                                <img src="./web/images/arrow2.svg" alt="img"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="item">
                            <div className="icon icon-three">
                                <img src="./web/profit.png" width={'80px'} alt="img"/>
                                <span>3</span>
                            </div>
                            <p>Step 3</p>
                            <h3>You get 1,000 Growt91 Money</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="faq-section hiw-li" id="faq-section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7">
                    <div className="content-side">
                        <div className="heading-title">
                            <h6><span></span> </h6>
                            <h2>How to refer? and why?</h2>
                        </div>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Why should I Refer this to my friends?
                                </button>
                              </h2>
                              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                 <p>If you refer Growth91 to your friends and family you can earn 1000 Growt91 Money for each refer. You get these Growt91 MoneyMoney When your friend use your referral code while registration and then invest 1000Rs.</p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                    How can I Refer this to my friends?
                                </button>
                              </h2>
                              <div id="collapseThree" className="accordion-collapse collapse " aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                 <p>Once you make an account you are capable to reffer other by using your referral code which you can get from your Referal page or in this link <a href='#'>"Link"</a></p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    What is Growt91 Money? what can I do with it?
                                </button>
                              </h2>
                              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>When your friend use your referral code while registration and then invest 1000Rs you earn 1000Growt91 Moneywhich can be used for Upgrading Membership or To by any paid documents or content.</p>
                                </div>
                              </div>
                            </div>                          
                           
                          </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="images-side">
                        <img src="./web/images/faq-side.png" alt="img"/>
                    </div>
                </div>
            </div>
        </div>
    </section>

        <section className="testimonials-section">
        <div className="container ">
            <div className="heading-title d-flex flex-column col-9">
                <h2>Why haven’t you referred yet?</h2>
                <p>Refer today and earn 1,000 Growt91 Money/referral !</p>
                <form className="input_box wow fadeInUp align-center column" data-wow-delay="0.7s">
                <div className="form-wraper d-flex flex-column">
                    <a href="#" className="theme-btn" type="button">Refer Now</a>
                </div>
                
            </form>
            </div>
            <div className='col-2'>
              </div>
            
          
        </div>
    </section>
        

          <WebFooter />
      </div>
    )
  }
}

export default ReferLogin;
