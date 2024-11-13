import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';
import Foundermylistnew from './foundermylistnew.js';
import Header from './common/Header.js';
import Sidebar from './Founder/common/Sidebar.js';

export const FounderMyPlan = () => {
    useEffect(() => {
        // 
        window.scrollTo(0, 0)
    }, [])

    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('body').addClass('newClass');
        } else {
            $('body').removeClass('newClass');
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


        responsive: [{
            breakpoint: 1200,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 993,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 600,
            settings: {
                autoplay: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 400,
            settings: {
                arrows: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
            }
        }]
    }
    return (
        <>
        <div
        style={{
          background: "rgba(0, 0, 0, 0.036)",
          paddingBottom: "0",
          margin: "1px",
          height: "100%",
        }}
      >
        <Header />
        <section></section>
  
        <div className="row">
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
            style={{ width:'fit-content' }}> */}
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {/* <section></section> */}
            <Sidebar />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            {/* <section></section> */}
            <Sidebar />
          </div>
  
          <div className="  col col-lg-16 pb-4 ">
            {/* How do i invest? */}
            <section
              id="hdii"
              className="m-lg-0  m-3"
              style={{ marginTop: 25, minHeight: "75vh" }}
            >
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div class="heading-title m-sm-0">
                                <p>
                                    <span></span>{" "}
                                </p>
                                <h2>My Plan</h2>
                            </div>
                        </div>

                    </div>
                    <div class="tabs-dashboard">
                    <div class="tab-contents">


<div class="tab-content">
    <input type="radio" name="tab-index" id="tab-index3" checked />
    <div class="content">
        <div className="row w-100">
            <div className="plans-main-dashboard">
                <div className="d-flex-active">
                    <h3>
                        Active Plan
                    </h3>
                   
                </div>
                <div className="expiring-dates">
                    <p>Your plan validity is upto <span>24-01-2025</span></p>
                </div>
                <div className="flex-plans-dashboard">
                    <ul>
                        <li><span>
                            Plan Name
                        </span>
                            <span>
                                Premium Plan
                            </span>
                        </li>
                        <li><span>
                            Start Date
                        </span>
                            <span>
                                June 15, 2024
                            </span>
                        </li>
                        <li><span>
                            End Date
                        </span>
                            <span>
                                June 15, 2025
                            </span>
                        </li>
                       
                        <li><span>
                            Remaining Edits
                        </span>
                            <span className='text-green'>
                                03
                            </span>
                        </li>
                    
                    </ul>
                </div>
                <div className="view-history community-paragraph-box">
                        <Link to="FounderTransactionHistory" className='mt-0'>Transaction History</Link>

                    </div>
            </div>
        </div>
    </div>
</div>

</div>
                    </div>

                </div>

            </section>
            </div>
            </div>





        </div>
            <NewWebFooter />
            </>
    )
}
