import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import axios from "axios";
import Foundermylistnew from "./foundermylistnew.js";
import { Divider, Spin, Card } from "antd";
import Header from "./common/Header.js";
import Sidebar from "./Founder/common/Sidebar.js";
import Title from "antd/lib/typography/Title.js";

export const FounderMyListing = () => {
  useEffect(() => {
    //
    unicorndetails();
    window.scrollTo(0, 0);
  }, []);
  const [unideatils, setunideatils] = useState();
  const [unicorn, setUnicorn] = useState();
  const [loading, setloading] = useState(false);
  console.log(unicorn);

  const unicorndetails = async () => {
    setloading(true);
    let params = {
      founderID: localStorage.getItem("founder_id"),
    };
    let headers = {
      "content-type": "application/json",
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/unicornListByFounders`,
        params,
        { headers }
      )
      .then((res) => {
        // Check if data exists and has at least one item
        if (res.data && res.data.data && res.data.data.length > 0) {
          setunideatils(res.data.data[0]);
        } else {
          // Handle empty data case
          setunideatils(null);
        }
        setTimeout(() => {
          let par = {
            page: 0,
            pagesize: 10,
          };
          Bridge.Unicorn.unicorndealsByInvestors(par).then((result) => {
            try {
              if (res.data.data) {
                setUnicorn(
                  result.data.filter(
                    (item) => item.tudTempUdID == res.data.data[0].tudTempUdID
                  )
                );
              }
            } catch (error) {
              console.log(error);
            }
          });
          setloading(false);
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
    <>
      <style>
        {`
          .unicorn-card {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 12px;
            background: white;
            margin: 20px 0;
          }
          
          .unicorn-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .unicorn-detail-item {
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
          }
          
          .detail-label {
            font-weight: 600;
            color: #555;
            min-width: 150px;
          }
          
          .detail-value {
            color: #333;
            flex: 1;
          }
          
          .action-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-top: 24px;
          }
          
          .action-button {
            padding: 10px 20px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: #1890ff;
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .action-button:hover {
            background: #40a9ff;
          }
          
          .empty-state {
            text-align: center;
            padding: 40px;
          }

          .action-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-top: 24px;
          }
          
          .action-button {
            padding: 10px 24px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #1890ff;
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            min-width: fit-content;
            width: auto;
          }
          
          .action-button:hover {
            background: #40a9ff;
            color: white;
            text-decoration: none;
          }

          .list-unicorn-button {
            width: auto;
            padding: 10px 20px;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 0 auto;
          }

          .list-unicorn-button i {
            font-size: 12px;
          }

          .empty-state {
            text-align: center;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
        `}
      </style>

      <Spin spinning={loading}>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.036)",
            paddingBottom: "0",
            margin: "1px",
            height: "100%",
          }}
        >
          <Header />
          <section></section>

          <div className="row">
            <div
              className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Sidebar />
            </div>
            <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none">
              <Sidebar />
            </div>

            <div className="col col-lg-16 pb-4">
              <section
                id="hdii"
                className="m-lg-0 m-3"
                style={{ marginTop: 25, minHeight: "75vh" }}
              >
                <div className="container">
                  <div className="unicorn-header">
                    <Title level={2}>Unicorn Details</Title>
                    <Divider />
                  </div>
                  {/* Welcome Message Banner */}
                  <div style={{
                    background: '#f0f5ff',
                    padding: '20px 24px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    border: '1px solid #d6e4ff'
                  }}>
                    <p style={{
                      color: '#1890ff',
                      marginBottom: '0',
                      fontSize: '15px',
                      textAlign: 'center'
                    }}>
                      Thank you for choosing Future Unicorn, your gateway to showcasing your business to the world in a structured and impactful way.
                      <br/>To list your startup, please fill in and submit the form by clicking the button below.
                    </p>
                  </div>

                  {unideatils ? (
                    <Card className="unicorn-card">
                      <div className="unicorn-details">
                        {unideatils.tudStartupFounderName && (
                          <div className="unicorn-detail-item">
                            <span className="detail-label">Founder Name</span>
                            <span className="detail-value">
                              {unideatils.tudStartupFounderName}
                            </span>
                          </div>
                        )}

                        {unideatils.tudStartupName && (
                          <div className="unicorn-detail-item">
                            <span className="detail-label">Unicorn Name</span>
                            <span className="detail-value">
                              {unideatils.tudStartupName}
                            </span>
                          </div>
                        )}

                        {unideatils.tudStartupFounderEmail && (
                          <div className="unicorn-detail-item">
                            <span className="detail-label">Email Id</span>
                            <span className="detail-value">
                              {unideatils.tudStartupFounderEmail}
                            </span>
                          </div>
                        )}

                        {unideatils.tudStartupFounderMobileNumber && (
                          <div className="unicorn-detail-item">
                            <span className="detail-label">Mobile No.</span>
                            <span className="detail-value">
                              {unideatils.tudStartupFounderMobileCountryCode}{" "}
                              {unideatils.tudStartupFounderMobileNumber}
                            </span>
                          </div>
                        )}

                        <div className="action-buttons">
                          {unicorn && unicorn.length !== 0 && (
                            <Link
                              to={`/FutureUnicorn/${unicorn[0].udUrlName}`}
                              className="action-button"
                            >
                              <i className="fa-regular fa-eye"></i>
                              View Unicorn
                            </Link>
                          )}
                          <Link
                            to="FutureUnicornForm"
                            className="action-button"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                            Edit Unicorn
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="unicorn-card">
                      <div className="empty-state">
                        <h3>You haven't listed your future unicorn</h3>
                        <Link
                          to="FutureUnicornForm"
                          className="action-button list-unicorn-button"
                        >
                          <i className="fa-solid fa-plus"></i>
                          List your Unicorn
                        </Link>
                      </div>
                    </Card>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </Spin>

      <NewWebFooter />
    </>
  );
};
