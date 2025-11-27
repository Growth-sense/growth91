import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { set } from "react-ga";

export const FutureUnicornList = () => {
  useEffect(() => {
    getuniondata();
    window.scrollTo(0, 0);
  }, []);
  const [unicorn, setUnicorn] = useState();
  const [filterdata, setfilterdata] = useState();
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

  function getuniondata() {
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.unicorndealsByInvestors(params).then((result) => {
      console.log(result);
      setUnicorn(result.data);
      setfilterdata(result.data);
    });
  }
  console.log(unicorn);

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
  const [filters, setFilters] = useState({
    startupName: "",
    category: "",
    founder: "",
  });
  function filterData(data, filters) {
    console.log(data);
    if (data) {
      console.log(data);

      const la = data.filter((obj) => {
        console.log(obj);
        console.log(filters);
        return (
          obj.udCategory == filters.category ||
          obj.udStartupName == filters.startupName ||
          obj.udStartupFounderName == filters.founder
        );
      });
      console.log(la);
      if (la != "") {
        return la;
      } else {
        return data;
      }
    }
  }
  const filteredData = filterData(unicorn, filters);
  console.log(unicorn);
  console.log(filteredData);

  return (
    <div>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      <section className="community-sections">
        <div className="container unicorn-list-container">
          <div className="row">
            <div class="heading-title founder-text">
              <p>
                <span></span>{" "}
              </p>
              <h3>List of Future Unicorns</h3>
            </div>
          </div>
          <div className="list-container">
            <div className="row justify-content-end d-flex filter-box">
              <div className="col-lg-12">
                <div className="col align-items-center">
                  <div className="col-lg-11">
                    <div className="search-input-unicorn1 search-input-unicorn1-filter" style={{display :"flex" , alignItems : "center", justifyContent : "space-between",marginBottom  :"20px"}}>
                      {/* <input type="search" name="" id="" className='form-control' placeholder='' /> */}
                      <h2>Filters</h2>
                      <span>
                        <i class="fa-solid fa-filter"></i>
                      </span>
                    </div>
                    <div className="col align-items-center inside-filter">
                      <div className="col-md-16 col-lg-16 col-xl-16 col-xxl-16 col-12 col-sm-12">
                        <div className="search-input-unicorn1">
                          {/* <input type="search" name="" id="" className='form-control' placeholder='' /> */}
                          <label htmlFor="">
                            View by Future Unicorn name :
                          </label>
                          <select
                            name=""
                            id=""
                            value={filters.startupName}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                startupName: e.target.value,
                              })
                            }
                          >
                            <option value="">--Select--</option>
                            {filterdata &&
                              filterdata.map((item, index) => {
                                return (
                                  item.udStartupName !== "" && (
                                    <option value={item.udStartupName}>
                                      {item.udStartupName}
                                    </option>
                                  )
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-16 col-lg-16 col-xl-16 col-xxl-16 col-12 col-sm-12">
                        <div className="search-input-unicorn1">
                          {/* <input type="search" name="" id="" className=form&&form-control' placeholder='' /> */}
                          <label htmlFor="">View by sector :</label>
                          <select
                            name=""
                            id=""
                            value={filters.category}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="">--Select--</option>
                            {filterdata &&
                              filterdata.map((item, index) => {
                                return (
                                  item.udCategory !== "" && (
                                    <option value={item.udCategory}>
                                      {item.udCategory}
                                    </option>
                                  )
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-16 col-lg-16 col-xl-16 col-xxl-16 col-12 col-sm-12">
                        <div className="search-input-unicorn1">
                          {/* <input type="search" name="" id="" className='form-control' placeholder='' /> */}
                          <label htmlFor="">View by founder name :</label>
                          <select
                            name=""
                            value={filters.founder}
                            id=""
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                founder: e.target.value,
                              })
                            }
                          >
                            <option value="">--Select--</option>
                            {filterdata &&
                              filterdata.map((item, index) => {
                                return (
                                  item.udStartupFounderName !== "" && (
                                    <option value={item.udStartupFounderName}>
                                      {item.udStartupFounderName}
                                    </option>
                                  )
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center card-box">
              {filteredData &&
                filteredData.map((item, index) => {
                  console.log(item);
                  console.log("item");

                  return (
                    // <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">
                    <div className="grid-cards">
                      <div className="community-all-contents">
                        <div className="img-community-box">
                          <img
                            src={
                              (item.udBannerImage &&
                                `${
                                  process.env.REACT_APP_BASE_URL
                                }api/uploads/unicorndeals/${
                                  item.tudTempUdID
                                }/${JSON.parse(item.udBannerImage)}`) ||
                              "https://growth91.com/api/uploads/deal/banner/34/1719999515.jpg"
                            }
                          />
                        </div>
                        <div className="community-paragraph-box">
                          <ul>
                            <li>
                              <img
                                src={
                                  (item.udLogoImage &&
                                    `${
                                      process.env.REACT_APP_BASE_URL
                                    }api/uploads/unicorndeals/${
                                      item.tudTempUdID
                                    }/${JSON.parse(item.udLogoImage)}`) ||
                                  "https://growth91.com/api/uploads/deal/logo/34/1719999515.jpg"
                                }
                              />
                              <h5>{item.udStartupName}</h5>
                            </li>
                            {/* <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li> */}
                          </ul>
                          <p>{item.udDealDescription}</p>
                          <Link
                            to={`/FutureUnicornDescription/${item.udUrlName}`}
                            className="btn-com"
                          >
                            View More{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/33/1717998890.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/33/1717998890.jpg" alt="" />
                      <h6>Nymbleup</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>NymbleUp Solutions Private Limited is a trailblazer in the retail technology sector, specializing in...</p>
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

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
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/31/1715591146.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/31/1715591146.jpg" alt="" />
                      <h6>Stroom</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Stroom, a pioneering venture by Drips Foods Private Limited, is revolutionizing the snacking landsca...</p>
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/27/1709526172.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/27/1709526172.png" alt="" />
                      <h6>the EleFant</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>The EleFant is a subscription-based platform providing an economical, clutter-free, and eco-friendly...</p>
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/26/1703841159.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/26/1703841159.jpg" alt="" />
                      <h6>NewBoo</h6>
                    </li>
                    <li>
                      <a href="">CCPS <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>NewBoo is a brand operated by SCJR Consumers Pvt Ltd, a company focused on sustainable sanitary care...</p>
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xxl-4">

              <div className="community-all-contents">
                <div className="img-community-box">
                  <img src="https://growth91.com/api/uploads/deal/banner/19/1692426655.jpg" alt="" />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img src="https://growth91.com/api/uploads/deal/logo/19/1692426655.png" alt="" />
                      <h6>Bulkpe</h6>
                    </li>
                    <li>
                      <a href="">CCD/CCPS  <span><i class="fa-solid fa-circle-info"></i></span></a>
                    </li>
                  </ul>
                  <p>Bulkpe is building neobanking and payment byproducts for MSMEs in India, enabling businesses to mana...</p>
                  <Link to="/FutureUnicornDescription" className="btn-com">View More </Link>

                </div>
              </div>
            </div> */}
            </div>
          </div>

          <div className="row pagination-row">
            <div class="pagination">
              {/* <a href="#">&laquo;</a>
              <a href="#" className='active'>1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a> */}
              <a href="#">&raquo;</a>
            </div>
          </div>
        </div>
      </section>

      <NewWebFooter />
    </div>
  );
};
