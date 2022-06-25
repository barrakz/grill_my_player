from django.urls import path
from grill import views

app_name = "grill_api"

urlpatterns = [
    path("players/", views.PlayerList.as_view(), name="players"),
    path("players/<pk>/", views.PlayerDetail.as_view(), name="player-detail"),
]




