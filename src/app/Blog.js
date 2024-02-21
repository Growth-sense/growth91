import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import Bridge from './constants/Bridge';
import URLs from './constants/Apis';
import moment from 'moment';
import { Spin } from 'antd';
import SearchInput from './common/SearchInput';

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      Growth91count:0,
      startupcount:0,
      loading:false,
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
        
        let Growth91count=0;
        let startupcount=0;
        
        for(let item of result.data) {
          if(item.type=='Growth91') {
            Growth91count++;
          }
          if(item.type=='Startup') {
            startupcount++;
          }
        }

        this.setState({
          posts: result.data,
          loading: false,
          Growth91count:Growth91count,
          startupcount:startupcount,
          loading:false,
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
    
    return (
      <div className='blog-page'> 
        <WebHeader />

        <div className="page-title-area overlay-bg style-1" style={{ marginTop:112 }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <h3 className="title text-white" >Blog</h3>
                    </div>
                    <div className="col-md-12 text-center align-self-center">
                         <ul className="breadcrumb">
                            <li className="breadcrumb-list"><a href="https://www.wowtheme7.com/" title="Home ">Home </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <section className="blog-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <Spin spinning={this.state.loading}>
                          <div className="left-side">
                          {this.state.posts.map((post, index) => {
                            let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                            let description = post.description.len
                            if(index < 10) {
                              return(
                              <div className="card">
                                <div className="images">
                                  <img src={url} alt="img" className='w-100' />
                                </div>
                                <div className="card-body">
                                  <a href="#" onClick={() => this.openpage(post)} className="title">
                                    {post.title}
                                  </a>
                                  <ul>
                                      {/* <li><a href="#"><span><i className="fa fa-user"></i></span>By MoneyPro</a></li> */}
                                      <li><a href="#"><span><i className="far fa-clock"></i></span>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</a></li>
                                  </ul>
                                  {/* <p>{parse(post.description)}</p> */}
                                  <a href="#" onClick={() => this.openpage(post)} className="more_btn">Read More <span><i className="fa fa-long-arrow-right"></i></span></a>
                                </div>
                              </div>
                              )
                            }
                          })}

                              {/* <div className="MoneyPro-pagination text-center">
                                  <nav className="navigation pagination" role="navigation" aria-label=" ">
                                      <h2 className="screen-reader-text"> </h2>
                                      <div className="nav-links">
                                          <ul className="page-numbers">
                                              <li><span aria-current="page" className="page-numbers current">1</span></li>
                                              <li><a className="page-numbers" href="https://www.wowtheme7.com/blog/page/2/">2</a></li>
                                              <li><a className="page-numbers" href="https://www.wowtheme7.com/blog/page/3/">3</a></li>
                                              <li><a className="next page-numbers" href="https://www.wowtheme7.com/blog/page/2/"><i className="fa fa-long-arrow-right"></i></a></li>
                                          </ul>
                                      </div>
                                  </nav>								
                              </div> */}

                          </div>
                        </Spin>
                    </div>
                    <div className="col-lg-4">
                        <div className="right-side">
                            <div id="search-2" className="widget blog-sidebar widget-2 widget_search">
                              <SearchInput />
                            </div>
                            {/* <div className=" about-me popular-posts">
                                <h3>Popular Posts</h3>
                                <div className="media">
                                    <div className="images">
                                        <a href="#"><img src="./web/images/thumb.png" alt="img"/></a>
                                    </div>
                                    <div className="media-body">
                                        <a href="blog-details.html">Investors invest their funds in such assets that</a>
                                        <p>February 17, 2021</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="images">
                                        <a href="#"><img src="./web/images/thumb1.png" alt="img"/></a>
                                    </div>
                                    <div className="media-body">
                                        <a href="blog-details.html">The investor should invest only in such assets</a>
                                        <p>May 19, 2020</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="images">
                                        <a href="#"><img src="./web/images/thumb2.png" alt="img"/></a>
                                    </div>
                                    <div className="media-body">
                                        <a href="blog-details.html">How To Reinvestment Earn Money</a>
                                        <p>May 23, 2020</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="images">
                                        <a href="#"><img src="./web/images/thumb3.png" alt="img"/></a>
                                    </div>
                                    <div className="media-body">
                                        <a href="blog-details.html">Investment is the employ funds with the objective</a>
                                        <p>May 06, 2020</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="about-me categories">
                              <h3>Categories</h3>
                              <ul>
                                <li className="cat-item cat-item-2">
                                  <a href="/blog-category?name=Growth91">
                                    Growth 91
                                  </a> ({this.state.Growth91count})
                                </li>
                                <li className="cat-item cat-item-3">
                                  <a href="/blog-category?name=Startup">Startup</a>
                                  ({this.state.startupcount})
                                </li>
                              </ul>
                            </div>
                            {/* <div className="about-me tags">
                                <h3>Categories</h3>
                                <ul>
                                    <li><a href="#">Advisor</a></li>
                                    <li><a href="#">Branding</a></li>
                                    <li><a href="#">Cash</a></li>
                                    <li><a href="#">Marketing Tips</a></li>
                                    <li><a href="#">Investment</a></li>
                                    <li><a href="#">Popularity</a></li>
                                    <li><a href="#">Security Ensure</a></li>
                                    <li><a href="#">Tolerance</a></li>
                                    <li><a href="#">Vulnerability</a></li>
                                </ul>
                            </div> */}
                            {/* <div className="about-me banner">
                                <h3>Categories</h3>
                                <div className="banner-images">
                                    <a href="#"><img src="./web/images/banner.jpg" alt="img"/></a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <WebFooter />
      </div>
    )
  }
}

export default Blog;
