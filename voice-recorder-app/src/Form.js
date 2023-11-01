// Form.js
import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      state: "",
      district: "",
      village: "",
      panNumber: "",
      aadhaarNumber: "",
      isRecording: false,
      recognizedText: "",
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  startRecording = () => {
    this.props.startListening();
    this.setState({ isRecording: true, error: null });
  };

  stopRecording = () => {
    this.props.stopListening();
    this.setState({ isRecording: false });
    const { finalTranscript } = this.props;
    this.setState({ recognizedText: finalTranscript });
  };

  handleSubmit = async () => {
    try {
      const formData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        state: this.state.state,
        district: this.state.district,
        village: this.state.village,
        panNumber: this.state.panNumber,
        aadhaarNumber: this.state.aadhaarNumber,
        recognizedText: this.state.recognizedText,
      };

      // Basic error handling for required fields
      if (formData.firstName === "" || formData.state === "") {
        throw new Error("First Name and State are required fields.");
      }
      if (formData.district === "" || formData.village === "") {
        throw new Error("District Name and Village name are required fields.");
      }
      if (formData.panNumber === "") {
        throw new Error("PAN Number is required.");
      }

      if (formData.aadhaarNumber === "") {
        throw new Error("Aadhaar Number is required.");
      }
      // Simulate a form submission (replace with your actual submission logic)
      // You can use Axios or fetch to make a real API call here

      // Reset form fields after successful submission
      this.setState({
        firstName: "",
        lastName: "",
        state: "",
        district: "",
        village: "",
        panNumber: "",
        aadhaarNumber: "",
        recognizedText: "",
        error: null,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={this.state.state}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={this.state.district}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Village:</label>
          <input
            type="text"
            name="village"
            value={this.state.village}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNumber"
            value={this.state.panNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Aadhaar Number:</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={this.state.aadhaarNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.startRecording}>Start Recording</button>
        <button onClick={this.stopRecording}>Stop Recording</button>
        <div>
          <p>Recognized Text:</p>
          {this.state.recognizedText}
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const options = {
  autoStart: false,
};

export default SpeechRecognition(options)(Form);
