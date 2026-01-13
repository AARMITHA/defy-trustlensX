import pandas as pd
import networkx as nx
from pathlib import Path

NFT_DATA_DIR = Path("nft_data")


def load_csv_from_folder(folder: Path) -> pd.DataFrame:
    csv_files = list(folder.glob("*.csv"))
    if not csv_files:
        raise FileNotFoundError(f"No CSV files found in {folder}")
    return pd.concat([pd.read_csv(f) for f in csv_files], ignore_index=True)


def analyze_wallet_behavior(wallet_address: str) -> dict:
    # ---------------- LOAD DATA ---------------- #
    ownership_df = load_csv_from_folder(NFT_DATA_DIR / "nft_ownership_traces")
    flagged_df = load_csv_from_folder(NFT_DATA_DIR / "flagged_nfts")

    # Normalize column names
    ownership_df.columns = ownership_df.columns.str.lower()
    flagged_df.columns = flagged_df.columns.str.lower()

    # 🔥 COLUMN NORMALIZATION (CRITICAL FIX) 🔥
    ownership_df = ownership_df.rename(columns={
        "from": "from_address",
        "to": "to_address"
    })

    # Expected columns (safe fallback)
    for col in ["from_address", "to_address", "token_id", "timestamp"]:
        if col not in ownership_df.columns:
            ownership_df[col] = "unknown"

    # ---------------- FILTER WALLET ---------------- #
    wallet_txns = ownership_df[
        (ownership_df["from_address"] == wallet_address) |
        (ownership_df["to_address"] == wallet_address)
    ]

    if wallet_txns.empty:
        return {
            "wallet_address": wallet_address,
            "status": "NOT_FOUND",
            "trust_score": 50,
            "risk": "Medium",
            "reason": "Wallet not found in dataset"
        }

    # ---------------- TRANSACTION METRICS ---------------- #
    total_txns = len(wallet_txns)
    buys = (wallet_txns["to_address"] == wallet_address).sum()
    sells = (wallet_txns["from_address"] == wallet_address).sum()
    unique_nfts = wallet_txns["token_id"].nunique()

    # ---------------- WASH SIGNALS ---------------- #
    flagged_tokens = set(flagged_df.get("token_id", []).astype(str))
    wallet_tokens = set(wallet_txns["token_id"].astype(str))

    flagged_overlap = len(wallet_tokens.intersection(flagged_tokens))

    repeated_trades = wallet_txns["token_id"].value_counts()
    circular_tokens = len(repeated_trades[repeated_trades > 3])

    # ---------------- NETWORK METRICS ---------------- #
    G = nx.DiGraph()
    G.add_edges_from(
        zip(
            ownership_df["from_address"].astype(str),
            ownership_df["to_address"].astype(str)
        )
    )

    degree = G.degree(wallet_address) if wallet_address in G else 0

    # ---------------- SCORING ---------------- #
    risk_points = 0
    risk_points += 2 if flagged_overlap > 0 else 0
    risk_points += 2 if circular_tokens > 1 else 0
    risk_points += 1 if degree > 20 else 0
    risk_points += 1 if total_txns > 50 else 0

    if risk_points >= 5:
        risk = "High"
        trust_score = 20
    elif risk_points >= 3:
        risk = "Medium"
        trust_score = 50
    else:
        risk = "Low"
        trust_score = 80

    # ---------------- RESPONSE ---------------- #
    return {
        "wallet_address": wallet_address,
        "status": "OK",
        "transaction_behavior": {
            "total_transactions": int(total_txns),
            "buys": int(buys),
            "sells": int(sells),
            "unique_nfts_traded": int(unique_nfts)
        },
        "wash_indicators": {
            "flagged_nfts_involved": int(flagged_overlap),
            "circular_trading_tokens": int(circular_tokens)
        },
        "network_behavior": {
            "degree": int(degree)
        },
        "risk": risk,
        "trust_score": trust_score
    }
