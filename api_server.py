import numpy as np
import pandas as pd
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
import os
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Global variables for model and scaler
model = None
scaler = None
dataset = None
dataset_scaled = None
time_step = 10
model_path = 'lstm_model.h5'
training_complete = False

def train_or_load_model():
    """Train the LSTM model or load existing one"""
    global model, scaler, dataset, dataset_scaled, training_complete

    try:
        print("\n" + "="*50)
        print("INITIALIZING LSTM MODEL")
        print("="*50)

        # Load dataset
        print("Loading sunspots.csv...")
        if not os.path.exists("sunspots.csv"):
            raise FileNotFoundError("sunspots.csv not found in project directory")

        data = pd.read_csv("sunspots.csv")
        dataset = data[['Sunspots']].values
        print(f"✓ Dataset loaded: {len(dataset)} data points")

        # Normalize the data
        print("Normalizing data...")
        scaler = MinMaxScaler(feature_range=(0, 1))
        dataset_scaled = scaler.fit_transform(dataset)
        print("✓ Data normalized")

        # Check if model exists
        if os.path.exists(model_path):
            print(f"\nLoading existing model from {model_path}...")
            model = load_model(model_path)
            print("✓ Model loaded successfully")
        else:
            print("\nTraining new LSTM model...")
            print("This may take 1-2 minutes on first run...")

            # Create dataset
            X, y = create_dataset(dataset_scaled, time_step)
            X = X.reshape(X.shape[0], X.shape[1], 1)
            print(f"✓ Training data prepared: {X.shape[0]} sequences")

            # Build and train model
            print("\nBuilding LSTM architecture...")
            model = Sequential()
            model.add(LSTM(50, return_sequences=True, input_shape=(time_step, 1)))
            model.add(LSTM(50))
            model.add(Dense(1))
            model.compile(loss='mean_squared_error', optimizer='adam')
            print("✓ Model architecture built")

            print("\nTraining model (10 epochs)...")
            history = model.fit(X, y, epochs=10, batch_size=32, verbose=1)
            print("✓ Model training complete")

            # Save model
            print(f"\nSaving model to {model_path}...")
            model.save(model_path)
            print(f"✓ Model saved successfully")

        training_complete = True
        print("\n" + "="*50)
        print("✓ LSTM MODEL READY")
        print("="*50 + "\n")
        return True

    except Exception as e:
        print(f"\n❌ ERROR during model initialization: {str(e)}")
        print("="*50 + "\n")
        training_complete = False
        return False

def create_dataset(dataset, look_back=10):
    """Create sequences for LSTM training"""
    X, y = [], []
    for i in range(len(dataset) - look_back - 1):
        X.append(dataset[i:(i + look_back), 0])
        y.append(dataset[i + look_back, 0])
    return np.array(X), np.array(y)

