import pandas as pd
import requests

response = requests.get("http://localhost:3000/api/prefeituras/duque-de-caxias?year=2026")

dados_api = response.json()

contratos = dados_api["data"]["dados"]
df = pd.DataFrame(contratos)

#print(df["Objeto"].iloc[0])
#print(df[["Código", "Objeto"]].head())

df = df[
    [
        "Código",
        "Objeto",
        "TCO_Descricao",
        "Lic_Descricao",
        "Valor"
    ]
]
df["Categoria"] = ""

df.to_csv("contratos_rotular.csv", index=False)