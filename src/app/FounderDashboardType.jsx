import React, { useEffect, useState } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';
import Bridge from './constants/Bridge.js';
import Foundermylistnew from './foundermylistnew.js';

export const FounderDashboardType = () => {
    useEffect(() => {
        // 
        window.scrollTo(0, 0)
        getfounderdetails()
    }, [])
    const [data, setdata] = useState()
const getfounderdetails=()=>{
    let params = {
        investor_id: localStorage.getItem("founder_id"),
      };
      Bridge.check_for_membership_type(params).then((result) => {
        setdata(result.data[0])


      })
}
    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('body').addClass('newClass');
        } else {
            $('body').removeClass('newClass');
        }
    });
    console.log(data);
    
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
        <section></section>
        <div className="row">
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
              style={{ width:'fit-content' }}> */}
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {/* <section></section> */}
            <Foundermylistnew />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            {/* <section></section> */}
            <Foundermylistnew />
          </div>
  
          <div className="  col col-lg-8 pb-4 ">
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
                                <h2>Account Details</h2>
                            </div>
                        </div>

                    </div>
                    <div class="tabs-dashboard">
                       
                        <div class="tab-contents">

                            <div class="tab-content">
                                <input type="radio" name="tab-index" id="tab-index1" checked />
                                <div class="content">
                                    {data&&
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">First Name *</label>
                                                <input type="text" value={data.first_name} className='form-control' enable />
                                            </div>
                                        </div>
                                        {data.middle_name&&
                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Middle Name (Optional)</label>
                                                <input type="text" value={data.middle_name} className='form-control' />                                            </div>
                                    </div>}

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Last Name *</label>
                                                <input type="text" value={data.last_name}  className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Mobile No *</label>
                                                <input type="text" value={data.mobile} className='form-control' />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Email *</label>
                                                <input type="text" value={localStorage.getItem("founder_email")} className='form-control' />
                                            </div>
                                        </div>
                                        {data.referral_code&&
                                        <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                                            <div className="input-dashboard-acc">
                                                <label htmlFor="">Referral Code</label>
                                                <input type="text" value={data.referral_code} className='form-control' />
                                            </div>
                                        </div>}

                                        {/* <div className="col-md-6 col-12 col-xl-6 col-xxl-6 col-sm-6 col-lg-6 mb-4">
                                            <div className="input-dashboard-acc">
                                                <input type="text" value="khushboo bharati" className='form-control' />
                                            </div>
                                        </div> */}
                                    </div>}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
            </div>
            </div>




            <NewWebFooter />

        </div>
    )
}
