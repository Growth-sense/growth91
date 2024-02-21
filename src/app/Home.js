import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spin, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Bridge from "./constants/Bridge";
import Apis from "./constants/Apis";
import moment from "moment";
import axios from "axios";
import ReactGA from "react-ga";
import { TRACKING_ID } from "./constants/data";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_by: "",
      searchInput: "",
      deals: [],
      cdeals: [],
      loading: false,
      todaydate: "",
      remaining_days: 0,
      membership_type: "regular",
      investor_id: 0,
      delete_analytics_session_data: [],
      start_analytics_session_responseData: "",
    };
  }

  componentDidMount() {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (localStorage.getItem("investor_id")) {
      this.setState(
        {
          investor_id: localStorage.getItem("investor_id"),
        },
        () => this.check_for_membership_type()
      );
    } else if (localStorage.getItem("founder_id")) {
      this.get_founder_details();
    } else {
      this.check_for_membership_type();
    }
    // Call API initially
    // this.getDelete_analytics_session_data();

    // Call API every 3 seconds
    // this.delete_analytics_session_interval = setInterval(() => this.getDelete_analytics_session_data(), 3000);

    // Post data every 2 seconds
    // this.start_analytics_session_interval = setInterval(() => this.postStart_analytics_session_data(), 2000);
  }
  // componentWillUnmount() {
  //   clearInterval(this.delete_analytics_session_interval);
  //   clearInterval(this.start_analytics_session_interval);
  // }
  getDelete_analytics_session_data = () => {
    axios
      .get(
        "https://growth91.com/api/Analytics/Analytics/delete_analytics_session"
      )
      .then((response) => {
        this.setState({ delete_analytics_session_data: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  postStart_analytics_session_data = () => {
    axios
      .post(
        "https://growth91.com/api/Analytics/Analytics/start_analytics_session",
        { page: "HomePage" }
      )
      .then((response) => {
        this.setState({ start_analytics_session_responseData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status == "1") {
        if (result.data.length > 0) {
          let investor_id = localStorage.getItem("founder_id");
          this.setState({ investor_id: investor_id });
          setTimeout(() => {
            if (result.data[0].is_investor == "1") {
              this.setState({ founder_is_investor: "1" }, () =>
                this.check_for_membership_type()
              );
            } else {
              this.setState({ founder_is_investor: "0" }, () =>
                this.check_for_membership_type()
              );
            }
          }, 200);
        }
      } else {
      }
    });
  };
  check_for_membership_type = () => {
    this.setState({ formloader: true });
    if (this.state.investor_id) {
      let params = {
        investor_id: this.state.investor_id,
      };
      Bridge.check_for_membership_type(params).then((result) => {
        if (result.status == "1") {
          if (result.data.length > 0) {
            this.setState(
              { membership_type: result.data[0].membership_type },
              () => this.getDeals()
            );
          } else {
            this.setState({ formloader: false });
          }
        }
      });
    } else {
      this.getDeals();
    }
  };
  getDifferenceInDays = (date1, date2) => {
    let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
    let final = 0;

    return diff;
  };
  // get deal list
  getDeals = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        let arr = [];
        let investor_id = this.state.investor_id;
        this.setState({ todaydate: moment().format("YYYY-MM-DD") });
        for (let item of result.data) {
          if (item.show_status == "1") {
            if (item.deal_type == "Private") {
              if (
                investor_id &&
                item.invitations.length > 0 &&
                item.invitations.includes(investor_id)
              ) {
                arr = [...arr, item];
              }
            } else {
              arr = [...arr, item];
            }
          }
        }
        let list = [];
        let current_date = moment();
        for (let item of arr) {
          let deal_regular_show_date = moment(item.regular_show_date);
          let deal_premium_show_date = moment(item.premium_show_date);

          if (this.state.membership_type == "premium") {
            if (
              moment(current_date).format("YYYY-MM-DD") ==
              moment(deal_premium_show_date).format("YYYY-MM-DD")
            ) {
              list = [...list, item];
            } else if (current_date > deal_premium_show_date) {
              list = [...list, item];
            }
          } else {
            if (
              moment(current_date).format("YYYY-MM-DD") ==
              moment(deal_regular_show_date).format("YYYY-MM-DD")
            ) {
              list = [...list, item];
            } else if (current_date > deal_regular_show_date) {
              list = [...list, item];
            }
          }
        }
        this.setState({
          deals: list,
          cdeals: list,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };
  handleChangeSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (!e.target.value) {
      this.setState({ deals: this.state.cdeals });
    }
  };
  openpage = (item) => {
    localStorage.setItem("deal_id", item.deal_id);
    window.open("/DealDetails", "_self");
  };
  searchdeals = () => {
    let deals = this.state.cdeals;
    let searchInput = this.state.searchInput;
    if (searchInput) {
      this.setState({ loading: false });
      deals = deals.filter((deal) => {
        return deal.name.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    this.setState({
      deals: deals,
      loading: false,
    });
  };
  sortdata = (value) => {
    let sortby = value;
    let deals = this.state.deals;
    if (sortby == "asc") {
      deals.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    } else if (sortby == "desc") {
      deals.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
      });
    } else if (sortby == "dateasc") {
      deals.sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1;
      });
    } else if (sortby == "datedesc") {
      deals.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
      });
    } else if (sortby == "newest") {
      deals.sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1;
      });
    } else if (sortby == "hightolow") {
      deals.sort((a, b) => {
        return a.min > b.min ? 1 : -1;
      });
    } else if (sortby == "lowtohigh") {
      deals.sort((a, b) => {
        return a.Investment_amt < b.Investment_amt ? 1 : -1;
      });
    } else if (sortby == "oldest") {
      deals.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
      });
    }
    this.setState({
      deals: deals,
      sort_by: sortby,
    });
  };

  verify_adhar = () => {
    axios({
      method: "get",
      url: "https://growth91.com/api/Test/verify_adhar",
    }).then((response) => {
      // console.log('adhar verification response', response);
    });
  };
  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 8000,
      autoplaySpeed: 8000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
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
            {/* <!-- <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div> --> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container ">
                  <div className="slider-area">
                    <div className="item">
                      <div className="row align-items-center ">
                        <div className="col-lg-6">
                          <div className="left-content">
                            <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                              {" "}
                              Invest in Startups.
                            </h2>
                            <p
                              style={{ textAlign: "justify" }}
                              className="wow fadeInUp p-0"
                              data-wow-delay="0.5s"
                            >
                              Access curated growth opportunities and add
                              Startups to your investment portfolio.
                            </p>
                            <p
                              style={{ textAlign: "justify" }}
                              className="wow fadeInUp p-0"
                              data-wow-delay="0.5s"
                            >
                              Invest alongside HNIs and Institutional investors.
                            </p>
                            <p
                              style={{ textAlign: "justify" }}
                              className="wow fadeInUp mt-2"
                              data-wow-delay="0.5s"
                            >
                              <span className="">
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
                                {localStorage.getItem("investor_id") == "" ||
                                localStorage.getItem("founder_id") == "" ? (
                                  <>
                                    <a
                                      href="#!"
                                      className="theme-btn"
                                      type="button"
                                      onClick={() => {
                                        ReactGA.event({
                                          category: "Home",
                                          action:
                                            "Get Started button on Landing Page clicked",
                                        });
                                      }}
                                    >
                                      Get Started as Investor
                                    </a>
                                    <a
                                      href="/deals"
                                      className="theme-btn"
                                      type="button"
                                      onClick={() => {
                                        ReactGA.event({
                                          category: "Home",
                                          action:
                                            "View Deals button on Landing Page clicked",
                                        });
                                      }}
                                    >
                                      View Deals
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      href="/deals"
                                      className="theme-btn"
                                      type="button"
                                      onClick={() => {
                                        ReactGA.event({
                                          category: "Home",
                                          action:
                                            "Get Started button on Landing Page clicked",
                                        });
                                      }}
                                    >
                                      Get Started as Investor
                                    </a>
                                    <a
                                      href="/deals"
                                      className="theme-btn"
                                      type="button"
                                      onClick={() => {
                                        ReactGA.event({
                                          category: "Home",
                                          action:
                                            "View Deals button on Landing Page clicked",
                                        });
                                      }}
                                    >
                                      View Deals
                                    </a>
                                  </>
                                )}
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 bannerimg">
                          <div
                            className="right-side-images wow fadeInRight d-block"
                            data-wow-delay="0.6s"
                          >
                            <p className="banner-txt">successfully funded deals</p>
                            <div className="bannerimg-grid">
                              <img src="./web/images/banner-logo1.png" alt="img" />
                              <img src="./web/images/banner-logo4.png" alt="img" />
                              <img src="./web/images/banner-logo3.png" alt="img" />
                              <img src="./web/images/banner-logo2.png" alt="img" />
                              <img src="./web/images/banner-logo5.png" alt="img" />
                              <img src="./web/images/banner-logo6.png" alt="img" />
                            </div>
                          </div>
                        </div> */}
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
              <div className="row">
                <div
                  className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-start align-items-center"
                  style={pointer}
                >
                  <div className="heading-title m-sm-0">
                    <h6>
                      <span></span>{" "}
                    </h6>
                    <h2>In The News</h2>
                    {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
                  </div>
                </div>
                <div
                  className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center"
                  style={{ gap: "20px" }}
                >
                  <a href="#">
                    <img src="./web/news1.jpg" alt="" className="news-img" />
                  </a>
                  <a
                    href="https://www.linkedin.com/posts/indianstartupnews_startup-funding-angelinvestors-activity-7024718695234965504-IVIB?utm_source=share&utm_medium=member_ios"
                    target="_blank"
                  >
                    <img src="./web/news.jpeg" alt="" className="news-img" />
                  </a>
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
                <h2>For Investors</h2>
                {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6" style={pointer}>
                  <div className="item ">
                    <div className="icon text-center">
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
                      In-depth information available for making the right
                      decision
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
                      Start your Investment journey with an amount as small as ₹
                      5,000
                    </p>
                    {/* <a href="featured.html">Know more</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials-section t_desktop d-block">
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
                  I have pre-registered as an investor on Growth91
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup> platform. Excited
                  to start investing in Startups.
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
                  <sup style={{ fontSize: "0.6rem" }}>TM</sup>
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
                      src="./assets/images/testimonials/mitul.jpg"
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
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                    lineHeight: "24px",
                  }}
                >
                  Discovering hidden gems with Growth91 is like uncovering
                  beautiful teasure. The platform's knack for identifying unique
                  and promising startups gives me a sense of being part of an
                  exclusive club.It's not just about numbers; it's about the
                  thrill of finding the next big thing in the startup world.
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/hrish.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">Hirish Shipurkar</a>
                    <small>
                      Head India, <br /> GPS FIG, HSBC Bank
                    </small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                    lineHeight: "24px",
                  }}
                >
                  Investing through Growth91 feels like having insider access to
                  a world top-tier opportunities. the platform's ability to
                  consistently bring high-quality deals to the table to showcase
                  a deep understanding of market trends and a commitment to
                  providing investors with access to cream of the crop
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/jaison.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">JAISON TITUS</a>
                    <small>
                      SOFTWARE DEVLOPMENT, <br />
                      Engineer Amazon AWS and
                      <br /> Amazon Robotics,USA
                    </small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p
                  style={{
                    fontSize: "14.6px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                    lineHeight: "24px",
                  }}
                >
                  what I appreciate most about Growth91 is the Caliber of its
                  advisory board.Sanjay Sarda,Jimish Kapadia Asit oberoi and
                  other they aren't figerHeads they're active contributors,shapeing the plateform's approach to
                  investments.it's like having a personalised team of mentors,
                  ensuring that every investment decision benifits from a wealth
                  of collective exprience and foresight
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/kush.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">KUSH SHRIVASTAVA</a>
                    <small>
                      Co Founder Quiklo, <br /> Fintech Expert
                    </small>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="quotes">
                  <img src="./web/images/quote.svg" alt="img" />
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "#313131",
                    fontFamily: '"Nunito", sans-serif',
                    padding: "20px 0",
                    textAlign: "justify",
                    lineHeight: "24px",
                  }}
                >
                  The caliber of deals curated by Growth91 is nothing shorts of
                  exceptional. It's not just about quality;it's the meticulous
                  selection process that ensure each investment opportuntiy is a
                  potential game-changer. Quality over quantity truly defines
                  the investment landscapes on this platform. hope they
                  continueto do it in future also
                </p>
                <div className="media">
                  <div className="images">
                    <img
                      src="./assets/images/testimonials/Prakash.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="media-body">
                    <a href="#">PRAKASH ROHERA</a>
                    <small>
                      INTERNATIONAL Corpoate <br />
                      Trainer and Coach
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="testimonials-section t_mobile  d-none"
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
                style={{
                 
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
                  Discovering hidden gems with Growth91 is like uncovering
                  beautiful teasure. The platform's knack for identifying unique
                  and promising startups gives me a sense of being part of an
                  exclusive club.It's not just about numbers; it's about the
                  thrill of finding the next big thing in the startup world.
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
                      src="./assets/images/testimonials/hrish.jpg"
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
                      Hirish Shipurkar 
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
                      Head India, <br /> GPS FIG, HSBC Bank
                    </small>
                  </div>
                </div>
              </div>
              <div
                style={{
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
                  Investing through Growth91 feels like having insider access to
                  a world top-tier opportunities. the platform's ability to
                  consistently bring high-quality deals to the table to showcase
                  a deep understanding of market trends and a commitment to
                  providing investors with access to cream of the crop
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
                      src="./assets/images/testimonials/jaison.jpg"
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
JAISON TITUS                    </a>
                    <small
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: '"Nunito", sans-serif',
                        color: "#313131",
                      }}
                    >
                     SOFTWARE DEVLOPMENT, <br />
                      Engineer Amazon AWS and
                      <br /> Amazon Robotics,USA
                    </small>
                  </div>
                </div>
              </div>
              <div
                style={{
                
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
                  what I appreciate most about Growth91 is the Caliber of its
                  advisory board.Sanjay Sarda,Jimish Kapadia Asit oberoi and
                  other they aren't figerHeads; they're active
                  contributors,shapeing the plateform's approach to
                  investments.it's like having a personalised team of mentors,
                  ensuring that every investment decision benifits from a wealth
                  of collective exprience and foresight
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
                      src="./assets/images/testimonials/kush.jpg"
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
                      KUSH SHRIVASTAVA
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
                  Co Founder Quiklo, <br /> Fintech Expert
                    </small>
                  </div>
                </div>
              </div>
              <div
                style={{
                 
                  
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
              The caliber of deals curated by Growth91 is nothing shorts of
                  exceptional. It's not just about quality;it's the meticulous
                  selection process that ensure each investment opportuntiy is a
                  potential game-changer. Quality over quantity truly defines
                  the investment landscapes on this platform. hope they
                  continueto do it in future also
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
                      src="./assets/images/testimonials/Prakash.jpg"
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
                     PRAKASH ROHERA
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
                    INTERNATIONAL Corpoate <br />
                      Trainer and Coach
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="item mb-3"
                style={{
                 
                  
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
                      src="./assets/images/testimonials/mitul.jpg"
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
        <section className="how-we-work-section">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>For Founders</h2>
              <p style={{ textAlign: "justify" }}>
                Growth91's robust private deal management option allows
                Founders, Angel Investors, and Venture Capitalists to conduct
                their fundraising process online, available exclusively to their
                target audience. Don't get bogged down in continuous signing and
                filing. It's easy, smooth, and uncomplicated.
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="item mb-3">
                  <div className="icon">
                    <img src="./web/images/icon3.svg" alt="img" />
                    <span>1</span>
                  </div>
                  <h3 style={{ textAlign: "center" }}>Raise Growth Capital</h3>
                  <p style={{ textAlign: "center" }}>
                    Raise founder-friendly growth capital to scale your business
                  </p>
                  <div className="arrow-img">
                    <img src="./web/images/arrow1.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item mb-3">
                  <div className="icon icon-tow">
                    <img src="./web/images/icon4.svg" alt="img" />
                    <span>2</span>
                  </div>
                  <h3 style={{ textAlign: "center" }}>Seamless and Smooth</h3>
                  <p style={{ textAlign: "center" }}>
                    Raise capital with ease and confidence
                  </p>
                  <div className="arrow-img" style={{ top: 60 }}>
                    <img src="./web/images/arrow2.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item mb-3">
                  <div className="icon icon-three">
                    <img src="./web/images/icon5.svg" alt="img" />
                    <span>3</span>
                  </div>
                  <h3 style={{ textAlign: "center" }}>
                    Leverage established Network
                  </h3>
                  <p style={{ textAlign: "center" }}>
                    Tap the expertise of SME network for long term growth
                    proposition
                  </p>
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
                <p>
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

export default Home;
