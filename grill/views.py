from django.views import View
from django.http import JsonResponse, QueryDict
from django.core import serializers

from grill.models import Player, Match, Club


class PlayerList(View):
    def get(self, request):
        print("Get Player List")

        return JsonResponse({
            "players": []
        })

    def post(self, request):
        print("Create Player")

        return JsonResponse(
            {
                "name": "Janek"
            },
            status=201
        )


class PlayerDetail(View):
    def get(self, request, pk):
        try:
            print("Get player by id")
        except Player.DoesNotExist:
            return JsonResponse(
                {
                    "error": f"Player with pk {pk} does not exist!"
                },
                status=404
            )

        return JsonResponse(
            {
                "name": "Janek"
            }
        )

    def delete(self, request, pk):
        try:
            print("Remove Player by id")
        except Player.DoesNotExist:
            return JsonResponse(
                {
                    "error": f"Player with pk {pk} does not exist!"
                },
                status=404
            )

        print("Removing player from db")
        # player.delete()

        return JsonResponse({}, 200)

    def put(self, request, pk):
        # body = QueryDict(request.body)
        try:
            print("Modify player by id")
            question = Player.objects.get(pk=pk)
        except Player.DoesNotExist:
            return JsonResponse(
                {"error": f"Player with id {pk} does not exist!"},
                status=404
            )
        # question.question_text = body["question_text"]
        # question.save(update_fields=["question_text"])

        return JsonResponse(
            {
                "name": "Janek"
            }
        )




