import React, { Component } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import Bridge from "../../constants/Bridge";
import moment from "moment";
import Chart from "react-apexcharts";
import { Collapse, Input, Select, message, Spin } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsdetails: [],
      years: [],
      monthlyrevenuelist: [],
      loading: false,
      searchinput: "",


      optionsMixedChart: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        stroke: {
          width: [4, 0, 0],
        },
        dataLabels: {
          enabled: false
        },

        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 8,
          },
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          //   max: 100
        }
      },

      investor_id: "",
      investments: [],
      cinvestments: [],
      series: (this.state = {
        dataL: [],
      }),
    };
  }

  componentDidMount() {
    this.getanalytics();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState(
        {
          investor_id: this.props.investor_id,
        },
        () => this.getInvestments()
      );
    }, 1000);
  }

  // get investments list
  getInvestments = () => {
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.investor.getInvestments(params).then((result) => {
      if (result.status == 1) {
        let arr = [];
        let duplicate = []
        let currentyear = "FY" + moment().format("YYYY");
        // console.log("investment data",result.data);
        for (let i = 0; i < result.data.length; i++) {
          // setting for add current year in the date input box
          //revenue
          result.data[i].selected_revenue = currentyear;
          // users/customers
          result.data[i].selected_users = currentyear;
          // app download
          result.data[i].selected_app = currentyear;
          // for expenses
          result.data[i].selected_expenses = currentyear;
          // for customer value
          result.data[i].selected_customer_value = currentyear;

          // setting new variable values for month
          let monthlyrevenuelist = [];
          let analyticslist = this.state.analyticsdetails;
          // console.log("analytics",analyticslist)
          for (let j = 0; j < this.state.analyticsdetails.length; j++) {
            if (
              analyticslist[j].startup_id &&
              analyticslist[j].startup_id == result.data[i].startupid
            ) {
              let month_year =
                "FY" + moment(analyticslist[j].month_year).format("YYYY");
              if (month_year == currentyear) {
                monthlyrevenuelist.push(analyticslist[j]);
              }
            }
          }
          let jan = 0;
          let Feb = 0;
          let Mar = 0;
          let Apr = 0;
          let May = 0;
          let Jun = 0;
          let Jul = 0;
          let Aug = 0;
          let Sep = 0;
          let Oct = 0;
          let Nov = 0;
          let Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].gross_monetary_value);
            }
          }
          result.data[i].gross_monetary_value = [
            {
              name: "GMV",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];
          // gross revenue
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].gross_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].gross_revenue);
            }
          }
          result.data[i].gross_revenue = [
            {
              name: "GR",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];

          // get net revenue
          let jan1 = 0;
          let Feb1 = 0;
          let Mar1 = 0;
          let Apr1 = 0;
          let May1 = 0;
          let Jun1 = 0;
          let Jul1 = 0;
          let Aug1 = 0;
          let Sep1 = 0;
          let Oct1 = 0;
          let Nov1 = 0;
          let Dec1 = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov1 = Number(monthlyrevenuelist[k].net_revenue);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec1 = Number(monthlyrevenuelist[k].net_revenue);
            }
          }
          result.data[i].net_revenue = [
            {
              name: "NR",
              type: "bar",
              data: [
                jan1,
                Feb1,
                Mar1,
                Apr1,
                May1,
                Jun1,
                Jul1,
                Aug1,
                Sep1,
                Oct1,
                Nov1,
                Dec1,
              ],
            },
          ];

          // get users
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].users);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].users);
            }
          }
          result.data[i].users = [
            {
              name: "Users",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },

          ];

          // get total active
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].total_active);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].total_active);
            }
          }
          result.data[i].total_active = [
            {
              name: "TAU",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];

          // get android
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].android);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].android);
            }
          }
          result.data[i].android = [
            {
              name: "Android",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];

          // play store rating
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].play_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].play_store_rating);
            }
          }
          result.data[i].play_store_rating = [
            {
              name: "PSR",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];

          // get ios
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].ios);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].ios);
            }
          }
          result.data[i].ios = [
            {
              name: "IOS",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];

          // get app store rating
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].app_store_rating);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].app_store_rating);
            }
          }
          result.data[i].app_store_rating = [
            {
              name: "ASR",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },

          ];
          // get fixed expenses
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].fixed_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].fixed_expenses);
            }
          }
          result.data[i].fixed_expenses = [
            {
              name: "FE",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];
          // get variable expenses
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].variable_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].variable_expenses);
            }
          }
          result.data[i].variable_expenses = [
            {
              name: "VE",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },

          ];
          // get one time expenses
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].one_time_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].one_time_expenses);
            }
          }
          result.data[i].one_time_expenses = [
            {
              name: "OTE",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];
          // get total expenses
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].total_expenses);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].total_expenses);
            }
          }
          result.data[i].total_expenses = [
            {
              name: "TE",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            }
          ];
          // get customer ecquisition
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].customer_acquisition);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].customer_acquisition);
            }
          }
          result.data[i].customer_acquisition = [
            {
              name: "CA",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },

          ];
          // get life time value
          jan = 0;
          Feb = 0;
          Mar = 0;
          Apr = 0;
          May = 0;
          Jun = 0;
          Jul = 0;
          Aug = 0;
          Sep = 0;
          Oct = 0;
          Nov = 0;
          Dec = 0;
          for (let k = 0; k < monthlyrevenuelist.length; k++) {
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
            ) {
              jan = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
            ) {
              Feb = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
            ) {
              Mar = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
            ) {
              Apr = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
            ) {
              May = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
            ) {
              Jun = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
            ) {
              Jul = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
            ) {
              Aug = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
            ) {
              Sep = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
            ) {
              Oct = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
            ) {
              Nov = Number(monthlyrevenuelist[k].life_time_value);
            }
            if (
              moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
            ) {
              Dec = Number(monthlyrevenuelist[k].life_time_value);
            }
          }
          result.data[i].life_time_value = [
            {
              name: "LTV",
              type: "bar",
              data: [
                jan,
                Feb,
                Mar,
                Apr,
                May,
                Jun,
                Jul,
                Aug,
                Sep,
                Oct,
                Nov,
                Dec,
              ],
            },
          ];
          if (!duplicate.includes(result.data[i].name)) {
            arr.push(result.data[i]);
            duplicate.push(result.data[i].name)
          }
        }
        this.setState({
          investments: arr.reverse(),
          cinvestments: arr.reverse(),
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  getanalytics = () => {
    Bridge.investor.getanalytics().then((result) => {
      if (result.status == 1) {
        let years = [];
        let duplicate = [];
        for (let i = 0; i < result.data.length; i++) {
          let single = "FY" + moment(result.data[i].month_year).format("YYYY");
          if (!duplicate.includes(single)) {
            years.push(single);
            duplicate.push(single);
          }
        }
        // console.log('dd',result.data)
        this.setState({
          formloader: false,
          analyticsdetails: result.data,
          years: years,
        });
      } else {
        this.setState({
          formloader: false,
        });
      }
    });
  };

  callback = (key) => { };

  // search
  search = (e) => {
    let search = e.target.value;
    // console.log(search);
    this.setState({ searchinput: search });
    let cinvestments = this.state.cinvestments;
    let filtered = [];
    if (search == "") {
      filtered = cinvestments;
    } else {
      for (let i = 0; i < cinvestments.length; i++) {
        if (
          cinvestments[i].name &&
          cinvestments[i].name.toLowerCase().includes(search.toLowerCase())
        ) {
          filtered.push(cinvestments[i]);
        }
      }
    }
    // console.log('filtered',filtered);
    this.setState({
      investments: filtered,
    });
  };

  // sort monthly revenue data
  sort_monthly_revenue_data = (value, investment_id, startup_id) => {
    // total revenue
    let investments = this.state.investments;
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].investment_id == investment_id) {
        investments[i].selected_revenue = value;

        let monthlyrevenuelist = [];
        let analyticslist = this.state.analyticsdetails;

        for (let j = 0; j < this.state.analyticsdetails.length; j++) {
          if (analyticslist[j].startup_id && analyticslist[j].startup_id == startup_id) {
            let month_year =
              "FY" + moment(analyticslist[j].month_year).format("YYYY");
            if (month_year == value) {
              monthlyrevenuelist.push(analyticslist[j]);
            }
          }
        }
        let jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].gross_monetary_value);
          }
        }
        investments[i].gross_monetary_value = [
          {
            name: "GMV",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
        // gross revenue
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].gross_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].gross_revenue);
          }
        }
        investments[i].gross_revenue = [
          {
            name: "GR",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];

        // get net revenue
        let jan1 = 0;
        let Feb1 = 0;
        let Mar1 = 0;
        let Apr1 = 0;
        let May1 = 0;
        let Jun1 = 0;
        let Jul1 = 0;
        let Aug1 = 0;
        let Sep1 = 0;
        let Oct1 = 0;
        let Nov1 = 0;
        let Dec1 = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov1 = Number(monthlyrevenuelist[k].net_revenue);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec1 = Number(monthlyrevenuelist[k].net_revenue);
          }
        }
        investments[i].net_revenue = [
          {
            name: "NR",
            type: "bar",
            data: [
              jan1,
              Feb1,
              Mar1,
              Apr1,
              May1,
              Jun1,
              Jul1,
              Aug1,
              Sep1,
              Oct1,
              Nov1,
              Dec1,
            ],
          },
        ];

      }
    }
    this.setState({
      investments: investments,
    });
  };

  // sort monthly user data
  sort_monthly_userdata = (value, investment_id, startup_id) => {
    let investments = this.state.investments;
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].investment_id == investment_id) {
        investments[i].selected_users = value;

        let monthlyrevenuelist = [];
        let analyticslist = this.state.analyticsdetails;

        for (let j = 0; j < this.state.analyticsdetails.length; j++) {
          if (analyticslist[j].startup_id && analyticslist[j].startup_id == startup_id) {
            let month_year =
              "FY" + moment(analyticslist[j].month_year).format("YYYY");
            if (month_year == value) {
              monthlyrevenuelist.push(analyticslist[j]);
            }
          }
        }
        let jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].users);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].users);
          }
        }
        investments[i].users = [
          {
            name: "Users",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];

        // get total active
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].total_active);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].total_active);
          }
        }
        investments[i].total_active = [
          {
            name: "TAU",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
      }
    }
    this.setState({
      investments: investments,
    });
  };
  //sort app download
  sort_app_download = (value, investment_id, startup_id) => {
    // total revenue
    let investments = this.state.investments;
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].investment_id == investment_id) {
        investments[i].selected_app = value;

        let monthlyrevenuelist = [];
        let analyticslist = this.state.analyticsdetails;

        for (let j = 0; j < this.state.analyticsdetails.length; j++) {
          if (analyticslist[j].startup_id && analyticslist[j].startup_id == startup_id) {
            let month_year =
              "FY" + moment(analyticslist[j].month_year).format("YYYY");
            if (month_year == value) {
              monthlyrevenuelist.push(analyticslist[j]);
            }
          }
        }
        let jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].android);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].android);
          }
        }
        investments[i].android = [
          {
            name: "Android",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];

        // play store rating
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].play_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].play_store_rating);
          }
        }
        investments[i].play_store_rating = [
          {
            name: "PSR",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];

        // get ios
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].ios);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].ios);
          }
        }
        investments[i].ios = [
          {
            name: "IOS",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];

        // get app store rating
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].app_store_rating);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].app_store_rating);
          }
        }
        investments[i].app_store_rating = [
          {
            name: "ASR",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
      }
    }
    this.setState({
      investments: investments,
    });
  };
  //short expenses
  short_expenses = (value, investment_id, startup_id) => {
    let investments = this.state.investments;
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].investment_id == investment_id) {
        investments[i].selected_expenses = value;

        let monthlyrevenuelist = [];
        let analyticslist = this.state.analyticsdetails;

        for (let j = 0; j < this.state.analyticsdetails.length; j++) {
          if (analyticslist[j].startup_id && analyticslist[j].startup_id == startup_id) {
            let month_year =
              "FY" + moment(analyticslist[j].month_year).format("YYYY");
            if (month_year == value) {
              monthlyrevenuelist.push(analyticslist[j]);
            }
          }
        }
        let jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].fixed_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].fixed_expenses);
          }
        }
        investments[i].fixed_expenses = [
          {
            name: "FE",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
        // get variable expenses
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].variable_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].variable_expenses);
          }
        }
        investments[i].variable_expenses = [
          {
            name: "VE",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
        // get one time expenses
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].one_time_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].one_time_expenses);
          }
        }
        investments[i].one_time_expenses = [
          {
            name: "OTE",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
        // get total expenses
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].total_expenses);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].total_expenses);
          }
        }
        investments[i].total_expenses = [
          {
            name: "TE",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
      }
    }
    this.setState({
      investments: investments,
    });
  };

  //sort customer value
  short_customer_value = (value, investment_id, startup_id) => {
    // total revenue
    let investments = this.state.investments;
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].investment_id == investment_id) {
        investments[i].selected_customer_value = value;

        let monthlyrevenuelist = [];
        let analyticslist = this.state.analyticsdetails;

        for (let j = 0; j < this.state.analyticsdetails.length; j++) {
          if (analyticslist[j].startup_id && analyticslist[j].startup_id == startup_id) {
            let month_year =
              "FY" + moment(analyticslist[j].month_year).format("YYYY");
            if (month_year == value) {
              monthlyrevenuelist.push(analyticslist[j]);
            }
          }
        }
        // get customer ecquisition
        let jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].customer_acquisition);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].customer_acquisition);
          }
        }
        investments[i].customer_acquisition = [
          {
            name: "CA",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
        // get life time value
        jan = 0;
        Feb = 0;
        Mar = 0;
        Apr = 0;
        May = 0;
        Jun = 0;
        Jul = 0;
        Aug = 0;
        Sep = 0;
        Oct = 0;
        Nov = 0;
        Dec = 0;
        for (let k = 0; k < monthlyrevenuelist.length; k++) {
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jan"
          ) {
            jan = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Feb"
          ) {
            Feb = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Mar"
          ) {
            Mar = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Apr"
          ) {
            Apr = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "May"
          ) {
            May = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jun"
          ) {
            Jun = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Jul"
          ) {
            Jul = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Aug"
          ) {
            Aug = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Sep"
          ) {
            Sep = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Oct"
          ) {
            Oct = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Nov"
          ) {
            Nov = Number(monthlyrevenuelist[k].life_time_value);
          }
          if (
            moment(monthlyrevenuelist[k].month_year).format("MMM") == "Dec"
          ) {
            Dec = Number(monthlyrevenuelist[k].life_time_value);
          }
        }
        investments[i].life_time_value = [
          {
            name: "LTV",
            type: "bar",
            data: [
              jan,
              Feb,
              Mar,
              Apr,
              May,
              Jun,
              Jul,
              Aug,
              Sep,
              Oct,
              Nov,
              Dec,
            ],
          },
        ];
      }
    }
    this.setState({
      investments: investments,
    });
  };

  render() {
    const genExtra = () => (
      <PlusOutlined
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    );
    return (
      <div>
        <section id="hdii" style={{ minHeight: "70vh" }}>
          <div className=" mt-4 pt-4 px-4">
            <h2 className="text-center">Analytics</h2>
          </div>
          {/* <div className="row my-3 p-3">
                <div className="col-12">
                  <div className="input-group ">
                    <Input
                      placeholder="Search.."
                      type={"text"}
                      style={{ width: "30%", height: 45 }}
                      onChange={(e) => this.search(e)}
                    />
                  </div>
                </div>
              </div> */}
          {this.state.loading ? (
            <div className="text-center mt-5">
              <h4>Loading data...</h4>
              <Spin size="large" />
            </div>
          ) : (this.state.investments?.length) > 0 ?
            <div className="row my-3 p-3">
              <Collapse
                defaultActiveKey={[]}
                onChange={this.callback}
                expandIconPosition={"left"}
              >
                {this.state.investments &&
                  this.state.investments.map((item, index) => {
                    return (
                      <Panel
                        header={item.name}
                        key={`2${index}`}
                        extra={genExtra()}
                      >
                        <div className="p-1">
                          {/* revenue */}
                          <Collapse defaultActiveKey="k1">
                            <Panel header="Revenue">
                              <Select
                                defaultValue={item.selected_revenue}
                                placeholder="Select"
                                style={{ width: 200 }}
                                onChange={(e) =>
                                  this.sort_monthly_revenue_data(e, item.investment_id, item.deal_name
                                  )
                                }
                              >
                                <Option value="">Select</Option>
                                {this.state.years &&
                                  this.state.years.map((item, index) => {
                                    return (
                                      <Option value={item} key={index}>
                                        {item}
                                      </Option>
                                    );
                                  })}
                              </Select>

                              <div><br />
                                <h4 className="mb-2">Gross Monetary Value</h4>
                                <p className="grey-div">
                                  Gross Merchandise Value (GMV) is a
                                  metric that measures your total value of
                                  sales over a certain period of time.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.gross_monetary_value}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">Gross Revenue</h4>
                                <p className="grey-div">
                                  Gross revenue is the total amount of
                                  sales recognized for a reporting period,
                                  prior to any deductions.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.gross_revenue}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">Net Value</h4>
                                <p className="grey-div">
                                  Net revenue (or net sales) subtracts any
                                  discounts or allowances from gross
                                  revenue.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.net_revenue}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                            </Panel>
                          </Collapse>

                          {/* Users/Customers */}
                          <Collapse defaultActiveKey="k2">
                            <Panel header="Users/Customers">
                              <Select
                                defaultValue={item.selected_users}
                                placeholder="Select"
                                style={{ width: 200 }}
                                onChange={(e) =>
                                  this.sort_monthly_userdata(e, item.investment_id, item.deal_name)
                                }
                              >
                                <Option value="">Select</Option>
                                {this.state.years &&
                                  this.state.years.map((item, index) => {
                                    return (
                                      <Option value={item} key={index}>
                                        {item}
                                      </Option>
                                    );
                                  })}
                              </Select>


                              <div><br />
                                <h4 className="mb-2">New Users/Customers</h4>
                                <p className="grey-div">
                                  List of Investors who invested for the
                                  startup.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.users}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                              <div>
                                <h4 className="mb-2">Total Active</h4>
                                <p className="grey-div">
                                  The number of total active users in this
                                  startup.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.total_active}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                            </Panel>
                          </Collapse>


                          {/* App download */}
                          <Collapse defaultActiveKey="k3">
                            <Panel header="App Download" key="1">
                              <Select
                                defaultValue={item.selected_app}
                                placeholder="Select"
                                style={{ width: 200 }}
                                onChange={(e) =>
                                  this.sort_app_download(e, item.investment_id, item.deal_name)
                                }
                              >
                                <Option value="">Select</Option>
                                {this.state.years &&
                                  this.state.years.map((item, index) => {
                                    return (
                                      <Option value={item} key={index}>
                                        {item}
                                      </Option>
                                    );
                                  })}
                              </Select>
                              <div><br />
                                <h4 className="mb-2">Android</h4>
                                <p className="grey-div">
                                  The App is Downloaded From Play Store
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.android}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">IOS</h4>
                                <p className="grey-div">
                                  The App is Downloaded From an App Store.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.ios}
                                  type="bar"
                                  width="700"
                                />
                              </div>


                              <div>
                                <h4 className="mb-2">Play Store rating</h4>
                                <p className="grey-div">
                                  Ratings help people decide which apps to
                                  download and they are taken into
                                  consideration for featuring and
                                  placement on Play Store.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.play_store_rating}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                              <div>
                                <h4 className="mb-2">IOS App rating</h4>
                                <p className="grey-div">
                                  Ratings help people decide which apps to
                                  download and they are taken into
                                  consideration for featuring and
                                  placement on App Store.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.app_store_rating}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                            </Panel>
                          </Collapse>
                          {/* expenses    */}
                          <Collapse defaultActiveKey="k4">
                            <Panel header="Expenses" key="1">
                              <Select
                                defaultValue={item.selected_expenses}
                                placeholder="Select"
                                style={{ width: 200 }}
                                onChange={(e) =>
                                  this.short_expenses(e, item.investment_id, item.deal_name)
                                }
                              >
                                <Option value="">Select</Option>
                                {this.state.years &&
                                  this.state.years.map((item, index) => {
                                    return (
                                      <Option value={item} key={index}>
                                        {item}
                                      </Option>
                                    );
                                  })}
                              </Select>

                              <div><br />
                                <h4 className="mb-2">Fixed Expenses</h4>
                                <p className="grey-div">
                                  A fixed expense is an expense whose
                                  total amount does not change when there
                                  is an increase in an activity such as
                                  sales or production.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.fixed_expenses}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">Variable Expenses</h4>
                                <p className="grey-div">
                                  A variable cost is a corporate expense
                                  that changes in proportion to how much a
                                  company produces or sells.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.variable_expenses}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                              <div>
                                <h4 className="mb-2">One Time Expenses</h4>
                                <p className="grey-div">
                                  A one-time charge, or non-recurring
                                  item, is a financial statement line item
                                  that occurs on financial statements of a
                                  firm on an irregular.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.one_time_expenses}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">Total Expenses</h4>
                                <p className="grey-div">
                                  The sum of all the total gross cash
                                  expenditures plus any subsidiary
                                  pending, such as operating expenses,
                                  incentive fees, interest, and taxes.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.total_expenses}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                            </Panel>
                          </Collapse>

                          {/* customer value */}
                          <Collapse defaultActiveKey="k5">
                            <Panel header="Customer Value" key="1">
                              <Select
                                defaultValue={item.selected_customer_value}
                                placeholder="Select"
                                style={{ width: 200 }}
                                onChange={(e) =>
                                  this.short_customer_value(e, item.investment_id, item.deal_name
                                  )
                                }
                              >
                                <Option value="">Select</Option>
                                {this.state.years &&
                                  this.state.years.map((item, index) => {
                                    return (
                                      <Option value={item} key={index}>
                                        {item}
                                      </Option>
                                    );
                                  })}
                              </Select>

                              <div><br />
                                <h4 className="mb-2">Customer Acquisition</h4>
                                <p className="grey-div">
                                  Customer acquisition is the process of
                                  getting potential customers to buy your
                                  products.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.customer_acquisition}
                                  type="bar"
                                  width="700"
                                />
                              </div>

                              <div>
                                <h4 className="mb-2">Life Time Value of a Customer</h4>
                                <p className="grey-div">
                                  Customer lifetime value (CLV) is a
                                  measure of the average customer's
                                  revenue generated over their entire
                                  relationship with a company.
                                </p>
                                <Chart
                                  options={this.state.optionsMixedChart}
                                  series={item.life_time_value}
                                  type="bar"
                                  width="700"
                                />
                              </div>
                            </Panel>
                          </Collapse>
                        </div>
                      </Panel>
                    );
                  })}
              </Collapse>
            </div>

            :
            <div className='text-center mt-5'>

              <h4>You have not made any investment on Growth91 Platform.<br></br>
                <a href='/deals' style={{ fontSize: '1.5rem' }}>Start Today </a>
              </h4>
              <img src='No_data_rafiki.png' width={200} />
            </div>
          }

        </section>
      </div>
    )
  }
}
