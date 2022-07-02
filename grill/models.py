from django.db import models
from django.contrib.auth.models import User


class Match(models.Model):
    teams = models.CharField(max_length=50)
    date = models.DateField()
    score = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.date}   {self.teams}"


# class Team(models.Model):
#     name = models.CharField(max_length=50)
#     match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="mainmatch", blank=True, null=True)
#
#     def __str__(self):
#         return f"{self.name}"


class Player(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.IntegerField()
    # team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team", blank=True, null=True)
    match = models.ManyToManyField(Match)
    # average_rating = models.FloatField(default=0)

    def __str__(self):
        return f"{self.name} {self.last_name}"


class Rating(models.Model):
    RATINGS = [
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
        (5, "5"),
        (6, "6"),
        (7, "7"),
        (8, "8"),
        (9, "9"),
        (10, "10"),
    ]

    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="ratings", blank=True, null=True)
    # user = models.ForeignKey(User)
    rate = models.IntegerField(choices=RATINGS)
    comment_text = models.TextField(max_length=1000, blank=True, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="ratings", blank=True, null=True)

    def __str__(self):
        return f"{self.player.name} {self.player.last_name} {self.match} {self.comment_text} {self.rate}"


