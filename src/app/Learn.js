import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import Footer from "./common/Footer";
import {Link} from "react-router-dom"
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader";

class Learn extends Component {
  componentWillMount() {
   
    document.getElementsByTagName("META")[4].content  = "How Startup Funding Works: Growth91 Insights";
    document.title  = "How Startup Funding Works: Growth91 Insights";

    document.getElementsByTagName("META")[3].content="Gain valuable insights and learn how startup funding works with Growth91. Learn how to navigate the funding landscape for entrepreneurial success.";
    document.getElementsByTagName("META")[5].content ="How Startup Funding Works"


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
      <div>
     
       
        {/* <WebHeader /> */}
        <NewWebHeader newabout={"newabout"}/>

        <section className="banner_section">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="slider-area">
                    <div className="item">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="left-content">
                            <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                              Learn
                            </h2>
                            <p className="wow fadeInUp" data-wow-delay="0.5s">
                              Understand how Growth91’s different processes work
                              to complete a successful deal
                              {/* <span className=""  >
                                                        <br />Are you a founder? <a href="#" className="" 
                                                        style={{ color: "#FF9C1A" }}>Raise capital on Growth91<sup>TM</sup></a>
                                                      </span> */}
                            </p>

                            <form
                              className="input_box wow fadeInUp"
                              data-wow-delay="0.7s"
                            >
                              <div className="form-wraper">
                                <a
                                  href="/How-it-works"
                                  className="theme-btn "
                                  type="button"
                                >
                                  Know more
                                </a>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div
                            className="right-side-images wow fadeInRight"
                            data-wow-delay="0.6s"
                          >
                            <img src="./web/images/counterup.png" alt="img" />
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
                  <span></span>{" "}
                </h6>
                <h2>Learn </h2>
                <p>
                  Understand how Growth91’s different processes work to complete
                  a successful deal
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="item ">
                    <div className="icon"></div>
                    <h4>How It Works</h4>
                    <p>
                      Understand how Growth91’s different processes work to
                      complete a successful deal
                    </p>
                    <a href="/How-it-works">Know more</a>
                  </div>
                </div>
                <div className=" col-md-6">
                  <div className="item">
                    <div className="icon"></div>
                    <h4>Blog</h4>
                    <p>
                      Stay up to date with what’s brewing in the startup <br />{" "}
                      ecosystem
                    </p>
                    <Link to="/blog">Know more</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WebFooter />
      </div>
    );
  }
}

export default Learn;
