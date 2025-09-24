from dataclasses import dataclass
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

#-----------------------------------------------------------------------------------------------------------

load_dotenv()
mongodp =  os.getenv("mongodp")
 
#-------------------------------------------------------------------------------------------------------------- 

@dataclass
class DoctorRegistration:
    fullName: str
    specialization: str
    yearsOfExperience: int
    hospital: str
    gender: str
    phoneNumber: str
    userName: str
    password: str
    consent: bool

    def check_doctor_is_already(self) -> bool:
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["doctors"]

                result = collection.find_one({"userName": self.userName})

                if result:
                    return False
                else:
                    return True
                
        except Exception as e:
            return False
        

    def Registration(self) -> dict:
        try:
            now = datetime.now()

            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["doctors"]

                result = collection.insert_one(
                    {
                       "fullName": self.fullName, 
                       "specialization": self.specialization,
                       "yearsOfExperience": self.yearsOfExperience,
                       "hospital": self.hospital,
                       "gender": self.gender,
                       "phoneNumber": self.phoneNumber,
                       "userName": self.userName,
                       "password": self.password,
                       "consent": self.consent,
                       "date": now.strftime("%Y-%m-%d"),
                       "time": now.strftime("%H:%M:%S"),
                       "patientUserNames": []
                    }
                )

                if result:
                        return {"status": True, "message": "Thank you for registering. Your details have been saved successfully."}
                else:
                    return {"status": False, "message": "Unable to complete registration at this time. Kindly try again shortly."}
        except Exception as e:
            return {"status": False, "message": "Server error. Please try again later."}
