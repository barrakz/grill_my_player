
from django.urls import path

from grill import views_class

app_name = "grill"

urlpatterns = [
    path("matches-list/", views_class.MatchesListView.as_view(), name="matches-list"),
    path("team-detail/<pk>", views_class.TeamDetailView.as_view(), name="team-detail"),
    path("players-list/", views_class.PlayersListView.as_view(), name="players-list"),
    path("player-detail/<pk>", views_class.PlayerDetailView.as_view(), name="player-detail"),
    path("match-detail/<pk>", views_class.MatchDetailView.as_view(), name="match-detail"),

]