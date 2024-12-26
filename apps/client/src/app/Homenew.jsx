import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import NewWebHeader from "./common/NewWebHeader.jsx";
import { NewWebFooter } from "./common/NewWebFooter.jsx";
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
import { Homextra } from "./Homextra.jsx";
import { Homenewrxtra } from "./homenewrxtra.jsx";
// import "./web/css/hum.css"
import $ from "jquery";

import { TRACKING_ID } from "./constants/data";
import { Slide } from "react-awesome-reveal";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Homeblog } from "./Homeblog.jsx";
class Homenew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testtime: "",
      isActivemsg: false,
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
      setclass: "",
      isVisible: false,
    };
    this.elementRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.togglemsg = this.togglemsg.bind(this);
  }

  componentWillMount() {
    // title
    document.getElementsByTagName("META")[4].content =
    "Growth91: Best Startup investment platform for Investing in startups in India";
    // title

    document.title =
      "Growth91: Best Startup investment platform for Investing in startups in India";
      // keyword
    document.getElementsByTagName("META")[5].content = "invest in startups invest in startups india "
// description
    document.getElementsByTagName("META")[3].content =
"Maximize your returns with the best startup investing platform. Learn how to invest in startups in India and find the top investment opportunities."; 
   window.removeEventListener("scroll", this.handleScroll);
  }
  togglemsg() {
    // Toggle isActive state

    this.setState((prevState) => ({
      isActivemsg: !prevState.isActivemsg,
    }));
  };
  componentDidMount() {
    window.scrollTo(0, 0)
    this.handleScroll(); // Call initially to check visibility
    window.addEventListener("scroll", this.handleScroll);

    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (localStorage.getItem("investor_id")) {
      this.setState({
        name: localStorage.getItem("investor_name"),
        loggedinstatus: true,
        loggedinuser: "investor",
        investor_id: localStorage.getItem("investor_id"),
      });
    } else if (localStorage.getItem("founder_id")) {
      this.setState(
        {
          loggedinstatus: true,
          loggedinuser: "founder",
          name: localStorage.getItem("founder_name"),
        },
        () => this.get_founder_details()
      );
    } else {
      this.check_for_membership_type();
      this.setState({
        name: "",
        loggedinstatus: false,
      });
    }

    this.setState({
      testtime: 2,
    });
    // Call API initially
    // this.getDelete_analytics_session_data();

    // Call API every 3 seconds
    // this.delete_analytics_session_interval = setInterval(() => this.getDelete_analytics_session_data(), 3000);

    // this.start_analytics_session_interval = setInterval(() => this.postStart_analytics_session_data(), 2000);
  }
  handleScroll() {
    if (this.elementRef.current) {
      const top = this.elementRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      this.setState({ isVisible: top < windowHeight });
    }
  }
  componentWillUnmount() {
    //   clearInterval(this.delete_analytics_session_interval);
    window.removeEventListener("scroll", this.handleScroll);

    //   clearInterval(this.start_analytics_session_interval);
  }

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

  render() {
    function SimpleNextArrow(props) {
      const { onClick } = props;
      return (
        <>
          <div className="nextArrow" onClick={onClick}>
            <span class="next-arrows slick-arrow">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </div>
        </>
      );
    }

    function SimplePrevArrow(props) {
      const { onClick } = props;
      return (
        <>
          <div className="prevArrow" onClick={onClick}>
            <span class="prev-arrows slick-arrow">
              {" "}
              <i class="fa fa-angle-left" aria-hidden="true"></i>{" "}
            </span>
          </div>
        </>
      );
    }

    // const  sliderSettings = {
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   infinite: false,
    // }
    const { isVisible, isActivemsg } = this.state;
    const sliderSettings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      fade: true,

      autoplay: true,
      pauseOnHover: false,
      pauseOnfocus: false,
      cssEase: "linear",
      prevArrow: <SimplePrevArrow />,
      nextArrow: <SimpleNextArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {

            slidesToShow: 1,
            dots: true,

            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
            dots: true,

            slidesToShow: 1,
            slidesToScroll: 1,

          },
        },
      ],
    };
    const successsetting = {
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 0,
      speed: 5000,
      dots: false,
      cssEase: "linear",
      pauseOnHover: false,
      pauseOnFocus: false,

      prevArrow: <SimplePrevArrow />,
      nextArrow: <SimpleNextArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,

            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 1,

            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,

            slidesToScroll: 1,

            autoplay: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
            slidesToShow: 2,

            slidesToScroll: 1,

            autoplay: true,
          },
        },
      ],
    };
    const testimonialsetting = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 2000,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      autoplay: true,
      pauseOnHover: false,
      className: "test",
      cssEase: "linear",
      prevArrow: <SimplePrevArrow />,
      nextArrow: <SimpleNextArrow />,
      style: { margin: "0 20px" },

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,

            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,

          },
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1,

            speed: 1000,
            autoplaySpeed: 5000,

            cssEase: "linear",

            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
            slidesToShow: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            slidesToScroll: 1,

            cssEase: "linear",

          },
        },
      ],
    };
    const countersettting = {
      class: "flex-counters",
      dots: false,
      infinite: true,
      arrows: true,
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      // fade: true,
      // speed: 3000,
      autoplay: false,
      pauseOnHover: false,
      cssEase: "linear",
      prevArrow: <SimplePrevArrow />,
      nextArrow: <SimpleNextArrow />,

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: false,
          },
        },
      ],
    };

    $(window).scroll(function () {
      if ($(this).scrollTop() > 30) {
        $("body").addClass("newClass");
      } else {
        $("body").removeClass("newClass");
      }
    });

    $(document).ready(function () {
      $(".gotoTop").click(function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    });


    const pointer = {
      pointerEvents: "none",
    };
    const { loading } = this.state
    console.log(loading);
    return (
      <div>
        {/*  <NewWebHeader  newabout={"newabout"} /> */}
        <NewWebHeader />
        <div
          id="loading"
          style={{ display: loading == false ? "none" : "block" }}
        >
          <div id="loading-center">
            <div className="preloader"></div>
          </div>
        </div>
        <div className="mainbanner">
          <section class="banner_section ">
            <div class="container-fluid">
              <div class="row banner-row">
                <div class="banner-sliding">
                  <Slider {...sliderSettings}>

                    <div class="left-content">
                      <div class="d-flex-banner fadding-bottom fadding-bottom-1">
                        <div class="banner-part banner-slidingpart">
                          <h1 class="">
                          Looking to Invest in Startups in India and 
                            Tap Into High-Growth Ventures?
                          </h1>
                          <p class=" p-0">
                            <span>
                              Growth 91 connects you with the next big thing
                            </span>
                          </p>

                          <div className="banner-mobile-img d-sm-none">
                            <img
                              src="./assets/images/diagram.png"
                              alt="Private market investing made easy"
                            />
                          </div>
                          <form
                            class="input_box input-box-new banner-btns wow  fadeInUp"
                            data-wow-delay="0.7s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.7s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div class="form-wraper new-form-wrapper">
                              <Link
                                to={
                                  this.state.loggedinstatus == true
                                    ? "/deals"
                                    : "/signup"
                                }
                                class="white-btns"
                                type="button"
                              >
                                Get Started
                              </Link>
                            </div>
                          </form>
                        </div>

                        <div class="img-banner-part">
                          <img
                            src="./assets/images/diagram.png"
                            alt="Private market investing made easy"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="left-content">
                      <div class="d-flex-banner fadding-bottom fadding-bottom-2">
                        <div class="banner-part banner-slidingpart">
                          <h2
                            class="wow fadeInUp"
                            data-wow-delay="0.3s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.3s",
                              animationName: "fadeInUp",
                            }}
                          >
                            Don't Let Funding Hold You Back.
                            <br />
                            Find Investor for Your Startup on Growth91.
                          </h2>
                          <div class="banner-listes">
                            <ul>
                              <li>
                                <span>
                                  <i class="fa-solid fa-check"></i>
                                </span>
                                Connect with Investors
                              </li>
                              <li>
                                <span>
                                  <i class="fa-solid fa-check"></i>
                                </span>
                                Simplify Fundraising
                              </li>
                              <li>
                                <span>
                                  <i class="fa-solid fa-check"></i>
                                </span>
                                Build Your Startup
                              </li>
                            </ul>
                          </div>

                          <div className="banner-mobile-img d-sm-none">
                            <img
                              src="./assets/images/venture.png"
                              loading="lazy"
                              id="w-node-f39cfbdd-9e8a-b68e-331a-6ae7eed950dd-6f7bf169"
                              alt=""
                            />
                          </div>
                          <form
                            class="input_box input-box-new banner-btns wow  fadeInUp"
                            data-wow-delay="0.7s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.7s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div class="form-wraper new-form-wrapper">
                              <Link
                                to="/founder-registration"
                                class="white-btns"
                                type="button"
                              >
                                Raise Funds
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div class="img-banner-part">
                          <img
                            src="./assets/images/venture.png"
                            loading="lazy"
                            id="w-node-f39cfbdd-9e8a-b68e-331a-6ae7eed950dd-6f7bf169"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="left-content">
                      <div class="d-flex-banner banner1 fadding-bottom fadding-bottom-3">
                        <div class="banner-part banner-slidingpart">
                          <h2 class="">
                            Private market <br /> investing made easy
                          </h2>
                          <p class=" p-0" data-wow-delay="0.5s" style={{textTransform:"uppercase"}}>
                          Raise Fund. Invest in Indian Startups. Drive Growth.

                            
                          </p>
                          <div className="banner-mobile-img d-sm-none">
                            <img
                              src="./assets/images/profits.png"
                              alt="startup ecosystem"
                            />
                          </div>
                          <form
                            class="input_box input-box-new banner-btns "
                            data-wow-delay="0.7s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.7s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div class="form-wraper new-form-wrapper">
                              <Link
                                to={
                                  this.state.loggedinstatus == true
                                    ? "/deals"
                                    : "/deals"
                                }
                                class="white-btns"
                                type=""
                              >
                                Explore Deals{" "}
                                {this.state.loggedinstatus == true
                                  ? ""
                                  : "(Sign Up)"}
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div class="img-banner-part">
                          <img
                            src="./assets/images/profits.png"
                            alt="startup ecosystem"
                          />
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Homenewrxtra />

        <section class="business-crowd logo-sections ">
          <div class="container">
            <div class="row">
              <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h3>Startups liked by Marquee Angels
