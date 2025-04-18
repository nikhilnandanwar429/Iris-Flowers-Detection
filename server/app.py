from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
from dotenv import load_dotenv  # Add this

load_dotenv()  # Load environment variables from .env

model = pickle.load(open('iri.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.form
        arr = np.array([
            [float(data['a']), float(data['b']), 
            float(data['c']), float(data['d'])]
        ])
        pred = model.predict(arr)
        return jsonify({'prediction': int(pred[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))  # Get PORT from environment variable
    app.run(host='0.0.0.0', port=port, debug=False)  # Disable debug mode