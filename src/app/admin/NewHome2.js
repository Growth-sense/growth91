import React, { useState } from "react";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";
import "./home-css/NewHome2.css"; // Import the new CSS file

const NewHome = () => {
  const [activeTab, setActiveTab] = useState("what-is-growth91");

  const renderContent = () => {
    if (activeTab === "what-is-growth91") {
      return firstrenderContent();
    } else if (activeTab === "why-growth91") {
      return secondrenderContent();
    } else {
      return thirdrenderContent();
    }
  };

  const firstrenderContent = () => {
    return (
      <div>
        <div className="content">
          <div className="card first-card">
            <h2>What is Growth91?</h2>
            <p>
              Growth91 is a platform for startup investment in India, dedicated
              to fueling the future of innovation and entrepreneurship.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const secondrenderContent = () => {
    return (
      <div>
      <div className="content third-content">
        <div className="card">
          <h2>Discover</h2>
          <p>
            We connect you with the most exciting startups poised for
            explosive growth. It's your chance to invest in groundbreaking
            companies that could be the next Google or Amazon.
          </p>
        </div>
        <div className="card">
          <h2>Trust</h2>
          <p>
            We rigorously vet every startup on our platform, ensuring we
            feature only those with strong potential. To build your trust, we
            invest alongside you in each startup, aligning our success with
            yours.
          </p>
        </div>
        <div className="card">
          <h2>Invest</h2>
          <p>
            Join us on this exciting journey! Explore and invest in
            high-potential startups on our platform, and be a part of shaping
            the future.
          </p>
        </div>
      </div>
    </div>
    );
  };

  const thirdrenderContent = () => {
    return (
      <div>
      <div className="content second-content">
        <div className="card">
          <h2>Growth Potential</h2>
          <p>
            India cements its position as a global hub for innovation and
            entrepreneurship. Growth91 plays a crucial role in facilitating
            startup investment in India. By understanding market trends,
            leveraging specialized funds, and embracing regulatory compliance,
            stakeholders can navigate the funding frenzy with confidence and
            capitalize on the abundant opportunities available in India's
            dynamic VC market.
          </p>
        </div>
        <div className="card">
          <h2>Growth Expansion</h2>
          <p>
            Startups in India are increasingly looking beyond national
            borders, expanding their products and services to global markets.
            Indian startups are not only attracting domestic investors but
            also garnering attention from international players. Partnerships,
            acquisitions, and funding rounds involving global corporations and
            venture capital firms underscore the confidence in India’s startup
            ecosystem.
          </p>
        </div>
        <div className="card">
          <h2>Diverse Opportunities</h2>
          <p>
            India's diversity offers a unique range of opportunities in
            startup investments across sectors and regions. Whether you're
            interested in urban tech startups or rural-focused agritech
            solutions, the Indian market has something to offer. This
            diversity allows you to build a balanced portfolio that can
            withstand market fluctuations and drive sustained growth.
          </p>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="new-homepage-2">
      <NewWebHeader newabout={"newabout"} />
      <div className="main-container-2">
        <div className="sidebar">
          <div className="tabs">
            <button
              className={activeTab === "what-is-growth91" ? "active" : ""}
              onClick={() => setActiveTab("what-is-growth91")}
            >
              What is Growth91?
            </button>
            <button
              className={activeTab === "why-growth91" ? "active" : ""}
              onClick={() => setActiveTab("why-growth91")}
            >
              Why Growth91?
            </button>
            <button
              className={activeTab === "why-invest" ? "active" : ""}
              onClick={() => setActiveTab("why-invest")}
            >
              Why Invest in Startups?
            </button>
          </div>
          <button className="investment-btn">
            start investing now
          </button>
          
        </div>
        <div className="content-container">
          {renderContent()}
        </div>
      </div>
      <NewWebFooter />
    </div>
  );
};

export default NewHome;
