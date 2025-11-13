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

  render() {
    return (
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
      </div>
    );
  }
}

export default ThemeStep;
