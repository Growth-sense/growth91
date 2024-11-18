import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const MemberShip = () => {
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
                                <h2>Choose Your Best Plan</h2>
                            </div>
                        </div>

                    </div>
                    <div className="row plan-margin-btm">
                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-xxl-4">
                            <div className="main-membership-cards">
                                <div className="card-choose-plan">
                                    <div className="plan-team-one">
                                        <p>Free trail
                                        </p>
                                    </div>
                                    <div className="part-team-plan">
                                        <p>₹0</p>
                                        <p> 30 days </p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>
                                            <span>
                                                Listing in the startup directory with basic company information

                                            </span>
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/close-bold.png" alt="" /></span>

                                            <span>
                                                Receive notifications when investors show interest
                                            </span>
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/close-bold.png" alt="" /></span>

                                            <span>  No. of edits allowed after listing the startup: 0</span>
                                        </li>

                                    </ul>
                                    <div class="button-media-coverage1"><Link to="FounderEdit">BUY NOW</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-xxl-4">
                            <div className="main-membership-cards main-membership-cards-border">
                                <div className="card-choose-plan">
                                    <div className="plan-team-one">
                                        <p>Basic Plan</p>
                                    </div>
                                    <div className="part-team-plan">
                                        <p>₹ 2,000  (50% off)</p>
                                        <p>1 Year</p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>
                                            <span>
                                                Listing in the startup directory with basic company information

                                            </span>
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>

                                            <span>  Receive notifications when investors show interest   </span>
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>

                                            <span>
                                                No. of edits allowed after listing the startup: 2
                                            </span>  </li>

                                    </ul>
                                    <div class="button-media-coverage1"><Link to="FounderEdit">BUY NOW</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-xxl-4">
                            <div className="main-membership-cards">
                                <div className="card-choose-plan">
                                    <div className="plan-team-one">
                                        <p>Premium</p>
                                    </div>
                                    <div className="part-team-plan">
                                        <p>₹ 5,000 (50% off)</p>
                                        <p>1 Year
                                        </p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>
                                            <span>
                                                Listing in the startup directory with basic company information

                                            </span>
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>

                                            <span>
                                                Receive notifications when investors show interest
                                            </span>
                                        </li>

                                        <li>
                                            <span><img src="./assets/images/true.png" alt="" /></span>
                                            <span>

                                                No. of edits allowed after listing the startup: 99
                                            </span>
                                        </li>

                                    </ul>
                                    <div class="button-media-coverage1"><Link to="FounderEdit">BUY NOW</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="notes-membership">
                        <h4>
                            Notes
                        </h4>
                        <div className="notes-para mt-3">
                        <p>
                                Upgrade (basic to premium) option can be done at the
                                time of renewal
                            </p>    
                            <p>
                                For additional update credits: Rs. 250

                            </p>
                            <p>
                                The update credits have to be purchased in lots. Each lot will cost
                                Rs.250. Per lot 1 edit will be allowed.
                            </p>
                         
                         
                        </div>
                        
                        </div>

                    </div>

                </div>

            </section>







            <NewWebFooter />

        </div>
    )
}
