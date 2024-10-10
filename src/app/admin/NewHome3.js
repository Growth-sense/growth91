import React, { useState } from "react";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";
import "./home-css/newhome3.css"

const CardView = () => {
  return (
    
    <div className="card-view-container newhome-3">
        {/* <NewWebHeader newabout={"newabout"} /> */}
      <header className="header">
        <h1>Growth91</h1>
        <p>Platform for startup investment in India for fueling the future.</p>
      </header>

      <div className="cards-container">
        {/* First Card: What is Growth91 */}
        <div className="card card-left">
          <h2>What is Growth91?</h2>
          <li>
            Growth91 is a cutting-edge platform connecting investors with
            high-potential startups in India. We're dedicated to fueling
            innovation and driving the future of entrepreneurship in one of the
            world's most dynamic markets.
          </li>
          <button className="learn-more-btn">Learn More</button>
        </div>

        {/* Second Card: Why Growth91 */}
        <div className="card card-middle">
          <h2>Why Growth91?</h2>
          <ol className="list-items">
            <li>
              <strong> 1 Discover </strong>: <li>  Connect with exciting startups poised
              for growth.</li>
            </li>
            <li>
              <strong>2 Trust</strong>: <li> We vet every startup, ensuring only the
              best make it to our platform.</li>
            </li>
            <li>
              <strong>3 Invest</strong>: <li>Be part of shaping the future by
              investing in high-potential startups.</li>
            </li>
          </ol>
        </div>

        {/* Third Card: Why Invest in Startups */}
        <div className="card card-right">
          <h2>Why Invest in Startups?</h2>
          <ul className="list-items">
            <li>
              <strong>Growth Potential</strong>: 
              <li>Capitalize on India's position  as a global hub for innovation and entrepreneurship.</li>
            </li>
            <li>
              <strong>Global Expansion</strong>:  <li>Invest in startups expanding
              beyond India’s borders into global markets.</li>
            </li>
            <li>
              <strong>Diverse Opportunities</strong>: <li> Access a wide range of
              sectors, from tech startups to agritech solutions. </li>
            </li>
          </ul>
        </div>
      </div>

      
      {/* <NewWebFooter /> */}

    </div>
    
  );
};

export default CardView;



