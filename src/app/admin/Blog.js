import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  Modal,
  message,
  Select,
  Spin,
  Input,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Apis from "../constants/Apis";
import FullEditor from "ckeditor5-build-full";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import moment from "moment";
import Sidebar2 from "./common/Sidebar2";

const { Option } = Select;
const { Content } = Layout;
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
      title: "",
      description: "",
      filename: "",
      formloader: false,
      editModalStatus: false,
      edittitle: "",
      editdescription: "",
      editfilename: "",
      blogid: "",
      imagename: "",
      deleteModalStatus: false,
      ctype: "",
      editctype: "",
      tags: [],
      editTags: [],
    };
  }
  componentDidMount() {
    this.getpostlist();
  }
  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };
  // get post list
  getpostlist = () => {
    this.setState({ loading: true });
    Bridge.blog.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          posts: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };
  // add new post
  addpost = () => {
    if (this.state.title == "") {
      message.warning("Title is required");
      return false;
    } else if (this.state.ctype == "") {
      message.warning("Please select category type");
      return false;
    } else if (this.state.tags == "") {
      message.warning("Please Select Tags");
    } else if (this.state.description == "") {
      message.warning("Description is required");
      return false;
    } else if (this.state.filename == "") {
      message.warning("Please select image file.");
      return false;
    }
    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("title", this.state.title); //append the values with key, value pair
    formData.append("description", this.state.description);
    formData.append("filename", this.state.filename);
    formData.append("type", this.state.ctype);
    formData.append("tags", JSON.stringify(this.state.tags));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.blog.add(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            addModalStatus: false,
            title: "",
            description: "",
            filename: "",
          },
          () => this.getpostlist()
        );
        window.location.reload();
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };
  // on change file
  onChangeFile = (e) => {
    this.setState({
      filename: e.target.files[0],
    });
  };
  // on change file
  onChangeEditFile = (e) => {
    this.setState({
      editfilename: e.target.files[0],
    });
  };
  // show edit modal
  showEditModal = (item) => {
    let url = Apis.IMAGEURL + "blog/" + item.id + "/" + item.filename;
    this.setState({
      editModalStatus: true,
      editdescription: item.description,
      edittitle: item.title,
      imagename: url,
      blogid: item.id,
      editctype: item.type,
      editTags: JSON.parse(item.action.tags),
    });
  };
  // update post
  updatepost = () => {
    if (this.state.edittitle == "") {
      message.warning("Title is required");
      return false;
    } else if (this.state.editctype == "") {
      message.warning("Please select category type");
      return false;
    } else if (this.state.editTags == "") {
      message.warning("Please Select Tags");
    } else if (this.state.editdescription == "") {
      message.warning("Description is required");
      return false;
    } else if (this.state.blogid == "") {
      message.warning("Please select the blog first.");
      return false;
    }
    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("title", this.state.edittitle); //append the values with key, value pair
    formData.append("description", this.state.editdescription);
    formData.append("filename", this.state.editfilename);
    formData.append("id", this.state.blogid);
    formData.append("type", this.state.editctype);
    formData.append("tags", JSON.stringify(this.state.editTags));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.blog.update(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            edittitle: "",
            editdescription: "",
            editfilename: "",
            blogid: "",
          },
          () => this.getpostlist()
        );
        window.location.reload();
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };
  showDeleteModal = (item) => {
    this.setState({
      deleteModalStatus: true,
      blogid: item.id,
    });
  };
  deletepost = () => {
    if (this.state.blogid == "") {
      message.warning("Please select the blog first.");
      return false;
    }
    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("id", this.state.blogid);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.blog.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
            blogid: "",
          },
          () => this.getpostlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };
  // on change select
  handleChangeSelect = (value) => {
    this.setState({ ctype: value });
  };
  handleChangeSelectedit = (value) => {
    this.setState({ editctype: value });
  };
  handleChangeTag = (value) => {
    this.setState({ tags: value });
  };
  handleChangeTagedit = (value) => {
    this.setState({ editTags: value });
  };
  render() {
    const dataSource =
      this.state.posts &&
      this.state.posts.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          title: item.title,
          description: item.description,
          filename: item.filename,
          id: item.id,
          createdat: item.created_at
            ? moment(item.created_at).format("DD MMM, YYYY")
            : "",
          action: item,
          type: item.type ? item.type : "",
        };
      });
    const columns = [
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Category Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Created on",
        dataIndex: "createdat",
        key: "createdat",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <div>
            <Button type="primary" onClick={() => this.showEditModal(record)}>
              <i
                className="bx bxs-edit"
                style={{
                  color: "#fff",
                  position: "relative",
                  top: 3,
                  left: -3,
                }}
              ></i>{" "}
              Edit
            </Button>
            &nbsp;&nbsp;
            <Button type="danger" onClick={() => this.showDeleteModal(record)}>
              <i
                className="bx bx-trash"
                style={{
                  color: "#fff",
                  position: "relative",
                  top: 3,
                  left: -3,
                }}
              ></i>{" "}
              Delete
            </Button>
          </div>
        ),
      },
    ];
    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            <Content className="home-section">
              <Card
                title="Blog Posts"
                extra={
                  <Button type="primary" onClick={this.showAddModal}>
                    <i
                      className="bx bxs-plus-circle"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Add New Post
                  </Button>
                }
                style={{ margin: 16 }}
              >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Blog Posts</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <Table
                  scroll={{ x: 800 }}
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                />
              </Card>
            </Content>
            <BottomBar />
          </Layout>
        </Layout>
        {/* Start Add modal  */}
        <Modal
          title="Add New Post"
          visible={this.state.addModalStatus}
          onOk={this.addpost}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={700}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Title <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                placeholder="Title"
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Category Type <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.ctype}
                style={{ width: "100%" }}
                onChange={this.handleChangeSelect}
              >
                <Option value="" disabled>
                  --Select--
                </Option>
                <Option value="Growth91">Growth91</Option>
                <Option value="Startup">Startup</Option>
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Tags <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.tags}
                style={{ width: "100%" }}
                onChange={this.handleChangeTag}
                mode="multiple"
              >
                <Option value="" disabled>
                  --Select--
                </Option>
                <Option value="Cash">Cash</Option>
                <Option value="Tolerance">Tolerance</Option>
                <Option value="Vulnerability">Vulnerability</Option>
                <Option value="Invest">Invest</Option>
                <Option value="Money">Money</Option>
              </Select>
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <CKEditor
                data={this.state.description}
                editor={FullEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ description: data });
                }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Choose image <span className="text-danger">*</span>
              </label>
              <Input
                type={"file"}
                onChange={(e) => this.onChangeFile(e)}
                accept=".jpg, .jpeg, .png"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Post"
          visible={this.state.editModalStatus}
          onOk={this.updatepost}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={700}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Title <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edittitle}
                onChange={(e) => this.setState({ edittitle: e.target.value })}
                placeholder="Title"
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Category Type <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.editctype}
                style={{ width: "100%" }}
                onChange={this.handleChangeSelectedit}
              >
                <Option value="" disabled>
                  --Select--
                </Option>
                <Option value="Growth91">Growth91</Option>
                <Option value="Startup">Startup</Option>
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Tags <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.editTags}
                style={{ width: "100%" }}
                onChange={this.handleChangeTagedit}
                mode="multiple"
              >
                <Option value="" disabled>
                  --Select--
                </Option>
                <Option value="Cash">Cash</Option>
                <Option value="Tolerance">Tolerance</Option>
                <Option value="Vulnerability">Vulnerability</Option>
                <Option value="Invest">Invest</Option>
                <Option value="Money">Money</Option>
              </Select>
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <CKEditor
                data={this.state.editdescription}
                editor={FullEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ editdescription: data });
                }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Choose image <span className="text-danger">*</span>
              </label>

              {this.state.imagename && (
                <>
                  <br />
                  <img
                    src={this.state.imagename}
                    alt="image"
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "cover",
                      marginBottom: 20,
                      borderRadius: 3,
                    }}
                  />
                </>
              )}
              <Input
                type={"file"}
                onChange={(e) => this.onChangeEditFile(e)}
                accept=".jpg, .jpeg, .png"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Update Post"
          visible={this.state.deleteModalStatus}
          onOk={this.deletepost}
          okText="delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te post?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}
      </>
    );
  }
}

export default Blog;
