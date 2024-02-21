import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";

class Founders extends Component {
  componentWillMount() {
    document.title = "Founders - Growth91 - Startup Marketplace";
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
                              Convert your community into capital
                            </h2>
                            <p
                              style={{ textAlign: "justify" }}
                              className="wow fadeInUp"
                              data-wow-delay="0.5s"
                            >
                              You transformed the way your team contributes to
                              your mission with ESOPs. Now, leverage your Community and your well wishers to fuel your growth with Growth91.
                              <span className="">
                                <br />
                                {/* Are you a founder?{" "} */}
                                <a
                                  href="/founder-registration"
                                  className=""
                                  style={{ color: "#FF9C1A" }}
                                >
                                  Raise capital using Growth91
                                </a>
                              </span>
                            </p>

                            <form
                              className="input_box wow fadeInUp"
                              data-wow-delay="0.7s"
                            >
                              <div className="form-wraper">
                                {localStorage.getItem("investor_id") ? (
                                  <div className="theme-btn">
                                    <a
                                      href="/Deals "
                                      className="theme-btn "
                                      type="button"
                                    >
                                      Get Started as Founder
                                    </a>
                                  </div>
                                ) : (
                                  <a
                                    href="/founder-registration "
                                    className="theme-btn "
                                    type="button"
                                  >
                                    Get Started as Founder
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
                            <img src="./web/images/blog2.png" alt="img" />
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

        <section className="how-we-work-section">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>For Founders</h2>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="item">
                  <div className="icon">
                    <img src="./web/images/icon3.svg" alt="img" />
                    <span>1</span>
                  </div>
                  <h3>Raise Growth Capital</h3>
                  <p style={{ textAlign: "justify" }}>
                    Raise founder-friendly growth capital to scale your business
                  </p>
                  <div className="arrow-img">
                    <img src="./web/images/arrow1.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <div className="icon icon-tow">
                    <img src="./web/images/icon4.svg" alt="img" />
                    <span>2</span>
                  </div>
                  <h3>Seamless and Smooth</h3>
                  <p style={{ textAlign: "justify" }}>
                    Raise capital with ease and confidence
                  </p>
                  <div className="arrow-img" style={{ top: 60 }}>
                    <img src="./web/images/arrow2.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <div className="icon icon-three">
                    <img src="./web/images/icon5.svg" alt="img" />
                    <span>3</span>
                  </div>
                  <h3>Leverage established Network</h3>
                  <p style={{ textAlign: "justify" }}>
                    Tap the expertise of SME network for long term growth
                    proposition
                  </p>
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
                      <span></span> What You’ll Get As
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
        </section>
        <section className="testimonials-section t_desktop">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>Testimonials Of Founders</h2>
            </div>
            <div className="testimonial_wraper owl-carousel">
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p>
                  Normally, startup fund raise is quite a tedious process.
                  Knowing Growth91<sup style={{ fontSize: "0.6rem" }}>TM</sup>{" "}
                  modus operandi gives great confidence that we can focus on our
                  core activities
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/deals-details/TM (1).jpeg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Rahul Jain</a>
                    <small>
                      Managing Director, <br />
                      InnoServ Group
                    </small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p>
                  It is good to know that end to end work related to fund raise
                  is taken care by Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>. Looking forward
                  to list our deal at Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/deals-details/TM (2).jpeg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Saumya Shah</a>
                    <small>
                      Founder & CEO, <br />
                      Tarrakki
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p className="paradh">
                  After knowing the details of modus operandi of Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>, it gives great
                  confidence as the deal terms are truly balanced for investors
                  and startups. Will plan to raise our next round at Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/deals-details/TM (3).jpeg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Dhruv Javeri</a>
                    <small>
                      Co-Founder & CEO, <br />
                      Klassroom
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
              <h2>Testimonials Of Founders</h2>
            </div>
            <div className="testimonial_wraper_mobile">
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
                  Normally, startup fund raise is quite a tedious process.
                  Knowing Growth91<sup style={{ fontSize: "0.6rem" }}>TM</sup>{" "}
                  modus operandi gives great confidence that we can focus on our
                  core activities
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
                      src="./assets/images/deals-details/TM (1).jpeg"
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
                      Rahul Jain
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
                      Managing Director, <br />
                      InnoServ Group
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
                  It is good to know that end to end work related to fund raise
                  is taken care by Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>. Looking forward
                  to list our deal at Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>
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
                      src="./assets/images/deals-details/TM (2).jpeg"
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
                      Saumya Shah
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
                      Founder & CEO, <br />
                      Tarrakki
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
                  className="paradh"
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                    marginbottom: "25px",
                  }}
                >
                  After knowing the details of modus operandi of Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>, it gives great
                  confidence as the deal terms are truly balanced for investors
                  and startups. Will plan to raise our next round at Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
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
                      src="./assets/images/deals-details/TM (3).jpeg"
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
                      Dhruv Javeri
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
                      Co-Founder & CEO, <br />
                      Klassroom
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

export default Founders;
