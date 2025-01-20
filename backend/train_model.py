import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load Dataset
data = pd.read_csv('./../dataset/dataset.csv')  # Replace with your dataset file
data.columns = data.columns.str.strip()  # Strip any extra spaces

# Handle Missing Data (Imputation)
data['no_of_dependents'].fillna(data['no_of_dependents'].mode()[0], inplace=True)  # Categorical column
data['education'].fillna(data['education'].mode()[0], inplace=True)  # Categorical column
data['self_employed'].fillna(data['self_employed'].mode()[0], inplace=True)  # Categorical column

# Numerical Columns Imputation (Median)
num_cols = ['income_annum', 'loan_amount', 'loan_term', 'cibil_score', 
            'residential_assets_value', 'commercial_assets_value', 
            'luxury_assets_value', 'bank_asset_value']
for col in num_cols:
    data[col].fillna(data[col].median(), inplace=True)

# Preprocessing (Encoding categorical columns)
label_encoders = {}
for col in ['education', 'self_employed', 'loan_status']:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le

# Features and Target
X = data[['no_of_dependents', 'education', 'self_employed', 'income_annum', 
          'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
          'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value']]
y = data['loan_status']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate Model
predictions = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))

# Save Model and Encoders
joblib.dump(model, './backend/loan_model.pkl')
joblib.dump(label_encoders, './backend/label_encoders.pkl')
