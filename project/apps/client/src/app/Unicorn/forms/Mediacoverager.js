import React, { Component } from "react";
import { message, Spin, Button, Modal } from "antd"; 
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bridge from "../../constants/Bridge";
import InfoTooltip from "./InfoTooltip";

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
          linkedinUrl:"",
          imgname: "",
          Role: "",
        },
      ],
      loading: false,
    };
  }

  componentDidMount() {
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
    this.props.setMultiple({
      tudVendorId: JSON.stringify(teammem)
    })
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
        linkedinUrl: "",
        imgname: "",
        Role: "",
      },
    ];
    this.setState({ teammem: newTeam }, () => {
      this.syncWithParent(this.state.mediacoverager, this.state.teammem);
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

  

  // Handle user input in Team Member fields
  handleteamChange = async (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.teammem];

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

    this.setState({ teammem: newEntries }, () => {
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
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype == "next") {
            this.props.next();
          } else if (this.state.processtype == "prev") {
            this.props.prev();
          } else if (this.state.processtype == "saveandproceed") {
            this.props.activate();
            message.success("Details are updated successfully.", 6);
          } else {
            message.success("Details are updated successfully.", 6);
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
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Team Member Name <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="Full name of the core team member." />
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
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Role / Title <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="Designation or function in the startup." />
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
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Experience Snapshot <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="Achievements, past experience, education, or relevant background." />
                          </label>
                          <input
                            type="text"
                            maxLength="100"
                            name="description1"
                            value={item.description1}
                            onChange={(e) => {
                              this.handleteamChange(index, e);
                            }}
                            className={`form-control ${
                              !item.description1.trim() ? "is-invalid" : ""
                            }`}
                          />
                          <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.description1.length}/100 characters`}
                          </div>
                          {!item.description1.trim() && (
                            <div className="invalid-feedback">
                              Description 1 is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Description 2 */}
                        <div className="form-group mt-4">
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Role Contribution <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="What this team member is responsible for in the startup." />
                          </label>
                          <input
                            type="text"
                            maxLength="100"
                            name="description2"
                            value={item.description2}
                            onChange={(e) => {
                              this.handleteamChange(index, e);
                            }}
                            className={`form-control ${
                              !item.description2.trim() ? "is-invalid" : ""
                            }`}
                          />
                          <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.description2.length}/100 characters`}
                          </div>
                          {!item.description2.trim() && (
                            <div className="invalid-feedback">
                              Description 2 is required.
                            </div>
                          )}
                        </div>

                        {/* Team Member Linkedin Url */}
                        <div className="form-group mt-4">
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            LinkedIn URL <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="Add LinkedIn profile link." />
                          </label>
                          <input
                            type="text"
                            maxLength="200"
                            name="linkedinUrl"
                            value={item.linkedinUrl}
                            onChange={(e) => {
                              this.handleteamChange(index, e);
                            }}
                            className={`form-control ${
                              !item.linkedinUrl?.trim() ? "is-invalid" : ""
                            }`}
                          />
                          <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.linkedinUrl?.length ?? 0}/200 characters`}
                          </div>
                          {!item.linkedinUrl?.trim() && (
                            <div className="invalid-feedback">
                              LinkedIn Profile is required
                            </div>
                          )}
                        </div>

                        {/* Team Member Image */}
                        <div className="form-group mt-4">
                          <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Display Photo <span style={{ color: "red" }}>*</span>
                            <InfoTooltip title="Clear image (JPG or PNG, square crop preferred)." />
                          </label>
                          <input
                            type="file"
                            name="img"
                            accept="image/jpeg,image/png,image/webp"
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
                          {
                            item.imgname &&
                            <img style={{maxWidth:"100%"}} src={`${process.env.REACT_APP_IMAGE_BASE_URL || process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${item.imgname}`} />
                          }
                          
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
                  
                  <div
                        className="form-group  justify-content-between"
                        style={{ display: "none !important", marginTop:20 }}
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
                              background:  "#fff",
                              border:
                                   "1px solid #29176f",
                              color: "#29176f",
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

        <ToastContainer />
      </div>
    );
  }
}

export default Mediacoverager;
