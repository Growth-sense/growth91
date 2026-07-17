import React, { Component } from "react";
import "../styles/common.css";
// import'./web/vendors/fontawesome/css/fontawesome-all.min.css' ;
import commientment from './3719eceb9a3562487051c17741aad593.png'
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuySellOpen: window.location.pathname === "/investor-seller-listing-form" || window.location.pathname === "/my-buyer-interests"
    };
  }

  toggleBuySell = () => {
    this.setState((prevState) => ({
      isBuySellOpen: !prevState.isBuySellOpen,
    }));
  };

  componentDidMount() {
    if (!localStorage.getItem("investor_id")) {
      window.location.assign("/Login");
      return;
    }
  }

  render() {
    return (
      <ul className="investor-sidebar mt-5 pt-4" style={{ listStyle: 'none' }}>
        <a
          href="/investor-dashboard"
          className={
            window.location.pathname == "/investor-dashboard" ? "active" : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bxs-pie-chart-alt-2"></i> &nbsp;&nbsp;Dashboard
          </li>
        </a>
        <a
          href="/investor-portfolio"
          className={
            window.location.pathname == "/investor-portfolio" ? "active" : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bxs-user-circle"></i> &nbsp;&nbsp;Portfolio
          </li>
        </a>
        <a
          href="/investor-analytics"
          className={
            window.location.pathname == "/investor-analytics" ? "active" : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bx-signal-5"></i> &nbsp;&nbsp;Analytics
          </li>
        </a>
        <a
          href="/investor-transactions"
          className={
            window.location.pathname == "/investor-transactions" ? "active" : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bx-transfer" /> &nbsp;&nbsp;Transactions
          </li>
        </a>
        <a
          href="/investor-commitment"
          className={
            window.location.pathname == "/investor-commitment"
              ? "active"
              : ""
          }
        >
          <li className="hiw-li">
            {/* <img src={commientment} /> */}
            <i className="fas fa-handshake col-md-4" />&nbsp;&nbsp;Commitments
                      </li>
        </a>
        <a
          href="/investor-documents"
          className={
            window.location.pathname == "/investor-documents"
              ? "active"
              : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bxs-file-doc" /> &nbsp;&nbsp;Documents
          </li>
        </a>

        <li className="hiw-li" onClick={this.toggleBuySell} style={{ cursor: "pointer" }}>
          <i className="bx bx-store-alt" /> &nbsp;&nbsp;Buy/Sell
          <i className={`bx bx-chevron-${this.state.isBuySellOpen ? "up" : "down"}`} style={{ float: "right", marginTop: "4px", marginRight: "10px" }}></i>
        </li>
        <ul
          className="submenu"
          style={{
            listStyle: "none",
            paddingLeft: "35px",
            maxHeight: this.state.isBuySellOpen ? "200px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease-out"
          }}
        >
          <a
            href="/investor-seller-listing-form"
            className={
              window.location.pathname == "/investor-seller-listing-form" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bx-list-plus"></i> &nbsp;&nbsp;Seller Listing
            </li>
          </a>
          <a
            href="/my-buyer-interests"
            className={
              window.location.pathname == "/my-buyer-interests" ? "active" : ""
            }
          >
            <li className="hiw-li">
              <i className="bx bx-star"></i> &nbsp;&nbsp;My Interests
            </li>
          </a>
        </ul>

        <a
          href="/Referral"
          className={window.location.pathname == "/Referral" ? "active" : ""}
        >
          {/* <li className='hiw-li row text-center'>
                    <img className='col-md-4 col-12 ' src='icon/transaction.png' style={{width : '50px'}} alt=""/>
                    <i className='bi bi-cash-coin col-md-4' ></i>
                    <i className='bx bx-transfer col-md-4'/>
                    <i class='bx bx-transfer-alt'></i>
                    <div className='col-md-4 col-12 side-text'>Referral</div>

                    </li> */}

          <li className="hiw-li">
            <i className="bx bx-transfer-alt" /> &nbsp;&nbsp;Referral
          </li>
        </a>

        <a
          href="/Deals"
          className={
            window.location.pathname == "/investor-deals" ? "active" : ""
          }
        >
          <li className="hiw-li">
            <i className="bx bxs-pie-chart-alt-2"></i> &nbsp;&nbsp;Deals
          </li>
        </a>
      </ul>
    );
  }
}
