import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the updated CSS file

function App() {
  const [formData, setFormData] = useState({
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );
      setResult(response.data.loan_status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Loan Approval Prediction</h1>
        <form onSubmit={handleSubmit}>
          {/* Education Dropdown */}
          <div className="form-group">
            <label htmlFor="Education">Education</label>
            <select
              id="Education"
              name="Education"
              value={formData.Education}
              onChange={handleChange}
              required
            >
              <option value="">Select Education</option>
              <option value="Graduate">Graduate</option>
              <option value="Not Graduate">Not Graduate</option>
            </select>
          </div>

          {/* Self Employed Dropdown */}
          <div className="form-group">
            <label htmlFor="Self_Employed">Self Employed</label>
            <select
              id="Self_Employed"
              name="Self_Employed"
              value={formData.Self_Employed}
              onChange={handleChange}
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Applicant Income Input */}
          <div className="form-group">
            <label htmlFor="ApplicantIncome">Applicant Income</label>
            <input
              type="number"
              id="ApplicantIncome"
              name="ApplicantIncome"
              placeholder="Enter your income"
              value={formData.ApplicantIncome}
              onChange={handleChange}
              required
            />
          </div>

          {/* Loan Amount Input */}
          <div className="form-group">
            <label htmlFor="LoanAmount">Loan Amount</label>
            <input
              type="number"
              id="LoanAmount"
              name="LoanAmount"
              placeholder="Enter loan amount"
              value={formData.LoanAmount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Loan Amount Term Input */}
          <div className="form-group">
            <label htmlFor="Loan_Amount_Term">Loan Term (in months)</label>
            <input
              type="number"
              id="Loan_Amount_Term"
              name="Loan_Amount_Term"
              placeholder="Enter loan term in months"
              value={formData.Loan_Amount_Term}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credit History Dropdown */}
          <div className="form-group">
            <label htmlFor="Credit_History">Credit History</label>
            <select
              id="Credit_History"
              name="Credit_History"
              value={formData.Credit_History}
              onChange={handleChange}
              required
            >
              <option value="">Select Credit History</option>
              <option value="1">Good (1)</option>
              <option value="0">Bad (0)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Predict
          </button>
        </form>

        {/* Result Display */}
        {result && (
          <div className="result">
            <strong>Loan Status: {result}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
