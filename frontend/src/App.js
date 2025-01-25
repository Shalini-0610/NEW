
//Frontend React Code: `frontend/src/App.js`

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div>
      <h1>Payment Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Feature 1:
          <input
            type="text"
            name="feature1"
            placeholder="Enter feature 1"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Feature 2:
          <input
            type="text"
            name="feature2"
            placeholder="Enter feature 2"
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <div>
          <h2>Prediction Result</h2>
          <p>The predicted outcome is: {prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;