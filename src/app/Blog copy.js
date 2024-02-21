import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import Slider from "react-slick";
import Bridge from './constants/Bridge';
import URLs from './constants/Apis';
import moment from 'moment';
import { Spin } from 'antd';


class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
    }
  }    

  

  componentDidMount() {
    this.getpostlist();
  }

  getpostlist() {
    this.setState({
      loading: true,
    });
    Bridge.blog.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          posts: result.data,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        })
      }
    });
  }

  openpage = (item) => {
    localStorage.setItem('blog_id', item.id);
    window.open('/details','_blank');
  }
  
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplaySpeed:3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay:true,
    };

    const setting2 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      autoplay:true,
      autoplaySpeed:3000,
    };
  
    
    return (
      <div className='blog-page'> 
        <WebHeader />

        <Spin spinning={this.state.loading}>
        
          {/* Start blog main carousel  */}
          <div className='blog-main-carousel'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 m-auto'>
                  <Slider {...settings}>
                    {this.state.posts.map((post, index) => {
                      if(index < 5) {
                      let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                      return (
                        
                        <div className="item">
                          <a href="#" onClick={() => this.openpage(post)}>
                            <div
                            className='inner' 
                            style={{ 
                              backgroundImage: `linear-gradient(0deg, rgb(0 0 0 / 47%), rgb(0 0 0 / 30%)), url("${url}")`
                            }}>
                              <div className='content'>
                                <h1>{post.title}</h1>
                                <p>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      )
                      }
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          {/* End blog main carousel  */}

          {/* Start blog slider list  */}
          <div class="container blog-slider-list">
            <div class="row">
                <div class="col-lg-12">
                    <h4>What's brewing in the Startup Space?</h4>
                    <br/>
                    <Slider {...setting2}>
                    {this.state.posts.map((post, index) => {
                      let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                      if(index < 10 && post.type=='Startup') {
                        return (
                          <div className="item" key={index}>
                            <a href="#" onClick={() => this.openpage(post)}>
                              <div className='inner'>
                                <img src={url} />
                                <div className='content'>
                                  <h1 className='text-center'>{post.title}</h1>
                                  <p className='text-center'>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        )}
                      }
                    )}
                  </Slider>
                </div>
            </div>
        </div>

          {/* End blog slider list */}

          {/* Start blog slider list  */}
          <div class="container blog-slider-list">
            <div class="row">
                <div class="col-lg-12">
                    <h4>IPOs and the Stock Market</h4>
                    <br/>
                    <Slider {...setting2}>
                    {this.state.posts.map((post, index) => {
                      let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                      if(index < 10) {
                      return (
                        <div className="item" key={index}>
                          <a href="#" onClick={() => this.openpage(post)}>
                            <div className='inner'>
                              <img src={url} />
                              <div className='content'>
                                <h1 className='text-center'>{post.title}</h1>
                                <p className='text-center'>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      )
                      }
                    })}
                  </Slider>
                </div>
            </div>
        </div>

        {/* Start blog slider list  */}
        <div class="container blog-slider-list">
            <div class="row">
                <div class="col-lg-12">
                    <h4>Growth91's Knowledge Base</h4>
                    <br/>
                    <Slider {...setting2}>
                    {this.state.posts.map((post, index) => {
                      let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                      if(index < 10 && post.type=='Growth91') {
                        return (
                          <div className="item" key={index}>
                            <a href="#" onClick={() => this.openpage(post)}>
                              <div className='inner'>
                                <img src={url} />
                                <div className='content'>
                                  <h1 className='text-center'>{post.title}</h1>
                                  <p className='text-center'>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        )
                      }
                    })}
                  </Slider>
                </div>
            </div>
        </div>
        </Spin>

        <WebFooter />
      </div>
    )
  }
}

export default Blog;
