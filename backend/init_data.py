import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from budget.models import Category, Settings

def init_data():
    categories = [
        {"name": "Cibo", "color": "#FFDAB9"}, # Peach
        {"name": "Trasporti", "color": "#C1E1C1"}, # Mint
        {"name": "Svago", "color": "#FFFACD"}, # Light Yellow
        {"name": "Abbonamenti inutili", "color": "#E6E6FA"} # Lavender
    ]

    for cat_data in categories:
        Category.objects.get_or_create(name=cat_data["name"], defaults={"color": cat_data["color"]})
        print(f"Category {cat_data['name']} created/checked.")

    Settings.objects.get_or_create(id=1, defaults={"monthly_budget": 1000.00})
    print("Settings initialized.")

if __name__ == "__main__":
    init_data()
