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




  render() {
    return (
      <div className='investor-sidebar container'>
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
      </div>
  </div>
    )
  }
}

export default Sidebar;
