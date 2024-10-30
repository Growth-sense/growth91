import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import axios from "axios";
import Foundermylistnew from "./foundermylistnew.js";

export const FounderInterest = () => {
  //
  const [unideatils, setunideatils] = useState();
  const [intrestdata, setintrestdata] = useState();
  const [unicorn, setUnicorn] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    intrestedlist();
  }, []);

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });
  const intrestedlist = async () => {
    let params = {
      udFounderID: localStorage.getItem("founder_id"),
    };
    Bridge.Unicorn.unicorn_interested_list(params).then((result) => {
      setintrestdata(result.data);
    });
  };
  console.log(unicorn);

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

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 993,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplay: false,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
        },
      },
    ],
  };
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

                    <div class="tab-contents">
              <div class="tab-content my-table-row  my-table-row-es">
                <input type="radio" name="tab-index" id="tab-index4" checked />
                <div className="import-export community-paragraph-box">
                  <a href="" className="mt-0">
                    Import Data
                  </a>
                </div>
                <div class="content table-responsive ">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <span> Name</span>
                        </th>

                        <th>
                          <span>Email</span>
                        </th>
                        <th>
                          <span>Contact no</span>
                        </th>
                        <th>
                          <span>Type of Interest</span>
                        </th>
                        <th>
                          <span>Message</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {intrestdata&&intrestdata.map((item,index)=>{
                            console.log(item);
                            return(
                                <tr>
                                <td>
                                  <span>{item.first_name} {item.last_name}</span>
                                </td>
                                <td>
                                  <span>{item.email}</span>
                                </td>
                                <td>
                                  <span>{item.mobile}</span>
                                </td>
                                <td>
                                  <span>{item.interestInvestinStartup==1 && "   I am excited to invest in your startups"}</span>
                                  <span>{item.interestKnowMore==1 && "I Want to know more about it"}</span>
                                  <span>{item.interestWorkwithYou==1 && "I want to work with you"}</span>
                                </td>
                                <td>
                                  <span>
                                   {item.interestMessage}
                                  </span>
                                </td>
                              </tr>
                            )
                            
                        })}
                  
                   
                    </tbody>
                  </table>
                </div>
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
  );
};
