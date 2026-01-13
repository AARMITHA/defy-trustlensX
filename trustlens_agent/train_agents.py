import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

# Load CSV
df = pd.read_csv("nft_stats.csv")

# ----------------- Price Trend Agent Features -----------------
price_features = pd.DataFrame()
price_features["price_1d_change"] = df["stats.one_day_change"]
price_features["price_7d_change"] = df["stats.seven_day_change"]
price_features["price_30d_change"] = df["stats.thirty_day_change"]
price_features["floor_vs_avg"] = df["stats.floor_price"] / (df["stats.average_price"] + 1e-6)
price_features = price_features.fillna(0)

# Scale Price Features
price_scaler = StandardScaler()
price_features_scaled = price_scaler.fit_transform(price_features)

# Save scaler for API use
joblib.dump(price_scaler, "price_scaler.joblib")

# Train Price Trend Agent
price_model = IsolationForest(n_estimators=300, contamination=0.05, random_state=42)
price_model.fit(price_features_scaled)
joblib.dump(price_model, "price_trend_model.joblib")
print("✅ Price Trend Agent trained and saved!")

# ----------------- Volume Quality Agent Features -----------------
volume_features = pd.DataFrame()
volume_features["volume_1d"] = df["stats.one_day_volume"]
volume_features["volume_7d"] = df["stats.seven_day_volume"]
volume_features["volume_30d"] = df["stats.thirty_day_volume"]
volume_features["sales_1d"] = df["stats.one_day_sales"]
volume_features["volume_per_owner"] = df["stats.one_day_volume"] / (df["stats.num_owners"] + 1)
volume_features["sales_per_owner"] = df["stats.one_day_sales"] / (df["stats.num_owners"] + 1)
volume_features["volume_spike_ratio"] = df["stats.one_day_volume"] / (df["stats.seven_day_volume"] + 1)
volume_features = volume_features.fillna(0)

# Scale Volume Features
volume_scaler = StandardScaler()
volume_features_scaled = volume_scaler.fit_transform(volume_features)

# Save scaler for API use
joblib.dump(volume_scaler, "volume_scaler.joblib")

# Train Volume Quality Agent
volume_model = IsolationForest(n_estimators=300, contamination=0.05, random_state=42)
volume_model.fit(volume_features_scaled)
joblib.dump(volume_model, "volume_quality_model.joblib")
print("✅ Volume Quality Agent trained and saved!")
