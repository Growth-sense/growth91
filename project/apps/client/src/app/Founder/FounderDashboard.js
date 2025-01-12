import React, { Component } from "react";
import Header from "../common/Header";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";

import Sidebar from "./common/Sidebar";
import Sidebar2 from "./common/Sidebar2";
import Bridge from "../constants/Bridge";
import { ThemeProvider } from "@nivo/core";

class FounderDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      founder_id: "",
      startup_id: "",
      startup_name: "",
      total_investment: "0",
      total_investor: "0",
    };
  }

  componentWillMount() {
    document.title = "Founder Dashboard - Growth91";
  }

  componentDidMount() {
    this.get_founder_dashboard_data();
  }

  get_founder_dashboard_data() {
    this.setState({ founder_id: localStorage.getItem("founder_id") });
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    console.log(params)
    localStorage.removeItem('investor_email')
            localStorage.removeItem('investor_id')
            localStorage.removeItem('investor_name')
            localStorage.removeItem('investor_kycstatus')
    // alert(1);
    Bridge.founder.getstartup_by_operational_founder(params).then((result) => {
      
      if (result.status == "1") {
        this.setState(
          {
            startup_name: result.data[0].name,
            startup_id: result.data[0].startupid,
          },
          localStorage.setItem("startup_id", result.data[0].startupid),
          
        );
      } else {
        console.log("Not a valid founder");
      }
    });
    if (localStorage.getItem("startup_id") != "") {
      params = {
        startup_id: localStorage.getItem("startup_id"),
      };
      Bridge.founder.get_founder_dashboard_details(params).then((result) => {
        if (result.status == "1") {
          this.setState({
            total_investment: result.data[0].total_investment,
            total_investor: result.data[0].total_investor,
          });
        } else {
          // console.log("Unable to get response value");
        }
      });
    }
  }

  render() {
    return (
      <div
        style={{
          background: "rgba(0, 0, 0, 0.036)",
          paddingBottom: "0",
          margin: "1px",
          height: "100%",
        }}
      >
        <Header />
        <section></section>

        <div className="row">
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
            style={{ width:'fit-content' }}> */}
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {/* <section></section> */}
            <Sidebar />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            {/* <section></section> */}
            <Sidebar />
          </div>

          <div className="  col col-lg-8 pb-4 ">
            {/* How do i invest? */}
            <section
              id="hdii"
              className="m-lg-0  m-3"
              style={{ marginTop: 25, minHeight: "75vh" }}
            >
              <div className="row dashboard-items">
                <div className="col-lg-4">
                  <div className="single my-2">
                    <h2>{this.state.total_investor}</h2>
                    <small>Investors</small>
                  </div>
                </div>
                <div className="col-lg-4 col-0">
                  <div className="single my-2">
                    <h2>{this.state.total_investment}</h2>
                    <small>Fund Raised Amount</small>
                  </div>
                </div>
                <div className="col-lg-4 col-0">
                  <div className="single my-2">
                    <h2>{this.state.startup_name}</h2>
                    <small>Startup Name</small>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-2 col-0"></div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default FounderDashboard;
