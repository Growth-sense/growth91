import React, { useEffect } from 'react';
import { NewWebFooter } from './common/NewWebFooter';
import Slider from 'react-slick';
import NewWebHeader from "./common/NewWebHeader.jsx";
import "./synergy.css";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const Synergy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        // title
        document.getElementsByTagName("META")[4].content = "Synergy Partner: Elevate Your Business with Growth91";
        document.title = "Synergy Partner: Elevate Your Business with Growth91";
        // keyword
        document.getElementsByTagName("META")[5].content = "business partner growth91, synergy business partnerships, invest in startups";
        // description
        document.getElementsByTagName("META")[3].content = "Partner with Growth91 and elevate your business by connecting with curated high-potential startups, gain mutual growth, and build a successful partnership ecosystem.";
    }, []);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 30) {
          $('body').addClass('newClass');
        } else {
          $('body').removeClass('newClass');
        }
    });

    function SimpleNextArrow(props) {
        const { onClick } = props;
        return (
          <div className="nextArrow" onClick={onClick}>
            <span className="next-arrows slick-arrow">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </div>
        );
    }
  
    function SimplePrevArrow(props) {
        const { onClick } = props;
        return (
          <div className="prevArrow" onClick={onClick}>
            <span className="prev-arrows slick-arrow">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </span>
          </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        prevArrow: <SimplePrevArrow />,
        nextArrow: <SimpleNextArrow />,
        responsive: [
            { breakpoint: 1200, settings: { autoplay: true, slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 993, settings: { autoplay: true, slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { autoplay: false, speed: 100, slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 400, settings: { arrows: false, speed: 100, slidesToShow: 1, slidesToScroll: 1, autoplay: false } }
        ]
    };

    return (
        <div className="synergy-only">
            <div className="newabout">
                <NewWebHeader newabout={"newabout"} />
            </div>

            {/* Synergy Partner Section */}
          
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
                            Synergy Partner

                            </h2>
                            <span className="text-white ">
                            Elevate Your Business Success with Growth91

                            </span>
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
                               
                                  <a
                                    href="/synergy-form"
                                    className="theme-btn "
                                    type="button"
                                  >
                                    Let's Connect
                                  </a>
                            
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


        {/* Why Partner with Growth91 */}
<section className="about-page-section common-padding custom-section synergy-why">
  <div className="container">
  <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div className="heading-title m-sm-0">
                            <p>
                  <span></span>{" "}
                </p>
                                <h2>Why Partner with Growth91?</h2>
                            </div>

                        </div>
                    </div>

    <div className="row synergy-why__content">
  
    <div className="card synergy-why__card">
         
          <p className="card-text">
          Collaborating with Growth91 allows you to play a pivotal role in shaping the future of the startup ecosystem in India while gaining substantial benefits.
          </p>
        </div>
     
      <div className="col-12 synergy-why__cards" style={{padding : "0px"}}>

        <div className="card synergy-why__card">
          <h3 className="card-title">Exclusive Investment Access</h3>
          <p className="card-text">
            Gain priority access to a curated selection of high-potential startups that align with your industry focus and investment goals.
          </p>
        </div>
        <div className="card synergy-why__card">
          <h3 className="card-title">Cultivate Mutual Growth</h3>
          <p className="card-text">
            Become part of a robust ecosystem where startups, investors, and partners work together to drive innovation and achieve collective advancement.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



            {/* Partner Types Section */}
         <section className="about-partner-types partner-cards venture-only">
    <div className="">
        <div className="container main-bg-story">
           
            <div className="row partner-type">
            <div className="col-md-6">
                    <div className="image-placeholder">
                        {/* Replace with actual image */}
                        <img src="assets/images/venture.jpg" alt="Venture Capital Firms" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Venture Capital Firms</h3>
                    <h4>Why partner?</h4>
                    <p>Our partnership with Venture Capital firms aims to enhance the startup investment landscape by offering curated opportunities that align with your strategic investment goals. We provide a pipeline of vetted startups, allowing you to co-invest in promising ventures at various stages of growth.</p>
                    <h4>Benefits</h4>
                    <p>By partnering with Growth91, you can diversify your portfolio with high-potential startups across different sectors. In return, startups benefit from your expertise, network, and financial backing, accelerating their growth and market entry. Together, we can amplify the success rate of innovative ventures, driving greater value for both investors and founders.</p>
                </div>
              
            </div>

            <div className="row partner-type">
                <div className="col-md-6">
                    <h3>Wealth Advisors</h3>
                    <h4>Why partner?</h4>
                    <p>Wealth Advisors play a critical role in helping high-net-worth individuals (HNIs) and family offices make informed investment decisions. Our partnership aims to offer your clients access to exclusive startup investment opportunities, allowing them to diversify their portfolios with well-researched, high-growth startups.</p>
                    <h4>Benefits</h4>
                    <p>Partnering with Growth91 enables Wealth Advisors to provide their clients with unique opportunities in the high-risk, high-reward startup space. This not only enhances your value proposition but also helps your clients achieve diversification in emerging markets, positioning them for significant long-term returns.</p>
                </div>
                <div className="col-md-6">
                    <div className="image-placeholder">
                        {/* Replace with actual image */}
                        <img src="assets/images/wealth.webp" alt="Wealth Advisors" />
                    </div>
                </div>
            </div>

            <div className="row partner-type">
            <div className="col-md-6">
                    <div className="image-placeholder">
                        {/* Replace with actual image */}
                        <img src="assets/images/ca.jpg" alt="Chartered Accountants" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Chartered Accountants</h3>
                    <h4>Why partner?</h4>
                    <p>Partnering with Growth91 offers Chartered Accountants a unique opportunity to enhance their service offerings and client base. By collaborating with us, you can connect your clients with valuable investment opportunities while accessing startups that may need your expert services.</p>
                    <h4>Benefits</h4>
                    <p>Connect with high-growth startups through Growth91, providing them with essential financial and compliance services. Enhance your advisory offerings by integrating startup investment opportunities and specialized services for emerging businesses. Build a mutually beneficial relationship that supports investor engagement and startup success, strengthening your professional network and impact.</p>
                </div>
                
            </div>

            <div className="row partner-type">
                <div className="col-md-6">
                    <h3>Investment Banks</h3>
                    <h4>Why partner?</h4>
                    <p>Investment Banks are pivotal in structuring and facilitating larger capital raises and mergers. Our partnership seeks to leverage your expertise in financial advisory, IPOs, and strategic exits to ensure that high-growth startups get the necessary capital infusion at critical stages of their journey.</p>
                    <h4>Benefits</h4>
                    <p>By collaborating with Growth91, you gain access to a network of startups primed for exponential growth. Your role in larger funding rounds or exit strategies (e.g., M&A or IPOs) will contribute to fostering a more dynamic and liquid startup ecosystem. Together, we can streamline the path from startup to scalable enterprise, benefiting all stakeholders involved.</p>
                </div>
                <div className="col-md-6">
                    <div className="image-placeholder">
                        {/* Replace with actual image */}
                        <img src="assets/images/bank.jpg" alt="Investment Banks" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<NewWebFooter />

        </div>
    );
};
