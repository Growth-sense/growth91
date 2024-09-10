import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import { Select, Tabs, message, Spin, Tooltip } from "antd";
import { InfoCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import Bridge from "./constants/Bridge";
import Apis from "./constants/Apis";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "./constants/data";
import NewWebHeader from "./common/NewWebHeader";
import { NewWebFooter } from "./common/NewWebFooter";
ReactGA.initialize(TRACKING_ID);
const { Option } = Select;
const { TabPane } = Tabs;

class Deals extends Component {
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
    };
  }

  componentWillMount() {
    document.title = "Deals - Growth91 - Startup Marketplace";
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    // console.log('invetor_id',localStorage.getItem('investor_id'));
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
  }
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
    this.setState({ loading: true });
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
            this.setState({ loading: false });
          }
        }
      });
    } else {
      this.getDeals();
    }
  };
  getDifferenceI = (date1, date2) => {
    let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
    let final = 0;
    if (diff <= 0) {
      

      return 1
      
    } else {
     
      return 0
     
    }
  };
  getDifferencestart = (date1, date2) => {
    let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
    let final = 0;
    if (diff < 0) {
      return diff
      
    } else {
      return diff
     
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
  // handleChange = (e) => {
  //   let text = e.target.value;
  //   this.setState({ loading:true,handleChange:text });
  //   if(text) {
  //     let arr = [];
  //     for(let item of this.state.cstartups) {
  //       if(
  //         item.name && item.name.toLowerCase().includes(text.toLowerCase()) ||
  //         item.status && item.status.toLowerCase().includes(text.toLowerCase()) ||
  //         item.startupid && item.startupid.includes(text.toLowerCase())
  //       ) {
  //         arr = [...arr, item];
  //       }
  //     }
  //     this.setState({
  //       startups: arr,
  //       loading:false,
  //     });
  //   } else {
  //     this.setState({
  //       startups: this.state.cstartups,
  //       loading:false,
  //     });
  //   }
  // }

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

  render() {
    const openDeals = this.state.deals?.filter(
      (item) => item.deal_status === "Open"
    );
    const closedDeals = this.state.deals?.filter(
      (item) => item.deal_status === "Closed"
    );
    const AllOpenDeals = this.state.deals?.filter(
      (item) => item.deal_status != "Closed" && item.show_status == 1
    );
    const PublicOpenDeals = this.state.deals?.filter(
      (item) =>
        item.deal_type == "Public" &&
        item.deal_status != "Closed" &&
        item.show_status == 1
    );
    const PrivateOpenDeals = this.state.deals?.filter(
      (item) => item.deal_type == "Private" && item.show_status == 1
    );
    return (
      <div
        className="deals-page"
        style={{
          marginTop: 171,
        }}
      >
        {/* <WebHeader /> */}
        <NewWebHeader newabout={"newabout"}/>

        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-header-section">
                  {/* <h1>Live Deals</h1> */}
                  <p>Browse current investment opportunities on Growth91.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className="row align-items-center"
              style={{
                marginBottom: 30,
                marginTop: 40,
              }}
            ></div>
            {/* <hr style={{height:"5px",backgroundColor:"black"}}/> */}
          </div>
        </div>
        {/* {openDeals.length == 0 && closedDeals.length == 0 && (
          <p
            style={{
              textAlign: "center",
              fontSize: 19,
              marginBottom: 55,
              marginTop: 60,
            }}
          >
            Exciting Deals Coming Soon. Stay Tuned.{" "}
          </p>
        )} */}
        {this.state.loading ? (
          <div className="text-center mt-5 mb-5">
            <h4 className="mb-3">Loading...</h4>
            <Spin size="large" />
          </div>
        ) : openDeals.length > 0 ? (
          <div className="tab-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="All" key="1">
                      {AllOpenDeals.length > 0 ? (
                        <>
                          <h1
                            style={{ marginBottom: "20px", fontSize: "2rem" }}
                          >
                            Live Deals
                          </h1>
                          <div className="row deal-list"></div>
                          <div className="row deal-list">
                            {/* static */}

                            {/* dynamic */}

                            {this.state.deals &&
                              this.state.deals.map((item, index) => {
                              
                                const handleGA = () => {
                                  ReactGA.event({
                                    category: "Deals",
                                    action: `Deal clicked. dealId:${item.deal_id} dealName:${item.deal_name}`,
                                  });
                                };

                                let logourl =
                                  Apis.IMAGEURL +
                                  "deal/logo/" +
                                  item.deal_id +
                                  "/" +
                                  item.logo;
                                let bannerurl =
                                  Apis.IMAGEURL +
                                  "deal/banner/" +
                                  item.deal_id +
                                  "/" +
                                  item.banner_img;
                                {
                                  /* console.log('deal',item.deal_id+''+item.name); */
                                }
                                let categories = JSON.parse(item.deal_category);
                                // item.deal_status = 'Closed';
                                if (
                                  item.deal_status != "Closed" &&
                                  item.show_status == 1
                                ) {
                                  return (
                                    <div
                                      onClick={handleGA}
                                      className="col-lg-4"
                                      key={index}
                                    >
                                      <a
                                        //  onClick={() =>   this.openpage(item)}}
                                        href={this.getDifferenceI(
                                          this.state.todaydate,
                                          moment(
                                            item.deal_st_date
                                          ).format("YYYY-MM-DD")
                                        ) ==1 && item.page_link}
                                        // onClick={()=>this.openpage(item)}
                                      >
                                        <div className="deal-item">
                                          <div className="d-flex tag-list">
                                            {item.deal_type == "Private" && (
                                              <div className="private-tag">
                                                <span style={{ fontSize: 12 }}>
                                                  Private
                                                </span>{" "}
                                                &nbsp;&nbsp;
                                                {/* <InfoCircleOutlined style={{marginTop:-2}}/> */}
                                              </div>
                                            )}
                                            {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 && (
                                              <div className="private-tag">
                                                <span style={{ fontSize: 12 }}>
                                                  Coming Soon
                                                </span>{" "}
                                                &nbsp;&nbsp;
                                                {/* <InfoCircleOutlined style={{marginTop:-2}}/> */}
                                              </div>
                                            )}
                                          </div>
                                          <div className="deal-item-img">
                                            <img
                                              src={bannerurl}
                                              className="deal-cover-img"
                                              alt="deal-img"
                                            />
                                          </div>
                                          <div className="deal-item-info">
                                            <div className="row align-items-center">
                                              <div className="col-8 col-lg-8">
                                                <div className="d-flex inner align-items-center">
                                                  <img
                                                    src={logourl}
                                                    alt="deal-img"
                                                    className="deal-logo"
                                                  />
                                                  <h6>{item.deal_name}</h6>
                                                </div>
                                              </div>
                                              {/* - {item.deal_id} */}
                                              <div className="col-4 col-lg-4 p-0">
                                                {item.deal_service ===
                                                "CCPS" ? (
                                                  <Tooltip
                                                    title="
Compulsorily Convertible Preference Shares (CCPS) is a type of equity instrument which usually has higher preference than common equity shares.  CCPS are converted to common equity shares by a specified date on the terms agreed at the time of issue.  Usually, CCPS holders have equal voting rights and appear on the captable.
"
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                ) : item.deal_service ===
                                                  "CCD" ? (
                                                  <Tooltip
                                                    title="Compulsory Convertible Debenture (CCD) is a type of debt instrument, which is compulsorily converted into equity shares on specific terms agreed at the time of issue by a specified date, unless redeemed before this date. Usually, it does not have any voting rights, and till the time of conversion in the future, CCD holder name does not appear on the captable.
"
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                ) : (
                                                  <Tooltip
                                                    title={
                                                      <>
<div class="ant-tooltip-inner" role="tooltip">                                                        
                                                          {" "}
                                                          CCD Compulsory
                                                          Convertible Debenture
                                                          (CCD) is a type of
                                                          debt instrument, which
                                                          is compulsorily
                                                          converted into equity
                                                          shares on specific
                                                          terms agreed at the
                                                          time of issue by a
                                                          specified date, unless
                                                          redeemed before this
                                                          date. Usually, it does
                                                          not have any voting
                                                          rights, and till the
                                                          time of conversion in
                                                          the future, CCD holder
                                                          name does not appear
                                                          on the captable.
                                                        </div>
                                                        <div class="ant-tooltip-inner" role="tooltip">                                                          CCPS Compulsorily
                                                          Convertible Preference
                                                          Shares (CCPS) is a
                                                          type of equity
                                                          instrument which
                                                          usually has higher
                                                          preference than common
                                                          equity shares. CCPS
                                                          are converted to
                                                          common equity shares
                                                          by a specified date on
                                                          the terms agreed at
                                                          the time of issue.
                                                          Usually, CCPS holders
                                                          have equal voting
                                                          rights and appear on
                                                          the captable.
                                                                                                            </div></>
                                                    }
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                )}
                                              </div>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>
                                              {item.Muliples_of.length > 100
                                                ? item.Muliples_of.substring(
                                                    0,
                                                    100
                                                  ) + "..."
                                                : item.Muliples_of}
                                            </p>
                                            <div className="d-flex raised-txt justify-content-between">
                                            {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 ? (""):(
                                                <div>
                                                Percent Raised <br />

                                                <p className="per">
                                                  {parseFloat(
                                                    (item.total_invested_amount /
                                                      item.deal_fund_requested) *
                                                      100 +
                                                      parseInt(item.raiegap)
                                                    ).toFixed(0)}
                                                  %
                                                </p>
                                              </div>)
                                              }
                                            
                                             

                                              {this.getDifferencestart(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) <= 0 ? (
                                                this.getDifferenceInDays(
                                                  this.state.todaydate,
                                                  moment(
                                                    item.deal_end_date
                                                  ).format("YYYY-MM-DD")
                                                ) == 0 && (
                                                  <div className="hero-tag">
                                                    Closing today
                                                  </div>
                                                )
                                              ) : (
                                               ""
                                              )}

                                              {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 ? (
                                                <div className=" ">
                                                {/* Live in <br /> */}
                                                <p className="per">
                                                {/*
                                                  {this.getDifferencestart(
                                                    this.state.todaydate,
                                                    moment(
                                                      item.deal_st_date
                                                    ).format("YYYY-MM-DD")
                                                  ) <= 0
                                                    ? this.getDifferenceInDays(
                                                      this.state.todaydate,
                                                      moment(
                                                        item.deal_end_date
                                                      ).format("YYYY-MM-DD"))
                                                    : this.getDifferencestart(
                                                        this.state.todaydate,
                                                        moment(
                                                          item.deal_st_date
                                                        ).format("YYYY-MM-DD")
                                                      )}{" "}
                                                  Days 
                                                  */}
                                                </p> 
                                              </div>
                                              ) : (
                                                
                                                    this.getDifferenceInDays(
                                                      this.state.todaydate,
                                                      moment(
                                                        item.deal_end_date
                                                      ).format("YYYY-MM-DD")
                                                    ) <= 0
                                                      ? " "
                                                      : <div className=" ">
                                                      Closes in <br />
                                                      <p className="per">
                                                         {this.getDifferenceInDays(
                                                          this.state.todaydate,
                                                          moment(
                                                            item.deal_end_date
                                                          ).format("YYYY-MM-DD")
                                                        )}{" "}
                                                    Days
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                            <div className="d-flex tags">
                                              {categories.length > 0 &&
                                                categories.map((cat, index) => {
                                                  return (
                                                    <div
                                                      className="hero-tag"
                                                      key={index}
                                                    >
                                                      {cat}
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </>
                      ) : (
                        <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
                          No Deals
                        </h1>
                      )}
                    </TabPane>
                    <TabPane tab="Public" key="2">
                      {PublicOpenDeals.length > 0 ? (
                        <>
                          <h1
                            style={{ marginBottom: "20px", fontSize: "2rem" }}
                          >
                            Live Deals
                          </h1>
                          <div className="row deal-list">
                            {this.state.deals &&
                              this.state.deals.map((item, index) => {
                                const handleGA = () => {
                                  ReactGA.event({
                                    category: "Deals",
                                    action: `Deal clicked. dealId:${item.deal_id} dealName:${item.deal_name}`,
                                  });
                                };
                                let logourl =
                                  Apis.IMAGEURL +
                                  "deal/logo/" +
                                  item.deal_id +
                                  "/" +
                                  item.logo;
                                let bannerurl =
                                  Apis.IMAGEURL +
                                  "deal/banner/" +
                                  item.deal_id +
                                  "/" +
                                  item.banner_img;

                                let categories = JSON.parse(item.deal_category);
                                if (
                                  item.deal_type == "Public" &&
                                  item.deal_status != "Closed" &&
                                  item.show_status == 1
                                ) {
                                  return (
                                    <div
                                      onClick={handleGA}
                                      className="col-lg-4"
                                      key={index}
                                    >
                                      <a
                                       href={this.getDifferenceI(
                                        this.state.todaydate,
                                        moment(
                                          item.deal_st_date
                                        ).format("YYYY-MM-DD")
                                      ) ==1 && item.page_link}
                                        // onClick={() => this.openpage(item)}
                                      >
                                        <div className="deal-item">
                                          <div className="d-flex tag-list">
                                            {item.deal_type == "Private" && (
                                              <div className="private-tag">
                                                <span style={{ fontSize: 12 }}>
                                                  Private
                                                </span>{" "}
                                                &nbsp;&nbsp;
                                                {/* <InfoCircleOutlined style={{marginTop:-2}}/> */}
                                              </div>
                                            )}
                                            {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 && (
                                              <div className="private-tag">
                                                <span style={{ fontSize: 12 }}>
                                                  Coming Soon
                                                </span>{" "}
                                                &nbsp;&nbsp;
                                                {/* <InfoCircleOutlined style={{marginTop:-2}}/> */}
                                              </div>
                                            )}
                                          </div>
                                          <div className="deal-item-img">
                                            <img
                                              src={bannerurl}
                                              className="deal-cover-img"
                                              alt="deal-img"
                                            />
                                          </div>
                                          <div className="deal-item-info">
                                            <div className="row align-items-center">
                                              <div className="col-8 col-lg-8">
                                                <div className="d-flex inner align-items-center">
                                                  <img
                                                    src={logourl}
                                                    alt="deal-img"
                                                    className="deal-logo"
                                                  />
                                                  <h6>{item.deal_name}</h6>
                                                </div>
                                              </div>
                                              {/* - {item.deal_id} */}
                                              <div className="col-4 col-lg-4 p-0">
                                                {item.deal_service ===
                                                "CCPS" ? (
                                                  <Tooltip
                                                    title="
Compulsorily Convertible Preference Shares (CCPS) is a type of equity instrument which usually has higher preference than common equity shares.  CCPS are converted to common equity shares by a specified date on the terms agreed at the time of issue.  Usually, CCPS holders have equal voting rights and appear on the captable.
"
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                ) : item.deal_service ===
                                                  "CCD" ? (
                                                  <Tooltip
                                                    title="Compulsory Convertible Debenture (CCD) is a type of debt instrument, which is compulsorily converted into equity shares on specific terms agreed at the time of issue by a specified date, unless redeemed before this date. Usually, it does not have any voting rights, and till the time of conversion in the future, CCD holder name does not appear on the captable.
"
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                ) : (
                                                  <Tooltip
                                                    title={
                                                      <>
<div class="ant-tooltip-inner" role="tooltip">                                                        
                                                          {" "}
                                                          CCD Compulsory
                                                          Convertible Debenture
                                                          (CCD) is a type of
                                                          debt instrument, which
                                                          is compulsorily
                                                          converted into equity
                                                          shares on specific
                                                          terms agreed at the
                                                          time of issue by a
                                                          specified date, unless
                                                          redeemed before this
                                                          date. Usually, it does
                                                          not have any voting
                                                          rights, and till the
                                                          time of conversion in
                                                          the future, CCD holder
                                                          name does not appear
                                                          on the captable.
                                                        </div>
                                                        <div class="ant-tooltip-inner" role="tooltip">                                                          CCPS Compulsorily
                                                          Convertible Preference
                                                          Shares (CCPS) is a
                                                          type of equity
                                                          instrument which
                                                          usually has higher
                                                          preference than common
                                                          equity shares. CCPS
                                                          are converted to
                                                          common equity shares
                                                          by a specified date on
                                                          the terms agreed at
                                                          the time of issue.
                                                          Usually, CCPS holders
                                                          have equal voting
                                                          rights and appear on
                                                          the captable.
                                                                                                            </div></>
                                                    }
                                                  >
                                                    <div
                                                      className="hero-tag"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-around",
                                                        fontSize: 11,
                                                        maxWidth: 100,
                                                      }}
                                                    >
                                                      {item.deal_service} &nbsp;
                                                      <InfoCircleOutlined />
                                                    </div>
                                                  </Tooltip>
                                                )}
                                              </div>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>
                                              {item.Muliples_of.length > 100
                                                ? item.Muliples_of.substring(
                                                    0,
                                                    100
                                                  ) + "..."
                                                : item.Muliples_of}
                                            </p>
                                            <div className="d-flex raised-txt justify-content-between">
                                            {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 ? (""):(
                                                <div>
                                                Percent Raised <br />

                                                <p className="per">
                                                  {parseFloat(
                                                    (item.total_invested_amount /
                                                      item.deal_fund_requested) *
                                                      100 +
                                                      parseInt(item.raiegap)
                                                    ).toFixed(0)}
                                                  %
                                                </p>
                                              </div>)
                                              }
                                            
                                             

                                              {this.getDifferencestart(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) <= 0 ? (
                                                this.getDifferenceInDays(
                                                  this.state.todaydate,
                                                  moment(
                                                    item.deal_end_date
                                                  ).format("YYYY-MM-DD")
                                                ) == 0 && (
                                                  <div className="hero-tag">
                                                    Closing today
                                                  </div>
                                                )
                                              ) : (
                                               ""
                                              )}

                                              {this.getDifferenceI(
                                                this.state.todaydate,
                                                moment(
                                                  item.deal_st_date
                                                ).format("YYYY-MM-DD")
                                              ) ==0 ? (
                                                <div className=" ">
                                                Live in <br />
                                                <p className="per">
                                                  {this.getDifferencestart(
                                                    this.state.todaydate,
                                                    moment(
                                                      item.deal_st_date
                                                    ).format("YYYY-MM-DD")
                                                  ) <= 0
                                                    ? this.getDifferenceInDays(
                                                      this.state.todaydate,
                                                      moment(
                                                        item.deal_end_date
                                                      ).format("YYYY-MM-DD"))
                                                    : this.getDifferencestart(
                                                        this.state.todaydate,
                                                        moment(
                                                          item.deal_st_date
                                                        ).format("YYYY-MM-DD")
                                                      )}{" "}
                                                  Days
                                                </p>
                                              </div>
                                              ) : (
                                                
                                                    this.getDifferenceInDays(
                                                      this.state.todaydate,
                                                      moment(
                                                        item.deal_end_date
                                                      ).format("YYYY-MM-DD")
                                                    ) <= 0
                                                      ? " "
                                                      : <div className=" ">
                                                      Closes in <br />
                                                      <p className="per">
                                                         {this.getDifferenceInDays(
                                                          this.state.todaydate,
                                                          moment(
                                                            item.deal_end_date
                                                          ).format("YYYY-MM-DD")
                                                        )}{" "}
                                                    Days
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                            <div className="d-flex tags">
                                              {categories.length > 0 &&
                                                categories.map((cat, index) => {
                                                  return (
                                                    <div
                                                      className="hero-tag"
                                                      key={index}
                                                    >
                                                      {cat}
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </>
                      ) : (
                        <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
                          No Deals
                        </h1>
                      )}
                    </TabPane>
                    <TabPane tab="Private" key="3">
                      {PrivateOpenDeals.length > 0 ? (
                        <>
                          <h1
                            style={{ marginBottom: "20px", fontSize: "2rem" }}
                          >
                            Live Deals
                          </h1>
                          <div className="row deal-list">
                            {this.state.deals &&
                              this.state.deals.map((item, index) => {
                                const handleGA = () => {
                                  ReactGA.event({
                                    category: "Deals",
                                    action: `Deal clicked. dealId:${item.deal_id} dealName:${item.deal_name}`,
                                  });
                                };
                                let logourl =
                                  Apis.IMAGEURL +
                                  "deal/logo/" +
                                  item.deal_id +
                                  "/" +
                                  item.logo;
                                let bannerurl =
                                  Apis.IMAGEURL +
                                  "deal/banner/" +
                                  item.deal_id +
                                  "/" +
                                  item.banner_img;

                                let categories = JSON.parse(item.deal_category);
                                if (
                                  item.deal_type == "Private" &&
                                  item.show_status == 1
                                ) {
                                  return (
                                    <div
                                      onClick={handleGA}
                                      className="col-lg-4"
                                      key={index}
                                    >
                                      <a
                                         href={this.getDifferenceI(
                                          this.state.todaydate,
                                          moment(
                                            item.deal_st_date
                                          ).format("YYYY-MM-DD")
                                        ) ==1 && item.page_link}
                                        
                                     
                                      >
                                        <div className="deal-item">
                                          <div className="d-flex tag-list">
                                            {item.deal_type == "Private" && (
                                              <div className="private-tag">
                                                <span style={{ fontSize: 12 }}>
                                                  Private
                                                </span>{" "}
                                                &nbsp;&nbsp;
                                                {/* <InfoCircleOutlined style={{
                                          marginTop: -2,
                                        }}/> */}
                                              </div>
                                            )}
                                            {/* <div className='new-tag'>
                                      <span style={{ fontSize:12 }}>New</span>
                                    </div>
                                    <div className='funded-tag'>
                                      <CheckCircleFilled style={{
                                        position: 'relative',
                                        top: -2,
                                      }}/> &nbsp;&nbsp;
                                      <span style={{ fontSize:12 }}>Funded</span>
                                    </div>      */}
                                          </div>
                                          <div className="deal-item-img">
                                            <img
                                              src={bannerurl}
                                              className="deal-cover-img"
                                              alt="deal-img"
                                            />
                                          </div>
                                          <div className="deal-item-info">
                                            <div className="row align-items-center">
                                              <div className="col-8 col-lg-8">
                                                <div className="d-flex inner align-items-center">
                                                  <img
                                                    src={logourl}
                                                    alt="deal-img"
                                                    className="deal-logo"
                                                  />
                                                  <h6>{item.deal_name}</h6>
                                                </div>
                                              </div>
                                              <div className="col-4 col-lg-4 p-0">
                                                <Tooltip
                                                  title={item.deal_tooltip}
                                                >
                                                  <div
                                                    className="hero-tag"
                                                    style={{
                                                      display: "flex",
                                                      justifyContent:
                                                        "space-around",
                                                      fontSize: 11,
                                                      maxWidth: 100,
                                                    }}
                                                  >
                                                    {item.deal_service} &nbsp;{" "}
                                                    <InfoCircleOutlined />
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                            <p>
                                              {item.Muliples_of.length > 100
                                                ? item.Muliples_of.substring(
                                                    0,
                                                    100
                                                  ) + "..."
                                                : item.Muliples_of}
                                            </p>
                                            <div className="d-flex raised-txt justify-content-between">
                                              <div>
                                                Percent Raised <br />
                                                <p className="per">
                                                  {Math.floor(
                                                    (item.total_invested_amount /
                                                      item.deal_fund_requested) *
                                                      100 +
                                                      parseInt(item.raiegap)
                                                  ).toFixed(0)}{" "}
                                                  %
                                                </p>
                                              </div>
                                              <div>
                                                Closes in <br />
                                                <p className="per">
                                                  {this.getDifferenceInDays(
                                                    this.state.todaydate,
                                                    moment(
                                                      item.deal_end_date
                                                    ).format("YYYY-MM-DD")
                                                  )}{" "}
                                                  Days
                                                </p>
                                              </div>
                                            </div>
                                            <div className="d-flex tags">
                                              {categories.length > 0 &&
                                                categories.map((cat, index) => {
                                                  return (
                                                    <div
                                                      className="hero-tag"
                                                      key={index}
                                                    >
                                                      {cat}
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </>
                      ) : (
                        <h1
                          style={{
                            marginTop: "50px",
                            marginBottom: "50px",
                            fontSize: "2rem",
                            textAlign: "center",
                          }}
                        >
                          No Deals
                        </h1>
                      )}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: 19,
              marginBottom: 55,
              marginTop: 60,
            }}
          >
            Exciting Deals Coming Soon. Stay Tuned.{" "}
          </p>
        )}
        {closedDeals.length > 0 && (
          <div
            className="container"
            style={{ marginBottom: 60, marginTop: 100 }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="main-header-section">
                  <hr
                    style={{
                      height: "5px",
                      backgroundColor: "black",
                      fontSize: "2rem",
                    }}
                  />
                  <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
                    Completed Deals
                  </h1>
                </div>
              </div>
            </div>
            <div className="row deal-list">
              {closedDeals &&
                closedDeals.map((item, index) => {
                  const handleGA = () => {
                    ReactGA.event({
                      category: "Deals",
                      action: `Deal clicked. dealId:${item.deal_id} dealName:${item.deal_name}`,
                    });
                  };

                  let logourl =
                    Apis.IMAGEURL +
                    "deal/logo/" +
                    item.deal_id +
                    "/" +
                    item.logo;
                  let bannerurl =
                    Apis.IMAGEURL +
                    "deal/banner/" +
                    item.deal_id +
                    "/" +
                    item.banner_img;
                  {
                    /* console.log('deal',item.deal_id+''+item.name); */
                  }
                  let categories = JSON.parse(item.deal_category);
                  // item.deal_status = 'Closed';
                  if (item.deal_status != "Open") {
                    return (
                      <div onClick={handleGA} className="col-lg-4" key={index}>
                        <div className="deal-item">
                          <div className="d-flex tag-list">
                            {item.deal_type == "Private" && (
                              <div className="private-tag">
                                <span style={{ fontSize: 12 }}>Private</span>{" "}
                                &nbsp;&nbsp;
                                {/* <InfoCircleOutlined style={{marginTop:-2}}/> */}
                              </div>
                            )}
                          </div>
                          <div className="deal-item-img">
                            <img
                              src={bannerurl}
                              className="deal-cover-img"
                              alt="deal-img"
                            />
                          </div>
                          <div className="deal-item-info">
                            <div className="row align-items-center">
                              <div className="col-8 col-lg-8">
                                <div className="d-flex inner align-items-center">
                                  <img
                                    src={logourl}
                                    alt="deal-img"
                                    className="deal-logo"
                                  />
                                  <h6>{item.deal_name}</h6>
                                </div>
                              </div>
                              {/* - {item.deal_id} */}
                              <div className="col-4 col-lg-4 p-0">
                                <Tooltip title=" Compulsorily Convertible Debentures (CCD), with same financial rights as equity shares as on fully diluted basis.  There are no voting rights or cap table entry unless converted in future. ">
                                  <div
                                    className="hero-tag"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      fontSize: 11,
                                      maxWidth: 100,
                                    }}
                                  >
                                    {item.deal_service} &nbsp;
                                    <InfoCircleOutlined />
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                            <p style={{ textAlign: "justify" }}>
                              {item.Muliples_of.length > 100
                                ? item.Muliples_of.substring(0, 100) + "..."
                                : item.Muliples_of}
                            </p>
                            <div className="d-flex justify-content-between align-items-end">
                              <div className="d-flex tags">
                                {categories.length > 0 &&
                                  categories.map((cat, index) => {
                                    return (
                                      <div className="hero-tag" key={index}>
                                        {cat}
                                      </div>
                                    );
                                  })}
                              </div>
                              <img
                                src="./web/badge.png"
                                alt="Successfully Funded"
                                style={{ width: "100px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
        <NewWebFooter />
      </div>
    );
  }
}

export default Deals;
