import React, { Component } from "react";
import { message, Spin, Input, Checkbox } from "antd";

import $ from "jquery";
import Bridge from "../../constants/Bridge";
class SocialMediaPresence extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (localStorage.getItem("founder_id")) {
      this.setState({ founder_id: localStorage.getItem("founder_id") });
      let id = localStorage.getItem("founder_id");
    }
    $("#selected-field").focus();
    this.props.check();
  }

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

                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-container">
                          <label htmlFor="tudSocialLinkedIn">LinkedIn</label>
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
                          <label htmlFor="tudSocialFacebook">Facebook</label>
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
                          <label htmlFor="tudSocialInsta">Instagram</label>
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
                          <label for="">YouTube</label>

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
                        <label for="">Others</label>
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
        </section>
      </div>
    );
  }
}

export default SocialMediaPresence;
