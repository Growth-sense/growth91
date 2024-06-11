import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const FutureUnicornList = () => {
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
          

            <section className="community-sections">
          <div className="container">
            <div className="row">
             
              <div class="heading-title founder-text"><p><span></span> </p><h3>View our community</h3></div>
            </div>
            <div className="row justify-content-center">

              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/SanjaySarda/profile-pic/sanjay.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Sanjay Sarda </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/AjitShreeramMarathe/profile-pic/100019.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Dr. Ajit Marathe </h4>
                    <p>Mars Gurukul</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/SantoshVasantraoPatil/profile-pic/100008.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Santosh Patil </h4>
                    <p>UK's Resort Pvt Ltd</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/RohiniAjayPathakKale/profile-pic/100009.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Rohini Pathak </h4>
                    <p> Financial Advisor</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/UdayPatankar/profile-pic/uday.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Uday Patankar </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/KetanBane/profile-pic/ketan.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Sanjay Sarda </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/NishantNazare/profile-pic/nishant.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Sanjay Sarda </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://theidy.com/img/AshwiniBhavsarShah/profile-pic/100031.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Sanjay Sarda </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-sm-12 col-xxl-3">

                <div className="community-all-contents">
                  <div className="img-community-box">
                    <img src="https://www.theidy.com/img/VyankateshAnantDalvi/profile-pic/100015.jpg" alt="" />
                  </div>
                  <div className="community-paragraph-box">
                    <h4>Sanjay Sarda </h4>
                    <p>Business Consultant</p>
                    <a href="">View my IDy </a>
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
