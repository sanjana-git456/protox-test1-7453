from sqlalchemy.orm import Session
from . import models, schemas, security

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_pantry_items(db: Session, user_id: int):
    return db.query(models.PantryItem).filter(models.PantryItem.user_id == user_id).all()

def create_pantry_item(db: Session, item: schemas.PantryItemCreate, user_id: int):
    db_item = models.PantryItem(**item.model_dump(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_pantry_item(db: Session, item_id: int, user_id: int):
    db_item = db.query(models.PantryItem).filter(models.PantryItem.id == item_id, models.User.id == user_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def get_recipes(db: Session):
    return db.query(models.Recipe).all()

def get_challenges(db: Session):
    return db.query(models.Challenge).all()

def create_meal_plan(db: Session, plan: schemas.MealPlanCreate, user_id: int):
    db_plan = models.MealPlan(**plan.model_dump(), user_id=user_id)
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan