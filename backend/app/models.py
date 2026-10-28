from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    dietary_preferences = Column(JSON, default=list)
    budget_limit = Column(Float, default=0.0)
    
    pantry_items = relationship("PantryItem", back_populates="owner")
    meal_plans = relationship("MealPlan", back_populates="owner")

class PantryItem(Base):
    __tablename__ = "pantry_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity = Column(Float)
    unit = Column(String)
    expiry_date = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="pantry_items")

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    ingredients = Column(JSON) # List of dicts
    instructions = Column(String)
    calories = Column(Integer)
    protein = Column(Float)
    carbs = Column(Float)
    fats = Column(Float)
    carbon_score = Column(Float) # 0-100
    waste_score = Column(Float) # 0-100
    cost_estimate = Column(Float)

class MealPlan(Base):
    __tablename__ = "meal_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    week_start = Column(DateTime, default=datetime.utcnow)
    plan_data = Column(JSON)
    
    owner = relationship("User", back_populates="meal_plans")

class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    target_value = Column(Float)
    badge_icon = Column(String)