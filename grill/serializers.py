from rest_framework import serializers
from .models import Player


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'last_name', 'birth_date', 'team', 'match']
