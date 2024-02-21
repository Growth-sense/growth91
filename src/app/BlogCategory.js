import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Bridge from './constants/Bridge';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import URLs from './constants/Apis';
import moment from 'moment';
import { Spin } from 'antd';
import SearchInput from './common/SearchInput';

const BlogCategory = () => {

  const search = useLocation().search;
  const name=new URLSearchParams(search).get("name");

  const [posts, setPosts] = useState([]);
  const [Growth91count, setGrowth91count] = useState(0);
  const [startupcount, setStartupcount] = useState(0);
  const [postLoader, setPostLoader] = useState(false);
  

  useEffect(()=> {
    if(name.length == 0) {
      window.location.assign('/Blog');
    }
    setTimeout(() => {
      getpostlist();
    },1000);
    
  },[0]);

  const getpostlist = () => {
    setPostLoader(true);
    Bridge.blog.list().then(function(result) {
      if (result.status == 1) {
        
        let Growth91count=0;
        let startupcount=0;
        let listByCategory = [];
        for(let item of result.data) {
          if(item.type=='Growth91') {
            Growth91count++;
          }
          if(item.type=='Startup') {
            startupcount++;
          }
          if(item.type == name) {
            listByCategory = [...listByCategory, item];
          }

        }
        setPosts(listByCategory);
        setPostLoader(false);
        setGrowth91count(Growth91count);
        setStartupcount(startupcount);
        
      } else {
        setPostLoader(false);
      }
    });
  }

  const openpage = (item) => {
    localStorage.setItem('blog_id', item.id);
    window.open('/details','_blank');
  }

  return (
    <div className='blog-page'> 
        <WebHeader />

        <section className="blog-section" style={{ marginTop:164 }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <Spin spinning={postLoader}>
                          <div className="left-side">
                            {posts.map((post, index) => {
                              let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                              let description = post.description;
                              if(index < 10) {
                                return(
                                <div className="card" key={index}>
                                  <div className="images">
                                    <img src={url} alt="img" className='w-100' />
                                  </div>
                                  <div className="card-body">
                                    <a href="#" onClick={() => openpage(post)} className="title">
                                      {post.title}
                                    </a>
                                    <ul>
                                        <li><a href="#"><span><i className="far fa-clock"></i></span>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</a></li>
                                    </ul>
                                    <a href="#" onClick={() => openpage(post)} className="more_btn">Read More <span><i className="fa fa-long-arrow-right"></i></span></a>
                                  </div>
                                </div>
                                )
                              }
                            })}

                            {posts.length == 0 && (
                              <p style={{ fontSize:20 }}>Post is not available.</p>
                            )}
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
                                  </a> ({Growth91count})
                                </li>
                                <li className="cat-item cat-item-3">
                                  <a href="/blog-category?name=Startup">Startup</a>
                                  ({startupcount})
                                </li>
                              </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <WebFooter />
      </div>
  )
  
}

export default BlogCategory;