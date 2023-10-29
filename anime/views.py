from django.http import HttpResponse
from django.shortcuts import render, redirect
import requests


def index(request):
    
    # url = "https://api.consumet.org/anime/gogoanime/top-airing"
    # response = requests.get(url, params={"page": 1})
    # data = response.json()
    # animenames = [i["title"] for i in data['results']]
    # url2 = 'https://api.consumet.org/anime/zoro/info'
    # animeinfo = []
    # for i in animenames:
    #     response2 = requests.get(url2, params={"id": i})
    #     data2 = response2.json()
    #     print(data2)
        

    return render(request, "index.html")
