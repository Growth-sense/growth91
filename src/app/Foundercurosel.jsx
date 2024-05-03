import React from "react";

export const Foundercurosel = () => {
  return (
    <div>
         <section className="testimonials-section t_desktop">
          <div className="container">
            <div className="heading-title">
              <h6>
                <span></span>{" "}
              </h6>
              <h2>Testimonials Of Founders</h2>
            </div>
      <div className="testimonial_wraper owl-carousel">
        <div className="item">
          <div className="quotes">
            <img src="./web/images/quote.svg" alt="img" />
          </div>
          <p>
            Normally, startup fund raise is quite a tedious process. Knowing
            Growth91<sup style={{ fontSize: "0.6rem" }}>TM</sup> modus operandi
            gives great confidence that we can focus on our core activities
          </p>
          <div className="media">
            <div className="images">
              <img src="./assets/images/deals-details/TM (1).jpeg" alt="img" />
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
            It is good to know that end to end work related to fund raise is
            taken care by Growth91
            <sup style={{ fontSize: "0.6rem" }}>TM</sup>. Looking forward to
            list our deal at Growth91
            <sup style={{ fontSize: "0.6rem" }}>TM</sup>
          </p>
          <div className="media">
            <div className="images">
              <img src="./assets/images/deals-details/TM (2).jpeg" alt="img" />
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
            <sup style={{ fontSize: "0.6rem" }}>TM</sup>, it gives great
            confidence as the deal terms are truly balanced for investors and
            startups. Will plan to raise our next round at Growth91
            <sup style={{ fontSize: "0.6rem" }}>TM</sup>
          </p>
          <div className="media">
            <div className="images">
              <img src="./assets/images/deals-details/TM (3).jpeg" alt="img" />
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
    </div>
  );
};
