import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import { Table, Spin, message, Input, Tag } from "antd";
import moment from "moment";
import Apis from "../../constants/Apis";
import Paiddocuments from "../../admin/components/modal/Paiddocuments2";
import axios from "axios";
export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinvestments: [],
      cinvestments: [],
      sortby: "",
      investor_id: "",
      documentmodalstatus: false,
      searchinput: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ investor_id: this.props.investor_id }, () =>
      this.getInvestments()
    );
  }

  // get investments list
  getInvestments = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.investor.getInvestments(params).then((result) => {
      if (result.status == 1) {
        // console.log("dd", result.data);
        this.setState({
          investments: result.data,
          cinvestments: result.data,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  showModal = () => {
    this.setState({ documentmodalstatus: true });
  };

  handleOk = () => {
    this.setState({ documentmodalstatus: false });
  };

  handleCancel = () => {
    this.setState({ documentmodalstatus: false });
  };

  //10-11-2022
  viewSignDocument = (docId) => {
    if (docId != "") {
      this.setState({ loading: true });
      axios({
        method: "post",
        responseType: "blob",
        url: `${process.env.REACT_APP_BASE_URL}api/admin/DocumentSign/DownloadDocument`,
        headers: {
          "Content-Type": "application/pdf",
        },
        data: {
          digioDocId: docId,
        },
      })
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          this.setState({ loading: false });
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(error);
        });
    } else {
      message.warning(
        "Please Request to Document Signing/ Could not able to find document Id into the database"
      );
    }
  };

  searchinput = (e) => {
    let text = e.target.value;
    text = text.toLowerCase();

    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];

      for (let item of this.state.cinvestments) {
        const dealName = item.deal_name.toLowerCase();
        const amtInvested = item.Investment_amt;
        const investedDate = item.Invested_dt.toLowerCase();

        if (
          dealName.includes(text) ||
          amtInvested.includes(text) ||
          investedDate.includes(text)
        ) {
          arr = [...arr, item];
        }

        this.setState({
          investments: arr,
          loading: false,
        });
      }
    } else {
      this.setState({
        investments: this.state.cinvestments,
        loading: false,
      });
    }
  };

  sortdata = (e) => {
    let sortby = e.target.value;
    let investments = this.state.investments;
    if (sortby == "asc") {
      investments.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    } else if (sortby == "desc") {
      investments.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
      });
    } else if (sortby == "dateasc") {
      investments.sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1;
      });
    } else if (sortby == "datedesc") {
      investments.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
      });
    } else if (sortby == "newest") {
      investments.sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1;
      });
    } else if (sortby == "hightolow") {
      investments.sort((a, b) => {
        return a.Investment_amt > b.Investment_amt ? 1 : -1;
      });
    } else if (sortby == "lowtohigh") {
      investments.sort((a, b) => {
        return a.Investment_amt < b.Investment_amt ? 1 : -1;
      });
    } else if (sortby == "oldest") {
      investments.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
      });
    }
    this.setState({
      investments: investments,
      sortby: sortby,
    });
  };
  render() {
    console.log(this.state.investments)
    const dataSource =
      this.state.investments &&
      this.state.investments.map((item, index) => {
        return {
          key: index,
          company: item.name,
          amtinvested: item.Investment_amt
            ? "Rs. " + parseFloat(item.Investment_amt)
            : "---",
          dateinvested: item.Invested_dt
            ? moment(item.Invested_dt).format("DD MMM, YYYY")
            : "---",
          remarks: item.remarks ? item.remarks : "NA",
          documents: item,
          action: item,
        };
      });

    const columns = [
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        // render: (text, record) => {
        //   let logourl =
        //     Apis.IMAGEURL + "deal/logo/" + text.deal_id + "/" + text.logo;
        //   return (
        //     <div>
        //       <img
        //         src={logourl}
        //         alt="logo"
        //         style={{ width: "40px", height: "40px", marginRight: 10 }}
        //       />
        //       <span>{text.name}</span>
        //     </div>
        //   );
        // },
      },
      {
        title: "Amount Invested",
        dataIndex: "amtinvested",
        key: "amtinvested",
      },
      {
        title: "Date Of Investment",
        dataIndex: "dateinvested",
        key: "dateinvested",
      },
      {
        title: "Documents",
        dataIndex: "documents",
        key: "documents",
        render: (text) => {
          return <Paiddocuments data={text} />;
        },
      },
       {
        title: "Remarks",
        dataIndex: "remarks",
        key: "remarks",
        render: (text) => {
          if (text === 'Exited') {
            return (
              <Tag color="blue">{text}</Tag>
            )
          } else {
            return (
              <span></span>
            )
          }
        }
      }
      // {
      //   title: "Signed Document",
      //   dataIndex: "documents",
      //   key: "documents",
      //   render: (text) =>
      //     text.document_signed_id &&
      //     text.founder_document_sign_status == "fndr_sign_success" ? (
      //       <a
      //         href="#"
      //         onClick={() => this.viewSignDocument(text.document_signed_id)}
      //       >
      //         View Signed Document
      //       </a>
      //     ) : (
      //       <>Pending Document Signed</>
      //     ),
      // },
    ];
    return (
      <div style={{ textAlign: "center" }}>
        <section id="hdii" className="responsive" style={{ minHeight: "70vh" }}>
          <div className="respo" style={{ textAlign: "center" }}>
            <div className=" mt-4 pt-4 mx-4 px-4" style={{ margin: "0 auto" }}>
              <h2 style={{ textAlign: "center", margin: "0 auto" }}>
                My Portfolio
              </h2>
            </div>
          </div>
          {/* <div className="row m-3  p-3">
            <div className="col-8">
              <div className="input-group ">
                <input
                      type="text"
                      className="form-control"                            
                      placeholder="Search"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={this.state.searchinput}
                      onChange={(e) =>
                        this.setState({ searchinput: e.target.value })
                      }
                    />
              </div>
            </div>
            <div className="col">
                  <div className="">
                    <select
                      id="select"
                      placeholder="Select"
                      className="form-select"
                      value={this.state.sortby}
                      onChange={(e) => this.sortdata(e)}
                    >
                      <option value="">Sort By</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="hightolow">
                        Min. Investment High to Low
                      </option>
                      <option value="lowtohigh">
                        Min. Investment Low to High
                      </option>
                    </select>
                  </div>
                </div>
          </div> */}
          {this.state.loading ? (
            <div className="text-center mt-5">
              <h4>Loading data...</h4>
              <Spin size="large" />
            </div>
          ) : this.state.cinvestments.length > 0 ? (
            <>
              <div className="row justify-content-start mx-4 px-4 mt-3 pt-3">
                <Input
                  placeholder="Search.."
                  type={"text"}
                  style={{ maxWidth: 300, height: 40 }}
                  value={this.state.searchinput}
                  onChange={(e) => this.searchinput(e)}
                />
              </div>
              <div className="row m-3 p-3">
                <Table
                  className="table-2"
                  dataSource={dataSource}
                  columns={columns}
                  bordered
                  loading={this.state.loading}
                />
              </div>
            </>
          ) : (
            <div className="text-center mt-5 responsive">
              <h4 className="responsive">
                You have not made any investment on Growth91 Platform.<br></br>
                <a href={!this.props.adminview?("/deals"):("#")}style={{ fontSize: "1.5rem" }}>
                  Start Today{" "}
                </a>
              </h4>
              <img src="No_data_rafiki.png" width={200} />
            </div>
          )}
        </section>
      </div>
    );
  }
}