</h3>
              </div>
            </div>
            <div class="position-rel">
              <div class="blur-div"></div>
              <div class="row client-slider">
                <Slider {...successsetting}>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Atreya/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/BizPay/logo.svg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Bulkpe/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>

                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/EcoRatings/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/EventBeep/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Footrax/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Homversity/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/HumSafer/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>

                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/IndianStartupNews/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/IndusUno/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Invidata/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Newboo/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>

                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Petmojo/logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Targetpeak/Target-Peak-Logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/the EleFant/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/TransBank/Logo.jpg"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Tulua/Tulua Logo.webp"
                      alt="img"
                      srcset=""
                    />
                  </div>
                  <div class="client-logo">
                    <img
                      src="./assets/images/deal-images/Yolo/logo.png"
                      alt="img"
                      srcset=""
                    />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section class="counter-sections">
          <div class="container">
            <div class="row">
              <div class="">
                <div class="main-heading-counter">
                  <p ref={this.elementRef}>Investment Strategy</p>
                  <h3>Data-Driven Decisions</h3>
                  <p>
                    We leverage AI and machine learning to identify
                    high-potential startups early, ensuring our portfolio is
                    positioned for success.
                  </p>
                </div>

                {document.body.clientWidth < 600 ? (
                  <Slider
                    className="flex-counters sliderdriven"
                    {...countersettting}
                  >
                    <div class="counter-container newcountercontainer">
                      <div class="part-one-count">
                        <div id="numbers">
                          <span class=" fig-number">
                            <CountUp
                              duration={5}
                              start={0}
                              end={75}
                              scrollSpyDelay={1000}
                            />
                          </span>
                        </div>
                        <p>+</p>
                      </div>
                      <span>Startups funded</span>
                    </div>
                    <div class="counter-container newcountercontainer ">
                      <div class="part-one-count">
                        <div id="numbers">
                          <span class=" fig-number">
                            <CountUp
                              duration={3}
                              start={0}
                              end={90}
                              scrollSpyDelay={1000}
                            />
                          </span>
                        </div>
                        <p>%</p>
                      </div>

                      <span>Success Rate</span>
                    </div>

                    <div class="counter-container newcountercontainer">
                      <div class="part-one-count">
                        <div id="numbers">
                          <span class=" fig-number">
                            <CountUp
                              duration={3}
                              start={0}
                              end={1000}
                              scrollSpyDelay={1000}
                            />
                          </span>
                        </div>
                        <p>+</p>
                      </div>
                      <span>Startups Analyzed</span>
                    </div>
                    <div class="counter-container newcountercontainer">
                      <div class="part-one-count">
                        <p>Top Quartile</p>
                      </div>
                      <span>Performance Ranking</span>
                    </div>
                  </Slider>
                ) : (
                  <>
                    <div class="flex-counters">
                      <div class="counter-container ">
                        <div class="part-one-count">
                          <div id="numbers">
                            <span class=" fig-number">
                              <CountUp
                                duration={5}
                                start={0}
                                end={75}
                                scrollSpyDelay={1000}
                              />
                            </span>
                          </div>
                          <p>+</p>
                        </div>
                        <span>Startups funded</span>
                      </div>
                      <div class="counter-container  ">
                        <div class="part-one-count">
                          <div id="numbers">
                            <span class=" fig-number">
                              <CountUp
                                duration={3}
                                start={0}
                                end={90}
                                scrollSpyDelay={1000}
                              />
                            </span>
                          </div>
                          <p>%</p>
                        </div>

                        <span>Success Rate</span>
                      </div>

                      <div class="counter-container ">
                        <div class="part-one-count">
                          <div id="numbers">
                            <span class=" fig-number">
                              <CountUp
                                duration={3}
                                start={0}
                                end={1000}
                                scrollSpyDelay={1000}
                              />
                            </span>
                          </div>
                          <p>+</p>
                        </div>
                        <span>Startups Analyzed</span>
                      </div>
                      <div class="counter-container ">
                        <div class="part-one-count">
                          <p>Top Quartile</p>
                        </div>
                        <span>Performance Ranking</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section class="business-crowd">
          <div class="container">
            <div class="row">
              <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h3>Why Invest in Startups in India with Us</h3>
              </div>

              <div class="main-business-card">
                <div class="circle-card-g91">
                  <div class="img-inner-card1">
                    <img src="./assets/images/display.png" alt="" srcset="" />
                  </div>
                  <div class="card-business-crowd">
                    <h4>Transparency at Every Step </h4>
                    <p>
                      We offer a clear view into our rigorous vetting process,
                      detailed startup profiles with in-depth information, and
                      open communication. Invest with confidence, knowing you
                      have all the information you need to make informed
                      decisions.
                    </p>
                  </div>
                </div>
                <div class="circle-card-g91">
                  <div class="img-inner-card1">
                    <img src="./assets/images/funding.png" alt="" srcset="" />
                  </div>
                  <div class="card-business-crowd">
                    <h4>Handpicked Deals for Explosive Growth </h4>
                    <p>
                      We meticulously select high-growth potential startups from
                      diverse industries, saving you time and research while
                      offering a range of exciting investment opportunities.
                    </p>
                  </div>
                </div>
                <div class="circle-card-g91">
                  <div class="img-inner-card1">
                    <img src="./assets/images/growth.png" alt="" srcset="" />
                  </div>
                  <div class="card-business-crowd">
                    <h4>Aligned Interests, Shared Success</h4>
                    <p>
                      {" "}
                      We invest alongside you in every startup featured on our
                      platform. This "skin in the game" approach ensures our
                      goals are perfectly aligned with yours – we're all rooting
                      for the next big thing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonial-section">
          <div class="container">
            <div class="row">
              <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h3>Our Successful Startup Investors</h3>
              </div>
              <div class="col-12 col-xl-12 col-lg-12 col-md-12 ">
                <div class="slider-testimonials">
                  <Slider {...testimonialsetting}>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          Discovering hidden gems with Growth91 is like
                          uncovering beautiful teasure. The platform's knack for
                          identifying unique and promising startups gives me a
                          sense of being part of an exclusive club.It's not just
                          about numbers; it's about the thrill of finding the
                          next big thing in the startup world.
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/hrish.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>Hirish Shipurkar</h3>
                            <p> Head India </p>
                            <p className="company-name">
                              GPS FIG, HSBC Bank
                            </p>


                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          Investing through Growth91 feels like having insider
                          access to a world top-tier opportunities. the
                          platform's ability to consistently bring high-quality
                          deals to the table to showcase a deep understanding of
                          market trends and a commitment to providing investors
                          with access to cream of the crop
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/jaison.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>JAISON TITUS</h3>
                            <p>SOFTWARE DEVLOPMENT </p>

                            <p className="company-name">
                              Engineer Amazon AWS and Amazon Robotics,USA
                            </p>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          I am a regular investor on Growth Sense and very happy
                          with kind of returns generated on my investments.
                          Looking forward to equally exciting opportunities at
                          Growth91<sup style={{ fontSize: "0.6rem" }}>TM</sup>
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/ramesh-babu.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>Ramesh Babu</h3>
                            <p>Country Head </p>

                            <p className="company-name">
                              Government Banking, Axis Bank
                            </p>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          Knowing the team since so many years, especially after
                          experiencing their skill in deal curation; looking
                          forward to some exciting deals on the platform.
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/mitul.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>Mitul Jhaveri</h3>
                            <p>Director Finance</p>
                            <p className="company-name">
                              Regal Rexnord India
                            </p>



                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          what I appreciate most about Growth91 is the Caliber
                          of its advisory board.Sanjay Sarda,Jimish Kapadia Asit
                          oberoi and other they aren't figerHeads they're active
                          contributors,shapeing the plateform's approach to
                          investments.it's like having a personalised team of
                          mentors, ensuring that every investment decision
                          benifits from a wealth of collective exprience and
                          foresight
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/kush.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>KUSH SHRIVASTAVA</h3>
                            <p>Co Founder Quiklo</p>
                            <p className="company-name">
                              Fintech Expert
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="testimonails-cards">
                        <ul>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                          <li>
                            <i class="fa-solid fa-star"></i>
                          </li>
                        </ul>
                        <p>
                          The caliber of deals curated by Growth91 is nothing
                          shorts of exceptional. It's not just about
                          quality;it's the meticulous selection process that
                          ensure each investment opportuntiy is a potential
                          game-changer. Quality over quantity truly defines the
                          investment landscapes on this platform. hope they
                          continueto do it in future also
                        </p>
                        <div class="name-testi">
                          <div class="img-testiminal-card">
                            <img
                              src="./assets/images/testimonials/Prakash.jpg"
                              alt="user"
                            />
                          </div>
                          <div class="contents-testimonials">
                            <h3>PRAKASH ROHERA</h3>
                            <p>INTERNATIONAL Corporate </p>
                            <p className="company-name">
                              Trainer and Coach
                            </p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* blog section */}
        <Homeblog />

        <section class="faq-sections">
          <div class="container">
            <div class="row">
              <div class="main-accordain-all">
                <div class="faq-side-content">
                  <h3>Frequently Asked Questions</h3>
                </div>
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="flush-headingOne">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        1. Where does my money go after I invest?
                      </button>
                    </h3>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                      Your Investment is in safe hands, After all 
                      the required fund raising formalities are completed 
                      by the Startup, we advise investors to directly 
                      transfer funds to the account of respective Startup, 
                      dedicated for receiving Securities Application Money.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="flush-headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        2. How do I know the worth of my investment?
                      </button>
                    </h3>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Unlike shares traded on stock exchanges like the Bombay
                        Stock Exchange (BSE), private startup investments don't
                        have a constantly changing market value. To estimate
                        your investment's worth, we can compare the company's
                        valuation during your investment round with its latest
                        valuation.
                        <br /> <br />
                        If the company goes through an Initial Offering (IPO),
                        you'll be able to track your shares' value just likely
                        traded stocks.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="flush-headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        3. How long before I see a return?
                      </button>
                    </h3>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        While there's no guaranteed timeframe, industry reports
                        suggest an average wait time of 5-7 years for Indian
                        startups to deliver returns to investors. This is just a
                        ballpark figure, and your specific investment could see
                        returns sooner or later.
                        <br />
                        <br />
                        Remember: Patience is crucial! Successful startups
                        require time to develop, scale, and potentially reach an
                        exit event.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="flush-headingfour">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-headingfournew"
                        aria-expanded="false"
                        aria-controls="flush-headingfour"
                      >
                        4. I am new to this, how do I choose?
                      </button>
                    </h3>
                    <div
                      id="flush-headingfournew"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingfour"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        We've done the groundwork. We carefully vet all deals
                        before featuring them, and only invest in those we truly
                        believe in.
                        <br />
                        <br />
                        Your investment journey starts here. Browse through
                        curated deals, do your own research using the provided
                        financials, pitch decks, and market sentiment. Leverage
                        your unique insights and invest in what excites you and
                        aligns with your understanding.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <section class="custom-section">
          <div class="join-section join-sec-yellow join-sec-white undefined join-divide mobile-join">
            {/* <h4>Join us</h4> */}
            <div className="join-flex-one-us">
              <h2>Join Us to Invest in Startups in India and Support Breakthrough Ventures</h2>
              <p class="index_pitch">
                Decades of banking, investing & startup success guide your investments. Invest confidently with us.
              </p>
            </div>
            <div class="index-button-1">
              <Link to="/Deals" style={{ color: "white" }}>
                Join Us
              </Link>
            </div>
          </div>
        </section>
        {/* <section class="custom-section">
          <div class="join-section join-sec-yellow join-sec-white undefined">
            <h4>Join us</h4>
            <h2>Partner with Us to Identify High-Potential Growth Businesses</h2>
            <p class="index_pitch">
              Experience unparalleled expertise in startup investments with us.
              With over half a decade of rich experience, we've made our mark in
              the world startup ecosystem. Invest confidently today!{" "}
            </p>
            <div class="index-button">
              <Link to="/Deals" style={{ color: "white" }}>
                Join Us
              </Link>
            </div>
          </div>
        </section> */}
        <div class={`social-widjet ${isActivemsg ? ("social-open") : ("")}`}>
          <div class="widjet-link">
            <div class="whatsapp " onClick={this.togglemsg} style={{ backgroundColor: "#29176f" }}>
              <a >
                <img
                  src="/assets/images/cross.svg"
                  alt="img"
                  title="chat to us on whatsapp"
                  srcset=""
                />
              </a>
            </div>
            <div class="whatsapp">
              <a href="https://www.facebook.com/MyGrowth91?mibextid=ZbWKwL"
                target="_blank">
                <img
                  src="/assets/images/messanger.svg"
                  alt="img"
                  title="chat to us on Messanger"
                  srcset=""
                />
              </a>
            </div>
            <div class="whatsapp">
              <a href="https://www.instagram.com/growth.91/"
                target="_blank">
                <img
                  src="/assets/images/insta.png"
                  title="chat to us on Viber"
                  alt="img"
                  srcset=""
                />
              </a>
            </div>
            <div class="whatsapp">
              <a href="https://api.whatsapp.com/send?phone=7588544442&text=welcome%20to%20Growth%2091"
                target="_blank">
                <img
                  src="/assets/images/Whatsapp.svg"
                  title="chat to us on Viber"
                  alt="img"
                  srcset=""
                />
              </a>
            </div>
          </div>
        </div>
        <div class={`wid-icons`} onClick={this.togglemsg}>
          <div className="msgbut">
            <i class="fa-regular fa-message"></i>
          </div>
        </div>
        <div class="top-butns">
          <button class="gotoTop">
            <i class="fa-solid fa-angle-up"></i>
          </button>
        </div>
        {/* { this.state.testtime ==2?(
           <Homextra/>)
            :("")} */}

        <NewWebFooter />
      </div >
    );
  }
}

export default Homenew;
