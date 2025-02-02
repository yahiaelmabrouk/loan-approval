# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import joblib
# import numpy as np
# from fastapi.middleware.cors import CORSMiddleware

# # Initialize FastAPI app
# app = FastAPI()

# # Enable CORS for frontend connection
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Consider restricting to specific domains for security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load Model and Encoders
# try:
#     model = joblib.load("./backend/loan_model.pkl")  # Ensure correct path
#     label_encoders = joblib.load("./backend/label_encoders.pkl")
#     print("Encoders Loaded:", label_encoders.keys())
# except Exception as e:
#     print("Error loading model or encoders:", str(e))

# # Define Input Schema
# class LoanData(BaseModel):
#     Education: str
#     Self_Employed: str
#     ApplicantIncome: float
#     LoanAmount: float
#     Loan_Amount_Term: float
#     Credit_History: float

# @app.post("/predict")
# async def predict(data: LoanData):
#     try:
#         # Transform categorical inputs using the encoders
#         education_encoded = label_encoders["education"].transform([data.Education])[0]
#         self_employed_encoded = label_encoders["self_employed"].transform([data.Self_Employed])[0]

#         # Convert input data into model format
#         input_data = np.array([
#             education_encoded,
#             self_employed_encoded,
#             data.ApplicantIncome,
#             data.LoanAmount,
#             data.Loan_Amount_Term,
#             data.Credit_History
#         ]).reshape(1, -1)

#         # Predict
#         prediction = model.predict(input_data)[0]

#         # Convert numerical prediction back to label
#         if "loan_status" in label_encoders:
#             prediction_label = label_encoders["loan_status"].inverse_transform([prediction])[0]
#         else:
#             prediction_label = str(prediction)  # If encoder missing, return raw prediction

#         return {"loan_status": prediction_label}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Prediction Error: {str(e)}")
