import React, { Component } from "react";
import WebFooter from "../../common/WebFooter";

import ReactGA from "react-ga4";
import { TRACKING_ID } from "../../constants/data";
import NewWebHeader from "../../common/NewWebHeader";
import Step1 from "./Step1";
import FounderRegistration from "../../Founder/FounderRegistration";

ReactGA.initialize(TRACKING_ID);

class CombinedRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "investor",
    };
  }

  handleUserTypeChange = (type) => {
    this.setState({ userType: type });
  };
  
  render() {
    const { userType } = this.state;
    
    // Style for the user type selector
    const selectorStyle = {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      gap: "30px"
    };
    
    const optionStyle = (isActive) => ({
      cursor: "pointer",
      padding: "10px 20px",
      fontWeight: isActive ? "600" : "400",
      color: isActive ? "rgb(41, 23, 111)" : "#333",
      borderBottom: isActive ? "3px solid rgb(41, 23, 111)" : "none",
      transition: "all 0.3s ease"
    });
    
    return (
      <div style={{ display: this.state.show_data }}>
        <NewWebHeader newabout={"newabout"} />
        <section className="signup-section" style={{ marginTop: 30, paddingBottom: 0, marginBottom: 0 }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <div className="login-form">
                    <h3 className="text-center">Get Started</h3>
                    <div style={selectorStyle}>
                        <div 
                        style={optionStyle(userType === "investor")}
                        onClick={() => this.handleUserTypeChange("investor")}
                        >
                        As Investor
                        </div>
                        <div 
                        style={optionStyle(userType === "founder")}
                        onClick={() => this.handleUserTypeChange("founder")}
                        >
                        As Founder
                        </div>
                    </div>
                    <div className="or-div">
                      <hr />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {
            userType == "investor" ? <Step1 /> : <FounderRegistration />
        }
        
        
        
        <WebFooter />
      </div>
    );
  }
}

export default CombinedRegistration;