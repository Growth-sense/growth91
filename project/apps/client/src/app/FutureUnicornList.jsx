import React, { useEffect, useState, useMemo } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { set } from "react-ga";
import { Button, Modal, Input } from "antd";
import { LastUpdatedBadge } from "./components/LastUpdatedBadge";
import { parseBannerImage } from "./helper/utilHelper.js";

export const FutureUnicornList = () => {
  const location = useLocation();
  useEffect(() => {
    getuniondata();
    window.scrollTo(0, 0);

    // Check for sponsor filter in URL
    const urlParams = new URLSearchParams(location.search);
    const sponsorFilter = urlParams.get("sponsorFilter");
    if (sponsorFilter) {
      setFilters((prev) => ({ ...prev, sponsorName: sponsorFilter }));
    }
  }, [location.search]);

  const [unicorn, setUnicorn] = useState();
  const [filterdata, setfilterdata] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  // Create stable random selections for tags (random on page load, stable during session)
  const randomTagSelections = useMemo(() => {
    const selections = {};
    return selections;
  }, []);

  const getRandomTag = (item) => {
    const itemId = item.udID || item.tudTempUdID || Math.random();

    if (!randomTagSelections[itemId]) {
      const tags = item.udTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      if (tags.length > 0) {
        randomTagSelections[itemId] =
          tags[Math.floor(Math.random() * tags.length)];
      }
    }

    return randomTagSelections[itemId];
  };

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });

  const [showModal, setShowModal] = useState(false);

  const handleApplyFilters = () => {
    setShowModal(false);
  };

  const [filters, setFilters] = useState({
    startupName: "",
    category: "",
    stage: "",
    founder: "",
    sponsorName: "",
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

  function filterData(data, filters, searchQuery) {
    if (!data) return [];

    if (data) {
      let filteredResults = data.filter((obj) => {
        const matchesCategory = filters.category
          ? obj.udCategory === filters.category
          : true;
        const matchesStartupName = filters.startupName
          ? obj.udStartupName === filters.startupName
          : true;
        const matchesFounder = filters.founder
          ? obj.udStartupFounderName === filters.founder
          : true;
        const matchesSponsor = filters.sponsorName
          ? obj.udSponsorName === filters.sponsorName
          : true;
        const matchesStage = filters.stage
          ? obj.udStage === filters.stage
          : true;

        return (
          matchesCategory &&
          matchesStartupName &&
          matchesFounder &&
          matchesSponsor &&
          matchesStage
        );
      });

      if (
        !filters.category &&
        !filters.startupName &&
        !filters.founder &&
        !filters.sponsorName &&
        !filters.stage
      ) {
        filteredResults = [...data];
      }

      if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter((obj) =>
          [
            "udStartupName",
            "udStartupFounderName",
            "udCategory",
            "udDealDescription",
            "udSponsorName",
          ].some((key) => obj[key]?.toLowerCase().includes(lowerSearch))
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
      <style>
        {`
          /* Card banner image box */
          .img-community-box {
            width: 100%;
            height: 180px;                /* desktop default */
            overflow: hidden;
            position: relative;
            border-radius: 12px 12px 0 0;
            background: #ffffff;          /* neutral background for letterboxing */
            display: flex;
            align-items: center;          /* vertical center */
            justify-content: flex-start;      /* horizontal center */
           }

          /* Banner image: keep original aspect, never stretch (hardened) */
          .img-community-box > img {
            width: auto !important;        /* keep original aspect */
            height: auto !important;       /* keep original aspect */
            max-width: 100% !important;    /* scale down if wider than box */
            max-height: 100% !important;   /* scale down if taller than box */
            object-fit: initial !important; /* ignore any global cover/contain */
            display: block !important;      /* avoid inline gaps */
            flex: 0 0 auto !important;     /* do not stretch in flex context */
            image-rendering: auto !important;
          }

          .community-all-contents {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid #e5e7eb;
          }

          /* Card Grid (match Founder/Investor) */
          .card-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 10px;               /* slightly tighter */
            box-sizing: border-box;
          }

          .cards-grid {
            display: grid;
            gap: 20px;
            width: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* Desktop (≥1440px): 4 cards per row */
          @media (min-width: 1440px) {
            .cards-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 18px;
              align-items: stretch;
            }
            .card-container { padding: 0 16px; }
          }

          /* Large Laptop (≥1200px): 4 cards per row */
          @media (min-width: 1200px) and (max-width: 1439px) {
            .cards-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 22px;
              align-items: stretch;
            }
            .card-container { padding: 0 16px; }
          }

          /* Laptop (≥1024px): 3 cards per row */
          @media (min-width: 1024px) and (max-width: 1199px) {
            .cards-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 20px;
              align-items: stretch;
            }
          }

          /* Large Tablet (≥992px): 3 cards per row */
          @media (min-width: 992px) and (max-width: 1023px) {
            .cards-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 20px;
              align-items: stretch;
            }
          }

          /* Tablet (≥768px): 2 cards per row */
          @media (min-width: 768px) and (max-width: 991px) {
            .cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 18px;
              align-items: stretch;
            }
            .card-container { padding: 0 10px; }
          }

          /* Large Mobile (≥576px): 2 cards per row */
          @media (min-width: 576px) and (max-width: 767px) {
            .cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 16px;
              align-items: stretch;
            }
            .card-container { padding: 0 12px; margin: 0 6px; }
          }

          /* Small Mobile (<576px): 1 card per row */
          @media (max-width: 575px) {
            .cards-grid {
              grid-template-columns: minmax(0, 1fr);
              gap: 16px;
              align-items: stretch;
            }
            .card-container { padding: 0 12px; margin: 0 8px; }
          }

          /* Mobile heights to match other pages */
          @media (min-width: 576px) and (max-width: 767px) { .img-community-box { height: 200px; } }
          @media (max-width: 768px) { .img-community-box { height: 200px; } }
          @media (max-width: 480px) { .img-community-box { height: 200px; } }

          /* Override any global styles that alter image box */
          .grid-card-item .img-community-box,
          .community-all-contents .img-community-box {
            border-top: none !important;
            border: none !important;
            padding: 0 !important;
            background: transparent !important;
          }

          /* Neutralize Bootstrap container padding/margins and gutters just for this page */
          .unicorn-list-container {
            max-width: 100% !important;         /* ignore Bootstrap container widths */
            padding-left: 0 !important;         /* kill side padding from .container */
            padding-right: 0 !important;
            margin-left: 0 !important;          /* avoid extra outer margins */
            margin-right: 0 !important;
          }
          .unicorn-list-container .row {
            --bs-gutter-x: 0 !important;        /* remove horizontal gutters */
            margin-left: 20px !important;
            margin-right: 20px !important;
          }

          /* Trim outer section padding if any */
          section.community-sections {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          /* Search bar: align left with cards, responsive width */
          .search-bar-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto 24px auto;
            padding: 0 10px;               /* match card-container base */
            box-sizing: border-box;
          }
          .search-bar-container .search-input {
            width: 100%;                   /* mobile: full width */
          }

          /* Desktop/Laptop: 60% width */
          @media (min-width: 1024px) {
            .search-bar-container {
              padding: 0 16px;             /* match card-container on desktop */
            }
            .search-bar-container .search-input {
              width: 60%;
            }
          }

          /* Tablet/Mobile: 100% width */
          @media (max-width: 1023px) {
            .search-bar-container .search-input {
              width:96%;
            }
          }

          /* Match card-container padding at each breakpoint */
          @media (min-width: 1440px) {
            .search-bar-container { padding: 0 16px; }
          }
          @media (min-width: 1200px) and (max-width: 1439px) {
            .search-bar-container { padding: 0 16px; }
          }
          @media (min-width: 768px) and (max-width: 991px) {
            .search-bar-container { padding: 0 10px; }
          }
          @media (min-width: 576px) and (max-width: 767px) {
            .search-bar-container { padding: 0 12px; margin-left: 8px; margin-right: 8px; }
          }
          @media (max-width: 575px) {
            .search-bar-container { padding: 0 12px; margin-left: 10px; margin-right: 10px; }
          }
        `}
      </style>
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
                <Button
                  key="back"
                  onClick={() => {
                    setFilters({
                      startupName: "",
                      category: "",
                      stage: "",
                      founder: "",
                      sponsorName: "",
                    });
                    setShowModal(false);
                  }}
                >
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
                      [
                        ...new Set(
                          filterdata
                            .filter((item) => item.udStartupName)
                            .map((item) => item.udStartupName)
                        ),
                      ]
                        .sort()
                        .map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
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
                      [
                        ...new Set(
                          filterdata
                            .filter((item) => item.udCategory)
                            .map((item) => item.udCategory)
                        ),
                      ]
                        .sort()
                        .map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="stage">View by Stage:</label>
                  <select
                    id="stage"
                    value={filters.stage}
                    onChange={(e) =>
                      setFilters({ ...filters, stage: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {filterdata &&
                      [
                        ...new Set(
                          filterdata
                            .filter((item) => item.udStage)
                            .map((item) => item.udStage)
                        ),
                      ]
                        .sort()
                        .map((stage, index) => (
                          <option key={index} value={stage}>
                            {stage}
                          </option>
                        ))}
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
                      [
                        ...new Set(
                          filterdata
                            .filter((item) => item.udStartupFounderName)
                            .map((item) => item.udStartupFounderName)
                        ),
                      ]
                        .sort()
                        .map((founderName, index) => (
                          <option key={index} value={founderName}>
                            {founderName}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="sponsorName">View by Sponsor Name:</label>
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
                      [
                        ...new Set(
                          filterdata
                            .filter((item) => item.udSponsorName)
                            .map((item) => item.udSponsorName)
                        ),
                      ]
                        .sort()
                        .map((sponsorName, index) => (
                          <option key={index} value={sponsorName}>
                            {sponsorName}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </Modal>

            {/* Filtered Cards - CSS Grid (matches Founder/Investor) */}
            <div className="row justify-content-center">
              <div className="card-container">
                <div className="cards-grid">
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <div
                        key={item.unicornDealID}
                        className="grid-card-item"
                        onClick={() => {
                          window.location.assign(
                            `/FutureUnicornDescription?id=${item.unicornDealID}`
                          );
                        }}
                      >
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
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.backgroundColor =
                              "rgba(240, 240, 240, 0.8)";
                            e.currentTarget.style.zIndex = "100";
                            // Make all child sections transparent to show parent background
                            const paragraphBoxes =
                              e.currentTarget.querySelectorAll(
                                ".community-paragraph-box"
                              );
                            paragraphBoxes.forEach((box) => {
                              box.style.backgroundColor = "transparent";
                            });
                            const cardBottomContainers =
                              e.currentTarget.querySelectorAll(
                                ".card-bottom-container"
                              );
                            cardBottomContainers.forEach((box) => {
                              box.style.backgroundColor = "transparent";
                            });
                            // Also update View More button
                            const viewMoreBtn =
                              e.currentTarget.querySelector(".btn-com");
                            if (viewMoreBtn) {
                              viewMoreBtn.style.backgroundColor =
                                "rgba(240, 240, 240, 0.8)";
                              viewMoreBtn.style.borderColor =
                                "rgba(240, 240, 240, 0.8)";
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.zIndex = "1";
                            // Reset all child sections
                            const paragraphBoxes =
                              e.currentTarget.querySelectorAll(
                                ".community-paragraph-box"
                              );
                            paragraphBoxes.forEach((box) => {
                              box.style.backgroundColor = "";
                            });
                            const cardBottomContainers =
                              e.currentTarget.querySelectorAll(
                                ".card-bottom-container"
                              );
                            cardBottomContainers.forEach((box) => {
                              box.style.backgroundColor = "";
                            });
                            // Reset View More button
                            const viewMoreBtn =
                              e.currentTarget.querySelector(".btn-com");
                            if (viewMoreBtn) {
                              viewMoreBtn.style.backgroundColor = "";
                              viewMoreBtn.style.borderColor = "";
                            }
                          }}
                        >
                          <div className="img-community-box">
                            <img
                              src={
                                (item.udBannerImage &&
                                  `${
                                    process.env.REACT_APP_IMAGE_BASE_URL ||
                                    process.env.REACT_APP_BASE_URL
                                  }api/uploads/unicorndeals/${
                                    item.tudTempUdID
                                  }/${parseBannerImage(item.udBannerImage)}`) ||
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
                                        process.env.REACT_APP_IMAGE_BASE_URL ||
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
                            <p
                              style={{
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                display: "-webkit-box",
                              }}
                            >
                              {item.udDealDescription}
                            </p>
                          </div>
                          <div
                            className="community-paragraph-box card-bottom-container"
                            style={{
                              display: "block", // ensure vertical layout
                              width: "100%",
                            }}
                          >

                            {/* BOTTOM ROW: View More + Last Updated */}
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Link
                                to={`/FutureUnicornDescription?id=${item.unicornDealID}`}
                                className="btn-com"
                              >
                                View More
                              </Link>

                              <LastUpdatedBadge
                                udPublishedDate={item.udPublishedDate}
                              />
                            </div>
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

          <NewWebFooter />
        </div>
      </section>
    </div>
  );
};
