import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import Footer from "./common/Footer";
import Slider from "react-slick";
import { NewWebFooter } from "./common/NewWebFooter";
import NewWebHeader from "./common/NewWebHeader";
import { Helmet } from "react-helmet-async";

class Howitworks extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)

  }
  componentWillMount() {
    document.getElementsByTagName("META")[4].content =
      "Growth91 Investing FAQs: How it Works!";
    document.title = "Growth91 Investing FAQs: How it Works!";

    document.getElementsByTagName("META")[3].content =
      "Have questions about investing on Growth91? This FAQ covers creating a profile, investing in deals, & G-SAFE agreements. Get informed!";
    document.getElementsByTagName("META")[5].content = "Investing FAQs";
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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
          "name": "Resources",
          "item": "https://growth91.com/Resources"
        }
      ]
    }
    return (
      <div>
          <Helmet>
         
          <script type="application/ld+json">
          
          {JSON.stringify(breedcrumb)}
          </script>
        </Helmet>
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
                        <div className="col-lg-6 col-xl-24 col-sm-24">
                          <div className="left-content">
                            <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                            Create your startup investment portfolio and enjoy the journey of growth

                            </h2>
                            {/* <span className="text-white ">
                              1. Create Profile <br />
                              2. Invest <br />
                              3. Deal Documentation{" "}
                            </span> */}
                            {/* <ul className="text-white">
                                                    <li><a href="Howitworks.html" className=""><span><img src="./web/images/hand-index.svg" width="24" alt="img"/> </span><u>How do i invest?</u></a></li>
                                                    <li><a href="Howitworks2.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What are the risks?</a></li>
                                                    <li><a href="Howitworks3.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What is T-SAFE?</a></li>
                                                    <li><a href="Howitworks4.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What are Growth91's fees?</a></li>
                                                    <span className="">
                                                      </span>
                                                </ul>                                                    --> */}

                            <form
                              className="input_box wow fadeInUp mt-4"
                              data-wow-delay="0.7s"
                            >
                              <div className="form-wraper">
                                {localStorage.getItem("founder_id") ? (
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
                            <img src="./web/images/left.png" alt="img" />
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

        <section className="how-we-work-section hiw hiw-li">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>How it Works</h2>
            </div>
           
          </div>
        </section>

        <section className="MoneyPro-history hiw-li" id="hiw" style={{marginTop:"0"}}>
          <div className="container ">
           
            <div className="row d-flex align-content-around flex-wrap flex-column">
              <div></div>
              <div className="col-lg-12">
                <div className="item">
                  <div className="media">
                    <div className="content">
                      <h3 style={{ textAlign: "start" }}>
                        {" "}
                        1. Create a Profile
                      </h3>
                      <p style={{ textAlign: "justify" }}>
                      Create a profile on Growth91 portal by signing up "Investor Signup Link" in less than a minute.

                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="media  justify-content-start">
                    <div className="content ">
                      <h3 style={{ textAlign: "start" }}>
                        02. Accept Risks, Platform T&C
                      </h3>
                      <p style={{ textAlign: "justify" }}>
                      Acknowledge the Investment Risks and review the platform’s terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item ">
                  <div className="media">
                    <div className="content">
                      <h3 style={{ textAlign: "start" }}>03. Select the deal of your choice</h3>
                      <p style={{ textAlign: "justify" }}>
                      Understand the startup, go through the documents presented by startup on the platform for 
better understanding of the deal terms and also the investment opinion.

                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 ">
                <div className="item right_item">
                  <div className="media">
                    <div className="media justify-content-start">
                      <div className="content">
                        <h3 style={{ textAlign: "start" }}>
                          {" "}
                          04. Invest
                        </h3>
                        <p style={{ textAlign: "justify" }}>
                        Commit your interest to invest, and accept the terms and conditions  to move further.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item right_item">
                  <div className="media">
                    <div className="media justify-content-start">
                      <div className="content">
                        <h3>05. Complete KYC</h3>
                        <p style={{ textAlign: "justify" }}>
                          Before investing in the deal, you need to complete the e-KYC process. Sign the Consent 
Agreement, verify the bank details and deal specific Terms and conditions .

                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item right_item">
                  <div className="media">
                    <div className="media justify-content-start">
                      <div className="content">
                        <h3>06. Convenience Fees</h3>
                        <p style={{ textAlign: "justify" }}>
                        Convenience Fee of 2% on the investment amount at the time of investment and 2% on the 
sale proceeds at the time of exit is applicable. For any specific investment, if fee is different, it 
will be mentioned at the time of commitment (GST if any, shall be added at applicable rates).

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12"  id="fee">
                <div
                  className="item right_item right_item07"
                  style={{
                    textAlign: "start",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    width: "80%",
                  }}
                >
                  <div className="media">
                    <div className="media justify-content-start">
                      <div className="content">
                        <h3 style={{ textAlign: "start" }}>
                          07. Post Deal Campaign Outcome

                        </h3>
                        <p style={{ textAlign: "justify" }}>
                        Startups will sign and share the certificates. You can monitor the progress of your investment 
on the Growth91 Investor dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section hiw-li" id="faq-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="content-side">
                  <div className="heading-title">
                    <h6>
                      <span></span>{" "}
                    </h6>
                    <h2>FAQs</h2>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          How does My Investment reach the Startup?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          Once you make an investment, funds will be held in an Escrow account with our Banking 
Partners managed by SEBI registered trustees. Once the startup completes the compliance 
requirements, fund is transferred from Escrow bank account to Startup bank account.

                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How do I cancel My Investment?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          You may cancel or change your investment within 72 hours of investing by writing to us at 
contact@growth91.com. Cancelling your investment is not permitted in the final 48 hours of 
a deal.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          What happens when a deal is oversubscribed?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            You can see when the minimal funding amount has been
                            crossed on the deal page. In this case, the startup
                            may choose to:
                          </p>
                          <ol className="hiw-li">
                            <li className="f1rem">
                              Accept all the funds raised until the closure of
                              the deal
                            </li>
                            <li
                              className="f1rem"
                              style={{ textAlign: "justify" }}
                            >
                              Choose to reduce the amount invested by each
                              investor by a certain ratio, i.e., pro rata the
                              amount in order to allocate securities to each
                              investor to take only a certain quantum of funds
                            </li>
                            <li className="f1rem">
                              Choose to randomly allot funds based on a lucky
                              draw mechanism
                            </li>
                            <li className="f1rem">
                              Choose to close the deal prematurely as soon as
                              the target is reached
                            </li>
                          </ol>
                          <p style={{ textAlign: "justify" }}>
                            The decision lies completely with the company and
                            its stakeholders and the decision will be
                            communicated to you over email.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo1">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo1"
                          aria-expanded="false"
                          aria-controls="collapseTwo1"
                        >
                          Can the startup reject my investment?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo1"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo1"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            Yes, every company reserves the right to reject, in
                            whole or in part, any investment commitment at any
                            time before the proceeds are drawn from the virtual
                            account. Any rejected investments will be returned
                            to the investor in full along with the processing
                            fee.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree2">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree2"
                          aria-expanded="false"
                          aria-controls="collapseThree2"
                        >
                          How do I track My Investments?
                        </button>
                      </h2>
                      <div
                        id="collapseThree2"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            Once you have made an investment, the Growth91’s
                            Analytics feature is enabled for you. You can track
                            the quarterly investment status from the dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="images-side">
                  <img src="./web/images/faq-side.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section hiw-li" id="watr">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="images-side">
                  <img src="./web/images/faq-side2.png" alt="img" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="content-side">
                  <div className="heading-title">
                    <h6>
                      <span></span>{" "}
                    </h6>
                    <h2>
                      Declaration of Risk <br />{" "}
                    </h2>
                    <p style={{ textAlign: "justify" }}>
                    By investing through the Growth91 platform, you acknowledge your capability to assume the 
risks associated with investments made via the Website, including but not limited to the 
following: 
                    </p>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Loss of Capital
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          Investments in startups or early-stage ventures carry an inherent risk, as there is no guarantee 
of profits or returns. Therefore, it is generally advisable to create a diversified investment 
portfolio, which can offer the potential for gains while mitigating overall capital losses. 
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Lack of Liquidity
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          Liquidity refers to the ease with which equity shares can be sold. However, equity investments 
in these companies are typically highly illiquid, as the shares are unlisted or privately held and 
cannot be readily traded on an exchange or similar secondary market. 
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Rarity of Dividends
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          The Companies may be unable to distribute dividends during the entire investment lifecycle. 
Consequently, to realize any return on your investment, you may need to pursue a subsequent 
sale or similar exit process, for which the timing cannot be predetermined. 
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo1">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo1"
                          aria-expanded="false"
                          aria-controls="collapseTwo1"
                        >
                          Dilution
                        </button>
                      </h2>
                      <div
                        id="collapseTwo1"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo1"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          The companies may raise additional capital in the future, which could result in the dilution of 
your shareholding due to the issuance of new shares.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree2">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree2"
                          aria-expanded="false"
                          aria-controls="collapseThree2"
                        >
                          Performance
                        </button>
                      </h2>
                      <div
                        id="collapseThree2"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                          The company's forward-looking statements, which reflect opinions and beliefs, are based on 
various estimates and assumptions that are subject to significant business, economic, 
regulatory, and competitive uncertainties. While these statements may provide insight into 
the companies' objectives and goals, they should not be regarded as commitments from the 
companies. Instead, they should be viewed as speculative and inherently subjective

                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree2">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree3"
                          aria-expanded="false"
                          aria-controls="collapseThree2"
                        >
                          Tax
                        </button>
                      </h2>
                      <div
                        id="collapseThree3"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree3"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                           You may be liable for taxes on any dividends or gains you receive from your investments in the 
Company, and the responsibility for paying such taxes rests solely with you. It is advisable to 
consult your tax advisor for further guidance on these matters.<br/>
For the avoidance of doubt, by acknowledging the above risk factors, you agree to release 
Growth91 from any liability and to waive any claims related to the above considerations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="faq-section hiw-li" id="wits">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="content-side">
                  <div className="heading-title">
                    <h6>
                      <span></span>{" "}
                    </h6>
                    <h2>
                      G-SAFE: A complete guide <br />{" "}
                    </h2>
                    <p>
                      The companies that raise on Growth91 set the terms for
                      their agreement with investors.
                    </p>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          What is G-SAFE?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            Growth91’s simple agreement for future equity.{" "}
                            <br />A G-SAFE is an investment contract between
                            investors and startups looking to raise capital.
                            Individuals make investments for the chance to earn
                            a return—in the form of equity in the company or a
                            cash payout. <br />
                            The G-SAFE, created by us, is an adapted version of
                            the SAFE, a financial instrument widely used by
                            angels & VCs investing in startups across the globe.
                            It is designed specifically to work for investment
                            campaigns accepting hundreds or even thousands of
                            investors, and it's used by several industry
                            stalwarts in various forms.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How does it work?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            Investors using the G-SAFE get a financial stake in
                            the company but are not immediately holders of
                            equity. It takes the legal form of Compulsorily
                            Convertible Debentures (‘CCDs’) at the time of
                            issue. These CCDs are converted into equity on the
                            happening of ‘activation events’ like acquisition or
                            IPO.
                          </p>
                          <p className="text-danger">
                            Risk Note: Activation events are not guaranteed.
                            Investors should see them only as possibilities.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          How much can I earn?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            Your return depends on your investment amount, the
                            company’s exit valuation (How much the company is
                            worth at that time), and the terms of the G-SAFE.
                            Investors invest money at an extremely early stage
                            and hence their stake is affected by future events
                            only.
                          </p>
                          <p className="text-danger">
                            Risk Note: If an activation event does not happen,
                            you may never get a return on your investment.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo1">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo1"
                          aria-expanded="false"
                          aria-controls="collapseTwo1"
                        >
                          Terms of the G-SAFE
                        </button>
                      </h2>
                      <div
                        id="collapseTwo1"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo1"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="    ">
                          <p>Overview</p>
                          <p
                            className="ps-5 text-black"
                            style={{ textAlign: "justify" }}
                          >
                            This agreement issues compulsorily convertible
                            debentures which convert into securities issued in
                            future financing, i.e. equity shares or compulsorily
                            convertible preference shares, on trigger events
                            such as 100% secondary sale of CCDs, buyback or IPO.
                            <br />
                            <br />
                            <b>Instrument</b> - Compulsorily Convertible
                            Debentures (CCDs).
                            <br />
                            <br />
                            <b>Conversion Events</b> - 100% secondary sale,
                            Buyback, Acquisition, IPO.
                            <br />
                            <b>Cap Table -</b>
                            <ul>
                              <li>
                                <b>Before Next Funding Round: </b>
                                No line on the cap table
                              </li>
                              <li>
                                <b>Post Next Funding Round: </b>
                                No line on the cap table
                              </li>
                            </ul>
                            <br />
                            <b>Voting Rights -</b>
                            <ul>
                              <li>
                                <b>Before Next Funding Round: </b>
                                No voting rights
                              </li>
                              <li>
                                <b>Post Next Funding Round: </b>
                                No voting rights
                              </li>
                            </ul>
                            <br />
                            <b>Conversion Table -</b>
                            <ul>
                              <br />
                              <li>With Discount Cap</li>
                              <li>With Valuation Floor and/or Cap</li>
                              <li>With Discount Cap + Valuation Cap</li>
                              <li>Fixed Valuation</li>
                            </ul>
                            <br />
                            <b> Financial Instruments we offer -</b>
                            <ul>
                              <br />
                              <li style={{ textAlign: "justify" }}>
                                <b>CCD - </b>
                                Compulsorily Convertible Debentures are hybrid
                                securities which have the same financial rights
                                as equity shares but no voting rights. CCDs do
                                not come on the cap table.
                              </li>
                              <li style={{ textAlign: "justify" }}>
                                <b>CCPS - </b>
                                Compulsorily Convertible Preference Shares are
                                hybrid securities which have the same financial
                                rights as equity shares but restricted voting
                                rights. CCPS come on the cap table.
                              </li>
                              <li style={{ textAlign: "justify" }}>
                                <b>NCD - </b>
                                Non Convertible Debentures are secured debt
                                securities which provide a fixed rate of
                                interest periodically with the investment
                                repayment at the end of the tenure. NCDs do not
                                come on the cap table.
                              </li>
                              <li style={{ textAlign: "justify" }}>
                                <b>CSOP - </b>
                                Community Stock Option Pool are options which
                                have the same financial rights as equity shares
                                but no voting rights. CSOPs do not come on the
                                cap table and are the fastest to execute.
                              </li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree2">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree2"
                          aria-expanded="false"
                          aria-controls="collapseThree2"
                        >
                          Why G-SAFE?
                        </button>
                      </h2>
                      <div
                        id="collapseThree2"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p style={{ textAlign: "justify" }}>
                            It’s simple, faster and cheaper at the same time.
                          </p>
                          <big>
                            <ol>
                              <li style={{ textAlign: "justify" }}>
                                <b>Efficient: </b>
                                G-SAFE is a one-document security without
                                numerous terms to negotiate, saving money in
                                legal fees and reducing the time spent
                                negotiating the terms of the investment.
                                Startups usually only have to negotiate one
                                item: the valuation cap or the discount cap.
                              </li>
                              <li style={{ textAlign: "justify" }}>
                                <b>Benefits of Equity without any hassles: </b>
                                G-SAFE is designed specifically as a financial
                                instrument without the hassles of attending
                                general meetings or signing unnecessary
                                documents. It comes with detailed information
                                rights and easier exits while increasing in
                                value just like equity shares.
                              </li>
                              <li style={{ textAlign: "justify" }}>
                                <b>Safety First: </b>A G-SAFE holder gets
                                preferential rights over traditional
                                shareholders in terms of repayment. If the
                                startup gets liquidated, a G-SAFE holder is paid
                                before any shareholder.
                              </li>
                              <li>
                                <b>Cheaper: </b>
                                The legal costs are bare minimum.
                              </li>
                            </ol>
                          </big>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="images-side">
                  <img src="./web/images/faq-side.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="pricing-section hiw-li">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>Membership Plan</h2>
            </div>
            <div className="tab-content" id="pills-tabContent1 ls-non">
              <div
                className="tab-pane fade show active overflow-v"
                id="pills-home1"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="pracing-item disabled">
                      <div className="top-left">
                        <p>Free</p>
                      </div>
                      <div className="top-area">
                        <i
                          className="bx bx-donate-heart"
                          style={{ fontSize: "40px", color: "green" }}
                        ></i>

                        <p> Regular Membership</p>
                        {/* <p className='text-success'><del className='text-secondary' style={{fontSize: "20px"} }>100</del> Free</p> */}
                      </div>
                      <ul
                        className="text-left ls-none"
                        style={{ textAline: "left" }}
                      >
                        <li className="ps-md-5 ps-0 ">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          Access to all  Company Essential Documents
                        </li>
                        <li className="ps-md-5 ps-0 ">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          View Company Performance{" "}
                        </li>
                        
                        <li className="ps-md-5 ps-0 ">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Preview of Opportunities before 24 hrs in advance.
                        </li>
                        <li className="ps-md-5 ps-0 ">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Minimum Amount as per CCPS 

                        </li>
                        <li className="ps-md-5 ps-0 ">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Exclusive Discounts
                        </li>
                      </ul>
                      <p
                        className="text-success text-center mb-3"
                        style={{ fontSize: "24px", display: "none" }}
                      >
                        {" "}
                        Free{" "}
                      </p>

                      {/* <a  className="buy-now-disabled">Activated Plan</a> */}
                      <p
                        className="buy-now-disabled mb-5 py-1"
                        style={{ display: "none" }}
                      >
                        Activated Plan
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="pracing-item ">
                      <div className="top-left">
                        <p>100% off</p>
                      </div>
                      <div className="top-area">
                        <i
                          className="bx bxs-dollar-circle"
                          style={{ fontSize: "40px", color: "gold" }}
                        ></i>
                        <p> Premium Membership</p>
                        {/* <p className='text-success'><del className='text-secondary' style={{fontSize: "20px"} }>1000</del> 500 &#x20b9;</p> */}
                      </div>
                      <ul className="ls-none">
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          Access to all  Company Essential Documents
                        </li>
                       
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          View Company Performance{" "}
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Preview of Opportunities before 24 hrs
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            ></i>
                          </span>
                         Minimum Amount as per CCPS 
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-check text-success"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Exclusive Discounts
                        </li>
                      </ul>
                      <p
                        className="text-success text-center mb-3"
                        style={{ fontSize: "24px", display: "none" }}
                      >
                        <del
                          className="text-secondary"
                          style={{ fontSize: "20px", display: "none" }}
                        >
                          &#x20b9; 1,000
                        </del>{" "}
                        &#x20b9; 900{" "}
                      </p>

                      <a
                        href="#"
                        className="buy-now mb-5"
                        style={{ display: "none" }}
                      >
                        Upgrade Plan Now
                      </a>
                    </div>
                  </div>
                  {/* <div className="col-lg-4">
                            <div className="pracing-item">
                                <div className="top-left">
                                    <p>8.50%</p>
                                </div>
                                <div className="top-area">
                                    <img src="images/icon003.svg" alt="img"/>
                                    <p>MoneyPro Premium</p>
                                </div>
                                <ul>
                                    <li><span><i className="fal fa-check"></i></span>Maximum Deposit 12000</li>
                                    <li><span><i className="fal fa-check"></i></span>Minimum Deposit 15000</li>
                                    <li><span><i className="fal fa-check"></i></span>Up to 120 User Available</li>
                                </ul>
                                <a href="#" className="buy-now">Buy Now</a>
                            </div>
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewWebFooter />
      </div>
    );
  }
}

export default Howitworks;
