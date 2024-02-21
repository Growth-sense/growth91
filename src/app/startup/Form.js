import React, { Component } from "react";
import Header from "../common/HeaderForAssement";
import WebFooter from "../common/WebFooter";
import Founder from "./components/Founder";
import Bridge from "../constants/Bridge";
import Success from "./Success";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startup_name: "",
    };
  }
  componentDidMount() {
    this.checkforform();
    this.get_startup_form_name();
  }
  get_startup_form_name = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let params = {
      founder_id: founder_id,
    };
    Bridge.founder.get_startup_name(params).then((result) => {
      console.log("result", result);
      if (result.status == 1) {
        this.setState({ startup_name: result.data[0].startup_name });
      }
    });
  };

  checkforform() {
    let form_id = localStorage.getItem("form_id");
    let params = {
      form_id: form_id,
    };
    Bridge.check_validation(params).then((result) => {
      // console.log('result',result);
      if (result.status == 1) {
        if (result.data.length > 0) {
          if (result.data[0].form_status == "submitted") {
            this.setState({ show: true });
          } else {
            this.setState({ show: false });
          }
        } else {
          this.setState({ show: false });
        }
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div style={{ marginTop: 129, marginBottom: 30 }}>
          {this.state.show == false && (
            <div className="col-lg-9 m-auto">
              <h1>
                Strengths of Core Team, Founder and Advisor For{" "}
                {this.state.startup_name}
              </h1>
              <p>
                Tell us a little about your company. This will help us
                understand your business better.
              </p>
            </div>
          )}

          <br />
          <br />
          <div className="row">
            <div className="col-md-9 col-12 m-auto">
              {this.state.show == true ? <Success /> : <Founder />}
            </div>
          </div>
        </div>
        <WebFooter />
      </div>
    );
  }
}
export default Form;
