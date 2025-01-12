import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Sidebar from "./common/Sidebar";
import Sidebar2 from "./common/Sidebar2";
import Innerdasboard from "./components/Dashboard";

class Dashboard extends Component {
  render() {
    return (
      <div style={{ width: "100vw", background: "rgba(0, 0, 0, 0.036)" }}>
        <Header />

        <div className="row">
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <section></section>
            <Sidebar />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            <section></section>
            <Sidebar2 />
          </div>
          <div className="col-lg-10 pb-4 mt-5">
            <br />
            <br />
            <Innerdasboard investor_id={localStorage.getItem("investor_id")} />
          </div>
          <div className="ZI-0">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
