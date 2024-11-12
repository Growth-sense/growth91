import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "react-moment";

export const Homeblog = () => {
  const [blog, setBlog] = useState();
  const [blog1, setBlog1] = useState();
  const [blog2, setBlog2] = useState();
  const [blogimg, setBlogimg] = useState();
  const [blogimg1, setBlogimg1] = useState();
  const [blogimg2, setBlogimg2] = useState();
const [loading, setLoading] = useState()
  const blogs = async () => {
    setLoading(true)
    const data = await axios.get("https://growth91.com/blog/wp-json/wp/v2/posts");
    setBlog(data.data[0]);
    setBlog1(data.data[1]);
    setBlog2(data.data[2]);
    setLoading(false)

  };
  useEffect(() => {
    blogs();
  }, []);
  useEffect(() => {
    callimg();
    callimg1();
    callimg2();
  }, [blog]);

  const callimg = async () => {
    if(blog){

      const data = await axios( blog._links["wp:featuredmedia"][0].href);
      setBlogimg(data.data.source_url);
    }
  };
  const callimg1 = async () => {
    if(blog){
    const data = await axios(blog1._links["wp:featuredmedia"][0].href);
    setBlogimg1(data.data.source_url);}
  };
  const callimg2 = async () => {
    if(blog){
    const data = await axios(blog2._links["wp:featuredmedia"][0].href);
    setBlogimg2(data.data.source_url);}
  };
  return (
    <>
      {blog && blog1 ? (
        <section class="business-crowd">
          <div class="container">
            <div class="row">
              <div class="heading-title founder-text">
                <p>
                  <span></span>{" "}
                </p>
                <h2> Latest News and Trends in Indian Startup Investments</h2>
                <p> Stay informed about the latest news, trends, and insights on investing in Indian startups through our expert-curated blog.
                </p>
              </div>
            </div>

            <div class="row blog-rows">
              <div class="col-lg-4 col-md-6 col-sm-6 blog-columns">
                <div
                  class="single-following-post aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <a href={blog.link} class="following-post-thum">
                    <img src={blog && blogimg} alt="" />
                  </a>
                  <div class="following-post-content">
                    <div class="following-blog-post-top">
                      <div class="trending-blog-post-category">
                        <a href={blog.link} class="business">
                          Investment Guide
                        </a>
                      </div>
                      <div class="following-blog-post-author">
                        By <a href={blog.link}>Admin</a>
                      </div>
                    </div>
                    <h5 class="following-blog-post-title">
                      <a href={blog.link}>{blog && blog.title.rendered}</a>
                    </h5>
                    <div class="following-blog-post-meta">
                      <div class="post-meta-left-side">
                        <span class="post-date">
                          <i class="fa-regular fa-calendar"></i>
                          <a href={blog.link}>
                            {blog && (
                              <Moment date={blog.date} format="MMM Do YY" />
                            )}
                          </a>
                        </span>
                        {/* <span>10 min read</span> */}
                      </div>
                      {/* <div class="post-meta-right-side">
                    <a href={blog.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/small-bookmark.png"
                        alt=""
                      />
                    </a>
                    <a href={blog.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/heart.png"
                        alt=""
                      />
                    </a>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6 blog-columns">
                <div
                  class="single-following-post aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <a href={blog1.link} class="following-post-thum">
                    <img src={blog && blogimg1} alt="" />
                  </a>
                  <div class="following-post-content">
                    <div class="following-blog-post-top">
                      <div class="trending-blog-post-category">
                        <a href={blog1.link} class="business">
                          Investment Guide
                        </a>
                      </div>
                      <div class="following-blog-post-author">
                        By <a href={blog1.link}>Admin</a>
                      </div>
                    </div>
                    <h5 class="following-blog-post-title">
                      <a href={blog1.link}> {blog && blog1.title.rendered}</a>
                    </h5>
                    <div class="following-blog-post-meta">
                      <div class="post-meta-left-side">
                        <span class="post-date">
                          <i class="fa-regular fa-calendar"></i>
                          <a href={blog1.link}>
                            {blog && (
                              <Moment date={blog1.date} format="MMM Do YY" />
                            )}
                          </a>
                        </span>
                        {/* <span>2 Comments</span> */}
                      </div>
                      {/* <div class="post-meta-right-side">
                    <a href={blog1.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/small-bookmark.png"
                        alt=""
                      />
                    </a>
                    <a href={blog1.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/heart.png"
                        alt=""
                      />
                    </a>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6 blog-columns">
                <div
                  class="single-following-post aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <a href={blog2.link} class="following-post-thum">
                    <img src={blog && blogimg2} alt="" />
                  </a>
                  <div class="following-post-content">
                    <div class="following-blog-post-top">
                      <div class="trending-blog-post-category">
                        <a href={blog2.link} class="business">
                          Investment Guide
                        </a>
                      </div>
                      <div class="following-blog-post-author">
                        By <a href={blog2.link}>Admin</a>
                      </div>
                    </div>
                    <h5 class="following-blog-post-title">
                      <a href={blog2.link}> {blog && blog2.title.rendered}</a>
                    </h5>
                    <div class="following-blog-post-meta">
                      <div class="post-meta-left-side">
                        <span class="post-date">
                          <i class="fa-regular fa-calendar"></i>
                          <a href={blog2.link}>
                            {blog && (
                              <Moment date={blog2.date} format="MMM Do YY" />
                            )}
                          </a>
                        </span>
                        {/* <span>7 Comments</span> */}
                      </div>
                      {/* <div class="post-meta-right-side">
                    <a href={blog2.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/small-bookmark.png"
                        alt=""
                      />
                    </a>
                    <a href={blog2.link}>
                      <img
                        src="https://htmldemo.net/bunzo/bunzo/assets/images/icons/heart.png"
                        alt=""
                      />
                    </a>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <button ><a  rel="noreferrer" href="https://growth91.com/blog/"style={{color:"white"}}> View All Blogs</a></button>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};
