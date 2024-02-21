import React, { Component } from "react";
import WebHeader from "../common/WebHeader";
import Footer from "../common/Footer";
// import Footer from '../common/Footer';
import Slider from "react-slick";
import axios from "axios";
import Bridge from "../constants/Bridge";
import { message } from "antd";
import Success from "../Success";

class InviteReferral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      investor_name: "",
      investor_id: "",
      referralCode: "",
      referralLink: "",
      referral_code: "",
      show: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("investor_id") && !localStorage.getItem("founder_id")) {
      window.location.assign("/login");
      return;
    } else {
      {localStorage.getItem("investor_id") ? 
      this.setState({ show: true , 
      investor_name: localStorage.getItem("investor_name"),
      investor_id: localStorage.getItem("investor_id")
    }, ()=>this.get_referral_code()
    )
      : this.setState({ show: true , 
        investor_name: localStorage.getItem("founder_name"),
        investor_id: localStorage.getItem("founder_id")
      }, ()=>this.get_referral_code()
      )
    }
    }
    // this.setState({
    //   investor_name: localStorage.getItem("investor_name"),
    //   investor_id: localStorage.getItem("investor_id"),
    // },()=>this.get_referral_code());
    // this.loadreferral(localStorage.getItem("investor_id"),localStorage.getItem("investor_name"));
    
  }

  get_referral_code = () => {
    let params = {
      investor_id: this.state.investor_id,
    };
    console.log("Value",params);
    Bridge.get_investor_referral_code(params).then((result) => {
      if (result.status == 1) {
        let referral_code= result.data[0].referral_code;
        let link=process.env.REACT_APP_BASE_URL+'Signup?id='+referral_code;
        this.setState({
          referralCode: result.data[0].referral_code,
          referralLink: link,
        });
      } else {
      }
    });
  };

  checkEmail = (email) => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      message.warning("Please provide a valid email address", 4);
      return false;
    } else {
      return true;
    }
  };

  //   loadreferral(id,name){
  //     if(!this.state.id){
  //         const tempArr=name.split(" ");
  //         let tempId=id.toString()
  //         let str=""
  //         //for name code
  //         if(tempArr.length==1){
  //           str+=name.slice(0,1).toUpperCase()+name.substr(name.length-1, 1).toUpperCase();
  //         }
  //         if(tempArr.length==2){
  //           for(let i=0; i<tempArr.length;i++){
  //             str+=tempArr[i].slice(0,1).toUpperCase();
  //            }
  //         }
  //         if(tempArr.length>=3){
  //           for(let i=0; i<tempArr.length;i++){
  //             if(i==1){
  //               continue;
  //               }
  //             str+=tempArr[i].slice(0,1).toUpperCase();
  //            }
  //         }

  //         //for id code
  //       let resultId
  //        if(tempId.length==1){
  //        resultId="00"+tempId;
  //        }
  //        if(tempId.length==2){
  //         resultId='0'+tempId;
  //        }
  //        if(tempId.length>=3){
  //         resultId = tempId.substr(tempId.length-3, 3);
  //       }
  //       //end id code
  //         let referralCode=str+'RR'+resultId;
  //         let referralLink='https://growth91.com/referral/'+referralCode;
  //         this.setState({referralCode:referralCode,referralLink:referralLink})
  //     }

  //   }
  //for sending mail
  sendInvite(email) {
    if (!this.state.id) {
      if (!this.state.email) {
        message.warning("Please Enter Email");
        return;
      }
      if (this.checkEmail(email) == false) {
        return;
      }
      if (!this.state.referralCode) {
        message.warning("Please Login or Register Yourself");
        return;
      }
      let params = {
        email: email,
        referralCode: this.state.referralCode,
        referralLink: this.state.referralLink,
        investor_id:this.state.investor_id
      };
      Bridge.investor.sendretailreferrallink(params).then((result) => {
        if (result.status == "1") {
          message.success("Referral Link Sent Successfully to given Email");
          this.setState({ email:""});
        } else {
          message.error("Failed to Send Referral Link/ ReferralCode");
        }
      });
    } else {
      message.warning("please login, to send referral");
    }
  }

  //for copy referral data
  copyReferralCode(code) {
    navigator.clipboard.writeText(code);
    message.success("Copied");
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div style={{ display: this.state.show == true ? "block" : "none" }}>
        <WebHeader />
        <section className="banner_section">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
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
                        <div className="col-lg-6">
                          <div className="left-content">
                            <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                              Refer & Earn <br />
                              ₹1,000{" "}
                              <sup
                                style={{
                                  fontSize: "1.3rem",
                                  position: "relative",
                                  top: "-25px",
                                }}
                              >
                                *
                              </sup>
                            </h2>
                            <p className="wow fadeInUp" data-wow-delay="0.5s">
                              When your friend makes their first Growth91
                              Investment
                              <p style={{ fontSize: "0.6rem" }}>
                                *Terms & Conditions apply
                              </p>
                              {/* <span className="">
                                                        <br/>Are you a founder? <a href="#" className="" 
                                                        style={{ color: "#FF9C1A" }}>Raise capital on Growth91</a>
                                                    </span> */}
                            </p>

                            <form
                              className="input_box wow fadeInUp"
                              data-wow-delay="0.7s"
                            >
                              {/* <div className="form-wraper">
                                                        <a href="#" className="theme-btn" type="button">Send Invite</a>
                                                    </div> */}
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div
                            className="Refer "
                            data-wow-delay="0.6s"
                            style={{
                              color: "#29176F",
                              background: "white",
                              margin: "10px 2px",
                              width: "90%",
                              border: "2px solid #ff9c1a",
                              borderRadius: "20px",
                              padding: "30px 20px",
                            }}
                          >
                            {/* <hr  style={{width:"35%"}}/> */}
                            <div className="heading-title">
                              <h6>
                                <span></span>{" "}
                              </h6>
                              <h2>Refer Now</h2>
                            </div>

                            <p className="wow fadeInUp" data-wow-delay="0.5s">
                              {/* <span className="">
                                                        <br/>Are you a founder? <a href="#" className="" 
                                                        style={{ color: "#FF9C1A" }}>Raise capital on Growth91</a>
                                                    </span> */}
                            </p>

                            <form
                              className="input_box wow fadeInUp"
                              data-wow-delay="0.7s"
                            >
                              <input
                                type="email"
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                                placeholder="Email Address"
                                style={{
                                  color: "gray",
                                  margin: "10px 2px",
                                  width: "100%",
                                  border: "2px solid #ff9c1a",
                                  borderRadius: "50px",
                                  padding: "20px",
                                  textAlign: "center",
                                }}
                              />
                              <div
                                className="form-wraper"
                                style={{ justifyContent: "center"}}
                              >
                                <a
                                  href="#"
                                  onClick={() => {
                                    this.sendInvite(this.state.email);
                                  }}
                                  className="theme-btn"
                                  type="button"
                                  
                                >
                                  Send Invite
                                </a>
                              </div>
                            <div className=" ">
                                <label className="mt-5 ms-2">
                                  Share your referral code
                                </label>
                                <div
                                  className=""
                                  style={{
                                    color: "gray",
                                    margin: "20px 2px",
                                    width: "100%",
                                    border: "2px solid #ff9c1a",
                                    borderRadius: "50px",
                                    padding: "20px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    value={this.state.referralCode}
                                    readOnly
                                    style={{
                                      color: "gray",
                                      width: "90%",
                                      border: "none",
                                    }}
                                  />
                                  <span>
                                    <a>
                                      <img
                                        className="me-auto"
                                        onClick={() => {
                                          this.copyReferralCode(
                                            this.state.referralCode
                                          );
                                        }}
                                        src="/web/HyperLink.svg"
                                      />
                                    </a>
                                  </span>
                                </div>
                              </div>

                              <p
                                style={{
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                OR
                              </p>

                              <div className=" ">
                                <label className="mt-3 ms-2">
                                  Share your referral link
                                </label>
                                <div
                                  className=""
                                  style={{
                                    color: "gray",
                                    margin: "10px 2px ",
                                    width: "100%",
                                    border: "2px solid #ff9c1a",
                                    borderRadius: "50px",
                                    padding: "20px"
                                  }}
                                >
                                  <input
                                    type="text"
                                    value={this.state.referralLink}
                                    readOnly
                                    style={{
                                      color: "gray",
                                      width: "90%",
                                      border: "none",
                                      display:"inline"
                                    }}
                                  />
                                  <span>
                                    <a>
                                      <img
                                        className="me-auto"
                                        onClick={() => {
                                          this.copyReferralCode(
                                            this.state.referralLink
                                          );
                                        }}
                                        src="/web/HyperLink.svg"
                                      />
                                    </a>
                                  </span>
                                </div>
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
                <h6>
                  <span></span> EARN MORE
                </h6>
                <h2>
                  We have{" "}
                  <span style={{ color: "#ff9c1a", fontSize: "36px" }}>
                    More
                  </span>{" "}
                  Rewards for Growth91 Members
                </h2>
                {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
              </div>
              <div className="row">
                <div className=" col-md-6">
                  <div className="item ">
                    <div className="icon text-center">
                      <img src="./web/GC.png" width={"80px"} alt="img" />
                    </div>
                    <h4>1,000 GC / Referral</h4>
                    <p>Refer to your frend and earn Growth91 Coins</p>
                    {/* <a href="featured.html">Know more</a> */}
                  </div>
                </div>
                <div className=" col-md-6">
                  <div className="item">
                    <div className="icon">
                      <img src="./web/GC.png" width={"80px"} alt="img" />
                    </div>
                    <h4>Use GC / Growth91 Coin</h4>
                    <p>Use GC to upgrage membership or to buy paid Documents</p>
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

        <section className="how-we-work-section">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span> HOW IT WORKS?{" "}
              </h6>
              <h2>
                It’s really simple to{" "}
                <span style={{ color: "#ff9c1a", fontSize: "36px" }}>
                  earn!
                </span>
              </h2>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="item">
                  <div className="icon">
                    <img src="./web/friendship.png" width={"80px"} alt="img" />
                    <span>1</span>
                  </div>
                  <p>Step 1</p>
                  <h3>Refer your friend</h3>
                  <div className="arrow-img">
                    <img src="./web/images/arrow1.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <div className="icon icon-tow">
                    <img src="./web/investment.png" width={"80px"} alt="img" />
                    <span>2</span>
                  </div>
                  <p>Step 2</p>
                  <h3>Friend makes first investment.</h3>
                  <div className="arrow-img" style={{ top: 60 }}>
                    <img src="./web/images/arrow2.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <div className="icon icon-three">
                    <img src="./web/profit.png" width={"80px"} alt="img" />
                    <span>3</span>
                  </div>
                  <p>Step 3</p>
                  <h3>You get 1,000 GC</h3>
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
                    <h6>
                      <span></span>{" "}
                    </h6>
                    <h2>How to refer? and why?</h2>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Why should I Refer this to my friends?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            You can earn 1000 Growth91 Coins when your
                            colleagues , friends and family make their first
                            investment.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="true"
                          aria-controls="collapseThree"
                        >
                          How can I Refer this to my friends?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Once you make an account you are capable to reffer
                            other by using your referral code which you can get
                            from your Referal page or in this link{" "}
                            <a href="#">"Link"</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          What is GC? what can I do with it?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            When your friend use your referral code while
                            registration and then invest 1000Rs you earn 1000GC
                            which can be used for Upgrading Membership or To by
                            any paid documents or content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="images-side">
                  <img src="./web/images/faq-side.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container ">
            <div className="heading-title d-flex flex-column col-9">
              <h2>Why haven’t you referred yet?</h2>
              <p>Refer today and earn 1,000 GC/referral !</p>
              <form
                className="input_box wow fadeInUp align-center column"
                data-wow-delay="0.7s"
              >
                <div className="form-wraper d-flex flex-column">
                  <a href="#" className="theme-btn" type="button">
                    Earn More
                  </a>
                </div>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default InviteReferral;
