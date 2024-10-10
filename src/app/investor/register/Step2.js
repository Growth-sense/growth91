import React, { Component } from "react";
import Header from "../../common/Header";
import { Switch, Spin, message, Checkbox } from "antd";
import Bridge from "../../constants/Bridge";
import WebFooter from "../../common/WebFooter";
class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riskstatus: false,
      limitedstatus: false,
      divesestatus: false,
      cancellationstatus: false,
      researchstatus: false,
      formloader: false,
      amount: 0,
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("reg_id")) {
      window.location.assign("/Signup");
    }
    this.getsettings();
  }
  getsettings = () => {
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == 1) {
        this.setState({
          amount: result.data[0].amount,
        });
      }
    });
  };
  onChangeRisk = (checked) => {
    this.setState({
      riskstatus: checked,
    });
  };
  onChangeLimited = (checked) => {
    this.setState({
      limitedstatus: checked,
    });
  };
  onChangeDiverse = (checked) => {
    this.setState({
      divesestatus: checked,
    });
  };
  onChangeCancellationstatus = (checked) => {
    this.setState({
      cancellationstatus: checked,
    });
  };
  onChangeReasearch = (checked) => {
    this.setState({
      researchstatus: checked,
    });
  };
  finish = () => {
    if (this.state.riskstatus == false) {
      message.warning("Please Accept the Term and Condition");
      return;
    }
    //   else if(this.state.limitedstatus==false) {
    //     message.warning('Please Accept the Term and Condition');
    //     return;
    //   } else if(this.state.divesestatus==false) {
    //     message.warning('Please Accept the Term and Condition');
    //     return;
    //   } else if(this.state.cancellationstatus==false) {
    //     message.warning('Please Accept the Term and Condition');
    //     return;
    //   }
    //   else if(this.state.researchstatus==false){
    //     message.warning('Please Accept the Term and Condition')
    //     return
    //   }
    this.setState({ formloader: true });
    let params = {
      riskstatus: this.state.riskstatus == true ? "1" : "0",
      limitedstatus: this.state.limitedstatus == true ? "1" : "0",
      divesestatus: this.state.divesestatus == true ? "1" : "0",
      cancellationstatus: this.state.cancellationstatus == true ? "1" : "0",
      researchstatus: this.state.researchstatus == true ? "1" : "0",
      id: localStorage.getItem("reg_id"),
      is_investor: "0",
    };
    Bridge.investor.updaterstatus(params).then((result) => {
      if (result.status == 1) {
        this.setState({ formloader: false }, () => this.cofirm_send_email());
        message.success(result.message);
        setTimeout(() => {
          // window.location.assign('/membership-plan');
        }, 2000);
      } else {
        this.setState({ formloader: false });
      }
    });

    this.registered_data();
  };

  registered_data = () => {
    console.log("Hello");
    let params = {
      investor_id: localStorage.getItem("reg_id"),
    };
    Bridge.investor.getinvestordetails(params).then((result) => {
      if (result.status == "1") {
        // console.log('result',result);
        // return;
        localStorage.setItem("investor_id", result.data[0].investor_id);
        localStorage.setItem("Parent_investor_id", result.data[0].investor_id);
        localStorage.setItem("investor_email", result.data[0].email);
        localStorage.setItem("Parent_investor_email", result.data[0].email);
        localStorage.setItem("Parent_investor_kycstatus", result.data[0].kycstatus);
        localStorage.setItem("investor_kycstatus", result.data[0].kycstatus);
        localStorage.setItem(
          "Parent_investor_name",
          result.data[0].first_name + " " + result.data[0].last_name
        );
        localStorage.setItem(
          "investor_name",
          result.data[0].first_name + " " + result.data[0].last_name
        );

        window.location.assign("/membership-plan");
      } else {
        message.warning("Invalid Request");
      }
    });
  };

  cofirm_send_email() {
    let params = {
      investor_id: localStorage.getItem("reg_id"),
    };
    Bridge.investor.fsendsuccessmail(params).then((result) => {
      if (result == "1") {
        console.log("email send");
      } else {
        console.log("unable to send email");
      }
    });
  }
  // pa
  pay = () => {
    let order_id = "order-01";
    let user_id = localStorage.getItem("reg_id");
    let amount = this.state.amount;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/register/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}`;
    window.location.assign(url);
  };
  onSelectedCheckbox = (e) => {
    this.setState({ riskstatus: e.target.checked });
  };
  render() {
    return (
      <div>
        <Header dontShowLoginButton={true} />
        <section>
          <div className="m-5 ppnt">
            <div className="m-3 py-3">
              <h1>Become an Investor</h1>
              <big className="text-secondary">
                <b>
                  To invest through Growth91, you must understand the basics of
                  Startup Investing. Please read and acknowledge the following
                  to proceed:
                </b>
              </big>
            </div>
            <div className="m-2">
              <Spin spinning={this.state.formloader}>
                <form>
                  <big>
                    <b>
                      <h4 className="mt-5 pb-3">
                        Investor Agreement and Risk Disclosure
                      </h4>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        As an investor, I am fully aware that investing in
                        startups is extremely risky. I will only invest money
                        that I can afford to lose completely without changing my
                        lifestyle.
                      </p>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        I also note that investments in startups are highly
                        illiquid as such companies are unlisted or private and
                        cannot be sold easily on an exchange or similar
                        secondary trading platform.
                      </p>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        As startup business plans are mostly based on ideas,
                        future projections, and the strength and vision of the
                        founding team, the future course of business is
                        subjected to multiple external and internal risks.
                        Accordingly, I understand that investing in multiple
                        startup deals will help mitigate my risk.
                      </p>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        Before investing, I shall do my own research and due
                        diligence, in addition to reading the documents provided
                        by the company, and get independent legal, accounting,
                        and financial advice.
                      </p>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        As all the investment decisions are taken by me without
                        any external influence by the company or the Growth91
                        platform; I, in all circumstances, indemnify the company
                        and Growth91 for any direct or indirect loss or damage
                        of any kind, including financial loss.
                      </p>
                      <p
                        style={{
                          fontSize: 17,
                          paddingBottom: 20,
                          textAlign: "justify",
                        }}
                      >
                        By signing this agreement, I agree to all the terms and
                        conditions mentioned above and posted by Growth91 on the
                        website in the future from time to time.
                      </p>
                      <div className="d-flex flex-row my-4 p-4 radio-sec">
                        <Checkbox
                          onChange={this.onSelectedCheckbox}
                          value={this.state.riskstatus}
                        >
                          <p>
                            &nbsp;&nbsp;I confirm that I read, understood, and
                            agree.
                          </p>
                        </Checkbox>
                      </div>
                    </b>
                  </big>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="black-button prime-bg"
                      onClick={this.finish}
                    >
                      Finish
                    </button>
                  </div>
                </form>
              </Spin>
            </div>
          </div>
        </section>
        <WebFooter />
      </div>
    );
  }
}
export default Step2;
