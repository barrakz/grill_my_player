from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView

from .models import Player, Match, Rating
from .serializers import PlayersSerializer, UserSerializer, MatchesSerializer, RatingsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.generics import ListCreateAPIView

from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()


class PlayerListView(ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayersSerializer
    permission_classes = (IsAuthenticated,)


class MatchesListView(ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchesSerializer
    permission_classes = (IsAuthenticated,)


class RatingsListView(ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingsSerializer
    permission_classes = (IsAuthenticated,)


class PlayerDetailGenerics(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayersSerializer


class MatchDetailGenerics(generics.RetrieveAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchesSerializer


class RatingDetailGenerics(generics.RetrieveAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingsSerializer