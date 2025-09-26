import asyncio
import os
from agents import Agent, OpenAIChatCompletionsModel, Runner, run_demo_loop, set_tracing_disabled, RunContextWrapper, AsyncOpenAI
from dotenv import load_dotenv
from pymongo import MongoClient
import rich

#----------------------------------------------------------------

load_dotenv()
set_tracing_disabled(disabled=True)

#----------------------------------------------------------------

GEMINI_API_KEY : str = os.getenv("GEMINI_API_KEY")
MODEL : str = "gemini-2.5-flash"
mongodp =  os.getenv("mongodp")

#----------------------------------------------------------------

external_client = AsyncOpenAI(
    api_key = GEMINI_API_KEY,
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model = MODEL,
    openai_client = external_client 
)

# -----------------------agent instructions--------------------------------------------

async def agent_instructions(ctx: RunContextWrapper, agent: Agent):
    try:
        with MongoClient(mongodp, tls=True) as client:
            db = client["AHMS"]
            collection = db["patients"]

            result = collection.find_one({"userName": ctx.context})
            
            if result:
                return f"""
                            
                ### Patient Monitoring Assistant Instructions

                You are an assistant doctor working under Dr. {result["doctorDetails"][-1]["doctorfullName"]} (Specialization: {result["doctorDetails"][-1]["doctorSpecialization"]}).  
                Your main responsibility is to **monitor the patient** according to the doctor's treatment plan and instructions.

                #### Patient Monitoring Task:
                - Follow the **Treatment Plan** provided by the doctor strictly.
                - Monitor the patient's condition carefully during each session.
                - Log all observations as per the doctor's instructions.
                - Pay attention to specific **monitoring instructions**, such as:
                    - Monitoring blood pressure (BP) twice daily.
                    - Checking glucose levels after meals.
                    - Alerting if medication is missed or thresholds are crossed.

                #### Patient Details Provided:
                - Full Name: {result["fullName"]}
                - Phone Number: {result["phoneNumber"]}
                - Age: {result["age"]}
                - Gender: {result["gender"]}
                - Username: {result["userName"]}
                - Consent Status: {result["consent"]}
                - Session Date & Time: {result["date"]} at {result["time"]}
                - Hospital Name : {result["doctorDetails"][-1]["hospital"]}

                #### Medical Details from Doctor:
                - Primary Diagnosis: {result["doctorDetails"][-1]["primaryDiagnosis"]}
                - Blood Type: {result["doctorDetails"][-1]["bloodType"]}
                - Current Medications: {result["doctorDetails"][-1]["currentMedications"]}
                - Allergies: {result["doctorDetails"][-1]["allergies"]}
                - Prescribed Medication: {result["doctorDetails"][-1]["prescribedMedication"]}
                - Monitoring Instructions: {result["doctorDetails"][-1]["monitoringInstructions"]}
                - Alert Thresholds:
                    - Systolic BP Max: {result["doctorDetails"][-1]["systolicBP_Max"]}
                    - Diastolic BP Max: {result["doctorDetails"][-1]["diastolicBP_Max"]}
                    - Glucose Max: {result["doctorDetails"][-1]["GlucoseMax"]}
                - Doctor Added Details Date & Time: : {result["doctorDetails"][-1]["date"]} & Time {result["doctorDetails"][-1]["time"]}

                ---

                **Important:** Do not alter any data from the database. Use it exactly as provided. Your job is to assist in monitoring and following the doctor's plan to ensure patient safety and effective treatment.
                """
                
            else:
                pass
    except:
        pass

# ----------------------------main agent---------------------------------------


agent = Agent(
    name="Doctor Assistant",
    instructions=agent_instructions,
    model=model
)

async def main(userName: str):
    await run_demo_loop(agent=agent, context=userName)
    # run = await Runner.run(agent, "who", context=userName)

    # print(run.final_output)

asyncio.run(main("saif"))
