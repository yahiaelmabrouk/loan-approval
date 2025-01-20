from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change '*' to specific domain like 'http://localhost:3000' for better security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load Model and Encoders
model = joblib.load("loan_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Input Schema
class LoanData(BaseModel):
    Education: str
    Self_Employed: str
    ApplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float

@app.post("/predict")
async def predict(data: LoanData):
    # Convert input to model format
    input_data = [
        label_encoders['Education'].transform([data.Education])[0],
        label_encoders['Self_Employed'].transform([data.Self_Employed])[0],
        data.ApplicantIncome,
        data.LoanAmount,
        data.Loan_Amount_Term,
        data.Credit_History,
    ]
    input_array = np.array(input_data).reshape(1, -1)

    # Predict
    prediction = model.predict(input_array)[0]
    prediction_label = label_encoders['Loan_Status'].inverse_transform([prediction])[0]

    return {"loan_status": prediction_label}
