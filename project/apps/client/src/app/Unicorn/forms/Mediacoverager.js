import React, { Component } from "react";
import { message, Spin, Button, Modal } from "antd"; // Added Modal
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import Bridge from "../../constants/Bridge";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Mediacoverager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference_of_customers: "",
      reference_of_vendors: "",
      reference_of_past_employer: "",
      reference_of_guide_from_college: "",
      founder_id: "",
      loading: false,
      processtype: "",
      mediacoverager: [
        // Array to handle multiple sets of input fields
        { title: "", img: "", content: "", imgname: "" },
      ],
      teammem: [
        // Array to handle multiple sets of input fields
        {
          name: "",
          img: "",
          description1: "",
          description2: "",
          imgname: "",
          Role: "",
        },
      ],
    };
  }

  componentDidMount() {
    const { id, unicorn } = this.props;
    if (id) {
      this.getData(id);
    }
    if (unicorn.tudMediaCoverageFiles) {
      this.setState({
        mediacoverager: JSON.parse(unicorn.tudMediaCoverageFiles),
      });
    }
    if (unicorn.tudVendorId) {
      this.setState({
        teammem: JSON.parse(unicorn.tudVendorId),
      });
    }

    // Removed jQuery dependency
    // $("#selected-field").focus();

    this.props.check();
  }

  addcoverger = () => {
    this.setState((prevState) => ({
      mediacoverager: [
        ...prevState.mediacoverager,
        { title: "", img: "", content: "", imgname: "" },
      ],
    }));
  };

  addteam = () => {
    this.setState((prevState) => ({
      teammem: [
        ...prevState.teammem,
        {
          name: "",
          img: "",
          description1: "",
          description2: "",
          imgname: "",
          Role: "",
        },
      ],
    }));
  };

  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status === 1) {
        this.setState({
          reference_of_customers: result.data[0].reference_of_customers,
          reference_of_vendors: result.data[0].reference_of_vendors,
          reference_of_past_employer: result.data[0].reference_of_past_employer,
          reference_of_guide_from_college:
            result.data[0].reference_of_guide_from_college,
        });
        if (result.data[0].reference_of_customers) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };

  updatefounder = async () => {
    console.log(this.state.mediacoverager);
    setTimeout(() => {
      this.props.onInput(
        "tudMediaCoverageFiles",
        JSON.stringify(this.state.mediacoverager)
      );
    }, 1000);
    this.props.onInput("tudVendorId", JSON.stringify(this.state.teammem));
    let params = {
      no: 18,
      main_founder_id: localStorage.getItem("founder_id"),
      f18_status:
        this.state.processtype === "saveandproceed" ? "success" : "new",
    };
    this.setState({ loading: true });
    setTimeout(() => {
      console.log(this.props.unicorn.tudMediaCoverageFiles);

      Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
        if (result.status === 1) {
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype === "next") {
            this.props.next();
          } else if (this.state.processtype === "prev") {
            this.props.prev();
          } else if (this.state.processtype === "saveandproceed") {
            this.props.activate();
            message.success("Reference details are updated successfully.", 6);
          } else {
            message.success("Reference details are updated successfully.", 6);
          }
        } else {
          message.warning(result.message);
          this.setState({ loading: false });
        }
        console.log(this.state.mediacoverager);
      });
    }, 3000);
  };

  saveandproceed = () => {
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

  handleInputChange = async (index, e) => {
    const formData = new FormData();
    const { name, value } = e.target;
    if (name === "img") {
      const newEntries = [...this.state.mediacoverager];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ mediacoverager: newEntries });
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      console.log(formData.get("upfile"));

      try {
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
          console.log(response);
          newEntries[index].imgname = response.data.data.upfile; // Update the specific input field
          this.setState({ mediacoverager: newEntries });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      const newEntries = [...this.state.mediacoverager];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ mediacoverager: newEntries });
    }
  };

  handleteamChange = async (index, e) => {
    const formData = new FormData();
    const { name, value } = e.target;
    if (name === "img") {
      const newEntries = [...this.state.teammem];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ teammem: newEntries });
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      console.log(formData.get("upfile"));

      try {
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
          console.log(response);
          newEntries[index].imgname = response.data.data.upfile; // Update the specific input field
          this.setState({ teammem: newEntries });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      const newEntries = [...this.state.teammem];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ teammem: newEntries });
    }
  };

  // Remove Coverager Card Handler
  removeCoverager = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this media card?",
      onOk: () => {
        const { mediacoverager } = this.state;
        const updatedCoveragers = mediacoverager.filter((_, i) => i !== index);
        this.setState({ mediacoverager: updatedCoveragers }, () => {
          message.success("Media card removed successfully.");
        });
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  // Remove Team Member Card Handler
  removeTeamMember = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this team member?",
      onOk: () => {
        const { teammem } = this.state;
        const updatedTeammem = teammem.filter((_, i) => i !== index);
        this.setState({ teammem: updatedTeammem }, () => {
          message.success("Team member removed successfully.");
        });
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
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
                        className="fs-5"
                        style={{
                          background: "#fff",
                          width: 119,
                          height: 20,
                          zIndex: 4,
                          position: "absolute",
                          paddingRight: 10,
                        }}
                      >
                        Media Coverages{" "}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        {/* Media Coverager Section */}
                        {this.state.mediacoverager.map((item, index) => (
                          <div className="Card my-3" key={index}>
                            {/* Cross Icon for Removing the Card */}
                            <CloseOutlined
                              onClick={() => this.removeCoverager(index)}
                              className="remove-icon"
                            />

                            {/* Media Title */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">
                                  Media title {index + 1}
                                  {/* <span className="text-danger">*</span> */}
                                </label>

                                <input
                                  type="text"
                                  onWheel={() => document.activeElement.blur()}
                                  name="title"
                                  value={item.title}
                                  onChange={(e) =>
                                    this.handleInputChange(index, e)
                                  }
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Media Link */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">
                                  Media link {index + 1}
                                </label>
                                <input
                                  type="text"
                                  onWheel={() => document.activeElement.blur()}
                                  name="content"
                                  value={item.content}
                                  onChange={(e) =>
                                    this.handleInputChange(index, e)
                                  }
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Media Image */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">
                                  Media img {index + 1}
                                </label>
                                <input
                                  type="file"
                                  onWheel={() => document.activeElement.blur()}
                                  name="img"
                                  onChange={(e) =>
                                    this.handleInputChange(index, e)
                                  }
                                  className="form-control-file"
                                />
                                {item.imgname && (
                                  <div style={{ marginTop: "10px" }}>
                                    <a
                                      href={`${process.env.REACT_APP_BASE_URL}api/uploads/founders/media/${localStorage.getItem(
                                        "founder_id"
                                      )}/${item.imgname}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Image
                                    </a>
                                  </div>
                                )}
                              </div>
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

                      {/* Team Section */}
                      <div className="form-group">
                        <label className="fs-4">Team</label>
                        {this.state.teammem.map((item, index) => (
                          <div className="Card my-3" key={index}>
                            {/* Conditionally render the Close icon only if there are more than one team members */}
                            {this.state.teammem.length > 1 && (
                              <CloseOutlined
                                onClick={() => this.removeTeamMember(index)}
                                className="remove-icon"
                              />
                            )}

                            {/* Team Member Name */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">Name</label>

                                <input
                                  type="text"
                                  onWheel={() =>
                                    document.activeElement.blur()
                                  }
                                  name="name"
                                  value={item.name}
                                  onChange={(e) =>
                                    this.handleteamChange(index, e)
                                  }
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Team Member Role */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">Role</label>

                                <input
                                  type="text"
                                  onWheel={() =>
                                    document.activeElement.blur()
                                  }
                                  name="Role"
                                  value={item.Role}
                                  onChange={(e) =>
                                    this.handleteamChange(index, e)
                                  }
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Team Member Description 1 */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">Description 1</label>
                                <input
                                  type="text"
                                  onWheel={() =>
                                    document.activeElement.blur()
                                  }
                                  maxLength="100"
                                  name="description1"
                                  value={item.description1}
                                  onChange={(e) => {
                                    this.handleteamChange(index, e);
                                    if (e.target.value.length === 100) {
                                      toast.error("Only 100 characters allowed.");
                                    }
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Team Member Description 2 */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">Description 2</label>
                                <input
                                  type="text"
                                  onWheel={() =>
                                    document.activeElement.blur()
                                  }
                                  name="description2"
                                  value={item.description2}
                                  maxLength="100"
                                  onChange={(e) => {
                                    this.handleteamChange(index, e);
                                    if (e.target.value.length === 100) {
                                      toast.error("Only 100 characters allowed.");
                                    }
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            {/* Team Member Image */}
                            <div className="form-group">
                              <div className="mt-4">
                                <label className="mb-2">Img</label>
                                <input
                                  type="file"
                                  onWheel={() =>
                                    document.activeElement.blur()
                                  }
                                  name="img"
                                  onChange={(e) =>
                                    this.handleteamChange(index, e)
                                  }
                                  className="form-control-file"
                                />
                                {item.imgname && (
                                  <div style={{ marginTop: "10px" }}>
                                    <a
                                      href={`${process.env.REACT_APP_BASE_URL}api/uploads/founders/media/${localStorage.getItem(
                                        "founder_id"
                                      )}/${item.imgname}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Image
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Button to Add New Team Member */}
                        <Button
                          type="dashed"
                          onClick={this.addteam}
                          block
                          icon={<UploadOutlined />}
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#29176f",
                            color: "#fff",
                            border: "1px solid #29176f",
                          }}
                        >
                          Add Team
                        </Button>
                      </div>

                      {/* Navigation Buttons (Hidden) */}
                      <div
                        className="form-group justify-content-between"
                        style={{ display: "none" }}
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
      
        <ToastContainer />
      </div>
    );
  }
}


    export default Mediacoverager;
