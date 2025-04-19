from flask import Flask, jsonify, request
import numpy as np
import pickle
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = Flask(__name__)
CORS(app)

port = int(os.environ.get("PORT", 5000))  # <-- Critical for Render

# Load model
with open('iris.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            data['sepal_length'],
            data['sepal_width'],
            data['petal_length'],
            data['petal_width']
        ]
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)
        probabilities = model.predict_proba(features_array)
        
        # Get class names
        class_names = ['setosa', 'versicolor', 'virginica']
        
        return jsonify({
            'species': class_names[prediction[0]],
            'confidence': float(probabilities[0][prediction[0]]),
            'probabilities': {
                class_names[i]: float(probabilities[0][i]) 
                for i in range(3)
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)