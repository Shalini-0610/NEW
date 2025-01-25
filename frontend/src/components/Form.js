import React, { useState } from "react";
import axios from "axios";

function Form({ setPrediction }) {
  const [formData, setFormData] = useState({});

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
  );
}

export default Form;
