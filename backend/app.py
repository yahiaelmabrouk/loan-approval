from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app) 
# Load Model and Encoders
model = joblib.load('./backend/loan_model.pkl')
label_encoders = joblib.load('./backend/label_encoders.pkl')

# Define Feature Columns
feature_columns = ['no_of_dependents', 'education', 'self_employed', 'income_annum', 
                   'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
                   'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data], columns=feature_columns)
        
        # Encode categorical variables
        for col in ['education', 'self_employed']:
            if col in input_data:
                corrected_value = f" {input_data[col][0]}"
                if corrected_value in label_encoders[col].classes_:
                    input_data[col] = label_encoders[col].transform([corrected_value])
                else:
                    return jsonify({ 'error': f'Invalid value "{input_data[col][0]}" for {col}. Allowed values: {list(label_encoders[col].classes_)}' })
       
       
       
       
        # Ensure numerical values are of correct type
        input_data = input_data.astype(float)
        
        # Make Prediction
        prediction = model.predict(input_data)[0]
        loan_status = label_encoders['loan_status'].inverse_transform([prediction])[0]
        
        return jsonify({'loan_status': loan_status})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
