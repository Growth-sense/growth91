import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Form, Input, Select, Button, Upload, message, Space } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import Bridge from "../../constants/Bridge";

const { Option } = Select;
const { TextArea } = Input;

const OpportunityFormModal = ({ visible, onClose, initialData, adminId, onSuccess }) => {
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // 'draft' or 'publish'
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);
  const [uploadedLogoName, setUploadedLogoName] = useState(null);
  
  const [urlStatus, setUrlStatus] = useState(''); // 'success', 'error', 'validating'
  const [urlHelp, setUrlHelp] = useState('');

  const checkUrlAvailability = async (url, tempId, mainId) => {
    if (!url || url.trim() === '') {
      setUrlStatus('');
      setUrlHelp('');
      return;
    }
    
    // Auto format url to be url safe (lowercase, hyphens instead of spaces)
    const formattedUrl = url.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    form.setFieldsValue({ customUrl: formattedUrl });

    setUrlStatus('validating');
    setUrlHelp('Checking URL availability...');

    try {
      // Using generic fetch since we don't have this in Bridge yet
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/admin/OpportunitiesAdmin/check_url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formattedUrl, tempId, mainId })
      });
      const res = await response.json();
      
      if (res.status == 1) {
        setUrlStatus('success');
        setUrlHelp(''); // Clear text to show only icon
      } else {
        setUrlStatus('error');
        setUrlHelp('This URL is already taken.');
      }
    } catch (e) {
      setUrlStatus('');
      setUrlHelp('');
    }
  };

  const debouncedCheckUrl = useCallback(debounce(checkUrlAvailability, 500), []);

  useEffect(() => {
    if (visible) {
      setUrlStatus('');
      setUrlHelp('');
      
      if (initialData) {
        form.setFieldsValue({
          startupName: initialData.startupName,
          customUrl: initialData.customUrl,
          startupDescription: initialData.startupDescription,
          founderInformation: initialData.founderInformation,
          sector: initialData.sector,
          stage: initialData.stage,
          indicativePriceRange: initialData.indicativePriceRange,
          instrumentType: initialData.instrumentType,
          website: initialData.website,
          linkedIn: initialData.linkedIn,
          newsArticles: initialData.newsArticles && initialData.newsArticles.length && typeof initialData.newsArticles[0] === 'object' ? initialData.newsArticles : [],
          socialMediaLinks: initialData.socialMediaLinks && initialData.socialMediaLinks.length ? initialData.socialMediaLinks : [""],
        });
        setUploadedLogoName(initialData.startupLogo);
        setUploadedLogoUrl(initialData.startupLogo ? `${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${initialData.startupLogo}` : null);
      } else {
        form.resetFields();
        form.setFieldsValue({
          newsArticles: [],
          socialMediaLinks: [""],
        });
        setUploadedLogoUrl(null);
        setUploadedLogoName(null);
      }
    }
  }, [visible, initialData, form]);

  const handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      setFileUploading(true);
    }
    if (info.file.status === 'done') {
      const response = info.file.response;
      if (response && String(response.status) === "1") {
        message.success("Logo uploaded successfully");
        setUploadedLogoName(response.data.filename);
        setUploadedLogoUrl(`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${response.data.filename}`);
        setFileUploading(false);
      } else {
        message.error("Logo upload failed");
        setFileUploading(false);
      }
    } else if (info.file.status === 'error') {
      message.error("Logo upload failed");
      setFileUploading(false);
    }
  };

  const onSaveDraft = () => {
    const values = form.getFieldsValue();
    if (!values.startupName) {
      message.error("Startup Name is required for drafts.");
      return;
    }
    saveData(values, false);
  };

  const onPublish = async () => {
    try {
      if (!uploadedLogoName) {
        message.error("Startup Logo is required to publish.");
        return;
      }
      if (urlStatus === 'error') {
        message.error("Please choose a unique Custom URL before publishing.");
        return;
      }
      const values = await form.validateFields();
      saveData(values, true);
    } catch (e) {
      console.log("Validation failed", e);
      message.error("Please fill all required fields correctly.");
    }
  };

  const saveData = (values, publish) => {
    // Filter out empty links and objects
    values.newsArticles = values.newsArticles?.filter(article => article && (article.title?.trim() || article.url?.trim() || article.imgname?.trim())) || [];
    values.socialMediaLinks = values.socialMediaLinks?.filter(link => link && link.trim() !== "") || [];

    const payload = {
      ...values,
      startupLogo: uploadedLogoName,
      adminId: adminId,
      tempId: initialData?.tempId || null,
      mainId: initialData?.mainId || null,
    };

    setLoadingType(publish ? 'publish' : 'draft');
    setLoading(true);

    Bridge.adminSaveOpportunityDraft(payload)
      .then((res) => {
        if (res && res.status == 1) {
          if (publish) {
            // Proceed to publish using the tempId returned
            Bridge.adminPublishOpportunity({ tempId: res.data.tempId, adminId })
              .then((pubRes) => {
                setLoading(false);
                if (pubRes && pubRes.status == 1) {
                  message.success("Opportunity published successfully!");
                  onSuccess();
                } else {
                  message.error(pubRes?.message || "Failed to publish.");
                }
              })
              .catch((err) => {
                setLoading(false);
                message.error("Failed to publish opportunity. Please try again.");
              });
          } else {
            setLoading(false);
            message.success("Draft saved successfully!");
            onSuccess();
          }
        } else {
          setLoading(false);
          message.error(res?.message || "An error occurred while saving.");
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error("An error occurred while saving.");
      });
  };

  return (
    <Modal
      title={initialData ? "Edit Opportunity" : "Create Opportunity"}
      width={720}
      onCancel={onClose}
      visible={visible}
      
      footer={[
          <Button key="cancel" onClick={onClose} disabled={loading}>Cancel</Button>,
          <Button key="draft" onClick={onSaveDraft} loading={loading && loadingType === 'draft'} disabled={fileUploading || (loading && loadingType !== 'draft')}>
            Save as Draft
          </Button>,
          <Button key="publish" onClick={onPublish} type="primary" loading={loading && loadingType === 'publish'} disabled={fileUploading || (loading && loadingType !== 'publish')}>
            Publish
          </Button>
      ]}
    >
      <Form layout="vertical" form={form}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Startup Logo</label>
            <div>
              <Upload
                name="file"
                action={`${process.env.REACT_APP_BASE_URL}api/admin/OpportunitiesAdmin/upload_logo`}
                showUploadList={false}
                onChange={handleUpload}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} loading={fileUploading}>Click to Upload Logo</Button>
              </Upload>
              {uploadedLogoUrl && (
                <div className="mt-2">
                  <img src={uploadedLogoUrl} alt="Logo" style={{ height: 60, objectFit: 'contain' }} />
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="startupName"
              label="Startup Name"
              rules={[{ required: true, message: "Startup Name is required" }]}
            >
              <Input placeholder="e.g., Growth91" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="customUrl"
              label="Custom URL Slug"
              validateStatus={urlStatus}
              help={urlHelp}
              hasFeedback
              rules={[
                { required: true, message: "Custom URL is required" },
                { pattern: /^[a-z0-9-]+$/, message: "Only lowercase letters, numbers, and hyphens allowed" }
              ]}
            >
              <Input 
                // addonBefore="/secondary-opportunities/" 
                placeholder="e.g., growth91-startup" 
                onChange={(e) => debouncedCheckUrl(e.target.value, initialData?.tempId, initialData?.mainId)} 
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="sector"
              label="Startup Sector"
              rules={[{ required: true, message: "Sector is required" }]}
            >
              <Select placeholder="--Select Sector--" allowClear>
                <Option value="Artificial Intelligence">Artificial Intelligence</Option>
                <Option value="Astrology">Astrology</Option>
                <Option value="AstroTech">AstroTech</Option>
                <Option value="Career and Recruitment">Career and Recruitment</Option>
                <Option value="CleanTech">CleanTech</Option>
                <Option value="Cybersecurity">Cybersecurity</Option>
                <Option value="EdTech">EdTech</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="Finance">Finance</Option>
                <Option value="FinTech">FinTech</Option>
                <Option value="Foods and Beverages">Foods and Beverages</Option>
                <Option value="GenAI">GenAI</Option>
                <Option value="HealthTech">HealthTech</Option>
                <Option value="Healthy Snacking">Healthy Snacking</Option>
                <Option value="HRTech">HRTech</Option>
                <Option value="Other">Other</Option>
                <Option value="PetCare">PetCare</Option>
                <Option value="SpiritualTech">SpiritualTech</Option>
                <Option value="Toy Library">Toy Library</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="stage"
              label="Startup Stage"
              rules={[{ required: true, message: "Stage is required" }]}
            >
              <Select placeholder="--Select Stage--" allowClear>
                <Option value="Idea Stage">Idea Stage</Option>
                <Option value="MVP Stage">MVP Stage</Option>
                <Option value="Pre-Seed">Pre-Seed</Option>
                <Option value="Seed">Seed</Option>
                <Option value="Early Revenue/ Seed">Early Revenue/ Seed</Option>
                <Option value="Growth Stage">Growth Stage</Option>
                <Option value="Pre-Series A">Pre-Series A</Option>
                <Option value="Series A+">Series A+</Option>
                <Option value="Profitable / Mature">Profitable / Mature</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="indicativePriceRange"
              label="Indicative Price Range"
              rules={[{ required: true, message: "Price Range is required" }]}
            >
              <Input placeholder="e.g., ₹500 - ₹1000 per share" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              name="instrumentType"
              label="Instrument Type"
              rules={[{ required: true, message: "Instrument Type is required" }]}
            >
              <Select placeholder="Select Type" allowClear>
                <Option value="Equity Shares">Equity Shares</Option>
                <Option value="CCPS">CCPS</Option>
                <Option value="Warrants">Warrants</Option>
                <Option value="Convertible Notes">Convertible Notes</Option>
                <Option value="ESOPs">ESOPs</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="website" label="Website URL">
              <Input placeholder="https://" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="linkedIn" label="LinkedIn URL">
              <Input placeholder="https://linkedin.com/..." />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              name="startupDescription"
              label="Startup Description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextArea rows={4} placeholder="Enter description..." />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              name="founderInformation"
              label="Founder Information"
              rules={[{ required: true, message: "Founder Info is required" }]}
            >
              <TextArea rows={3} placeholder="Enter founder details..." />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.List name="newsArticles">
              {(fields, { add, remove }) => (
                <>
                  <label className="form-label mb-2 fs-5">Media Coverage (News Articles)</label>
                  {fields.map((field, index) => (
                    <div key={field.key} style={{ marginBottom: 16, border: '1px solid #d9d9d9', padding: 16, borderRadius: 8, position: 'relative' }}>
                      <Button 
                        type="text" 
                        danger 
                        icon={<MinusCircleOutlined />} 
                        onClick={() => remove(field.name)}
                        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                      />
                      
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Item
                            {...field}
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            label={`Media Title ${index + 1}`}
                            rules={[{ required: true, message: 'Missing media title' }]}
                          >
                            <Input placeholder="Article Name" />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            {...field}
                            name={[field.name, 'url']}
                            fieldKey={[field.fieldKey, 'url']}
                            label={`Media Link ${index + 1}`}
                            rules={[
                              { required: true, message: 'Missing media link' },
                              { type: 'url', message: 'Invalid URL' }
                            ]}
                          >
                            <Input placeholder="https://..." />
                          </Form.Item>
                        </div>

                        <div className="col-md-12">
                          <Form.Item
                            {...field}
                            name={[field.name, 'description']}
                            fieldKey={[field.fieldKey, 'description']}
                            label="Description"
                            rules={[{ required: true, message: 'Missing description' }]}
                          >
                            <TextArea rows={2} placeholder="Short description of the coverage..." />
                          </Form.Item>
                        </div>

                        <div className="col-md-12">
                          <Form.Item
                            label="Media Image"
                            required
                          >
                            <Upload
                              name="file"
                              action={`${process.env.REACT_APP_BASE_URL}api/admin/OpportunitiesAdmin/upload_logo`}
                              showUploadList={false}
                              onChange={(info) => {
                                if (info.file.status === 'done') {
                                  const response = info.file.response;
                                  if (response && String(response.status) === "1") {
                                    message.success("Media image uploaded successfully");
                                    const formValues = form.getFieldsValue();
                                    if (!formValues.newsArticles[field.name]) {
                                      formValues.newsArticles[field.name] = {};
                                    }
                                    formValues.newsArticles[field.name].imgname = response.data.filename;
                                    form.setFieldsValue(formValues);
                                  } else {
                                    message.error("Upload failed");
                                  }
                                } else if (info.file.status === 'error') {
                                  message.error("Upload failed");
                                }
                              }}
                              accept="image/*"
                            >
                              <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                            
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) => 
                                prevValues.newsArticles?.[field.name]?.imgname !== currentValues.newsArticles?.[field.name]?.imgname
                              }
                            >
                              {({ getFieldValue }) => {
                                const imgName = getFieldValue(['newsArticles', field.name, 'imgname']);
                                return (
                                  <>
                                    <Form.Item 
                                      name={[field.name, 'imgname']} 
                                      rules={[{ required: true, message: 'Missing media image' }]}
                                      style={{ margin: 0 }}
                                    >
                                      <Input style={{ display: 'none' }} />
                                    </Form.Item>
                                    {imgName ? (
                                      <div className="mt-2">
                                        <img 
                                          src={`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${imgName}`} 
                                          alt="Snapshot" 
                                          style={{ height: 60, objectFit: 'contain' }} 
                                        />
                                      </div>
                                    ) : null}
                                  </>
                                );
                              }}
                            </Form.Item>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add({title: "", description: "", url: "", imgname: ""})} block icon={<PlusOutlined />}>
                      Add Media Coverage
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div className="col-md-6">
            <Form.List name="socialMediaLinks">
              {(fields, { add, remove }) => (
                <>
                  <label className="form-label mb-2">Social Media Links</label>
                  {fields.map((field) => (
                    <Form.Item required={false} key={field.key} style={{ marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          { type: 'url', message: 'Invalid URL' }
                        ]}
                        noStyle
                      >
                        <Input placeholder="Social Media URL" style={{ width: '85%', marginRight: 8 }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ color: 'red', cursor: 'pointer' }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Social Link
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

        </div>
      </Form>
    </Modal>
  );
};

export default OpportunityFormModal;
