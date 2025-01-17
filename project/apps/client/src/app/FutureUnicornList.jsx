import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { set } from "react-ga";
import { Button, Modal } from "antd";

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
          obj.udPrimaryContactName == filters.founder
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
          
    <div className="list-container list-mobile-only">
      {/* Filter Icon */}
      <div className="row justify-content-end d-flex filter-box">
        <div className="col-lg-12">
          
          <div className="search-input-unicorn1-filter" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2>Filters</h2>
            <span onClick={() => setShowModal(true)} style={{ cursor: "pointer" }} className="filter-span">
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
    <Button key="back" onClick={() => setShowModal(false)}>
      Close
    </Button>,
    <Button key="submit" type="primary" onClick={handleApplyFilters}>
      Apply Filters
    </Button>,
  ]}
>
  <div className="inside-filter">
    <div className="mb-3">
      <label htmlFor="startupName">View by Future Unicorn Name:</label>
      <select
        id="startupName"
        value={filters.startupName}
        onChange={(e) => setFilters({ ...filters, startupName: e.target.value })}
        className="form-control"
      >
        <option value="">--Select--</option>
        {filterdata &&
          filterdata.map((item, index) => (
            item.udStartupName && (
              <option key={index} value={item.udStartupName}>
                {item.udStartupName}
              </option>
            )
          ))}
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="category">View by Sector:</label>
      <select
        id="category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="form-control"
      >
        <option value="">--Select--</option>
        {filterdata &&
          filterdata.map((item, index) => (
            item.udCategory && (
              <option key={index} value={item.udCategory}>
                {item.udCategory}
              </option>
            )
          ))}
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="founder">View by Founder Name:</label>
      <select
        id="founder"
        value={filters.founder}
        onChange={(e) => setFilters({ ...filters, founder: e.target.value })}
        className="form-control"
      >
        <option value="">--Select--</option>
        {filterdata &&
          filterdata.map((item, index) => (
            item.udPrimaryContactName && (
              <option key={index} value={item.udPrimaryContactName}>
                {item.udPrimaryContactName}
              </option>
            )
          ))}
      </select>
    </div>
  </div>
</Modal>

      {/* Filtered Cards */}
      <div className="row justify-content-center card-box">
        {filteredData &&
          filteredData.map((item, index) => (
            <div key={index} className="grid-cards col-md-4">
              <div className="community-all-contents">
                <div className="img-community-box">
                  <img
                    src={
                      (item.udBannerImage &&
                        `${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${JSON.parse(item.udBannerImage)}`) ||
                      "https://growth91.com/api/uploads/deal/banner/34/1719999515.jpg"
                    }
                    alt="Banner"
                  />
                </div>
                <div className="community-paragraph-box">
                  <ul>
                    <li>
                      <img
                        src={
                          (item.udLogoImage &&
                            `${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${JSON.parse(item.udLogoImage)}`) ||
                          "https://growth91.com/api/uploads/deal/logo/34/1719999515.jpg"
                        }
                        alt="Logo"
                      />
                      <h5>{item.udStartupName}</h5>
                    </li>
                  </ul>
                  <p>{item.udDealDescription}</p>
                  <Link
                    to={`/FutureUnicornDescription?id=${item.unicornDealID}`}
                    className="btn-com"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
