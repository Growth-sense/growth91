
import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { Select, Tabs, message, Spin  } from 'antd';
import { ExclamationCircleOutlined,CheckCircleFilled } from '@ant-design/icons'; 
import Bridge from './constants/Bridge';
import Apis from './constants/Apis';

const { Option } = Select;
const { TabPane } = Tabs;

class ClosedDeals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      sort_by:'',
      searchInput:'',
      deals:[],
      cdeals:[],
      loading:false,
    }
  }

  handleChangeSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.getDeals();
  }

  // get deal list
  getDeals = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          cdeals: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  }

  openpage = (item) => {
    localStorage.setItem('deal_id', item.deal_id);
    window.open('/iSkillBox','_self');
  }


  searchdeals = () => {
    let deals = this.state.cdeals;
    let searchInput = this.state.searchInput;
    if(searchInput){
      this.setState({ loading:false });
      deals = deals.filter((deal)=>{
        return deal.deal_name.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    this.setState({
      deals: deals,
      loading: false,
    });
  }

  render() {
    return (
      <div className='deals-page'>
        <Header />
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='main-header-section'>
                  <h1>Completed Deals</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row align-items-center"
            style={{
              marginBottom: 30,
              marginTop: 60,
            }}>
              {/* <div className="col-lg-9">
                <div className="search-container">
                  <input 
                    type="text" 
                    placeholder="Search.." 
                    name="searchInput"
                    onChange={this.handleChange}
                  />
                  <button onClick={this.searchdeals}>
                    <i className='bx bx-search'></i>
                  </button>
                </div>
              </div> */}
              {/* <div className="col-lg-3">
                <Select 
                  defaultValue={this.state.sort_by} 
                  style={{ width: '100%' }} 
                  onChange={this.handleChangeSortBy}
                >
                  <Option value="">Sort By</Option>
                  <Option value="Popularity">Popularity</Option>
                  <Option value="Newest">Newest</Option>
                  <Option value="Min-low-to-high">Min. Investment - High to Low</Option>
                  <Option value="Min-high-to-low">Min. Investment - Low to High</Option>
                </Select>
              </div> */}
            </div>
          </div>
        </div>
        {this.state.deals.length>0 && (
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='main-header-section'>
                {/* <hr style={{height:"5px",backgroundColor:"black"}}/> */}
                  <h1 style={{marginBottom:'30px'}}>Completed Deals</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        <Spin spinning={this.state.loading}>
          <div className='tab-wrapper'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='row'>

                  {this.state.deals && this.state.deals.map((item, index) => {
                    let logourl = Apis.IMAGEURL+'deal/logo/'+item.deal_id+'/'+item.logo;
                    let bannerurl = Apis.IMAGEURL+'deal/banner/'+item.deal_id+'/'+item.banner_img;
                    
                    let categories = JSON.parse(item.deal_category);
                    if(item.deal_status=='Closed'){
                    return (
                      <div className='col-lg-4' key={index}>
                        <a 
                          href='#'
                          onClick={() => this.openpage(item)}
                        >
                          <div className='deal-item'>

                            <div className='d-flex tag-list'>
                              {item.deal_status=='Private' && (
                                <div className='private-tag'>
                                  <span style={{ fontSize:12 }}>Private</span> &nbsp;&nbsp;
                                  <ExclamationCircleOutlined style={{
                                    marginTop: -2,
                                  }}/>
                                </div>
                              )}
                              {/* <div className='new-tag'>
                                <span style={{ fontSize:12 }}>New</span>
                              </div>
                              <div className='funded-tag'>
                                <CheckCircleFilled style={{
                                  position: 'relative',
                                  top: -2,
                                }}/> &nbsp;&nbsp;
                                <span style={{ fontSize:12 }}>Funded</span>
                              </div>      */}
                            </div>
                            <div className='deal-item-img'>
                              <img src={bannerurl}
                              className='deal-cover-img'
                              alt='deal-img' />
                            </div>
                            <div className='deal-item-info'>
                              <div className='row align-items-center'>
                                <div className='col-lg-8'>
                                  <div className='d-flex inner align-items-center'>
                                      <img src={logourl} alt='deal-img' className='deal-logo' />
                                      <h6>{item.deal_name}</h6>
                                  </div>
                                </div>
                                <div className='col-lg-4'>
                                  <div className='hero-tag'
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    fontSize:11,
                                  }}      >
                                    CSOP  <ExclamationCircleOutlined />
                                  </div>
                                </div>
                              </div>
                              <p>
                                  {item.Muliples_of.length > 100 ? item.Muliples_of.substring(0, 100) + '...' : item.Muliples_of}
                              </p>
                                <div className='d-flex raised-txt justify-content-between'>
                                  <div>Percente Raised <br/><p className='per'>108.54.90%</p></div>
                                  <div>Closes in <br/><p className='per'>8 Days</p></div>
                                </div>
                              <div className='d-flex tags'>
                                {categories.length > 0 && categories.map((cat, index) => {
                                  return(
                                    <div className='hero-tag' key={index}>{cat}</div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                    }
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Spin>

        <Footer />
      </div>
    )
  }
}

export default ClosedDeals;
