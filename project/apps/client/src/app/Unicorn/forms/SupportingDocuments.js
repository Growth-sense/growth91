import React, { Component } from "react";
import { message, Spin, Button, notification } from "antd";
import Bridge from "../../constants/Bridge";
import ProgressBar from "@ramonak/react-progress-bar";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import $ from "jquery";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import InfoTooltip from "./InfoTooltip";
import { parseBannerImages } from "../../helper/utilHelper";

class SupportingDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      have_you_raised_fund_for_startup: "",
      pitch: "",
      product: "",
      documents: [],
      pitchpdffile: "",
      productpdffile: "",
      doc1: "",
      doc2: "",
      doc3: "",
      documentfile: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
      upload_progres1: false,
      upload_progres2: false,
      upload_progres3: false,
      show_progress_bar: false,
      upload_progres1_no: 0,
      upload_progres2_no: 0,
      upload_progres3_no: 0,
      formloader: false,
      formloader2: false,
      marketoverview: [{ content1: "" }, { content1: "" }, { content1: "" }],
      uploaded_document_list: [],
      startuphighlight: [
        { title: "Revenue Growth ", content1: "" },
        { title: " New Initiatives, Operational Efficiency", content1: "" },
        { title: "Performance and Achievements ", content1: "" },
        {
          title: " Previous Funding/Future Funding and its Utilization",
          content1: "",
        },
      ],
      titlestartuphigh: [
        "Revenue Growth ",
        " New Initiatives, Operational Efficiency",
        "Performance and Achievements ",
        " Previous Funding/Future Funding and its Utilization",
      ],
      coverImages: [],
      uploadingCoverImages: false,
      viewingImageIndex: null, // For modal image viewer
      draggedIndex: null,
      dragOverIndex: null
    };
  }
  componentDidMount() {
    if (this.props.unicorn.tudMark) {
      this.setState({ marketoverview: JSON.parse(this.props.unicorn.tudMark) });
    }    
    if (this.props.unicorn.tudStartupHighlights) {
      this.setState({ startuphighlight: JSON.parse(this.props.unicorn.tudStartupHighlights) });
    }    
    // Use helper function to safely parse banner images (handles both string and array)
    if (this.props.unicorn.tudBannerImage) {
      const images = parseBannerImages(this.props.unicorn.tudBannerImage);
      this.setState({ coverImages: images });
    }
    this.props.check();
  }
  addmarketcv = (e) => {
    this.setState((prev) => ({
      marketoverview: [...prev.marketoverview, { content1: "" }],
    }));
  };
  addstartuphighlight = (e) => {
    this.setState((prev) => ({
      startuphighlight: [...prev.startuphighlight, { content1: "" }],
    }));
  };


  updateimg = async () => {
    if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
    
    this.props.setMultiple({
      "tudStartupHighlights": JSON.stringify(this.state.startuphighlight),
      "tudMark": JSON.stringify(this.state.marketoverview),
      "tudBannerImage": JSON.stringify(this.state.coverImages),
    })
    
    this.savedata();
  };

  savedata = () => {
    setTimeout(async () => {
      Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
        if (result.status == 1) {
          this.setState({ loading: false }, () => this.props.activate());
          if (this.state.processtype == "next") {
             this.props.next();
          } else if (this.state.processtype == "prev") {
             this.props.prev();
          } else if (this.state.processtype == "saveandproceed") {
            //  this.props.activate();
            message.success("Reference details are updated successfully.", 6);
          } else {
            message.success("Reference details are updated successfully.", 6);
          }
        } else {
          message.warning(result.message);
          this.setState({ loading: false });
        }
      });
    }, 5000);
  };

  
  next = () => {
    this.setState({ processtype: "next" }, () => this.updateimg());
  };
  prev = () => {
    this.setState({ processtype: "prev" }, () => this.updateimg());
  };

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.marketoverview];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ marketoverview: newEntries });
    this.props.setMultiple({
      "tudMark": JSON.stringify(newEntries),
    });
  };
  handleInputhighlightChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.startuphighlight];
    newEntries[index][name] = value; // Update the specific input field
    this.setState({ startuphighlight: newEntries });
    this.props.setMultiple({
      "tudStartupHighlights": JSON.stringify(newEntries)
    })
  };

  removeFile = (fieldName) => {
    this.props.onInput(fieldName, "");
    if (fieldName === "tudPitchDeck") {
      this.setState({ pitchpdffile: "" });
    } else if (fieldName === "tudProductDeck") {
      this.setState({ productpdffile: "" });
    } else if (fieldName === "tudBannerImage") {
      this.setState({ coverImages: [] });
    }
    message.success("File removed successfully");
  };

  onChangeMultipleFile = async (e) => {
    const formData = new FormData();
    if (e.target.name == "tudPitchDeck") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        { headers: { "Content-Type": "multipart/form-data"} }
      );

      if (response) {
        this.setState({ pitchpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudPitchDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudProductDeck") {
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        { headers: { "Content-Type": "multipart/form-data"} }
      );

      if (response) {
        this.setState({ productpdffile: response.data.data.upfile });
        this.props.onInput(
          "tudProductDeck",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudBannerImage") {
      // Multi-image upload with full validation
      const files = Array.from(e.target.files);
      const currentImages = this.state.coverImages || [];
      
      // Validation constants
      const MAX_IMAGES = 5;
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      
      // Validate total count
      if (currentImages.length + files.length > MAX_IMAGES) {
        message.error(`Maximum ${MAX_IMAGES} cover images allowed. You currently have ${currentImages.length} image(s).`);
        e.target.value = '';
        return;
      }
      
      // Validate each file
      for (let file of files) {
        if (file.size > MAX_FILE_SIZE) {
          message.error(`${file.name} exceeds 5MB size limit`);
          e.target.value = '';
          return;
        }
        if (!ALLOWED_FORMATS.includes(file.type)) {
          message.error(`${file.name} format not allowed. Only jpg, jpeg, png, webp accepted.`);
          e.target.value = '';
          return;
        }
      }
      
      this.setState({ uploadingCoverImages: true });
      
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);
      formData.append("existingImages", JSON.stringify(currentImages));
      
      // Append multiple files with correct parameter name
        files.forEach((file) => {
          formData.append("coverImages[]", file);
        });

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadCoverImages`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status == "1") {
          const allImages = response.data.data.allImages;
          this.setState({ 
            coverImages: allImages,
            uploadingCoverImages: false 
          });
          
          this.props.onInput(
            "tudBannerImage",
            JSON.stringify(allImages)
          );
          
          message.success(response.data.message);
          
          // Show any individual file errors
          if (response.data.errors && response.data.errors.length > 0) {
            response.data.errors.forEach(err => message.warning(err));
          }
        } else {
          message.error(response.data.message);
          this.setState({ uploadingCoverImages: false });
        }
      } catch (error) {
        console.error("Upload error:", error);
        message.error("Failed to upload images. Please try again.");
        this.setState({ uploadingCoverImages: false });
      }
      
      e.target.value = ''; // Reset input
    } else if (e.target.name == "tudLogoImage") {
      const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!ALLOWED_FORMATS.includes(e.target.files[0].type)) {
          message.error(`${e.target.files[0].name} format not allowed. Only jpg, jpeg, png, webp accepted.`);
          e.target.value = '';
          return;
      }
      formData.append("upfile", e.target.files[0]);
      console.log(formData.get("tudTempUdID"));
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        this.props.onInput(
          "tudLogoImage",
          JSON.stringify(response.data.data.upfile)
        );
      }
    } else if (e.target.name == "tudSponsorImage") {
      const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!ALLOWED_FORMATS.includes(e.target.files[0].type)) {
          message.error(`${e.target.files[0].name} format not allowed. Only jpg, jpeg, png, webp accepted.`);
          e.target.value = '';
          return;
      }
      formData.append("upfile", e.target.files[0]);
      formData.append("tudTempUdID", this.props.unicorn.tudTempUdID);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        this.props.onInput(
          "tudSponsorImage",
          JSON.stringify(response.data.data.upfile)
        );
      }
    }
  };

  // Delete cover image with backend API call
  deleteCoverImage = async (imageName) => {
    this.setState({ uploadingCoverImages: true });
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/deleteCoverImage`,
        {
          tudTempUdID: this.props.unicorn.tudTempUdID,
          imageName: imageName,
          currentImages: this.state.coverImages
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "1") {
        const remainingImages = response.data.data.remainingImages;
        this.setState({ 
          coverImages: remainingImages,
          uploadingCoverImages: false 
        });
        
        this.props.onInput(
          "tudBannerImage",
          JSON.stringify(remainingImages)
        );
        
        message.success("Image deleted successfully");
      } else {
        message.error(response.data.message);
        this.setState({ uploadingCoverImages: false });
      }
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete image. Please try again.");
      this.setState({ uploadingCoverImages: false });
    }
  };

  // ===== DRAG AND DROP HANDLERS FOR REORDERING COVER IMAGES =====
  handleDragStart = (e, index) => {
    this.setState({ draggedIndex: index });
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    this.setState({ draggedIndex: null, dragOverIndex: null });
  };

  handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (this.state.draggedIndex !== index) {
      this.setState({ dragOverIndex: index });
    }
  };

  handleDragLeave = () => {
    this.setState({ dragOverIndex: null });
  };

  handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { draggedIndex } = this.state;
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      this.setState({ draggedIndex: null, dragOverIndex: null });
      return;
    }

    // Reorder array
    const reorderedImages = [...this.state.coverImages];
    const [draggedImage] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(dropIndex, 0, draggedImage);

    // Update state immediately for smooth UI
    this.setState({ 
      coverImages: reorderedImages,
      draggedIndex: null,
      dragOverIndex: null,
      uploadingCoverImages: true
    });

    // Call backend to persist the new order
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/reorderCoverImages`,
        {
          tudTempUdID: this.props.unicorn.tudTempUdID,
          imageOrder: reorderedImages
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "1") {
        this.props.onInput(
          "tudBannerImage",
          JSON.stringify(reorderedImages)
        );
        message.success("Images reordered successfully");
        this.setState({ uploadingCoverImages: false });
      } else {
        // Revert on error
        message.error(response.data.message);
        this.setState({ 
          coverImages: this.props.unicorn.tudBannerImage ? parseBannerImages(this.props.unicorn.tudBannerImage) : [],
          uploadingCoverImages: false 
        });
      }
    } catch (error) {
      console.error("Reorder error:", error);
      message.error("Failed to save new order. Please try again.");
      // Revert to original order
      this.setState({ 
        coverImages: this.props.unicorn.tudBannerImage ? parseBannerImages(this.props.unicorn.tudBannerImage) : [],
        uploadingCoverImages: false 
      });
    }
  };
  // ===== END DRAG AND DROP HANDLERS =====

  render() {
    let active =
      this.state.have_you_raised_fund_for_startup &&
      this.state.valueispresent == true
        ? false
        : true;
    return (
      <div>
        <section className="StepForm-section" style={{ display: "block" }}>
          <Spin spinning={this.state.loading}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="line-seperator">
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        background: "#fff",
                        paddingRight: 16,
                      }}
                    >
                      <span
                        style={{
                          background: "#fff",
                          width: 119,
                          height: 20,
                          zIndex: 4,
                          position: "relative",
                          paddingRight: 10,
                        }}
                      >
                        Supporting Documents
                      </span>
                    </div>
                    <hr />
                    {/* <button onClick={this.addmarketcv}>aaaa</button> */}
                  </div>
                  {this.props.error == "0" &&
                    (!this.state.pitchpdffile ||
                      !this.state.pitch ||
                      !this.state.documentfile ||
                      !this.state.documents) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {(!this.state.pitchpdffile || !this.state.pitch) && (
                            <li>
                              <span>Please select pitch file.</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <Spin spinning={this.state.formloader}>
                        <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              Upload Pitch Deck<span className="text-danger">*</span>
                              <InfoTooltip title="Upload a concise 10MB pitch deck covering vision, business model, and traction." />
                            </label>
                            {this.props.unicorn.tudPitchDeck != "" && JSON.parse(this.props.unicorn.tudPitchDeck) != "" ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <span style={{ color: 'green' }}>✓ File Uploaded</span>
                                <Button 
                                  type="primary" 
                                  size="small" 
                                  icon={<DeleteOutlined />}
                                  onClick={() => this.removeFile("tudPitchDeck")}
                                >
                                  Remove File
                                </Button>
                              </div>
                            ) : null}

                            <input
                              type="file"
                              id="pitch_input_type_file"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                              accept=".pdf"
                              name="tudPitchDeck"
                              // style={{display:'none'}}
                            />                        
                          </div>
                        </div>

                        <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              Upload Product Brochure
                              <InfoTooltip title="Optional: Share a product sheet, use-case guide, or tech whitepaper (Max 10MB)." />
                            </label>
                            {this.props.unicorn.tudProductDeck != null && this.props.unicorn.tudProductDeck != "" && JSON.parse(this.props.unicorn.tudProductDeck) != "" ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <span style={{ color: 'green' }}>✓ File Uploaded</span>
                                <Button 
                                  type="primary" 
                                  size="small" 
                                  icon={<DeleteOutlined />}
                                  onClick={() => this.removeFile("tudProductDeck")}
                                >
                                  Remove File
                                </Button>
                              </div>
                            ) : null}

                            <input
                              type="file"
                              id="product_input_type_file"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                              accept=".pdf"
                              name="tudProductDeck"
                            />                        
                          </div>
                        </div>
                      </Spin>
                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Upload Cover Images ({this.state.coverImages.length}/5)<span className="text-danger">*</span>
                          <InfoTooltip title="Upload up to 5 cover images. First image will be the main thumbnail. Format: jpg, jpeg, png, webp. Max 5MB per image. Recommended: 16:9 aspect ratio (1920x1080px)." />
                        </label>
                        
                        {/* Image Count Info */}
                        <div style={{ 
                          padding: '10px', 
                          background: '#f0f8ff', 
                          borderRadius: '5px', 
                          marginBottom: '15px',
                          fontSize: '13px',
                          color: '#333'
                        }}>
                          <strong>📸 Cover Images:</strong> {this.state.coverImages.length} of 5 uploaded
                          {this.state.coverImages.length === 0 && " - At least 1 image required"}
                          {this.state.coverImages.length === 5 && " - Maximum reached"}
                          {this.state.coverImages.length > 1 && (
                            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                              💡 <strong>Tip:</strong> Drag and drop to reorder. First image = main cover. Click to view full size.
                            </div>
                          )}
                        </div>

                        {/* Uploaded Images Row */}
                        {this.state.coverImages.length > 0 && (
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginBottom: '20px',
                            padding: '15px',
                            background: '#fafafa',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                          }}>
                            {this.state.coverImages.map((image, index) => (
                              <div 
                                key={index} 
                                style={{
                                  position: 'relative',
                                  width: '79px',
                                  height: '79px',
                                  border: index === 0 ? '3px solid #4CAF50' : '2px solid #ddd',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                draggable={true}
                                onDragStart={(e) => this.handleDragStart(e, index)}
                                onDragEnd={this.handleDragEnd}
                                onDragOver={(e) => this.handleDragOver(e, index)}
                                onDragLeave={this.handleDragLeave}
                                onDrop={(e) => this.handleDrop(e, index)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                              >
                                {/* Number Badge */}
                                <div style={{
                                  position: 'absolute',
                                  top: '4px',
                                  left: '4px',
                                  background: index === 0 ? '#4CAF50' : '#1890ff',
                                  color: 'white',
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '10px',
                                  fontWeight: 'bold',
                                  zIndex: 2,
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                  {index + 1}
                                </div>

                                {/* Delete Button */}
                                <div 
                                  style={{
                                    position: 'absolute',
                                    top: '4px',
                                    right: '4px',
                                    background: '#ff4d4f',
                                    color: 'white',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    zIndex: 3,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    opacity: 0.9
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.deleteCoverImage(image);
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                                  title="Delete image"
                                >
                                  ×
                                </div>

                                {/* Thumbnail Image */}
                                <img 
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                  }} 
                                  src={
                                    image.startsWith('cover_') 
                                      ? `${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${image}`
                                      : `${process.env.REACT_APP_IMAGE_BASE_URL || process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${image}`
                                  }
                                  alt={`Cover ${index + 1}`}
                                  onClick={() => this.setState({ viewingImageIndex: index })}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Upload Button - Only show if less than 5 images */}
                        {this.state.coverImages.length < 5 && (
                          <div style={{ marginTop: '15px' }}>
                            <input
                              type="file"
                              id="cover-image-input"
                              onWheel={() => document.activeElement.blur()}
                              name="tudBannerImage"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              multiple
                              onChange={(e) => this.onChangeMultipleFile(e)}
                              style={{ display: 'none' }}
                            />
                            <Button
                              type="primary"
                              size="large"
                              loading={this.state.uploadingCoverImages}
                              onClick={() => document.getElementById('cover-image-input').click()}
                              style={{ marginRight: '10px' }}
                            >
                              {this.state.coverImages.length === 0 ? '📤 Upload Cover Images' : '➕ Add More Images'}
                            </Button>
                            <span style={{ fontSize: '12px', color: '#999' }}>
                              {5 - this.state.coverImages.length} slot(s) available
                            </span>
                          </div>
                        )}

                        {/* Remove All Button */}
                        {this.state.coverImages.length > 0 && (
                          <Button 
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => this.removeFile("tudBannerImage")}
                            style={{ marginTop: '10px' }}
                          >
                            Remove All Images
                          </Button>
                        )}
                      </div>

                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Upload Logo<span className="text-danger">*</span>
                          <InfoTooltip title="High-quality startup logo (JPG or PNG)." />
                        </label>
                        {this.props.unicorn.tudLogoImage != "" && JSON.parse(this.props.unicorn.tudLogoImage) != "" ? (
                          <div>
                            <img style={{maxWidth:"100%", marginBottom: '10px'}} src={`${process.env.REACT_APP_IMAGE_BASE_URL || process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${JSON.parse(this.props.unicorn.tudLogoImage)}`} />
                            <div style={{ marginBottom: '10px' }}>
                              <Button 
                                type="primary" 
                                size="small" 
                                icon={<DeleteOutlined />}
                                onClick={() => this.removeFile("tudLogoImage")}
                              >
                                Remove File
                              </Button>
                            </div>
                          </div>
                        ) : null}
                        <input
                          type="file"
                          onWheel={() => document.activeElement.blur()}
                          name="tudLogoImage"
                          accept="image/*"
                          onChange={(e) => this.onChangeMultipleFile(e)}
                        />
                      </div>

                      <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              Referred By (Name of Incubator/entity/Individual)
                              <InfoTooltip title="If referred, mention mentor/VC/incubator name." />
                            </label>
                            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px", marginBottom: "10px" }}>
                              Note: If you provide a sponsor name or image, both fields become mandatory.
                            </div>
                            <input
                              type="text"
                              maxLength={100}
                              placeholder="Name of the Sponsor / Incubator"
                              name="tudSponsorName"
                              value={this.props.unicorn.tudSponsorName}
                              onChange={(e) =>
                                this.props.onInput(e.target.name, e.target.value)
                              }
                            />
                            <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${this.props.unicorn.tudSponsorName.length}/100 characters`}
                            </div>
                          </div>
                        </div>

                      <div className="form-group ">
                          <div className="mt-4">
                            <label className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              Referred By (Logo)
                              <InfoTooltip title="Upload logo of the referring entity (mandatory if name provided)." />
                            </label>
                            {this.props.unicorn.tudSponsorImage != "" && JSON.parse(this.props.unicorn.tudSponsorImage) != "" ? (
                              <div>
                                <img style={{ maxWidth: "100%", marginBottom: '10px' }} src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${JSON.parse(this.props.unicorn.tudSponsorImage)}`} />
                                <div style={{ marginBottom: '10px' }}>
                                  <Button 
                                    type="primary" 
                                    size="small" 
                                    icon={<DeleteOutlined />}
                                    onClick={() => this.removeFile("tudSponsorImage")}
                                  >
                                    Remove File
                                  </Button>
                                </div>
                              </div>
                            ) : null}
                            <input
                              type="file"
                              onWheel={() => document.activeElement.blur()}
                              name="tudSponsorImage"
                              accept="image/*"
                              onChange={(e) => this.onChangeMultipleFile(e)}
                            />                      
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
          <ToastContainer/>

          {/* Image Modal Viewer */}
          {this.state.viewingImageIndex !== null && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px'
              }}
              onClick={() => this.setState({ viewingImageIndex: null })}
            >
              {/* Close Button */}
              <div 
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  color: '#333',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  zIndex: 10001
                }}
                onClick={() => this.setState({ viewingImageIndex: null })}
              >
                ×
              </div>

              {/* Image Counter */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                zIndex: 10001
              }}>
                {this.state.viewingImageIndex + 1} / {this.state.coverImages.length}
              </div>

              {/* Previous Button */}
              {this.state.viewingImageIndex > 0 && (
                <div 
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 10001
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ viewingImageIndex: this.state.viewingImageIndex - 1 });
                  }}
                >
                  ‹
                </div>
              )}

              {/* Next Button */}
              {this.state.viewingImageIndex < this.state.coverImages.length - 1 && (
                <div 
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 10001
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ viewingImageIndex: this.state.viewingImageIndex + 1 });
                  }}
                >
                  ›
                </div>
              )}

              {/* Full Size Image */}
              <img 
                src={
                  this.state.coverImages[this.state.viewingImageIndex].startsWith('cover_') 
                    ? `${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${this.state.coverImages[this.state.viewingImageIndex]}`
                    : `${process.env.REACT_APP_IMAGE_BASE_URL || process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${this.props.unicorn.tudTempUdID}/${this.state.coverImages[this.state.viewingImageIndex]}`
                }
                alt={`Cover ${this.state.viewingImageIndex + 1}`}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="form-group d-flex justify-content-between">
            <div className='arrow-buttons'>
              <button
                style={{ 
                  position:'relative',
                  left:-20,
                  background: '#fff',
                  border: '1px solid #29176f',
                  color: '#29176f',
                }} 
                onClick={this.prev}
                className="submit-button"
              >
                <i className='bx bx-chevron-left'></i>
              </button>
              <button
                style={{ 
                  position:'relative',
                  left:-20,
                  background: '#fff',
                  border: '1px solid #29176f',
                  color: '#29176f',
                }} 
                onClick={this.next}
                className="submit-button"
              >
                <i className='bx bx-chevron-right'></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SupportingDocuments;
