from fastapi import HTTPException, status


class DoctorNotFound(HTTPException):
    def __init__(self, id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Doctor ID: {id} not found."
        )


class PatientNotFound(HTTPException):
    def __init__(self, id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Patient ID: {id} not found."
        )
