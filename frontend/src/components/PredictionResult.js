import React from "react";

function PredictionResult({ prediction }) {
  return (
    <div>
      <h2>Prediction Result</h2>
      <p>The predicted outcome is: {prediction}</p>
    </div>
  );
}

export default PredictionResult;
