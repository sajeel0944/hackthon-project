import os
from typing import Optional
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from administration.admin_login import AdministrationLogin
from administration.doctor_registration import DoctorRegistration
from administration.patient_registration import PatientRegistration
from doctor.add_patient_details import AddPatientDetails
from doctor.doctor_login import DoctorLogin
from patient.patient_login import PatientLogin

#---------------------------------------------------------------------------------------------------------

load_dotenv()
mongodp =  os.getenv("mongodp")
app = FastAPI()

#---------------------------------------------------------------------------------------------------------

# ye midleware hai is main bata ky hamary api kis kis url par chayly ga
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://nafees-bakery-and-general-store-fro.vercel.app"],
    allow_methods=["GET", "POST", "DELETE", "OPTIONS", "PUT",],
    allow_headers=["*"],
)


# -------------------------------------------------------------------------------------------------------------------
#                                          administration
# -------------------------------------------------------------------------------------------------------------------

#------------------------------------is ky andar admin login ho raha hai---------------------------------------------

@app.get("/administration-login")
def patient_login(adminName: str, password: str) -> dict:
    try:
        login = AdministrationLogin(adminName=adminName, password=password)
        response = login.login()
        
        return response
    except Exception as e:
        return {"response": False, "message": "Server error. Please try again later.", "adminDetail": {}}
    

# ------------------------------------is ky andar patient register ho raha hai--------------------------------------

class PatientRegistrationSchema(BaseModel):
    fullName: str
    phoneNumber: str
    age: int
    gender: str
    userName: str
    password: str
    consent: bool

@app.post("/patient-registration")
def patient_registration(patient_data: PatientRegistrationSchema) -> dict:
    try:
        register = PatientRegistration(**patient_data.dict())
        check = register.check_patient_is_already()
        if check:
            patient_register = register.Registration()
            return patient_register
        else:
            return {"status": False, "message": "Invalid user name. Please try again."}
        
    except Exception as e:
        return {"status": False, "message": "Server error. Please try again later."}


# ------------------------------------is ky andar doctor register ho raha hai--------------------------------------

class DoctorRegistrationSchema(BaseModel):
    fullName: str
    specialization: str
    yearsOfExperience: int
    hospital: str
    gender: str
    phoneNumber: str
    userName: str
    password: str
    consent: bool

@app.post("/doctor-registration")
def doctor_registration(doctor_data: DoctorRegistrationSchema) -> dict:
    try:
        register = DoctorRegistration(**doctor_data.dict())
        check = register.check_doctor_is_already()
        if check:
            patient_register = register.Registration()
            return patient_register
        else:
            return {"status": False, "message": "Invalid user name. Please try again."}
        
    except Exception as e:
        return {"status": False, "message": "Server error. Please try again later."}
    

# -------------------------------------------------------------------------------------------------------------------
#                                            Doctor
# -------------------------------------------------------------------------------------------------------------------

#------------------------------------is ky andar doctor login ho raha hai--------------------------------------------

@app.get("/doctor/doctor-login")
def doctor_login(doctorName: str, password: str):
    try:
        login = DoctorLogin(doctorName=doctorName, password=password)
        response = login.login()
        
        return response
    except Exception as e:
        return {"response": False, "message": "Server error. Please try again later.", "doctorDetail": {}}    


#------------------------------------is ky andar doctor patient ki detaill add kar raha hai--------------------------------------------

class AddPatientDetailsSchema(BaseModel):
    hospital: str
    doctorfullName: str
    doctorUserName: str
    doctorSpecialization: str
    patientUserName: str
    primaryDiagnosis: Optional[str] = None
    bloodType: Optional[str] = None
    currentMedications: Optional[str] = None
    allergies: Optional[str] = None
    prescribedMedication: Optional[str] = None
    monitoringInstructions: str
    systolicBP_Max: Optional[str] = None
    diastolicBP_Max: Optional[str] = None  
    GlucoseMax: Optional[str] = None

@app.put("/doctor/add-patient-detail")
def add_patient_detail(detail: AddPatientDetailsSchema):
    try:
        result = AddPatientDetails(**detail.dict())
        return result.add_detail()
    except Exception as e:
        return {"status": False, "response": "Something went wrong while updating the patient details. Please try again later or contact support."}


# -------------------------------------------------------------------------------------------------------------------
#                                            Patient
# -------------------------------------------------------------------------------------------------------------------

#------------------------------------is ky andar patient login ho raha hai---------------------------------------------------------------------

@app.get("/patient-login")
def patient_login(patientName: str, password: str):
    try:
        login = PatientLogin(patientName=patientName, password=password)
        response = login.login()
        
        return response
    except Exception as e:
        return {"response": False, "message": "Server error. Please try again later.", "patientData": {}}
