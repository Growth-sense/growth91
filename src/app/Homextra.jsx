import React from 'react'

export const Homextra = () => {
    const pointer = {
        pointerEvents: "none",
      };
  return (
    <div>  <section className="features-section">
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-start align-items-center"
            style={pointer}
          >
            <div className="heading-title m-sm-0">
              <p>
                <span></span>{" "}
              </p>
              <h2>In The News</h2>
              {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center"
            style={{ gap: "20px" }}
          >
            <a href="#">
              <img src="./web/news1.webp" alt="" className="news-img" fetchpriority="high"/>
            </a>
            <a
            rel="preload"
              href="https://www.linkedin.com/posts/indianstartupnews_startup-funding-angelinvestors-activity-7024718695234965504-IVIB?utm_source=share&utm_medium=member_ios"
              target="_blank"
            >
              <img src="./web/news.webp" alt="" className="news-img" fetchpriority="high" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="features-section">
    <div className="container-fluid">
      <div className="container">
        <div className="heading-title">
        <p>
                <span></span>{" "}
              </p>
          <h2>For Investors</h2>
          {/* <!-- <p>Varius aliquet nulla quibusdam eu odio natus wisi eget, lectus Nam consequuntur urna lectus commodo laboriosam Ridiculus lectus laboriosam.</p> --> */}
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item ">
              <div className="icon text-center">
                <img src="./web/images/icon1.png" alt="img" />
              </div>
              <h4>
                Curated Growth <br /> Deals
              </h4>
              <p>
                Carefully selected deals in <br /> growing areas
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon2.png" alt="img" />
              </div>
              <h4>Transparency</h4>
              <p>
                In-depth information available for making the right
                decision
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6" style={pointer}>
            <div className="item">
              <div className="icon">
                <img src="./web/images/icon3.png" alt="img" />
              </div>
              <h4>
                Nominal/Low <br />
                Investment
              </h4>
              <p>
                Start your Investment journey with <br />
                small amounts
              </p>
              {/* <a href="featured.html">Know more</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="testimonials-section t_desktop d-block">
    <div className="container">
      <div className="heading-title">
      <p><span></span> </p>
        <h2>Testimonials of Investors</h2>
      </div>
      <div className="testimonial_wraper owl-carousel">
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            I have pre-registered as an investor on Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup> platform. Excited
            to start investing in Startups.
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/mukesh-mer.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Mukesh Mer</a>
              <small>
                N M <br /> Holding
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            I am a regular investor on Growth Sense and very happy with
            kind of returns generated on my investments. Looking forward
            to equally exciting opportunities at Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/ramesh-babu.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Ramesh Babu</a>
              <small>
                Country Head <br /> Government Banking, Axis Bank
              </small>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            Knowing the team since so many years, especially after
            experiencing their skill in deal curation; looking forward to
            some exciting deals on the platform.
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/mitul.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Mitul Jhaveri</a>
              <small>
                Director Finance, <br /> Regal Rexnord India
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
              lineHeight: "24px",
            }}
          >
            Discovering hidden gems with Growth91 is like uncovering
            beautiful teasure. The platform's knack for identifying unique
            and promising startups gives me a sense of being part of an
            exclusive club.It's not just about numbers; it's about the
            thrill of finding the next big thing in the startup world.
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/hrish.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Hirish Shipurkar</a>
              <small>
                Head India, <br /> GPS FIG, HSBC Bank
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
              lineHeight: "24px",
            }}
          >
            Investing through Growth91 feels like having insider access to
            a world top-tier opportunities. the platform's ability to
            consistently bring high-quality deals to the table to showcase
            a deep understanding of market trends and a commitment to
            providing investors with access to cream of the crop
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/jaison.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">JAISON TITUS</a>
              <small>
                SOFTWARE DEVLOPMENT, <br />
                Engineer Amazon AWS and
                <br /> Amazon Robotics,USA
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p
            style={{
              fontSize: "14.6px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
              lineHeight: "24px",
            }}
          >
            what I appreciate most about Growth91 is the Caliber of its
            advisory board.Sanjay Sarda,Jimish Kapadia Asit oberoi and
            other they aren't figerHeads they're active contributors,shapeing the plateform's approach to
            investments.it's like having a personalised team of mentors,
            ensuring that every investment decision benifits from a wealth
            of collective exprience and foresight
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/kush.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">KUSH SHRIVASTAVA</a>
              <small>
                Co Founder Quiklo, <br /> Fintech Expert
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
              lineHeight: "24px",
            }}
          >
            The caliber of deals curated by Growth91 is nothing shorts of
            exceptional. It's not just about quality;it's the meticulous
            selection process that ensure each investment opportuntiy is a
            potential game-changer. Quality over quantity truly defines
            the investment landscapes on this platform. hope they
            continueto do it in future also
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/testimonials/Prakash.jpg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">PRAKASH ROHERA</a>
              <small>
                INTERNATIONAL Corpoate <br />
                Trainer and Coach
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    className="testimonials-section t_mobile  d-none"
    style={{
      textAlign: "justify",
      background:
        "linear-gradient(269.83deg, rgba(232, 226, 255, 0.6) 40.65%, rgba(255, 255, 255, 0.4) 100%),url(../images/testimonial-bg.png) no-repeat top center",
      backgroundSize: "cover",
      padding: "50px 0",
    }}
  >
    <div className="container">
      <div className="heading-title">
      <p><span></span> </p>
        <h2>Testimonials of Investors</h2>
      </div>
      <div className="testimonial_wraper_mobile">
        <div
          style={{
           
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
          className="item mb-3"
        >
          <div style={{ width: "30px" }} className="quotes">
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            I have pre-registered as an investor on Growth91 platform.
            Excited to start investing in Startups.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/mukesh-mer.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Mukesh Mer
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                N M <br /> Holding
              </small>
            </div>
          </div>
        </div>
        <div
          style={{
           
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
          className="item mb-3"
        >
          <div style={{ width: "30px" }} className="quotes">
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            Discovering hidden gems with Growth91 is like uncovering
            beautiful teasure. The platform's knack for identifying unique
            and promising startups gives me a sense of being part of an
            exclusive club.It's not just about numbers; it's about the
            thrill of finding the next big thing in the startup world.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/hrish.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Hirish Shipurkar 
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Head India, <br /> GPS FIG, HSBC Bank
              </small>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
          className="item mb-3"
        >
          <div style={{ width: "30px" }} className="quotes">
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            Investing through Growth91 feels like having insider access to
            a world top-tier opportunities. the platform's ability to
            consistently bring high-quality deals to the table to showcase
            a deep understanding of market trends and a commitment to
            providing investors with access to cream of the crop
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/jaison.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
JAISON TITUS                    </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
               SOFTWARE DEVLOPMENT, <br />
                Engineer Amazon AWS and
                <br /> Amazon Robotics,USA
              </small>
            </div>
          </div>
        </div>
        <div
          style={{
          
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
          className="item mb-3"
        >
          <div style={{ width: "30px" }} className="quotes">
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            what I appreciate most about Growth91 is the Caliber of its
            advisory board.Sanjay Sarda,Jimish Kapadia Asit oberoi and
            other they aren't figerHeads; they're active
            contributors,shapeing the plateform's approach to
            investments.it's like having a personalised team of mentors,
            ensuring that every investment decision benifits from a wealth
            of collective exprience and foresight
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/kush.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                KUSH SHRIVASTAVA
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
            Co Founder Quiklo, <br /> Fintech Expert
              </small>
            </div>
          </div>
        </div>
        <div
          style={{
           
            
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
          className="item mb-3"
        >
          <div style={{ width: "30px" }} className="quotes">
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
        The caliber of deals curated by Growth91 is nothing shorts of
            exceptional. It's not just about quality;it's the meticulous
            selection process that ensure each investment opportuntiy is a
            potential game-changer. Quality over quantity truly defines
            the investment landscapes on this platform. hope they
            continueto do it in future also
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/Prakash.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
               PRAKASH ROHERA
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
              INTERNATIONAL Corpoate <br />
                Trainer and Coach
              </small>
            </div>
          </div>
        </div>
        <div
          className="item mb-3"
          style={{
           
            
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="quotes" style={{ width: "30px" }}>
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            I am a regular investor on Growth Sense and very happy with
            kind of returns generated on my investments. Looking forward
            to equally exciting opportunities at Growth91
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "30px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/ramesh-babu.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Ramesh Babu
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Country Head <br /> Government Banking, Axis Bank
              </small>
            </div>
          </div>
        </div>

        <div
          className="item mb-3"
          style={{
           
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="quotes" style={{ width: "30px" }}>
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            Knowing the team since so many years, especially after
            experiencing their skill in deal curation; looking forward to
            some exciting deals on the platform.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/testimonials/mitul.jpg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Mitul Jhaveri
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Director Finance, <br /> Regal Rexnord India
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="how-we-work-section">
    <div className="container">
      <div className="heading-title">
      <p><span></span> </p>
        <h2>For Founders</h2>
        <p style={{ textAlign: "justify" }}>
          Growth91's robust private deal management option allows
          Founders, Angel Investors, and Venture Capitalists to conduct
          their fundraising process online, available exclusively to their
          target audience. Don't get bogged down in continuous signing and
          filing. It's easy, smooth, and uncomplicated.
        </p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="item mb-3">
            <div className="icon">
              <img src="./web/images/icon3.svg" alt="img" />
              <span>1</span>
            </div>
            <h3 style={{ textAlign: "center" }}>Raise Growth Capital</h3>
            <p style={{ textAlign: "center" }}>
              Raise founder-friendly growth capital to scale your business
            </p>
            <div className="arrow-img">
              <img src="./web/images/arrow1.svg" alt="img" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="item mb-3">
            <div className="icon icon-tow">
              <img src="./web/images/icon4.svg" alt="img" />
              <span>2</span>
            </div>
            <h3 style={{ textAlign: "center" }}>Seamless and Smooth</h3>
            <p style={{ textAlign: "center" }}>
              Raise capital with ease and confidence
            </p>
            <div className="arrow-img" style={{ top: 60 }}>
              <img src="./web/images/arrow2.svg" alt="img" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="item mb-3">
            <div className="icon icon-three">
              <img src="./web/images/icon5.svg" alt="img" />
              <span>3</span>
            </div>
            <h3 style={{ textAlign: "center" }}>
              Leverage established Network
            </h3>
            <p style={{ textAlign: "center" }}>
              Tap the expertise of SME network for long term growth
              proposition
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="testimonials-section t_desktop">
    <div className="container">
      <div className="heading-title">
      <p><span></span> </p>
        <h2>Testimonials Of Founders</h2>
      </div>
      <div className="testimonial_wraper owl-carousel">
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            Normally, startup fund raise is quite a tedious process.
            Knowing Growth91<sup style={{ fontSize: "0.6rem" }}>®</sup>{" "}
            modus operandi gives great confidence that we can focus on our
            core activities
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/deals-details/TM (1).jpeg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Rahul Jain</a>
              <small>
                Managing Director, <br />
                InnoServ Group
              </small>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            It is good to know that end to end work related to fund raise
            is taken care by Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>. Looking forward
            to list our deal at Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/deals-details/TM (2).jpeg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Saumya Shah</a>
              <small>
                Founder & CEO, <br />
                Tarrakki
              </small>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            After knowing the details of modus operandi of Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>, it gives great
            confidence as the deal terms are truly balanced for investors
            and startups. Will plan to raise our next round at Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>
          </p>
          <div className="media">
            <div className="images">
              <img
                src="./assets/images/deals-details/TM (3).jpeg"
                alt="img"
              />
            </div>
            <div className="media-body">
              <a href="#">Dhruv Javeri</a>
              <small>
                Co-Founder & CEO, <br />
                Klassroom
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    className="testimonials-section t_mobile"
    style={{
      textAlign: "justify",
      background:
        "linear-gradient(269.83deg, rgba(232, 226, 255, 0.6) 40.65%, rgba(255, 255, 255, 0.4) 100%),url(../images/testimonial-bg.png) no-repeat top center",
      backgroundSize: "cover",
      padding: "50px 0",
    }}
  >
    <div className="container">
      <div className="heading-title">
      <p><span></span> </p>
        <h2>Testimonials Of Founders</h2>
      </div>
      <div className="testimonial_wraper_mobile">
        <div
          className="item mb-3"
          style={{
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="quotes" style={{ width: "30px" }}>
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            Normally, startup fund raise is quite a tedious process.
            Knowing Growth91<sup style={{ fontSize: "0.6rem" }}>®</sup>{" "}
            modus operandi gives great confidence that we can focus on our
            core activities
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/deals-details/TM (1).jpeg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Rahul Jain
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Managing Director, <br />
                InnoServ Group
              </small>
            </div>
          </div>
        </div>
        <div
          className="item mb-3"
          style={{
        
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="quotes" style={{ width: "30px" }}>
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
            }}
          >
            It is good to know that end to end work related to fund raise
            is taken care by Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>. Looking forward
            to list our deal at Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/deals-details/TM (2).jpeg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Saumya Shah
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Founder & CEO, <br />
                Tarrakki
              </small>
            </div>
          </div>
        </div>

        <div
          className="item mb-3"
          style={{
       
            background: "#fff",
            padding: "18px 30px",
            boxShadow: "0 30px 50px rgba(205, 196, 219, 0.3)",
            borderRadius: "10px",
          }}
        >
          <div className="quotes" style={{ width: "30px" }}>
            <img
              style={{ maxWidth: "100%" }}
              src="./web/images/quote.svg"
              alt="img"
            />
          </div>
          <p
            className="paradh"
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#313131",
              fontFamily: '"Nunito", sans-serif',
              padding: "20px 0",
              textAlign: "justify",
              marginbottom: "25px",
            }}
          >
            After knowing the details of modus operandi of Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>, it gives great
            confidence as the deal terms are truly balanced for investors
            and startups. Will plan to raise our next round at Growth91
            <sup style={{ fontSize: "0.6rem" }}>®</sup>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "30px",
            }}
            className="media"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                textAlign: "center",
                background: "#fff",
                border: "1px solid #D3CBE2",
                borderRadius: "50%",
                overflow: "hidden",
                lineHeight: "65px",
              }}
              className="images"
            >
              <img
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="./assets/images/deals-details/TM (3).jpeg"
                alt="img"
              />
            </div>
            <div style={{ marginLeft: "10px" }} className="media-body">
              <a
                style={{
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111111",
                  fontFamily: '"Nunito", serif',
                }}
                href="#"
              >
                Dhruv Javeri
              </a>
              <small
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: '"Nunito", sans-serif',
                  color: "#313131",
                }}
              >
                Co-Founder & CEO, <br />
                Klassroom
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}
