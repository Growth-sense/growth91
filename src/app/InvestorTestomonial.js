import React from "react";

export const InvestorTestomonial = () => {
  return (
    <div>
      {" "}
      <section
        className="testimonials-section t_desktop"
        style={{ textAlign: "justify" }}
      >
        <div className="container">
          <div className="heading-title">
            <h6>
              <span></span>{" "}
            </h6>
            <h2>Testimonials of Investors</h2>
          </div>
          <div className="testimonial_wraper owl-carousel">
            <div className="item">
              <div className="quotes">
                <img src="./web/images/quote.svg" alt="img" />
              </div>
              <p>
                I have pre-registered as an investor on Growth91 platform.
                Excited to start investing in Startups.
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
                I am a regular investor on Growth Sense and very happy with kind
                of returns generated on my investments. Looking forward to
                equally exciting opportunities at Growth91
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
                    src="./assets/images/deals-details/TM (4).jpeg"
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
            <h6>
              <span></span>{" "}
            </h6>
            <h2>Testimonials of Investors</h2>
          </div>
          <div className="testimonial_wraper_mobile">
            <div
              style={{
                minHeight: "400px",
                maxHeight: "400px",
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
              className="item mb-3"
              style={{
                minHeight: "400px",
                maxHeight: "400px",
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
                I am a regular investor on Growth Sense and very happy with kind
                of returns generated on my investments. Looking forward to
                equally exciting opportunities at Growth91
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
                minHeight: "400px",
                maxHeight: "400px",
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
                    src="./assets/images/deals-details/TM (4).jpeg"
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
    </div>
  );
};
