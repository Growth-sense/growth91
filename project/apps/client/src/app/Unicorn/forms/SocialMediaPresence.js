import React, { Component } from 'react';
import { message, Spin } from 'antd';
import $ from 'jquery';
import Bridge from '../../constants/Bridge';

class SocialMediaPresence extends Component {

  constructor(props) {
    super(props);
    this.state = {
      founder_id: '',
      loading: false,
      valueispresent: false,
      processtype: '',
      errors: {}, // To hold validation errors
    };
  }

  componentDidMount() {
    const founderId = localStorage.getItem('founder_id');
    if (founderId) {
      this.setState({ founder_id: founderId });
      this.getData(founderId);
    }
    $('#selected-field').focus();
    this.props.check();
  }

  getData = (id) => {
    let params = {
      founder_id: id
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status === 1) {
        const data = result.data[0];
        this.props.onInput('linkdin', data.linkdin || '');
        this.props.onInput('facebook', data.facebook || '');
        this.props.onInput('instagram', data.instagram || '');
        this.props.onInput('youtube', data.youtube || '');
        this.props.onInput('others', data.others || '');
        this.setState({ valueispresent: !!data.linkdin });
      } 
    });
  }

  // Handle input changes and clear corresponding errors
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      errors: { ...prevState.errors, [name]: '' }, // Clear the error for this field
    }));
    
    // Call the onInput prop to update parent state
    if (this.props.onInput) {
      this.props.onInput(name, value);
    }
  }

  // Validation function
  validateSocialMediaLinks = () => {
    const { linkdin, facebook, instagram, youtube, others } = this.props.unicorn;
    const errors = {};

    // Validation patterns
    const validationPatterns = {
      linkdin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
      facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-z0-9_.-]+\/?$/,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[A-z0-9_.-]+\/?$/,
      youtube: /^https?:\/\/(www\.)?youtube\.com\/(channel\/[A-z0-9_-]+|user\/[A-z0-9_-]+|c\/[A-z0-9_-]+)\/?$/,
      others: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/, // General URL pattern
    };

    // Validate LinkedIn
    if (linkdin && !validationPatterns.linkdin.test(linkdin)) {
      errors.linkdin = 'Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)';
    }

    // Validate Facebook
    if (facebook && !validationPatterns.facebook.test(facebook)) {
      errors.facebook = 'Please enter a valid Facebook URL (e.g., https://www.facebook.com/username)';
    }

    // Validate Instagram
    if (instagram && !validationPatterns.instagram.test(instagram)) {
      errors.instagram = 'Please enter a valid Instagram URL (e.g., https://www.instagram.com/username)';
    }

    // Validate YouTube
    if (youtube && !validationPatterns.youtube.test(youtube)) {
      errors.youtube = 'Please enter a valid YouTube URL (e.g., https://www.youtube.com/channel/CHANNEL_ID)';
    }

    // Validate Others
    if (others && !validationPatterns.others.test(others)) {
      errors.others = 'Please enter a valid URL.';
    }

    this.setState({ errors });

    // Return true if no errors
    return Object.keys(errors).length === 0;
  }

  updatefounder = () => {
    // Perform validation before proceeding
    if (!this.validateSocialMediaLinks()) {
      message.warning('Please correct the errors in the form.', 6);
      return;
    }

    if (this.props.adminnext) {
      if (this.state.processtype === "next") {
        this.props.next();
        return;
      } else if (this.state.processtype === "prev") {
        this.props.prev();
        return;
      }
    }

    const params = {
      linkdin: this.props.unicorn.linkdin,
      facebook: this.props.unicorn.facebook,
      instagram: this.props.unicorn.instagram,
      youtube: this.props.unicorn.youtube,
      others: this.props.unicorn.others,
      founder_id: this.state.founder_id,
      no: 9,
      main_founder_id: this.state.founder_id, // Assuming main_founder_id is same as founder_id
      f9_status: this.state.processtype === 'saveandproceed' ? 'success' : 'new',
    };

    // Merge unicorn data with params
    const payload = { ...this.props.unicorn, ...params };

    console.log('Payload being sent to API:', payload); // Debugging line

    this.setState({ loading: true });

    Bridge.Unicorn.editunicorndraft(payload).then((result) => { // Pass the merged payload
      console.log('API Response:', result); // Debugging line
      if (result.status === 1) {
        this.setState({ loading: false, valueispresent: true });
        if (this.state.processtype === 'next') {
          this.props.next();
        } else if (this.state.processtype === 'prev') {
          this.props.prev();
        } else if (this.state.processtype === 'saveandproceed') {
          this.props.activate();
          message.success('Social media details are updated successfully.', 6);
        } else {
          message.success('Social media details are updated successfully.', 6);
        }
      } else {
        message.warning(result.message || 'Failed to update social media details.', 6);
        this.setState({ loading: false });
      }
    }).catch((error) => {
      console.error('API Error:', error); // Debugging line
      message.error('An unexpected error occurred while updating. Please try again.', 6);
      this.setState({ loading: false });
    });
  }

  saveandproceed = () => {
    this.setState({ processtype: 'saveandproceed' }, () => this.updatefounder());
  }

  save = () => {
    this.setState({ processtype: 'save' }, () => this.updatefounder());
  }

  next = () => {
    this.setState({ processtype: 'next' }, () => this.updatefounder());
  }

  prev = () => {
    this.setState({ processtype: 'prev' }, () => this.updatefounder());
  }

  render() {
    const { linkdin, facebook, instagram, youtube, others } = this.props.unicorn;
    const { errors, loading } = this.state;

    return (
      <div>
        <section className="StepForm-section" style={{ display: "block" }}>
          <Spin spinning={loading}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="line-seperator">
                    <div style={{
                      position: 'absolute',
                      top: -10,
                      background: '#fff',
                      paddingRight: 16,
                    }}>
                      <span
                        style={{
                          background: '#fff',
                          width: 119,
                          height: 20,
                          zIndex: 4,
                          position: 'relative',
                          paddingRight: 10,
                        }}
                      >Social Media Presence</span>
                    </div>
                    <hr />
                  </div>

                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      {/* LinkedIn */}
                      <div className="form-group">
                        <label htmlFor="linkdin">LinkedIn</label>
                        <input
                          type="url"
                          name='linkdin'
                          id="linkdin"
                          value={linkdin}
                          onChange={this.handleInputChange}
                          className={`form-control ${errors.linkdin ? 'is-invalid' : ''}`}
                          placeholder="https://www.linkedin.com/in/username"
                        />
                        {errors.linkdin && <div className="invalid-feedback">{errors.linkdin}</div>}
                      </div>

                      {/* Facebook */}
                      <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <input
                          type="url"
                          name='facebook'
                          id="facebook"
                          value={facebook}
                          onChange={this.handleInputChange}
                          className={`form-control ${errors.facebook ? 'is-invalid' : ''}`}
                          placeholder="https://www.facebook.com/username"
                        />
                        {errors.facebook && <div className="invalid-feedback">{errors.facebook}</div>}
                      </div>

                      {/* Instagram */}
                      <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                          type="url"
                          name='instagram'
                          id="instagram"
                          value={instagram}
                          onChange={this.handleInputChange}
                          className={`form-control ${errors.instagram ? 'is-invalid' : ''}`}
                          placeholder="https://www.instagram.com/username"
                        />
                        {errors.instagram && <div className="invalid-feedback">{errors.instagram}</div>}
                      </div>

                      {/* YouTube */}
                      <div className="form-group">
                        <label htmlFor="youtube">YouTube</label>
                        <input
                          type="url"
                          name='youtube'
                          id="youtube"
                          value={youtube}
                          onChange={this.handleInputChange}
                          className={`form-control ${errors.youtube ? 'is-invalid' : ''}`}
                          placeholder="https://www.youtube.com/channel/CHANNEL_ID"
                        />
                        {errors.youtube && <div className="invalid-feedback">{errors.youtube}</div>}
                      </div>

                      {/* Others */}
                      <div className="form-group">
                        <label htmlFor="others">Others</label>
                        <input
                          type="url"
                          name='others'
                          id="others"
                          value={others}
                          onChange={this.handleInputChange}
                          className={`form-control ${errors.others ? 'is-invalid' : ''}`}
                          placeholder="https://www.example.com"
                        />
                        {errors.others && <div className="invalid-feedback">{errors.others}</div>}
                      </div>

                      {/* Navigation Buttons */}
                     
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Spin>
        </section>
      </div>
    );
  }
}

export default SocialMediaPresence;
