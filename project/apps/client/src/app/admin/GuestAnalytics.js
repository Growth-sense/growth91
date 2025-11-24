import React, { Component } from "react";
import { Layout, Breadcrumb, Card, DatePicker, Row, Col, Statistic, Table, Button, Spin } from "antd";
import moment from "moment";
import axios from "axios";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";

const { Content } = Layout;
const { RangePicker } = DatePicker;

class GuestAnalytics extends Component {
  constructor(props) {
    super(props);
    const end = moment().endOf("day");
    const start = moment().subtract(6, "days").startOf("day");
    this.state = {
      loading: false,
      startDate: start,
      endDate: end,
      pickerValue: [start, end],
      metrics: {
        guest_started: 0,
        guest_attempt_gated_action: 0,
        signup_started: 0,
        signup_completed: 0,
      },
      events: [], // keep raw events if needed later
      unicornInterest: [], // aggregated I am interested counts per unicorn
      hasAppliedFilter: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  buildTitle = () => {
    const { startDate, endDate, hasAppliedFilter } = this.state;
    if (!startDate || !endDate) return "Guest Activity";

    if (!hasAppliedFilter) {
      // default: last 7 days
      return "Guest Activity in last 7 days";
    }

    const from = startDate.format("D MMM YYYY");
    const to = endDate.format("D MMM YYYY");
    return `Guest Activity from ${from} to ${to}`;
  };

  fetchData = async () => {
    const { startDate, endDate } = this.state;
    if (!startDate || !endDate) return;

    this.setState({ loading: true });
    try {
      const params = {
        from_date: startDate.startOf("day").format("YYYY-MM-DD"),
        to_date: endDate.endOf("day").format("YYYY-MM-DD"),
      };

      // Placeholder admin API endpoint. Backend can implement:
      // GET /api/admin/GuestAnalytics/summary?from_date=YYYY-MM-DD&to_date=YYYY-MM-DD
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/GuestAnalytics/summary`,
        { params }
      );

      if (response.data && response.data.status === "1") {
        const { metrics, events, unicorn_interest } = response.data.data || {};
        this.setState({
          metrics: metrics || {
            guest_started: 0,
            guest_attempt_gated_action: 0,
            signup_started: 0,
            signup_completed: 0,
          },
          events: events || [],
          unicornInterest: unicorn_interest || [],
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (e) {
      console.error("Error loading guest analytics", e);
      this.setState({ loading: false });
    }
  };

  handleRangeChange = (values) => {
    this.setState({ pickerValue: values });
  };

  handleApply = () => {
    const [start, end] = this.state.pickerValue || [];
    if (!start || !end) return;

    this.setState(
      {
        startDate: start,
        endDate: end,
        hasAppliedFilter: true,
      },
      () => this.fetchData()
    );
  };

  handleReset = () => {
    const end = moment().endOf("day");
    const start = moment().subtract(6, "days").startOf("day");

    this.setState(
      {
        startDate: start,
        endDate: end,
        pickerValue: [start, end],
        hasAppliedFilter: false,
      },
      () => this.fetchData()
    );
  };

  render() {
    const { loading, pickerValue, metrics, unicornInterest } = this.state;

    const columns = [
      {
        title: "SR NO.",
        key: "srno",
        render: (_text, _record, index) => index + 1,
        width: 80,
      },
      {
        title: "Unicorn ID",
        dataIndex: "unicorn_id",
        key: "unicorn_id",
        width: 150,
      },
      {
        title: "I am interested count",
        dataIndex: "interest_count",
        key: "interest_count",
        width: 200,
        sorter: (a, b) =>
          (Number(a.interest_count) || 0) - (Number(b.interest_count) || 0),
        defaultSortOrder: "descend",
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />

          <Layout className="site-layout">
            <Sidebar2 />

            <Content className="home-section">
              <Card
                title={
                  <div style={{ whiteSpace: "normal" }}>
                    {this.buildTitle()}
                  </div>
                }
                style={{ margin: 16 }}
                extra={
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      flexWrap: "wrap",          // allow wrap on small screens
                      justifyContent: "flex-end"
                    }}
                  >
                    <RangePicker
                      value={pickerValue}
                      onChange={this.handleRangeChange}
                      allowClear={false}
                      style={{ minWidth: 260, maxWidth: "100%" }}   // responsive width
                    />
                    <Button
                      type="primary"
                      onClick={this.handleApply}
                      style={{ minWidth: 90 }}
                    >
                      Apply
                    </Button>
                    <Button
                      onClick={this.handleReset}
                      style={{ minWidth: 90 }}
                    >
                      Reset
                    </Button>
                  </div>
                }
              >
                <Breadcrumb
                  style={{
                    margin: "0 0 16px 0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Guest Analytics</Breadcrumb.Item>
                </Breadcrumb>

                <Spin spinning={loading}>
                  <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                    <Col xs={24} md={6}>
                      <Card bordered style={{ borderRadius: 8 }}>
                        <Statistic
                          title="Guest sessions started"
                          value={metrics.guest_started || 0}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={6}>
                      <Card bordered style={{ borderRadius: 8 }}>
                        <Statistic
                          title="Gated clicks (I'm interested)"
                          value={metrics.guest_attempt_gated_action || 0}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={6}>
                      <Card bordered style={{ borderRadius: 8 }}>
                        <Statistic
                          title="Signup started"
                          value={metrics.signup_started || 0}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={6}>
                      <Card bordered style={{ borderRadius: 8 }}>
                        <Statistic
                          title="Signup completed"
                          value={metrics.signup_completed || 0}
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Table
                    dataSource={unicornInterest || []}
                    columns={columns}
                    rowKey={(_record, index) => index}
                    bordered
                    scroll={{ x: "max-content" }}
                  />
                </Spin>
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default GuestAnalytics;