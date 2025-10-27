import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { set } from "react-ga";
import { Button, Modal, Input } from "antd";
import { LastUpdatedBadge } from "./components/LastUpdatedBadge";

export const FutureUnicornList = () => {
  const location = useLocation();
  
  useEffect(() => {
    getuniondata();
    window.scrollTo(0, 0);
    
    // Check for sponsor filter in URL
    const urlParams = new URLSearchParams(location.search);
    const sponsorFilter = urlParams.get('sponsorFilter');
    if (sponsorFilter) {
      setFilters(prev => ({ ...prev, sponsorName: sponsorFilter }));
    }
  }, [location.search]);
  
  const [unicorn, setUnicorn] = useState();
  const [filterdata, setfilterdata] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });

  const [showModal, setShowModal] = useState(false); // State to toggle the modal
  // const [filters, setFilters] = useState({
  //   startupName: '',
  //   category: '',
  //   founder: '',
  // });

  const handleApplyFilters = () => {
    setShowModal(false); // Close modal after applying filters
    // Logic to apply filters can be added here
  };




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
      udPublished: "Published",
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
    sponsorName: ""
  });
  function filterData(data, filters, searchQuery) {
    
    if (!data) return [];

    if (data) {
      
      let filteredResults = data.filter((obj) => {
        
        const matchesCategory = filters.category ? obj.udCategory === filters.category : true;
        const matchesStartupName = filters.startupName ? obj.udStartupName === filters.startupName : true;
        const matchesFounder = filters.founder ? obj.udStartupFounderName === filters.founder : true;
        const matchesSponsor = filters.sponsorName ? obj.udSponsorName === filters.sponsorName : true;
        
        return matchesCategory && matchesStartupName && matchesFounder && matchesSponsor;

      });

      if (!filters.category && !filters.startupName && !filters.founder && !filters.sponsorName) {
        filteredResults = [...data];
      }

      if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter((obj) =>
          ["udStartupName", "udStartupFounderName", "udCategory", "udDealDescription", "udSponsorName"].some(
            (key) => obj[key]?.toLowerCase().includes(lowerSearch)
          )
        );
      }
      
      return filteredResults;
     
    }
  }
  const filteredData = filterData(unicorn, filters, searchQuery);
  
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

          {/* Search Bar */}
          <div className="search-bar-container">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input py-2"
            />
          </div>

          <div className="list-container list-mobile-only">
            {/* Filter Icon */}
            <div className="row justify-content-end d-flex filter-box">
              <div className="col-lg-12">
                <div
                  className="search-input-unicorn1-filter"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2 className="mx-4">Filters</h2>
                  <span
                    onClick={() => setShowModal(true)}
                    style={{ cursor: "pointer" }}
                    className="filter-span"
                  >
                    <i className="fa-solid fa-filter"></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Modal */}
            {/* Filter Modal */}
            <Modal
              visible={showModal} // Use `visible` instead of `show`
              onCancel={() => setShowModal(false)} // Use `onCancel` to close the modal
              centered
              footer={[
                <Button key="back" onClick={() => {
                  setFilters({
                    startupName: "",
                    category: "",
                    founder: "",
                    sponsorName: ""
                  });
                  setShowModal(false)
                }}>
                  Reset
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleApplyFilters}
                >
                  Close
                </Button>,
              ]}
            >
              <div className="inside-filter">
                <div className="mb-3">
                  <label htmlFor="startupName">
                    View by Future Unicorn Name:
                  </label>
                  <select
                    id="startupName"
                    value={filters.startupName}
                    onChange={(e) =>
                      setFilters({ ...filters, startupName: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {filterdata && 
                      [...new Set(filterdata
                        .filter(item => item.udStartupName)
                        .map(item => item.udStartupName))]
                        .sort()
                        .map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="category">View by Sector:</label>
                  <select
                    id="category"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {filterdata && 
                      [...new Set(filterdata
                        .filter(item => item.udCategory)
                        .map(item => item.udCategory))]
                        .sort()
                        .map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="founder">View by Founder Name:</label>
                  <select
                    id="founder"
                    value={filters.founder}
                    onChange={(e) =>
                      setFilters({ ...filters, founder: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {filterdata && 
                      [...new Set(filterdata
                        .filter(item => item.udStartupFounderName)
                        .map(item => item.udStartupFounderName))]
                        .sort()
                        .map((founderName, index) => (
                          <option key={index} value={founderName}>
                            {founderName}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="sponsorName">
                    View by Sponsor Name:
                  </label>
                  <select
                    id="sponsorName"
                    value={filters.sponsorName}
                    onChange={(e) =>
                      setFilters({ ...filters, sponsorName: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {filterdata && 
                      [...new Set(filterdata
                        .filter(item => item.udSponsorName)
                        .map(item => item.udSponsorName))]
                        .sort()
                        .map((sponsorName, index) => (
                          <option key={index} value={sponsorName}>
                            {sponsorName}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </div>
            </Modal>

            {/* Filtered Cards */}
            <div className="row justify-content-center card-box gy-4">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div key={index} className="grid-cards col-lg-4 col-md-6 col-sm-12"
                        onClick={() => {window.location.assign(`/FutureUnicornDescription?id=${item.unicornDealID}`)}}>
                    <div
                      className="community-all-contents"
                      style={{
                        minHeight: "300px",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.backgroundColor = "lightgray";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
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
                          alt="Banner"
                        />
                      </div>
                      <div className="community-paragraph-box">
                        <ul>
                          <li style={{ width: "100%" }}>
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
                              alt="Logo"
                            />
                            <h5>{item.udStartupName}</h5>
                          </li>
                        </ul>
                        {item.udTag && item.udTag !== "None" && (
                          <div style={{ marginTop: "8px" }}>
                            {item.udTag.split(",").map((tag, tagIndex) => (
                              <span key={tagIndex} style={{
                                display: "inline-block",
                                backgroundColor: "#e6f7ff",
                                color: "#0066cc",
                                padding: "3px 10px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "500",
                                marginRight: "5px",
                                marginBottom: "3px"
                              }}>
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <p style={{
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          display: "-webkit-box",
                        }}>{item.udDealDescription}</p>
                      </div>
                      <div
                        className="community-paragraph-box card-bottom-container"
                      >
                        <Link
                          to={`/FutureUnicornDescription?id=${item.unicornDealID}`}
                          className="btn-com"
                        >
                          View More
                        </Link>
                        
                        {/* Last Updated Badge */}
                        <LastUpdatedBadge udPublishedDate={item.udPublishedDate} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-4">
                  <h4>No Data Found</h4>
                </div>
              )}
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
