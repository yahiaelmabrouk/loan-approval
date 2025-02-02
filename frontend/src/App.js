import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Paper, Typography } from "@mui/material";
import "./App.css"; // Import the CSS file

export default function App() {
  const [formData, setFormData] = useState({
    no_of_dependents: "",
    education: "Graduate",
    self_employed: "No",
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: "",
  });
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setResult(response.data.loan_status);
      setOpen(true);
    } catch (error) {
      console.error("Prediction Error: ", error);
    }
  };

  return (
    <div className="container">
      <Paper elevation={3} className="card">
        <Typography variant="h5" className="form-title">
          Loan Prediction Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>No. of Dependents</label>
            <input
              name="no_of_dependents"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Education</label>
            <select name="education" onChange={handleChange}>
              <option value="Graduate">Graduate</option>
              <option value="Not Graduate">Not Graduate</option>
            </select>
          </div>

          <div className="form-group">
            <label>Self Employed</label>
            <select name="self_employed" onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Annual Income</label>
            <input
              name="income_annum"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Loan Amount</label>
            <input
              name="loan_amount"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Loan Term</label>
            <input
              name="loan_term"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CIBIL Score</label>
            <input
              name="cibil_score"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Residential Assets Value</label>
            <input
              name="residential_assets_value"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Commercial Assets Value</label>
            <input
              name="commercial_assets_value"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Luxury Assets Value</label>
            <input
              name="luxury_assets_value"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Bank Asset Value</label>
            <input
              name="bank_asset_value"
              type="number"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Predict
          </button>
        </form>
      </Paper>

      {/* Modal for Prediction Result */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-container">
          <Typography variant="h6">Prediction Result</Typography>
          <Typography>
            Loan Status: <strong>{result}</strong>
          </Typography>
          <button onClick={() => setOpen(false)} className="close-btn">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
