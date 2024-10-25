import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import Apis from "../../constants/Apis";
import ReactGA from "react-ga4";
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_investor: "0",
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
      if (result.status == "1") {
        console.log(result.data[0], 's')
        let url =
          Apis.IMAGEURL +
          "profile/" +
          result.data[0].investor_id +
          "/" +
          result.data[0].user_profile_picture;
        // console.log('result',result);
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
  //p

  render() {
    return (
      <ol className="investor-sidebar">
        {this.state.is_investor == "1" && (
          <div className="founder-role-heading" style={{ margin: "0 25px" }}>
            <p>Account Details</p>
          </div>
        )}
        <div style={{ padding: "0 25px" }}>
          <a
            href="/founder-dashboard"
            className={
              window.location.pathname == "/founder-dashboard" ? "active" : ""
            }
          >
            <li className="hiw-li ">
              <i className="bx bx-grid-alt "></i> &nbsp;&nbsp;My Account
            </li>
          </a>
          <a
            href="/founder-investors"
            className={
              window.location.pathname == "/founder-investors" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bxs-user-account"></i>
              &nbsp;&nbsp;My Startups
            </li>
          </a>
          <a
            href="/founder-analytics"
            className={
              window.location.pathname == "/founder-analytics" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bx-trending-up"></i> &nbsp;&nbsp;My Plan
            </li>
          </a>
          <a
            href="/startup-form"
            className={
              window.location.pathname == "/startup-form" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bxs-file-doc" style={{ fontSize: 20 }}></i>{" "}
              &nbsp;&nbsp;Enquiry/Lead
            </li>
          </a>
          
        </div>
        
      </ol>
    );
  }
}
