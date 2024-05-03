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
import { Homextra } from "./Homextra.jsx";

import { TRACKING_ID } from "./constants/data";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testtime: "",
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

  componentWillMount() {
   
    document.getElementsByTagName("META")[4].content =
      "Venture into Innovation: Invest in Startups with Growth91";

    document.getElementsByTagName("META")[3].content =
      "Explore the potential of startup investments with Growth91. Discover opportunities & maximize your returns. Embrace the opportunity to invest in startups.";
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
                            <h1 className="toph1"  fetchpriority="high" >
                              {" "}
                              Invest in Startups.
                            </h1>
                            <p fetchpriority="high"
                              style={{ textAlign: "justify" }}
                              className=" p-0"
                              
                            >
                              Access curated growth opportunities and add
                              Startups to your investment portfolio.
                            </p>
                            <p
                              style={{ textAlign: "justify" }}
                              className=" p-0"
                              
                            >
                              Invest alongside HNIs and Institutional investors.
                            </p>
                            <p
                              style={{ textAlign: "justify" }}
                              className=" mt-2"
                              
                            >
                              <span className="">
                                <a
                                  href="/founder-registration"
                                  className="raisecapitol"
                                  style={{ color: "#FF9C1A" }}                           
                                >
                                  Raise capital using Growth91
                                </a>
                              </span>
                            </p>

                            <form
                              className="input_box "
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

        { this.state.testtime ==2?(
           <Homextra/>)
            :("")}

        <WebFooter />
      </div>
    );
  }
}

export default Home;
