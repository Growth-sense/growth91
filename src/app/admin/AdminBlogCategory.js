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
import Sidebar2 from "./common/Sidebar2";

const { Option } = Select;
const { Content } = Layout;
class AdminBlogCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tableloader: false,
      loading: false,
      name: "",
      edit_name: "",
      category_id: "",
      addModalStatus: false,
      editModalStatus: false,
      formloader: false,
      deleteModalStatus: false,
    };
  }
  componentDidMount() {
    this.getcategorylist();
  }
  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };
  // get post list
  getcategorylist = () => {
    this.setState({ loading: true });
    Bridge.blog_category.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          categories: result.data,
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
  addcategory = () => {
    if (this.state.name == "") {
      message.warning("Category name is required");
      return false;
    }
    this.setState({ formloader: true });
    let params = {
      name: this.state.name,
    };
    Bridge.blog_category.add(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            addModalStatus: false,
            name: "",
          },
          () => this.getcategorylist()
        );
      } else {
        message.error(result.message);
        this.setState({ formloader: false });
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
      edit_name: item.name,
      category_id: item.action.category_id,
    });
  };
  // update post
  updatecategory = () => {
    if (this.state.edit_name == "") {
      message.warning("Category name is required");
      return false;
    }
    if (this.state.category_id == "") {
      message.warning("Please select category");
      return false;
    }
    this.setState({ formloader: true });
    let params = {
      category_id: this.state.category_id,
      name: this.state.edit_name,
    };
    Bridge.blog_category.update(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            edit_name: "",
          },
          () => this.getcategorylist()
        );
      } else {
        message.error(result.message);
        this.setState({ formloader: false });
      }
    });
  };
  showDeleteModal = (item) => {
    console.log("item", item.action.category_id);
    this.setState({
      deleteModalStatus: true,
      category_id: item.action.category_id,
    });
  };
  deletepost = () => {
    if (this.state.category_id == "") {
      message.warning("Please select the category first.");
      return false;
    }
    this.setState({ formloader: true });
    let params = {
      category_id: this.state.category_id,
    };
    Bridge.blog_category.delete(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
            category_id: "",
          },
          () => this.getcategorylist()
        );
      } else {
        message.error(result.message);
        this.setState({ formloader: false });
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
      this.state.categories &&
      this.state.categories.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          name: item.name,
          action: item,
        };
      });
    const columns = [
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
      },
      {
        title: "Category",
        dataIndex: "name",
        key: "name",
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
                    Add Blog Category
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
                  <Breadcrumb.Item>Blog Categories</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <Table
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
          title="Add New Category"
          visible={this.state.addModalStatus}
          onOk={this.addcategory}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={500}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Category Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                placeholder="Title"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Category"
          visible={this.state.editModalStatus}
          onOk={this.updatecategory}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={500}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Category Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_name}
                onChange={(e) => this.setState({ edit_name: e.target.value })}
                placeholder="Title"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete Category"
          visible={this.state.deleteModalStatus}
          onOk={this.deletepost}
          okText="delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te category?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}
      </>
    );
  }
}
export default AdminBlogCategory;
