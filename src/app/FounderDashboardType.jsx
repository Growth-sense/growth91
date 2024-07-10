import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const FounderDashboardType = () => {
    useEffect(() => {
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
        <div>
            <div classname="newabout">
                <NewWebHeader newabout={"newabout"} />
            </div>
            <section class="about-page-section blog-section pb-0" style={{ paddingBottom: "0px !important" }}>

                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div class="heading-title m-sm-0">
                                <p>
                                    <span></span>{" "}
                                </p>
                                <h2>Account Details</h2>
                            </div>
                        </div>

                    </div>
                    <div class="tabs-dashboard">
                        <div class="tabs-nav">
                            <label class="tab-nav active"><Link to="FounderDashboardType">My Account</Link></label>
                            <label class="tab-nav"><Link to="FounderMyListing">My Startups</Link></label>
                            <label class="tab-nav"><Link to="FounderMyPlan">My Plan</Link></label>
                            <label class="tab-nav"><Link to="FounderInterest">Enquiry/Lead</Link></label>
                          
                        </div>
                        <div class="tab-contents">

                            <div class="tab-content">
                                <input type="radio" name="tab-index" id="tab-index1" checked />
                                <div class="content">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">First Name *</label>
                                                <input type="text" value="khushboo " className='form-control' enable />
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Middle Name (Optional)</label>
                                                <input type="text" value="Satyendra" className='form-control' />                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Last Name *</label>
                                                <input type="text" value=" bharati" className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Mobile No *</label>
                                                <input type="text" value="8806234772" className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Email *</label>
                                                <input type="text" value="khushbharati124@gmail.com" className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Referral Code</label>
                                                <input type="text" value="13572" className='form-control' />
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6 col-12 col-xl-6 col-xxl-6 col-sm-6 col-lg-6 mb-4">
                                            <div className="input-dashboard-acc">
                                                <input type="text" value="khushboo bharati" className='form-control' />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>




            <NewWebFooter />

        </div>
    )
}
