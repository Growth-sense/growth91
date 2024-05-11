import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import Footer from "./common/Footer";
import Slider from "react-slick";
import { hover } from "@testing-library/user-event/dist/hover";
import { InvestorTestomonial } from "./InvestorTestomonial";
import { Investcurosel } from "./Investcurosel";
import { Investersextra } from "./Investersextra.jsx";
import ReactGA from "react-ga";

class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testtime: "",
    };
  }
  componentWillMount() {
    document.getElementsByTagName("META")[4].content =
      "Wondering About Investing in Startups India? | Visit Growth91";
      document.title  =
      "Wondering About Investing in Startups India? | Visit Growth91";

    document.getElementsByTagName("META")[3].content =
      "Navigate landscape of startup investing platforms in India. Explore best startup in India with low investment for maximum growth & Invest confidently.";
      document.getElementsByTagName("META")[5].content ="startup investing platforms best startups in india with low investment best startup ideas in india with low investment "

  }

  componentDidMount() {
    if (localStorage.getItem("investor_id")) {
      console.log("asd");
    } else if (localStorage.getItem("founder_id")) {
      console.log("ds");
    } else {
      console.log("ds");
    }

    this.setState({
      testtime: 2,
    });

    // Call API initially
    // this.getDelete_analytics_session_data();

    // Call API every 3 seconds
    // this.delete_analytics_session_interval = setInterval(() => this.getDelete_analytics_session_data(), 3000);

    // Post data every 2 seconds
    // this.start_analytics_session_interval = setInterval(() => this.postStart_analytics_session_data(), 2000);
  }
  render() {
    // <script>
    //     $("#intro").owlCarousel({
    //     autoplay : '5000',
    //     stopOnHover : 'false'
    //     })

    // </script>

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const pointer = {
      pointerEvents: "none",
    };

    return (
      <div>
        <WebHeader />
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
                        {" "}
                        Invest in Growing Startups and Grow with them
                      </h2>
                      <p
                        className="wow fadeInUp"
                        style={{
                          justifyContent: "center",
                          textAlign: "justify",
                        }}
                        data-wow-delay="0.5s"
                      >
                       Access highly-vetted growth opportunities. Start your Investment journey with small amount.
                        <span className="">
                          <br />
                          Are you a Investor?{" "}
                          <a
                            href="/deals"
                            className=""
                            style={{ color: "#FF9C1A" }}
                          >
                            Express Your Interest On the Growth91 Deals
                          </a>
                        </span>
                      </p>

                      <form
                        className="input_box wow fadeInUp"
                        data-wow-delay="0.7s"
                      >
                        <div className="form-wraper">
                          {localStorage.getItem("founder_id") &&
                          localStorage.getItem(
                            "founder_is_investor" != 1
                          ) ? (
                            <a
                              href="/founder-as-investor"
                              className="theme-btn "
                              type="button"
                            >
                              Apply As Investor
                            </a>
                          ) : (
                            <a
                              href="/Signup"
                              className="theme-btn "
                              type="button"
                            >
                              Get Started
                            </a>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="right-side-images wow fadeInRight"
                      data-wow-delay="0.6s"
                    >
                      <img src="./web/images/blog1.png" alt="img"  fetchpriority="high"/>
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

  <style></style>

  <section className="features-section">
    <div className="container-fluid">
      <div className="container">
        <div className="heading-title">
          <h6>
            <span></span>{" "}
          </h6>
          <h2>For Investors</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item ">
              <div className="icon">
                <img src="./web/images/icon1.png" alt="img" />
              </div>
              <h4>
                Curated Growth <br /> Deals
              </h4>
              <p>
                Carefully selected deals in <br /> growing areas
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon2.png" alt="img" />
              </div>
              <h4>Transparency</h4>
              <p>
                In-depth information available for making
                <br /> the right decision
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon3.png" alt="img" />
              </div>
              <h4>
                Nominal/Low <br />
                Investment
              </h4>
              <p>
                Start your Investment journey with <br />
                small amounts
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item ">
              <div className="icon">
                <img src="./web/images/icon1.png" alt="img" />
              </div>
              <h4>
                Seamless Investment
                <br /> Process
              </h4>
              <p>
                Invest from the click of a mouse <br /> without leaving
                your home.
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon2.png" alt="img" />
              </div>
              <h4>
                Track Your <br />
                Investments
              </h4>
              <p>
                Track the progress of your investment
                <br /> through interactive dashboards.
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon3.png" alt="img" />
              </div>
              <h4>
                Exclusive <br />
                Community
              </h4>
              <p>
                Interact with like-minded investors, <br />
                startup founders and SMEs
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="about-section what-you-start">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="left-content">
            <div className="heading-title">
              <h6 className="text-white">
                <span></span> What You’ll Get As{" "}
                <span style={{ marginLeft: 10 }}></span>{" "}
              </h6>
              <h2 className="text-white">
                {" "}
                Close your deals with Growth91
              </h2>
              <p style={{ textAlign: "justify" }}>
                Growth91's powerful private deal management option enables
                Founders, Angel Networks, Syndicates and VCs to carry out
                their fundraising process online, accessible only to their
                audience.
              </p>
            </div>
            <a href="/How-it-works" className="theme_btn">
              Learn More
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-side">
            <img src="./web/images/what.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
    {/* </div> */}
  </section>

        {this.state.testtime == 2 ? <Investcurosel /> : ""}

        <WebFooter />
      </div>
    );
  }
}

export default Investors;
