from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="TrustLens X - NFT Agents API")

# ================= LOAD MODELS ================= #

# Agent 1 & 2
price_trend_model = joblib.load("price_trend_model.joblib")
volume_quality_model = joblib.load("volume_quality_model.joblib")
price_scaler = joblib.load("price_scaler.joblib")
volume_scaler = joblib.load("volume_scaler.joblib")

# Agent 4 (Wash Trade)
washtrade_model = joblib.load("agent4_rf_model.joblib")
washtrade_scaler = joblib.load("agent4_scaler.joblib")
washtrade_features = joblib.load("agent4_features.joblib")

# ================= REQUEST SCHEMAS ================= #

class NFTStats(BaseModel):
    price_1d_change: float
    price_7d_change: float
    price_30d_change: float
    floor_vs_avg: float
    volume_1d: float
    volume_7d: float
    volume_30d: float
    sales_1d: float
    volume_per_owner: float
    sales_per_owner: float
    volume_spike_ratio: float


class WashTradeStats(BaseModel):
    n_trades: float
    n_unique_buyers: float
    n_unique_sellers: float
    mean_price: float
    max_price: float
    min_price: float
    std_price: float
    self_trade_ratio: float
    repeated_pair_ratio: float

# ================= HELPERS ================= #

def score_to_risk_label(score: float):
    """
    IsolationForest:
    Near 0 -> Normal
    Negative -> Anomaly
    """
    if score >= -0.05:
        return "Low"
    elif score >= -0.20:
        return "Medium"
    else:
        return "High"


def normalize_score(score: float, min_score: float = -0.5, max_score: float = 0.0):
    score = max(min(score, max_score), min_score)
    return int(100 * (score - min_score) / (max_score - min_score + 1e-6))

# ================= ROUTES ================= #

@app.get("/")
def root():
    return {"message": "TrustLens X Agents API running"}

# -------- AGENT 1 + 2 (Market Agents) -------- #

@app.post("/predict/market")
def predict_market_agents(stats: NFTStats):

    # ---- Price Trend Agent ---- #
    price_features = np.array([[ 
        stats.price_1d_change,
        stats.price_7d_change,
        stats.price_30d_change,
        stats.floor_vs_avg
    ]])
    price_scaled = price_scaler.transform(price_features)

    price_score = price_trend_model.decision_function(price_scaled)[0]
    price_pred = price_trend_model.predict(price_scaled)[0]

    # ---- Volume Quality Agent ---- #
    volume_features = np.array([[ 
        stats.volume_1d,
        stats.volume_7d,
        stats.volume_30d,
        stats.sales_1d,
        stats.volume_per_owner,
        stats.sales_per_owner,
        stats.volume_spike_ratio
    ]])
    volume_scaled = volume_scaler.transform(volume_features)

    volume_score = volume_quality_model.decision_function(volume_scaled)[0]
    volume_pred = volume_quality_model.predict(volume_scaled)[0]

    return {
        "price_trend_agent": {
            "trust_score": normalize_score(price_score),
            "risk": score_to_risk_label(price_score),
            "model_pred": int(price_pred),
            "raw_score": float(price_score)
        },
        "volume_quality_agent": {
            "trust_score": normalize_score(volume_score),
            "risk": score_to_risk_label(volume_score),
            "model_pred": int(volume_pred),
            "raw_score": float(volume_score)
        }
    }

# -------- AGENT 4 (Wash Trade Agent) -------- #

@app.post("/predict/washtrade")
def predict_washtrade(stats: WashTradeStats):

    input_dict = stats.dict()

    # Enforce training-time feature order
    ordered_features = [input_dict[f] for f in washtrade_features]

    features = np.array([ordered_features])
    features_scaled = washtrade_scaler.transform(features)

    # ---------- FIXED LOGIC ----------
    proba = washtrade_model.predict_proba(features_scaled)[0]

    # Explicitly find wash-trade class index (label = 1)
    wash_class_index = list(washtrade_model.classes_).index(1)
    wash_prob = proba[wash_class_index]

    pred = washtrade_model.predict(features_scaled)[0]
    # --------------------------------

    return {
        "wash_trade_agent": {
            "wash_trade_probability": round(float(wash_prob), 4),
            "risk": (
                "Low" if wash_prob >= 0.7
                else "Medium" if wash_prob >= 0.3
                else "High"
            ),
            "prediction": int(pred),  # 1 = wash trade, 0 = normal
            "trust_score": int((1 - wash_prob) * 100)
        }
    }
from wallet_behavior_agent import analyze_wallet_behavior
from pydantic import BaseModel

class WalletRequest(BaseModel):
    wallet_address: str


@app.post("/predict/wallet-behavior")
def predict_wallet_behavior(req: WalletRequest):
    return analyze_wallet_behavior(req.wallet_address)
