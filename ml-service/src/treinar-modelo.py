import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Carrega dataset rotulado
df = pd.read_csv("contratos-classificados.csv")

# Converte categorias
#df["Categoria"] = df["Categoria"].map({
#    "NAO_CREA": 0,
#    "CREA": 1
#})

# Remove linhas sem categoria
df = df.dropna(subset=["Categoria"])

X = df["Objeto"]
y = df["Categoria"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

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

modelo.fit(X_train, y_train)

pred = modelo.predict(X_test)

print(classification_report(y_test, pred))

joblib.dump(modelo, "models/modelo_crea.pkl")

print("Modelo salvo com sucesso!")