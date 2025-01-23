import React, { Component } from "react";
import { message, Spin, Button, Modal } from "antd"; 
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Mediacoverager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediacoverager: [], // Local state for media coverage
      teammem: [
        {
          name: "",
          img: "",
          description1: "",
          description2: "",
          imgname: "",
          Role: "",
        },
      ],
      loading: false,
    };
  }

  componentDidMount() {
    // Load existing media coverage from parent unicorn state
    if (this.props.unicorn.tudMediaCoverageFiles) {
      this.setState({
        mediacoverager: JSON.parse(this.props.unicorn.tudMediaCoverageFiles),
      });
    }

    // Load existing team members from parent unicorn state
    if (this.props.unicorn.tudVendorId) {
      this.setState({
        teammem: JSON.parse(this.props.unicorn.tudVendorId),
      });
    }

    // If your parent has a check function to mark validation steps, you can still call it:
    if (typeof this.props.check === "function") {
      this.props.check();
    }
  }

  /**
   * Helper function to sync changes with parent's `onInput`.
   * Call this whenever local state changes so the parent’s `unicorn` is always up to date.
   */
  syncWithParent = (mediacoverager, teammem) => {
    // Convert arrays to JSON strings
    this.props.onInput("tudMediaCoverageFiles", JSON.stringify(mediacoverager));
    this.props.onInput("tudVendorId", JSON.stringify(teammem));
  };

  // Add a new empty media coverage entry
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

  // Add a new team member
  addteam = () => {
    const { teammem } = this.state;
    const newTeam = [
      ...teammem,
      {
        name: "",
        img: "",
        description1: "",
        description2: "",
        imgname: "",
        Role: "",
      },
    ];
    this.setState({ teammem: newTeam }, () => {
      this.syncWithParent(this.state.mediacoverager, this.state.teammem);
    });
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

  // Remove a team member card
  removeTeamMember = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this team member?",
      onOk: () => {
        const { teammem } = this.state;
        const updated = teammem.filter((_, i) => i !== index);
        this.setState({ teammem: updated }, () => {
          this.syncWithParent(this.state.mediacoverager, this.state.teammem);
          message.success("Team member removed successfully.");
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

  // Handle user input in Team Member fields
  handleteamChange = async (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.teammem];

    if (name === "img") {
      // File upload
      const file = e.target.files[0];
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

    this.setState({ teammem: newEntries }, () => {
      this.syncWithParent(this.state.mediacoverager, this.state.teammem);
    });
  };

  render() {
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
              <div className="row" style={{ maxWidth: 900 }}>
                {/* MEDIA COVERAGE SECTION */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="fs-4">Media Coverage</label>
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

                {/* TEAM SECTION */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="fs-4">Team</label>
                    {this.state.teammem.map((item, index) => (
                      <div className="Card my-3" key={index}>
                        {/* Remove Team Member Card */}
                        {this.state.teammem.length > 1 && (
                          <CloseOutlined
                            onClick={() => this.removeTeamMember(index)}
                            className="remove-icon"
                          />
                        )}

                        {/* Team Member Name */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={item.name}
                            onChange={(e) => this.handleteamChange(index, e)}
                            className={`form-control ${
                              !item.name.trim() ? "is-invalid" : ""
                            }`}
                          />
                          {!item.name.trim() && (
                            <div className="invalid-feedback">
                              Name is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Role */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="Role"
                            value={item.Role}
                            onChange={(e) => this.handleteamChange(index, e)}
                            className={`form-control ${
                              !item.Role.trim() ? "is-invalid" : ""
                            }`}
                          />
                          {!item.Role.trim() && (
                            <div className="invalid-feedback">
                              Role is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Description 1 */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Description 1 <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            maxLength="100"
                            name="description1"
                            value={item.description1}
                            onChange={(e) => {
                              this.handleteamChange(index, e);
                              if (e.target.value.length === 100) {
                                toast.error("Only 100 characters allowed.");
                              }
                            }}
                            className={`form-control ${
                              !item.description1.trim() ? "is-invalid" : ""
                            }`}
                          />
                          {!item.description1.trim() && (
                            <div className="invalid-feedback">
                              Description 1 is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Description 2 */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Description 2 <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            maxLength="100"
                            name="description2"
                            value={item.description2}
                            onChange={(e) => {
                              this.handleteamChange(index, e);
                              if (e.target.value.length === 100) {
                                toast.error("Only 100 characters allowed.");
                              }
                            }}
                            className={`form-control ${
                              !item.description2.trim() ? "is-invalid" : ""
                            }`}
                          />
                          {!item.description2.trim() && (
                            <div className="invalid-feedback">
                              Description 2 is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Image */}
                        <div className="form-group mt-4">
                          <label className="mb-2">
                            Image <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            name="img"
                            onChange={(e) => this.handleteamChange(index, e)}
                            className={`form-control-file ${
                              !item.imgname.trim() ? "is-invalid" : ""
                            }`}
                          />
                          {!item.imgname.trim() && (
                            <div className="invalid-feedback">
                              Image is required.
                            </div>
                          )}
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
