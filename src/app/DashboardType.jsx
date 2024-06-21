import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const DashboardType = () => {
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
                            <label class="tab-nav" for="tab-index1">My Account</label>
                            <label class="tab-nav" for="tab-index2">My Listing</label>
                            <label class="tab-nav" for="tab-index3">My Plan</label>
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
                            <div class="tab-content my-table-row">
                                <input type="radio" name="tab-index" id="tab-index2" />
                                <div class="content table-responsive ">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th><span>Startup Image</span></th>
                                                <th><span>Startup Name</span></th>
                                                <th><span>Email</span></th>
                                                <th><span>Category</span></th>
                                                <th><span>Action</span></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span> <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" className='img-cat' /></span>
                                                </td>
                                                <td><span>Tulua</span></td>
                                                <td><span>khushbharati124@gmail.com</span></td>
                                                <td><span>Foods & Beverages</span></td>
                                                <td className='flex-action'>
                                                    <span><Link to="WaitApproval"><i class="fa-regular fa-eye"></i></Link></span>

                                                    <span><Link to="FutureUnicornForm">  <i class="fa-solid fa-pen-to-square"></i></Link></span>

                                                </td>


                                            </tr>
                                            <tr>
                                                <td>
                                                    <span> <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" className='img-cat' /></span>
                                                </td>
                                                <td><span>Tulua</span></td>
                                                <td><span>khushbharati124@gmail.com</span></td>
                                                <td><span>Foods & Beverages</span></td>
                                                <td className='flex-action'>
                                                    <span><Link to="WaitApproval"><i class="fa-regular fa-eye"></i></Link></span>

                                                    <span><Link to="FutureUnicornForm">  <i class="fa-solid fa-pen-to-square"></i></Link></span>
                                                </td>


                                            </tr>
                                            <tr>
                                                <td>
                                                    <span> <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" className='img-cat' /></span>
                                                </td>
                                                <td><span>Tulua</span></td>
                                                <td><span>khushbharati124@gmail.com</span></td>
                                                <td><span>Foods & Beverages</span></td>
                                                <td className='flex-action'>
                                                    <span><Link to="WaitApproval"><i class="fa-regular fa-eye"></i></Link></span>

                                                    <span><Link to="FutureUnicornForm">  <i class="fa-solid fa-pen-to-square"></i></Link></span>
                                                </td>


                                            </tr>
                                            <tr>
                                                <td>
                                                    <span> <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" className='img-cat' /></span>
                                                </td>
                                                <td><span>Tulua</span></td>
                                                <td><span>khushbharati124@gmail.com</span></td>
                                                <td><span>Foods & Beverages</span></td>
                                                <td className='flex-action'>
                                                    <span><Link to="WaitApproval"><i class="fa-regular fa-eye"></i></Link></span>

                                                    <span><Link to="FutureUnicornForm">  <i class="fa-solid fa-pen-to-square"></i></Link></span>
                                                </td>


                                            </tr>
                                        </tbody>
                                    </table>                                </div>
                            </div>
                            <div class="tab-content">
                                <input type="radio" name="tab-index" id="tab-index3" />
                                <div class="content">
                                    <div className="row">
                                        <div className="plans-main-dashboard">
                                            <h3>
                                                Active Plan
                                            </h3>
                                            <div className="flex-plans-dashboard">
                                                <ul>
                                                    <li><span>
                                                        Start Date
                                                    </span>
                                                        <span>
                                                            August 15, 2022
                                                        </span>
                                                    </li>
                                                    <li><span>
                                                        Price
                                                    </span>
                                                        <span>
                                                            ₹190.00/Months
                                                        </span>
                                                    </li>
                                                    <li><span>
                                                        Payments
                                                    </span>
                                                        <span>
                                                            Online
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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
