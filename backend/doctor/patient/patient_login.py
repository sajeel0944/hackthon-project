from dataclasses import dataclass
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import rich

#-----------------------------------------------------------------------------------------------------------

load_dotenv()
mongodp =  os.getenv("mongodp")
 
#-------------------------------------------------------------------------------------------------------------- 

@dataclass
class PatientLogin:
    patientName: str
    password: str

    def login(self):
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["patients"]

                result = collection.find_one({"userName": self.patientName, "password": self.password})

                if result:
                    patientdata : dict = {
                        "fullName": result["fullName"],
                        "phoneNumber": result["phoneNumber"],
                        "age": result["age"],
                        "gender": result["gender"],
                        "userName": result["userName"],
                    }

                    return {"response": True, "message": "Successfully Logged in", "patientData": patientdata}
                else:
                    return {"response": False, "message": "Invalid username or password. Please try again.", "patientData": {}}
                
        except Exception as e:
            return {"response": False, "message": "Server error. Please try again later.", "patientData": {}}

# sa = PatientLogin("saif", "Saif1111")
# rich.print(sa.login())