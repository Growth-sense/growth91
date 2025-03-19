import React, { Component } from "react";
import "./newboo.css";
import {
  Table,
  Tabs,
  Collapse,
  message,
  Modal,
  Spin,
  Checkbox,
  Progress,
  Alert,
  notification,
} from "antd";
import axios from "axios";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import Apis from "../constants/Apis";
import moment from "moment";
import Bridge from "../constants/Bridge";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";
import { defaultDealData } from "../values/defaultData";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const staticDealData = {
  title: "The EleFant Round 2 - Growth91 - Startup Marketplace ",
  dealId: "43",
  imageList: [
    "./assets/images/deals-details/new_theEleFant/Pitch/1.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/2.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/3.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/4.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/5.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/6.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/7.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/8.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/9.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/10.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/11.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/12.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/13.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/14.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/15.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/16.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/17.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/18.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/19.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/20.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/21.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/22.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/23.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/24.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/25.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/26.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/27.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/28.jpg",
    "./assets/images/deals-details/new_theEleFant/Pitch/29.jpg"
  ],
  logoImage: "./assets/images/deals-details/new_theEleFant/logo.png",
  dealTitle: "The Elefant Round 2",
  industryTag: "E-commerce",
  youtubeVideoLink: "https://www.youtube.com/embed/cimjF2sWGoM?si=iJjUnU8ldiMCU6U2",
  youtubeVideoLink2: "https://www.youtube.com/embed/ORFeADai42s?si=AQ0xs-9NFbsSpWi3",
  valuation: "Floor 40 Cr. Cap 60 Cr.",
  legalName: "Madshades Technologies Private Ltd",
  foundedDate: "2022-08-19",
  status: "Private Limited Company",
  employees: "48",
  websiteHref: "https://www.theelefant.com",
  websiteName: "www.theelefant.com",
  facebookUrl: "https://www.facebook.com/theelefantofficial",
  linkedinUrl: "https://www.linkedin.com/company/the-elefant/?originalSubdomain=in",
  instaUrl: "https://www.instagram.com/theelefant_official",
  youtubeUrlForCompany: "https://www.youtube.com/@theEleFant",

  teamMembers: [
    {
        image: "./assets/images/deals-details/new_theEleFant/team/sourabh.jpg",
        name: "CA Sourabh Jain",
        position: "Founder and CEO",
        linkedinUrl: "https://www.linkedin.com/in/sourabhjain-theelefant/",
        description: [
            `
            16 years of diverse and global
            experience across accountancy and
            internal Audit, delivering value-added
            solutions to clients and businesses
            across various sectors and markets.
            `,
            `
            Registered Independent Director, CA, and CS.
            `,
            `
            Bringing strategic leadership and financial acumen to The EleFant.
            `
        ]
    },
    {
        image: "./assets/images/deals-details/new_theEleFant/team/santhosh.jpg",
        name: "Santhosh Vemishetty",
        position: "Head - Product & Tech",
        linkedinUrl: "https://www.linkedin.com/in/santhoshv44/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        description: [
            `
            10+ years of experience, specializing in
            building innovative, data-driven
            products, Retail/F&B processes, and SaaS
            products, leading Omni Channel Retail
            transformation
            `,
            `
            Ex-Target, Aditya Birla, Chai Point,
            Flash Coffee
            `,
            `
            Contributing to The EleFant's product
            innovation.
            `
        ]
    },
    {
        image: "./assets/images/deals-details/new_theEleFant/team/nirupa.png",
        name: "Nirupa Vora",
        position: "Head - Toy Curator & Librarian Engagement",
        linkedinUrl: "https://www.linkedin.com/in/nirupa-vora-18b442291/",
        description: [
            `
            With her background as a former Principal, 
            she brings valuable experience to curate and engage 
            with the toy library, ensuring a quality selection of 
            toys and fostering positive interactions with librarians.
            `
        ]
    },
    {
        image: "./assets/images/deals-details/new_theEleFant/team/ruchi-new.png",
        name: "CA Ruchi Gour",
        position: "Head - Finance & Investor Relations CA",
        linkedinUrl: "https://www.linkedin.com/in/ruchi-gour-92109b30/",
        description: [
            `
            14+ experience across finance domains of
            process audits, accounting
            controllership, business finance,
            funding, investments and acquisitions
            `,
            `
            Ex Amazon, Swiggy, Meesho, Dream 11, and ITC
            `,
            `
            Managing The EleFant's financial operations and investor relations.
            `
        ]
    }
  ],

  aboutTitle: "About The Elefant",
  aboutHeader1: "Are you focused on product or service?",
  aboutDetail1: 
    `
    EleFant offers a service, specifically a 
    subscription-based toy library model. It provides users 
    with access to a curated selection of toys through a 
    membership or subscription, allowing them to enjoy a 
    variety of toys without the need for ownership. 
    The service is facilitated through a mobile application, 
    which plays a crucial role in managing subscriptions, 
    selecting toys, and enhancing the overall user experience. 
    The focus is on providing an economical, clutter-free, and 
    environmentally friendly toy solution for children.
    `,
  aboutHeader2: "What are the challanges for scale up and how these will be managed?",
  aboutDetail2: 
    `
    Scaling up EleFant poses challenges such as 
    optimizing logistics for a growing subscriber base, 
    efficient customer acquisition through targeted marketing, 
    maintaining quality control and toy upkeep, expanding the 
    librarian network, ensuring compliance with regulations, staying 
    competitive in a dynamic market, and focusing on customer retention 
    strategies. To tackle these challenges, EleFant needs to invest in robust 
    logistics infrastructure, implement comprehensive marketing strategies, 
    enforce stringent quality control measures, provide continuous librarian 
    training and support, stay updated on regulatory requirements, foster 
    innovation to stay competitive and build strong customer relationships 
    through personalized services and continuous improvement based on customer 
    feedback. Addressing these aspects strategically will be essential for 
    EleFant's successful and sustainable scale-up in the toy subscription industry.
    `,
  aboutHeader3: "Are you targeting new untapped market? Justify",
  aboutDetail3: 
    `
    EleFant has the potential to tap into a relatively 
    untapped market by offering its unique subscription-based 
    toy library model. The traditional toy market primarily involves 
    one-time purchases, which may pose financial and storage challenges 
    for parents. EleFant's subscription model addresses these concerns by 
    providing an economical, clutter-free, and environmentally friendly toy 
    solution. This approach caters to a segment of parents who may be 
    looking for more sustainable and cost-effective alternatives. Moreover, 
    the emphasis on curated, high-quality, and educational toys, 
    coupled with a personalized user experience through the app, 
    distinguishes EleFant in the market. By targeting this untapped 
    market segment, EleFant positions itself as a convenient and 
    innovative solution, potentially attracting a new customer base 
    seeking more flexible and sustainable options for their children's 
    play and learning experiences.
    `,
  aboutHeader4: "What are your moats?",
  aboutDetail4: 
    `
    EleFant's competitive edge is built on a distinctive 
    subscription-based toy library model, fostering recurring 
    revenue and customer loyalty. This approach not only offers 
    an economical and sustainable alternative to traditional toy 
    ownership but also ensures a consistent relationship with customers. 
    The curated catalog of high-quality, educational toys, coupled with 
    personalized recommendations based on a child's age and interests, 
    establishes a unique selling proposition. The user-friendly mobile 
    application, with features like real-time tracking and push notifications, 
    enhances convenience and sets EleFant apart in terms of 
    technological accessibility. Furthermore, EleFant's commitment 
    to environmental sustainability by reducing toy waste adds an 
    eco-friendly dimension, aligning with the growing consumer trend 
    towards socially responsible products. Collectively, these factors 
    create a robust competitive moat for EleFant in the toy industry.
    `,


  addressOfCompany: 
    `
    705 Palm Spring Centre, New link
    Road, Malad West Mumbai 400064
    `,

  highlight1Image: "./assets/images/deals-details/Petmojo/highlight4.jpg",
  highlight2Image: "./assets/images/deals-details/Petmojo/highlight01.jpg",
  highlight3Image: "./assets/images/deals-details/highlight2.jfif",
  highlight4Image: "./assets/images/deals-details/highlight3.jpg",

  highlight1Text:
    `
    The EleFant is India’s first mobile-based go to toy library subscription platform,Since launch, The EleFant has achieved 42,000+ registered users and 3,100+ paid subscribers, generating a ₹1.05 Cr monthly revenue run rate. With a presence in 85+ centres, 95+ partnerships, and physical stores in Mumbai & Noida, the platform is rapidly becoming India’s go-to toy rental solution. 
    `,
  highlight2Text:
    `
    The EleFant is implementing a Hub & Spoke Supply Chain Model to optimize logistics and efficiently serve its expanding user base. It is also focusing on scaling B2B, B2B2C, and referral-based revenue models.
    `,
  highlight3Text:
    `
    The EleFant is focused on strong growth, aiming to reach approximately 27K users by 2025, 71k by 2026, and 1.3 lakh by 2027. Over the next 12 months, it projects an MRR of over ₹3 Cr and an ARR of ₹33 Cr. The roadmap includes expanding to 20+ new cities, reaching 25,000+ paid users, and achieving ₹2.65 Cr MRR by Dec 2025.
    `,
  highlight4Text:
    `
    Having raised ₹5.5 Cr in Seed Funding (Apr 2024) at a ₹26 Cr valuation, The EleFant is now seeking ₹8 Cr to scale operations.  With a strong foundation and strategic growth plans, The EleFant is set to reshape playtime in India with toys.
    `,


  marketOverview1:
    `
    India has the largest child population
    globally, with 275 million children in the
    age group of 0 to 12 years. The Indian
    National Education Policy 2020 emphasizes
    play-based and activity-based learning,
    recognizing the significance of play in
    enhancing children's learning outcomes. It
    proposes an integrated approach to formal
    education that includes play, discovery,
    and interactive learning.
    `,
  marketOverview2:
    `
    The Indian toy market is set to reach $3
    billion by 2028, driven by rising incomes
    and a focus on child development. Toy
    subscription services, expected to grow at
    a CAGR of 12.2% from 2023 to 2028, offer a
    convenient and eco-friendly solution,
    tapping into India's vast and expanding
    child population, which is over 17% of the
    global total by 2036. The increasing
    spending power of middle-class families
    contributes to the market's potential,
    with a growing openness to innovative
    child development solutions like toy
    subscriptions.
    `,
  marketOverview3:
    `
    The evolution of the toy industry reflects
    a transition from traditional toys to
    modern, technology-driven offerings. In
    the past, simple toys focused on promoting
    imagination. Presently, STEM-based,
    Montessori and eco-friendly toys are
    prevalent, aligning with changing consumer
    preferences. Looking to the future,
    emerging technologies like virtual reality
    and artificial intelligence are expected
    to shape toys, providing immersive
    experiences. The industry anticipates a
    continued focus on learning, creativity,
    and social interaction in toys,
    emphasizing their crucial role in child
    development.
    `,

  aboutDeal: [
    `
    The EleFant is revolutionizing the toy industry 
    with a sustainable and affordable subscription 
    model that gives parents access to a curated selection 
    of premium toys. Moving away from the traditional 
    buy-store-discard cycle, EleFant ensures a clutter-free, 
    cost-effective, and eco-friendly solution for modern families. 
    With 275 million children (0-12 years) and a $2 billion toy industry, 
    India presents an enormous opportunity for sustainable toy consumption. 
    The rise of eco-conscious parenting, digital adoption, 
    and growing disposable income makes The EleFant a timely 
    and impactful solution.
    `,
    `
    The EleFant’s Franchise and Librarian Model enables 
    rapid expansion and community-driven growth. 
    Through franchises, partners can establish toy libraries 
    with EleFant’s brand, tech, and logistics support, 
    ensuring seamless operations. The Librarian Model empowers 
    women entrepreneurs to manage toys subrciption, sanitization, 
    and returns from home or small hubs, earning a flexible income. With 
    a subscription-based model, it offers access to curated toys 
    from 70+ top brands, including Hamleys, Hasbro, and Skillmatics. 
    This asset-light approach boosts last-mile delivery, customer service, 
    and sustainability, making EleFant a scalable and impactful business.
    `
  ]
    
};

