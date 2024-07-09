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
                                        <p>Free</p>
                                    </div>
                                    <div className="part-team-plan">
                                        <p>₹0</p>
                                        <p>Yearly package</p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Total 6 Edits
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Multi-Language Support     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Support via E-mail and Phone     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Digital project planning     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Planning Solution
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
                                        <p>Paid</p>
                                    </div>
                                    <div className="part-team-plan">
                                    <p>₹8000</p>
                                        <p>Monthly package</p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>
                                            Total 6 Edits
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Multi-Language Support     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Support via E-mail and Phone     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Digital project planning     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Planning Solution
                                        </li>
                                    </ul>
                                    <div class="button-media-coverage1"><Link to="FounderEdit">BUY NOW</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-xxl-4">
                            <div className="main-membership-cards">
                                <div className="card-choose-plan">
                                    <div className="plan-team-one">
                                        <p>Paid</p>
                                    </div>
                                    <div className="part-team-plan">
                                    <p>₹8000</p>
                                        <p>Monthly package</p>
                                    </div>
                                </div>
                                <div className="ul-choose-plan">
                                    <ul>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>
                                            Total 6 Edits
                                        </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Multi-Language Support     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Support via E-mail and Phone     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Digital project planning     </li>
                                        <li>
                                            <span><img src="./assets/images/check-mark.png" alt="" /></span>

                                            Planning Solution
                                        </li>
                                    </ul>
                                    <div class="button-media-coverage1"><Link to="FounderEdit">BUY NOW</Link></div>
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
