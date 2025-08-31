from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import joblib
import pandas as pd
from datetime import datetime
from fastapi.staticfiles import StaticFiles

# Initialize FastAPI app
app = FastAPI()

# Serve static files (CSS/JS, etc.)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load the trained SARIMA model from the joblib file
model = joblib.load('sarima_model.pkl')

# Input data structure for prediction request
class PredictionRequest(BaseModel):
    commodity: str
    month: int  # Month (1-12)
    year: int   # Year (e.g., 2024)

# Templates for frontend
templates = Jinja2Templates(directory="templates")

# Root endpoint to serve the frontend HTML form
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Prediction endpoint to get future prices via API
@app.post("/predict/")
async def predict_price(request: PredictionRequest):
    try:
        # Create a date object for the given month and year
        date_str = f"{request.year}-{request.month:02d}-01"
        date = datetime.strptime(date_str, '%Y-%m-%d')

        # Example: predicting based on the model. Replace this logic with actual forecasting.
        future_forecast = model.forecast(steps=1)  # Predict for the next month
        
        # Convert the forecast to a dictionary with date and predicted value
        forecast_result = {date_str: round(future_forecast[0], 2)}

        return {"commodity": request.commodity, "forecast": forecast_result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
