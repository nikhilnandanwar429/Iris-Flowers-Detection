from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

model = pickle.load(open('iri.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS

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
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)
