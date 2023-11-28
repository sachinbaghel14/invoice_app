from django.db import models
from django.core.validators import MinLengthValidator


# Create your models here.
class Invoices(models.Model):
    Invoice_id = models.IntegerField()
    client_name = models.CharField(max_length=200)
    date = models.DateField()


class Items(models.Model):
    Invoices = models.ForeignKey(
        Invoices, on_delete=models.CASCADE, related_name="items"
    )
    desc = models.TextField()
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()


class User(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    email = models.EmailField(max_length=100, validators=[MinLengthValidator(6)])
    password = models.CharField(max_length=100, validators=[MinLengthValidator(6)])
