from django.views.generic import ListView, DetailView

from grill.models import Match, Team, Player


class MatchesListView(ListView):
    model = Match
    template_name = "grill/matches_list.html"


class TeamDetailView(DetailView):
    model = Team
    template_name = "grill/team_detail.html"


class PlayersListView(ListView):
    model = Player
    template_name = "grill/players_list.html"


class PlayerDetailView(DetailView):
    model = Player
    template_name = "grill/player_detail.html"


class MatchDetailView(DetailView):
    model = Match
    template_name = "grill/match_detail.html"
