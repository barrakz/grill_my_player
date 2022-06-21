from django.views.generic import ListView
from grill_my_player.grill.models import Match


class MatchesListView(ListView):
    model = Match
    template_name = "grill/list.html"
