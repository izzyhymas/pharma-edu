from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from exceptions import DoctorNotFound
from database import get_db
from models import Address, Doctor
from schemas import AddressCreateRequest, DoctorCreateRequest, DoctorCreateResponse

router = APIRouter()


# DOCTORS GET REQUESTS API
@router.get("/doctors")
async def get_doctors(session: Session = Depends(get_db)) -> list[Doctor]:
    doctor_list: list[Doctor] = session.exec(select(Doctor)).all()
    return doctor_list


@router.get("/doctors/{doctor_id}/address")
async def get_doctor_address(
    doctor_id: int, session: Session = Depends(get_db)
) -> Address:
    doctor = session.get(Doctor, doctor_id)
    if doctor is None:
        raise DoctorNotFound(id=doctor_id)
    return doctor.office_address


@router.get("/doctors/{doctor_id}")
async def get_doctor(doctor_id: int, session: Session = Depends(get_db)) -> Doctor:
    doctor = session.get(Doctor, doctor_id)
    if doctor is None:
        raise DoctorNotFound(id=doctor_id)
    return doctor


# Doctors POST Request API
@router.post("/doctors")
async def create_doctor(
    doctor: DoctorCreateRequest,
    address: AddressCreateRequest,
    session: Session = Depends(get_db),
) -> DoctorCreateResponse:
    address_data = address.model_dump()
    address = Address(**address_data)
    session.add(address)
    session.commit()
    session.refresh(address)
    doctor_data = doctor.model_dump()
    doctor = Doctor(**doctor_data, office_address_id=address.id)
    session.add(doctor)
    session.commit()
    session.refresh(doctor)
    return DoctorCreateResponse(
        success=True,
        message=f"Doctor {doctor.first_name} {doctor.last_name} added: {doctor.model_dump()}",
    )
