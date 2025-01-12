import React, { Component } from "react";

import {
  Tabs,
  Collapse,
  message,
  Modal,
  Spin,
  Checkbox,
  Progress,
  Alert,
} from "antd";

import axios from "axios";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import Apis from "../../constants/Apis";
import moment from "moment";
import Bridge from "../../constants/Bridge";
import InvestmentMembershipmodal from "../../components/membership/InvestmentMembershipmodal";
import NewWebHeader from "../../common/NewWebHeader";
import { NewWebFooter } from "../../common/NewWebFooter";

const { Panel } = Collapse;
const { TabPane } = Tabs;

class FutureUnicorn extends Component {
  render() {
    return (
      <>
        <NewWebHeader />
        <div className="future-unicorn-content">
          <h1>Hello Worlds</h1>
        </div>
        <NewWebFooter />
      </>
    );
  }
}

export { FutureUnicorn };