class EleFant2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...defaultDealData,
      deal_id: staticDealData.dealId,
      images: staticDealData.imageList,
    };
    
  }

  componentWillMount() {
    document.title = staticDealData.title;
  }

  componentDidMount() {
    this.setState({ deal_id: staticDealData.dealId }, () => { });

    if (
      localStorage.getItem("investor_id") ||
      localStorage.getItem("founder_id")
    ) {
      if (localStorage.getItem("investor_id")) {
        let investor_id = localStorage.getItem("investor_id");
        this.setState(
          { investor_id: investor_id, user_type: "investor" },
          () => {
            this.getstatusdata();
            this.getinvestmentdetails();
            this.check_for_membership_type();
            this.getwallethistory();
            this.get_invest_amt();
          }
        );
      } else if (localStorage.getItem("founder_id")) {
        this.get_founder_details();
        this.setState({ user_type: "founder" });
      }
    } else {
      this.getDeals();
    }
    this.getordertoken();
    this.getGst();
    this.get_deal_doucments(staticDealData.dealId);

    this.setState(
      {
        investor_id: localStorage.getItem("Parent_investor_id"),
      },

      () => this.viewgroupall()
    );
  }

  viewgroupall = () => {
    let params = {
      userID: !this.props.adminview
        ? localStorage.getItem("Parent_investor_id")
        : this.props.investor_id,
    };

    Bridge.family.getGroupListForInvestment(params).then((result) => {
      let youAsMember = [
        {
          investor_id: localStorage.getItem("Parent_investor_id"),
          first_name: "You",
          last_name: "",
          groupName: "N/A",
        },
      ];
      this.setState({ group_list: youAsMember.concat(result.data) });
    });
  };

  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status == "1") {
        if (result.data.length > 0) {
          let investor_id = localStorage.getItem("founder_id");
          this.setState({ investor_id: investor_id }, () =>
            this.getwallethistory()
          );
          setTimeout(() => {
            if (result.data[0].is_investor == "1") {
              this.getstatusdata();
              this.getinvestmentdetails();
              this.check_for_membership_type();
              this.setState({ founder_is_investor: "1" });
            } else {
              this.check_for_membership_type();
              this.setState({ founder_is_investor: "0" });
            }
          }, 200);
        }
      } else {
        this.setState({ formloader: false });
      }
    });
  };

  get_deal_doucments = (deal_id) => {
    let params = {
      deal_id: deal_id,
    };
    Bridge.get_deal_doucments(params).then((result) => {
      if (result.status == "1") {
        let arr = [];
        for (let item of result.data) {
          item.selected = false;
          arr = [...arr, item];
        }
        this.setState({ documents: arr }, () =>
          this.get_document_purchased_list()
        );
      }
    });
  };

  getwallethistory() {
    if (this.state.investor_id) {
      let params = {
        investor_id: this.state.investor_id,
      };
      Bridge.investor.get_wallet_history(params).then((result) => {
        if (result.status == "1") {
          let credit_amount = 0;
          let debit_amount = 0;
          for (let item of result.data) {
            if (item.type == "credited") {
              credit_amount = parseInt(credit_amount) + parseInt(item.amount);
            }
            if (item.type == "debited") {
              debit_amount = parseInt(debit_amount) + parseInt(item.amount);
            }
          }
          let total = parseInt(credit_amount - debit_amount);
          this.setState({ walletMoney: Math.abs(total) });
        } else {
        }
      });
    }
  }

  //for getting gst from admin page
  getGst = () => {
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == "1") {
        console.log(result.data[0]);
        if (this.state.member_detail.state == "Maharashtra") {
          console.log(result.data[0]);

          this.setState({
            gst:
              result.data[0].taxation_percentage_cgst +
              result.data[0].taxation_percentage_sgst,
            igst: 18
          });
        } else if (this.state.member_detail.nationality == "Non Resident") {
          console.log(result.data[0]);
          this.setState({ gst: result.data[0].taxation_percentage, igst: 18 });
        } else {
          console.log(result.data[0], "asa");
          this.setState({ gst: result.data[0].taxation_percentage, igst: 18 });
          // console.log("gst can not be able to fetch")
        }
      }
    });
  };

  check_for_membership_type = () => {
    this.setState({ formloader: true });
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.check_for_membership_type(params).then((result) => {
      if (result.status == 1) {
        if (result.data.length > 0) {
          this.setState({
            member_detail: result.data[0],
            check_membership_type: result.data[0].membership_type,
          });
          setTimeout(() => {
            this.getDeals();
          }, 500);
        }
      } else {
        this.setState({ formloader: false });
      }
    });
    setTimeout(() => {
      this.getdealsettings();
    }, 500);
  };

  getordertoken = () => {
    Bridge.getcashfreetoken().then((result) => {
      let orderToken = result.order_token;
      // console.log(orderToken , "Order Token")
      this.setState({ order_token: orderToken });
    });
  };

  // get post list
  getdealsettings = () => {
    this.setState({ formloader: true });
    Bridge.admin.settings.getdealsettings().then((result) => {
      if (result.status == 1) {
        // console.log('result',result.data);
        this.setState({
          label: result.data[0].label,
        });
        if (this.state.check_membership_type == "premium") {
          this.setState({
            percentage: result.data[0].premium_member_deal_percentage,
          });
        } else {
          this.setState({
            percentage: result.data[0].regular_member_deal_percentage,
          });
        }
      } else {
        // message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  getinvestmentdetails = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: this.state.investor_id,
      deal_id: this.state.deal_id,
    };
    Bridge.investor.getinvestmentdetails(params).then((result) => {
      if (result.status == 1) {
        if (result.data != "") {
          this.setState({ isInvested: true });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get deal list
  getstatusdata = () => {
    this.setState({ loading: true });
    let params = {
      id: this.state.investor_id,
    };
    Bridge.users.getstatusdata(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          kycstatus: result.data[0].kycstatus,
          bankstatus: result.data[0].ifsc_code ? true : false,
          loading: false,
          name: result.data[0].first_name + " " + result.data[0].last_name,
          email: result.data[0].email,
          mobile: result.data[0].mobile,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get deal list
  getDeals = () => {
    this.setState({ loading: true });
    let param = {
      deal_id: this.state.deal_id
    }
    Bridge.deal.get_deal(param).then((result) => {
      // console.log(result.data, "data");
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          loading: false,
        });
        let current_date = moment();
        for (let d of result.data) {
          // console.log(d.deal_id , "id")
          // console.log(this.state.deal_id , "sid")
          if (d.deal_id == this.state.deal_id) {
            //  console.log(d.deal_status)
            let deal_regular_show_date = moment(d.regular_show_date);
            let deal_premium_show_date = moment(d.premium_show_date);
            let deal_start_dt_rg = moment(d.deal_st_date);
            let deal_start_dt_prem = moment(d.deal_start_dt_prem);
            if (this.state.check_membership_type == "premium") {
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_show_date).format("YYYY-MM-DD")
              ) {
                this.setState({ show_data: "block" });
              } else if (current_date > deal_premium_show_date) {
                this.setState({ show_data: "block" });
              } else {
                this.setState({ show_data: "none" });
                window.location.assign("/deals");
                return;
              }
            } else if (this.state.check_membership_type == "regular") {
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_show_date).format("YYYY-MM-DD")
              ) {
                this.setState({ show_data: "block" });
              } else if (current_date > deal_regular_show_date) {
                this.setState({ show_data: "block" });
              } else {
                this.setState({ show_data: "none" });
                window.location.assign("/deals");
                return;
              }
            }
          }
        }
        for (let d of result.data) {
          if (d.deal_id == this.state.deal_id) {
            if (d.show_status == "0") {
              this.setState({ is_deal_visible: false });
              window.location.assign("/deals")
            } else {
              this.setState({ is_deal_visible: true });
            }
            let investor_id = this.state.investor_id;
            if (d.deal_t_type == "Private") {
              if (
                investor_id &&
                d.invitations.length > 0 &&
                d.invitations.includes(investor_id)
              ) {
              } else {
                window.location.assign("/deals");
                return;
              }
            }
            let logourl =
              Apis.IMAGEURL + "deal/logo/" + d.deal_id + "/" + d.logo;

            let pdffile = `${process.env.REACT_APP_BASE_URL}api/uploads/deal/pitch/${d.deal_id}/${d.pitch_file}`;
            let pitchImg =
              Apis.IMAGEURL +
              "deal/pitch_images/" +
              d.deal_id +
              "/" +
              d.pitch_files;
            let percetage_raised = parseFloat(
              (d.total_invested_amount / d.deal_fund_requested) * 100 +
                parseInt(d.raiegap)
            ).toFixed(0);
            let deal_premium_start_date = moment(d.deal_start_dt_prem);
            let deal_regular_start_date = moment(d.deal_st_date);
            let deal_premium_end_date = moment(d.deal_end_dt_prem);
            let deal_regular_end_date = moment(d.deal_deal_end_date);
            this.setState({ deal_regular_end_date: deal_regular_end_date });
            let button_show_status = false;

            // console.log('this.state.check_membership_type',this.state.check_membership_type);
            // console.log('deal_regular_start_date',deal_regular_start_date);
            // console.log('deal_regular_end_date',deal_regular_end_date);
            // console.log('current_date',current_date);
            // deal changes
            let differece = "";
            let dealEndDate = "";
            let currentDate = "";
            this.setState({ coming_soon_days: "" });
            if (this.state.check_membership_type == "premium") {
              dealEndDate = moment(d.deal_end_dt_prem).format("YYYY-MM-DD");
              currentDate = moment().format("YYYY-MM-DD");
              let days = this.getDifferenceInDays(currentDate, dealEndDate);
              differece = days;
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_start_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") >
                  deal_premium_start_date.format("YYYY-MM-DD") &&
                moment(current_date).format("YYYY-MM-DD") <
                  moment(deal_premium_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else {
                button_show_status = false;
              }
              //for deal start date
              if (
                moment(current_date).format("YYYY-MM-DD") <=
                moment(deal_premium_start_date).format("YYYY-MM-DD")
              ) {
                this.setState({
                  coming_soon_days: this.getDifferenceInDays(
                    moment(current_date).format("YYYY-MM-DD"),
                    moment(deal_premium_start_date).format("YYYY-MM-DD")
                  ),
                });
              }
            } else if (
              this.state.check_membership_type == "regular" ||
              this.state.check_membership_type == ""
            ) {
              dealEndDate = moment(d.deal_end_date).format("YYYY-MM-DD");
              currentDate = moment().format("YYYY-MM-DD");
              let days = this.getDifferenceInDays(currentDate, dealEndDate);
              differece = days;
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_start_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") >
                  deal_regular_start_date.format("YYYY-MM-DD") &&
                moment(current_date).format("YYYY-MM-DD") <
                  moment(deal_regular_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else {
                button_show_status = false;
              }
              //for deal start date
              if (
                moment(current_date).format("YYYY-MM-DD") <=
                moment(deal_regular_start_date).format("YYYY-MM-DD")
              ) {
                this.setState({
                  coming_soon_days: this.getDifferenceInDays(
                    moment(current_date).format("YYYY-MM-DD"),
                    moment(deal_regular_start_date).format("YYYY-MM-DD")
                  ),
                });
              }
            }
            // console.log('button_show_status',this.state.button_show_status);
            this.setState(
              {
                deal_name: d.name,
                deal_description: d.Muliples_of,
                // isBlank:d.deal_status == "Closed" ? window.location.href = "/" : "/",
                isPrivate: d.deal_t_type == "Private" ? true : false,
                isFunded: d.deal_status == "Closed" ? true : false,
                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
                logo: logourl,
                youtube_url: d.youtubelink,
                dealenddays: differece > 0 ? differece : 0,
                minamount: Number(d.Min_inv_amt),
                captable_threshold_amount: parseInt(
                  parseFloat(d.captable_threshold_amount).toFixed(2),
                  10
                ),
                maxamount: d.Max_inv_amt,
                captable_multiple_amount: parseInt(
                  parseFloat(d.captable_multiple_amount).toFixed(2),
                  10
                ),
                amount: "", //d.Min_inv_amt
                commaAmount: "", //d.Min_inv_amt
                pdffile: pdffile,
                pitch_files: pitchImg,
                percentage_raised: percetage_raised,
                button_show_status: button_show_status,
                show_data: "block",
                multiples_of: d.multiples_of,
                deal_service: d.deal_service,
              },
              () => this.calculategst()
            );
          }
        }
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  getDifferenceInDays = (date1, date2) => {
    let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
    let final = 0;
    if (diff < 0) {
      final = 0;
      this.setState({
        deal_regular_end_date_status: 1,
      });
    } else {
      final = diff;
      this.setState({
        deal_regular_end_date_status: 0,
      });
    }
    return final;
  };

  showModal1 = () => {
    if (this.state.kycstatus == "admin_rejected") {
      message.warning(
        "Your KYC is Rejected, Please Contact to contact@Growth91<sup>TM</sup>.com"
      );
      return;
    }

    this.setState(
      {
        selectInvestorModal: false,
        investmentmodal: true,
      },
      () => {
        this.calculategst();
      }
    );
  };

  // post api hit on express
  getpostData = () => {
    const formData = new FormData();
    formData.append("deal_id", this.state.deal_id);
    formData.append("investor_id", this.state.investor_id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/save_investor_interest_deal`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        this.setState({
          interested_id: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOk1 = () => {
    this.setState({
      investmentmodal: false,
    });
  };

  handleCancel1 = () => {
    this.setState({
      investmentmodal: false,
    });
  };

  handleCancelgstmodal = () => {
    this.setState({
      gstmodal: false,
    });
  };

  founder_updateprofiledetails = () => {
    if (this.state.gstBusinessName == "") {
      message.warning("Gst business nameis required");
      return false;
    } else if (this.state.gstNo == "") {
      message.warning("gst no is required");
      return false;
    }
    this.setState({ formloader: true });

    let formData = new FormData(); //formdata object
    console.log(this.state.gstBusinessName, this.state.gstNo);

    formData.append("gstBusinessName", this.state.gstBusinessName); //append the values with key, value pair
    formData.append("gstNo", this.state.gstNo);
    formData.append("first_name", this.state.member_detail.firstname); //append the values with key, value pair
    formData.append("middle_name", this.state.member_detail.middlename);
    formData.append("last_name", this.state.member_detail.lastname);
    formData.append("mobile", this.state.member_detail.contactno);
    formData.append(
      "membership_type",
      this.state.member_detail.membership_type
    );
    formData.append("user_profile_picture", this.state.member_detail.profile);
    formData.append("investor_id", this.state.member_detail.investor_id);
    formData.append("investor_id", localStorage.getItem("investor_id"));
    console.log(formData.getAll);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (localStorage.getItem("investor_id")) {
      Bridge.investor.updateprofiledetails(formData, config).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState(
            {
              formloader: false,
              gstmodal: false,
            },
            () => this.check_for_membership_type()
          );
        } else {
          message.error(result.message);
          this.setState({
            formloader: false,
          });
        }
      });
    }
  };

  showModal2 = () => {
    this.setState({
      confirmmodalstatus: true,
    });
  };

  handleOk2 = () => {
    this.setState({
      confirmmodalstatus: false,
    });
  };

  handleCancel2 = () => {
    this.setState({
      confirmmodalstatus: false,
    });
  };

  onChangeConvenience = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
      Convenience: e.target.checked,
    });
  };

  onChangeCheckbox = (e) => {
    console.log(this.state.member_detail.gstBusinessName);
    console.log(this.state.member_detail.gstNo);

    this.setState({
      [e.target.name]: e.target.checked,
      agreeCheck: e.target.checked,
    });
    // logic for update gst no and gst bussiness name
    // if (e.target.name === "agree") {
    //   if(e.target.checked == true){

    //   console.log(e.target.name);
    //   if (
    //     this.state.member_detail.gstBusinessName == null ||
    //     this.state.member_detail.gstNo == null
    //   ) {
    //     this.setState({
    //       gstmodal: true,
    //       formloader: false,
    //     });
    //     // return
    //   }
    // }
    // }

    if (e.target.name == "deduct") {
      if (e.target.checked == true) {
        let processingfees = parseFloat(
          (this.state.amount / 100) * parseFloat(this.state.percentage)
        );

        // Adjust processingFees based on the fractional part
        processingfees =
          Math.floor(processingfees) + (processingfees % 1 > 0.5 ? 1 : 0);

        let tdsamount = parseFloat(processingfees / 100) * 10;
        let minusamt = parseFloat(processingfees - tdsamount);

        this.setState({
          tdsstatus: true,
          processingfees: minusamt,
          tdsdeductedamount: tdsamount,
          totalamount:
            Number(this.state.amountplusgst) +
            Number(this.state.gstValue) +
            Number(minusamt),
        });
      } else {
        console.log(e.target.name);

        let processingfees = parseFloat(
          (this.state.amount / 100) * parseFloat(this.state.percentage)
        );
        this.setState({
          tdsstatus: false,
          processingfees: processingfees,
          tdsdeductedamount: 0,
          totalamount:
            Number(this.state.amountplusgst) +
            Number(this.state.gstValue) +
            Number(processingfees),
        });
      }
    }
  };

  // investing your money
  invest = () => {
    let investor_id = this.state.investor_id;
    let deal_id = this.state.deal_id;
    let Investment_amt = this.state.totalamount;
    let deductstatus = this.state.deduct == true ? "1" : "0";
    let agreestatus = this.state.agree == true ? "1" : "0";
    let payment_ref = this.state.order_token;
    let tdsstatus = this.state.tdsstatus == true ? "1" : "0";
    let processingfees = this.state.processingfees;
    let gst = this.state.gst;
    let legalfees = this.state.legalfee;
    let order_id = "order-01";
    let walletamt = this.state.walletDeductionMoney
      ? this.state.walletDeductionMoney
      : 0;

    let url = `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php?investor_id=${investor_id}&deal_id=${deal_id}&deductstatus=${deductstatus}&agreestatus=${agreestatus}&payment_ref=${payment_ref}&tdsstatus=${tdsstatus}&processingfees=${processingfees}&gst=${gst}&legalfees=${legalfees}&Investment_amt=${Investment_amt}&order_id=${order_id}&wallet=${walletamt}`;
    // console.log('url',url);
    window.location.assign(url);
  };

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  calculategst = () => {
    let legalfee = parseFloat(
      (this.state.amount / 100) * parseFloat(this.state.percentage)
    ).toFixed(0);
    let minusamt = 0;
    let gst = this.state.gst;
    let amt = parseFloat(this.state.amount);
    let walletDeductionMoney = 0;
    let igstvalue = Math.ceil(((legalfee) * 9) / 100) * 2;
    let gstValue = ((legalfee - walletDeductionMoney) * gst) / 100;
    // ceil gst value
    gstValue = Math.ceil(gstValue);
    // console.log(gst);
    // console.log(legalfee);
    // console.log(gstValue);
    let tdsamount = 0;
    if (this.state.tdsstatus === true) {
      tdsamount = parseFloat(legalfee / 100) * 10;
      minusamt = parseFloat(legalfee - tdsamount);
    }

    console.log(legalfee);
    console.log(tdsamount);
    console.log(minusamt);

    this.setState({
      gst: gst,
      legalfee: this.state.amount ? legalfee : 0,
      amountplusgst: this.state.amount ? amt.toFixed(0) : 0,
      processingfees: this.state.amount
        ? legalfee - Number(tdsamount)
        : 0,
      totalamount: this.state.amount
        ? (amt + parseFloat(legalfee - Number(tdsamount))).toFixed(
            0
          ) -
          walletDeductionMoney +
          igstvalue
        : 0,
      walletDeductionMoney: walletDeductionMoney,
      gstValue: Number(gstValue).toFixed(0),
    });
    return gst;
  };

  documentPay = () => {
    if (!this.state.investor_id) {
      message.warning("Please login first to invest.", 5);
      return;
    }
    let documents = this.state.documents;
    let paying_for_documents = [];
    let totalamt = 0;
    for (let item of documents) {
      if (item.selected == true) {
        totalamt +=
          this.state.check_membership_type == "premium"
            ? Number(item.premium_price)
            : Number(item.regular_price);
        paying_for_documents = [...paying_for_documents, item.documentid];
      }
    }
    let order_id = "order-01";
    let user_id = this.state.investor_id;
    let amount = totalamt;
    let docs = paying_for_documents.join("-").toString();
    let deal_id = this.state.deal_id;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/buy_documents/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&docs=${docs}&deal_id=${deal_id}`;

    window.location.href = url;
  };

  get_document_purchased_list = () => {
    if (this.state.investor_id) {
      let params = {
        investor_id: this.state.investor_id,
        deal_id: this.state.deal_id,
      };
      Bridge.deal.get_document_purchased_list(params).then((result) => {
        if (result.status == 1) {
          let arr = [];
          let documents = this.state.documents;
          for (let item of documents) {
            let status = false;
            item.user_paid = false;
            for (let item2 of result.data) {
              if (item2.document_id == item.documentid || item.paid == "Free") {
                item.user_paid = true;
              }
            }
            arr = [...arr, item];
          }
          this.setState({ documents: arr });
        }
      });
    }
  };

  check_for_error = () => {
    let error = "";
    let multiple_of =
      parseFloat(this.state.amount) / parseFloat(this.state.multiples_of);
    if (Number(this.state.amount) < Number(this.state.minamount)) {
      error = `Minimum investment amount is Rs. ${this.state.minamount}`;
      this.setState({ amount_error: error, amount_error_status: true });
    } else if (Number(this.state.amount) > Number(this.state.maxamount)) {
      error = `Maximum investment amount is Rs. ${this.state.maxamount}`;
      this.setState({ amount_error: error, amount_error_status: true });
    } else if (
      Number(this.state.amount) <
        Number(this.state.captable_threshold_amount) &&
      Number(this.state.amount) % Number(this.state.multiples_of) != 0
    ) {
      const roundedLowerAmount =
        Math.floor(
          Number(this.state.amount) / Number(this.state.multiples_of)
        ) * Number(this.state.multiples_of);
      const roundedHigherAmount =
        Math.ceil(Number(this.state.amount) / Number(this.state.multiples_of)) *
        Number(this.state.multiples_of);

      error = `Please enter an amount in multiples of ${this.state.multiples_of}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
      // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

      this.setState({ amount_error: error, amount_error_status: true });
    } else if (
      Number(this.state.amount) >
        Number(this.state.captable_threshold_amount) &&
      Number(this.state.amount) % Number(this.state.captable_multiple_amount) !=
        0
    ) {
      const roundedLowerAmount =
        Math.floor(
          Number(this.state.amount) /
            Number(this.state.captable_multiple_amount)
        ) * Number(this.state.captable_multiple_amount);
      const roundedHigherAmount =
        Math.ceil(
          Number(this.state.amount) /
            Number(this.state.captable_multiple_amount)
        ) * Number(this.state.captable_multiple_amount);

      error = `Please enter an amount in multiples of ${this.state.captable_multiple_amount}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
      // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

      this.setState({ amount_error: error, amount_error_status: true });
    } else {
      this.setState({ amount_error: "", amount_error_status: false });
    }
  };

  get_invest_amt = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/get_investor_investment_for_deal`,
        {
          params: {
            deal_id: this.state.deal_id,
            investor_id: this.state.investor_id,
          },
        }
      )
      .then((response) => {
        // console.log("invest_amt : ", response.data.data[0].totalamount);
        this.setState({ invest_amt: response.data.data[0].totalamount });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  increase_commit = () => {
    const {
      amount,
      captable_threshold_amount,
      multiples_of,
      maxamount,
      captable_multiple_amount,
      minamount,
    } = this.state;

    let newAmount = Number(amount);
    let changeAmount;

    if (
      newAmount < captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount > captable_threshold_amount &&
      newAmount % captable_multiple_amount != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(captable_multiple_amount)) *
        Number(captable_multiple_amount);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (newAmount < Number(captable_threshold_amount)) {
      changeAmount = Number(multiples_of);
    } else {
      changeAmount = Number(captable_multiple_amount);
    }

    newAmount += changeAmount;

    if (newAmount > maxamount) {
      newAmount = maxamount;
    } else if (newAmount < minamount) {
      newAmount = Number(minamount);
    }

    this.setState(
      {
        amount: newAmount,
        commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
    console.log(newAmount);
  };

  decrease_commit = () => {
    const {
      amount,
      captable_threshold_amount,
      multiples_of,
      minamount,
      captable_multiple_amount,
    } = this.state;

    let newAmount = Number(amount);
    let changeAmount;

    if (
      newAmount == captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount < captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (
      newAmount > captable_threshold_amount &&
      newAmount % captable_multiple_amount != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(captable_multiple_amount)) *
        Number(captable_multiple_amount);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (newAmount <= Number(captable_threshold_amount)) {
      changeAmount = Number(multiples_of);
    } else {
      changeAmount = Number(captable_multiple_amount);
    }

    newAmount -= changeAmount;

    if (newAmount < minamount) {
      newAmount = minamount;
    }

    this.setState(
      {
        amount: newAmount,
        commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  handleCommitAmount = (value) => {
    this.setState(
      {
        amount: value.replace(/,/g, ""),
        commaAmount: this.formatNumberWithCommas(value),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-IN");
  };

  getSliderSettings() {
    return {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }

  handleClickImage = (image) => {
    this.setState({
      current: image,
    });
  };

  handleCloseModal = () => {
    this.setState({
      current: "",
    });
  };

  render() {
    const dataSource2 =
      this.state.group_list &&
      this.state.group_list
        .map((item, index) => {
          return {
            key: item.investor_id,
            investorName: item.first_name + " " + item.last_name,
            groupName: item.groupName,
            action: item,
          };
        });

    const columns2 = [
      {
        title: "Investor Name",
        dataIndex: "investorName",
        key: "investorName",
      },
      {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
      },
    ];

    const settings = this.getSliderSettings();
    const { images, current } = this.state;

    return (
      <>
        {this.state.is_deal_visible == true ? (
            <div style={{ display: this.state.show_data }}>
            <NewWebHeader newabout={"newabout"} />
            <section
              className="deals-details-page"
              style={{ marginBottom: "-50px" }}
            >
              <div className="container main-section">
                <div className="row">
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <Spin spinning={this.state.loading}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {/* Image is static */}
                          <img
                            src={staticDealData.logoImage}
                            alt=""
                            className="img-fluid"
                            style={{
                              marginRight: "20px",
                              width: "50%",
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="ml-5 mt-4">{staticDealData.dealTitle}</h5>
                          {/* <h5>{this.state.logo}</h5> */}
                        </div>
                        {this.state.isPrivate == true && (
                          <div
                            className="private-tag"
                            style={{
                              height: 38,
                            }}
                          >
                            <span style={{ fontSize: 12 }}>Private</span>{" "}
                          </div>
                        )}
                      </div>
                      <div className="d-flex tags">
                        <div
                          className="hero-tag"
                          style={{
                            background: "rgb(41 23 111)",
                            color: "#fff",
                          }}
                        >
                          {staticDealData.industryTag}
                        </div>
                      </div>
                      <p style={{ textAlign: "justify" }}>
                        {
                            staticDealData.aboutDeal.map((item) => {
                                return (
                                    <>
                                        {item}
                                        <br />
                                        <br />
                                    </>
                                );
                            })
                        }
                      </p>{" "}
                      <div className=" percentage-container">
                        <div className="percentage-values">
                          {this.state.coming_soon_days ? (
                            <>
                              <div>
                                <h3>{this.state.percentage_raised}%</h3>
                                <span>RAISED</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <h3>{this.state.coming_soon_days} Days</h3>
                                <span>CAMPAIGN START IN</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <h3>{this.state.percentage_raised}%</h3>
                                <span>RAISED</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <h3>{this.state.dealenddays} Days</h3>
                                <span>CAMPAIGN ENDS IN</span>
                              </div>
                            </>
                          )}
                        </div>
                        <Progress
                          percent={this.state.percentage_raised}
                          strokeColor={{
                            "0%": "rgb(255 156 26)",
                            "100%": "rgb(255 156 26)",
                          }}
                          showInfo={false}
                        />
                      </div>
                      {!this.state.investor_id ? (
                        <div className="button-group text-center">
                          <a className="prime-bg" href="/Login">
                            Login
                          </a>
                          {/* <button className='share-button'>
                        <i className='bx bxs-share'></i>
                      </button> */}
                        </div>
                      ) : (
                        <>
                          {this.state.button_show_status == true ? (
                            <>
                              <div className="button-group">
                                {this.state.isFunded == true ? (
                                  <a
                                    href="#"
                                    className="black-button prime-bg text-center"
                                  >
                                    Deal is closed
                                  </a>
                                ) : this.state.user_type != "founder" &&
                                  this.state.invest_amt !== null &&
                                  dataSource2.length <= 1 ? (
                                  <div className="button-group">
                                    <p>{`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}</p>
                                    <a
                                      href="#!"
                                      style={{ padding: "13px 0" }}
                                      onClick={() => {
                                        this.setState({
                                          selectedInvestorId:
                                            dataSource2[0].key,
                                        });
                                        this.getpostData();
                                        this.showModal1();
                                      }}
                                      className="black-button prime-bg text-center"
                                      id="btn-invest"
                                    >
                                      Add more
                                    </a>
                                  </div>
                                ) : this.state.isPrivate == true &&
                                  this.state.user_type != "founder" ? (
                                  <a
                                    style={{ padding: "13px 0" }}
                                    href="#"
                                    onClick={() => {
                                      this.getpostData();
                                      this.showModal1();
                                    }}
                                    className="black-button prime-bg text-center"
                                  >
                                    I Agree to Terms and ss Your Interest
                                  </a>
                                ) : this.state.user_type == "founder" ? (
                                  <div>
                                    {this.state.user_type == "founder" &&
                                    this.state.founder_is_investor == "1" ? (
                                      <a
                                        href="#"
                                        style={{ padding: "15px 0" }}
                                        className="black-button prime-bg text-center"
                                        onClick={() => {
                                          this.getpostData();
                                          if (dataSource2.length > 1) {
                                            this.setState({
                                              selectInvestorModal: true,
                                            });
                                          } else {
                                            this.setState({
                                              selectedInvestorId:
                                                dataSource2[0].key,
                                            });
                                            this.showModal1();
                                          }
                                        }}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : (
                                      <a
                                        href="/founder-as-investor"
                                        className="black-button prime-bg text-center"
                                      >
                                        Apply as investor
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {this.state.user_type == "investor" &&
                                    this.state.invest_amt === null ? (
                                      <a
                                        href="#"
                                        className="black-button prime-bg text-center"
                                        onClick={() => {
                                          this.getpostData();
                                          if (dataSource2.length > 1) {
                                            this.setState({
                                              selectInvestorModal: true,
                                            });
                                          } else {
                                            this.setState({
                                              selectedInvestorId:
                                                dataSource2[0].key,
                                            });
                                            this.showModal1();
                                          }
                                        }}
                                        style={{ padding: "13px 0" }}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : null}
                                    {this.state.user_type == "investor" &&
                                    this.state.invest_amt != null &&
                                    dataSource2.length > 1 ? (
                                      <a
                                        href="#"
                                        className="black-button prime-bg text-center"
                                        onClick={() => {
                                          this.getpostData();
                                          this.setState({
                                            selectInvestorModal: true,
                                          });
                                        }}
                                        style={{ padding: "13px 0" }}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : null}
                                  </div>
                                )}
                                {/* <button className='share-button'>
                              <i className='bx bxs-share'></i>
                            </button> */}
                              </div>
                            </>
                          ) : (
                            // <div className='button-group'>
                            //   <a href="#" className="black-button prime-bg" style={{cursor:'default'}} >Coming soon..</a>
                            // </div>
                            <>
                              {this.state.deal_regular_end_date_status == 0 ? (
                                <div className="button-group">
                                  <a
                                    href="#"
                                    className="black-button prime-bg"
                                    style={{ cursor: "default" }}
                                  >
                                    Coming soon..
                                  </a>
                                </div>
                              ) : (
                                <div className="button-group">
                                  <a
                                    href="#"
                                    className="black-button prime-bg"
                                    style={{ cursor: "default" }}
                                  >
                                    Deal is closed
                                  </a>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </Spin>
                  </div>
                  <Modal
                    title={`Select Investor`}
                    okText={"Select"}
                    visible={this.state.selectInvestorModal}
                    onCancel={() => {
                      this.setState({ selectInvestorModal: false });
                    }}
                    cancelText="Cancel"
                    width={600}
                    footer={false}
                  >
                    <Table
                      rowSelection={{
                        type: "radio",
                        onSelect: (x) => {
                          this.setState({ selectedInvestorId: x.key });
                        },
                        // selectedRowKeys: this.state.selectedRowKeys,
                        // onChange: (x,y) => {
                        //     console.log(x);
                        //     console.log(y);
                        // }
                      }}
                      className="table-2"
                      dataSource={dataSource2}
                      columns={columns2}
                      bordered
                      loading={this.state.loading}
                    />

                    <button
                      type="button"
                      className="login-button prime-bg d-md-block mx-auto w-50 mt-1"
                      onClick={() => {
                        if (this.state.selectedInvestorId == null) {
                          notification.warning({
                            message: `Please Select an Investor`,
                            placement: "top",
                            duration: 5,
                          });
                        } else {
                          this.showModal1();
                        }
                      }}
                    >
                      Invest as Selected User
                    </button>
                  </Modal>
                  <Modal
                    title={`Invest in ${this.state.deal_name}`}
                    visible={this.state.investmentmodal}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    width={600}
                    footer={false}
                  >
                    <div className="row modal-body">
                      <div className="login mt-3">
                        <label>
                          <b>
                            Amount: <br />
                            Minimum investment Rs.{" "}
                            {this.formatNumberWithCommas(
                              this.state.minamount
                            )}{" "}
                            <br />
                            Cap Table entry is Rs.
                            {this.formatNumberWithCommas(
                              this.state.captable_threshold_amount
                            )}
                          </b>
                        </label>
                        <input
                          type="text"
                          name="amount"
                          className="form-input-field mt-4"
                          autofocus={true}
                          placeholder="amount"
                          style={{
                            border:
                              this.state.amount_error_status == true &&
                              this.state.amount
                                ? "1px solid red"
                                : "1px solid transparent",
                          }}
                          id="selected-field"
                          value={this.state.commaAmount}
                          onChange={(e) => {
                            this.handleCommitAmount(e.target.value);
                          }}
                        />
                        <div className="d-flex justify-content-between mb-3">
                          <button
                            className="commit-plus"
                            onClick={this.decrease_commit}
                          >
                            -
                          </button>
                          <button
                            className="commit-minus"
                            onClick={this.increase_commit}
                          >
                            +
                          </button>
                        </div>
                        {this.state.amount_error_status == true && (
                          <p
                            className="text-danger pb-0"
                            style={{ position: "relative", top: -19 }}
                          >
                            {this.state.amount_error}
                          </p>
                        )}
                      </div>

                      <div class="form-group form-check d-flex">
                        <Checkbox
                          checked={this.state.checkWallet}
                          onChange={(e) => {
                            this.setState(
                              { checkWallet: e.target.checked },
                              () => this.calculategst()
                            );
                          }}
                        >
                          {" "}
                        </Checkbox>
                        <label className="form-check-label">
                          Use Your ₹ {this.state.walletMoney} Growth91
                          <sup style={{ fontSize: "0.6rem" }}>
                            TM
                          </sup> Money{" "}
                        </label>
                      </div>
                      <div className=" d-flex justify-content-center modal-table">
                        <table
                          className="col-12 m-5 investment-charge-table"
                          cellPadding={4}
                        >
                          <tr>
                            <th>
                              <strong>Particulars</strong>
                            </th>
                            <th>
                              <strong>Amount</strong>
                            </th>
                          </tr>
                          <tr>
                            <td>Investment Amount</td>
                            <td
                              className="text-end"
                              style={{ textAlign: "right!important" }}
                            >
                              ₹{" "}
                              {this.state.amountplusgst
                                ? this.formatNumberWithCommas(
                                    Number(this.state.amountplusgst)
                                  )
                                : "0"}
                            </td>
                          </tr>

                          <tr>
                            <td>
                              Convenience Fees
                              <br />
                              <span>{this.state.label}</span>
                            </td>
                            <td
                              className="text-end"
                              style={{ textAlign: "right!important" }}
                            >
                              ₹{" "}
                              {this.formatNumberWithCommas(
                                Number(this.state.processingfees)
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Wallet Money</td>
                            <td
                              className="text-end"
                              style={{ textAlign: "right!important" }}
                            >
                              - ₹ {this.state.walletDeductionMoney}
                            </td>
                          </tr>
                          <tr>
                            <td>GST</td>
                            <td
                              className="text-end"
                              style={{ textAlign: "right!important" }}
                            >
                              ₹{" "}
                              {this.formatNumberWithCommas(
                                Number(this.state.igstValue).toFixed(0)
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td className="text-end">
                              ₹{" "}
                              {this.formatNumberWithCommas(
                                Number(
                                  parseFloat(this.state.totalamount).toFixed(0)
                                )
                              )}
                            </td>
                          </tr>
                        </table>
                      </div>
                      {this.state.invest_amt !== null &&
                      this.state.selectedInvestorId ==
                        localStorage.getItem("Parent_investor_id") ? (
                        <div className="">
                          <Alert
                            message={`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}
                            type="info"
                          />
                        </div>
                      ) : null}
                      <div className="m-3">
                        <label className="container-check">
                          I Agree to Terms and Conditions and have read the
                          Privacy Policy. And, I understand that I will be
                          required to pay the full amount committed after the
                          deal is closed.
                          <input
                            type="checkbox"
                            name="agree"
                            onChange={this.onChangeCheckbox}
                          />
                          <span className="checkmark"></span>
                        </label>

                        {/* <label className="container-check">
                          I will deduct TDS on service charges and deposit to
                          Income tax on time
                          <input
                            type="checkbox"
                            name="deduct"
                            onChange={this.onChangeCheckbox}
                          />
                          <span className="checkmark"></span>
                        </label> */}

                        <label
                          className="container-check"
                          style={{ fontSize: "10px" }}
                        >
                          Convenience Fee of 2% on the investment amount at the
                          time of investment and 2% on the sale proceeds at the
                          time of exit is applicable.
                        </label>
                      </div>

                      <div className="col-12">
                        {this.state.amount_error_status == true ? (
                          <button
                            type="button"
                            className="login-button text-center"
                            style={{
                              border: "1px solid #9a9a9a",
                              backgroundColor: "#9a9a9a",
                              cursor: "not-allowed",
                              padding: "0.9em 0 ",
                            }}
                          >
                            Express Your Interest
                          </button>
                        ) : (
                          <InvestmentMembershipmodal
                            processingfees={this.state.processingfees}
                            deal_id={this.state.deal_id}
                            membership_type={this.state.check_membership_type}
                            invest={this.invest}
                            amount={this.state.amount}
                            agreecheck={this.state.agreeCheck}
                            totalamount={this.state.totalamount}
                            fee={this.state.legalfee}
                            minamount={this.state.minamount}
                            maxamount={this.state.maxamount}
                            agree={this.state.agree}
                            error_status={this.state.amount_error_status}
                            investor_id={this.state.selectedInvestorId}
                            deduct={this.state.deduct}
                            tdsstatus={this.state.tdsstatus}
                            gst={this.state.gst}
                            gstvalue={this.state.gstValue}
                            igst={this.state.igst}
                            igstvalue={this.state.igstvalue}
                            order_token={this.state.order_token}
                            legalfee={this.state.legalfee}
                            walletDeductionMoney={
                              this.state.walletDeductionMoney
                            }
                            user_id={this.state.investor_id}
                            escrow_account_ifsc={this.state.escrow_account_ifsc}
                            escrowact={this.state.escrowact}
                            interested_id={this.state.interested_id}
                            invest_amt={this.state.invest_amt}
                          />
                        )}
                        <button
                          type="button"
                          className="login-button text-center  btn-secondary"
                          style={{
                            border: "1px solid #f3f3f",
                            padding: "0.9em 0 ",
                            marginTop: "10px",
                          }}
                          value=""
                          onClick={(e) => {
                            this.handleCommitAmount(e.target.value);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    title={`Edit Gst`}
                    okText={"Update"}
                    visible={this.state.gstmodal}
                    onOk={this.founder_updateprofiledetails}
                    onCancel={this.handleCancelgstmodal}
                    cancelText="Cancel"
                    width={600}
                    footer={false}
                  >
                    <Spin spinning={this.state.formloader}>
                      <div className="form-group">
                        <label>Gst Business Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Gst Business Name"
                          value={this.state.gstBusinessName}
                          onChange={(e) =>
                            this.setState({ gstBusinessName: e.target.value })
                          }
                        />
                      </div>
                      <br />

                      <div className="form-group">
                        <label>Gst NO</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="GST No"
                          value={this.state.gstNo}
                          onChange={(e) =>
                            this.setState({ gstNo: e.target.value })
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="login-button prime-bg d-md-block mx-auto w-100 mt-1"
                        onClick={() => this.founder_updateprofiledetails()}
                      >
                        Update
                      </button>
                    </Spin>
                  </Modal>
                  <Modal
                    title="Deduct TDS"
                    visible={this.state.confirmmodalstatus}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    okText="Update"
                    cancelText="Cancel"
                    width={700}
                    footer={false}
                  >
                    <div className="row">
                      <div style={{ width: "100%" }}>
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          TDS is applicable according to Section-194j of the
                          income Tex act, 1961.
                        </p>
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          Rate: 10%
                        </p>{" "}
                        <br />
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          <b>Do you want to Deduct TDS?</b>
                        </p>
                      </div>

                      <div className="col-11">
                        <button
                          type="button"
                          className="login-button bg-primary mt-4 mx-4"
                          onClick={() => this.invest()}
                        >
                          Yes
                        </button>
                        <input
                          type="button"
                          value="No Thanks"
                          onClick={() => this.invest()}
                          className="login-button mx-4 my-3"
                        ></input>
                      </div>
                    </div>
                  </Modal>
                  <div className="col-lg-7 deal-banner deals-video-banner">
                    <iframe
                      style={{
                        boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                        borderRadius: 3,
                        // marginLeft: 65,
                      }}
                      width="100%"
                      height="335"
                      src={staticDealData.youtubeVideoLink}
                      frameborder="10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                    
                    <iframe
                      style={{
                        boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                        borderRadius: 3,
                        // marginLeft: 65,
                      }}
                      width="100%"
                      height="335"
                      src={staticDealData.youtubeVideoLink2}
                      frameborder="10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                    
                    
                  </div>

                  <div
                    className="container home-decor-section mt-0"
                    style={{ marginTop: "3px !important" }}
                  >
                    <h1
                      className="text-center"
                      style={{
                        marginBottom: "20px",
                        marginTop: "0px !important",
                      }}
                    >
                      Market Overview
                    </h1>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="single text-center h-lg market-boxes">
                          {/* <h2 style={{paddingBottom:"20px"}}>$1 Tn </h2> */}
                          <p
                            style={{
                              color: "white",
                              fontSize: "21px",
                              padding: "2px",
                              margin: "48px 0px",
                              opacity: "1",
                              lineHeight: "1.5",
                            }}
                          >
                            {staticDealData.marketOverview1}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="single text-center h-lg market-boxes">
                          <p
                            style={{
                              color: "white",
                              fontSize: "21px",
                              padding: "2px",
                              margin: "48px 0px",
                              opacity: "1",
                              lineHeight: "1.5",
                            }}
                          >
                            {staticDealData.marketOverview2}
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="single text-center h-lg market-boxes">
                          <p
                            style={{
                              color: "white",
                              fontSize: "21px",
                              padding: "2px",
                              margin: "48px 0px",
                              opacity: "1",
                              lineHeight: "1.5",
                            }}
                          >
                            {staticDealData.marketOverview3}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="text-center fs-4">
                      <span style={{ color: "#000" }}>Source: </span>
                      <span style={{ color: "rgb(127, 119, 118)" }}>
                        Multiple publicly available research and survey reports
                      </span>
                    </div>
                    <p className=""> </p>
                    <div className="text-center fluid-container"></div>
                  </div>
                  <div
                    className="container highlight-section"
                    style={{
                      marginBottom: "-80px !important",
                      padding: "0px !important",
                    }}
                  >
                    <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                      Highlights
                    </h1>

                    <div className="row highlight-rows">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single  mindlerhighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src={staticDealData.highlight1Image} />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            {staticDealData.highlight1Text}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single mindlerhighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src={staticDealData.highlight2Image} />
                          </div>
                          <p style={{ padding: "1px !important" }}>
                            {staticDealData.highlight2Text}
                          </p>{" "}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single mindlerhighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src={staticDealData.highlight3Image} />
                          </div>
                          <p style={{ padding: "0px !important" }}>
                            {staticDealData.highlight3Text}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single mindlerhighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src={staticDealData.highlight4Image} />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            {staticDealData.highlight4Text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* media */}
                </div>
              </div>
            </section>
            <div className="deals-page">
              <div className="tab-wrapper">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-lg-12 col-md-12 col-sm-12"
                      style={{
                        marginTop: 110,
                      }}
                    >
                      <div className="deal-terms-section">
                        {/* Investor Presentation */}
                        <div
                          className=""
                          style={{
                            backgroundColor: "white",
                            marginTop: "1px !important",
                          }}
                        >
                          <h1
                            style={{
                              fontSize: 32,
                              marginBottom: 30,
                              textAlign: "center",
                              marginTop: "-10px !important",
                            }}
                          >
                            Investor Presentation
                          </h1>
                          <Slider {...settings} className="mb-5 pitch-slider">
                            {images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                onClick={() => this.handleClickImage(image)}
                              />
                            ))}
                          </Slider>
                          {current && (
                            <Lightbox
                              mainSrc={current}
                              onCloseRequest={this.handleCloseModal}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="deals-page">
              <div className="tab-wrapper">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-lg-12 col-md-12 col-sm-12"
                      style={{
                        marginTop: 110,
                      }}
                    >
                      <Tabs
                        defaultActiveKey="1"
                        centered
                        style={{ marginBottom: "30px !important" }}
                      >
                        <TabPane tab="Details" key="2">
                          <div className="deal-terms-section">
                            <div
                              className="container"
                              style={{ marginTop: "1px !important" }}
                            >
                              <div className="row">
                                <div className="col-lg-10 m-auto">
                                  <h1
                                    style={{
                                      paddingBottom: "-30px !important",
                                      marginTop: "30px",
                                    }}
                                  >
                                    Deal Terms
                                  </h1>
                                  <div
                                    className=""
                                    style={{ marginTop: "0px !important" }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="info">
                                            <span>End Date</span>
                                            <h4
                                              style={{
                                                textTransform: "Capitalize",
                                              }}
                                            >
                                              {this.state.deal_regular_end_date
                                                ? moment(
                                                    this.state
                                                      .deal_regular_end_date
                                                  ).format("MMM DD, YYYY")
                                                : ""}
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span> Min Investment</span>
                                            <h4>
                                              ₹{" "}
                                              {this.formatNumberWithCommas(
                                                this.state.minamount
                                              )}{" "}
                                              for {this.state.deal_service}
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Valuation</span>
                                            <h4>{staticDealData.valuation}</h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <h1
                                    style={{
                                      paddingBottom: "0px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    Company Details
                                  </h1>
                                  <section
                                    className="deal-about-artment-section"
                                    style={{ marginTop: "50px" }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="info">
                                            <span>Legal Name</span>
                                            <h4>
                                                {staticDealData.legalName}
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Founded</span>
                                            <h4>{staticDealData.foundedDate}</h4>
                                          </div>
                                          <div className="info">
                                            <span>Status</span>
                                            <h4>{staticDealData.status}</h4>
                                          </div>
                                          <div className="info">
                                            <span>Employees</span>
                                            <h4>{staticDealData.employees}</h4>
                                          </div>
                                          <div className="info">
                                            <span>Website</span>
                                            <h4>
                                              <a
                                                style={{
                                                  color: "rgb(7, 211, 252)",
                                                }}
                                                href={staticDealData.websiteHref}
                                                target="_blank"
                                              >
                                                {staticDealData.websiteName}
                                              </a>
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Social Links</span>
                                            <div className="social-icons">
                                              <a href={staticDealData.facebookUrl}>
                                                <i className="bx bxl-facebook fs-19"></i>
                                              </a>
                                              <a href={staticDealData.linkedinUrl}>
                                                <i className="bx bxl-linkedin fs-19"></i>
                                              </a>
                                              <a href={staticDealData.instaUrl}>
                                                <i className="bx bxl-instagram fs-19"></i>
                                              </a>

                                              <a href={staticDealData.youtubeUrlForCompany}>
                                                <i className="bx bxl-youtube fs-19"></i>
                                              </a>
                                            </div>
                                          </div>
                                          <div className="info">
                                            <span>Address</span>
                                            <h4>
                                                {staticDealData.addressOfCompany}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                            {/* Investor Presentation */}
                          </div>
                          {/* start */}

                          <div
                            className="deals-page"
                            style={{
                              marginTop: "50px !important",
                            }}
                          >
                            <div className="deal-terms-section">
                              <div
                                className="container"
                                style={{ marginTop: "1px !important" }}
                              >
                                <div className="row">
                                  <div className="col-lg-10 m-auto">
                                    <h1>Documents</h1>
                                    <div className="row document-section">
                                      <div className="col-lg-2"></div>
                                      <div className="col-lg-8">
                                        <div
                                          className="download-section"
                                          style={{
                                            backgroundColor: "white",
                                            padding: "4rem 19px",
                                          }}
                                        >
                                          <>
                                            <div>
                                              <table
                                                className="download-document-table"
                                                style={{ width: "100%" }}
                                              >
                                                <tr
                                                  style={{
                                                    background: "#29176f",
                                                    color: "#fff",
                                                  }}
                                                >
                                                  <th>Sr no</th>
                                                  <th>Document</th>
                                                  <th>Type</th>
                                                  <th>Download</th>
                                                </tr>
                                                {this.state.documents.length >
                                                  0 &&
                                                  this.state.documents.map(
                                                    (item, index) => {
                                                      // console.log(
                                                      //   this.state.documents
                                                      //     .length
                                                      // );
                                                      let documentlink = `${process.env.REACT_APP_BASE_URL}api/uploads/docs/${item.documentid}/${item.document}`;
                                                      return (
                                                        <tr
                                                          key={index}
                                                          style={{ height: 70 }}
                                                        >
                                                          <td
                                                            style={{
                                                              width: 40,
                                                            }}
                                                          >
                                                            {index + 1}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: 140,
                                                            }}
                                                          >
                                                            {item.docname}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: 40,
                                                            }}
                                                          >
                                                            {item.paid == "Paid"
                                                              ? this.state
                                                                  .check_membership_type ==
                                                                "premium"
                                                                ? item.premium_price ==
                                                                  "0"
                                                                  ? "Free"
                                                                  : "₹" +
                                                                    item.premium_price
                                                                : item.regular_price ==
                                                                  "0"
                                                                ? "Free"
                                                                : "₹" +
                                                                  item.regular_price
                                                              : "Free"}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: 50,
                                                            }}
                                                          >
                                                            {this.state
                                                              .investor_id && (
                                                              <center>
                                                                {(item.user_paid ==
                                                                  true ||
                                                                  item.paid ==
                                                                    "Free") && (
                                                                  <a
                                                                    href={
                                                                      documentlink
                                                                    }
                                                                    target="_blank"
                                                                    style={{
                                                                      width: 80,
                                                                    }}
                                                                  >
                                                                    <img
                                                                      src="./download.ico"
                                                                      style={{
                                                                        maxWidth: 50,
                                                                      }}
                                                                    />
                                                                  </a>
                                                                )}
                                                                {item.paid ==
                                                                  "Paid" &&
                                                                  this.state
                                                                    .check_membership_type ==
                                                                    "premium" &&
                                                                  (item.premium_price ==
                                                                  "0" ? (
                                                                    <a
                                                                      href={
                                                                        documentlink
                                                                      }
                                                                      target="_blank"
                                                                      style={{
                                                                        width: 80,
                                                                      }}
                                                                    >
                                                                      <img
                                                                        src="./download.ico"
                                                                        style={{
                                                                          maxWidth: 50,
                                                                        }}
                                                                      />
                                                                    </a>
                                                                  ) : (
                                                                    ""
                                                                  ))}
                                                              </center>
                                                            )}
                                                          </td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}
                                              </table>
                                            </div>
                                          </>
                                          {this.state.button_status ==
                                            false && (
                                            <button
                                              className="download-button"
                                              onClick={() => this.documentPay()}
                                            >
                                              Pay
                                            </button>
                                          )}
                                          {!this.state.investor_id && (
                                            <>
                                              <button
                                                className="download-button"
                                                style={{
                                                  background: "rgb(41 23 111)",
                                                }}
                                                onClick={() =>
                                                  window.location.assign(
                                                    "/login"
                                                  )
                                                }
                                              >
                                                Login to View
                                              </button>
                                              {/* <em
                                            style={{
                                              fontSize: 14,
                                              fontWeight: "700",
                                            }}
                                          >
                                            Become Growth91
                                            <sup style={{ fontSize: "0.6rem" }}>
                                              TM
                                            </sup>{" "}
                                            member to access the document{" "}
                                          </em> */}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-lg-2"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-wrapper">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <Tabs defaultActiveKey="1" centered>
                                      <TabPane tab="FAQ" key="1">
                                        <section
                                          className="faq-section"
                                          style={{
                                            margin: "0px",
                                            padding: "0px",
                                            background: "none",
                                          }}
                                        >
                                          <div className="">
                                            <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 m-auto">
                                                <h1 className="text-center mb-4">
                                                  {staticDealData.aboutTitle}
                                                </h1>
                                                <Collapse
                                                  expandIconPosition="left"
                                                  accordion
                                                >
                                                  <Panel
                                                    header={staticDealData.aboutHeader1}
                                                    key="1"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                          textAlign: "justify",
                                                        }}
                                                      >
                                                        {staticDealData.aboutDetail1}
                                                      </p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header={staticDealData.aboutHeader2}
                                                    key="2"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                          textAlign: "justify",
                                                        }}
                                                      >
                                                        {staticDealData.aboutDetail2}
                                                      </p>
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header={staticDealData.aboutHeader3}
                                                    key="7"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                          textAlign: "justify",
                                                        }}
                                                      >
                                                        {staticDealData.aboutDetail3}
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                          textAlign: "justify",
                                                          marginTop: "10px",
                                                        }}
                                                      ></p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header={staticDealData.aboutHeader4}
                                                    key="4"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                          textAlign: "justify",
                                                        }}
                                                      >
                                                        {staticDealData.aboutDetail4}
                                                      </p>{" "}
                                                    </div>
                                                  </Panel>
                                                </Collapse>
                                                <h1 className="text-center mb-2 mt-4">
                                                  Growth91 Investment FAQ
                                                </h1>
                                                <Collapse
                                                  expandIconPosition="left"
                                                  accordion
                                                >
                                                  <Panel
                                                    header="What is the due diligence process followed by Growth91"
                                                    key="11"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      At Growth91, we follow
                                                      stringent due-diligence
                                                      process. We ask for
                                                      detailed information about
                                                      start-up and their team.
                                                      After the scrutiny and if
                                                      deemed fit, start-up would
                                                      be listed on Growth91
                                                      platform. Independent
                                                      investment opinion and
                                                      due-diligence report
                                                      prepared by external
                                                      qualified experts are made
                                                      available for investors.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="Do you offer any guarantee on returns?"
                                                    key="12"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      No, we do not guarantee
                                                      any returns. The startup
                                                      which is raising the money
                                                      is also not guaranteeing
                                                      any specific returns. In
                                                      principle, it is not
                                                      legally correct for the
                                                      company to provide any
                                                      guarantee about returns on
                                                      equity linked securities.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What is the refund process in case I don’t receive any allocation?"
                                                    key="13"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      If an investor doesn’t
                                                      receive the allocation,
                                                      the investment amount will
                                                      be refunded to the bank
                                                      account from which the
                                                      investment has been made.
                                                      As per Growth91 policy,
                                                      there will be no interest
                                                      or compensation on these
                                                      returned funds.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What is the exit mechanism available for the investors"
                                                    key="14"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      The Company and the
                                                      Promoters shall make all
                                                      reasonable endeavours to
                                                      provide exit to the
                                                      Investors by any of the
                                                      following ways: 1. Initial
                                                      Public Offer (IPO) 2.
                                                      Merger or Acquisition
                                                      Event 3. Buyout Event 3.
                                                      Compulsory Call Option
                                                      with minimum assured
                                                      returns. (Please refer to
                                                      investor agreement for
                                                      more details)
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="In which account Investor’s money are transferred"
                                                    key="15"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      After all the required
                                                      fund raising formalities
                                                      are completed by the
                                                      Startup, we advise
                                                      investors to directly
                                                      transfer funds to the
                                                      account of respective
                                                      Startup, dedicated for
                                                      receiving Securities
                                                      Application Money
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="I have more questions; how do I contact Growth91?"
                                                    key="16"
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      You can always send your
                                                      queries to{" "}
                                                      <a href="mailto:contact@growth91.com">
                                                        contact@growth91.com
                                                      </a>
                                                      , we will respond to your
                                                      queries in shortest
                                                      possible time.
                                                    </div>
                                                  </Panel>
                                                </Collapse>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                      </TabPane>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* stop */}
                        </TabPane>
                        <TabPane tab="Team" key="3">
                          <div
                            className="container meet-the-team-section"
                            style={{ maxWidth: 921 }}
                          >
                            <h2 className="text-center">Meet the Team</h2>
                            <div className="row elefantteam">
                                {
                                    staticDealData.teamMembers.map((member) => {
                                        return (
                                            <div className="col-lg-6">
                                <div
                                  className="single"
                                  style={{ paddingBottom: "0px !important" }}
                                  // style={{  marginBottom: 0px !important}}
                                >
                                  <div className="d-flex">
                                    <img
                                      src={member.image}
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>{member.name}</h3>
                                      <span>{member.position}</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href={member.linkedinUrl}
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <ul>
                                    {
                                        member.description.map((desc) => {
                                            return (
                                                <li>
                                                  <a>{desc}</a>
                                                </li>
                                            )
                                        })
                                    }
                                  </ul>
                                </div>
                              </div>

                                        )
                                    })

                                }
                            </div>
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NewWebFooter />
          </div>
        ) : (
          window.location.assign("/Deals")
        )}
      </>
    );
  }
}

export default EleFant2;
