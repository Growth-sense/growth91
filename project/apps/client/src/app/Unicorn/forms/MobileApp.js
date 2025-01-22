import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";
import axios from 'axios';
import $ from "jquery";

class MobileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      have_any_android_app_startup: "",
      app_name_details: "",
      have_ios_app: "",
      ios_name_details: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
    };
  }

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
      this.getData(id); // Fetch data if ID is present
    }
    $("#selected-field").focus();
    this.props.check(1);
  }

  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status === 1) {
        this.setState({
          have_any_android_app_startup:
            result.data[0].have_any_android_app_startup,
          app_name_details: result.data[0].app_name_details,
          have_ios_app: result.data[0].have_ios_app,
          ios_name_details: result.data[0].ios_name_details,
          founder_id: result.data[0].founder_id, // Assuming founder_id is returned
        });
        if (result.data[0].have_any_android_app_startup) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };

  componentDidUpdate(prevProps) {
    // Detect change in Android App selection
    if (
      prevProps.unicorn.tudAndroidMobileApp !== this.props.unicorn.tudAndroidMobileApp &&
      this.props.unicorn.tudAndroidMobileApp === "No"
    ) {
      this.deleteAndroidAppDetails();
    }

    // Detect change in iOS App selection
    if (
      prevProps.unicorn.tudIphoneMobileApp !== this.props.unicorn.tudIphoneMobileApp &&
      this.props.unicorn.tudIphoneMobileApp === "No"
    ) {
      this.deleteIosAppDetails();
    }
  }

  deleteAndroidAppDetails = async () => {
    try {
      const response = await axios.delete('/api/startup/android-app-details', {
        data: {
          founder_id: this.props.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust as needed
        },
      });

      if (response.status === 200) {
        message.success("Android app details deleted successfully.", 6);
        // Clear the app details from the state if necessary
        this.props.onInput('tudAndroidAppDetails', '');
      } else {
        message.error("Failed to delete Android app details.", 6);
      }
    } catch (error) {
      console.error('Error deleting Android app details:', error);
      message.error("An error occurred while deleting Android app details.", 6);
    }
  };

  deleteIosAppDetails = async () => {
    try {
      const response = await axios.delete('/api/startup/ios-app-details', {
        data: {
          founder_id: this.props.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust as needed
        },
      });

      if (response.status === 200) {
        message.success("iOS app details deleted successfully.", 6);
        // Clear the app details from the state if necessary
        this.props.onInput('tudIphoneAppDetails', '');
      } else {
        message.error("Failed to delete iOS app details.", 6);
      }
    } catch (error) {
      console.error('Error deleting iOS app details:', error);
      message.error("An error occurred while deleting iOS app details.", 6);
    }
  };

  updatefounder = () => {
    if (this.props.adminnext) {
      if (this.state.processtype === "next") {
        this.props.next();
        return;
      } else if (this.state.processtype === "prev") {
        this.props.prev();
        return;
      }
    }
    let params = {
      have_any_android_app_startup: this.state.have_any_android_app_startup,
      app_name_details: this.state.app_name_details,
      have_ios_app: this.state.have_ios_app,
      ios_name_details: this.state.ios_name_details,
      founder_id: this.state.founder_id,
      no: 4,
      main_founder_id: localStorage.getItem("founder_id"),
      f4_status: this.state.processtype === "saveandproceed" ? "success" : "new",
    };
    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status === 1) {
        this.setState({ loading: false, valueispresent: true });
        if (this.state.processtype === "next") {
          this.props.next();
        } else if (this.state.processtype === "prev") {
          this.props.prev();
        } else if (this.state.processtype === "saveandproceed") {
          this.props.activate();
          message.success("Mobile app data is updated successfully.", 6);
        } else {
          message.success("Mobile app data is updated successfully.", 6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };

  changeStatus = (param) => {
    this.setState({
      have_any_android_app_startup: param,
    });
  };

  changeStatus1 = (param) => {
    this.setState({
      have_ios_app: param,
    });
  };

  saveandproceed = () => {
    if (!this.state.have_any_android_app_startup) {
      message.warning("Please select that you have an Android app or not.");
      return;
    } else if (!this.state.have_ios_app) {
      message.warning("Please select that you have an iOS app or not.");
      return;
    }
    if (this.state.have_any_android_app_startup === "Yes") {
      if (!this.state.app_name_details) {
        message.warning("Invalid Android app name");
        return;
      }
    }
    if (this.state.have_ios_app === "Yes") {
      if (!this.state.ios_name_details) {
        message.warning("Invalid iOS app name");
        return;
      }
    }
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
    let active =
      this.state.have_any_android_app_startup &&
      this.state.have_ios_app &&
      this.state.valueispresent === true
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
                        Mobile App
                      </span>
                    </div>
                    <hr />
                  </div>
                  {this.props.error === "0" &&
                    (!this.state.have_any_android_app_startup ||
                      !this.state.have_ios_app) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.have_any_android_app_startup && (
                            <li>
                              <span>
                                Please select the field: Do you have an Android app?
                              </span>
                            </li>
                          )}
                          {!this.state.have_ios_app && (
                            <li>
                              <span>
                                Please select the field: Do you have an iOS app?
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      {/* Android App Section */}
                      <div className="form-group">
                        <div className="form-group">
                          <label>
                            Do you have an Android app for your Startup?
                            <span className="text-danger">*</span>
                          </label>
                          <div className="button-grp">
                            <button
                              className={
                                this.props.unicorn.tudAndroidMobileApp === "Yes" ? "active" : ""
                              }
                              name="tudAndroidMobileApp"
                              value="Yes"
                              onClick={(e) => {
                                this.props.onInput(e.target.name, e.target.value);
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className={
                                this.props.unicorn.tudAndroidMobileApp === "No" ? "active" : ""
                              }
                              name="tudAndroidMobileApp"
                              value="No"
                              onClick={(e) => {
                                this.props.onInput(e.target.name, e.target.value);
                                // Optionally reset the details when "No" is clicked
                                this.props.onInput('tudAndroidAppDetails', '');  // Clearing the details field
                              }}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        {/* Conditionally render Android App Details */}
                        {this.props.unicorn.tudAndroidMobileApp === "Yes" && (
                          <div className="form-group">
                            <label>
                              Give details (App Name, Downloads, Rating, Active User, etc.)
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="tudAndroidAppDetails"
                              value={this.props.unicorn.tudAndroidAppDetails}
                              onChange={(e) =>
                                this.props.onInput(e.target.name, e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>

                      {/* iOS App Section */}
                      <div className="form-group">
                        <label>
                          Do you have an iOS app for your Startup?
                          <span className="text-danger">*</span>
                        </label>
                        <div className="button-grp">
                          <button
                            className={
                              this.props.unicorn.tudIphoneMobileApp === "Yes" ? "active" : ""
                            }
                            name="tudIphoneMobileApp"
                            value="Yes"
                            onClick={(e) => {
                              this.props.onInput(e.target.name, e.target.value);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className={
                              this.props.unicorn.tudIphoneMobileApp === "No" ? "active" : ""
                            }
                            name="tudIphoneMobileApp"
                            value="No"
                            onClick={(e) => {
                              this.props.onInput(e.target.name, e.target.value);
                              // Optionally reset the details when "No" is clicked
                              this.props.onInput('tudIphoneAppDetails', '');  // Clearing the details field
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Conditionally render iOS App Details */}
                      {this.props.unicorn.tudIphoneMobileApp === "Yes" && (
                        <div className="form-group">
                          <label>
                            Give details (App Name, Downloads, Rating, Active User, etc.)
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="tudIphoneAppDetails"
                            value={this.props.unicorn.tudIphoneAppDetails}
                            onChange={(e) =>
                              this.props.onInput(e.target.name, e.target.value)
                            }
                          />
                        </div>
                      )}

                      {/* Hidden Navigation Buttons */}
                      <div
                        className="form-group justify-content-between"
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
                            className="submit-button"
                          >
                            <i className="bx bx-chevron-left"></i>
                          </button>
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background: "#fff",
                              border: "1px solid #29176f",
                              color: "#29176f",
                            }}
                            onClick={this.next}
                            className="submit-button"
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

export default MobileApp;
