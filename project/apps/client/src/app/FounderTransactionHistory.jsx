import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const FounderTransactionHistory = () => {
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
                            <label class="tab-nav"><Link to="FounderDashboardType">My Account</Link></label>
                            <label class="tab-nav "><Link to="FounderMyListing">My Listing</Link></label>
                            <label class="tab-nav active"><Link to="FounderMyPlan">My Plan</Link></label>
                            <label class="tab-nav"><Link to="FounderInterest">Interest</Link></label>
                            <label class="tab-nav "><Link to="FounderDraftList">Saved Draft</Link></label>
                        </div>
                        <div class="tab-contents">


                            <div class="tab-content my-table-row-history ">
                                <input type="radio" name="tab-index" id="tab-index2" checked />
                                <div className="import-export community-paragraph-box">
                                    <a href="" className='mt-0'>Import Data</a>

                                </div>
                                <div class="content table-responsive ">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th><span>Plan Name</span></th>
                                                <th><span>Transcation Id</span></th>
                                                <th className='status'><span>Status</span></th>
                                                <th><span>Total Amount</span></th>
                                                <th><span>Date</span></th>
                                                <th><span>Time</span></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span>Premium</span></td>
                                                <td><span>ARKYM02365</span></td>
                                                <td><span className='complete'>Completed</span></td>
                                                <td><span>1000</span></td>
                                                <td><span>27-06-2024</span></td>
                                                <td><span>05:22</span></td>



                                            </tr>
                                            <tr>
                                                <td><span>Regular</span></td>
                                                <td><span>ARKYM02365</span></td>
                                                <td><span className='complete'>Completed</span></td>
                                                <td><span>1000</span></td>
                                                <td><span>27-06-2024</span></td>
                                                <td><span>05:22</span></td>


                                            </tr>
                                            <tr>
                                            <td><span>Premium</span></td>
                                            <td><span>ARKYM02365</span></td>
                                                <td><span className='complete'>Completed</span></td>
                                                <td><span>1000</span></td>
                                                <td><span>27-06-2024</span></td>
                                                <td><span>05:22</span></td>


                                            </tr>
                                            <tr>
                                            <td><span>Premium</span></td>
                                            <td><span>ARKYM02365</span></td>
                                                <td><span className='complete'>Completed</span></td>
                                                <td><span>1000</span></td>
                                                <td><span>27-06-2024</span></td>
                                                <td><span>05:22</span></td>




                                        </tr>
                                    </tbody>
                                </table>
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
