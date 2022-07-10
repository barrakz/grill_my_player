from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class TestPlayerCreate(APITestCase):

    def test_creates_player(self):
        sample_player = {'name': 'Piotr', 'last_name': 'Testowy'}
        response = self.client.post(reverse('players-list'), sample_player)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
