from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from exceptions import PatientNotFound
from database import get_db
from models import (
    Address,
    Insurance,
    Patient,
    PrescribedRx,
    Rx,
    SigCode,
)
from schemas import (
    AddressCreateRequest,
    InsuranceCreateRequest,
    PatientCreateRequest,
    PrescribedRxCreateRequest,
    RxCreateRequest,
    SigCodeCreateRequest,
)

router = APIRouter()


# PATIENTS GET REQUESTS API
@router.get("/patients")
async def get_patients(session: Session = Depends(get_db)) -> list[Patient]:
    patient_list = session.exec(select(Patient))
    return patient_list.all()


@router.get("/patients/{patient_id}/prescriptions")
async def get_prescriptions(
    patient_id: int, session: Session = Depends(get_db)
) -> list[PrescribedRx]:
    patient = session.get(Patient, patient_id)
    if patient is None:
        raise PatientNotFound(id=patient_id)
    return patient.prescriptions


@router.get("/patients/{patient_id}/prescriptions/{prescription_id}")
async def get_prescription(
    patient_id: int, prescription_id: int, session: Session = Depends(get_db)
) -> PrescribedRx:
    patient = session.get(Patient, patient_id)
    if patient is None:
        raise PatientNotFound(id=patient_id)

    for rx in patient.prescriptions:
        if rx.id == prescription_id:
            return rx

    for prescription in patient.prescriptions:
        if prescription.id == prescription_id:
            return prescription
            # valid_prescription = prescription
    # if valid_prescription is None:
    # raise PatientNotFound(id=patient_id)
    raise PatientNotFound(id=patient_id)
    # valid_prescription.rx_id
    # valid_prescription.sig_code
    # prescription_data = valid_prescription.model_dump()
    # rx_data = session.get(Rx, prescription_data.pop("rx_id"))
    # sig_code_data = session.get(SigCode, valid_prescription.sig_code_id).model_dump()
    # prescription_data["rx_data"] = rx_data
    # prescription_data["sig_code"] = sig_code_data
    # del prescription_data["patient_id"]
    # return GetPrescriptionResponse(
    #     rx_name=valid_prescription.rx.name, sig_code=valid_prescription.sig_code.code
    # )


@router.get("/patients/{patient_id}/address")
async def get_patient_address(
    patient_id: int, session: Session = Depends(get_db)
) -> Address:
    patient = session.exec(select(Patient).where(Patient.id == patient_id)).first()
    if patient is None:
        raise PatientNotFound(id=patient_id)
    patient_address = session.exec(
        select(Address).where(patient.home_address_id == Address.id)
    ).first()
    return patient_address


@router.get("/patients/{patient_id}")
async def get_patient(patient_id: int, session: Session = Depends(get_db)) -> Patient:
    patient = session.exec(select(Patient).where(Patient.id == patient_id)).first()
    if patient is None:
        raise PatientNotFound(id=patient_id)
    return patient


# Patients POST Requests API
@router.post("/patients")
async def create_patient(
    patient: PatientCreateRequest,
    address: AddressCreateRequest,
    insurance: InsuranceCreateRequest,
    session: Session = Depends(get_db),
):
    # TODO: Add response type

    # Add address and insurance to the session and commit to auto-generate IDs
    address_data = address.model_dump()
    address = Address(**address_data)
    insurance_data = insurance.model_dump()
    insurance = Insurance(**insurance_data)
    session.add(address)
    session.add(insurance)
    session.commit()
    session.refresh(address)
    session.refresh(insurance)

    # Convert PatientBase instance to Patient instance
    patient_data = patient.model_dump()
    patient = Patient(
        **patient_data, home_address_id=address.id, insurance_id=insurance.id
    )

    # Add the new patient to the session and commit
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return f"Patient {patient.first_name} {patient.last_name} added: {patient.model_dump()}"


@router.post("/patients/{patient_id}")
async def add_prescription(
    patient_id: int,
    prescription_data: PrescribedRxCreateRequest,
    sig_code_data: SigCodeCreateRequest,
    rx_data: RxCreateRequest,
    session: Session = Depends(get_db),
):
    # TODO: Add response type

    # Get patient object
    patient = session.exec(select(Patient).where(Patient.id == patient_id)).first()
    if patient is None:
        raise PatientNotFound(id=patient_id)

    # Add Sig Code to database
    sig_code_data = sig_code_data.model_dump()
    sig_code = SigCode(**sig_code_data)
    session.add(sig_code)

    # Add Prescription information to database
    rx_data = rx_data.model_dump()
    rx = Rx(**rx_data)
    session.add(rx)

    # Commmit to database
    session.commit()
    session.refresh(sig_code)
    session.refresh(rx)

    # Add prescription to database
    prescription_data = prescription_data.model_dump()
    prescription = PrescribedRx(
        **prescription_data,
        rx_id=rx.id,
        sig_code_id=sig_code.id,
        patient_id=patient.id,
    )
    patient.prescriptions.append(prescription)
    session.add(prescription)

    # Commit to database
    session.commit()
    session.refresh(prescription)
    return f"Prescription added: {prescription.model_dump()}"
