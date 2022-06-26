from django.urls import path
from rest_framework.routers import DefaultRouter

from grill.views import PlayerListView

router = DefaultRouter()



urlpatterns = [
    path("players/", PlayerListView.as_view(), name="players-list")
]

