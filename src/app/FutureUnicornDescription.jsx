import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import Slider from "react-slick";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Modal, message as mess, Spin } from "antd";

export const FutureUnicornDescription = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    getuniondata();
    window.scrollTo(0, 0);
  }, []);
  console.log(id);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [unicorn, setUnicorn] = useState();
  const [memberdata, setmemberdata] = useState();
  const [message, setmessage] = useState();
  const [iamintrestmodal, setiamintrestmodal] = useState(false);
  const [data, setdata] = useState({
    "I Want to know more about it": false,
    "I want to work with you": false,
    "I am excited to invest in your startups": false,
    message: "",
  });
  function getuniondata() {
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.unicorndealsByInvestors(params).then((result) => {
      console.log(result);
      setUnicorn(result.data);
    });
  }
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
  const highlightimages = [
    "./assets/images/deals-details/Petmojo/highlight4.jpg",
    "./assets/images/deals-details/Petmojo/highlight01.jpg",
    "./assets/images/deals-details/highlight2.jfif",
    "./assets/images/deals-details/highlight3.jpg",
  ];
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
          autoplay: true,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: true,
          speed: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
        },
      },
    ],
  };
  const openiamintrest = () => {
    setiamintrestmodal(true);
  };
  const adddata = (e) => {
    if (e.target.name == "message") {
      // setdata({ ...data, [e.target.name]: [e.target.value] });
    } else {
      setdata({ [e.target.name]: true });
    }
  };
  const submitintrest = () => {
    // console.log(unicorn);
    let datas = unicorn.filter((item) => item.unicornDealID == id);
    console.log(data);

    let params = {
      unicornDealID: datas[0].unicornDealID,
      udFounderID: datas[0].udFounderID,
      investor_id: localStorage.getItem("investor_id"),
      interestKnowMore: data["I Want to know more about it"] == true || false,
      interestWorkwithYou: data["I want to work with you"] == true || false,
      interestInvestinStartup:
        data["I am excited to invest in your startups"] == true || false,
      interestMessage: message,
    };
    Bridge.Unicorn.add_unicorn_interest(params).then((result) => {
      console.log(result);
      if (
        data["I Want to know more about it"] == false ||
        data["I want to work with you"] == false ||
        data["I am excited to invest in your startups"] == false
      ) {
        mess.error("Please Select any one option ");
        return;
      }
      if (result.message == "Details are updated successfully.") {
        toast.success("Details shared with Founder");
        setiamintrestmodal(false);
        setdata({
          "I Want to know more about it": false,
          "I want to work with you": false,
          "I am excited to invest in your startups": false,
          message: "",
        });
        setmessage("");
      } else if (result.message == "Please enter values of all fields.") {
        toast.error("Plz fill all feild");
      } else if (
        result.message == "You already have shown interest to this Startup."
      ) {
        mess.warning("You already have shown interest to this Startup.");
      }
    });
  };
  const dat=JSON.stringify(localStorage.getItem("investor_id")) 
  
  return (
    <div>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      {unicorn &&
        unicorn
          .filter((item) => item.unicornDealID == id)
          .map((item, index) => {
            return (
              
              <>

              <style>
{
`
.form-checkbox label{

text-transform : none;

}

`


}

              </style>

              

            
                <section class="futureunicorn-slider-sections">
                  <div class="container-flex">
                    <div className="row row-imgdirects">
                      <div
                        className="row-img-direct "
                        style={{ alignItems: "center" }}
                      >
                        <div className="img-certified-directors">
                          <img
                            src={`${
                              process.env.REACT_APP_BASE_URL
                            }api/uploads/unicorndeals/${
                              item.tudTempUdID
                            }/${JSON.parse(item.udLogoImage)}`}
                            alt=""
                          />
                        </div>
                        <div className="content-certify-directors">
                          <h3>{item.udPrimaryContactName}</h3>
                          <p>
                            <span></span>
                            {/* Certified Corporate Director - Business Management
                            Consultant */}
                          </p>
                        </div>
                        {/* <div className="meet-icon-future">
                                                <ul>
                                                    <li className='img-handshake'>
                                                        <span><img src="./assets/images/hand-shake.png" alt="" /></span>
                                                        <span>Meet Me</span>
                                                    </li>
                                                    <li>
                                                        <span><img src="./assets/images/add-user.png" alt="" /></span>
                                                        <span>Add Contact</span>
                                                    </li>
                                                    <li>
                                                        <span><img src="./assets/images/share1.png" alt="" /></span>
                                                        <span>Share</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                      </div>
                    </div>
                    <div className="row row-imgdirects bg-box-futures d-none">
                      <ul className="grid-box-futures">
                        <li>
                          <span>
                            <a href={`tel:${item.udPrimaryContactMobile}`}>
                              <img src="./assets/images/telephone.png" alt="" />
                            </a>
                          </span>
                          <span value={item.udPrimaryContactMobile}>Call</span>
                        </li>
                        <li>
                          <span>
                            <a href={`sms:${item.udPrimaryContactMobile}`}>
                              <img src="./assets/images/chat.png" alt="" />
                            </a>
                          </span>
                          <span value={item.udPrimaryContactMobile}>
                            Message
                          </span>
                        </li>
                        <li>
                          <span>
                            <a href={`mailto:${item.udPrimaryContactEmail}`}>
                              <img src="./assets/images/email.png" alt="" />
                            </a>
                          </span>
                          <span value={item.udPrimaryContactEmail}>Email</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/phone.png" alt="" />
                          </span>
                          <span value={item.udPrimaryContactEmail}>
                            Whatsapp
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link
                              to={`//${item.udSocialFacebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="./assets/images/messenger.png" alt="" />
                            </Link>
                          </span>
                          <span value={item.udSocialFacebook}>Messanger</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/location.png" alt="" />
                          </span>
                          <span>Navigate</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/web.png" alt="" />
                          </span>

                          <span value={item.udSocialOthers}>Website</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/thumb-up.png" alt="" />
                          </span>
                          <span>Social</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* <section className="services-section-future">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="services-futures-card">
                                <div className="img-card-service-future">
                                    <img src="./assets/images/help.png" alt="" />
                                </div>
                                <div className="para-future-service">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
                <section class="faq-sections future-main-accordians ">
                  <div class="container">
                    <div class="row">
                      <div class="main-accordain-all">
                        <div
                          class="accordion accordion-flush"
                          id="accordionFlushExample"
                        >
                          {/* <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingOness">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOness"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOness"
                                        >
                                            <span><img src="./assets/images/repair-tool.png" alt="" /></span>
                                            Service
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseOness"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOness"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body acc-services-ul">
                                            <ul className=''>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
                          <div
                            class="accordion-item"
                            style={{ border: "none" }}
                          >
                            <h3 class="accordion-header" id="flush-headingOne">
                              <div class="default-Show">
                                <span>
                                  <img
                                    src="./assets/images/information.png"
                                    alt=""
                                  />
                                </span>
                                About Us
                              </div>
                            </h3>

                            <div class="accordion-body about-us-p">
                              <p>{item.udDealDescription}</p>
                            </div>
                          </div>
                          <div
                            class="accordion-item"
                            style={{ border: "none" }}
                          >
                            <h3 class="accordion-header" id="flush-headingsixx">
                              <div class="default-Show">
                                <span>
                                  <img
                                    src="./assets/images/highluights.png"
                                    alt=""
                                  />
                                </span>
                                Highlights
                              </div>
                            </h3>
                            <div class="accordion-body">
                              <div className="row row-bg-highlights">
                                {item.udStartupHighlights &&
                                  JSON.parse(item.udStartupHighlights).map(
                                    (
                                      itemstartuphighlight,
                                      indexstartuphighlight
                                    ) => {
                                      console.log(itemstartuphighlight);

                                      return (
                                        <div
                                          className={`col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12  ${
                                            itemstartuphighlight.content1 == ""
                                              ? `d-none`
                                              : ""
                                          }`}
                                        >
                                          <div className="highlights-accordian">
                                            <div className="para-highlights-accordian">
                                              <div className="img-highlights">
                                                <img
                                                  src={
                                                    highlightimages[
                                                      indexstartuphighlight
                                                    ]
                                                  }
                                                  alt=""
                                                />
                                              </div>
                                              <div className="para-p-highlight">
                                                <p>
                                                  {
                                                    itemstartuphighlight.content1
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
        <h3 className="accordion-header" id="flush-headingfour">
          <button
            style={{
              padding: "1rem 1.25rem",
              cursor: "pointer",
              fontSize : "0.82em"
            }}
            className="btn"
            type="button"
            onClick={handleShow}
          >
            <span style={{ marginRight: "0rem" }}>
              <img src="./assets/images/gallery.png" alt="gallery icon" />
            </span>
            Investor Presentation
          </button>
        </h3>
      </div>

                          {/* Dialog-style Modal */}
                          {showModal && (
                            <>
                              <div
                                className="modal show fade fadein"
                                tabIndex="-1"
                                style={{
                                  display: "block",
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  zIndex: 1050,
                                  transition: "all 0.5s ease",
                                }}
                                aria-labelledby="investorModalLabel"
                                aria-hidden="true"
                              >
                                <div
                                  className="modal-dialog"
                                  style={{
                                    maxWidth: "1300px", // Adjusted width for dialog style
                                    margin: "1% auto", // Centers the modal
                                    transition: "all 0.5s ease",
                                  }}
                                >
                                  <div
                                    className="modal-content"
                                    style={{
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="investorModalLabel"
                                      >
                                        Investor Presentation
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <iframe
                                        src={`${
                                          process.env.REACT_APP_BASE_URL
                                        }api/uploads/unicorndeals/${
                                          item.tudTempUdID
                                        }/${JSON.parse(
                                          item.udPitchDeck
                                        )}#toolbar=1&navpanes=0`}
                                        frameBorder="0"
                                        height="600px" // Adjusted height for a dialog style
                                        width="100%"
                                        title="Investor Presentation"
                                        style={{
                                          borderRadius: "8px",
                                          boxShadow:
                                            "0px 0px 15px rgba(0, 0, 0, 0.1)",
                                        }}
                                      ></iframe>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Overlay effect to close the modal when clicked outside */}
                              <div
                                className="modal-backdrop fade show"
                                onClick={handleClose}
                                style={{
                                  zIndex: 1040,
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                }}
                              ></div>
                            </>
                          )}
                          <div class="accordion-item">
                            <h3
                              class="accordion-header"
                              id="flush-headingMarket"
                            >
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseMarket"
                                aria-expanded="false"
                                aria-controls="flush-collapseMarket"
                              >
                                <span>
                                  <img
                                    src="./assets/images/market-research.png"
                                    alt=""
                                  />
                                </span>
                                Market Overview
                              </button>
                            </h3>
                            <div
                              id="flush-collapseMarket"
                              class="accordion-collapse collapse"
                              aria-labelledby="flush-headingMarket"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body">
                                <div className="row market-overreview-row">
                                  {item.udMark &&
                                    JSON.parse(item.udMark).map(
                                      (itemudamrk, indexudmark) => {
                                        return (
                                          <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                            <div className="membership-accordian">
                                              <div className="para-member-accordian">
                                                <p>{itemudamrk.content1} </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}

                                  {/* <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="membership-accordian">

                                                        <div className="para-member-accordian">
                                                            <p>
                                                                The total addressable market for spices in India was $42 billion in 2022, with an anticipated growth rate of 15.7% between 2021-2031. Similarly, the total addressable market for Ready-To-Cook (RTC) products in India was $460 million in 2022, forecasted to grow at a rate of 16.3% between 2021-2031, highlighting significant opportunities in both segments.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="membership-accordian">
                                                        {/* <div className="img-member-accordian">
                                                            <img src="https://www.trumanlittlewhitehouse.org/wp-content/uploads/2019/11/81DpN-lrJvL._SL1350.jpg" alt="" />
                                                        </div> */}
                                  {/* <div className="para-member-accordian"> */}
                                  {/* <h3>
                                                                Member
                                                            </h3> */}
                                  {/*      <p>
                                                                The Ready to Cook market, valued at $18 billion, is witnessing rapid growth due to shifting consumer habits, increased health awareness, and the convenience of pre-packaged meal kits. This trend presents ample opportunities for smaller companies to enter the market and innovate with new product offerings, catering to the needs of busy individuals seeking healthy and convenient meal solutions.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="accordion-item"
                            style={{ border: "none" }}
                          >
                            <h3 class="accordion-header" id="flush-headingTeam">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTeam"
                                aria-expanded="false"
                                aria-controls="flush-collapseTeam"
                              >
                                <span>
                                  <img
                                    src="./assets/images/group-chat.png"
                                    alt=""
                                  />
                                </span>
                                Team
                              </button>
                            </h3>
                            <div
                              id="flush-collapseTeam"
                              class="accordion-collapse collapse"
                              aria-labelledby="flush-headingTeam"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body ">
                                <div className="row row-box-linse Grid-team">
                                  {item.udVendorId &&
                                    JSON.parse(item.udVendorId).map(
                                      (itemudVendorId, indexudVendorId) => {
                                        return (
                                          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-12 col-sm-12 col-xs-12">
                                            <div className="main-card-of-teams">
                                              <div className="img-teams-of-cards">
                                                <img
                                                  src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudVendorId.imgname}`}
                                                  alt=""
                                                />
                                              </div>
                                              <div className="name-of-teams-card">
                                                <div className="head-deals-team">
                                                  <h3
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                  >
                                                    {itemudVendorId.name}
                                                  </h3>
                                                  <p
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                  >
                                                    {itemudVendorId.Role}
                                                  </p>
                                                </div>
                                                <ul>
                                                  <li>
                                                    {
                                                      itemudVendorId.description1
                                                    }
                                                  </li>
                                                  <li>
                                                    {
                                                      itemudVendorId.description2
                                                    }
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="accordion-item">
                            <h3
                              class="accordion-header"
                              id="flush-headingVideos"
                            >
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseVideos"
                                aria-expanded="false"
                                aria-controls="flush-collapseVideos"
                              >
                                <span>
                                  <img
                                    src="./assets/images/gallery.png"
                                    alt=""
                                  />
                                </span>
                                Videos
                              </button>
                            </h3>
                            <div
                              id="flush-collapseVideos"
                              class="accordion-collapse collapse"
                              aria-labelledby="flush-headingVideos"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body connect-acc-us">
                                <div className="row justify-content-center">
                                  <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                    <div className="img-future-gallery">
                                      <iframe
                                        style={{
                                          boxShadow:
                                            "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                                          borderRadius: 3,
                                          // marginLeft: 65,
                                        }}
                                        width="100%"
                                        height="335"
                                        src={`https://www.youtube.com/embed/${item.udYoutubeLink
                                          .split("=")
                                          .pop()}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h3
                              class="accordion-header"
                              id="flush-headingfourees"
                            >
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-headingfoureesnew"
                                aria-expanded="false"
                                aria-controls="flush-headingfourees"
                              >
                                <span>
                                  <img
                                    src="./assets/images/live-streaming.png"
                                    alt=""
                                  />
                                </span>
                                Media Coverage
                              </button>
                            </h3>
                            <div
                              id="flush-headingfoureesnew"
                              class="accordion-collapse collapse"
                              aria-labelledby="flush-headingfourees"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body">
                                <div className="row row-bg-media-coverage">
                                  {item.udMediaCoverageFiles &&
                                    JSON.parse(item.udMediaCoverageFiles).map(
                                      (
                                        itemudMediaCoverageFiles,
                                        indexudMediaCoverageFiles
                                      ) => {
                                        return (
                                          <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                            <div className="para-media-coverage-accordian">
                                              <div className="img-media-coverage">
                                                <img
                                                  src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudMediaCoverageFiles.imgname}`}
                                                  alt=""
                                                />
                                              </div>
                                              <div className="para-p-media-coverage">
                                                <p>
                                                  {
                                                    itemudMediaCoverageFiles.title
                                                  }
                                                </p>
                                              </div>
                                              <div className="button-media-coverage">
                                                <a
                                                  href={
                                                    itemudMediaCoverageFiles.content
                                                  }
                                                >
                                                  View More
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingTwo">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            <span><img src="./assets/images/trophy.png" alt="" /></span>

                                            Awards & Achivements
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseTwo"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingTwo"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="img-awards">
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                          <div class="accordion-item">
                            <h3 class="accordion-header" id="flush-headingWait">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-headingWaitnew"
                                aria-expanded="false"
                                aria-controls="flush-headingWait"
                              >
                                <span>
                                  <img
                                    src="./assets/images/mobile.png"
                                    alt=""
                                  />
                                </span>
                                Contact us
                              </button>
                            </h3>
                            <div
                              id="flush-headingWaitnew"
                              class="accordion-collapse collapse"
                              aria-labelledby="flush-headingWait"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div class="accordion-body connect-acc-us">
                                <div className="row row-box-line">
                                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                    <div className="lets-talks-div">
                                      <h3>Legal Name</h3>
                                      <ul>
                                        <li>
                                          <span>{item.udLegalname}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                    <div className="lets-talks-div">
                                      <h3>Founded</h3>
                                      <ul>
                                        <li>
                                          <span>{item.udFoundedon}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                    <div className="lets-talks-div">
                                      <h3>Let's Meet</h3>
                                      <ul>
                                        <li>
                                          <span>Corporate Office :</span>
                                          <span>{item.udAddress}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                    <div className="lets-talks-div">
                                      <h3>Employees</h3>
                                      <ul>
                                        <li>
                                          <span>{item.udEmployees}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                    <div className="lets-talks-div">
                                      <h3>Visit Us</h3>
                                      <ul>
                                        <li>
                                          <Link
                                            to={`//${item.udWebsite}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <span
                                              style={{
                                                textTransform: "lowercase",
                                              }}
                                            >
                                              {item.udWebsite}
                                            </span>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-16 col-sm-16 col-xs-16">
                                    <div className="lets-talks-div">
                                      <h3>Follow Us</h3>
                                      <ul>
                                        <li>
                                          <Link
                                            to={`//${item.udSocialInsta}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <i class="fa-brands fa-instagram"></i>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            to={`//${item.udSocialYouTube}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <i class="fa-brands fa-youtube"></i>
                                          </Link>
                                        </li>

                                        <li>
                                          <Link
                                            to={`//${item.udSocialFacebook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <i class="fa-brands fa-facebook"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingseven">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingsevensnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingseven"
                                        >
                                            <span><img src="./assets/images/help.png" alt="" /></span>

                                            Help Center
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingsevensnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingsevensnew"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row need-help-accrow">
                                                <div className="need-help-acc">
                                                    <p>
                                                        Need help? Drop down and find what you're looking for here & send us a message
                                                    </p>
                                                    <p>
                                                        <span className='ouat-spans'>
                                                            Quotation
                                                        </span>
                                                        <span>Post your requirement to serve your better</span>
                                                    </p>
                                                </div>
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Enquiry for</label>
                                                            <select name="" id="" className='form-control'>
                                                                <option value="">quotation</option>
                                                                <option value="">Appoinment</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Requirement</label>
                                                            <input type="text" className='form-control' />
                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Name</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Company Name</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Email</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Mobile</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-12 col-sm-12 col-md-12 col-xl-12 col-lg-12 col-xxl-12">
                                                            <label htmlFor="">Message</label>
                                                            <textarea name="" id="" cols="30" rows="10"></textarea>

                                                        </div>
                                                        <div className="col-md-12 col-sm-12 col-md-12 col-xl-12 col-lg-12 col-xxl-12">

                                                            <div className="button-quote">
                                                                <a href="">Request Quote</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-12"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "30px",
                        }}
                      >
                        {dat== "null" ?("") :(
                          <div className="investor-amounts">
                            <a
                              style={{ color: "white", fontSize : "1.5em" }}
                              onClick={openiamintrest}
                              
                            >
                              Express Interest
                            </a>
                          </div>
                        )} 
                        <div className="investor-amounts button">
                          <a href="/FutureUnicornList">View other Future Unicorns</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            );
          })}
      <Modal
        // title={`Invest in ${this.state.deal_name}`}
        visible={iamintrestmodal}
        onOk={() => {
          setiamintrestmodal(false);
        }}
        onCancel={() => {
          setiamintrestmodal(false);
          setdata({
            "I Want to know more about it": false,
            "I want to work with you": false,
            "I am excited to invest in your startups": false,
            message: "",
          });
          setmessage("");
        }}
        width={900}
        footer={false}
      >
        {/* <section
          class="about-page-section blog-section payment-sec pb-0"
          style={{ paddingBottom: "0px !important" }}
        > */}
          {/* <div class="container"> */}
            <div class="row">
              <div
                class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
                style={{ pointerEvents: "none" }}
              ></div>
            </div>
            <div className="row  justify-content-center ">
              <div className="col-md-8 col-12 col-sm-12 col-xl-8 col-xxl-12">
                <div className="card-payment-methods">
                  <div class="heading-title m-sm-0">
                    <p>
                      <span></span>{" "}
                    </p>
                    <h2>Type of Interest</h2>
                  </div>
                  <div className="para-proceed">
                    <form action="" className="form-checkbox">
                      <div className="row">
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                          <input
                            type="radio"
                            name="I Want to know more about it"
                            value={data["I Want to know more about it"]}
                            checked={
                              data["I Want to know more about it"] == true
                            }
                            onClick={adddata}
                          />
                          <label htmlFor="">I want to know more about your startup</label>
                        </div>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                          <input
                            type="radio"
                            name="I want to work with you"
                            value={data["I want to work with you"]}
                            checked={data["I want to work with you"] == true}
                            onClick={adddata}
                          />
                          <label htmlFor="">I want to explore collaboration </label>
                        </div>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                          <input
                            type="radio"
                            name="I am excited to invest in your startups"
                            value={
                              data["I am excited to invest in your startups"]
                            }
                            checked={
                              data["I am excited to invest in your startups"] ==
                              true
                            }
                            onClick={adddata}
                          />
                          <label htmlFor="">
                            I am interested to invest in your startup
                          </label>
                        </div>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mt-2">
                          <textarea
                            value={message}
                            name="message"
                            onChange={(e) => {
                              setmessage(e.target.value);
                            }}
                            id="w3review"
                            rows="4"
                            className="w100"
                            placeholder="Message"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="button-proceed-online">
                    <a style={{ color: "white" }} onClick={submitintrest}>
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        {/* </section> */}
      </Modal>
      <ToastContainer />
      <NewWebFooter />
    </div>
  );
};
