from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import patients, prescribers, prescriptions, rx_items


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prescribers.router)
app.include_router(patients.router)
app.include_router(prescriptions.router)
app.include_router(rx_items.router)
