import React, { useState } from 'react';

const PredictForm = () => {
  const [inputs, setInputs] = useState({ 
    sepal_length: '', 
    sepal_width: '', 
    petal_length: '', 
    petal_width: '' 
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const classNames = ['Iris Setosa', 'Iris Versicolor', 'Iris Virginica'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    //fetch(import.meta.env.VITE_API_URL + '/predict',
    
    try {
      const response = await fetch('https://iris-flowers-detection.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sepal_length: parseFloat(inputs.sepal_length),
          sepal_width: parseFloat(inputs.sepal_width),
          petal_length: parseFloat(inputs.petal_length),
          petal_width: parseFloat(inputs.petal_width)
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="predict-form">
      <h2>Iris Species Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sepal Length (cm)</label>
          <input
            type="number"
            step="0.1"
            name="sepal_length"
            placeholder="5.1"
            value={inputs.sepal_length}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Sepal Width (cm)</label>
          <input
            type="number"
            step="0.1"
            name="sepal_width"
            placeholder="3.5"
            value={inputs.sepal_width}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Petal Length (cm)</label>
          <input
            type="number"
            step="0.1"
            name="petal_length"
            placeholder="1.4"
            value={inputs.petal_length}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Petal Width (cm)</label>
          <input
            type="number"
            step="0.1"
            name="petal_width"
            placeholder="0.2"
            value={inputs.petal_width}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Species'}
        </button>
      </form>

      {error && <div className="error-message">Error: {error}</div>}

      {result && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>Species: <strong>{result.species}</strong></p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <div className="probability-distribution">
            <h4>Probabilities:</h4>
            {Object.entries(result.probabilities).map(([species, prob]) => (
              <div key={species}>
                {species}: {(prob * 100).toFixed(1)}%
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictForm;