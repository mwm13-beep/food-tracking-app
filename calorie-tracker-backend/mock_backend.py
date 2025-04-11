# save this as mock_backend.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can lock this down later
    allow_methods=["*"],
    allow_headers=["*"],
)

# POSTS

@app.post("/mock-log")
async def mock_log(request: Request):
    data = await request.json()
    # Mock response based on input
    return {
        "food": data.get("food", "unknown"),
        "amount": data.get("amount", 0),
        "unit": data.get("unit", "grams"),
        "calories": round(data.get("amount", 0) * 0.9, 2)  # made-up rule
    }


@app.post("/mock-profile")
async def mock_log(request: Request):
    data = await request.json()
    # Mock response based on input
    return {
        "age": data.get("age", 0),
        "weight": data.get("weight", 0),
        "height": data.get("height", 0),
        "sex": data.get("sex", "Male"),
        "activity" : data.get("activity", "Sedentary"),
        "goal" : data.get("goal", "Maintain weight")
    }

# GETS

@app.get("/mock-history")
async def get_mock_history():
    return [
        { "date": "2025-04-08", "food": "apple", "calories": 95 },
        { "date": "2025-04-09", "food": "banana", "calories": 105 },
        { "date": "2025-04-10", "food": "coffee with milk", "calories": 30 }
    ]

@app.get("/mock-dashboard")
async def get_mock_dashboard():
    return { 
        "targetCalories": 2200,
        "consumedCalories": 875
    }
    

if __name__ == "__main__":
    uvicorn.run("mock_backend:app", port=8000, reload=True)
