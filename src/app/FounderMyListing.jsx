import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import axios from "axios";
import Foundermylistnew from "./foundermylistnew.js";
import { Spin } from "antd";

export const FounderMyListing = () => {
  useEffect(() => {
    //
    unicorndetails();
    window.scrollTo(0, 0);
  }, []);
  const [unideatils, setunideatils] = useState();
  const [unicorn, setUnicorn] = useState();
  const [loading, setloading] = useState(false);

  const unicorndetails = async () => {
    setloading(true)
    let params = {
      founderID: localStorage.getItem("founder_id"),
    };
    let headers = {
      "content-type": "application/json",
    };
    await axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://growth91.growthmetaverse.in/api/founder/Startup/unicornListByFounders`,
        params,
        { headers }
      )
      .then((res) => {
        setunideatils(res.data.data[0]);
        setTimeout(() => {
          let par = {
            page: 0,
            pagesize: 10,
          };
          Bridge.Unicorn.unicorndealsByInvestors(par).then((result) => {
            console.log(result);
            console.log(
              result.data.filter(
                (item) => item.tudTempUdID == res.data.data[0].tudTempUdID
              )
            );
            console.log(res.data.data[0].tudTempUdID);
            setUnicorn(
              result.data.filter(
                (item) => item.tudTempUdID == res.data.data[0].tudTempUdID
              )

            );
          });
          setloading(false)
        }, 3000);
      });
  };

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
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
    <Spin spinning={loading}>

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
                        <div className="row">
                          {unideatils && unideatils.tudPrimaryContactName && (
                            <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                              <div className="input-dashboard-acc">
                                <label htmlFor="">Founder Name </label>
                                <label htmlFor="">
                                  {unideatils.tudPrimaryContactName}
                                </label>
                              </div>
                            </div>
                          )}
                          {unideatils && unideatils.tudStartupName && (
                            <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                              <div className="input-dashboard-acc">
                                <label htmlFor="">Startup Name </label>
                                <label htmlFor="">
                                  {unideatils.tudStartupName}
                                </label>{" "}
                              </div>
                            </div>
                          )}

                          {unideatils && unideatils.tudEmail && (
                            <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                              <div className="input-dashboard-acc">
                                <label htmlFor="">Email </label>
                                <label htmlFor="">{unideatils.tudEmail}</label>
                              </div>
                            </div>
                          )}

                          {unideatils && unideatils.tudPrimaryContactMobile && (
                            <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                              <div className="input-dashboard-acc">
                                <label htmlFor="">Mobile no </label>
                                <label htmlFor="">
                                  {unideatils.tudPrimaryContactMobile}
                                </label>
                              </div>
                            </div>
                          )}
                          <div className="col-12 col-lg-12 col-xl-12 col-md-12 col-xxl-12 mb-4">
                            <div className="btns-performs mt-3">
                              <td className="flex-action">
                                {unicorn && unicorn.length !== 0 && (
                                  <div className="performs-btns">
                                    <Link
                                      to={`/FutureUnicornDescription?id=${unicorn[0].unicornDealID}`}
                                    >
                                      <i class="fa-regular fa-eye"></i>View
                                      Startup
                                    </Link>
                                  </div>
                                )}

                                <div className="performs-btns">
                                  <Link to="FutureUnicornForm">
                                    {" "}
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    Edit Startup
                                  </Link>
                                </div>
                              </td>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            </div>

        </section>
        </div>
        </div>
</Spin>



        <NewWebFooter />

    </div>
  );
};
