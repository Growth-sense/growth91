import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Table,
  message,
  Button,
  Input,
  Spin,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";
import Bridge from "../constants/Bridge";
import { exportAssessmentForm } from "./helpers/exportAssessmentForm";

const { Content } = Layout;

class AdminAssessmentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      loading: false,
      downloadingId: null,
      list: [],
      clist: [],
      canAssessment: true,
    };
  }

  async componentDidMount() {
    try {
      const perms = await loadModulePermissions("founder_documents");
      this.setState({
        canAssessment: perms.canAssessment !== false,
      });
    } catch (e) {}

    if (this.props.noPermission) {
      return;
    }

    this.getAssessmentFoundersList();
  }

  getAssessmentFoundersList = () => {
    this.setState({ loading: true });
    Bridge.admin
      .get_assessment_founders_list()
      .then((result) => {
        if (result && result.status == 1) {
          const data = result.data || [];
          this.setState({
            list: data,
            clist: data,
            loading: false,
          });
        } else {
          message.error(
            (result && result.message) || "Failed to fetch assessment list."
          );
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        console.error("Error fetching assessment list", err);
        message.error("Failed to fetch assessment list.");
        this.setState({ loading: false });
      });
  };

  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ searchinput: text });

    if (text) {
      let query = text.toLowerCase().trim();
      let arr = this.state.clist.filter((item) => {
        let idStr = item.founder_id ? String(item.founder_id).toLowerCase() : "";
        let nameStr = item.founder_name
          ? String(item.founder_name).toLowerCase()
          : "";
        return idStr.includes(query) || nameStr.includes(query);
      });
      this.setState({ list: arr });
    } else {
      this.setState({ list: this.state.clist });
    }
  };

  get_assesment_form_details = (record) => {
    if (this.state.canAssessment === false) {
      message.error("You do not have permission to export assessment.");
      return;
    }

    const founder_id = record.founder_id;
    this.setState({ downloadingId: founder_id });

    Bridge.admin
      .get_assesment_form_details({ founder_id: founder_id })
      .then((result) => {
        this.setState({ downloadingId: null });
        if (result && result.status == 1 && result.data && result.data.length > 0) {
          exportAssessmentForm(
            result.data,
            `Assessment Form Details - Founder ${founder_id}`
          );
        } else {
          message.warn("Assessment data is not available for this founder.");
        }
      })
      .catch((err) => {
        console.error("Error exporting assessment", err);
        this.setState({ downloadingId: null });
        message.error("Failed to fetch assessment details.");
      });
  };

  render() {
    const { noPermission } = this.props;
    const { canAssessment, downloadingId } = this.state;

    const dataSource =
      this.state.list &&
      this.state.list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          founder_id: item.founder_id,
          founder_name: item.founder_name || "---",
          record: item,
        };
      });

    const columns = [
      {
        title: "Sr no",
        dataIndex: "srno",
        key: "srno",
        width: 90,
      },
      {
        title: "Founder id",
        dataIndex: "founder_id",
        key: "founder_id",
        width: 150,
      },
      {
        title: "Founder name",
        dataIndex: "founder_name",
        key: "founder_name",
      },
      {
        title: "Assessment",
        dataIndex: "record",
        key: "record",
        width: 190,
        render: (record) => {
          const isDownloading = downloadingId === record.founder_id;
          return (
            <div>
              <Button
                type="primary"
                loading={isDownloading}
                style={{ width: 165 }}
                onClick={() => this.get_assesment_form_details(record)}
                disabled={!canAssessment}
              >
                {isDownloading ? (
                  "Downloading..."
                ) : (
                  <>
                    Download Xlsx{" "}
                    <i
                      className="bx bx-cloud-download ps-2"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </>
                )}
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Layout
        style={{ minHeight: "100vh", marginTop: 0 }}
        className="main-dashboard-container"
      >
        <Navbar />

        <Layout className="site-layout">
          <Sidebar2 />

          {noPermission ? (
            <NoPermission />
          ) : (
            <Content className="home-section">
              <Card title="Assessment Data" style={{ margin: 16 }}>
                <Breadcrumb style={{ margin: "0" }}>
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Assessment Data</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />

                <div>
                  <Input
                    value={this.state.searchinput}
                    placeholder="Search by Founder ID or Name"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />

                  <div className="admin-table-wrapper">
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      loading={this.state.loading}
                      bordered
                      scroll={{ x: 600 }}
                    />
                  </div>
                  <style>{`
                    .admin-table-wrapper {
                      width: 100%;
                    }
                    @media (max-width: 768px) {
                      .admin-table-wrapper {
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                      }
                      .admin-table-wrapper .ant-table-cell-fix-left,
                      .admin-table-wrapper .ant-table-cell-fix-right {
                        position: static !important;
                      }
                      .admin-table-wrapper .ant-table-ping-left .ant-table-cell-fix-left-last::after,
                      .admin-table-wrapper .ant-table-ping-right .ant-table-cell-fix-right-first::after {
                        box-shadow: none !important;
                      }
                    }
                  `}</style>
                </div>
              </Card>
            </Content>
          )}
        </Layout>
      </Layout>
    );
  }
}

export default AdminAssessmentData;
