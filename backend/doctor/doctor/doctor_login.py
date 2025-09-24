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
class DoctorLogin:
    doctorName: str
    password: str

    def login(self):
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["doctors"]

                result = collection.find_one({"userName": self.doctorName, "password": self.password})

                if result:
                    doctorDetail : dict = {
                        "fullName": result["fullName"],
                        "specialization": result["specialization"],
                        "yearsOfExperience": result["yearsOfExperience"],
                        "hospital": result["hospital"],
                        "gender": result["gender"],
                        "phoneNumber": result["phoneNumber"],
                        "userName": result["userName"],
                    }

                    return {"response": True, "message": "Successfully Logged in", "doctorDetail": doctorDetail}
                else:
                    return {"response": False, "message": "Invalid username or password. Please try again.", "doctorDetail":{}}
                
        except Exception as e:
            return {"response": False, "message": "Server error. Please try again later.", "doctorDetail": {}}

# sa = DoctorLogin("sajeel", "Sajeel11")
# rich.print(sa.login())