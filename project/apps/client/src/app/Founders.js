import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import { InvestorTestomonial } from "./InvestorTestomonial";
import { FounderTestomonial } from "./FounderTestomonial.jsx";
import { Foundercurosel } from "./Foundercurosel.jsx";
import { Founderextra } from "./Founderextra.jsx";
import NewWebHeader from "./common/NewWebHeader.jsx";
import { NewWebFooter } from "./common/NewWebFooter.jsx";
import { Helmet } from "react-helmet-async";

class Founders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testtime: false,
    };
  }
  componentWillMount() {
    document.getElementsByTagName("META")[4].content =
    ("Growth91: Discover the Best Startup Funding Platform for Your Venture");
    document.title =
    ("Growth91: Discover the Best Startup Funding Platform for Your Venture");

    document.getElementsByTagName("META")[3].content =
      "Growth91 is your premier fundraising website in India. Explore our startup funding platform to connect with investors, raise capital & boost your growth";
    document.getElementsByTagName("META")[5].content =
      "fundraising websites in india, startup funding platform";

    this.setState({
      testtime: true,
    });
    this.testtimer();
  }

  testtimer = () => {
    this.setState({
      testtime: true,
    });
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("investor_id")) {
      console.log("asd");
    } else if (localStorage.getItem("founder_id")) {
      console.log("ds");
    } else {
      console.log("ds");
    }
    this.testtimer();

    // Call API initially
    // this.getDelete_analytics_session_data();

    // Call API every 3 seconds
    // this.delete_analytics_session_interval = setInterval(() => this.getDelete_analytics_session_data(), 3000);

    // Post data every 2 seconds
    // this.start_analytics_session_interval = setInterval(() => this.postStart_analytics_session_data(), 2000);
  }
  render() {
    const { testtime } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    console.log(testtime);
    const productJsonLd = {
      "@context": "http://schema.org",
      "@type": "Product",
      "name": "Growth91: Leading Platform for Investing in Indian Startups",
      "aggregateRating": {
        "@type": "AggregateRating",
        "bestRating": "5",
        "ratingCount": "6",
        "ratingValue": "4.8"
      }
    };

    const breedcrumb=
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://growth91.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Founders",
          "item": "https://growth91.com/Founders"
        }
      ]
    }

    return (
      <div>
        {/* <WebHeader /> */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(productJsonLd)}
          </script>
          <script type="application/ld+json">
          
          {JSON.stringify(breedcrumb)}
          </script>
        </Helmet>
        <NewWebHeader newabout={"newabout"} />

        <section className="banner_section removemargin">
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
                      <div className="row align-items-center founders-rows">
                            <div className="col-lg-7">
                              <div className="left-content">
                                <h1
                                  className="wow fadeInUp founders-heads "
                                  data-wow-delay="0.3s"
                                >
                                  Access Opportunities with Premier Startup
                                  Funding Platform in India
                                </h1>
                                <p
                                  style={{ textAlign: "justify" }}
                                  className="wow fadeInUp"
                                  data-wow-delay="0.5s"
                                >
                                  You’ve already revolutionized your team’s
                                  contribution to your mission with ESOPs. Now,
                                  take it a step further by leveraging your
                                  community and well-wishers to fuel your
                                  growth. With Growth91, you can raise capital
                                  efficiently and effectively, transforming your
                                  supporters into investors.
                                  <span className="">
                                    <br />
                                    {/* Are you a founder?{" "} */}
                                    <a
                                      href="/Signup"
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
                                          href="/Investor-founder-registration"
                                          className="theme-btn "
                                          type="button"
                                        >
                                          Get Started as Founder
                                        </a>
                                      </div>
                                    ) : (
                                      <a
                                        href="/Signup"
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
                            <div className="col-lg-5">
                              <div>
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
              </div>
        </section>
        <section className="how-we-work-section">
          <div className="container">
            <div className="heading-title">
              <p>
                <span></span>{" "}
              </p>
              <h2>How Our Startup Funding Platform Works</h2>
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
                      Maximize Your Capital Raise with Our Startup Funding
                      Platform
                    </h2>
                    <p style={{ textAlign: "justify" }}>
                      Growth91's powerful private deal management option enables
                      Founders, Angel Networks, Syndicates, and VCs to carry out
                      their fundraising process online, accessible only to their
                      audience. As one of the top fundraising websites in India,
                      Growth91 offers a secure and efficient platform tailored
                      to your specific needs.
                    </p>
                  </div>
                  <a href="/resources" className="theme_btn">
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
        <Foundercurosel />

        <NewWebFooter />
      </div>
    );
  }
}

export default Founders;
