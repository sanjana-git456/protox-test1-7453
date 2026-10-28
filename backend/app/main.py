from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, pantry, recipes
from . import models

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NutriPlan Pro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(pantry.router, prefix="/api")
app.include_router(recipes.router, prefix="/api")

@app.on_event("startup")
def seed_data():
    from .database import SessionLocal
    db = SessionLocal()
    # Seed some recipes if empty
    if db.query(models.Recipe).count() == 0:
        recipes = [
            models.Recipe(
                title="Quinoa Buddha Bowl",
                description="A nutrient-dense bowl with roasted chickpeas and kale.",
                ingredients=[{"item": "Quinoa", "amount": "1 cup"}, {"item": "Chickpeas", "amount": "1 can"}],
                instructions="Cook quinoa. Roast chickpeas. Mix with tahini dressing.",
                calories=450, protein=15.0, carbs=60.0, fats=18.0,
                carbon_score=15.2, waste_score=5.0, cost_estimate=4.50
            ),
            models.Recipe(
                title="Lentil Shepherd's Pie",
                description="Eco-friendly plant-based comfort food.",
                ingredients=[{"item": "Lentils", "amount": "2 cups"}, {"item": "Potatoes", "amount": "4 large"}],
                instructions="Boil potatoes. Sauté lentils with veggies. Bake together.",
                calories=380, protein=18.0, carbs=55.0, fats=8.0,
                carbon_score=10.5, waste_score=2.0, cost_estimate=3.20
            )
        ]
        db.add_all(recipes)
    
    if db.query(models.Challenge).count() == 0:
        challenges = [
            models.Challenge(title="Zero Waste Week", description="Reduce food waste to under 5%", target_value=5.0, badge_icon="Trash2"),
            models.Challenge(title="Protein Power", description="Hit 70g protein daily for 5 days", target_value=70.0, badge_icon="Dumbbell"),
            models.Challenge(title="Eco-Chef", description="Choose recipes with carbon score < 20", target_value=20.0, badge_icon="Leaf")
        ]
        db.add_all(challenges)
    
    db.commit()
    db.close()

@app.get("/")
def root():
    return {"message": "NutriPlan Pro API is running"}