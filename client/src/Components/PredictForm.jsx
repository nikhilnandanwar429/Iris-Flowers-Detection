import React, { useState } from 'react';

const PredictForm = () => {
  const [inputs, setInputs] = useState({ a: '', b: '', c: '', d: '' });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  // Map prediction index to class name
  const classNames = {
    0: 'Iris Setosa',
    1: 'Iris Versicolor',
    2: 'Iris Virginica'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new URLSearchParams();
    formData.append('a', inputs.a);
    formData.append('b', inputs.b);
    formData.append('c', inputs.c);
    formData.append('d', inputs.d);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        throw new Error(data.error || 'Failed to predict');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" step="0.01" name="a" placeholder="Sepal Length" required 
               onChange={(e) => setInputs({...inputs, a: e.target.value})} />
        <input type="number" step="0.01" name="b" placeholder="Sepal Width" required 
               onChange={(e) => setInputs({...inputs, b: e.target.value})} />
        <input type="number" step="0.01" name="c" placeholder="Petal Length" required 
               onChange={(e) => setInputs({...inputs, c: e.target.value})} />
        <input type="number" step="0.01" name="d" placeholder="Petal Width" required 
               onChange={(e) => setInputs({...inputs, d: e.target.value})} />
        <button type="submit">Predict</button>
      </form>
      {error && <p className="error">{error}</p>}
      {prediction (
        <p>Prediction: {classNames[prediction]}</p>
      )}
    </div>
  );
};

export default PredictForm;