from django.http import HttpResponse
from django.shortcuts import render, redirect
import requests


def index(request):
    return render(request, "index.html")

def search(request):
    if request.method == "POST":
        query = request.POST.get("id")
        return render(request, "search.html", {"id": query})
    else:
        return redirect("/")