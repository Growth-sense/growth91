import React, { Component } from "react";
import ThemeSelector from "../../components/ThemeSelector";
import Bridge from "../../constants/Bridge";

class ThemeStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: 'default',
      loading: false
    };
  }

  componentDidMount() {
    this.loadCurrentTheme();
  }

  // Load current theme from backend
  loadCurrentTheme = async () => {
    try {
      this.setState({ loading: true });
      const result = await Bridge.Unicorn.getUnicornTheme({
        tudTempUdID: this.props.unicorn.tudTempUdID
      });
      
      if (result.status === '1' && result.data && result.data.theme) {
        this.setState({ currentTheme: result.data.theme });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  // Handle theme change from ThemeSelector
  handleThemeChange = (newTheme) => {
    this.setState({ currentTheme: newTheme });
  };

  // Navigation handlers similar to other founder forms
  next = () => {
    if (this.props.next) {
      this.props.next();
    }
  };

  prev = () => {
    if (this.props.prev) {
      this.props.prev();
    }
  };

  render() {
    let active = false;
    return (
       <section className="StepForm-section" style={{ display: "block" }}>
      <div className="form-group">
        <div className="form-group">
          <div className="row">
            <div className="col-md-12">
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  backgroundColor: "white",
                  zIndex: 4,
                  position: "relative",
                  paddingRight: 10,
                }}
              >
                Choose Your Theme
              </span>
            </div>
            <hr />
          </div>
        </div>
        
        <ThemeSelector
          tudTempUdID={this.props.unicorn.tudTempUdID}
          currentTheme={this.state.currentTheme}
          onThemeChange={this.handleThemeChange}
          showPreview={false}
          compact={false}
        />

        <div className="form-group mt-4">
          <p style={{ color: '#666', fontSize: '14px' }}>
            <strong>Note:</strong> The selected theme will apply to your Future Unicorn page sections including About, Team, Contact, and action buttons.
          </p>
        </div>

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
      </div>
      </section>
    );
  }
}

export default ThemeStep;
