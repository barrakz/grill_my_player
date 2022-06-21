from django.db import models


class Match(models.Model):
    teams = models.CharField(max_length=50)
    date = models.DateField()
    score = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.teams}"


class Team(models.Model):
    name = models.CharField(max_length=50)

    # match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="match", blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Player(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.IntegerField()

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="players", blank=True, null=True)

    # match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="match", blank=True, null=True)

    def __str__(self):
        return f"{self.name} {self.last_name}"


class Rating(models.Model):
    RATINGS = [
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4")
    ]
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="ratings", blank=True, null=True)
    rate = models.IntegerField(choices=RATINGS)
    comment_text = models.CharField(max_length=1000, null=True)

    def __str__(self):
        return f"{self.rate} {self.comment_text}"
