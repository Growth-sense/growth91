import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import NewWebHeader from "../../common/NewWebHeader.jsx";
import { NewWebFooter } from "../../common/NewWebFooter.jsx";
import { Modal, message as mess, Spin } from "antd";
import SinglePagePDFViewer from "./../../components/PdfViewer/single-page";


import Bridge from "./../../constants/Bridge.js";


// import SinglePagePDFViewer from "./components/PdfViewer/single-page";

export const Preview = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state) {
      setunicorn(location.state)

    }

    console.log(location);
  }, []);


  const [unicorn, setunicorn] = useState()
  console.log(unicorn);
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
  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    getuniondata();
    window.scrollTo(0, 0);
  }, []);
  console.log(id);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // const [unicorn, setUnicorn] = useState();
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
      // setUnicorn(result.data);
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
  const dat = JSON.stringify(localStorage.getItem("investor_id"));
  return (
    <div style={{ backgroundColor: "#F8F9FA" }}>
      <style>
        {`

      
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
}

.media-card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.media-card-content {
  padding: 20px;
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
  background: linear-gradient(90deg, #5c33cf, #7d56d9);
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
  color: #5c33cf;
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
  color: #5c33cf;
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
        [unicorn].map((item, index) => {
          console.log(item);

          return (
            <>

              <section className="design-space">
                <div className="container">
                  {/* Image Section */}
                  <div
                    className="image-section"
                    style={{ borderRadius: "15px", border: "1px solid #ddd", marginTop: "-5px" }}
                  >
                    {/* Add your image manually here */}
                    <img
                      className="heroSectionImage"
                      src={
                        (item.udBannerImage &&
                          `${process.env.REACT_APP_BASE_URL
                          }api/uploads/unicorndeals/${item.tudTempUdID
                          }/${JSON.parse(item.udBannerImage)}`) ||
                        "https://growth91.com/api/uploads/deal/banner/34/1719999515.jpg"
                      }
                      alt="Team"
                    />
                  </div>

                  <div className="content-section-banner d-flex ps-4 gap-5">
                    {/* Logo Section */}
                    <div className="logo-section">
                      {/* Replace with your logo */}
                      {/* <img
                        src={
                          (item.udLogoImage &&
                            `${process.env.REACT_APP_BASE_URL
                            }api/uploads/unicorndeals/${item.tudTempUdID
                            }/${JSON.parse(item.udLogoImage)}`) ||
                          "https://growth91.com/api/uploads/deal/logo/34/1719999515.jpg"
                        }
                        alt="Logo"
                        style={{
                          borderRadius: "50%",
                          boxShadow: "0px 3px 6px #000",
                        }}
                      /> */}

                      <img
                        src={`${process.env.REACT_APP_BASE_URL
                          }api/uploads/unicorndeals/${item.tudTempUdID
                          }/${JSON.parse(item.tudLogoImage)}`}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          boxShadow: "0px 3px 6px #000",
                        }}
                      />
                    </div>

                    {/* Text Section */}
                    <div className="text-section">
                      <h1>{item.udPrimaryContactName}</h1>
                      {item.tudPrimaryContactName &&
                        <div className="content-certify-directors">
                          <h3>{item.tudPrimaryContactName}</h3>
                          <p>
                            <span></span>
                            {/* Certified Corporate Director - Business Management
                            Consultant */}
                          </p>
                        </div>
                      }
                      <button
                        onClick={openiamintrest}
                        className="primaryInterested"
                        style={{
                          // height: "100%",
                          backgroundColor: "#5C33CF",
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
                    backgroundColor: "#5C33CF",
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
                      <p className="about-text">{item.tudDealDescription}</p>
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


              <section className="container my-5">
                <h2 className="text-center mb-4">Highlights</h2>

                <div className="row">
                  {/* Highlight 1 */}

                  {item.tudStartupHighlights &&
                    JSON.parse(item.tudStartupHighlights).map(
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
                              <div className="d-flex">
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


              <section className="container my-5">
                <h2 className="text-center mb-3">Team</h2>
                <div className="row row-box-linse Grid-team px-1">
                  {item.tudVendorId &&
                    JSON.parse(item.tudVendorId).map(
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
                                  "linear-gradient(90deg, #5C33CF, #7D56D9)",
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
                            <div className="p-3" style={{ height: "210px" }}>
                              <p className="p-4">
                                {itemudVendorId.description1
                                  ? itemudVendorId.description1
                                  : "Description not available for this team member."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </section>




              <section className="container my-5  market-overview-section">
                <h2 className="text-center mb-5">Market Overview</h2>
                <div className="row market-overreview-row">
                  {item.tudMark &&
                    JSON.parse(item.tudMark).map((itemudMark, index) => (
                      <div className="col-md-4 mb-4" key={index}>
                        <div className="market-overview-card">
                          <p>
                            {itemudMark.content1 || "Content not available"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </section>



              {item.tudMediaCoverageFiles &&
                JSON.parse(item.tudMediaCoverageFiles).length > 0 && (
                  <section className="container my-5 media-coverage-section">
                    <h2 className="text-center mb-4">Media Coverage</h2>
                    <div className="row">
                      {JSON.parse(item.tudMediaCoverageFiles).map(
                        (
                          itemudMediaCoverageFiles,
                          indexudMediaCoverageFiles
                        ) => (
                          <div
                            className="col-md-4 mb-4"
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
                                <p className="media-card-date">
                                  Description Details
                                </p>
                                <p>
                                  {itemudMediaCoverageFiles.content}{" "}
                                  <a
                                    href={itemudMediaCoverageFiles.content}
                                    className="read-more-link"
                                  >
                                    Read More..
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
                  </section>
                )}



              <section>
                <div className="container">
                <h2 className="text-center mb-5">Investor Presentation</h2>

                  <div className="row">
                    <div className="col-md-12">
                      {/* blue bg */}
                      <div
                        className="shadow-lg p-5"
                        style={{
                          backgroundColor: "#5C33CF",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        {console.log(
                          `${process.env.REACT_APP_BASE_URL
                          }api/uploads/unicorndeals/${item.tudTempUdID
                          }/${JSON.parse(item.tudPitchDeck)}`
                        )}
                        {/* <SinglePagePDFViewer pdf={udPitchDeck/samplePDF} /> */}
                        
                        <SinglePagePDFViewer
                          pdf={`${process.env.REACT_APP_BASE_URL
                            }api/uploads/unicorndeals/${item.tudTempUdID
                            }/${JSON.parse(item.tudPitchDeck)}`}
                        />
                          {/* {item.tudPitchDeck &&
                              <div class="accordion-body">
                                <iframe
                                  src={`${process.env.REACT_APP_BASE_URL
                                    }api/uploads/unicorndeals/${item.tudTempUdID
                                    }/${JSON.parse(item.tudPitchDeck)}`}
                                  frameborder="0"
                                  height={"500px"}
                                  width={"100%"}
                                ></iframe>
                                
                              </div>} */}


                      </div>
                    </div>
                  </div>
                </div>
              </section>


              <section className="container my-5 videos-section">
                  <h2 className="text-center mb-5">Videos</h2>
                  <div className="video-slide">
                    <iframe
                      style={{
                        boxShadow: '0px 3px 6px #000',
                        borderRadius: 3,
                      }}
                      width="100%"
                      height="435"
                      src={`https://www.youtube.com/embed/${item.tudYoutubeLink
                        .split("=")
                        .pop()}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>


                  <section className="container my-5 contact-us-section">
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
                                            {item.tudStartupFounderMobileNumber}
                                          </li>
                                          <li>
                                            <i className="fas fa-envelope"></i>
                                            {/* udEmail */}
                                            {item.tudEmail}
                                          </li>
                                          <li>
                                            <i className="fas fa-map-marker-alt"></i>
                                            {/* udAddress */}
                                            {item.tudAddress}
                                          </li>
                                        </ul>
                                        <div className="social-icons d-flex justify-content-center">
                                          <a href="#youtube" className="social-icon">
                                            <Link
                                              to={`//${item.tudSocialYouTube}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <i className="fab fa-youtube"></i>
                                            </Link>
                                          </a>
                                          <a href="#instagram" className="social-icon">
                                            <Link
                                              to={`//${item.tudSocialInsta}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <i className="fab fa-instagram"></i>
                                            </Link>
                                          </a>
                                          <a href="#facebook" className="social-icon">
                                            <Link
                                              to={`//${item.tudSocialFacebook}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <i className="fab fa-facebook-f"></i>
                                            </Link>
                                          </a>
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
                                              <p>{item.tudLegalname}</p>
                                            </li>
                
                                            <li>
                                              <span>Status</span>
                                              <p>Private Limited Company</p>
                                            </li>
                
                                            <li>
                                              <span>Website</span>
                                              <p>
                                                <a
                                                  href={`//${item.tudWebsite}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  {/* udWebsite */}
                                                  {item.tudWebsite}
                                                </a>
                                              </p>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-md-6">
                                          <ul className="company-info-list">
                                            <li>
                                              <span>Founded</span>
                                              <p>{item.tudFoundedon}</p>
                                            </li>
                
                                            <li>
                                              <span>Employees</span>
                                              <p>{item.tudEmployees}</p>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>










              <section class="futureunicorn-slider-sections">
                <div class="container-flex">

                  <div className="row row-imgdirects">
                    <div className="row-img-direct">
                      {item.tudLogoImage &&
                        <div className="img-certified-directors">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL
                              }api/uploads/unicorndeals/${item.tudTempUdID
                              }/${JSON.parse(item.tudLogoImage)}`}
                            alt=""
                          />
                        </div>
                      }
                      {item.tudPrimaryContactName &&
                        <div className="content-certify-directors">
                          <h3>{item.tudPrimaryContactName}</h3>
                          <p>
                            <span></span>
                            {/* Certified Corporate Director - Business Management
                            Consultant */}
                          </p>
                        </div>
                      }
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
                  {item.tudPrimaryContactMobile &&
                    <div className="row row-imgdirects bg-box-futures d-none">
                      <ul className="grid-box-futures">
                        <li>
                          <span>
                            <a href={`tel:${item.tudPrimaryContactMobile}`}>
                              <img src="./assets/images/telephone.png" alt="" />
                            </a>
                          </span>
                          <span value={item.tudPrimaryContactMobile}>Call</span>
                        </li>
                        <li>
                          <span>
                            <a href={`sms:${item.tudPrimaryContactMobile}`}>
                              <img src="./assets/images/chat.png" alt="" />
                            </a>
                          </span>
                          <span value={item.tudPrimaryContactMobile}>Message</span>
                        </li>
                        <li>
                          <span>
                            <a href={`mailto:${item.tudPrimaryContactEmail}`}>
                              <img src="./assets/images/email.png" alt="" />
                            </a>
                          </span>
                          <span value={item.tudPrimaryContactEmail}>Email</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/phone.png" alt="" />
                          </span>
                          <span value={item.tudPrimaryContactEmail}>Whatsapp</span>
                        </li>
                        <li>
                          <span>
                            <Link
                              to={`//${item.tudSocialFacebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="./assets/images/messenger.png" alt="" />
                            </Link>
                          </span>
                          <span value={item.tudSocialFacebook}>Messanger</span>
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

                          <span value={item.tudSocialOthers}>Website</span>
                        </li>
                        <li>
                          <span>
                            <img src="./assets/images/thumb-up.png" alt="" />
                          </span>
                          <span>Social</span>
                        </li>
                      </ul>
                    </div>}
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
                        <div class="accordion-item" style={{ border: "none" }}>
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
                          {item.tudDealDescription &&
                            <div class="accordion-body about-us-p">
                              <p>{item.tudDealDescription}</p>
                            </div>}
                        </div>
                        <div class="accordion-item" style={{ border: "none" }}>
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
                              {item.tudStartupHighlights &&
                                JSON.parse(item.tudStartupHighlights).map(
                                  (
                                    itemstartuphighlight,
                                    indexstartuphighlight
                                  ) => {
                                    return (
                                      <div
                                        className={`col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12  ${itemstartuphighlight.content1 == ""
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
                                                {itemstartuphighlight.content1}
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
                        <div class="accordion-item" style={{ border: "none" }}>
                          <h3
                            class="accordion-header"
                            id="flush-headingdetails"
                          >
                            <div class="default-Show">
                              <span>
                                <img
                                  src="./assets/images/group-chat.png"
                                  alt=""
                                />
                              </span>
                              Team
                            </div>
                          </h3>

                          <div class="accordion-body ">
                            <div className="row row-box-linse Grid-team">
                              {item.tudVendorId &&
                                JSON.parse(item.tudVendorId).map(
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
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {itemudVendorId.name}
                                              </h3>
                                              <p
                                                style={{
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {itemudVendorId.Role}
                                              </p>
                                              <ul>
                                                <li>
                                                  {itemudVendorId.description1}
                                                </li>
                                                <li>
                                                  {itemudVendorId.description2}
                                                </li>
                                              </ul>
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
                        <div class="accordion-item">
                          <h3 class="accordion-header" id="flush-headingThree">
                            <div class="default-Show">
                              <span>
                                <img
                                  src="./assets/images/market-research.png"
                                  alt=""
                                />
                              </span>
                              Market Overview
                            </div>
                          </h3>

                          <div class="accordion-body">
                            <div className="row market-overreview-row">
                              {item.tudMark &&
                                JSON.parse(item.tudMark).map(
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
                                {item.tudMediaCoverageFiles &&
                                  JSON.parse(item.tudMediaCoverageFiles).map(
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
                                                {itemudMediaCoverageFiles.title}
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
                          <h3 class="accordion-header" id="flush-headingfour">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-headingfournew"
                              aria-expanded="false"
                              aria-controls="flush-headingfour"
                            >
                              <span>
                                <img src="./assets/images/gallery.png" alt="" />
                              </span>
                              Investor Presentation
                            </button>
                          </h3>
                          <div
                            id="flush-headingfournew"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingfour"
                            data-bs-parent="#accordionFlushExample"
                          >
                            {item.tudPitchDeck &&
                              <div class="accordion-body">
                                <iframe
                                  src={`${process.env.REACT_APP_BASE_URL
                                    }api/uploads/unicorndeals/${item.tudTempUdID
                                    }/${JSON.parse(item.tudPitchDeck)}`}
                                  frameborder="0"
                                  height={"500px"}
                                  width={"100%"}
                                ></iframe>
                                {/* <div className="row justify-content-center">
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                    <div className="img-future-gallery">
                                      <img
                                        src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div> */}
                              </div>}
                          </div>
                        </div>

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
                                <img src="./assets/images/mobile.png" alt="" />
                              </span>
                              Videos
                            </button>
                          </h3>
                          <div
                            id="flush-headingWaitnew"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingWait"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body connect-acc-us">
                              <div className="row justify-content-center">
                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                  {item.tudYoutubeLink &&
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
                                        src={`https://www.youtube.com/embed/${item.tudYoutubeLink
                                          .split("=")
                                          .pop()}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      ></iframe>
                                    </div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h3 class="accordion-header" id="flush-headingfive">
                            <div class="default-Show">
                              <span>
                                <img src="./assets/images/mobile.png" alt="" />
                              </span>
                              Contact Us
                            </div>
                          </h3>

                          <div class="accordion-body connect-acc-us">
                            <div className="row row-box-line">
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudLegalname &&
                                  <div className="lets-talks-div">
                                    <h3>Legal Name</h3>
                                    <ul>
                                      <li>
                                        <span>{item.tudLegalname}</span>
                                      </li>
                                    </ul>
                                  </div>}
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudLegalname &&
                                  <div className="lets-talks-div">
                                    <h3>Founded</h3>
                                    <ul>
                                      <li>
                                        <span>{item.tudFoundedon}</span>
                                      </li>
                                    </ul>
                                  </div>}
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudAddress &&
                                  <div className="lets-talks-div">
                                    <h3>Let's Meet</h3>
                                    <ul>
                                      <li>
                                        <span>Corporate Office :</span>
                                        <span>{item.tudAddress}</span>
                                      </li>
                                    </ul>
                                  </div>
                                }
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudEmployees &&
                                  <div className="lets-talks-div">
                                    <h3>Employees</h3>
                                    <ul>
                                      <li>
                                        <span>{item.tudEmployees}</span>
                                      </li>
                                    </ul>
                                  </div>}
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudWebsite &&
                                  <div className="lets-talks-div">
                                    <h3>Visit Us</h3>
                                    <ul>
                                      <li>
                                        <Link
                                          to={`//${item.tudWebsite}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <span
                                            style={{
                                              textTransform: "lowercase",
                                            }}
                                          >
                                            {item.tudWebsite}
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                }
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                {item.tudSocialInsta &&
                                  <div className="lets-talks-div">
                                    <h3>Follow Us</h3>
                                    <ul>
                                      <li>
                                        <Link
                                          to={`//${item.tudSocialInsta}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i class="fa-brands fa-instagram"></i>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to={`//${item.tudSocialYouTube}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i class="fa-brands fa-youtube"></i>
                                        </Link>
                                      </li>

                                      <li>
                                        <Link
                                          to={`//${item.tudSocialFacebook}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i class="fa-brands fa-facebook"></i>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                }
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

                </div>
              </section>













            </>
          );
        })}

      <ToastContainer />
      <NewWebFooter />
    </div>
  );
};