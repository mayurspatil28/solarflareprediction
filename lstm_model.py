import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load dataset
data = pd.read_csv("sunspots.csv")

print(data.head())

# Use only the Sunspots column
dataset = data[['Sunspots']].values

# Normalize the data (0 to 1 range)
scaler = MinMaxScaler(feature_range=(0, 1))
dataset_scaled = scaler.fit_transform(dataset)

print("Dataset shape:", dataset_scaled.shape)

# Create time-series sequences
def create_dataset(dataset, time_step=10):
    X, y = [], []
    for i in range(len(dataset) - time_step - 1):
        X.append(dataset[i:(i + time_step), 0])
        y.append(dataset[i + time_step, 0])
    return np.array(X), np.array(y)

time_step = 10
X, y = create_dataset(dataset_scaled, time_step)

# Reshape input to [samples, time steps, features]
X = X.reshape(X.shape[0], X.shape[1], 1)

print("X shape:", X.shape)
print("y shape:", y.shape)

# Build LSTM model
model = Sequential()

model.add(LSTM(50, return_sequences=True, input_shape=(time_step, 1)))
model.add(LSTM(50))
model.add(Dense(1))

model.compile(loss='mean_squared_error', optimizer='adam')

# Train model
model.fit(X, y, epochs=10, batch_size=32)

# Make predictions
predictions = model.predict(X)

# Convert back to original scale
predictions = scaler.inverse_transform(predictions.reshape(-1, 1))
actual = scaler.inverse_transform(y.reshape(-1, 1))

# Plot actual vs predicted
plt.figure(figsize=(10,6))
plt.plot(actual, label='Actual Sunspots')
plt.plot(predictions, label='Predicted Sunspots')
plt.legend()
plt.title("LSTM Sunspot Prediction")
plt.xlabel("Time")
plt.ylabel("Sunspot Count")
plt.show()

# Predict future values
future_steps = 10

last_sequence = dataset_scaled[-time_step:]
last_sequence = last_sequence.reshape(1, time_step, 1)

future_predictions = []

for _ in range(future_steps):
    next_pred = model.predict(last_sequence, verbose=0)
    
    future_predictions.append(next_pred[0, 0])
    
    # reshape correctly to (1,1,1)
    next_pred_reshaped = next_pred.reshape(1,1,1)
    
    # update sequence (keep 3D)
    last_sequence = np.concatenate((last_sequence[:,1:,:], next_pred_reshaped), axis=1)

# Convert back to original scale
future_predictions = scaler.inverse_transform(
    np.array(future_predictions).reshape(-1,1)
)

print("Future Predictions:")
print(future_predictions)