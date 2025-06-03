import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  community() {
    if (localStorage.getItem("admin_user") == "1") {
      let name = "Growth91";
      let img =
        "http://forum.growth91.com/uploads/default/original/1X/157d966945fb4ed34de9fdf55747217a19b762e0.png";
      let admin_id = "1";
      let admin_email = "growth91web@gmail.com";
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${admin_email}&user_id=${admin_id}&name=${name}&img=${img}`;
      window.location.assign(loc);
    }
  }
  render() {
    return (
      <div id="menu" className="sidebar close">
        {/* close  showMenu to toggle */}
        <div className="logo-details">
          {/* <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">CodingLab</span> */}
        </div>
        <ul className="nav-links">
          <li>
           <a href="/admin-dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/admin-dashboard">
                  Dashboard
               </a>
              </li>
            </ul>
          </li>
          {/* <li>
            <div className="iocn-link">
             <a href="/admin-blog">
                <i className="bx bx-collection"></i>
                <span className="link_name">Blog Post</span>
             </a>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/admin-blog">
                  Blog Post
               </a>
              </li>
              <li>
               <a className="link_name" href="/admin-blog-category">
                  Blog Category
               </a>
              </li> */}

              {/* <li><a href="#">HTML & CSS</a></li>
          <li><a href="#">JavaScript</a></li>
          <li><a href="#">PHP & MySQL</a></li> */}
            {/* </ul> */}
          {/* </li> */}
          <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Master Data</span>
             </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md2").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md2" className="sub-menu hide">
              <li>
               <a className="link_name" href="#">
                  Master Data
               </a>
              </li>
              
              <li>
               <a href="/admin-startups  ">Startups</a>
              </li>
              <li>
               <a href="/admin-investors">Investors</a>
              </li>
              <li>
               <a href="/admin-founders">Founders</a>
              </li>
              <li>
               <a href="/admin-investments">Investments</a>
              </li>
            </ul>
            
          </li>
          {/* <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bxs-folder-minus"></i>
                <span className="link_name">Future Unicorn</span>
             </a>
              
           
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md-future").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md-future" className="sub-menu hide">
              <li>
               <a className="link_name" href="#">
                  Future Unicorn Data
               </a>
              </li>
              
              <li>
               <a href="/future-unicorn-startups">Startups</a>
              </li>
              <li>
               <a href="/future-unicorn-investors">Investors</a>
              </li>
              <li>
               <a href="/future-unicorn-founders">Founders</a>
              </li>
             
            </ul>
            
          </li> */}
          <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bxs-folder-minus"></i>
                <span className="link_name">Groups</span>
             </a>
              
           
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md-future").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md-future" className="sub-menu hide">
              <li>
               <a className="link_name" href="#">
               Group Investments Data
               </a>
              </li>
              
              <li>
               <a href="/admin-family">Group Investments</a>
              </li>
              <li>
               <a href="/family-Remove-Request">Group Remove Requests</a>
              </li>
            
            </ul>
            
          </li>
          <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bxs-folder-minus"></i>
                <span className="link_name">Unicorns</span>
             </a>
              
           
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md-futureuni").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md-futureuni" className="sub-menu hide">
              <li>
               <a className="link_name" href="#">
               Future Unicorn
               </a>
              </li>
              
              <li>
               <a href="/admin-unicorn">View Published Unicorns</a>
              </li>
              <li>
               <a href="/admin-all-unicorn">View All Unicorns</a>
              </li>
              <li>
               <a href="/admin-unicorn-payments">View Payments</a>
              </li>
           
            
            </ul>
            
          </li>
          <li>
           <a href="/premium-members">
              <i className="bx bx-user-pin"></i>
              <span className="link_name">Premium Members</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/premium-members">
                  Premium Members
               </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <a href="#">
                <i class="bx bx-window-open"></i>
                <span className="link_name">Deal Setup</span>
             </a>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md4").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md4" className="sub-menu hide ">
              <li>
               <a className="link_name" href="#">
                Deal Setup
               </a>
              </li>
              <li>
               <a href="/open-deals">Open Deal</a>
              </li>
              <li>
               <a href="/admin-deals">
                Completed Deal
               </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bx-transfer-alt"></i>
                <span className="link_name">Referral</span>
             </a>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md1").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md1" className="sub-menu hide ">
              <li>
               <a className="link_name" href="#">
                  Referral
               </a>
              </li>
              <li>
               <a href="/admin-retail-referral">Retail Referral</a>
              </li>
              <li>
               <a href="/admin-institutional-referral">
                  Institutional Referral
               </a>
              </li>
              {/* <li><a href="#">Pigments</a></li>
          <li><a href="#">Box Icons</a></li> */}
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <a href="#">
                <i className="bx bx-dollar-circle"></i>
                <span className="link_name">Payments</span>
             </a>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md3").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md3" className="sub-menu hide ">
              <li>
               <a className="link_name" href="#">
                  Payments
               </a>
              </li>
              <li>
               <a href="/admin-payments">Online Payments</a>
              </li>
              <li>
               <a href="/admin-payments-offline">Offline Payments</a>
              </li>
              <li>
               <a href="/pending-offline-payments">Pending Offline Payments</a>
              </li>
              <li>
               <a href="/online-document-payments">Document Payments</a>
              </li>

              {/* <li><a href="#">Pigments</a></li>
          <li><a href="#">Box Icons</a></li> */}
            </ul>
          </li>
          <li>
           <a href="/founder-documents">
              <i className="bx bxs-file-doc"></i>
              <span className="link_name">Founder Documents</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/founder-documents">
                  Founder Documents
               </a>
              </li>
            </ul>
          </li>
          <li>
           <a href="/documents">
              <i className="bx bxs-file-doc"></i>
              <span className="link_name">Documents</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/documents">
                  Documents
               </a>
              </li>
            </ul>
          </li>
          <li>
           <a href="/admin-settings">
              <i className="bx bx-cog"></i>
              <span className="link_name">Setting</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="/admin-settings">
                  Setting
               </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <a href="#">
                <i class="bx bx-window-open"></i>
                <span className="link_name">Analytics</span>
             </a>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md5").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md5" className="sub-menu hide ">
              <li>
               <a className="link_name" href="#">
                Analytics
               </a>
              </li>
              <li>
               <a href="/analytic-interest">Dropoff</a>
              </li>
            </ul>
          </li>
          <li>
           <a href="#" onClick={this.community}>
              <i className="bx bx-command"></i>
              <span className="link_name">Admin Community</span>
           </a>
            <ul className="sub-menu blank">
              <li>
               <a className="link_name" href="#">
                  Admin Community
               </a>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <!--<img src="image/profile.jpg" alt="profileImg">--> */}
              </div>

              {/* <i className='bx bx-menu' ></i> */}

              {/* <i className='bx bx-log-out' ></i> */}
              {/* <i class='bx bx-menu-alt-left'></i> */}

              <i
                id="id1"
                className="bx bx-menu-alt-left"
                onClick={() =>
                  document
                    .getElementById("menu")
                    .classList.toggle("close")
                    .document.getElementById("id1")
                    .classList.toggle("bxs-chevrons-right")
                }
              ></i>
              {/* <i className='bx bxs-chevrons-right' ></i> */}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
