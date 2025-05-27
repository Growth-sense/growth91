import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import Bridge from "./constants/Bridge.js";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Modal, message as mess } from "antd";
import SinglePagePDFViewer from "./components/PdfViewer/single-page";
import { extractVideoIDFromYoutubeUrl, getAbsoluteUrl } from "./helper/utilHelper.js";
import moment from "moment";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

export const FutureUnicornDescription = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const search = useLocation().search;
  const id = props.id || new URLSearchParams(search).get("id");
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
      investor_id: localStorage.getItem("Parent_investor_id") || localStorage.getItem("founder_id"),
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
      } else if (
        result.message == "You already have shown interest to this Startup."
      ) {
        mess.warning("You already have shown interest to this Startup.");
      }
    });
  };
  const dat = JSON.stringify(localStorage.getItem("investor_id"));

  return (
    <div style={{ backgroundColor: "#F8F9FA" }}>
      <style>
        {`
        .para-proceed label{
          text-transform: none;
        }
      
        .image-section {
          width: 100%;
          
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .image-section img {
         width:100%;
height:350px;
object-fit:cover;
        }
        .logo-section {
          width: 150px;
          height: 150px;
          min-width: 150px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          margin-top:-75px;
        }
        .logo-section img {
          width: 100%;
          height: 100%;
        }
        
        .text-section h1 {
        text-align: left;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #29176f !important;
        }
        .text-section p {
          font-size: 1rem;
          color: #555555;
          margin-bottom: 2rem;
        }
        .text-section button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          color: #00000;
          background-color: transparent;    
          border: 1px solid #00000;
          border-radius: 50px;
          cursor: pointer;
        }

                   
                    .hero {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        background-image: url('background-image.jpg'); /* Add the background image here */
                        background-size: cover;
                        background-position: center;
                            background-color: #100050;
                    }
                    .hero h1 {
                        font-size: 4em;
                        margin-bottom: 20px;
                        color: white !important;

                    }
                    .hero p {
                        font-size: 1.5em;
                        margin-bottom: 30px;
                        color: white;
                    }
                    .buttons {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                    }
                    .buttons a {
                        text-decoration: none;
                        color: white;
                        background-color: #6c63ff;
                        padding: 15px 30px;
                        border-radius: 5px;
                        font-size: 1.3em;
                        transition: background-color 0.3s;
                    }
                    .buttons a:hover {
                        background-color: #574bda;
                    }

                    /* Why to list section */
                    .why-to-list {
                        padding: 50px 20px;
                        text-align: center;
                        background-color: white;
                    }
                    .why-to-list h2 {
                        font-size: 2.5em;
                        margin-bottom: 40px;
                        color: white;
                    }
                    .features {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                    }
                    .feature-box {
                        background-color: #f5f5f5;
                        padding: 20px;
                        border-radius: 10px;
                        width: 400px;
                    }
                    .feature-box h3 {
                        font-size: 1.5em;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    .feature-box p {
                        font-size: 1.3em;
                        color: #666;
                    }

                    /* Key Features Section */
                    .key-features {
                        padding: 50px 20px;
                        background-color: white;
                        color: black;
                        text-align: left;
                        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
                    }
                    .key-features h2 {
                        font-size: 2.5em;
                        text-align: center;
                        margin-bottom: 40px;
                        color: #333;
                    }
                    .features-list {
                    
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-gap: 30px;
                        margin : 20px 90px;
                    }
                    .feature-item {
                        display: flex;
                        // align-items: center;
                    }
                    .feature-item-number {
                        width: 30px;
                        height: 30px;
                        background-color: #d8d8f8;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.5em;
                        margin-right: 20px;
                        color: #333;
                    }
                    .feature-description {
                        max-width: 700px;
                    }
                    .feature-description h3 {
                        font-size: 1.5em;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    .feature-description p {
                        font-size: 1.3em;
                        color: #666;
                    }
                        .investor-benifit{
                        background : #ffffff;

                        }
                           .investor-benifit h2{
    color: #333;


                           }
                        /* Benefits for Founders Section */
.founder-benefit {
    background: #ffffff;
    padding: 50px 20px;
    text-align: center;
}

.founder-benefit h2 {
    // color: #ffffff !important;
    font-size: 2.5em;
    margin-bottom: 40px;
}

.founder-benefit .features {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.founder-benefit .feature-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

.founder-benefit .feature-box h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
                        color: ##100050 !important;

}

.founder-benefit .feature-box p {
    font-size: 1.3em;
    color: #666;
}
.theme-btn{
 justify-content  : center !important;
}
 /* Section Styling */
.market-overview-section {
  background-color: #f8f9fa;
}

/* Card Styling */
.market-overview-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%; /* Ensures cards have the same height */
  text-align: justify;
}

/* Typography */
.market-overview-section h2 {
  color: #333;
  font-weight: bold;
}

.media-coverage-section {
}

/* Card Styling */
.media-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.media-card-image {
  width: 100%;
  height: 180px;
  object-fit: fill;
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-4 {
}
  
.media-card-content {
  padding: 20px;
  flex-grow: 1;
}

.media-card-content h5 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.media-card-date {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.read-more-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.read-more-link:hover {
  text-decoration: underline;
}

/* Load More Button */
.load-more-btn {
  background-color: #ffffff;
  border: 2px solid #333;
  border-radius: 25px;
  padding: 10px 30px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #333;
  color: #ffffff;
}


.videos-section {
  padding: 50px 0;
}

.video-slide {
  padding: 10px;
}

.video-slide iframe {
  border-radius: 10px;
}

.slick-prev, .slick-next {
  font-size: 30px;
  z-index: 1;
}

.slick-prev:hover, .slick-next:hover {
  
}

.slick-dots li button:before {
  
}

.slick-dots li.slick-active button:before {
 
}

.contact-us-section {
}

.contact-info-card {
  background: linear-gradient(90deg, #191964, #222276);
  color: white;
  border-radius: 15px;
  padding: 30px;
  z-index: 999;
}

.contact-info-card h2 {
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 900;
  color: white !important;
}

.contact-info-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.contact-info-list li {
  margin-bottom: 35px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.contact-info-list i {
  font-size: 18px;
  margin-right: 26px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  background-color: white;
  color: #191964;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center !important;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: #fff;
  color: #7d56d9;
}

.company-info-list {
  list-style: none;
  padding: 0;
}

.company-info-list li {
  margin-bottom: 20px;
}

.company-info-list span {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.company-info-list p {
  margin: 5px 0 0;
  color: #777;
  font-size: 15px;
}

.company-info-list a {
  color: #191964;
  text-decoration: none;
}

.company-info-list a:hover {
  text-decoration: underline;
}
.center-class{
align-content:center;
background-color: white;
box-shadow: 0px 3px 6px #000;
border-radius: 15px;


}

.about-text {
color: #fff;
text-align: justify;  
}


/* Responsive Styling */

@media only screen and (max-width: 600px) {

.text-section button {
    width: 200px;
    font-size: 1rem;
    color: #0000 0;
    background-color: transparent;
    border: 1px solid #0000 0;
    border-radius: 50px;
    cursor: pointer;
}

.content-section-banner {
  display: block !important;

}

.text-section {
  text-align: center;
  }
.text-section h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #29176f !important;
}

.design-space {
margin-top: 100px;

}

.about-img{
 margin-bottom: 20px;

}

.about-all {
  padding: 30px !important;


}

.about-text {
color: #fff;
text-align: justify;  
}

}

`}
      </style>

      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      {unicorn &&
        unicorn
          .filter((item) => item.unicornDealID == id)
          .map((item, index) => {
            return (
              <>
                {/* loop through items and print all for debugging */}
                {/* {Object.keys(item).map((key) => {
                return (
                  <div>
                    <p>{key}</p>
                    <p>{item[key]}</p>
                    <br />
                  </div>
                );
              })} */}

                <section className="design-space">
                  <div className="container">
                    {/* Image Section */}
                    <div
                      className="image-section"
                      style={{
                        borderRadius: "15px",
                        border: "1px solid #ddd",
                        marginTop: "-5px",
                      }}
                    >
                      {/* Add your image manually here */}
                      <img
                        className="heroSectionImage"
                        style={{
                          objectFit: "fill",
                        }}
                        src={
                          (item.udBannerImage &&
                            `${
                              process.env.REACT_APP_BASE_URL
                            }api/uploads/unicorndeals/${
                              item.tudTempUdID
                            }/${JSON.parse(item.udBannerImage)}`) ||
                          ""
                        }
                        alt="Team"
                      />
                    </div>

                    <div className="content-section-banner d-flex ps-4 gap-5">
                      {/* Logo Section */}
                      <div className="logo-section">
                        {/* Replace with your logo */}
                        <img
                          src={
                            (item.udLogoImage &&
                              `${
                                process.env.REACT_APP_BASE_URL
                              }api/uploads/unicorndeals/${
                                item.tudTempUdID
                              }/${JSON.parse(item.udLogoImage)}`) ||
                            ""
                          }
                          alt="Logo"
                          style={{
                            objectFit: "fill",
                            // borderRadius: "50%",
                            boxShadow: "0px 3px 6px #000",
                          }}
                        />
                      </div>

                      {/* Text Section */}
                      <div className="text-section">
                        <h1>{item.udStartupName}</h1>
                        {item.udTag && item.udTag !== "None" && (
                          <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                            <span style={{
                              display: "inline-block",
                              backgroundColor: "#e6f7ff",
                              color: "#0066cc",
                              padding: "3px 10px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}>
                              {item.udTag}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={openiamintrest}
                          className="primaryInterested"
                          style={{
                            // height: "100%",
                            backgroundColor: "#191964",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0px 3px 6px #000",
                          }}
                        >
                          I am Interested
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="container my-5">
                  <div
                    className="about-all shadow-lg p-5"
                    style={{
                      backgroundColor: "#191964",
                      color: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="row">
                      {/* Left Image Section */}
                      <div className="about-img col-md-4 d-flex justify-content-center align-items-center">
                        <div
                          className="bg-white"
                          style={{ borderRadius: "15px" }}
                        >
                          <img
                            // assets/images/unicorn-about-us
                            src="assets/images/unicorn-about-us.png"
                            alt="Growth Illustration"
                            style={{
                              maxWidth: "100%",
                              borderRadius: "15px",
                              boxShadow: "0px 3px 6px #000",
                            }}
                          />
                        </div>
                      </div>

                      {/* Right Text Section */}
                      <div className="col-md-8 d-flex flex-column justify-content-center">
                        <p className="about-text">{item.udDealDescription}</p>
                        {/* <NewLINK
                          to="/"
                          className="read-btn mt-5 px-4 py-2 rounded-pill"
                        >
                          Read More
                        </NewLINK> */}
                      </div>
                    </div>
                  </div>
                </section>

                <section
                  id="marketOverviewSection"
                  className="container my-5  market-overview-section"
                >
                  <h2 className="text-center mb-5">Market Overview</h2>
                  <div className="row market-overreview-row">
                    {item.udMark &&
                      JSON.parse(item.udMark).map((itemudMark, index) => (
                        <div
                          className="col-12 col-md-12 col-lg-4 col-xl-4 mb-4"
                          key={index}
                        >
                          <div className="market-overview-card">
                            <p>
                              {itemudMark.content1 || "Content not available"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>

                <section id="highlightSection" className="container my-5">
                  <h2 className="text-center mb-4">Highlights</h2>
                  <div className="row">
                    {/* Highlight 1 */}

                    {item.udStartupHighlights &&
                      JSON.parse(item.udStartupHighlights).map(
                        (itemstartuphighlight, indexstartuphighlight) => {
                          console.log(itemstartuphighlight);

                          return (
                            <div className="col-md-6 mb-4">
                              <div
                                className="p-4 shadow-sm h-100"
                                style={{
                                  backgroundColor: "#fff",
                                  borderRadius: "15px",
                                }}
                              >
                                <div
                                  className="d-flex"
                                  style={{ textAlign: "justify" }}
                                >
                                  <img
                                    src={highlightimages[indexstartuphighlight]} // Replace with the actual icon path
                                    alt="Highlight Icon"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "50%",
                                      marginRight: "15px",
                                      boxShadow: "0px 3px 6px #000",
                                    }}
                                  />
                                  <p>{itemstartuphighlight.content1}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                </section>

                <section
                  id="mediaCoverageSection"
                  className="container my-5 media-coverage-section"
                >
                  {item.udMediaCoverageFiles &&
                    JSON.parse(item.udMediaCoverageFiles).length > 0 && (
                      <>
                        <h2 className="text-center mb-4">Media Coverage</h2>
                        <div className="row">
                          {JSON.parse(item.udMediaCoverageFiles).map(
                            (
                              itemudMediaCoverageFiles,
                              indexudMediaCoverageFiles
                            ) => (
                              <div
                                className="col-md-4 mb-4"
                                style={{ display: "flex" }}
                                key={indexudMediaCoverageFiles}
                              >
                                <div className="media-card">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudMediaCoverageFiles.imgname}`}
                                    alt=""
                                    className="media-card-image"
                                  />
                                  <div className="media-card-content">
                                    <h5>{itemudMediaCoverageFiles.title}</h5>
                                    <p>
                                      {itemudMediaCoverageFiles.content}{" "}
                                      <a
                                        href={itemudMediaCoverageFiles.content}
                                        className="read-more-link"
                                      >
                                        Read More
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        {/* <div className="text-center mt-4">
                      <button className="load-more-btn">Load more</button>
                    </div> */}
                      </>
                    )}
                </section>

                <section id="teamSection" className="container my-5">
                  <h2 className="text-center mb-3">Team</h2>
                  <div className="row row-box-linse Grid-team px-1 justify-content-center">
                    {item.udVendorId &&
                      JSON.parse(item.udVendorId).map(
                        (itemudVendorId, indexudVendorId) => (
                          <div className="col-md-6 mb-4" key={index}>
                            <div
                              className="shadow-lg"
                              style={{
                                borderRadius: "15px",
                                overflow: "hidden",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              {/* Header with Gradient Background */}
                              <div
                                style={{
                                  background:
                                    "linear-gradient(90deg, #191964, #222276)",
                                  color: "white",
                                  padding: "20px",
                                }}
                              >
                                <div className="d-flex align-items-center">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudVendorId.imgname}`}
                                    alt=""
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      marginRight: "15px",
                                      boxShadow: "0px 3px 6px #000",
                                    }}
                                  />
                                  <div>
                                    <h5 className="mb-0 text-white">
                                      {itemudVendorId.name ||
                                        "Name not provided"}
                                    </h5>
                                    <p className="mb-0 text-white">
                                      {itemudVendorId.Role ||
                                        "Role not specified"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Description Section */}
                              <div
                                className="p-3"
                                style={{
                                  height: "210px",
                                  textAlign: "justify",
                                }}
                              >
                                <p>
                                  {itemudVendorId.description1
                                    ? itemudVendorId.description1
                                    : "Description not available for this team member."}
                                </p>
                                <p>
                                  {itemudVendorId.description2
                                    ? itemudVendorId.description2
                                    : ""}
                                </p>
                                <div className="mt-3">
                                  <a
                                    href={itemudVendorId.linkedinUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icons__item"
                                    style={{ color: "#0A66C2" }}
                                  >
                                    <i className="bx bxl-linkedin fs-19"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </section>

                <section id="pitchDeck">
                  {item.udPitchDeck != "" &&
                    JSON.parse(item.udPitchDeck) != "" && (
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            {/* blue bg */}
                            <div
                              className="shadow-lg p-5"
                              style={{
                                backgroundColor: "#191964",
                                color: "white",
                                borderRadius: "20px",
                              }}
                            >
                              <h2 className="text-left text-white mb-4">
                                Investor Presentation
                              </h2>
                              <SinglePagePDFViewer
                                pdf={`${
                                  process.env.REACT_APP_BASE_URL
                                }api/uploads/unicorndeals/${
                                  item.tudTempUdID
                                }/${JSON.parse(item.udPitchDeck)}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </section>

                <section id="productDeck">
                  {item.udProductDeck != null &&
                    item.udProductDeck != "" &&
                    JSON.parse(item.udProductDeck) != "" && (
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            {/* blue bg */}
                            <div
                              className="shadow-lg p-5"
                              style={{
                                backgroundColor: "#191964",
                                color: "white",
                                borderRadius: "20px",
                              }}
                            >
                              <h2 className="text-left text-white mb-4">
                                Product Presentation
                              </h2>
                              <SinglePagePDFViewer
                                pdf={`${
                                  process.env.REACT_APP_BASE_URL
                                }api/uploads/unicorndeals/${
                                  item.tudTempUdID
                                }/${JSON.parse(item.udProductDeck)}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </section>

                <section
                  id="videoSection"
                  className="container my-5 videos-section"
                >
                  <h2 className="text-center mb-5">Videos</h2>
                  <div className="video-slide">
                    <iframe
                      style={{
                        boxShadow: "0px 3px 6px #000",
                        borderRadius: 3,
                      }}
                      width="100%"
                      height="435"
                      src={`https://www.youtube.com/embed/${extractVideoIDFromYoutubeUrl(
                        item.udYoutubeLink
                      )}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>

                <section
                  id="contactUsSection"
                  className="container my-5 contact-us-section"
                >
                  <h2 className="text-center mb-5">Contact Us</h2>
                  <div className="row mx-0">
                    {/* Contact Information Card */}
                    <div className="col-md-4 my-2">
                      <div className="contact-info-card">
                        <h2>Contact Information</h2>
                        <ul className="contact-info-list">
                          <li>
                            <i className="fas fa-phone"></i>
                            {/* udStartupFounderMobileNumber */}
                            {(item.udStartupFounderMobileCountryCode || "") +
                              item.udStartupFounderMobileNumber &&
                            item.udStartupFounderMobileNumber.length > 8
                              ? item.udStartupFounderMobileNumber.substring(
                                  0,
                                  2
                                ) +
                                "XXXXX" +
                                item.udStartupFounderMobileNumber.substring(7)
                              : item.udStartupFounderMobileNumber}
                          </li>
                          <li>
                            <i className="fas fa-envelope"></i>
                            {/* udEmail */}
                            {item.udEmail && item.udEmail.includes("@")
                              ? item.udEmail.substring(
                                  0,
                                  item.udEmail.indexOf("@") - 3
                                ) +
                                "***" +
                                "@" +
                                item.udEmail
                                  .substring(item.udEmail.indexOf("@") + 1)
                                  .replace(/[^.]+/, "***")
                              : item.udEmail}
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i>
                            {/* udAddress */}
                            {item.udAddress}
                          </li>
                        </ul>
                        <div className="social-icons d-flex justify-content-center">
                          {item.udSocialYouTube &&
                            item.udSocialYouTube != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialYouTube)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/youtube.png"
                                  alt="YouTube"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                          {item.udSocialInsta && item.udSocialInsta != "" && (
                            <a
                              href={getAbsoluteUrl(item.udSocialInsta)}
                              target="_blank"
                              className="social-icon"
                            >
                              <img
                                  src="/assets/logo/instagram.png"
                                  alt="Instagram"
                                  width="24"
                                  height="24"
                                />
                            </a>
                          )}
                          {item.udSocialFacebook &&
                            item.udSocialFacebook != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialFacebook)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/facebook.png"
                                  alt="Facebook"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                          {item.udSocialLinkedIn &&
                            item.udSocialLinkedIn != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialLinkedIn)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/linkedin.png"
                                  alt="Linkedin"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="col-md-8 center-class my-2  ">
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="company-info-list">
                            <li>
                              <span>Legal Name</span>
                              <p>{item.udLegalname}</p>
                            </li>

                            <li>
                              <span>Website</span>
                              <p>
                                <a
                                  href={
                                    item.udWebsite
                                      ? getAbsoluteUrl(item.udWebsite)
                                      : "#"
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {/* udWebsite */}
                                  {item.udWebsite}
                                </a>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="company-info-list">
                            <li>
                              <span>Founded</span>
                              <p>
                                {item.udFoundedon
                                  ? moment(item.udFoundedon).format(
                                      "DD-MM-YYYY"
                                    )
                                  : ""}
                              </p>
                            </li>

                            <li>
                              <span>Employees</span>
                              <p>{item.udEmployees}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="container text-section">
                  <div className="row">
                    <div className="col-md-12 text-center my-5">
                      <button
                        onClick={openiamintrest}
                        className="primaryInterested"
                        style={{
                          // height: "100%",
                          backgroundColor: "#191964",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0px 3px 6px #000",
                        }}
                      >
                        I am Interested
                      </button>
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
          <div className="col-md-8 col-12 col-sm-8 col-xl-8 col-xxl-8">
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
                    <div  className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I Want to know more about it"
                        value={data["I Want to know more about it"]}
                        checked={data["I Want to know more about it"] == true}
                        onClick={adddata}
                      />
                      <label style={{cursor:"pointer"}}  onClick={() => { setdata({ "I Want to know more about it": true  }) }} htmlFor="">
                        I want to know more about your startup
                      </label>
                    </div>
                    <div  className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I want to work with you"
                        value={data["I want to work with you"]}
                        checked={data["I want to work with you"] == true}
                        onClick={adddata}
                      />
                      <label style={{cursor:"pointer"}} onClick={() => { setdata({ "I want to work with you": true  }) }} htmlFor="">I want to explore collaboration </label>
                    </div>
                    <div  className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I am excited to invest in your startups"
                        value={data["I am excited to invest in your startups"]}
                        checked={
                          data["I am excited to invest in your startups"] ==
                          true
                        }
                        onClick={adddata}
                      />
                      <label style={{cursor:"pointer"}} htmlFor="" onClick={() => { setdata({ "I am excited to invest in your startups": true  }) }} >
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
