from ninja import NinjaAPI, Schema
from typing import List, Optional
from datetime import date
from decimal import Decimal
from django.shortcuts import get_object_or_404
from .models import Expense, Category, Settings
from django.db.models import Sum
from django.utils import timezone

api = NinjaAPI()

# Schemas
class CategorySchema(Schema):
    id: int
    name: str
    color: str

class ExpenseSchema(Schema):
    id: int
    description: str
    amount: Decimal
    date: date
    category_id: int
    notes: Optional[str] = None
    category_name: Optional[str] = None

    @staticmethod
    def resolve_category_name(obj):
        return obj.category.name

class ExpenseCreateSchema(Schema):
    description: str
    amount: Decimal
    date: date
    category_id: int
    notes: Optional[str] = None

class BudgetStatusSchema(Schema):
    budget: Decimal
    spent: Decimal
    residual: Decimal
    percent_spent: float

class CategoryTotalSchema(Schema):
    category_name: str
    color: str
    total: Decimal

# Endpoints

@api.get("/spese", response=List[ExpenseSchema])
def list_expenses(request, month: Optional[int] = None, year: Optional[int] = None, category_id: Optional[int] = None):
    qs = Expense.objects.all().order_by('-date')
    if month:
        qs = qs.filter(date__month=month)
    if year:
        qs = qs.filter(date__year=year)
    if category_id:
        qs = qs.filter(category_id=category_id)
    return qs

@api.get("/spese/{expense_id}", response=ExpenseSchema)
def get_expense(request, expense_id: int):
    return get_object_or_404(Expense, id=expense_id)

@api.post("/spese", response=ExpenseSchema)
def create_expense(request, payload: ExpenseCreateSchema):
    expense = Expense.objects.create(**payload.dict())
    return expense

@api.delete("/spese/{expense_id}")
def delete_expense(request, expense_id: int):
    expense = get_object_or_404(Expense, id=expense_id)
    expense.delete()
    return {"success": True}

@api.get("/categories", response=List[CategorySchema])
def list_categories(request):
    return Category.objects.all()

@api.get("/riepilogo", response=List[CategoryTotalSchema])
def get_summary(request, month: Optional[int] = None, year: Optional[int] = None):
    today = timezone.now().date()
    if not month: month = today.month
    if not year: year = today.year
    
    summary = []
    categories = Category.objects.all()
    for cat in categories:
        total = Expense.objects.filter(
            category=cat, 
            date__month=month, 
            date__year=year
        ).aggregate(Sum('amount'))['amount__sum'] or 0
        
        if total > 0:
            summary.append({
                "category_name": cat.name,
                "color": cat.color,
                "total": total
            })
    return summary

@api.get("/budget-status", response=BudgetStatusSchema)
def get_budget_status(request):
    today = timezone.now().date()
    # Get or create settings
    settings, _ = Settings.objects.get_or_create(id=1) # Assuming single settings object
    budget = settings.monthly_budget
    
    # Calculate spent this month
    spent = Expense.objects.filter(
        date__month=today.month, 
        date__year=today.year
    ).aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
    
    residual = budget - spent
    percent_spent = (spent / budget) * 100 if budget > 0 else 0
    
    return {
        "budget": budget,
        "spent": spent,
        "residual": residual,
        "percent_spent": round(percent_spent, 1)
    }
