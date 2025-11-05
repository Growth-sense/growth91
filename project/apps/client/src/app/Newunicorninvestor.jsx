import React, { useEffect, useState } from 'react';
import { NewWebFooter } from './common/NewWebFooter';
import NewWebHeader from './common/NewWebHeader';
import { Link } from '@material-ui/core';
import { Link as NewLINK } from 'react-router-dom/cjs/react-router-dom.min';
import Bridge from './constants/Bridge';
import { LastUpdatedBadge } from './components/LastUpdatedBadge';
import { parseBannerImage } from './helper/utilHelper.js';

const NewFutureUnicorn = () => {
  const [filteredData, setfilterdata] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [screenSize, setScreenSize] = useState('desktop');
  const [hasMoreItems, setHasMoreItems] = useState(false);

  // Function to detect screen size and determine items per page
  const getItemsPerPage = (availableItemsCount = 0) => {
    const width = window.innerWidth;
    let columns;
    let screenType;
    let rowsToShow = 2; // Default to 2 rows

    // Determine columns and screen type based on screen size
    if (width >= 1440) {
      columns = 4;
      screenType = 'desktop';
    } else if (width >= 1200) {
      columns = 4;
      screenType = 'large-laptop';
    } else if (width >= 1024) {
      columns = 3;
      screenType = 'laptop';
    } else if (width >= 992) {
      columns = 3;
      screenType = 'large-tablet';
    } else if (width >= 768) {
      columns = 2;
      screenType = 'tablet';
      rowsToShow = 3; // Show 3 rows on tablet
    } else if (width >= 576) {
      columns = 2;
      screenType = 'large-mobile';
      rowsToShow = 3; // Show 3 rows on large mobile
    } else {
      columns = 1;
      screenType = 'mobile';
      rowsToShow = 6; // Show 6 rows on mobile
    }

    // Calculate items per page based on available highlighted items
    let actualItemsPerPage;
    const idealItemsPerPage = columns * rowsToShow;

    if (availableItemsCount === 0) {
      // No items available, return 0
      actualItemsPerPage = 0;
    } else if (availableItemsCount <= idealItemsPerPage) {
      // We have fewer or equal items than ideal, show all available items
      actualItemsPerPage = availableItemsCount;
    } else {
      // We have more items than ideal, limit to ideal count
      actualItemsPerPage = idealItemsPerPage;
    }

    return {
      itemsPerPage: actualItemsPerPage,
      columns,
      screenType,
      availableItems: availableItemsCount,
      hasMoreItems: availableItemsCount > actualItemsPerPage
    };
  };

  // Function to handle responsive display
  const updateDisplayedItems = (data) => {
    const availableCount = data ? data.length : 0;
    const { itemsPerPage, screenType, hasMoreItems } = getItemsPerPage(availableCount);
    setScreenSize(screenType);

    if (data && data.length > 0 && itemsPerPage > 0) {
      // Limit items to show complete rows only based on actual highlighted count
      const itemsToShow = data.slice(0, itemsPerPage);
      setDisplayedItems(itemsToShow);
      setHasMoreItems(hasMoreItems);
    } else {
      setDisplayedItems([]);
      setHasMoreItems(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateDisplayedItems(filteredData);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredData]);

  function getuniondata() {
    let params = {
      page: 0,
      udPublished: "Published",
      pagesize: 10,
    };
    Bridge.Unicorn.unicorndealsByInvestors(params).then((result) => {
      // from result.data only select where isHighlighted is true
      let filtered = result.data.filter((item) => item.isHighlighted == true);
      setfilterdata(filtered);
      updateDisplayedItems(filtered);
    });
  }
  useEffect(() => {
    getuniondata();
  }, []);
  return (
    <div>
      <style>
        {`
                   
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


@media only screen and (max-width: 600px) {
    .founder-benefit .features {
        display: block;
        gap: 30px;  /* This adds space between child elements */
        padding: 15px; /* Optional: Add padding for better spacing around the content */
        margin: 0 auto; /* Optional: Centers the element horizontally */
        width: 100%; /* Optional: Makes the element as wide as the parent allows */
    }

        .features-list {
                    
                        display: grid;
                        grid-template-columns: repeat(1, 1fr);
                      
                        margin : 20px 20px;
                    }

        .join-divide .index-button-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
    }
      .founder-benefit .feature-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 20px;
}
}
                /* Responsive Card Layout Styles */
                .card-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 20px;
                    box-sizing: border-box;
                }

                .cards-grid {
                    display: grid;
                    gap: 24px;
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
                    .card-container {
                        padding: 0 40px;
                    }
                }

                /* Large Laptop (≥1200px): 4 cards per row */
                @media (min-width: 1200px) and (max-width: 1439px) {
                    .cards-grid {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                        gap: 24px;
                        align-items: stretch;
                    }
                }

                /* Laptop (≥1024px): 3 cards per row */
                @media (min-width: 1024px) and (max-width: 1199px) {
                    .cards-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 20px;
                        align-items: stretch;
                    }
                }

                /* Large Tablet (≥992px): 2 cards per row */
                @media (min-width: 992px) and (max-width: 1023px) {
                    .cards-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
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
                    .card-container {
                        padding: 0 15px;
                    }
                }

                /* Large Mobile (≥576px): 2 cards per row */
                @media (min-width: 576px) and (max-width: 767px) {
                    .cards-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 16px;
                        align-items: stretch;
                    }
                    .card-container {
                        padding: 0 20px;
                        margin: 0 10px;
                    }
                }

                /* Small Mobile (<576px): 1 card per row */
                @media (max-width: 575px) {
                    .cards-grid {
                        grid-template-columns: minmax(0, 1fr);
                        gap: 16px;
                        align-items: stretch;
                    }
                    .card-container {
                        padding: 0 20px;
                        margin: 0 15px;
                    }
                }

                /* Card Styles */
                .grid-card-item {
                    width: 100%;
                    min-width: 0;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
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
                    margin: 0 5px;
                }

                .community-all-contents:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .img-community-box {
                    width: 100%;
                    height: 180px;                /* desktop default */
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px 12px 0 0;
                    background: #ffffff;          /* neutral background for letterboxing */
                    display: flex;
                    align-items: center;          /* vertical center */
                    justify-content: center;      /* horizontal center */
                }

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

                .community-paragraph-box {
                    padding: 20px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .community-paragraph-box ul {
                    margin: 0 0 15px 0;
                    padding: 0;
                    list-style: none;
                }

                .community-paragraph-box ul li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 10px;
                    min-height: 50px;
                }

                .community-paragraph-box ul li img {
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    object-fit: contain;
                    flex-shrink: 0;
                }

                .community-paragraph-box ul li h5 {
                    margin: 0;
                    font-size: 1.05em;
                    font-weight: 600;
                    color: #1f2937;
                    line-height: 1.3;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-word;
                    hyphens: auto;
                }

                .community-paragraph-box p {
                    color: #6b7280;
                    font-size: 0.95em;
                    line-height: 1.5;
                    margin: 10px 0 0 0;
                    flex-grow: 1;
                }

                .card-bottom-container {
                    padding: 15px 20px 20px 20px;
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fafafa;
                }

                .btn-com {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-size: 0.9em;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }

                .btn-com:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                    color: white;
                    text-decoration: none;
                }

                /* Tag Styles */
                .tag-container {
                    margin: 8px 0 12px 0;
                }

                .tag-item {
                    display: inline-block;
                    background-color: #e6f7ff;
                    color: #0066cc;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 500;
                    margin-right: 6px;
                    margin-bottom: 4px;
                }

                /* Responsive adjustments for smaller screens */
                @media (max-width: 768px) {
                    .img-community-box {
                        height: 200px;
                    }
                    
                    .community-paragraph-box {
                        padding: 15px;
                    }
                    
                    .card-bottom-container {
                        padding: 12px 15px 15px 15px;
                        flex-direction: row;
                        gap: 8px;
                        align-items: center;
                        justify-content: space-between;
                    }
                    
                    .community-paragraph-box ul li h5 {
                        font-size: 0.95em;
                        -webkit-line-clamp: 2;
                    }
                    
                    .community-paragraph-box p {
                        font-size: 0.9em;
                    }

                    /* Mobile container spacing */
                    .card-container {
                        padding: 0 25px !important;
                        margin: 0 10px !important;
                    }

                    /* Mobile card spacing */
                    .community-all-contents {
                        margin: 0 2px;
                    }
                }

                @media (max-width: 480px) {
                    .img-community-box {
                        height: 200px;
                    }
                    
                    .community-paragraph-box ul li img {
                        width: 35px;
                        height: 35px;
                    }
                    
                    .community-paragraph-box ul li h5 {
                        font-size: 0.9em;
                        -webkit-line-clamp: 2;
                    }
                    
                    .tag-item {
                        font-size: 10px;
                        padding: 3px 6px;
                    }

                    /* Ensure button layout is consistent on very small screens */
                    .card-bottom-container {
                        padding: 10px 15px 15px 15px;
                        flex-direction: row;
                        gap: 6px;
                        align-items: center;
                        justify-content: space-between;
                    }

                    /* Slightly smaller button on very small screens but same style */
                    .btn-com {
                        font-size: 0.85em;
                        padding: 6px 12px;
                    }
                }

                /* Additional responsive fixes for desktop grid */
                @media (min-width: 1440px) {
                    .community-paragraph-box ul li h5 {
                        font-size: 1em;
                        -webkit-line-clamp: 2;
                    }

                     /* Fix card bottom spacing on large laptop */
    .card-bottom-container {
        padding: 15px 22px 20px 10px;
        gap: 12px;
    }
                }

               @media (min-width: 1200px) and (max-width: 1439px) {
    .community-paragraph-box ul li h5 {
        font-size: 0.98em;
        -webkit-line-clamp: 2;
    }

   
}
                /* Responsive font sizes for titles on smaller screens */
                @media (max-width: 768px) {
                    .hero h1 {
                        font-size: 3em;
                    }
                    .hero p {
                        font-size: 1.2em;
                    }
                    .why-to-list h2 {
                        font-size: 2em;
                    }
                    .key-features h2 {
                        font-size: 2em;
                    }
                    .founder-benefit h2 {
                        font-size: 2em;
                    }
                }

                @media (max-width: 480px) {
                    .hero h1 {
                        font-size: 2.5em;
                    }
                    .hero p {
                        font-size: 1em;
                    }
                    .why-to-list h2 {
                        font-size: 1.8em;
                    }
                    .key-features h2 {
                        font-size: 1.8em;
                    }
                    .founder-benefit h2 {
                        font-size: 1.8em;
                    }
                }
                /* Override kstyle.css global styles with higher specificity */
                .grid-card-item .img-community-box,
                .community-all-contents .img-community-box {
                    border-top: none !important;
                    border: none !important;
                    padding: 0 !important;
                    background: transparent !important;
                }

                /* Explicit mobile heights for consistent look */
                @media (min-width: 576px) and (max-width: 767px) {
                    .img-community-box { height: 200px; }
                }

                @media (max-width: 768px) {
                    .img-community-box { height: 200px; }
                }

                @media (max-width: 480px) {
                    .img-community-box { height: 200px; }
                }
                `}
      </style>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>
      {/* <NewWebHeader /> */}
      <section className="banner_section">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="slider-area">
                  <div className="item">
                    <div className="row align-items-center">
                      <div className="col-lg-6 col-xl-24 col-sm-24">
                        <div className="left-content" style={{ textAlign: "center" }}>
                          <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                            Future Unicorns

                          </h2>
                          <span className="text-white " style={{ fontSize: "1.5em" }}>
                            Connecting innovative startups with visionary investors on Growth91 platform.


                          </span>
                          {/* <ul className="text-white">
                                                    <li><a href="Howitworks.html" className=""><span><img src="./web/images/hand-index.svg" width="24" alt="img"/> </span><u>How do i invest?</u></a></li>
                                                    <li><a href="Howitworks2.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What are the risks?</a></li>
                                                    <li><a href="Howitworks3.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What is T-SAFE?</a></li>
                                                    <li><a href="Howitworks4.html" className=""><span></span><span><img src="./web/images/hand-index.svg" width="24"  alt="img"/> </span>What are Growth91's fees?</a></li>
                                                    <span className="">
                                                      </span>
                                                </ul>                                                    --> */}

                          <form
                            className="input_box wow fadeInUp mt-4"
                            data-wow-delay="0.7s"
                          >
                            <div className="form-wraper justify-content-center">

                              {/* <a
                                    href="/synergy-form"
                                    className="theme-btn "
                                    type="button"
                                  >
                                    Let's Connect
                                  </a> */}
                              <NewLINK to="FutureUnicornList" class="theme-btn center-btn"  >Explore Investments</NewLINK>

                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className="right-side-images wow fadeInRight"
                          data-wow-delay="0.6s"
                        >
                          <img src="./web/images/unicorn.webp" class="unicorn-img" alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <div class="heading-title founder-text">
        <p>
          <span></span>{" "}
        </p>
        <h2>Unicorn Spotlight</h2>
      </div>
      {/* I want below div to be only covering 80% width */}
      <div className='row justify-content-center'>
        <div className="card-container">
          <div className="cards-grid">
            {displayedItems && displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <div key={index} className="grid-card-item"
                  onClick={() => { window.location.assign(`/FutureUnicornDescription?id=${item.unicornDealID}`) }}>
                  <div
                    className="community-all-contents"
                    style={{
                      minHeight: "300px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      position: "relative",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.backgroundColor = "lightgray";
                      e.currentTarget.style.zIndex = "100";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.zIndex = "1";
                    }}
                  >
                    <div className="img-community-box">
                      <img
                        src={
                          (item.udBannerImage &&
                            `${process.env.REACT_APP_BASE_URL
                            }api/uploads/unicorndeals/${item.tudTempUdID
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
                                `${process.env.REACT_APP_BASE_URL
                                }api/uploads/unicorndeals/${item.tudTempUdID
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
                        onClick={() => { window.location.replace(`/FutureUnicornDescription?id=${item.unicornDealID}`) }}
                        // to={`/FutureUnicornDescription?id=${item.unicornDealID}`}
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
              <></>
            )}
          </div>
        </div>
      </div>

      {filteredData && filteredData.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary btn-lg px-4 py-2 shadow-lg"
            style={{
              marginTop: "2rem",
              background: "linear-gradient(to right, #2b2f77, #4e54c8)", // Darker gradient
              border: "none",
              transition: "all 0.3s ease",
            }}
            onClick={() => { window.location.replace("/FutureUnicornList") }}
          >
            Explore all
          </button>
        </div>
      )}

      {/* Why to list section */}


      {/* Key Features Section */}








      <div className="key-features ">
        {/* <h2>Key Features</h2> */}
        <div class="heading-title founder-text">
          <p>
            <span></span>{" "}
          </p>
          <h3>Key Features</h3>
        </div>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-item-number">1</div>
            <div className="feature-description">
              <h3>Startup Submission Form</h3>
              <p>Intuitive interface for founders to submit company details and documentation.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item-number">2</div>
            <div className="feature-description">
              <h3>Startup Directory</h3>
              <p>Searchable database with detailed profiles and industry insights.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item-number">3</div>
            <div className="feature-description">
              <h3>Investor Dashboard</h3>
              <p>Personalized recommendations and notifications for new investment opportunities.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item-number">4</div>
            <div className="feature-description">
              <h3>Security and Compliance</h3>
              <p>Robust data protection and thorough startup verification process.</p>
            </div>
          </div>
        </div>
      </div>



      <section class="custom-section">
        <div class="join-section join-sec-yellow join-sec-white undefined join-divide mobile-join">
          {/* <h4>Join us</h4> */}
          <div className="join-flex-one-us">
            <h2>
              Join Us to Invest in Startups in India and Support Breakthrough
              Ventures
            </h2>
            <p class="index_pitch">
              Decades of banking, investing & startup success guide your
              investments. Invest confidently with us.
            </p>
          </div>
          {/* <div class="index-button-1">
            <Link to="/Deals" style={{ color: "white" }}>
              Sign Up and Start Investing
            </Link>
          </div> */}
        </div>
      </section>
      <NewWebFooter />

    </div>
  );
};

export default NewFutureUnicorn;
