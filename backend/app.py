import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
from fastapi import FastAPI, HTTPException

def create_app():
    app = FastAPI()

    model = joblib.load("model.pkl")

    @app.post("/predict")
    def predict_payment(data: dict):
        """Predict payment outcomes based on input data."""
        try:
            df = pd.DataFrame([data])
            df = pd.get_dummies(df, drop_first=True)
            prediction = model.predict(df)
            return {"prediction": int(prediction[0])}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    return app

# Run the FastAPI app only for production.
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:create_app", host="0.0.0.0", port=8000, reload=True)
