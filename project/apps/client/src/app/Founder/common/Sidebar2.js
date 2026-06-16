import React, { Component } from 'react';
// import { Layout, Menu } from 'antd';
// import sideBar from './sidebar2JsFile';
// import {
//   SnippetsOutlined, ToolOutlined ,CheckCircleOutlined, WindowsOutlined,FileTextOutlined,DatabaseOutlined,UserOutlined,UsergroupAddOutlined,
//   PayCircleOutlined,LineChartOutlined,FileDoneOutlined, FileProtectOutlined , AppstoreOutlined, DownOutlined
// } from '@ant-design/icons';

// const { Sider } = Layout;


  // let arrow = document.querySelectorAll(".arrow");
  // for (var i = 0; i < arrow.length; i++) {
  //   arrow[i].addEventListener("click", (e)=>{
  //  let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
  //  arrowParent.classList.toggle("showMenu");
  //   });
  // }
  // let sidebar = document.querySelector(".sidebar");
  // let sidebarBtn = document.querySelector(".bx-menu");
  // console.log(sidebarBtn);
  // sidebarBtn.addEventListener("click", ()=>{
  //   sidebar.classList.toggle("close");
  // });


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuySellOpen: window.location.pathname === "/investor-seller-listing-form" || window.location.pathname === "/my-buyer-interests"
    };
  }

  toggleBuySell = () => {
    this.setState({ isBuySellOpen: !this.state.isBuySellOpen });
  };

  render() {
    const isNewTab = window.location.pathname === "/investor-seller-listing-form" || window.location.pathname === "/my-buyer-interests";
    return (
      <div className={`investor-sidebar container ${isNewTab ? "mt-5 pt-4" : ""}`}>
      <div className="row row-cols-4">
          <div className="col-md-12 col-2"><a href='/founder-dashboard' className={
            window.location.pathname == "/founder-dashboard" ? "active" : ""
          }>
                  <li className='hiw-li row  text-center'>
                      <i className='bx bx-grid-alt font-weight-500 ps-md-0 ps-4 col-md-4'></i>
                      <div className='col-md-4 col-12 side-text'>Dashboard</div>

                  </li>
              </a>
          </div>
          <div className="col-md-12 col-2"><a 
             href="/founder-investors"
             className={
               window.location.pathname == "/founder-investors" ? "active" : ""
             }
          >
              <li className='hiw-li row text-center'>
              <i className='bx bxs-user-account col-md-4 ps-md-0 ps-3'></i>
              <div className='col-md-4 col-12 side-text'>Investors</div>
              </li>
          </a></div>
          <div className="col-md-12 col-2"> <a 
             href="/founder-analytics"
             className={
               window.location.pathname == "/founder-analytics" ? "active" : ""
             }
          >
              <li className='hiw-li row text-center'>
              <i className='bx bx-trending-up col-md-4 ps-md-0 ps-3  '></i> 
              <div className='col-md-4 col-12 side-text'>Analytics</div>

              </li>
          </a></div>
          <div className="col-md-12 col-2"> <a 
              href="/startup-form"
              className={
                window.location.pathname == "/startup-form" ? "active" : ""
              }
          >
              <li className='hiw-li row text-center'>
              {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
              {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
              <i className='bx bxs-file-doc col-md-4'/>
              <div className='col-md-4 col-12 side-text'>Startup-Form</div>

              </li>
          </a></div>
          <div className="col-md-12 col-2"> <a 
              href="/founderdash-documents"
              className={
                window.location.pathname == "/founderdash-documents" ? "active" : ""
              }
          >
              <li className='hiw-li row text-center'>
              {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
              {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
              <i className='bx bxs-file-doc col-md-4'/>
              <div className='col-md-4 col-12 side-text'>Documents</div>

              </li>
          </a></div>
          <div className="col-md-12 col-2"> <a 
              href="/assessment-form"
              className={
                window.location.pathname == "/assessment-form" ? "active" : ""
              }
          >
              <li className='hiw-li row text-center'>
              {/* <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/> */}
              {/* <i className='bi bi-cash-coin col-md-4' ></i> */}
              <i className='bx bx-calendar-star col-md-4'/>
              <div className='col-md-4 col-12 side-text'>Assessment Form</div>

              </li>
          </a></div>

          <div className="col-md-12 col-2">
            <li className="hiw-li row text-center" style={{ cursor: "pointer" }} onClick={this.toggleBuySell}>
              <i className="bx bx-store-alt col-md-4" />
              <div className="col-md-8 col-12 side-text d-flex align-items-center justify-content-center" style={{ whiteSpace: "nowrap" }}>
                Buy/Sell <i className={`bx bx-chevron-${this.state.isBuySellOpen ? "up" : "down"}`} style={{ fontSize: "1.2rem", marginLeft: "3rem" }}></i>
              </div>
            </li>
          </div>
          <div
            className="col-12 p-0"
            style={{
              maxHeight: this.state.isBuySellOpen ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
            }}
          >
            <div className="row m-0 p-0 w-100">
              <div className="col-12 p-0">
                <a
                  href="/my-buyer-interests"
                  className={
                    window.location.pathname == "/my-buyer-interests" ? "active" : ""
                  }
                >
                  <li className="hiw-li row text-center" style={{ paddingLeft: "35px" }}>
                    <i className="bx bx-star col-md-4" />
                    <div className="col-md-8 col-12 side-text text-start p-0">My Interests</div>
                  </li>
                </a>
              </div>
              <div className="col-12 p-0">
                <a
                  href="/investor-seller-listing-form"
                  className={
                    window.location.pathname == "/investor-seller-listing-form" ? "active" : ""
                  }
                >
                  <li className="hiw-li row text-center" style={{ paddingLeft: "35px" }}>
                    <i className="bx bx-list-plus col-md-4" />
                    <div className="col-md-8 col-12 side-text text-start p-0">Seller Listing</div>
                  </li>
                </a>
              </div>
            </div>
          </div>
      </div>
  </div>
    )
  }
}

export default Sidebar;
