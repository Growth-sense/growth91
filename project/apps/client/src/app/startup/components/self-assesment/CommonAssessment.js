import React, { Component } from "react";
import { Radio, Tabs, Spin } from "antd";
import Bridge from "../../../constants/Bridge";
import Main from "./Main";

const { TabPane } = Tabs;
class CommonAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      roleType: "",
      leaderShip: "",
      understandFinance: "",
      understandHr: "",
      understandLaw: "",
      passionBusiness: "",
      passionCurProject: "",
      experimentalMindset: "",
      outOFBox: "",
      problemSolving: "",
      networkBusiness: "",
      networkSocial: "",
      list: [],
      loading:false,
      datalength:'',
    };
  }
  componentDidMount() {
    this.get_form_details();
    setTimeout(()=>{
      this.get_filled_data();
    },2000);
  }
  get_filled_data = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let form_email = localStorage.getItem("form_email");
    let params = {
      form_id: form_id,
    };
    Bridge.check_validation(params).then((result) => {
      
      if (result.status == 1) {
        let arr=[];
        let list=this.state.list;
        for(let item of list){

        }
      }
    });
  }
  get_form_details = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let params = {
      founder_id: founder_id,
    };
    this.setState({loading:true});
    Bridge.get_form_user_details(params).then((result) => {
      if (result.status == 1) {
        let arr = [];
        console.log('result.data',result.data);
        for (let item of result.data) {
          if (item.role == this.props.user_type && item.id!=form_id) {
            arr = [...arr, item];
          }
        }
        this.setState({list:arr,loading:false,datalength:arr.length});
      } else {
        this.setState({loading:false});
      }
    });
  };

  onChange = (key) => {
    // console.log(key);
  };
 

  render() {
    return (
      <div>
        <section
          className="StepForm-section"
          style={{
            marginTop: 0,
            padding: 0,
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <div className="container">
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
                    width: 200,
                    height: 20,
                    zIndex: 4,
                    position: "absolute",
                    paddingRight: 10,
                  }}
                >
                  {this.props.title}
                </span>
              </div>
              <hr />
            </div>
            

            {/* Tabs  */}
            <Spin spinning={this.state.loading}>
            {console.log('error',this.props.error)}
              <div className='user-tabs'>
                <Tabs defaultActiveKey="1" onChange={this.onChange} type="card">
                  {this.state.list &&
                    this.state.list.map((item, index) => {
                      return (
                        <TabPane tab={item.name} key={index}>
                          <Main item={item} user_type={item.role} error={this.props.error} />
                        </TabPane>
                      );
                    })}
                </Tabs>
              </div>
            </Spin>

          </div>
        </section>
      </div>
    );
  }
}
export default CommonAssessment;
