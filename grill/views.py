from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView

from .models import Player, Match, Rating
from .serializers import PlayersSerializer, UserSerializer, MatchesSerializer, RatingsSerializer, UserRegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.generics import ListCreateAPIView

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
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


class RegisterAPIView(APIView):
    serializer_class = UserRegisterSerializer
    permission_classes = ()

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),

            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
