from sqlmodel import SQLModel, Field, Relationship
from datetime import date
from enum import Enum


class State(str, Enum):
    AL = "AL"
    AK = "AK"
    AZ = "AZ"
    AR = "AR"
    CA = "CA"
    CO = "CO"
    CT = "CT"
    DE = "DE"
    FL = "FL"
    GA = "GA"
    HI = "HI"
    ID = "ID"
    IL = "IL"
    IN = "IN"
    IA = "IA"
    KS = "KS"
    KY = "KY"
    LA = "LA"
    ME = "ME"
    MD = "MD"
    MA = "MA"
    MI = "MI"
    MN = "MN"
    MS = "MS"
    MO = "MO"
    MT = "MT"
    NE = "NE"
    NV = "NV"
    NH = "NH"
    NJ = "NJ"
    NM = "NM"
    NY = "NY"
    NC = "NC"
    ND = "ND"
    OH = "OH"
    OK = "OK"
    OR = "OR"
    PA = "PA"
    RI = "RI"
    SC = "SC"
    SD = "SD"
    TN = "TN"
    TX = "TX"
    UT = "UT"
    VT = "VT"
    VA = "VA"
    WA = "WA"
    WV = "WV"
    WI = "WI"
    WY = "WY"


class DoctorType(str, Enum):
    MD = "MD"
    DO = "DO"
    DPM = "DPM"
    DDS = "DDS"
    DMD = "DMD"
    OD = "OD"
    PharmD = "PharmD"
    DC = "DC"
    ND = "ND"
    NMD = "NMD"
    DVM = "DVM"
    PhD = "PhD"

    def description(self):
        match self:
            case DoctorType.MD:
                return "Doctor of Medicine"
            case DoctorType.DO:
                return "Doctor of Osteopathic Medicine"
            case DoctorType.DPM:
                return "Doctor of Podiatric Medicine"
            case DoctorType.DDS:
                return "Doctor of Dental Surgery"
            case DoctorType.DMD:
                return "Doctor of Medicine in Dentistry or Doctor of Dental Medicine"
            case DoctorType.OD:
                return "Doctor of Optometry"
            case DoctorType.PharmD:
                return "Doctor of Pharmacy"
            case DoctorType.DC:
                return "Doctor of Chiropractic"
            case DoctorType.ND:
                return "Doctor of Naturopathic Medicine"
            case DoctorType.NMD:
                return "Doctor of Naturopathic Medicine"
            case DoctorType.DVM:
                return "Doctor of Veterinary Medicine"
            case DoctorType.PhD:
                return "Doctor of Philosophy in Medical Field"
            case _:
                return "Unknown Doctor Type"


class Address(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    number: str | None = None
    street_name: str | None = None
    city: str | None = None
    state: State | None = None
    zipcode: str | None = None
    country: str | None = None


class PatientDoctorLink(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patient.id")
    doctor_id: int = Field(foreign_key="doctor.id")


class Doctor(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    doctor_type: DoctorType = DoctorType.MD
    office_address_id: int = Field(foreign_key="address.id")
    office_address: Address = Relationship()
    contact_number: str | None = None
    contact_email: str | None = None
    dea_number: str | None = None
    patients: list["Patient"] = Relationship(
        back_populates="doctors", link_model=PatientDoctorLink
    )


class Insurance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    member_id_number: str | None = None
    group_number: str | None = None
    rx_bin: str | None = None
    rx_pcn: str | None = None
    person_code: str | None = None


class Patient(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    contact_number: str | None = None
    contact_email: str | None = None
    dob: date
    home_address_id: int = Field(foreign_key="address.id")
    doctors: list[Doctor] = Relationship(
        back_populates="patients", link_model=PatientDoctorLink
    )
    prescriptions: list["PrescribedRx"] = Relationship(back_populates="patient")
    insurance_id: int = Field(foreign_key="insurance.id")


class PrescribedRx(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    rx_id: int = Field(foreign_key="rx.id")
    rx: "Rx" = Relationship()
    dosage: str
    sig_code_id: int = Field(foreign_key="sigcode.id")
    sig_code: "SigCode" = Relationship()
    patient_id: int = Field(foreign_key="patient.id")
    patient: Patient = Relationship(back_populates="prescriptions")
    prescribed_date: date
    refills: int
    count: int


class Rx(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


class SigCode(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    code: str
