from datetime import date

from pydantic import BaseModel

from models import DoctorType, State


class AddressCreateRequest(BaseModel):
    number: str | None = None
    street_name: str | None = None
    city: str | None = None
    state: State | None = None
    zipcode: str | None = None


class DoctorCreateRequest(BaseModel):
    first_name: str
    last_name: str
    doctor_type: DoctorType | None = None
    contact_number: str | None = None
    contact_email: str | None = None
    DEA_number: str | None = None


class DoctorCreateResponse(BaseModel):
    success: bool
    message: str


class InsuranceCreateRequest(BaseModel):
    member_id_number: str | None = None
    group_number: str | None = None
    rx_bin: str | None = None
    rx_pcn: str | None = None
    person_code: str | None = None


class PatientCreateRequest(BaseModel):
    first_name: str
    last_name: str
    contact_number: str | None = None
    contact_email: str | None = None
    dob: date


class PrescribedRxCreateRequest(BaseModel):
    dosage: str
    prescribed_date: date
    refills: int
    count: int


class RxCreateRequest(BaseModel):
    name: str


class SigCodeCreateRequest(BaseModel):
    code: str
