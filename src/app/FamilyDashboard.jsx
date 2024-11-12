import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const FamilyDashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    $(window).scroll(function() {
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
    const sliderSettings={
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
            <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                <div class="container-fluid">
                    <div class="d-flex align-items-center">
                        <button class="navbar-toggler px-1 py-0 mt-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="height: 36px;"><span class="navbar-toggler-icon"></span></button><a class="navbar-brand" href="/deals"><img src="/logo192.png" width="120" class="d-inline-block align-top" alt="Growth91" style="position: relative; top: -8px;" /></a>
                        <div class="d-lg-block d-none">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="/deals">Deals</a></li>
                                <li class="nav-item"><a class="nav-link" href="/Founders">Founders</a></li>
                                <li class="nav-item"><a class="nav-link" href="/resources">Resources</a></li>
                                <li class="nav-item"><a class="nav-link" href="/Learn">About us</a></li>
                                <li class="nav-item"><a class="nav-link" rel="noreferrer" href="https://growth91.com/blog/">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="ms-sm-5  mt-2 me-0 my-auto" style="width: fit-content; display: flex;">
                        <div class="d-flex header-right-col" style="align-items: center;">
                            <a class="ant-dropdown-trigger">
                                <div class="user-wrappr">HM</div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
