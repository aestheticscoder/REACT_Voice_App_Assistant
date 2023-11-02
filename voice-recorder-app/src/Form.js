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

      // Validation for First Name
      if (
        formData.firstName === "" ||
        !/^[a-zA-Z]+$/.test(formData.firstName)
      ) {
        throw new Error("First Name is required and can only contain letters.");
      }

      // Validation for Last Name
      if (formData.lastName === "" || !/^[a-zA-Z]+$/.test(formData.lastName)) {
        throw new Error("Last Name is required and can only contain letters.");
      }

      // Validation for State, District, and Village
      if (formData.state === "" || !/^[a-zA-Z\s]+$/.test(formData.state)) {
        throw new Error(
          "State is required and can only contain letters and spaces."
        );
      }
      if (
        formData.district === "" ||
        !/^[a-zA-Z\s]+$/.test(formData.district)
      ) {
        throw new Error(
          "District is required and can only contain letters and spaces."
        );
      }
      if (formData.village === "" || !/^[a-zA-Z\s]+$/.test(formData.village)) {
        throw new Error(
          "Village is required and can only contain letters and spaces."
        );
      }

      // Validation for PAN Number
      if (
        formData.panNumber === "" ||
        !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
      ) {
        throw new Error(
          "PAN Number is required and must match the format: ABCDE1234F."
        );
      }

      // Validation for Aadhaar Number
      if (
        formData.aadhaarNumber === "" ||
        !/^[0-9]{12}$/.test(formData.aadhaarNumber)
      ) {
        throw new Error(
          "Aadhaar Number is required and must be a 12-digit number."
        );
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