@app.route('/api/data', methods=['GET'])
def get_data():
    """Get historical and current predictions"""
    global model, scaler, dataset_scaled, training_complete

    try:
        if not training_complete or model is None:
            return jsonify({
                'status': 'error',
                'message': 'Model is still training or not initialized. Please wait...'
            }), 503

        # Create dataset for predictions
        X, y = create_dataset(dataset_scaled, time_step)
        X = X.reshape(X.shape[0], X.shape[1], 1)

        # Get predictions
        predictions = model.predict(X, verbose=0)
        predictions = scaler.inverse_transform(predictions.reshape(-1, 1))
        actual = scaler.inverse_transform(y.reshape(-1, 1))

        # Prepare data for frontend
        data = []
        for i in range(len(actual)):
            data.append({
                'month': f'M{i + time_step + 1}',
                'actual': float(actual[i][0]),
                'predicted': float(predictions[i][0])
            })

        return jsonify({
            'status': 'success',
            'data': data,
            'historicalPoints': len(actual)
        })
    except Exception as e:
        print(f"Error in /api/data: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict_future():
    """Generate future predictions for specified horizon"""
    global model, scaler, dataset_scaled, training_complete

    try:
        if not training_complete or model is None:
            return jsonify({
                'status': 'error',
                'message': 'Model is still training. Please wait...'
            }), 503

        # Get horizon from request
        horizon = request.json.get('horizon', 10)
        horizon = min(max(int(horizon), 1), 30)  # Clamp between 1-30

        # Get the last sequence from the dataset
        last_sequence = dataset_scaled[-time_step:]
        last_sequence = last_sequence.reshape(1, time_step, 1)

        # Generate future predictions
        future_predictions = []
        temp_sequence = last_sequence.copy()

        for _ in range(horizon):
            next_pred = model.predict(temp_sequence, verbose=0)
            future_predictions.append(next_pred[0, 0])

            # Update sequence for next prediction
            next_pred_reshaped = next_pred.reshape(1, 1, 1)
            temp_sequence = np.concatenate((temp_sequence[:, 1:, :], next_pred_reshaped), axis=1)

        # Convert back to original scale
        future_predictions = scaler.inverse_transform(
            np.array(future_predictions).reshape(-1, 1)
        )

        # Prepare response
        data = []
        for i in range(len(future_predictions)):
            data.append({
                'horizon': i + 1,
                'prediction': float(future_predictions[i][0])
            })

        return jsonify({
            'status': 'success',
            'horizon': horizon,
            'predictions': data
        })
    except Exception as e:
        print(f"Error in /api/predict: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Get model information and statistics"""
    global model, scaler, dataset_scaled, training_complete

    try:
        if not training_complete or model is None:
            return jsonify({
                'status': 'error',
                'message': 'Model is still training. Please wait...'
            }), 503

        # Calculate some stats
        X, y = create_dataset(dataset_scaled, time_step)
        X = X.reshape(X.shape[0], X.shape[1], 1)

        predictions = model.predict(X, verbose=0)
        predictions = scaler.inverse_transform(predictions.reshape(-1, 1))
        actual = scaler.inverse_transform(y.reshape(-1, 1))

        # Calculate MSE
        mse = np.mean((predictions - actual) ** 2)

        # Calculate accuracy (as percentage of correct trend prediction)
        actual_trends = np.diff(actual.flatten()) > 0
        predicted_trends = np.diff(predictions.flatten()) > 0
        accuracy = np.mean(actual_trends == predicted_trends) * 100

        return jsonify({
            'status': 'success',
            'modelType': 'LSTM',
            'layers': 2,
            'units': 50,
            'sequenceLength': time_step,
            'trainingEpochs': 10,
            'batchSize': 32,
            'mse': float(mse),
            'accuracy': float(accuracy),
            'totalDataPoints': len(dataset_scaled)
        })
    except Exception as e:
        print(f"Error in /api/model-info: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    global training_complete
    return jsonify({
        'status': 'healthy',
        'service': 'Solar Flare Prediction API',
        'model_ready': training_complete
    })

if __name__ == '__main__':
    # Train or load model on startup
    print("\n")
    print("╔" + "="*60 + "╗")
    print("║" + " "*60 + "║")
    print("║" + "  SOLAR FLARE PREDICTION - FLASK API SERVER".center(60) + "║")
    print("║" + " "*60 + "║")
    print("╚" + "="*60 + "╝")
    print()

    success = train_or_load_model()

    if success:
        print("="*60)
        print("🚀 Starting Flask API server...")
        print("📍 API running on: http://localhost:5000")
        print("📊 Available endpoints:")
        print("   - GET  /api/health          (Check server status)")
        print("   - GET  /api/data            (Get historical data)")
        print("   - POST /api/predict         (Generate predictions)")
        print("   - GET  /api/model-info      (Get model statistics)")
        print("="*60)
        print()
        app.run(debug=False, port=5000, use_reloader=False)
    else:
        print("\n❌ Failed to initialize model. Exiting.")
        exit(1)
