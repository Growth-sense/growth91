import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import Apis from "../../constants/Apis";
import ReactGA from "react-ga4";

export default class Sidebar extends Component {

  specialFounderIds = [
    "33",
    "172", "198",
    "413", "475",
    "592",
    "670",
    "800", "867",
    "901", "905", "927", "933",
    "1000", "1018", "1098",
    "1307", "1389", "1394", 
    "1409", "1463", "1482",
    "1532", "1537", "1548",
    "1646",
    "1743", "1790", "1795", "1978",
    "2108", "2138"
  ];

  constructor(props) {
    super(props);
    this.state = {
      is_investor: "0",
      isFutureUnicornOpen: true, // New state to manage dropdown
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("founder_id")) {
      window.location.assign("/founder-login");
      return;
    }
    this.get_founder_details();
  }

  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status === "1") {
        let url =
          Apis.IMAGEURL +
          "profile/" +
          result.data[0].investor_id +
          "/" +
          result.data[0].user_profile_picture;
        this.setState({
          is_investor: result.data[0].is_investor,
          founder_middlename: result.data[0].middle_name,
          founder_lastname: result.data[0].last_name,
          founder_contactno: result.data[0].mobile,
          founder_profileimagetoshow: result.data[0].user_profile_picture
            ? url
            : "",
        });
      } else {
        this.setState({ formloader: false });
      }
    });
  };

  toggleFutureUnicorn = () => {
    this.setState((prevState) => ({
      isFutureUnicornOpen: !prevState.isFutureUnicornOpen,
    }));
  };

  render() {
    return (
      <ol className="investor-sidebar">
        {this.state.is_investor === "1" && (
          <div className="founder-role-heading" style={{ margin: "0 25px" }}>
            <p>Founder</p>
          </div>
        )}
        <div style={{ padding: "0 25px" }}>
          {
            this.specialFounderIds.includes(localStorage.getItem("founder_id")) && (
              <>
                <a
                  href="/founder-dashboard"
                  className={
                    window.location.pathname === "/founder-dashboard" ? "active" : ""
                  }
                >
                  <li className="hiw-li">
                    <i className="bx bx-grid-alt "></i> &nbsp;&nbsp;Dashboard
                  </li>
                </a>
                <a
                  href="/founder-investors"
                  className={
                    window.location.pathname === "/founder-investors" ? "active" : ""
                  }
                >
                  <li className="hiw-li">
                    <i className="bx bxs-user-account"></i>
                    &nbsp;&nbsp;Investors
                  </li>
                </a>
                <a
                  href="/founder-analytics"
                  className={
                    window.location.pathname === "/founder-analytics" ? "active" : ""
                  }
                >
                  <li className="hiw-li">
                    <i className="bx bx-trending-up"></i> &nbsp;&nbsp;Analytics
                  </li>
                </a>
              </>
            )
          }
          
          
          {/* <a
            href="/startup-form"
            className={
              window.location.pathname === "/startup-form" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bxs-file-doc" style={{ fontSize: 20 }}></i>{" "}
              &nbsp;&nbsp;Startup-Form
            </li>
          </a> */}
          <a
            href="/founderdash-documents"
            className={
              window.location.pathname === "/founderdash-documents" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bxs-file-doc" style={{ fontSize: 20 }}></i>{" "}
              &nbsp;&nbsp;Documents
            </li>
          </a>
          {/* <a
            href="/assessment-form"
            className={
              window.location.pathname === "/assessment-form" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
              &nbsp;&nbsp;Assessment Form
            </li>
          </a> */}
          {
            this.specialFounderIds.includes(localStorage.getItem("founder_id")) && (
              <>
                <a
                  href="/founder-deals"
                  className={
                    window.location.pathname === "/founder-deals" ? "active" : ""
                  }
                >
                  <li className="hiw-li">
                    <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
                    &nbsp;&nbsp;Deals
                  </li>
                </a>
              </>
            )
          }
          
          {/* <a
            href="/FounderInterest"
            className={
              window.location.pathname === "/FounderInterest" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
              &nbsp;&nbsp;Enquiry/Lead
            </li>
          </a>
          
          {/* Future Unicorn Menu with My Plan as a Submenu */}
          <li className="hiw-li" style={{ cursor: "not-allowed" }} >
            <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
            &nbsp;&nbsp; Future Unicorn
          </li>
         
          <ol
            className="submenu"
            style={{
              listStyle: "none",
              paddingLeft: "20px",
              maxHeight: this.state.isFutureUnicornOpen ? "100px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-out", // Adjusting transition effect here
            }}
          >
             <a
            href="/FounderMyListing"
            className={
              window.location.pathname === "/FounderMyListing" ? "active" : ""
            }
          >
              <li className="hiw-li">
                <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
                &nbsp;&nbsp;Account Details
              </li>
            </a>
          </ol>

          <ol
            className="submenu"
            style={{
              listStyle: "none",
              paddingLeft: "20px",
              maxHeight: this.state.isFutureUnicornOpen ? "100px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-out", // Adjusting transition effect here
            }}
          >
             <a
            href="/UnicornEnquiryList"
            className={
              window.location.pathname === "/UnicornEnquiryList" ? "active" : ""
            }
          >
              <li className="hiw-li">
                <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
                &nbsp;&nbsp;Enquiries
              </li>
            </a>
          </ol>

          <ol
            className="submenu"
            style={{
              listStyle: "none",
              paddingLeft: "20px",
              maxHeight: this.state.isFutureUnicornOpen ? "100px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-out", // Adjusting transition effect here
            }}
          >
             <a
            href="/MyUnicornPlan"
            className={
              window.location.pathname === "/MyUnicornPlan" ? "active" : ""
            }
          >
              <li className="hiw-li">
                <i className="bx bx-calendar-star" style={{ fontSize: 20 }}></i>{" "}
                &nbsp;&nbsp;My Plan
              </li>
            </a>
          </ol>
          
          
         
        </div>

        {this.state.is_investor === "1" ? (
          <div
            style={{
              background: "#ff9c1a",
              color: "#fff",
              borderRadius: "20px",
              margin: "20px auto",
              textAlign: "center",
              maxWidth: "80%",
            }}
            onClick={() => {
              let founderId = localStorage.getItem("founder_id");
              let founderName = localStorage.getItem("founder_name");
              let founderEmail = localStorage.getItem("founder_email");
              let founderKyc = localStorage.getItem("founder_kycstatus");

              localStorage.setItem("investor_id", founderId);
              localStorage.setItem("Parent_investor_id", founderId);

              localStorage.setItem("investor_name", founderName);
              localStorage.setItem("Parent_investor_name", founderName);

              localStorage.setItem("investor_email", founderEmail);
              localStorage.setItem("Parent_investor_email", founderEmail);

              localStorage.setItem("investor_kycstatus", founderKyc);
              localStorage.setItem("Parent_investor_kycstatus", founderKyc);

              localStorage.removeItem("founder_id");
              localStorage.removeItem("founder_name");
              localStorage.removeItem("founder_email");
              localStorage.removeItem("founder_kycstatus");

              // add delay of 1 second before window location assign so that localstorage gets update
              setTimeout(() => {
                window.location.assign("/investor-dashboard");
              }, 1000);
            }}
          >
            <a
              style={{
                color: "#fff",
                padding: "10px",
                display: "block",
                textDecoration: "none"
              }}
              href="#"
            >
              Switch to Investor Dashboard
            </a>
          </div>

          
        ) : (
          <div
            
            onClick={() => {
              ReactGA.event({
                category: "Investor",
                action: "Apply As Investor",
              });
            }}
          >
            <a
              href="/founder-as-investor"
              style={{
                background: "#ff9c1a",
                color: "#fff",
                padding: "7px 14px",
                position: "relative",
                left: 32,
                top: 20,
                borderRadius: "20px"
              }}
            >
              Apply As Investor
            </a>
          
          </div>
        )}
      </ol>
    );
  }
}