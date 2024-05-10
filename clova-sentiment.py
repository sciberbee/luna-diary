import json
import requests

text = input("분석할 텍스트를 입력해주세요 : ")

client_id = "po27e2eh8m"  # client id를 꼭 넣어주세요!
client_secret = "YnECVYs35gEi66OWNKaEbnwhLYnoClamgtzQoe8j"  # client seceret을 꼭 넣어주세요!
url = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"
headers = {
    "X-NCP-APIGW-API-KEY-ID": client_id,
    "X-NCP-APIGW-API-KEY": client_secret,
    "Content-Type": "application/json"
}
data = {
    "content": text[:min(len(text), 900)]
}
response = requests.post(url, data=json.dumps(data), headers=headers)
result = json.loads(response.text)
print("감성분석 결과 :", result["document"]["sentiment"])
print(result)