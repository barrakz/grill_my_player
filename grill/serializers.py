from rest_framework import serializers
from .models import Player, Match, Rating
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"

    def create(self, validated_data):
        user = super().create(validated_data)
        _, _ = Token.objects.get_or_create(user=user)
        return user


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'last_name', 'birth_date', 'average_rating']


class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'teams', 'date', 'score', 'player']


class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        read_only_fields = ['user']
        model = Rating
        fields = ['id', 'player', 'rate', 'comment_text', 'match', 'user']

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)
