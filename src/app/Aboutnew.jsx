import React, { useEffect } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";

export const Aboutnew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // title
    document.getElementsByTagName("META")[4].content =
      " About Growth91: Connecting Investors with Top Startups";
    // title

    document.title = " About Growth91: Connecting Investors with Top Startups";
    // keyword
    document.getElementsByTagName("META")[5].content =
      "invest in startups invest in startups india ";
    // description
    document.getElementsByTagName("META")[3].content =
      " Learn about Growth91's culture of trust & growth. We connect investors with vetted startups and invest alongside you. Join us on this journey to success.";
  }, []);

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });
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
      {
        breakpoint: 1200,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 993,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplay: false,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
        },
      },
    ],
  };
  return (
    <div>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>
      <section
        class="about-page-section blog-section pb-0"
        style={{ paddingBottom: "0px !important" }}
      >
        <div class="container">
          <div class="row">
            <div
              class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
              style={{ pointerEvents: "none" }}
            >
              <div class="heading-title m-sm-0">
                <p>
                  <span></span>{" "}
                </p>
                <h2>About Us</h2>
              </div>
            </div>
          </div>
          <div class="row margin-about">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="let-grow-together">
                <h4>Growth91 Culture:</h4>
                <h1>Let’s grow together</h1>

                <p>
                  <p>
                    We specialize in connecting investors with promising
                    startups, fostering the potential Googles and Amazons of
                    tomorrow. Each startup undergoes rigorous vetting and due
                    diligence before being listed on our platform. As a final
                    testament of trust, we invest in every startup we showcase,
                    aligning our confidence with every investor on our platform.
                    Let's embark on this growth journey together
                  </p>
                </p>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="about-page-img">
                <img src="/assets/images/money-bag.png" alt="about us" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="about-page-section common-padding custom-section ">
        <div class="container">
          <div class="row border-10">
            <div class="main-p-relative p-0">
              <div class="all-story">
                <p class="main-bg-story-span"></p>
              </div>

              <div class="story-main">
                <div class="main-bg-story">
                  <div class="heading-title m-sm-0 our-story-title">
                    <p>
                      <span></span>{" "}
                    </p>
                    <h2>Our Story</h2>
                  </div>
                  <Slider {...sliderSettings}>
                 
                  <div class="story-page-img">
                    <img src="/assets/images/storypic2.jpg" alt="our story" />

                    <div class="story-paragraph ">
                      <p>
                        {" "}
                        <span class="dropcap">Growth Sense</span> the parent company of Growth91 has closed its funding round, raising $600,000.
                        Founded by industry veterans Jimish Kapadia, Sanjay Sarda, and Sushant Bhasin, Growth Sense is focused on helping startups at any stage, from idea to advanced growth stage, by providing a complete support system through its ventures, such as Growth Metaverse (a technology service provider), Growth Circle Creatives (advertisement and branding), and Growth Associates (legal and compliance services).

The company follows a unique model of wealth creation, where its expert team works with startups as their extended arm or virtual co-founders.
                     
                      <a
                                href="https://indianstartupnews.com/funding/growth-sense-raises-usd-600000-in-funding-led-by-marquee-angel-investors-micro-vcs-industry-veterans-4788483"
                                target="_blank"
                              >
                                {" "}
                                Readmore
                              </a> </p> <br/>
                    </div>
                  </div>
                  <div class="story-page-img">
                    <img src="/assets/images/storypic.png" alt="our story" />

                    <div class="story-paragraph ">
                      <p>
                        {" "}
                        <span class="dropcap">W</span>e weren't always a
                        platform connecting investors with groundbreaking
                        startups. We began as Growth Sense, a fund management
                        company with a deep belief in the power of startups to
                        change the world. We've seen incredible potential and
                        value firsthand through our own investments. But we
                        wanted to do more. We wanted to share this opportunity
                        with everyone. That's why we created Growth91. Here's
                        the deal (pun intended): We leverage our expertise to
                        rigorously vet promising startups. We only bring you the
                        deals we believe in so much that we invest our own money
                        alongside you. Growth91 isn't just a platform, it's a
                        brand built on trust. We understand the importance of
                        your hard-earned wealth and want to help you make it
                        work even harder. That's why we invest our time and
                        resources in every deal we offer. Join us, and let's
                        unlock the future of innovation, together.
                      </p>
                    </div>
                  </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="about-slider-sections">
        <div class="bg-abt">
          <div class="container main-bg-story">
            <div class="row ">
              <div class="heading-title m-sm-0 our-story-title">
                <p>
                  <span></span>{" "}
                </p>
                <h2>Our Leadership Team</h2>
              </div>
            </div>
            <div class="row">
              <div class="aboutslider-card">
                <Slider {...sliderSettings}>
                  <div class="div">
                    <div class="content-abt-slider slider1">
                      <div class="main-co-found">
                        <div class="img-about-slider">
                          <img src="/assets/images/jimish.jpeg" alt="" />
                        </div>
                        <div class="fo-content">
                          <p>Active Angel Investor & Industry Connector</p>
                        </div>
                      </div>
                      <div class="about-inform">
                        <h3>Jimish Kapadia</h3>
                        <p>
                          Jimish Kapadia is an active angel investor and very
                          well connected in the banking & startup community. In
                          his earlier roles, he was a Senior Director, Asia
                          Pacific at Buckzy Payments Inc, and President &
                          Regional Head, Transaction Banking & Digital Banking
                          across Corporate clients for West & South India at Yes
                          Bank.
                          <br />
                          Jimish is a Master of Commerce from the University of
                          Gujarat and a PGDBA from Symbiosis. He brings with him
                          over 20 years of experience in Banking across Yes Bank
                          & ICICI Bank.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="div">
                    <div class="content-diff">
                      <div class="content-abt-slider slider1">
                        <div class="main-co-found">
                          <div class="img-about-slider">
                            <img src="/assets/images/sanjay.png" alt="" />
                          </div>
                          <div class="fo-content">
                            <p>Active Angel Investor & Industry Connector</p>
                          </div>
                        </div>
                        <div class="about-inform">
                          <h3>Sanjay Sarda</h3>
                          <p>
                            Sanjay Sarda is alumni of IIT Kharagpur and IIM
                            Ahmedabad with over 29 years of working experience
                            in India and USA, which includes multiple
                            entrepreneurial stints and diverse consulting
                            responsibilities. He is a Certified Corporate
                            Director by IICA and IOD and one of the first few
                            individuals in India to qualify to be an Independent
                            Director. He is also serving diverse set of
                            businesses and HNIs in the capacity of virtual CEO,
                            helping them in providing solutions for critical
                            challenges, decision making and business strategy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="div">
                    <div class="content-abt-slider slider1">
                      <div class="main-co-found">
                        <div class="img-about-slider">
                          <img src="/assets/images/pratik.png" alt="" />
                        </div>
                        <div class="fo-content">
                          <p>Active Angel Investor & Industry Connector</p>
                        </div>
                      </div>
                      <div class="about-inform">
                        <h3>Prateek TC</h3>
                        <p>
                          NIT Trichy ex-Senior Software engineer at Walmart
                          Active Angel investor{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-our-leader-team  custom-section d-none">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
              style={{ pointerEvents: "none" }}
            >
              <div class="heading-title m-sm-0">
                <p>
                  <span></span>{" "}
                </p>
                <h2>Our leadership team</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="teams-cards">
                <div class="main-leader-team leader1">
                  <div class="bg-lead1"></div>
                  <div class="img-our-team">
                    <div class="img-one-part">
                      <img src="/assets/images/sanjay-newimages.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="paragraph-leader-team">
                  <h3>Mike Cannon-Brookes</h3>
                  <p>CO-FOUNDER &amp; CO-CEO</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="teams-cards">
                <div class="main-leader-team leader1">
                  <div class="bg-lead1"></div>
                  <div class="img-our-team">
                    <div class="img-one-part">
                      <img src="/assets/images/Jimish-new.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="paragraph-leader-team">
                  <h3>Jimish Kapadia</h3>
                  <p>CO-FOUNDER &amp; CO-CEO</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="teams-cards">
                <div class="main-leader-team leader1">
                  <div class="bg-lead1"></div>
                  <div class="img-our-team">
                    <div class="img-one-part">
                      <img src="/assets/images/pratik-new.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="paragraph-leader-team">
                  <h3>Pratik </h3>
                  <p>CO-FOUNDER &amp; CO-CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="faq-sections mt-5 mb-5">
        <div class="container">
          <div class="row">
            <div class="main-accordain-all">
              <div class="faq-side-content">
                <h3>Frequently Asked Questions</h3>
              </div>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      What sets Growth91 apart from other startup investment
                      platforms?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      At Growth91, we don't just connect you with startups – we
                      invest alongside you. This "skin in the game" approach
                      ensures our interests are aligned with yours, and we're
                      committed to finding the next big things. Additionally,
                      our rigorous vetting process means you can invest with
                      confidence, knowing each startup has been carefully
                      evaluated by our team of experts.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      How much experience does your team have in evaluating
                      startups?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      Our team at Growth91 boasts extensive experience in
                      venture capital, finance, and the startup ecosystem. We
                      leverage this expertise to meticulously vet every startup
                      before showcasing it on our platform. This involves
                      analyzing financials, market potential, and the overall
                      team behind the idea. You can rest assured that we're
                      bringing you only the most promising investment
                      opportunities.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      What kind of support can I expect from Growth91 after I
                      invest?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      We understand that investing in startups can involve
                      questions and require ongoing information. Growth91
                      provides ongoing resources and support to our investors.
                      This includes access to exclusive content, industry
                      updates, and potential opportunities to connect directly
                      with the founders of the startups you invest in. We're
                      here to guide you on your startup investment journey every
                      step of the way.{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="counter-sections">
        <div class="container">
          <div class="row">
            <div class="meetbottom-rows">
              <div class="main-heading-counter">
                <h3>Meet Our Team</h3>
                <p>
                  Meet the Growth91 team! We're passionate about connecting you
                  with high-growth startups. Want to chat about investment goals
                  or how we meticulously vet deals? We're here to help!{" "}
                </p>
              </div>
              <div class="input_box">
                <div class="form-wraper new-form-wrapper">
                  <Link to="/contact-us" class="theme-btn" type="button">
                    Contact Us
                  </Link>
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
