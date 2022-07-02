from django.urls import path
from rest_framework.routers import DefaultRouter

from grill.views import (
    PlayerListView, MatchesListView, RatingsListView, PlayerDetailGenerics, MatchDetailGenerics, RatingDetailGenerics)


router = DefaultRouter()



urlpatterns = [
    path("players/", PlayerListView.as_view(), name="players-list"),
    path("player-detail/<int:pk>", PlayerDetailGenerics.as_view(), name="player-detail"),

    path("matches/", MatchesListView.as_view(), name="matches-list"),
    path("match-detail/<int:pk>", MatchDetailGenerics.as_view(), name="match-detail"),

    path("ratings/", RatingsListView.as_view(), name="ratings"),
    path("rating-detail/<int:pk>", RatingDetailGenerics.as_view(), name="rating-detail"),



]

