from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.get("/", response_model=List[schemas.Recipe])
def read_recipes(db: Session = Depends(database.get_db)):
    return crud.get_recipes(db)

@router.get("/challenges", response_model=List[schemas.Challenge])
def read_challenges(db: Session = Depends(database.get_db)):
    return crud.get_challenges(db)