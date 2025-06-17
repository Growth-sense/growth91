import React, { Component } from "react";
import { message, Spin, Checkbox, Modal } from "antd";
import $ from "jquery";
import Bridge from "../../constants/Bridge";
import { Link } from "@mui/material";
class Declaration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_additional_info_modal: false,
      send_me_copy_of_response: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
      validated: "",
      disableStatus: false,
      checkedStatus: false,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
    }
    $("#selected-field").focus();
    this.props.check();
  }

  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        console.log(result.data[0]);
        this.setState({
          send_me_copy_of_response: result.data[0].send_me_copy_of_response,
        });
        if (result.data[0].send_me_copy_of_response) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };

  // register
   updatefounder = () => {
 if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
    let params = {
      send_me_copy_of_response:
        this.state.checkedStatus == true ? "agreed" : "Not Agreed",
      founder_id: this.state.founder_id,
      no: 19,
      main_founder_id: localStorage.getItem("founder_id"),
    };
    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false, valueispresent: true });
        this.startupFormsSuccessEmail();
        this.props.fatchdata();
        // this.openNotification('topRight');
        message.success("Form is submited successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  saveandproceed = () => {
    if (this.state.validated == true) {
      console.log("validated", this.state.validated);
      this.updatefounder();
    } else {
      message.warning("Please fill all given forms.");
      return;
    }
  };
  startupFormsSuccessEmail() {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.startupFormsSuccessEmail(params).then((result) => {
      if (result == "1") {
        console.log("email send");
        message.success("Email sent successfully");
      } else {
        message.warning("Something went wrong. Please try again!");
      }
    });
  }
  save = () => {
    this.setState({ processtype: "save" }, () => this.updatefounder());
  };
  checkforvalidation = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        if (result.data.length > 0) {
          let item = result.data[0];
          console.log(item);
          if (
            item.f1_status == "success" &&
            item.f2_status == "success" &&
            item.f3_status == "success" &&
            item.f4_status == "success" &&
            item.f5_status == "success" &&
            item.f6_status == "success" &&
            item.f7_status == "success" &&
            item.f8_status == "success" &&
            item.f10_status == "success" &&
            item.f11_status == "success" &&
            item.f12_status == "success" &&
            item.f13_status == "success" &&
            item.f15_status == "success" &&
            item.f16_status == "success" &&
            item.f17_status == "success" &&
            item.f19_status == "success"
          ) {
            this.setState({ validated: true });
          } else {
            this.setState({ validated: false });
          }
        }
      }
    });
  };
  validate_forms = () => {
    if (this.state.checkedStatus == false) {
      message.warning("Please agree the declaration.");
      return;
    }
    this.props.check(-1);
    this.checkforvalidation();
  };
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ checkedStatus: e.target.checked });
  };
  render() {
    let active =
      this.state.send_me_copy_of_response && this.state.valueispresent == true
        ? false
        : true;
    return (
      <div>
        <section className="StepForm-section" style={{ display: "block" }}>
          <Spin spinning={this.state.loading}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="line-seperator">
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        background: "#fff",
                        paddingRight: 16,
                      }}
                    >
                      <span
                        style={{
                          background: "#fff",
                          width: 119,
                          height: 20,
                          zIndex: 4,
                          position: "absolute",
                          paddingRight: 10,
                        }}
                      >
                        Declaration{" "}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="d-flex">
                          <input
                            type="checkbox"
                            onClick={(e) =>{
                              if(e.target.value==1){
                                this.props.onInput(e.target.name, 0)

                              }else{
                                this.props.onInput(e.target.name, 1)

                              }
                            }
                            }
                            name="tudDeclare"
                            checked={this.props.unicorn.tudDeclare == 1}
                            value={this.props.unicorn.tudDeclare== true ?(1):(0)}
                            style={{
                              marginRight: 13,
                              textAlign: "justify",
                              width: "20px",
                            }}
                          />
                          <label style={{textAlign :"justify"}}>
                            {" "}
                            All the information provided is true and correct to
                            the best of our knowledge. If at any time in future,
                            it is found that information presented was incorrect
                            or wrongly presented with specific intentions; we
                            shall take sole responsibility of the consequences.
                            If funding decisions are made based on wrong
                            information provided by us; we shall indemnify the
                            investors up to total invested amount.
                           
                          </label>
                        </div>
                      </div>
                      <div
                        className="form-group  justify-content-between"
                        style={{ display: "none !important" }}
                      >
                        <div className="arrow-buttons">
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background: "#fff",
                              border: "1px solid #29176f",
                              color: "#29176f",
                            }}
                            onClick={this.props.prev}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-left"></i>
                          </button>
                        </div>
                        
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
          <Modal
            centered
            open={this.state.show_additional_info_modal}
            className="thankumodal"
            iconType="SmileOutlined"
            maskClosable={false}
            cancelText={"Cancel"}
            footer={[
              <>
                <Link
                  // to={`/MyUnicornPlan`}
                >
                  <button onClick={() => {
                    this.setState({ 
                      show_additional_info_modal: false
                    })
                    this.props.next();
                  }
                } 
                  className="btn btn-block">Continue with Additional Info</button>
                </Link>
                <Link 
                // to="/founder-dashboard"
                >
                  <button onClick={() => {
                    this.setState({ show_additional_info_modal: false });
                  }} className="btn btn-block">Skip</button>
                </Link>
              </>,
            ]}
          >
            <div className="modal-confirm">
              <div className="modal-content">
                <div className="modal-body">
                  
                  <p className="text-center">
                    <h4>Additional Information for Better Evaluation</h4>
                    <br/>
                  <strong>Note:</strong> This section is for internal evaluation by Growth91 and will not be
                  published on the Future Unicorn page. This may also be used to provide
                  additional information to your prospective investors, partners, or associates,
                  and to train our AI module on your behalf. Therefore, please provide as
                  much detailed information as possible.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </section>
      </div>
    );
  }
}

export default Declaration;
