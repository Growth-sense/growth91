import React from "react";
import { Layout, Breadcrumb, Spin, message } from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";

const { Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      founder_count: 0,
      investor_count: 0,
      invested_amt: 0,
      total_convience_fees: 0,
      total_expected_amt: 0,
      Total_commitment_amount: 0,
      Total_completed_deal:0,
      Total_open_deal:0,
      loading: false,

    };
  }

  componentDidMount() {
    this.getdashboarddetails();
  }

  // get post list
  getdashboarddetails = () => {
    this.setState({ loading: true });
    Bridge.admin.getdashboarddetails().then((result) => {
      if (result.status == 1) {
        this.setState({
          loading: false,
          founder_count: result.founder[0].founder_count,
          investor_count: result.investor[0].investor_count,
          invested_amt:
            result.investment[0].total_investment &&
            parseFloat(result.investment[0].total_investment),
          total_expected_amt:
            result.Total_expected_deals_amount[0].Total_expected_deals_amount &&
            parseFloat(
              result.Total_expected_deals_amount[0].Total_expected_deals_amount
            ),
            Total_completed_deal:
            result.Total_completed_deal[0].Total_completed_deal &&
            parseFloat(
              result.Total_completed_deal[0].Total_completed_deal
            ),
            Total_open_deal:
            result.Total_open_deal[0].Total_open_deal &&
            parseFloat(
              result.Total_open_deal[0].Total_open_deal
            ),
          total_convience_fees:
            result.Total_convience_amount[0].Total_convience_amount &&
            parseFloat(result.Total_convience_amount[0].Total_convience_amount),
            Total_commitment_amount:
            result.Total_commitment_amount[0].Total_commitment_amount &&
            parseFloat(result.Total_commitment_amount[0].Total_commitment_amount),
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  formatToCurrency = (amount) => {
    return amount && amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  render() {
    var nf = new Intl.NumberFormat('en-IN');

    return (
      <Layout
        style={{ minHeight: "100vh", marginTop: 0 }}
        className="main-dashboard-container"
      >
        <Navbar />

        <Layout className="site-layout">
          <Sidebar2 />

          <Content className="home-section">
            <Breadcrumb
              style={{
                margin: "28px 0 0 27px",
              }}
            >
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className=""
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Spin spinning={this.state.loading}>
                {/* Start dashboard cards  */}
                <div className="row dasboard-cards">
                  <div className="col-lg-3 ">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          {nf.format(this.state.investor_count)}
                        </h3>
                      </div>
                      <div className="panel-body">Investors</div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          ₹ {nf.format(this.state.invested_amt)}
                        </h3>
                      </div>
                      <div className="panel-body">Investments</div>
                    </div>
                  </div> */}
                  <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          {nf.format(this.state.founder_count)}
                        </h3>
                      </div>
                      <div className="panel-body">Founders</div>
                    </div>
                  </div>
                </div>
                <div className="row dasboard-cards">
                <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          {nf.format(this.state.Total_completed_deal)}
                        </h3>
                      </div>
                      <div className="panel-body">No of Completed Deals</div>
                    </div>
                  </div>
                <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          {nf.format(this.state.Total_open_deal)}
                        </h3>
                      </div>
                      <div className="panel-body">No of open Deals </div>
                    </div>
                  </div>
                </div>
                <div className="row dasboard-cards">
                  <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          ₹ {nf.format(parseInt(this.state.total_convience_fees))}
                        </h3>
                      </div>
                      <div className="panel-body">Total Convenience Fees</div>
                    </div>
                    
                  </div>
                  <div className="col-lg-3">
                    <div className="item">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                        ₹ {nf.format(parseInt(this.state.Total_commitment_amount))}
                        </h3>
                      </div>
                      <div className="panel-body">
                      Total Commitment Amounts                      </div>
                    </div>
                  </div>
                </div>
                {/* End dashboard cards */}
              </Spin>
            </div>
          </Content>
        </Layout>
        <BottomBar />
      </Layout>
    );
  }
}

export default Dashboard;
