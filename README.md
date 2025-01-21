# Loan Approval Prediction System

### Overview

The **Loan Approval Prediction System** uses a machine learning model to predict loan approval based on various input features like income, loan amount, credit score, education, and employment status. The model has achieved an impressive **97.8% accuracy** on the test dataset.

This project integrates a **FastAPI** backend to serve real-time predictions, allowing users to interact with the system via a simple frontend form.

---

### Features

- Predict loan approval status (approved/rejected) based on user input.
- Integrated with a Random Forest Classifier model trained on historical loan data.
- Real-time prediction via **FastAPI** backend and **Axios** for handling HTTP requests.

---

### Technologies Used

- **Frontend**: React, Axios
- **Backend**: FastAPI, Python
- **Machine Learning**: Scikit-learn, Random Forest Classifier
- **Data Serialization**: Pydantic for data validation
- **Model Persistence**: Joblib for saving and loading the trained model
- **CORS**: Middleware for handling cross-origin requests

---

### Model Accuracy

The model achieves an accuracy of **97.8%**, making it highly reliable for loan approval predictions.

---

### Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/loan-approval-prediction.git
   cd loan-approval-prediction
   ```

2. **Frontend Setup**:

   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

3. **Backend Setup**:

   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI server:
     ```bash
     uvicorn main:app --reload
     ```

4. **Model Setup**:
   - Ensure that the **loan_model.pkl** and **label_encoders.pkl** are saved in the backend directory after training the model using `train.py`.

---

### Usage

- Open the frontend in your browser at `http://localhost:3000`.
- Enter the required details (income, loan amount, credit score, etc.) and click "Predict" to receive a loan approval status prediction.

---

### Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

---

### License

This project is licensed under the MIT License.

---

### Contact

For any questions or inquiries, please contact me at yahiamabrouk9@gmail.com.
