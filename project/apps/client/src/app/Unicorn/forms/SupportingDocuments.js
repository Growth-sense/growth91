import React, { Component } from "react";
import { message, Spin, Button, notification } from "antd";
import Bridge from "../../constants/Bridge";
import ProgressBar from "@ramonak/react-progress-bar";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import $ from "jquery";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
class SupportingDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      have_you_raised_fund_for_startup: "",
      pitch: "",
      documents: [],
      pitchpdffile: "",
      doc1: "",
      doc2: "",
      doc3: "",
      documentfile: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
      upload_progres1: false,
      upload_progres2: false,
      upload_progres3: false,
      show_progress_bar: false,
      upload_progres1_no: 0,
      upload_progres2_no: 0,
      upload_progres3_no: 0,
      formloader: false,
      formloader2: false,
      marketoverview: [{ content1: "" }, { content1: "" }, { content1: "" }],
      uploaded_document_list: [],
      startuphighlight: [
        { title: "Revenue Growth ", content1: "" },
        { title: " New Initiatives, Operational Efficiency", content1: "" },
        { title: "Performance and Achievements ", content1: "" },
        {
          title: " Previous Funding/Future Funding and its Utilization",
          content1: "",
        },
      ],
      titlestartuphigh: [
        "Revenue Growth ",
        " New Initiatives, Operational Efficiency",
        "Performance and Achievements ",
        " Previous Funding/Future Funding and its Utilization",
      ],
    };
  }
  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
    }
    if (this.props.unicorn.tudMark) {
      this.setState({ marketoverview: JSON.parse(this.props.unicorn.tudMark) });
    }
    console.log((this.props.unicorn.tudStartupHighlights));
    
    if (this.props.unicorn.tudStartupHighlights) {
      this.setState({
        startuphighlight: JSON.parse(this.props.unicorn.tudStartupHighlights),
      });
    }
    console.log(this.state.startuphighlight);
    
    $("#selected-field").focus();
    this.props.check();
    // console.log('validated', this.props.validated);
  }
  addmarketcv = (e) => {
    this.setState((prev) => ({
      marketoverview: [...prev.marketoverview, { content1: "" }],
    }));
  };
  addstartuphighlight = (e) => {
    this.setState((prev) => ({
      startuphighlight: [...prev.startuphighlight, { content1: "" }],
    }));
  };

  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          pitchpdffile: result.data[0].pitch,
          uploaded_document_list: result.data[0].documents
            ? JSON.parse(result.data[0].documents)
            : [],
        });
        if (result.data[0].pitch) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };
  saveandproceed = () => {
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    if (!this.state.pitch) {
      message.warning("Please select pitch file.");
      return;
    }
    if (this.state.pitch.size >= 10000000) {
      message.warning("File size of pitch file should less than 10mb.");
      return;
    }
    if (this.state.documents.length > 0) {
      if (this.state.documents.length > 3) {
        message.warning("You can upload maximum 3 files.");
        return;
      } else {
        let status = true;
        for (let item of this.state.documents) {
          if (item.size >= 10000000) {
            message.warning("File size of document should less than 10mb.");
            return;
          }
        }
      }
    }
    // this.props.check();
    this.setState({ processtype: "saveandproceed" }, () => this.updateimg());
  };
  save = () => {
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    this.setState({ processtype: "save" }, () => this.updateimg());
  };
  onChangeFile = async (e, type) => {
    const formData = new FormData();
    if (type == "pdf") {
      // this.setState({ pitchpdffile: e.target.files[0] });
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID ", this.props.unicorn.tudTempUdID);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Accept": "application/json",
            // "type": "formData"
          },
        }
      );
      if (response) {
        this.setState({ pitchpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudPitchDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }

      // this.props.onInput("tudPitchDeck",e.target.files[0])
    }
  };

  updateimg = async () => {
    let i = 0;
    this.props.onInput(
      "tudStartupHighlights",
      JSON.stringify(this.state.startuphighlight)
    );

    setTimeout(() => {
      this.props.onInput("tudMark", JSON.stringify(this.state.marketoverview));
    }, 3000);
    this.savedata();
  };

  savedata = () => {
    setTimeout(async () => {
      console.log(this.state.marketoverview);
      console.log(this.state.startuphighlight);

      // const data = await axios.post(`${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadunicornFiles`,this.formData)
      // .then((result) => {
      //   console.log(result);
      // });
      console.log(this.props.unicorn.tudStartupHighlights);
      console.log("tudMark", this.props.unicorn.tudBannerImage);
      Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
        if (result.status == 1) {
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype == "next") {
            //  this.props.next();
          } else if (this.state.processtype == "prev") {
            //  this.props.prev();
          } else if (this.state.processtype == "saveandproceed") {
            //  this.props.activate();
            message.success("Reference details are updated successfully.", 6);
          } else {
            message.success("Reference details are updated successfully.", 6);
          }
        } else {
          message.warning(result.message);
          this.setState({ loading: false });
        }
      });
      // return;
      if (this.state.processtype == "next") {
        //  this.props.next();
      } else if (this.state.processtype == "prev") {
        //  this.props.prev();
      }
    }, 5000);
  };
  openpitchfile = () => {
    let link = `${
      process.env.REACT_APP_BASE_URL
    }api/uploads/founders/pitch/${localStorage.getItem("founder_id")}/${
      this.state.pitchpdffile
    }`;
    window.open(link, "_blank");
  };
  opendocumentfile = (docname) => {
    let link = `${
      process.env.REACT_APP_BASE_URL
    }api/uploads/founders/documents/${localStorage.getItem(
      "founder_id"
    )}/${docname}`;
    window.open(link, "_blank");
  };
  openNotification = (placement) => {
    notification.success({
      message: `Founder form is submitted successfully.`,
      description: "Thank you for completing founder form.",
      placement,
    });
    setTimeout(() => {
      localStorage.removeItem("register_id");
      window.location.reload();
    }, 3000);
  };
  next = () => {
    this.setState({ processtype: "next" }, () => this.updateimg());
  };
  prev = () => {
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    this.setState({ processtype: "prev" }, () => this.updateimg());
  };
  deletedocument = (item) => {
    let arr = [];
    this.setState({ show_progress_bar: false });
    for (let single of this.state.uploaded_document_list) {
      if (single != item) {
        arr = [...arr, single];
      }
    }
    let params = {
      founder_id: localStorage.getItem("founder_id"),
      documents: arr,
      removed_document: item,
    };
    Bridge.founders.delete_startup_form_document(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        // this.getData(localStorage.getItem('founder_id'));
        this.setState({ show_progress_bar: false });
      } else {
      }
    });
  };
  delete_pitch_file = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
      pitch: this.state.pitchpdffile,
    };
    Bridge.delete_pitch_file(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        // this.getData(localStorage.getItem('founder_id'));
      } else {
        message.warning("Please try again!");
        return;
      }
    });
  };
  openInputTypefile = () => {
    $("#pitch_input_type_file").trigger("click");
  };
  triggerDocumentInputFile = () => {
    $("#document_input_type_file").trigger("click");
  };
  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.marketoverview];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ marketoverview: newEntries });
  };
  handleInputhighlightChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.startuphighlight];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ startuphighlight: newEntries });
  };

  formData = new FormData();
  saveimg = () => {};

  onChangeMultipleFile = async (e) => {
    const formData = new FormData();

    if (e.target.name == "tudDoc1") {
      this.setState({ doc1: e.target.files[0] });
      this.formData.append("tudDoc1", e.target.files[0]);
    } else if (e.target.name == "tudDoc2") {
      this.setState({ doc2: e.target.files[0] });
      this.formData.append("tudDoc2", e.target.files[0]);
    } else if (e.target.name == "tudDoc3") {
      this.setState({ doc3: e.target.files[0] });
      this.formData.append("tudDoc3", e.target.files[0]);
    } else if (e.target.name == "tudPitchDeck") {
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Accept": "application/json",
            // "type": "formData"
          },
        }
      );

      if (response) {
        this.setState({ pitchpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudPitchDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudBannerImage") {
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Accept": "application/json",
            // "type": "formData"
          },
        }
      );

      if (response) {
        // this.setState({ BannerImage: response.data.data.upfile });
        this.props.onInput(
          "tudBannerImage",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudLogoImage") {
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Accept": "application/json",
            // "type": "formData"
          },
        }
      );

      if (response) {
        // this.setState({ BannerImage: response.data.data.upfile });
        this.props.onInput(
          "tudLogoImage",
          JSON.stringify(response.data.data.upfile)
        );
      }
    }
  };

  render() {
    let active =
      this.state.have_you_raised_fund_for_startup &&
      this.state.valueispresent == true
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
                          position: "relative",
                          paddingRight: 10,
                        }}
                      >
                        Supporting Documents
                      </span>
                    </div>
                    <hr />
                    {/* <button onClick={this.addmarketcv}>aaaa</button> */}
                  </div>
                  {this.props.error == "0" &&
                    (!this.state.pitchpdffile ||
                      !this.state.pitch ||
                      !this.state.documentfile ||
                      !this.state.documents) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {(!this.state.pitchpdffile || !this.state.pitch) && (
                            <li>
                              <span>Please select pitch file.</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <Spin spinning={this.state.formloader}>
                        <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2">
                              Select Pitch PDF (Max file size should be 10MB)<span className="text-danger">*</span>
                             
                            </label>
                            <div className="mb-1">
                              {this.props.unicorn.tudPitchDeck != "" && JSON.parse(this.props.unicorn.tudPitchDeck) != "" ? "File Uploaded" : ""}
                            </div>

                            <input
                              type="file"
                              id="pitch_input_type_file"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                              accept=".pdf,.docx"
                              name="tudPitchDeck"
                              // style={{display:'none'}}
                            />                        
                          </div>
                        </div>
                        {/* <button>Add pitch File</button> */}
                      </Spin>
                      {/* <div className="form-group ">
                        <div className="mt-4">
                          <Spin spinning={this.state.formloader2}>
                            <div className="d-flex flex-wrap justify-content-start align-items-center">
                              <label className="mb-2">
                                Please select document.(Maximum of 3 documents,
                                10MB each can be uploaded)
                              </label>

                              <input
                                type="file"
                                multiple={true}
                                name="tudDoc1"
                                id="document_input_type_file"
                                onChange={(e) => this.onChangeMultipleFile(e)}
                                accept=".pdf"
                              />
                              <input
                                type="file"
                                name="tudDoc2"
                                multiple={true}
                                id="document_input_type_file"
                                onChange={(e) => this.onChangeMultipleFile(e)}
                                accept=".pdf"
                              />
                              <input
                                name="tudDoc3"
                                type="file"
                                multiple={true}
                                id="document_input_type_file"
                                onChange={(e) => this.onChangeMultipleFile(e)}
                                accept=".pdf"
                              />
                            </div>
                            <div className="d-flex">
                              <Button
                                onClick={() => this.triggerDocumentInputFile()}
                              >
                                Select Documents file
                              </Button>
                              &nbsp;&nbsp;
                              {this.state.documents.length > 0
                                ? `(${this.state.documents.length} file is selected)`
                                : ""}
                            </div>
                          </Spin>

                          <br />
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label for="">Banner Image<span className="text-danger">*</span></label>
                        {
                          this.props.unicorn.tudBannerImage != "" && JSON.parse(this.props.unicorn.tudBannerImage) != "" ? 
                          <img style={{maxWidth:"100%"}} src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${JSON.parse(this.props.unicorn.tudBannerImage)}`} /> : null
                        }
                        
                        <input
                          type="file"
                          onWheel={() => document.activeElement.blur()}
                          name="tudBannerImage"
                          // value={this.props.unicorn.tudBannerImage||""}
                          onChange={(e) => this.onChangeMultipleFile(e)}
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Select Logo<span className="text-danger">*</span></label>
                        {
                          this.props.unicorn.tudLogoImage != "" && JSON.parse(this.props.unicorn.tudLogoImage) != "" ? 
                          <img style={{maxWidth:"100%"}} src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${JSON.parse(this.props.unicorn.tudLogoImage)}`} /> : null
                        }
                        <input
                          type="file"
                          onWheel={() => document.activeElement.blur()}
                          name="tudLogoImage"
                          // value={this.props.unicorn.tudLogoImage || ""}
                          onChange={(e) => this.onChangeMultipleFile(e)}
                        />
                      </div>
                      {this.state.startuphighlight.map((item, index) => {
                        return (
                          <div className="form-group">
                            <label for=""> Highlight {index + 1}<span className="text-danger">*</span></label>
                            <textarea
                              id="selected-field"
                              cols="30"
                              rows="6"
                              maxLength="100"
                              placeholder={this.state.titlestartuphigh[index]}
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputhighlightChange(index, e);

                                if (e.target.value.length >= 100) {
                                  toast.error("only 100 chart");
                                }
                              }}
                            ></textarea>
                          </div>
                        );
                      })}
                      {/* <button onClick={this.addstartuphighlight}>
                        Add new highlight
                      </button> */}
                      {this.state.marketoverview.map((item, index) => {
                        return (
                          <div className="form-group">
                            <label for="">
                              {" "}
                              Market Overview of the product {index + 1}<span className="text-danger">*</span>
                            </label>
                            <textarea
                              id="selected-field"
                              cols="30"
                              rows="6"
                              maxLength="200"
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputChange(index, e);
                                if (e.target.value.length >= 200) {
                                  toast.error("only 200 chart");
                                }
                              }}
                            >
                              {" "}
                            </textarea>
                          </div>
                        );
                      })}
                      {/* <button onClick={this.addmarketcv}>
                        Add new market Overview
                      </button> */}
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
                            onClick={this.prev}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-left"></i>
                          </button>
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background: active == false ? "#fff" : "#fff",
                              border:
                                active == false
                                  ? "1px solid #29176f"
                                  : "1px solid #29176f",
                              color: active == false ? "#29176f" : "#29176f",
                            }}
                            onClick={this.next}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-right"></i>
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
          <ToastContainer/>
        </section>
      </div>
    );
  }
}

export default SupportingDocuments;
