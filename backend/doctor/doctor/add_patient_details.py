from dataclasses import dataclass
from datetime import datetime
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import rich
from typing import Optional

#-----------------------------------------------------------------------------------------------------------

load_dotenv()
mongodp =  os.getenv("mongodp")
 
#-------------------------------------------------------------------------------------------------------------- 

@dataclass
class AddPatientDetails:
    hospital: str
    doctorfullName: str
    doctorUserName: str
    doctorSpecialization: str
    patientUserName: str
    monitoringInstructions: str
    primaryDiagnosis: Optional[str] = None
    bloodType: Optional[str] = None
    currentMedications: Optional[str] = None
    allergies: Optional[str] = None
    prescribedMedication: Optional[str] = None
    systolicBP_Max: Optional[str] = None
    diastolicBP_Max: Optional[str] = None  
    GlucoseMax: Optional[str] = None

    def add_detail(self):
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["doctors"]

                result1 = collection.find_one({"patientUserNames": self.patientUserName})

                if not result1:
                    result2 = collection.update_one({"userName": self.doctorUserName}, {"$push": {"patientUserNames": self.patientUserName}})

            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["patients"]

                now = datetime.now()
                
                doctor_detail : dict = {
                    "hospital": self.hospital, 
                    "doctorfullName": self.doctorfullName, 
                    "doctorUserName": self.doctorUserName, 
                    "doctorSpecialization": self.doctorSpecialization, 
                    "primaryDiagnosis": self.primaryDiagnosis, 
                    "bloodType": self.bloodType, 
                    "currentMedications": self.currentMedications,
                    "allergies": self.allergies, 
                    "prescribedMedication": self.prescribedMedication, 
                    "monitoringInstructions": self.monitoringInstructions, 
                    "systolicBP_Max": self.systolicBP_Max, 
                    "diastolicBP_Max": self.diastolicBP_Max,   
                    "GlucoseMax": self.GlucoseMax, 
                    "date": now.strftime("%Y-%m-%d"),
                    "time": now.strftime("%H:%M:%S"),
                }

                result = collection.update_one({"userName": self.patientUserName},  {"$push": {"doctorDetails": doctor_detail}})

                if result.modified_count > 0:
                    return {"status": True, "response": "Thank you for adding patient details"}
                else:
                    return {"status": False, "response": "No record found or no changes were made."}

        except Exception as e:
            return {"status": False, "response": "Something went wrong while updating the patient details. Please try again later or contact support."}
