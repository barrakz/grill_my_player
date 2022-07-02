from django.urls import path
from rest_framework.routers import DefaultRouter

from grill.views import PlayerListView, MatchesListView, RatingsListView


router = DefaultRouter()



urlpatterns = [
    path("players/", PlayerListView.as_view(), name="players-list"),
    path("matches/", MatchesListView.as_view(), name="matches-list"),
    path("ratings/", RatingsListView.as_view(), name="ratings"),



]

