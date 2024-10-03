import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
        {  name: "", img: "", description1: "", description2: "",imgname: "" ,Role:"" },
    ],
};
}

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
    }
    if(this.props.unicorn.tudMediaCoverageFiles){

      this.setState({
        mediacoverager: JSON.parse(this.props.unicorn.tudMediaCoverageFiles),
       
      });
    }
    if(this.props.unicorn.tudVendorId){

      this.setState({
        teammem: JSON.parse(this.props.unicorn.tudVendorId),       
      });
    }

    $("#selected-field").focus();
    this.props.check();
}
addcoverger = () => {
    const newMedia = {
        title: "",
        img: "",
        content: "",
    };
    this.setState((prevState) => ({
        mediacoverager: [
            ...prevState.mediacoverager,
            { title: "", img: "", content: "", imgname: "" },
        ],
    }));
  };
  addteam = () => {
    const newMedia = {
      title: "",
      img: "",
      content: "",
    };
    this.setState((prevState) => ({
        teammem: [
            ...prevState.teammem,
            { name: "", img: "", description1: "", description2: "",imgname: "" ,Role:""},
      ],
    }));
  };
  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      console.log("result", result.data[0].reference_of_guide_from_college);
      if (result.status == 1) {
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

  updatefounder = async() => {
    console.log(this.state.mediacoverager);
   setTimeout(() => {
      
    this.props.onInput(
      "tudMediaCoverageFiles",
      JSON.stringify(this.state.mediacoverager)
    );
  }, 1000);
    this.props.onInput(
      "tudVendorId",
      JSON.stringify(this.state.teammem)
    );
    let params = {
      no: 18,
      main_founder_id: localStorage.getItem("founder_id"),
      f18_status:
        this.state.processtype == "saveandproceed" ? "success" : "new",
    };
    this.setState({ loading: true });
    setTimeout(() => {
      console.log(this.props.unicorn.tudMediaCoverageFiles);

      Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
        if (result.status == 1) {
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype == "next") {
            this.props.next();
          } else if (this.state.processtype == "prev") {
            this.props.prev();
          } else if (this.state.processtype == "saveandproceed") {
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

  handleInputChange = async (index, e) => {
    const formData = new FormData();
    const { name, value } = e.target;
    if (name == "img") {
      const newEntries = [...this.state.mediacoverager];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ mediacoverager: newEntries });
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      console.log(formData.get("upfile"));

      // Append the file to the formData

      try {
        // Make the fetch request with formData as the body
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

        // Check if the response is okay (status 200-299)
        if (response) {
          // or .text(), depending on the response type

          // Process the response
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
    if (name == "img") {
      const newEntries = [...this.state.teammem];
      newEntries[index][name] = value; // Update the specific input field
      this.setState({ teammem: newEntries });
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      console.log(formData.get("upfile"));

      // Append the file to the formData

      try {
        // Make the fetch request with formData as the body
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

        // Check if the response is okay (status 200-299)
        if (response) {
          // or .text(), depending on the response type

          // Process the response
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
                          position: "absolute",
                          paddingRight: 10,
                        }}
                      >
                        Reference{" "}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="">mediacoverager</label>
                        {this.state.mediacoverager.map((item, index) => {
                          console.log(item);

                          return (
                            <>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Media title{index + 1}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="title"
                                    value={item.title}
                                    onChange={(e) =>
                                      this.handleInputChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Media link{index + 1}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="content"
                                    value={item.content}
                                    onChange={(e) =>
                                      this.handleInputChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Media img{index + 1}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    key={index}
                                    type="file"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="img"
                                    // value={item.img}
                                    onChange={(e) =>
                                      this.handleInputChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          );
                        })}
                        <button
                          className="btn btn-primary"
                          onClick={this.addcoverger}
                        >
                          Add media
                        </button>
                      </div>
                      <div className="form-group">
                        <label for="">Team</label>
                        {this.state.teammem.map((item, index) => {
                          console.log(item);

                          return (
                            <>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Name 
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="name"
                                    value={item.name}
                                    onChange={(e) =>
                                      this.handleteamChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Role
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="Role"
                                    value={item.Role}
                                    onChange={(e) =>
                                      this.handleteamChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Description 1
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    maxlength="100"
                                    name="description1"
                                    value={item.description1}
                                    onChange={(e) =>
                                      {this.handleteamChange(index, e);
                                        if (e.target.value.length == 100) {
                                          toast.error("only 100 chart");
                                        }
                                      }
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                    Description 2
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    key={index}
                                    type="text"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="description2"
                                    value={item.description2}
                                    maxlength="100"
                                    onChange={(e) =>
                                      {this.handleteamChange(index, e);
                                        if (e.target.value.length == 100) {
                                          toast.error("only 100 chart");
                                        }
                                      }
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="mt-4">
                                  <label className="mb-2">
                                     Img
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    key={index}
                                    type="file"
                                    onWheel={() =>
                                      document.activeElement.blur()
                                    }
                                    name="img"
                                    // value={item.img}
                                    onChange={(e) =>
                                      this.handleteamChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          );
                        })}
                        <button
                          className="btn btn-primary"
                          onClick={this.addteam}
                        >
                          Add Team
                        </button>
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
          <ToastContainer/>
        </section>
      </div>
    );
  }
}

export default Mediacoverager;
