from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database
from ..dependencies import get_current_user

router = APIRouter(prefix="/pantry", tags=["pantry"])

@router.get("/", response_model=List[schemas.PantryItem])
def read_pantry(db: Session = Depends(database.get_db), current_user = Depends(get_current_user)):
    return crud.get_pantry_items(db, user_id=current_user.id)

@router.post("/", response_model=schemas.PantryItem)
def add_pantry_item(item: schemas.PantryItemCreate, db: Session = Depends(database.get_db), current_user = Depends(get_current_user)):
    return crud.create_pantry_item(db, item=item, user_id=current_user.id)

@router.delete("/{item_id}")
def remove_pantry_item(item_id: int, db: Session = Depends(database.get_db), current_user = Depends(get_current_user)):
    crud.delete_pantry_item(db, item_id=item_id, user_id=current_user.id)
    return {"status": "success"}