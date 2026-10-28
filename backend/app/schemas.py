from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    dietary_preferences: List[str] = []
    budget_limit: float = 0.0
    class Config:
        from_attributes = True

class Token(BaseModel):
    access: str
    user: User

class LoginRequest(BaseModel):
    username: str
    password: str

class PantryItemBase(BaseModel):
    name: str
    quantity: float
    unit: str
    expiry_date: Optional[datetime] = None

class PantryItemCreate(PantryItemBase):
    pass

class PantryItem(PantryItemBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class RecipeBase(BaseModel):
    title: str
    description: str
    ingredients: List[Dict[str, Any]]
    instructions: str
    calories: int
    protein: float
    carbs: float
    fats: float
    carbon_score: float
    waste_score: float
    cost_estimate: float

class Recipe(RecipeBase):
    id: int
    class Config:
        from_attributes = True

class MealPlanCreate(BaseModel):
    week_start: datetime
    plan_data: Dict[str, Any]

class MealPlan(MealPlanCreate):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class Challenge(BaseModel):
    id: int
    title: str
    description: str
    target_value: float
    badge_icon: str
    class Config:
        from_attributes = True