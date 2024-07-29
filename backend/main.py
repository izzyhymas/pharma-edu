from fastapi import FastAPI 
from routers import doctors, patients

app = FastAPI()

app.include_router(doctors.router)
app.include_router(patients.router)
