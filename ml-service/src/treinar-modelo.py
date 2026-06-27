import pandas as pd
import joblib

from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

df = pd.read_csv("contratos-classificados.csv")

df = df.dropna(subset=["Categoria"])

X = df["Objeto"]
y = df["Categoria"]

modelo = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            stop_words=None,
            ngram_range=(1, 2),
            max_features=5000
        )
    ),
    (
        "clf",
        LogisticRegression(max_iter=1000)
    )
])

# 🔁 Cross Validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(modelo, X, y, cv=cv, scoring="f1_weighted")

print("Scores por fold:", scores)
print("Média F1:", scores.mean())

# 🔥 Treina modelo final em TODO o dataset
modelo.fit(X, y)

joblib.dump(modelo, "models/modelo_crea.pkl")

print("Modelo salvo com sucesso!")