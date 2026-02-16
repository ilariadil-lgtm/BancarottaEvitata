from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default="#C1E1C1")  # Hex color

    def __str__(self):
        return self.name

class Expense(models.Model):
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='expenses')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.description} - {self.amount}"

class Settings(models.Model):
    monthly_budget = models.DecimalField(max_digits=10, decimal_places=2, default=1000.00)

    def __str__(self):
        return f"Budget: {self.monthly_budget}"

    def save(self, *args, **kwargs):
        if not self.pk and Settings.objects.exists():
            # Ensure only one settings object exists
            return
        super(Settings, self).save(*args, **kwargs)
