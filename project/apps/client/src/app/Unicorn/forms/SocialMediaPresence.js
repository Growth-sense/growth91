import React, { Component } from "react";
import { message, Spin, Input, Checkbox, Modal, Button } from "antd";

import $ from "jquery";
import Bridge from "../../constants/Bridge";
import axios from "axios";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import InfoTooltip from "./InfoTooltip";
class SocialMediaPresence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediacoverager: [], // Local state for media coverage
      linkdin: "",
      facebook: "",
      instagram: "",
      youtube: "",
      others: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
    };
  }

  componentDidMount() {
    // Load existing media coverage from parent unicorn state
    if (this.props.unicorn.tudMediaCoverageFiles) {
      this.setState({
        mediacoverager: JSON.parse(this.props.unicorn.tudMediaCoverageFiles),
      });
    }
    
    $("#selected-field").focus();
    this.props.check();
  }

  /**
   * Helper function to sync changes with parent's `onInput`.
   * Call this whenever local state changes so the parent’s `unicorn` is always up to date.
   */
  syncWithParent = (mediacoverager, teammem) => {
    this.props.setMultiple({
      tudMediaCoverageFiles: JSON.stringify(mediacoverager)
    })
  };

  addcoverger = () => {
    const { mediacoverager } = this.state;
    const lastEntry = mediacoverager[mediacoverager.length - 1];

    // Check if the last entry is partially/fully filled before adding new
    if (
      !lastEntry ||
      lastEntry.title.trim() !== "" ||
      lastEntry.content.trim() !== "" ||
      lastEntry.imgname.trim() !== ""
    ) {
      const newMediaCover = [
        ...mediacoverager,
        { title: "", img: "", content: "", imgname: "" },
      ];
      this.setState({ mediacoverager: newMediaCover }, () => {
        this.syncWithParent(this.state.mediacoverager, this.state.teammem);
      });
    } else {
      message.warning(
        "Please fill out the current media coverage or remove it before adding a new one."
      );
    }
  };

  // Remove a media coverage card
  removeCoverager = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this media card?",
      onOk: () => {
        const { mediacoverager } = this.state;
        const updated = mediacoverager.filter((_, i) => i !== index);
        this.setState({ mediacoverager: updated }, () => {
          this.syncWithParent(this.state.mediacoverager, this.state.teammem);
          message.success("Media card removed successfully.");
        });
      },
    });
  };

  // Handle user input in Media Coverage fields
  handleInputChange = async (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.mediacoverager];
    if (name === "img") {
      // File upload
      const file = e.target.files[0];
      if (!file) return;

      // Strict image validation
      const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isAllowedExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension);

      if (!ALLOWED_FORMATS.includes(file.type) && !isAllowedExtension) {
        message.error(`${file.name} format not allowed. Only jpg, jpeg, png, webp accepted.`);
        e.target.value = '';
        return;
      }

      newEntries[index].img = file;

      const formData = new FormData();
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("upfile", file);

      this.setState({ loading: true });
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data && response.data.data.upfile) {
          newEntries[index].imgname = response.data.data.upfile;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Could not upload file. Please try again.");
      } finally {
        this.setState({ loading: false });
      }
    } else {
      // Text input
      newEntries[index][name] = value;
    }

    this.setState({ mediacoverager: newEntries }, () => {
      this.syncWithParent(this.state.mediacoverager, this.state.teammem);
    });
  };

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

    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false, valueispresent: true });
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "prev") {
          this.props.prev();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success("Social media details are updated successfully.", 6);
        } else {
          message.success("Social media details are updated successfully.", 6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };

  saveandproceed = () => {
    // this.props.check();
    this.setState({ processtype: "saveandproceed" }, () =>
      this.updatefounder()
    );
  };

  save = () => {
    this.setState({ processtype: "save" }, () => this.updatefounder());
  };
  next = () => {
    this.setState({ processtype: "next" }, () => this.updatefounder());
  };
  prev = () => {
    this.setState({ processtype: "prev" }, () => this.updatefounder());
  };
  render() {
    let active = false;

    return (
      <div>
        <style>
          {`
            .Card {
              margin-top: 20px;
              background-color: #f5f5f5;
              padding: 20px;
              border-radius: 10px;
              position: relative;
            }
            .remove-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 20px;
              color: #ff4d4f;
              cursor: pointer;
            }
            .remove-icon:hover {
              color: #ff7875;
            }
            .is-invalid {
              border-color: #ff4d4f;
            }
            .invalid-feedback {
              color: #ff4d4f;
              font-size: 12px;
            }
          `}
        </style>
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
                        Social Media Presence
                      </span>
                    </div>
                    <hr />
                  </div>

                 

                  <div className="row" style={{ maxWidth: 900, marginTop: 30 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Website
                          <InfoTooltip title="Your startup's official website URL." />
                        </label>
                        <Input
                          type="url"
                          name="tudWebsite"
                          value={this.props.unicorn.tudWebsite}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                          placeholder="https://yourwebsite.com"
                        />
                      </div>           
                      <div className="form-group">
                        <div className="input-container">
                          <label htmlFor="tudSocialLinkedIn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            LinkedIn Page
                            <InfoTooltip title="Your startup's official LinkedIn page." />
                          </label>
                          <Input
                            type="url"
                            name="tudSocialLinkedIn"
                            id="tudSocialLinkedIn" // Corrected id for accessibility
                            value={this.props.unicorn.tudSocialLinkedIn}
                            disabled={this.props.unicorn.tpage10NA == "1"}
                            onChange={(e) => {
                              const value = e.target.value;
                              const linkedinPattern =
                                /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i;

                              // Validate the LinkedIn URL
                              if (value && !linkedinPattern.test(value)) {
                                this.setState({
                                  linkedinError:
                                    "Please enter a valid LinkedIn URL.",
                                });
                              } else {
                                this.setState({ linkedinError: "" });
                              }

                              // Update the parent component with the new value
                              this.props.onInput(e.target.name, value);
                            }}
                            required
                            pattern="https?://(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+/?"
                            className={
                              this.state.linkedinError ? "invalid" : ""
                            }
                            placeholder="Enter LinkedIn URL"
                            aria-invalid={
                              this.state.linkedinError ? "true" : "false"
                            }
                            aria-describedby={
                              this.state.linkedinError
                                ? "linkedin-error"
                                : undefined
                            }
                          />
                          {/* Display error message if URL is invalid */}
                          {this.state.linkedinError && (
                            <span id="linkedin-error" className="error">
                              {this.state.linkedinError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-container">
                          <label htmlFor="tudSocialFacebook" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Facebook Page
                            <InfoTooltip title="Facebook page for marketing or community building." />
                          </label>
                          <Input
                            type="url"
                            name="tudSocialFacebook"
                            disabled={this.props.unicorn.tpage10NA == "1"}
                            id="tudSocialFacebook" // Adding id for accessibility
                            value={this.props.unicorn.tudSocialFacebook}
                            onChange={(e) => {
                              const value = e.target.value;
                              const facebookPattern =
                                /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.]+\/?$/i;

                              // Validate the Facebook URL
                              if (value && !facebookPattern.test(value)) {
                                this.setState({
                                  fbError: "Please enter a valid Facebook URL.",
                                });
                              } else {
                                this.setState({ fbError: "" });
                              }

                              // Update the parent component with the new value
                              this.props.onInput(e.target.name, value);
                            }}
                            required
                            pattern="https?://(www\.)?facebook\.com/[A-Za-z0-9_.]+/?"
                            className={this.state.fbError ? "invalid" : ""}
                            placeholder="Enter Facebook URL"
                            aria-invalid={this.state.fbError ? "true" : "false"}
                            aria-describedby={
                              this.state.fbError ? "facebook-error" : undefined
                            }
                          />
                          {/* Display error message if URL is invalid */}
                          {this.state.fbError && (
                            <span id="facebook-error" className="error">
                              {this.state.fbError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-container">
                          <label htmlFor="tudSocialInsta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Instagram Handle
                            <InfoTooltip title="Active Instagram business profile." />
                          </label>
                          <Input
                            type="url"
                            name="tudSocialInsta"
                            disabled={this.props.unicorn.tpage10NA == "1"}
                            id="tudSocialInsta" // Adding id for accessibility
                            value={this.props.unicorn.tudSocialInsta}
                            onChange={(e) => {
                              const value = e.target.value;
                              const instagramPattern =
                                /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/i;

                              // Validate the Instagram URL
                              if (value && !instagramPattern.test(value)) {
                                this.setState({
                                  instaError: "Please enter a valid URL.",
                                });
                              } else {
                                this.setState({ instaError: "" });
                              }

                              // Update the parent component with the new value
                              this.props.onInput(e.target.name, value);
                            }}
                            required
                            pattern="/^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/i;"
                            className={this.state.instaError ? "invalid" : ""}
                            placeholder="Enter Instagram URL"
                            aria-invalid={
                              this.state.instaError ? "true" : "false"
                            }
                            aria-describedby={
                              this.state.instaError ? "insta-error" : undefined
                            }
                          />
                          {/* Display error message if URL is invalid */}
                          {this.state.instaError && (
                            <span id="insta-error" className="error">
                              {this.state.instaError}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <div className="form-group">
                        <label for="">Youtube</label>
                        <Input
                          type="url"
                          name="tudSocialYouTube"
                          value={this.props.unicorn.tudSocialYouTube}
                          onChange={(e) => {
                            const url = e.target.value;
                            // Define the URL regex pattern
                            const urlPattern = new RegExp(
                              "^(https?:\\/\\/)?" + // protocol
                                "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})" + // domain name
                                "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
                                "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
                                "(\\#[-a-zA-Z\\d_]*)?$",
                              "i"
                            );

                            if (url === "" || urlPattern.test(url)) {
                              // If URL is empty or valid, update the value and clear error
                              this.props.onInput(e.target.name, url);
                              this.setState({ urlError: "" });
                            } else {
                              // If invalid, set an error message
                              this.setState({
                                urlError: "Please enter a valid URL.",
                              });
                            }
                          }}
                          required
                          pattern="https?://.+"
                          className={this.state.urlError ? "invalid" : ""}
                        />
                        {this.state.urlError && (
                          <span className="error">{this.state.urlError}</span>
                        )}
                      </div> */}
                      {/* {" "} */}
                      <div className="form-group">
                        <div className="input-container">
                          <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            YouTube Channel
                            <InfoTooltip title="Link to your official YouTube channel." />
                          </label>

                          <Input
                            type="url"
                            name="tudSocialYouTube"
                            disabled={this.props.unicorn.tpage10NA == "1"}
                            value={this.props.unicorn.tudSocialYouTube}
                            onChange={(e) => {
                              const value = e.target.value;
                              const youtubePattern =
                                /^https?:\/\/(www\.)?youtube\.com\/.+$/i;

                              // Check if the URL matches the pattern
                              if (value && !youtubePattern.test(value)) {
                                this.setState({
                                  urlError: "Please enter a valid URL.",
                                });
                              } else {
                                this.setState({ urlError: "" });
                              }

                              // Update the parent component with the new value
                              this.props.onInput(e.target.name, value);
                            }}
                            required
                            pattern="/^https?:\/\/(www\.)?youtube\.com\/.+$/i"
                            className={this.state.urlError ? "invalid" : ""}
                            placeholder="Enter YouTube URL"
                          />
                          {/* Display error message if URL is invalid */}
                          {this.state.urlError && (
                            <span className="error">{this.state.urlError}</span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Other Social Platforms
                          <InfoTooltip title="Twitter, Medium, Discord, or any other relevant platforms." />
                        </label>
                        <textarea
                          type="text"
                          name="tudSocialOthers"
                          disabled={this.props.unicorn.tpage10NA == "1"}
                          value={this.props.unicorn.tudSocialOthers}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                   {/* MEDIA COVERAGE SECTION */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="fs-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Media Coverage
                      <InfoTooltip title="Articles, interviews, awards, recognitions. (Also upload the snapshot of the coverage)" />
                    </label>
                    {this.state.mediacoverager.map((item, index) => (
                      <div className="Card my-3" key={index}>
                        {/* Remove Media Coverage Card */}
                        <CloseOutlined
                          onClick={() => this.removeCoverager(index)}
                          className="remove-icon"
                        />

                        {/* Media Title */}
                        <div className="form-group mt-4">
                          <label className="mb-2">Media title {index + 1}</label>
                          <input
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={(e) => this.handleInputChange(index, e)}
                            className="form-control"
                          />
                        </div>

                        {/* Media Link */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Media link {index + 1}{" "}
                            {item.title.trim() !== "" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            name="content"
                            value={item.content}
                            onChange={(e) => this.handleInputChange(index, e)}
                            className={`form-control ${
                              item.title.trim() !== "" &&
                              item.content.trim() === ""
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {item.title.trim() !== "" &&
                            item.content.trim() === "" && (
                            <div className="invalid-feedback">
                                This field is required.
                            </div>
                          )}
                        </div>

                        {/* Media Image */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Media Image {index + 1}{" "}
                            {item.title.trim() !== "" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </label>
                          <input
                            type="file"
                            name="img"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => this.handleInputChange(index, e)}
                            className={`form-control-file ${
                              item.title.trim() !== "" &&
                              item.imgname.trim() === ""
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {item.title.trim() !== "" &&
                            item.imgname.trim() === "" && (
                            <div className="invalid-feedback">
                                This field is required.
                            </div>
                          )}
                          
                          {item.imgname && (
                            <img style={{maxWidth:"100%"}} src={`${process.env.REACT_APP_IMAGE_BASE_URL || process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${item.imgname}`} />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Button to Add New Media Card */}
                    <Button
                      type="dashed"
                      onClick={this.addcoverger}
                      block
                      icon={<UploadOutlined />}
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        backgroundColor: "#29176f",
                        color: "#fff",
                        border: "1px solid #29176f",
                      }}
                    >
                      Add Media
                    </Button>
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
          </Spin>
        </section>
      </div>
    );
  }
}

export default SocialMediaPresence;
