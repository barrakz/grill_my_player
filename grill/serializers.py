from rest_framework import serializers
from .models import Player, Match, Rating
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'last_name', 'birth_date', 'match']


class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'teams', 'date', 'score']


class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'player', 'rate', 'comment_text', 'match']
