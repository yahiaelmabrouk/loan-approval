import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Loan Approval Prediction</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <input
          type="text"
          name="Education"
          placeholder="Education (Graduate/Not Graduate)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Self_Employed"
          placeholder="Self Employed (Yes/No)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="ApplicantIncome"
          placeholder="Applicant Income"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="LoanAmount"
          placeholder="Loan Amount"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Loan_Amount_Term"
          placeholder="Loan Term (in months)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Credit_History"
          placeholder="Credit History (1/0)"
          onChange={handleChange}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {result && <div style={{ marginTop: "20px" }}>Loan Status: {result}</div>}
    </div>
  );
}

export default App;
