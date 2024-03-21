import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import Footer from "./common/Footer";
import Slider from "react-slick";
import { hover } from "@testing-library/user-event/dist/hover";

class Investors extends Component {
  componentWillMount() {
    document.title = "Investors - Growth91 - Startup Marketplace";
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
        <section
          className="testimonials-section t_desktop"
          style={{ textAlign: "justify" }}
        >
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>Testimonials of Investors</h2>
            </div>
            <div className="testimonial_wraper owl-carousel">
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p>
                  I have pre-registered as an investor on Growth91 platform.
                  Excited to start investing in Startups.
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/mukesh-mer.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Mukesh Mer</a>
                    <small>
                      N M <br /> Holding
                    </small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p>
                  I am a regular investor on Growth Sense and very happy with
                  kind of returns generated on my investments. Looking forward
                  to equally exciting opportunities at Growth91
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/ramesh-babu.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Ramesh Babu</a>
                    <small>
                      Country Head <br /> Government Banking, Axis Bank
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p>
                  Knowing the team since so many years, especially after
                  experiencing their skill in deal curation; looking forward to
                  some exciting deals on the platform.
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/deals-details/TM (4).jpeg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Mitul Jhaveri</a>
                    <small>
                      Director Finance, <br /> Regal Rexnord India
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="testimonials-section t_mobile"
          style={{
            textAlign: "justify",
            background:
              "linear-gradient(269.83deg, rgba(232, 226, 255, 0.6) 40.65%, rgba(255, 255, 255, 0.4) 100%),url(../images/testimonial-bg.png) no-repeat top center",
            backgroundSize: "cover",
            padding: "50px 0",
          }}
        >
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>Testimonials of Investors</h2>
            </div>
            <div className="testimonial_wraper_mobile">
              <div
                style={{
                  minHeight: "400px",
                  maxHeight: "400px",
                  background: "#fff",
                  padding: "18px 30px",
                  boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
                  borderRadius: "10px",
                }}
                className="item mb-3"
              >
                <div style={{ width: "30px" }} className="quotes">
                  <img
                    style={{ maxWidth: "100%" }}
                    src="./web/images/quote.svg"
                    alt="img"
                  />
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                  }}
                >
                  I have pre-registered as an investor on Growth91 platform.
                  Excited to start investing in Startups.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "50px",
                  }}
                  className="media"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "70px",
                      width: "70px",
                      textAlign: "center",
                      background: "#fff",
                      border: "1px solid #D3CBE2",
                      borderRadius: "50%",
                      overflow: "hidden",
                      lineHeight: "65px",
                    }}
                    className="images"
                  >
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src="./assets/images/testimonials/mukesh-mer.jpg"
                      alt="img"
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }} className="media-body">
                    <a
                      style={{
                        display: "block",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111111",
                        fontFamily: '"Nunito", serif',
                      }}
                      href="#"
                    >
                      Mukesh Mer
                    </a>
                    <small
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: '"Nunito", sans-serif',
                        color: "#313131",
                      }}
                    >
                      N M <br /> Holding
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="item mb-3"
                style={{
                  minHeight: "400px",
                  maxHeight: "400px",
                  background: "#fff",
                  padding: "18px 30px",
                  boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
                  borderRadius: "10px",
                }}
              >
                <div className="quotes" style={{ width: "30px" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src="./web/images/quote.svg"
                    alt="img"
                  />
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                  }}
                >
                  I am a regular investor on Growth Sense and very happy with
                  kind of returns generated on my investments. Looking forward
                  to equally exciting opportunities at Growth91
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30px",
                  }}
                  className="media"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "70px",
                      width: "70px",
                      textAlign: "center",
                      background: "#fff",
                      border: "1px solid #D3CBE2",
                      borderRadius: "50%",
                      overflow: "hidden",
                      lineHeight: "65px",
                    }}
                    className="images"
                  >
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src="./assets/images/testimonials/ramesh-babu.jpg"
                      alt="img"
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }} className="media-body">
                    <a
                      style={{
                        display: "block",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111111",
                        fontFamily: '"Nunito", serif',
                      }}
                      href="#"
                    >
                      Ramesh Babu
                    </a>
                    <small
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: '"Nunito", sans-serif',
                        color: "#313131",
                      }}
                    >
                      Country Head <br /> Government Banking, Axis Bank
                    </small>
                  </div>
                </div>
              </div>

              <div
                className="item mb-3"
                style={{
                  minHeight: "400px",
                  maxHeight: "400px",
                  background: "#fff",
                  padding: "18px 30px",
                  boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
                  borderRadius: "10px",
                }}
              >
                <div className="quotes" style={{ width: "30px" }}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src="./web/images/quote.svg"
                    alt="img"
                  />
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                  }}
                >
                  Knowing the team since so many years, especially after
                  experiencing their skill in deal curation; looking forward to
                  some exciting deals on the platform.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "50px",
                  }}
                  className="media"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "70px",
                      width: "70px",
                      textAlign: "center",
                      background: "#fff",
                      border: "1px solid #D3CBE2",
                      borderRadius: "50%",
                      overflow: "hidden",
                      lineHeight: "65px",
                    }}
                    className="images"
                  >
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src="./assets/images/deals-details/TM (4).jpeg"
                      alt="img"
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }} className="media-body">
                    <a
                      style={{
                        display: "block",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111111",
                        fontFamily: '"Nunito", serif',
                      }}
                      href="#"
                    >
                      Mitul Jhaveri
                    </a>
                    <small
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: '"Nunito", sans-serif',
                        color: "#313131",
                      }}
                    >
                      Director Finance, <br /> Regal Rexnord India
                    </small>
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

export default Investors;
