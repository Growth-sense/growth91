import React, { Component } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { HomeFilled } from "@ant-design/icons";
class error extends Component {
  componentDidMount() {
    document.title = "404 | Page Not Found | Growth91 ";
  }

  render() {
    return (
      // <body className="error">
      //   <div className="errormainbox">
      //     <div class="errorerr">404</div>

      //     <div className="errormsg">
      //       Maybe this page moved? Got deleted? Is hiding out in quarantine?
      //       Never existed in the first place?
      //       <p>
      //         Let's go <a href={process.env.REACT_APP_BASE_URL}>home</a> and try
      //         from there.
      //       </p>
      //       <p>
      //         else{" "}
      //         <a href={process.env.REACT_APP_BASE_URL + "deals"}>
      //           {" "}
      //           go to deals
      //         </a>
      //       </p>
      //     </div>
      //   </div>
      // </body>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <>
              <Button href="/" type="primary" icon={<HomeFilled />}>
                Back Home
              </Button>
              <Button href="/deals" type="secondary">
                Go to Deals
              </Button>
            </>
          }
        />
      </div>
    );
  }
}

export default error;
