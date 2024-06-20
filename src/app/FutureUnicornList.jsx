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

            <div class="heading-title founder-text"><p><span></span> </p><h3>List Of Startups</h3></div>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-5 col-lg-5 col-xl-5 col-xxl-5 col-12 col-sm-12">
              <div className="search-input-unicorn1">
                <input type="search" name="" id="" className='form-control' placeholder='Search...' />
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
              </div>
            </div>

          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/33/1717998890.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/32/1718023148.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/32/1715948775.png" alt="" />
                      <h6>Tulua</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Tulua Foods Pvt Ltd, established in 2023, specializes in providing high-quality, clean-label spice a...</p>
                  <Link to="/FutureUnicornDescription">View More </Link>

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
