import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NewWebHeader from "./common/NewWebHeader.jsx";
import { NewWebFooter } from "./common/NewWebFooter";

export const SecondarySharesHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (document.getElementsByTagName("META")[3]) {
      document.getElementsByTagName("META")[3].content =
        "Explore private secondary startup investment opportunities & liquidity options. A curation & facilitation platform for buyers and sellers of secondary shares.";
    }
    document.title = "Buy/Sell Secondary Shares - Explore Startup Investment & Liquidity | Growth91";
  }, []);

  const isAuthenticated = localStorage.getItem("investor_id") || localStorage.getItem("founder_id");

  const getSellerRedirect = () => {
    return isAuthenticated ? "/investor-seller-listing-form" : "/login?redirect=/investor-seller-listing-form";
  };

  const getBuyerRedirect = () => {
    return isAuthenticated ? "/secondary-opportunities" : "/login?redirect=/secondary-opportunities";
  };

  const faqs = [
    {
      q: "Does Growth91 hold investor funds?",
      a: "No. Growth91 does not directly hold or custody investor funds or securities."
    },
    {
      q: "Does listing guarantee sale of securities?",
      a: "No. Listing only enables discovery of potential investor interest."
    },
    {
      q: "Are all transactions subject to company approval?",
      a: "Certain transactions may require approvals under Shareholders’ Agreements, Articles of Association, board approvals, ROFO/ ROFR provisions, or applicable laws."
    },
    {
      q: "What happens if buyer backs out?",
      a: "Securities will be retained by the seller"
    },
    {
      q: "What happens if seller backs out?",
      a: "Buyer will not transfer the funds to sellers account"
    },
    {
      q: "Does Growth91 verify all information?",
      a: "Growth91 undertakes reasonable verification efforts; however, parties must independently verify all information before proceeding."
    },
    {
      q: "Can pricing change after listing?",
      a: "Yes. Indicative pricing is non-binding and subject to mutual understanding between buyer and seller, facilitated by Growth91. Final price will get a reconfirmation from the seller which is binding."
    },
    {
      q: "What is the transaction timeline?",
      a: "Normally takes 2-4 weeks. May vary depending on documentation, due diligence, approvals, and compliance requirements."
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Buy/Sell Secondary Shares - Explore Startup Investment & Liquidity | Growth91</title>
      </Helmet>

      <div className="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      {/* Hero Banner Section with white-variant bg */}
      <section className="banner_section white-variant removemargin">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="slider-area">
                  <div className="item">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="left-content">
                          <h2 className="wow fadeInUp" data-wow-delay="0.3s">
                            Explore Startup Investment & Liquidity Opportunities
                          </h2>
                          <p className="wow fadeInUp mt-3 text-secondary" data-wow-delay="0.5s" style={{ textAlign: "justify" }}>
                            A facilitation platform for existing startup investors and aspiring investors to explore private secondary investment opportunities in promising startups.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 text-center">
                        <div className="right-side-images wow fadeInRight" data-wow-delay="0.6s">
                          <img src="./web/images/about-side.png" alt="Secondary Shares" fetchpriority="high" className="img-fluid" />
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

      {/* Quick Access Action Buttons Section */}
      <section className="action-buttons-section" style={{ backgroundColor: "#ffffff", marginTop: "0.4rem" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3">
              <div className="p-4 shadow-sm rounded border text-center" style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
                <p className="text-secondary mb-4" style={{ fontSize: "1.05rem", lineHeight: "1.6", flexGrow: 1 }}>
                  Discover curated startup investment opportunities across sectors and stages.
                </p>
                <div>
                  <Link to="/deals" className="theme-btn px-4 py-2" style={{ background: "#ff9c1a", color: "#fff", border: "none", fontSize: "1.1rem", borderRadius: "6px" }}>
                    Explore New Startup Deals
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="p-4 shadow-sm rounded border text-center" style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
                <p className="text-secondary mb-4" style={{ fontSize: "1.05rem", lineHeight: "1.6", flexGrow: 1 }}>
                  Explore startups listed by founders for fundraising, collaborations, strategic partnerships, and investments.
                </p>
                <div>
                  <Link to="/FutureUnicornList" className="theme-btn px-4 py-2" style={{ background: "#100050", color: "#fff", border: "none", fontSize: "1.1rem", borderRadius: "6px" }}>
                    Discover Future Unicorns
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Existing Investors Section */}
       <section className="features-section" style={{ backgroundColor: "#e8edef98", padding: "40px 0px" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3" style={{ fontWeight: "800", fontSize: "2.5rem" }}>For Existing Investors</h2>
            <p className="mb-4" style={{ fontSize: "1.15rem", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
              Discover streamlined opportunities to gain liquidity for your current startup holdings through our trusted facilitation platform.
            </p>
            <a href={getSellerRedirect()} className="theme-btn shadow" style={{ background: "#ff9c1a", color: "#fff", border: "none", borderRadius: "50px", fontSize: "1.1rem", padding: "14px 40px", display: "inline-block", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
              Explore Liquidity <i className="fa-solid fa-arrow-right ml-2"></i>
            </a>
          </div>
          
          <div className="row justify-content-center pt-2">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.08)", border: "1px solid #f0ecf9", transition: "transform 0.3s ease"}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f2ebfa" }}>
                  <img src="./web/images/icon1.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Liquidity <br /> Opportunities</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Explore liquidity opportunities for your startup investments
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.08)", border: "1px solid #f0ecf9", transition: "transform 0.3s ease"}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f2ebfa" }}>
                  <img src="./web/images/icon2.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Trusted <br /> Process</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Connect with interested investors through a trusted and transparent process
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.08)", border: "1px solid #f0ecf9", transition: "transform 0.3s ease"}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f2ebfa" }}>
                  <img src="./web/images/icon3.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Structured <br /> Transactions</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Facilitate transactions in a structured and compliant manner
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Aspiring Investors Section */}
      <section className="features-section" style={{ backgroundColor: "#ffffff", padding: "40px 0px" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3" style={{ color: "#100050", fontWeight: "800", fontSize: "2.5rem" }}>For Aspiring Investors</h2>
            <p className="text-secondary mb-4" style={{ fontSize: "1.15rem", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
              Gain access to verified secondary investment opportunities in growth-stage startups before broader market access.
            </p>
            <a href={getBuyerRedirect()} className="theme-btn shadow" style={{ background: "#100050", color: "#fff", border: "none", borderRadius: "50px", fontSize: "1.1rem", padding: "14px 40px", display: "inline-block", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
              Discover Opportunities <i className="fa-solid fa-arrow-right ml-2"></i>
            </a>
          </div>
          
          <div className="row justify-content-center pt-2">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.06)", border: "1px solid #f8f9fa", transition: "transform 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f8f9fa" }}>
                  <img src="./web/images/icon1.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Verified <br /> Opportunities</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Access verified secondary investment opportunities
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.06)", border: "1px solid #f8f9fa", transition: "transform 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f8f9fa" }}>
                  <img src="./web/images/icon2.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Growth-Stage <br /> Access</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Participate in growth-stage startups before broader market access
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="h-100 bg-white p-5 rounded text-center" style={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(16, 0, 80, 0.06)", border: "1px solid #f8f9fa", transition: "transform 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon mb-4 d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f8f9fa" }}>
                  <img src="./web/images/icon3.png" alt="img" style={{ width: "40px" }} />
                </div>
                <h4 style={{ color: "#100050", fontWeight: "700" }}>Diverse <br /> Discovery</h4>
                <p className="mt-3 text-secondary" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Discover opportunities across sectors and stages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="" style={{ backgroundColor: "#e8edef98", padding: "40px 0px" }}>
        <div className="container py-3">
          <div className="heading-title text-center mb-4">
            <h6><span></span></h6>
            <h2 style={{ fontWeight: "800" }}>Frequently Asked Questions</h2>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="accordion accordion-flush" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="accordion-item shadow-sm border mb-3 rounded">
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed font-weight-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                        style={{ color: "#100050", fontSize: "1.1rem", padding: "1.2rem 1.5rem" }}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body" style={{ color: "#666", fontSize: "1.05rem", lineHeight: "1.6", padding: "1.5rem" }}>
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewWebFooter />
    </div>
  );
};
