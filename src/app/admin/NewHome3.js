import React from "react";
import "./home-css/newhome3.css";

const CardView = () => {
  return (
    <section className="home-new3">
    <div className="container">
      <div className="row banner-row">
        {/* What is Growth91 Section */}
        <div className="banner-content">
         
        <div class="heading-title founder-text">
          <p><span>
            </span> </p>
            <h3>What is Growth 91</h3>
            </div>
            
              <p className="description">
                Growth91 is a cutting-edge platform connecting investors with
                high-potential startups in India. We're dedicated to fueling
                innovation and driving the future of entrepreneurship in one of
                the world's most dynamic markets.
              </p>
       
        </div>
  
        {/* Why Growth91 Section with 3 Cards */}
        <div className="banner-content">
        <div class="heading-title founder-text">
        <p><span>
            </span> </p>
            <h3>Why Growth 91</h3>

        </div>

       
         
          <div className="cards-row">
            {/* Card 1 */}
            <div className="card">
              <h3>Discover</h3>
              <p>Connect with exciting startups poised for growth.</p>
            </div>
            {/* Card 2 */}
            <div className="card">
              <h3>Trust</h3>
              <p>We vet every startup, ensuring only the best make it to our platform.</p>
              
            </div>
            {/* Card 3 */}
            <div className="card">
              <h3>Invest</h3>
              <p>Be part of shaping the future by investing in high-potential startups.</p>
            </div>
          </div>
        </div>
  
        {/* Why Invest in Startups Section */}
        <div className="banner-content">
        <div class="heading-title founder-text">
        <p><span>
            </span> </p>
            <h3>Why Invest in Startups?</h3>

        </div>

      
           
        
          <div className="cards-row">
            <div className="card">
              <h3>Growth Potential</h3>
              <p>
              Capitalize on India's position
              as a global hub for innovation and entrepreneurship.

              </p>
    
            </div>
            <div className="card">
              <h3>Global Expansion</h3>
              <p>
              Invest in startups expanding
              beyond India’s borders into global markets.
              </p>
            
            </div>
            <div className="card">
              <h3>Diverse Opportunities</h3>
              <p>
              Access a wide range of
              sectors, from tech startups to agritech solutions.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default CardView;
