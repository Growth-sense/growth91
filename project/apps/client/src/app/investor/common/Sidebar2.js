import React, { Component } from "react";
import "../styles/common.css";
import Bridge from "../../constants/Bridge";
import Apis from "../../constants/Apis";
import ReactGA from "react-ga4";

export default class Sidebar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_founder: localStorage.getItem("founder_is_investor")
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("investor_id")) {
      window.location.assign("/Login");
      return;
    }
    this.get_investor_details();
  }
  get_investor_details = () => {
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
  render() {
    return (
      <div className="investor-sidebar container">
        <div className="row row-cols-4">
        {this.state.is_founder == "1" && (
          <div className="founder-role-heading" style={{ width: "100%",padding:"0" }}>
            <p style={{padding: "20px 10px 20px 20px",borderRadius: "10px"}}>Investor</p>
          </div>
        )}

          <div className="col-md-12 col-2">
            <a
              href="/investor-dashboard"
              className={
                window.location.pathname == "/investor-dashboard"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row  text-center">
                <i className="bx bxs-pie-chart-alt-2 font-weight-500 ps-md-0 ps-4 col-md-4"></i>
                <div className="col-md-4 col-12 side-text">Dashboard</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            <a
              href="/investor-portfolio"
              className={
                window.location.pathname == "/investor-portfolio"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row text-center">
                <i className="bx bxs-user-circle col-md-4 ps-md-0 ps-3"></i>
                <div className="col-md-4 col-12 side-text">Portfolio</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            {" "}
            <a
              href="/investor-analytics"
              className={
                window.location.pathname == "/investor-analytics"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row text-center">
                <i className="bx bx-signal-5 col-md-4 ps-md-0 ps-3  "></i>
                <div className="col-md-4 col-12 side-text">Analytics</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            {" "}
            <a
              href="/investor-transactions"
              className={
                window.location.pathname == "/investor-transactions"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row text-center">
                {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
                {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
                <i className="bx bx-transfer col-md-4" />
                <div className="col-md-4 col-12 side-text">Transactions</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            {" "}
            <a
              href="/investor-commitment"
              className={
                window.location.pathname == "/investor-commitment"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row text-center">
                {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
                {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
                <i className="fas fa-handshake col-md-4" />
                <div className="col-md-4 col-12 side-text">Commitments</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            {" "}
            <a
              href="/investor-documents"
              className={
                window.location.pathname == "/investor-documents"
                  ? "active"
                  : ""
              }
            >
              <li className="hiw-li row text-center">
                {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
                {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
                <i className="bx bxs-file-doc col-md-4" />
                <div className="col-md-4 col-12 side-text">Documents</div>
              </li>
            </a>
          </div>
          <div className="col-md-12 col-2">
            {" "}
            <a
              href="/Referral"
              className={
                window.location.pathname == "/Referral" ? "active" : ""
              }
            >
              <li className="hiw-li row text-center">
                {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
                {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
                <i className="bx bx-transfer-alt col-md-4" />
                <div className="col-md-4 col-12 side-text">Referral</div>
              </li>
            </a>
            <a
              href="/Group-Investments"
              className={
                window.location.pathname == "/Group-Investments" ? "active" : ""
              }
            >
              <li className="hiw-li row text-center">
                <i className="bx bx-transfer-alt col-md-4" />
                <div className="col-md-4 col-12 side-text">Group Investments</div>
              </li>
            </a>
            <a
              href="/My-Future-unicorn"
              className={
                window.location.pathname == "/My-Future-unicorn" ? "active" : ""
              }
            >
              <li className="hiw-li row text-center">
                <i className="bx bx-transfer-alt col-md-4" />
                <div className="col-md-4 col-12 side-text">Future Unicorn</div>
              </li>
            </a>
            <a
              href="/investor-seller-listing-form"
              className={
                window.location.pathname == "/investor-seller-listing-form" ? "active" : ""
              }
            >
              <li className="hiw-li row text-center">
                <i className="bx bx-list-plus col-md-4" />
                <div className="col-md-4 col-12 side-text">Seller Listing Form</div>
              </li>
            </a>
           
          
             {this.state.is_founder == "1" ? (
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
                  let founderId = localStorage.getItem("investor_id");
                  let founderName = localStorage.getItem("investor_name");
                  let founderEmail = localStorage.getItem("investor_email");
                  let founderKyc = localStorage.getItem("investor_kycstatus");

                  localStorage.setItem("founder_id", founderId);
                  localStorage.setItem("founder_name", founderName);
                  localStorage.setItem("founder_email", founderEmail);
                  localStorage.setItem("founder_kycstatus", founderKyc);

                  localStorage.removeItem("investor_id");
                  localStorage.removeItem("Parent_investor_id");
                  localStorage.removeItem("investor_name");
                  localStorage.removeItem("Parent_investor_name");
                  localStorage.removeItem("investor_email");
                  localStorage.removeItem("Parent_investor_email");
                  localStorage.removeItem("investor_kycstatus");
                  localStorage.removeItem("Parent_investor_kycstatus");

                  // add delay of 1 second before window location assign so that localstorage gets update
                  setTimeout(() => {
                    window.location.assign("/founder-dashboard");
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
                  Switch to Founder Dashboard
                </a>
              </div>

          
        ) : 

        (
          <div
          style={{marginBottom: "30px"}}
            onClick={() => {
              ReactGA.event({
                category: "Founder",
                action: "Apply As Founder",
              });
            }}
          >
            <a
              href="/investor-as-founder"
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
              Apply As Founder
            </a>
          </div>
        )
        }
          </div>

        </div>
      </div>
    );
  }
}
