import React from 'react';
import { NewWebFooter } from './common/NewWebFooter';
import NewWebHeader from './common/NewWebHeader';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Newunicornfounder = () => {
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
                        // display: flex;
                        // flex-direction: column;
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 50px;
                        align-items: flex-start;
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
    background: #100050;
    padding: 50px 20px;
    text-align: center;
}

.founder-benefit h2 {
    color: #ffffff !important;
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

                `}
            </style>
        <NewWebHeader newabout={"newabout"}/>
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
                          <div className="left-content"style={{textAlign : "center"}}>
                            <h2 className="wow fadeInUp " data-wow-delay="0.3s">
                            Future Unicorns

                            </h2>
                            <span className="text-white " style={{fontSize : "1.5em"}}>
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
                              <div className="form-wraper">
                               
                                  {/* <a
                                    href="/synergy-form"
                                    className="theme-btn "
                                    type="button"
                                  >
                                    Let's Connect
                                  </a> */}
                                  <NavLink to="FutureUnicornForm"  className="theme-btn " >List Your Startup</NavLink>
                                  <NavLink to="FutureUnicornList"  className="theme-btn " >Explore Investments</NavLink>
                            
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div
                            className="right-side-images wow fadeInRight"
                            data-wow-delay="0.6s"
                          >
                            <img src="./web/images/left.png" alt="img" />
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

{/* 
            <div className="hero">
                <div>
                    <h1>Future Unicorns</h1>
                    <p>Connecting innovative startups with visionary investors on Growth91 platform.</p>
                    <div className="buttons">
                        <NavLink to="FutureUnicornForm">List Your Startup</NavLink>
                        <NavLink to="FutureUnicornList">Explore Investments</NavLink>
                    </div>
                </div>
            </div> */}

            {/* Why to list section */}
            <div className="why-to-list">
                {/* <h2>Why to list?</h2> */}
                <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h2>Why to list?</h2>
              </div>
                <div className="features">
                    <div className="feature-box">
                        <h3>Dedicated Platform</h3>
                        <p>Future Unicorns streamlines startup listings and investor decision-making.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Comprehensive Information</h3>
                        <p>Provides detailed startup profiles, pitch decks.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Investment Flexibility</h3>
                        <p>Allows investments from NRO/Indian and NRE/overseas accounts with founder consent.</p>
                    </div>
                </div>
            </div>
            <div className="why-to-list founder-benefit">
    {/* <h2>Benefits for</h2> */}
    <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h2 style={{color:"white"}}>Benefits for Founders</h2>
              </div>
    <div className="features">
        <div className="feature-box">
            <h3>Simplified Listing</h3>
            <p>Easy process to showcase startups to potential investors.</p>
        </div>
        <div className="feature-box">
            <h3>Increased Visibility</h3>
            <p>Access to a diverse investor base for greater exposure.</p>
        </div>
        <div className="feature-box">
            <h3>Global Reach</h3>
            <p>Potential for both domestic and international investments and connections.</p>
        </div>
    </div>
</div>

            {/* Key Features Section */}
            <div className="key-features ">
                {/* <h2>Key Features</h2> */}
                <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h2>Key Features</h2>
              </div>
                <div className="features-list">
                    <div className="feature-item">
                        <div className="feature-item-number">1</div>
                        <div className="feature-description">
                            <h3>Startup Submission Form</h3>
                            <p>Intuitive interface for founders to submit startup details.</p>
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
          <div class="join-section join-sec-yellow join-sec-white undefined join-divide mobile-join" style={{
            justifyContent :"center", gap :"35px"
          }}>
            {/* <h4>Join us</h4> */}
            <div className="join-flex-one-us" style={{justifyContent : "center"}}>
              <h2 style={{fontSize : "45px"}}>
                List your future unicorn with us
              </h2>
              {/* <p class="index_pitch">
                Decades of banking, investing & startup success guide your
                investments. Invest confidently with us.
              </p> */}
            </div>
            <div class="index-button-1" style={{fontSize : "2rem"}}>
              <Link to="/Deals" style={{ color: "white", fontSize:"2rem" }}>
              List now
              </Link>
            </div>
          </div>
        </section>
        <NewWebFooter />

        </div>
    );
};

export default Newunicornfounder;
