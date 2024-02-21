import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import Bridge from './constants/Bridge';
import URLs from './constants/Apis';
import moment from 'moment';
import{ Spin, message } from 'antd';
import parse from 'html-react-parser';
import SearchInput from './common/SearchInput';


class BlogDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      commentlist: [],
      loading: false,
      description: '',
      title:'',
      createddate:'',
      image:'',
      blog_id:'',
      formloader:false,
      type:'',

      comment: '',
      name:'',
      email:'',
      website:'',
      investor_id:'',
      investor_email:'',
      investor_name:'',
      Growth91count:0,
      startupcount:0,
      tags:[],
    }
  }

  componentDidMount() {
    let id = localStorage.getItem('blog_id');
    this.setState({
      blog_id:id,
    },() => {
      this.getpostlist();
      this.getcommentlist();
    });

    this.getinvestordetails();
  }

  getinvestordetails = () => {
    if(localStorage.getItem('investor_id')) {
      let params = {
        investor_id: localStorage.getItem('investor_id')
      }
      Bridge.investor.getinvestordetails(params).then((result) => {
        if (result.status == 1) {

          this.setState({
            loading: false,
            investor_id: localStorage.getItem('investor_id'),
            email: result.data[0].email,
            name: result.data[0].first_name+' '+result.data[0].last_name,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    }
  }

  openpage = (item) => {
    localStorage.setItem('blog_id', item.id);
    window.open('/details');
  }

  getcommentlist = () => {
    this.setState({
      loading: true,
    });
    let params = {
      id: this.state.blog_id
    }
    Bridge.blog.commentlist(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          loading: false,
          commentlist: result.data,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  getpostlist = () => {
    this.setState({
      loading: true,
    });
    Bridge.blog.list().then((result) => {
      if (result.status == 1) {
        let id = localStorage.getItem('blog_id');
        for(let item of result.data) {
          if(item.id == id) {
            let url = URLs.IMAGEURL +'/blog/'+ item.id+'/'+item.filename;
            this.setState({
              description: item.description,
              title: item.title,
              createddate:item.created_at,
              image: url,
              loading: false,
              blog_id: item.id,
              type:item.type,
              tags: JSON.parse(item.tags),
            });
          }
          this.setState({
            posts: result.data,
          });
        }
        this.setState({
          posts: result.data,
          loading: false,
        });

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
          Growth91count:Growth91count,
          startupcount:startupcount,
        });
        
      }
    });
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  postcomment = () => {
    if(this.state.comment == '') {
      message.warning('Please enter comment');
      return;
    } else if(this.state.name == '') {
      message.warning('Please enter name');
      return;
    } else if(this.state.email == '') {
      message.warning('Please enter email');
      return;
    } 
    this.setState({
      loading:true,
    });
    let paras = {
      id: this.state.blog_id,
      comment: this.state.comment,
      name: this.state.name,
      email: this.state.email,
      website: this.state.website,
    }
    Bridge.blog.comment(paras).then((result) => {
      if (result.status == 1) {
        message.success("Thanks for comment and give your precious time.");
        this.setState({
          loading:false,
          comment: '',
          name:'',
          email:'',
          website:'',
        },() => this.getcommentlist());
        window.location.reload();
      } else {
        message.warning(result.message);
        this.setState({
          loading:false,
        });
      }
    });
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
      <div className='blog-details-page'> 
        <WebHeader />

        <Spin spinning={this.state.loading}>

          <div className="page-title-area overlay-bg style-1" 
          style={{ "backgroundImage": "url(www.wowtheme7.com/wp-content/uploads/2021/03/breadcum.html)",backgroundColor:"#5e35b1" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <h3 className="title text-white">Blog Details</h3>
                    </div>
                    <div className="col-md-12 text-center align-self-center">
                         <ul className="breadcrumb">
                            <li className="breadcrumb-list"><a href="/" title="Home ">Home </a></li>
                            <li className="breadcrumb-list"><a href="#">{this.state.type}</a></li> 
                            <li className="breadcrumb-list"><a href="#">{this.state.title}</a></li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <section className="blog-section blog-details-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="left-side">
                            <div className="card">
                                <div className="images">
                                    <img 
                                      src={this.state.image} 
                                      alt="img"
                                      style={{ width:'100%' }}
                                    />
                                    <div className="bottom_text">
                                        <h5>{this.state.createddate && moment(this.state.createddate).format('DD')} <span>{this.state.createddate && moment(this.state.createddate).format('MMM')}</span></h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        <li><a href="#"><span><i className="far fa-clock"></i></span>{this.state.createddate && moment(this.state.createddate).format('MMMM DD, YYYY')}</a></li>
                                    </ul>
                                    <p>
                                      {parse(this.state.description)}
                                    </p>
                                    {this.state.tags.length > 0 && (
                                      <ul className="tags_one">
                                          <li><span>Tags :</span></li>
                                          {this.state.tags && this.state.tags.map((item,index) => {
                                            return (
                                              <li key={index}>
                                                <a>{item}</a>
                                              </li>
                                            )
                                          })}
                                      </ul>
                                    )}
                                    
                                </div>
                            </div>
                            <div className="comment">
                                <h2 className="title">{this.state.commentlist.length} Comments</h2>
                                {this.state.commentlist && this.state.commentlist.map((item, index) => {
                                  // console.log('item',item);
                                  let post_date = item.post_date ? moment(item.post_date).format('DD MMM, YYYY') : '';
                                  return (
                                    <div className="comment-item" key={index}>
                                      <div className="user">
                                          <img src="./assets/images/user.png"  alt="img"/>
                                      </div>
                                      <div className="content">
                                          <h5>{item.name}</h5>
                                          <span>{item.post_date}</span>
                                          <p>{item.comment}</p>
                                          {/* <div className="reply">
                                              <a href="#"><i className="fas fa-reply"></i></a>
                                          </div> */}
                                      </div>
                                    </div>
                                  )
                                })}
                                {this.state.commentlist.length==0 && (
                                  <div>
                                    <p className='px-0'>No comments available..</p>
                                    <br/><br/>
                                  </div>
                                )}
                                
                            </div>

                            <div className="post-comment">
                                <h2 className="title">Post Your Comment</h2>
                                <form className="post_from">
                                  <label>Name <span className='text-danger'>*</span></label>
                                  <input 
                                    type="text" 
                                    onChange={this.onHandleChange} 
                                    name="name"
                                    value={this.state.name} 
                                    disabled={localStorage.getItem('investor_id') ? true : false}
                                    placeholder='Name'
                                  />

                                  <label>Email <span className='text-danger'>*</span></label>
                                  <input 
                                    type="email" 
                                    onChange={this.onHandleChange} 
                                    name="email" 
                                    value={this.state.email}
                                    disabled={localStorage.getItem('investor_id') ? true : false}
                                    placeholder='Email'
                                  />

                                  <label>Website (Optional)</label>
                                  <input 
                                    type="text" 
                                    onChange={this.onHandleChange} 
                                    name="website"
                                    value={this.state.website}
                                    placeholder='Website..'
                                  />

                                  <label>Comment <span className='text-danger'>*</span></label>
                                  <textarea 
                                    name="comment" 
                                    onChange={this.onHandleChange}
                                    cols="30" 
                                    rows="10"
                                    value={this.state.comment}
                                    placeholder='Comment..'
                                  ></textarea>
                                  <button 
                                    onClick={this.postcomment}
                                    className="theme_btn"
                                    type="button"
                                  >Post comment</button>
                                </form>
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="right-side">
                            <div id="search-2" className="widget blog-sidebar widget-2 widget_search">
                                <SearchInput />
                            </div>

                            <div className=" about-me popular-posts">
                                <h3>Related Posts</h3>
                                {this.state.posts.map((post, index) => {
                                  if(index < 4 && post.type==this.state.type) {
                                  let url = URLs.IMAGEURL +'/blog/'+ post.id+'/'+post.filename;
                                  return(
                                    <div className="media">
                                        <div className="images">
                                            <a href="#">
                                              <img 
                                                src={url} 
                                                alt="img" 
                                                style={{ width: '100%' }}
                                              />
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <a href="#">{post.title}</a>
                                            <p>{post.created_at ? moment(post.created_at).format('MMMM DD, YYYY') : ''}</p>
                                        </div>
                                    </div>
                                 )
                                }
                              })}
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </Spin>

        

        <WebFooter />
      </div>
    )
  }
}

export default BlogDetails;
