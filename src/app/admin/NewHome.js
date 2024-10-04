import React, { useState } from "react";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";





const NewHome = () => {
  const [activeTab, setActiveTab] = useState("why-growth91");

  const renderContent = () => {
    // For now, return the same content for all tabs
    return (
      <div>
        <div className="content">
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
  const firstrenderContent = () => {
    // For now, return the same content for all tabs
    return (
      <div>
        <div className="content">
          <div className="card first-card">
            <h2>What is Growth91?</h2>
            <p>
              Growth91 is a platform for startup investment in india, dedicated to fuelling the future of innovation and enterpreneurship.
            </p>
          </div>
          
        </div>
      </div>
    );
  };
  const secondrenderContent = () => {
    // For now, return the same content for all tabs
    return (
      <div>
        <div className="content second-content">
          <div className="card">
            <h2>Growth potential</h2>
            <p>
              India cements its postion as global hun for innovation and enterpreneurship, our platform Growth91 play a crucial role for in facilitating  startup investment in india By understanding market trends, leveraging specialized funds, and embracing regulatory compliance, stakeholders can navigate the funding frenzy with confidence and capitalize on the abundant Opportunities avaliable in india's dynamic VC market.        </p>
          </div>
          <div className="card">
            <h2>Growth Expansion</h2>
            <p>
            Startups in India are increasingly looking beyond national borders, expanding their products and services to global markets. Indian Startups are not only attracting domestic investors but also garnering attention from international players. Partnerships, acquisitions, and funding rounds invobring global corporations and venture capital firms underscore the confidence in india's startup ecosystem.            </p>
          </div><div className="card">
            <h2>Diverse Opportunities</h2>
            <p>
            India's diversity offers a unique range of opportunities in startup investments in India across sectors and regions. Whether you're interested in urban tech startups or rural-focused agritech solutions, the indian market has something to offer. This diversity allows you to build a balanced portfolio that can withstand market fluctuations and drive sustained growth by investing in startups in India            </p>
          </div>

          
        </div>
      </div>
    );
  };


  return (
    <div
      className="deals-page"
      style={{
        marginTop: 171,
      }}
    >
      {/* <WebHeader /> */}
      <NewWebHeader newabout={"newabout"} />

      <div className="new-homepage ">
        <header className="header">
          <h1>Growth91</h1>
          <p>
            Platform for startup investment in India for fuelling the future.
          </p>
        </header>
        <div className="tabs card-tab">
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
        {renderContent()}
        {firstrenderContent()}
        {secondrenderContent()}
      </div>

      <NewWebFooter />
    </div>
  );
};


export default NewHome;
