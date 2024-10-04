import React, { useState } from 'react';
import NewWebHeader from '../common/NewWebHeader';
import { NewWebFooter } from '../common/NewWebFooter';

const NewHome = () => {
  const [activeTab, setActiveTab] = useState('why-growth91');

  const renderContent = () => {
    // For now, return the same content for all tabs
    return (
       

        <div>
               
      <div className="content">
        <div className="card">
          <h2>Discover</h2>
          <p>
            We connect you with the most exciting startups poised for explosive growth. It's your chance to invest in groundbreaking companies that could be the next Google or Amazon.
          </p>
        </div>
        <div className="card">
          <h2>Trust</h2>
          <p>
            We rigorously vet every startup on our platform, ensuring we feature only those with strong potential. To build your trust, we invest alongside you in each startup, aligning our success with yours.
          </p>
        </div>
        <div className="card">
          <h2>Invest</h2>
          <p>
            Join us on this exciting journey! Explore and invest in high-potential startups on our platform, and be a part of shaping the future.
          </p>
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
    <NewWebHeader newabout={"newabout"}/>

   
    <div className="new-homepage">
      <header className="header">
        <h1>Growth91</h1>
        <p>Platform for startup investment in India for fuelling the future.</p>
      </header>
      <div className="tabs">
        <button className={activeTab === 'what-is-growth91' ? 'active' : ''} onClick={() => setActiveTab('what-is-growth91')}>
          What is Growth91?
        </button>
        <button className={activeTab === 'why-growth91' ? 'active' : ''} onClick={() => setActiveTab('why-growth91')}>
          Why Growth91?
        </button>
        <button className={activeTab === 'why-invest' ? 'active' : ''} onClick={() => setActiveTab('why-invest')}>
          Why Invest in Startups?
        </button>
      </div>
      {renderContent()}
   
    </div>
    
    <NewWebFooter />
    </div>
  );
};

export default NewHome;
