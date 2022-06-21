
from django.urls import path

from grill_my_player.grill import views_class

app_name = "grill"

urlpatterns = [
    path("matches-list/", views_class.MatchesListView.as_view(), name="matches-list")
]