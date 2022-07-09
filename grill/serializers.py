from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Player, Match, Rating
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()


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


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',

        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')

        if len(username) < 3:
            raise serializers.ValidationError({
                'error': 'username is too short'
            })

        if password == password2:
            user = User(username=username, email=email)
            user.set_password(password)
            user.save()
            return user

        else:
            raise serializers.ValidationError({
                'error': 'Both passwords do not match'
            })
