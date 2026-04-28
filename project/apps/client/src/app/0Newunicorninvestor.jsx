import React from 'react';
import { NewWebFooter } from './common/NewWebFooter';
import NewWebHeader from './common/NewWebHeader';
import { Card, Container, Link } from '@material-ui/core';
import { Link as NewLINK } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Col, Row } from 'antd';
import Slider from 'react-slick';

const NewFutureUnicorn = () => {

  const articles = [
    {
      image: 'media1.jpg', // Replace with actual image path
      title: 'Revolutionizing Photography and Creating Opportunities Worldwide',
      date: 'June 07, 2023',
      description:
        'New Delhi [India], June 7: VsnapU has been making waves in the Photography industry since its inception. It has an innovative',
      link: '#',
    },
    {
      image: 'media2.jpg', // Replace with actual image path
      title: 'The Big Brand Theory | From Piano Melodies to Chinese Recipes',
      date: 'July 08, 2023',
      description:
        'New Delhi [India], June 7: VsnapU has been making waves in the Photography industry since its inception. It has an innovative',
      link: '#',
    },
    {
      image: 'media3.jpg', // Replace with actual image path
      title: 'Why and How We Close Buffer For The Last Week Of The Year',
      date: 'April 12, 2022',
      description:
        'Every year since 2016 we’ve closed Buffer for a week at the end of the year. It’s like a reset, except across the whole company.',
      link: '#',
    },
  ];

  const videos = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with the actual YouTube embed link
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/3JZ_D3ELwOQ", // Replace with the actual YouTube embed link
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/vx2u5uUu3DE", // Replace with the actual YouTube embed link
    },
  ];

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
  return (
    <div>
      <style>
        {`

                .design-space-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          background-color: #ffffff;
        }
        .image-section {
          width: 100%;
          max-width: 800px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .image-section img {
          width: 100%;
          height: auto;
        }
        .logo-section {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }
        .logo-section img {
          width: 60%;
          height: auto;
        }
        .text-section {
          max-width: 600px;
        }
        .text-section h1 {
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
  padding: 50px 0;
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
  padding: 50px 0;
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
  padding: 50px 0;
}

.contact-info-card {
  background: linear-gradient(90deg, #5c33cf, #7d56d9);
  color: white;
  border-radius: 15px;
  padding: 30px;
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

}

`}
      </style>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>
      {/* <NewWebHeader /> */}
      <section className="banner_section white-variant">
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
                            <div className="form-wraper" style={{ justifyContent: "center!important" }}>

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
                          <img src="./web/images/new_logo.jpeg" class="unicorn-img" alt="img" />
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

      <section className="design-space">
        <div className="design-space-container">
          {/* Image Section */}
          <div className="image-section">
            {/* Add your image manually here */}
            <img src="./web/images/banner-unicorn.png" alt="Team" />
          </div>

          {/* Logo Section */}
          <div className="logo-section">
            {/* Replace with your logo */}
            <img src="./web/images/uni-logo.png" alt="Logo" />
          </div>

          {/* Text Section */}
          <div className="text-section">
            <h1>Design a Space You Love</h1>
            <p>
              Give your favorite room in the house a first-class face-lift with home
              renovation expert Shea McGee. Discover how to add new and simple flares
              that transform the look and feel of the room entirely.
            </p>
            <button>I am Interested</button>
          </div>
        </div>
      </section>

      <section className="container py-5 my-5">
        <div className="shadow-lg p-5" style={{ backgroundColor: '#5C33CF', color: 'white', borderRadius: '20px' }}>
          <div className="row">
            {/* Left Image Section */}
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src="your-image-path.png" // Replace with the image path or import it
                alt="Growth Illustration"
                style={{ maxWidth: '100%', borderRadius: '15px' }}
              />
            </div>

            {/* Right Text Section */}
            <div className="col-md-8 d-flex flex-column justify-content-center">
              <p className='text-white'>
                Shea McGee has revolutionized the home renovation  world, leveraging her approachable design aesthetic to make beautiful interior design dreams a reality.
                From social media sensation to Emmy-nominated Netflix star, she’s empowered millions of fans
                with an inspiring vision for creating timeless homes they love living in.
              </p>
              <NewLINK to="/" className="read-btn mt-5 px-4 py-2 rounded-pill">
                Read More
              </NewLINK>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 my-5">
        <h2 className="text-center mb-5">Highlights</h2>
        <div className="row">
          {/* Highlight 1 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-sm h-100"
              style={{
                backgroundColor: '#F8F9FA',
                borderRadius: '15px',
              }}
            >
              <div className="d-flex">
                <img
                  src="icon1.png" // Replace with the actual icon path
                  alt="Highlight Icon"
                  style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '15px',
                  }}
                />
                <p>
                  VsnapU earned the prestigious TripAdvisor “Traveller’s” Choice award in 2022 highlighting its excellence in delivering top-quality photography services and customer satisfaction.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-5">Team</h2>
        <div className="row">
          {/* Team Member 1 */}
          <div className="col-md-6 mb-4">
            <div
              className="shadow-lg"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(90deg, #5C33CF, #7D56D9)',
                  color: 'white',
                  padding: '20px',
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="team-member1.png" // Replace with the actual path
                    alt="Parminder Sahni"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '15px',
                    }}
                  />
                  <div>
                    <h5 className="mb-0">Parminder Sahni</h5>
                    <p className="mb-0">CEO</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p>
                  Parminder holds 14 years of experience in entrepreneurship which
                  started with his previous venture in the travel domain. Leads the
                  product line creation and strategy in VsnapU with his convincing
                  skills and PR!
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-md-6 mb-4">
            <div
              className="shadow-lg"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(90deg, #5C33CF, #7D56D9)',
                  color: 'white',
                  padding: '20px',
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="team-member2.png" // Replace with the actual path
                    alt="Vikram Sharma"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '15px',
                    }}
                  />
                  <div>
                    <h5 className="mb-0">Vikram Sharma</h5>
                    <p className="mb-0">CEO</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p>
                  Vikram Sharma, CEO of NeoTech Solutions, leads a pioneering tech
                  firm specializing in AI and data analytics, delivering innovative,
                  scalable, and sustainable solutions to global industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className=" my-5 py-5 market-overview-section">
        <h2 className="text-center mb-5">Market Overview</h2>
        <div className="row px-5">
          {/* Overview 1 */}
          <div className="col-md-4 mb-4">
            <div className="market-overview-card">
              <p>
                The digital content and photography industry is witnessing a major
                shift, fueled by the growing need for organized, professional
                services that cater to evolving consumer expectations.
                Traditionally, this market has been fragmented, with challenges
                such as inconsistent pricing, unpredictable delivery timelines,
                and varying quality levels. Customers have often relied on
                freelancers, leading to dissatisfaction due to the lack of
                standardization. However, technological advancements and the
                introduction of scalable platforms are addressing these issues,
                transforming the sector into a more structured and accessible
                space. These innovations are streamlining workflows, reducing
                inefficiencies, and providing reliable services to both consumers
                and professionals.
              </p>
            </div>
          </div>

          {/* Overview 2 */}
          <div className="col-md-4 mb-4">
            <div className="market-overview-card">
              <p>
                Globally, the digital content creation market is valued at over
                $15 billion, with an anticipated CAGR of 20% in the coming years.
                This growth is fueled by industries such as e-commerce,
                entertainment, advertising, and education, which increasingly
                depend on digital content to engage their audiences and enhance
                brand visibility. Similarly, the global photography market,
                valued at $50 billion, is also experiencing significant growth,
                driven by commercial photography. As businesses adopt
                digital-first practices and demand personalized, high-quality
                content is accelerating, creating immense opportunities for
                companies offering innovative solutions in this space.
              </p>
            </div>
          </div>

          {/* Overview 3 */}
          <div className="col-md-4 mb-4">
            <div className="market-overview-card">
              <p>
                In this evolving landscape, platforms that combine technology with
                customer-first principles are well-positioned to lead the market
                transformation. By addressing pain points like undefined costs,
                long editing cycles, and operational inefficiencies, these
                platforms provide seamless, scalable solutions that cater to
                modern consumer needs. Additionally, they empower photographers
                by relieving them of ancillary tasks such as marketing and
                post-production, allowing them to focus on creativity. This
                integration of convenience, quality, and technology is redefining
                the way content and photography services are delivered, paving
                the way for sustainable growth and innovation in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="container my-5 py-5 media-coverage-section">
        <h2 className="text-center mb-5">Media Coverage</h2>
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="media-card">
                <img
                  src={article.image}
                  alt={article.title}
                  className="media-card-image"
                />
                <div className="media-card-content">
                  <h5>{article.title}</h5>
                  <p className="media-card-date">{article.date}</p>
                  <p>
                    {article.description}{' '}
                    <a href={article.link} className="read-more-link">
                      Read More..
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="load-more-btn">Load more</button>
        </div>
      </section>


      <section className="container my-5 py-5 videos-section">
        <h2 className="text-center mb-5">Videos</h2>
        <Slider {...settings}>
          {videos.map((video) => (
            <div key={video.id} className="video-slide">
              <iframe
                width="100%"
                height="400"
                src={video.src}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h5 className="text-center mt-3">{video.title}</h5>
            </div>
          ))}
        </Slider>
      </section>



      <section className="container my-5 py-5 contact-us-section">
        <h2 className="text-center mb-5">Contact Us</h2>
        <div className="row">
          {/* Contact Information Card */}
          <div className="col-md-4">
            <div className="contact-info-card">
              <h2>Contact Information</h2>
              <ul className="contact-info-list">
                <li>
                  <i className="fas fa-phone"></i> +1012 3456 789
                </li>
                <li>
                  <i className="fas fa-envelope"></i> demo@gmail.com
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i> 132 Dartmouth Street
                  Boston, Massachusetts 02156 United States
                </li>
              </ul>
              <div className="social-icons d-flex justify-content-center">
                <a href="#facebook" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#instagram" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#linkedin" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="col-md-8 center-class" >
            <div className="row">
              <div className="col-md-6" >
                <ul className="company-info-list">
                  <li>
                    <span>Legal Name</span>
                    <p>Affinique Media Services Private Limited</p>
                  </li>
                 
                  <li>
                    <span>Website</span>
                    <p>
                      <a href="https://www.vsnapu.com" target="_blank" rel="noreferrer">
                        www.vsnapu.com
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="company-info-list">
               
                  <li>
                    <span>Founded</span>
                    <p>11/16/2017</p>
                  </li>
                  
                  <li>
                    <span>Employees</span>
                    <p>80+</p>
                  </li>
                
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>












      {/* Why to list section */}


      {/* Key Features Section */}

      <NewWebFooter />

    </div>
  );
};

export default NewFutureUnicorn;
