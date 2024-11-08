import React, { useEffect } from 'react';
import { NewWebFooter } from './common/NewWebFooter';
import Slider from 'react-slick';
import NewWebHeader from "./common/NewWebHeader.jsx";
import "./synergy.css";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const Synergypartner = () => {
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
            <section className="about-page-section blog-section pb-0 mt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div className="heading-title m-sm-0">
                                <p>
                                    <span></span>{" "}
                                </p>
                                <h2>Synergy Partner</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row margin-about synergy-form  ">
                        <div className=" col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="let-grow-together">
                                <h4>Elevate Your Business Success with Growth91</h4>
                                <h1 class="text-left">Let's connect</h1>
                                <form className='input-checks'>
                                    <label>Firm Name:</label>
                                    <input type="text" name="firm" placeholder="Enter your firm name" />
                                    <label>Email:</label>
                                    <input type="email" name="email" placeholder="Enter your email" />
                                    <label>Mobile:</label>
                                    <input type="text" name="mobile" placeholder="Enter your mobile number" />
                                    <label>Location:</label>
                                    <input type="text" name="location" placeholder="Enter your location" />
                                </form>
                                <div class="input_box">
                                    <div class="form-wraper new-form-wrapper mt-0">
                                        <Link to="/" class="theme-btn " type="button">Submit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="about-page-img">
                                <img src="/assets/images/synergy.jpg" alt="about us" />
                            </div>
                        </div>

                    </div>

                </div>
            </section>






            <NewWebFooter />

        </div>
    );
};
