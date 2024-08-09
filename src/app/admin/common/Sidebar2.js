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
           <Link to="/admin-dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/admin-dashboard">
                  Dashboard
               </Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <div className="iocn-link">
             <Link to="/admin-blog">
                <i className="bx bx-collection"></i>
                <span className="link_name">Blog Post</span>
             </Link>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/admin-blog">
                  Blog Post
               </Link>
              </li>
              <li>
               <Link className="link_name" to="/admin-blog-category">
                  Blog Category
               </Link>
              </li> */}

              {/* <li><a to="#">HTML & CSS</Link></li>
          <li><a to="#">JavaScript</Link></li>
          <li><a to="#">PHP & MySQL</Link></li> */}
            {/* </ul> */}
          {/* </li> */}
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Master Data</span>
             </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md2").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md2" className="sub-menu hide">
              <li>
               <Link className="link_name" to="#">
                  Master Data
               </Link>
              </li>
              
              <li>
               <Link to="/admin-startups  ">Startups</Link>
              </li>
              <li>
               <Link to="/admin-investors">Investors</Link>
              </li>
              <li>
               <Link to="/admin-founders">Founders</Link>
              </li>
              <li>
               <Link to="/admin-investments">Investments</Link>
              </li>
            </ul>
            
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i className="bx bxs-folder-minus"></i>
                <span className="link_name">Future Unicorn</span>
             </Link>
              
           
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md-future").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md-future" className="sub-menu hide">
              <li>
               <Link className="link_name" to="#">
                  Future Unicorn Data
               </Link>
              </li>
              
              <li>
               <Link to="/future-unicorn-startups">Startups</Link>
              </li>
              <li>
               <Link to="/future-unicorn-investors">Investors</Link>
              </li>
              <li>
               <Link to="/future-unicorn-founders">Founders</Link>
              </li>
             
            </ul>
            
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i className="bx bxs-folder-minus"></i>
                <span className="link_name">Groups</span>
             </Link>
              
           
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() =>
                  document.getElementById("md-future").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md-future" className="sub-menu hide">
              <li>
               <Link className="link_name" to="#">
                  Family Group Data
               </Link>
              </li>
              
              <li>
               <Link to="/admin-family">Family</Link>
              </li>
            
            </ul>
            
          </li>
          <li>
           <Link to="/premium-members">
              <i className="bx bx-user-pin"></i>
              <span className="link_name">Premium Members</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/premium-members">
                  Premium Members
               </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i class="bx bx-window-open"></i>
                <span className="link_name">Deal Setup</span>
             </Link>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md4").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md4" className="sub-menu hide ">
              <li>
               <Link className="link_name" to="#">
                Deal Setup
               </Link>
              </li>
              <li>
               <Link to="/open-deals">Open Deal</Link>
              </li>
              <li>
               <Link to="/admin-deals">
                Completed Deal
               </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i className="bx bx-transfer-alt"></i>
                <span className="link_name">Referral</span>
             </Link>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md1").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md1" className="sub-menu hide ">
              <li>
               <Link className="link_name" to="#">
                  Referral
               </Link>
              </li>
              <li>
               <Link to="/admin-retail-referral">Retail Referral</Link>
              </li>
              <li>
               <Link to="/admin-institutional-referral">
                  Institutional Referral
               </Link>
              </li>
              {/* <li><a to="#">Pigments</Link></li>
          <li><a to="#">Box Icons</Link></li> */}
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i className="bx bx-dollar-circle"></i>
                <span className="link_name">Payments</span>
             </Link>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md3").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md3" className="sub-menu hide ">
              <li>
               <Link className="link_name" to="#">
                  Payments
               </Link>
              </li>
              <li>
               <Link to="/admin-payments">Online Payments</Link>
              </li>
              <li>
               <Link to="/admin-payments-offline">Offline Payments</Link>
              </li>
              <li>
               <Link to="/pending-offline-payments">Pending Offline Payments</Link>
              </li>
              <li>
               <Link to="/online-document-payments">Document Payments</Link>
              </li>

              {/* <li><a to="#">Pigments</Link></li>
          <li><a to="#">Box Icons</Link></li> */}
            </ul>
          </li>
          <li>
           <Link to="/founder-documents">
              <i className="bx bxs-file-doc"></i>
              <span className="link_name">Founder Documents</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/founder-documents">
                  Founder Documents
               </Link>
              </li>
            </ul>
          </li>
          <li>
           <Link to="/documents">
              <i className="bx bxs-file-doc"></i>
              <span className="link_name">Documents</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/documents">
                  Documents
               </Link>
              </li>
            </ul>
          </li>
          <li>
           <Link to="/admin-settings">
              <i className="bx bx-cog"></i>
              <span className="link_name">Setting</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="/admin-settings">
                  Setting
               </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
             <Link to="#">
                <i class="bx bx-window-open"></i>
                <span className="link_name">Analytics</span>
             </Link>
              <i
                className="bx bxs-chevron-down arrow "
                onClick={() =>
                  document.getElementById("md5").classList.toggle("hide")
                }
              ></i>
            </div>
            <ul id="md5" className="sub-menu hide ">
              <li>
               <Link className="link_name" to="#">
                Analytics
               </Link>
              </li>
              <li>
               <Link to="/analytic-interest">Dropoff</Link>
              </li>
            </ul>
          </li>
          <li>
           <Link to="#" onClick={this.community}>
              <i className="bx bx-command"></i>
              <span className="link_name">Admin Community</span>
           </Link>
            <ul className="sub-menu blank">
              <li>
               <Link className="link_name" to="#">
                  Admin Community
               </Link>
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
