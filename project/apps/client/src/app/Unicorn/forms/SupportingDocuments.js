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
      product: "",
      documents: [],
      pitchpdffile: "",
      productpdffile: "",
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
    if (this.props.unicorn.tudMark) {
      this.setState({ marketoverview: JSON.parse(this.props.unicorn.tudMark) });
    }    
    if (this.props.unicorn.tudStartupHighlights) {
      this.setState({ startuphighlight: JSON.parse(this.props.unicorn.tudStartupHighlights) });
    }    
    this.props.check();
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


  updateimg = async () => {
    if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
    
    this.props.setMultiple({
      "tudStartupHighlights": JSON.stringify(this.state.startuphighlight),
      "tudMark": JSON.stringify(this.state.marketoverview),
    })
    
    this.savedata();
  };

  savedata = () => {
    setTimeout(async () => {
      Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
        if (result.status == 1) {
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype == "next") {
             this.props.next();
          } else if (this.state.processtype == "prev") {
             this.props.prev();
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
    }, 5000);
  };

  
  next = () => {
    this.setState({ processtype: "next" }, () => this.updateimg());
  };
  prev = () => {
    this.setState({ processtype: "prev" }, () => this.updateimg());
  };

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.marketoverview];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ marketoverview: newEntries });
    this.props.setMultiple({
      "tudMark": JSON.stringify(newEntries),
    });
  };
  handleInputhighlightChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.startuphighlight];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ startuphighlight: newEntries });
    this.props.setMultiple({
      "tudStartupHighlights": JSON.stringify(newEntries)
    })
  };

  onChangeMultipleFile = async (e) => {
    const formData = new FormData();
    if (e.target.name == "tudPitchDeck") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        { headers: { "Content-Type": "multipart/form-data"} }
      );

      if (response) {
        this.setState({ pitchpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudPitchDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudProductDeck") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        { headers: { "Content-Type": "multipart/form-data"} }
      );

      if (response) {
        this.setState({ productpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudProductDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudBannerImage") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
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
          },
        }
      );

      if (response) {
        this.props.onInput(
          "tudLogoImage",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudSponsorImage") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        this.props.onInput(
          "tudSponsorImage",
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
                              accept=".pdf"
                              name="tudPitchDeck"
                              // style={{display:'none'}}
                            />                        
                          </div>
                        </div>

                        <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2">
                              Select Product PDF (Max file size should be 10MB)
                             
                            </label>
                            <div className="mb-1">
                              {this.props.unicorn.tudProductDeck != null && this.props.unicorn.tudProductDeck != "" && JSON.parse(this.props.unicorn.tudProductDeck) != "" ? "File Uploaded" : ""}
                            </div>

                            <input
                              type="file"
                              id="product_input_type_file"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                              accept=".pdf"
                              name="tudProductDeck"
                            />                        
                          </div>
                        </div>
                      </Spin>
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
                            <label for="">
                              {" "}
                              Highlight {index + 1}
                              <span className="text-danger">*</span>
                            </label>
                            <>
                            <textarea
                              id="selected-field"
                              cols="30"
                              rows="6"
                              maxLength="500"
                              placeholder={this.state.titlestartuphigh[index]}
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputhighlightChange(index, e);
                              }}
                              style={{marginBottom: "5px"}}
                            ></textarea>
                            <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.content1.length}/500 characters`}
                            </div>
                            </>
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
                              maxLength="750"
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputChange(index, e);
                              }}
                              style={{marginBottom: "5px"}}
                            >
                              {" "}
                            </textarea>
                            <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.content1.length}/750 characters`}
                            </div>
                          </div>
                        );
                      })}


                      <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2">
                              Name of the Sponsor / Incubator
                            </label>
                            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px", marginBottom: "10px" }}>
                              Note: If you provide a sponsor name or image, both fields become mandatory.
                            </div>
                            <input
                              type="text"
                              maxLength={100}
                              placeholder="Name of the Sponsor / Incubator"
                              name="tudSponsorName"
                              value={this.props.unicorn.tudSponsorName}
                              onChange={(e) =>
                                this.props.onInput(e.target.name, e.target.value)
                              }
                            />
                            <label className="mb-2">
                              Logo of the Sponsor / Incubator
                            </label>
                            {
                              this.props.unicorn.tudSponsorImage != "" && JSON.parse(this.props.unicorn.tudSponsorImage) != "" ?
                                <img style={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${JSON.parse(this.props.unicorn.tudSponsorImage)}`} /> : null
                            }
                            <input
                              type="file"
                              onWheel={() => document.activeElement.blur()}
                              name="tudSponsorImage"
                              accept="image/*"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                            />                      
                          </div>
                        </div>


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
