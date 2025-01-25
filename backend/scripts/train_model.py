# Backend Training Script: `backend/scripts/train_model.py`

def load_data(file_path):
    """Load and preprocess payment data."""
    data = pd.read_csv(file_path)
    data.fillna(0, inplace=True)
    data = pd.get_dummies(data, drop_first=True)
    return data

def train_model(file_path, model_path):
    """Train a machine learning model for payment prediction."""
    data = load_data(file_path)
    X = data.drop("target", axis=1)
    y = data["target"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:\n", classification_report(y_test, y_pred))

    joblib.dump(model, model_path)

if __name__ == "__main__":
    train_model("../data/data.csv", "../model.pkl")

