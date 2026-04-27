# Solar Flare Prediction Web App - Startup Guide

This application uses a Flask API backend (with real LSTM model) and a React frontend.

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup & Startup

### Option 1: Run Both Servers Together (Recommended)

#### Terminal 1 - Flask API Server
```bash
# Install Python dependencies (one time only)
pip install -r requirements.txt

# Start the Flask API server
python api_server.py
```

You should see:
```
Training LSTM model...
Starting Flask API server on http://localhost:5000
```

The first run will train the LSTM model on the sunspots dataset and save it to `lstm_model.h5`. Subsequent runs will load the saved model.

#### Terminal 2 - React Frontend
```bash
# Install dependencies (one time only)
npm install

# Start the development server
npm start
```

This opens http://localhost:3000 in your browser.

---

## How It Works

1. **Flask API** (Port 5000):
   - Trains/loads the LSTM model
   - Serves historical predictions from the trained model
   - Generates future predictions based on the horizon parameter
   - Provides model statistics and performance metrics

2. **React Frontend** (Port 3000):
   - Calls the Flask API to fetch real LSTM predictions
   - Displays historical vs predicted sunspot activity
   - Allows interactive slider to adjust prediction horizon (1-30 months)
   - Shows real-time model predictions in Recharts visualization

---

## Features

### Interactive Prediction Section
- **Slider**: Adjust prediction horizon from 1-30 months
- **Run Prediction**: Calls Flask API to generate real LSTM predictions
- **Chart**: Displays actual historical data (blue line) + predicted future data (purple dashed line)
- **Status**: Shows API connection status and data statistics

### Real LSTM Integration
✅ Loads historical sunspot data from `sunspots.csv`
✅ Trains/loads LSTM neural network
✅ Generates real predictions based on learned patterns
✅ Forecasts solar activity for user-specified horizons
✅ Returns actual model output (not mocked data)

---

## API Endpoints

All endpoints return JSON responses.

### GET `/api/health`
Health check endpoint.

### GET `/api/data`
Returns historical actual vs predicted data.

### POST `/api/predict`
Generates future predictions.

Request body:
```json
{
  "horizon": 10
}
```

Response:
```json
{
  "status": "success",
  "horizon": 10,
  "predictions": [
    {"horizon": 1, "prediction": 45.2},
    ...
  ]
}
```

### GET `/api/model-info`
Returns model statistics (MSE, accuracy, architecture).

---

## Troubleshooting

### "Could not connect to API"
- Ensure Flask server is running on port 5000
- Check that `python api_server.py` is executing in Terminal 1
- Verify no other process is using port 5000

### CORS errors
- CORS is already enabled in Flask app
- Ensure Flask is running before React app loads

### Model training takes time
- First run trains LSTM on the sunspot dataset (~1-2 minutes)
- Subsequent runs load the saved `lstm_model.h5` file (instant)

### "Failed to fetch historical data"
- Check Flask server is running
- Verify `sunspots.csv` is in the project root
- Check console errors in browser DevTools

---

## Project Structure

```
.
├── package.json              # React dependencies
├── requirements.txt          # Python dependencies
├── api_server.py             # Flask API backend
├── lstm_model.py             # Original LSTM model code
├── app.py                    # Original Streamlit app
├── sunspots.csv              # Dataset
├── src/
│   ├── App.jsx              # Main React component
│   ├── index.jsx            # Entry point
│   ├── index.css            # Global styles
│   └── components/
│       ├── AnimatedBackground.jsx
│       ├── FloatingNavbar.jsx
│       ├── HeroSection.jsx
│       ├── AboutSection.jsx
│       ├── LSTMExplanation.jsx
│       ├── ModelPipeline.jsx
│       ├── InteractivePrediction.jsx  (Calls Flask API)
│       ├── ResultsSection.jsx
│       └── ConclusionSection.jsx
└── public/
    └── index.html
```

---

## Building for Production

```bash
# Build React app
npm run build

# Flask is ready to serve predictions in production
# Use a production WSGI server like Gunicorn:
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 api_server:app
```

---

## Notes

- The LSTM model uses 2 layers with 50 units each
- Training sequence length is 10 timesteps
- Model is trained for 10 epochs on the sunspot dataset
- Predictions are limited to 1-30 months ahead
- The model learns solar cycle patterns from historical data

Enjoy your real LSTM-powered solar flare prediction app! 🚀
