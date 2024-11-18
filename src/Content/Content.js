import "./Landingassets/css/landingstyle.css"
import banner from './Landingassets/img/home-1/banner.png'
import logo from './Landingassets/img/logo.png'
import about from './Landingassets/img/about.png'
import deal1 from './Landingassets/img/deal1.jpg'
import deal2 from './Landingassets/img/deal2.jpg'
import deal3 from './Landingassets/img/deal3.jpg'
import deal4 from './Landingassets/img/deal4.jpg'
import deal5 from './Landingassets/img/deal5.jpg'
import deal6 from './Landingassets/img/deal6.jpg'
import deal7 from './Landingassets/img/deal7.jpeg'
import deal8 from './Landingassets/img/deal8.png'
import news from './Landingassets/img/news.jpeg'
import badge from './Landingassets/img/badge.png'
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import { Select, Tabs, message, Spin, Tooltip } from "antd";
import { InfoCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import Bridge from "../app/constants/Bridge";
import Apis from "../app/constants/Apis";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../app/constants/data";
ReactGA.initialize(TRACKING_ID);
const { Option } = Select;
const { TabPane } = Tabs;

class Content extends Component {
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
        const openDeals = this.state.deals?.filter((item) => item.deal_status === "Open")
        const closedDeals = this.state.deals?.filter((item) => item.deal_status === "Closed")
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
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <>
                <div className="btn-style-2 btn-square sidebar-style-9 landingpage" data-spy="scroll" data-target="#section-header" data-offset="90">
                    <div id="section-header">
                        <header className="sigma_header sigma_header-absolute style-4 can-sticky">
                            <div className="container">
                                <div className="sigma_header-middle">
                                    <div className="navbar">
                                        <div className="sigma_logo-wrapper">
                                            <a className="sigma_logo" href="/StartInvestment">
                                                <img src={logo} alt="logo" />
                                            </a>
                                        </div>
                                        <ul className="navbar-nav">
                                            <li className="menu-item">
                                                <a href="#section-about" className="nav-link">About</a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#section-services" className="nav-link">Deals</a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#section-portfolio" className="nav-link">Our News</a>
                                            </li>
                                        </ul>
                                        <div className="sigma_header-controls style-1">
                                            <a href="https://growth91.com/Signup" className="sigma_btn rounded">Sign up</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="search-form-wrapper">
                            <div className="search-trigger sigma_close">
                                <span></span>
                                <span></span>
                            </div>
                            <form className="search-form" method="post">
                                <input type="text" placeholder="Search..." value="" />
                                <button type="submit" className="search-btn">
                                    <i className="fal fa-search m-0"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div id="section-hero">
                        <div className="sigma_banner">
                            <div className="sigma_banner-slider">
                                <div className="banner-slider-inner bg-center bg-cover" style={{ backgroundImage: `url(${banner})` }}>
                                    <div className="sigma_banner-text text-center">
                                        <div className="container">
                                            <div className="row justify-content-start">
                                                <div className="col-xl-7 col-12">
                                                    <Fade cascade damping={0.1} duration={2000}>
                                                        <h1 className="title text-white text-xl-left">

                                                            Invest In Growing Startups.

                                                        </h1>

                                                        <p className="text-white text-xl-left banner-txt">Access highly-vetted growth opportunities. Start your
                                                            Investment journey with an amount as small as 5000 INR. <a href="https://growth91.com/founder-registration">Raise capital using Growth91</a>
                                                        </p>

                                                        <img src={about} alt="about" className="d-sm-none d-block" />
                                                        <div className="banner-links d-flex align-items-center justify-content-xl-start justify-content-center">
                                                            <a href="https://growth91.com/Signup" className="sigma_btn light">Get Started as Investor</a>
                                                        </div>
                                                    </Fade>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section-about">
                        <div className="section bg-secondary-1">
                            <div className="container">
                                <div className="row">
                                    {/* <div className="col-lg-5">
                                <div className="sigma_about style-12 w-100 h-100">
                                    <Fade duration={1000} direction="left">
                                        <img src={about} alt="about" />
                                    </Fade>
                                </div>
                            </div> */}
                                    <div className="col-lg-12">
                                        <div className="sigma_about style-12">
                                            <div className="sigma_about-content text-center">
                                                <Fade duration={2000} direction="right">
                                                    <h3 className="title text-white">About us</h3>
                                                    <p>Growth91's robust private deal management option allows Founders, Angel Investors, and Venture
                                                        Capitalists to conduct their fundraising process online, available exclusively to their target
                                                        audience. Don't get bogged down in continuous signing and filing. It's easy, smooth, and
                                                        uncomplicated.</p>
                                                </Fade>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section-services">
                        <div className="section">
                            <div className="container">
                                <div className="section-title centered has-element">
                                    <Fade duration={2000}>
                                        <h3 className="title">Our Deals</h3>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span className="lines"></span>
                                            <i className="icon flaticon-solidarity"></i>
                                            <span className="lines"></span>
                                        </div>
                                    </Fade>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Fade duration={2000}>
                                            <h3 className="title">Live Deals</h3>
                                        </Fade>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    {
                                        openDeals.length == 0 ? (
                                            <p className="text-center">Exciting Deals Coming Soon. Stay Tuned.</p>
                                        ) : openDeals.length < 3 ?
                                            (
                                                openDeals.length > 0 && (
                                                    openDeals.map((item, index) => {
                                                        const handleGA = () => {
                                                            ReactGA.event({
                                                                category: "Deal",
                                                                action: `Deal Clicked: ${item.deal_name}`,
                                                                label: item.deal_name,
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
                                                                    <div className="sigma_service has-bg-primary home-deals">
                                                                        <div className="sigma_service-thumb">
                                                                            <img
                                                                                src={bannerurl}
                                                                                alt="deal-img"
                                                                            />
                                                                        </div>
                                                                        <div className="sigma_service-body">
                                                                            <h5>
                                                                                <a href="#">{item.deal_name}</a>
                                                                            </h5>
                                                                            <p style={{ textAlign: "justify" }}>
                                                                                {item.Muliples_of.length > 100
                                                                                    ? item.Muliples_of.substring(
                                                                                        0,
                                                                                        100
                                                                                    ) + "..."
                                                                                    : item.Muliples_of}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                )
                                            ) : (
                                                <Slider {...settings}>
                                                    {openDeals.length > 0 && (
                                                        openDeals.map((item, index) => {
                                                            const handleGA = () => {
                                                                ReactGA.event({
                                                                    category: "Deal",
                                                                    action: `Deal Clicked: ${item.deal_name}`,
                                                                    label: item.deal_name,
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
                                                                        key={index}
                                                                    >
                                                                        <div className="sigma_service has-bg-primary home-deals">
                                                                            <div className="sigma_service-thumb">
                                                                                <img
                                                                                    src={bannerurl}
                                                                                    alt="deal-img"
                                                                                />
                                                                            </div>
                                                                            <div className="sigma_service-body">
                                                                                <h5>
                                                                                    <a href="#">{item.deal_name}</a>
                                                                                </h5>
                                                                                <p style={{ textAlign: "justify" }}>
                                                                                    {item.Muliples_of.length > 100
                                                                                        ? item.Muliples_of.substring(
                                                                                            0,
                                                                                            100
                                                                                        ) + "..."
                                                                                        : item.Muliples_of}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        })
                                                    )}
                                                </Slider>
                                            )
                                    }
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <h3 className="title">Completed Deals</h3>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    {
                                        closedDeals.length == 0 ? (
                                            <p className="text-center">Exciting Deals Coming Soon. Stay Tuned.</p>
                                        ) : closedDeals.length < 3 ?
                                            (
                                                closedDeals.length > 0 && (
                                                    closedDeals.map((item, index) => {
                                                        const handleGA = () => {
                                                            ReactGA.event({
                                                                category: "Deal",
                                                                action: `Deal Clicked: ${item.deal_name}`,
                                                                label: item.deal_name,
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
                                                            item.deal_status != "Open"
                                                        ) {
                                                            return (
                                                                <div
                                                                    onClick={handleGA}
                                                                    className="col-lg-4"
                                                                    key={index}
                                                                >
                                                                    <div className="sigma_service has-bg-primary home-deals">
                                                                        <div className="sigma_service-thumb">
                                                                            <img
                                                                                src={bannerurl}
                                                                                alt="deal-img"
                                                                            />
                                                                        </div>
                                                                        <div className="sigma_service-body">
                                                                            <h5>
                                                                                <a href="#">{item.deal_name}</a>
                                                                            </h5>
                                                                            <p style={{ textAlign: "justify" }}>
                                                                                {item.Muliples_of.length > 100
                                                                                    ? item.Muliples_of.substring(
                                                                                        0,
                                                                                        100
                                                                                    ) + "..."
                                                                                    : item.Muliples_of}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                )
                                            ) : (
                                                <Slider {...settings}>
                                                    {closedDeals.length > 0 && (
                                                        closedDeals.map((item, index) => {
                                                            const handleGA = () => {
                                                                ReactGA.event({
                                                                    category: "Deal",
                                                                    action: `Deal Clicked: ${item.deal_name}`,
                                                                    label: item.deal_name,
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
                                                                item.deal_status != "Open"
                                                            ) {
                                                                return (
                                                                    <div
                                                                        onClick={handleGA}
                                                                        key={index}
                                                                    >
                                                                        <div className="sigma_service has-bg-primary home-deals">
                                                                            <div className="sigma_service-thumb">
                                                                                <img
                                                                                    src={bannerurl}
                                                                                    alt="deal-img"
                                                                                />
                                                                            </div>
                                                                            <div className="sigma_service-body">
                                                                                <h5>
                                                                                    <a href="#">{item.deal_name}</a>
                                                                                </h5>
                                                                                <p style={{ textAlign: "justify" }}>
                                                                                    {item.Muliples_of.length > 100
                                                                                        ? item.Muliples_of.substring(
                                                                                            0,
                                                                                            100
                                                                                        ) + "..."
                                                                                        : item.Muliples_of}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        })
                                                    )}
                                                </Slider>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section-portfolio">
                        <div className="section pt-0">
                            <div className="container p-0">
                                <div className="section-title centered has-element">
                                    <Fade duration={2000}>
                                        <h3 className="title">Our News</h3>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span className="lines"></span>
                                            <i className="icon flaticon-solidarity"></i>
                                            <span className="lines"></span>
                                        </div>
                                    </Fade>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <Fade duration={2000}>
                                            <img src={news} alt="news" />
                                        </Fade>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="news-div">
                                            <img src={badge} alt="badge" />
                                            <Fade duration={2000}>
                                                <p>Growth91 successfully completes its first round of funding from notable angel investors & industry
                                                    personalities</p>
                                            </Fade>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section-counter">
                        <div className="section section-padding bg-secondary-1">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <Fade duration={2000}>
                                            <h3 className="title text-white invest-txt">Invest In Growing Startups. <a href="https://growth91.com/Signup"
                                                className="rounded">Invest Now</a></h3>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="section-footer">
                        <footer className="sigma_footer style-3 p-0">
                            <div className="container">
                                <div className="sigma_footer-bottom mt-0">
                                    <Fade duration={2000}>
                                        <div className="sigma_footer-copyright m-0 d-flex justify-content-between align-items-center">
                                            <ul className="sigma_social-icons justify-content-sm-start has-border">
                                                <li>
                                                    <a href="https://www.linkedin.com/company/growth91/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                                                </li>
                                                <li><a href="https://www.facebook.com/MyGrowth91?mibextid=ZbWKwL" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                                <li>
                                                    <a href="https://www.instagram.com/growth.91/" target="_blank"><i className="fab fa-instagram"></i></a>
                                                </li>
                                            </ul>
                                            <p className="mb-0">Design and Developed By <a href="https://growthmetaverse.in/">Growth Metaverse</a></p>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div >
            </>
        );
    }
}


export default Content