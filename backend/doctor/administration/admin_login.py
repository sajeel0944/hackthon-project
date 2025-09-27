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
class AdministrationLogin:
    adminName: str
    password: str

    def login(self) -> dict:
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AHMS"]
                collection = db["administration"]

                result = collection.find_one({"adminName": self.adminName, "password": self.password})

                if result:
                    adminDetail : dict = {
                        "adminName": result["adminName"],
                        "city": result["city"],
                        "country": result["country"],
                        "hospitalName": result["hospitalName"]
                    }
                    return {"response": True, "message": "Successfully Logged in", "adminDetail": adminDetail}
                else:
                    return {"response": False, "message": "Invalid username or password. Please try again.", "adminDetail":{}}
                
        except Exception as e:
            return {"response": False, "message": f"Server error. Please try again later.", "adminDetail":{}}

# sa = AdministrationLogin("iffat", "333333")
# rich.print(sa.login())
