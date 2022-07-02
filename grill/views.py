from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import JsonResponse
from .models import Player
from .serializers import PlayersSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
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


@api_view(['GET', 'POST'])
def players_list(request, format=None):
    if request.method == 'GET':
        players = Player.objects.all()
        serializer = PlayersSerializer(players, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PlayersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def player_detail(request, id, format=None):
    try:
        player = Player.objects.get(pk=id)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlayersSerializer(player)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlayersSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


