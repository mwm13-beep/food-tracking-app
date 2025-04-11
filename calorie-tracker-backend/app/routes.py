from fastapi import APIRouter, Request
from datetime import date

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard():
    return {
        "targetCalories": 2200,
        "consumedCalories": 875
    }

@router.get("/history")
async def get_history():
    return [
        { "date": "2025-04-08", "food": "apple", "calories": 95 },
        { "date": "2025-04-09", "food": "banana", "calories": 105 },
        { "date": str(date.today()), "food": "coffee", "calories": 30 }
    ]

@router.post("/log")
async def log_food(request: Request):
    data = await request.json()
    return {
        "message": "Log saved",
        "received": data
    }

@router.post("/profile")
async def save_profile(request: Request):
    data = await request.json()
    return { **data, "status": "Profile saved" }
