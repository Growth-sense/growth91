import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const LoginFounder = () => {
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
            <section class="login-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 m-auto">
                            <div class="ant-spin-nested-loading">
                                <div class="ant-spin-container">
                                    <div class="ant-spin-nested-loading">
                                        <div class="ant-spin-container">
                                            <div class="login-form">
                                                <h3 class="text-center">Login as a Founder</h3>
                                                <div class="text-center mb-3" >Don’t have an account? &nbsp;&nbsp;<a href="/Signup">
                                                    Signup</a>
                                                </div>
                                                <div class="login-with-google login-investor-form">
                                                    <div>
                                                        <div class="S9gUrf-YoZ4jf" >
                                                            <div>
                                                                <div tabindex="0" role="button" aria-labelledby="button-label" class="nsm7Bb-HzV7m-LgbsSe  hJDwNd-SxQuSe i5vt6e-Ia7Qfc uaxL4e-RbRzK">
                                                                    <div class="nsm7Bb-HzV7m-LgbsSe-MJoBVe"></div>
                                                                    <div class="nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb oXtfBe-l4eHX d-flex-google">
                                                                        <div class="nsm7Bb-HzV7m-LgbsSe-Bz112c">
                                                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="LgbsSe-Bz112c google-img">
                                                                                <g>
                                                                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                                                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                                                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <span class="nsm7Bb-HzV7m-LgbsSe-BPrWId">Sign in with Google</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <iframe src="https://accounts.google.com/gsi/button?type=standard&amp;shape=rectangular&amp;text=signin_with&amp;logo_alignment=center&amp;theme=outline&amp;size=large&amp;width=300&amp;client_id=1050220367040-pld0tpa1m5bnkni0i19audapqvfavoph.apps.googleusercontent.com&amp;iframe_id=gsi_967247_262668&amp;as=RUhR4xijbMUTHZ7MvbwgUg" allow="identity-credentials-get" id="gsi_967247_262668" title="Sign in with Google Button" ></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="or-div">
                                                    <hr />
                                                    <p class="text-center">OR LOG IN WITH EMAIL</p>
                                                </div>
                                                <div className="input-login-invester">
                                                    <input type="email" name="email" class="form-input-field" placeholder="Email" autocomplete="off" value="" />

                                                    <Link to="InformationList" className=" login-button" >Log in</Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
            <NewWebFooter />

        </div >
    )
}
