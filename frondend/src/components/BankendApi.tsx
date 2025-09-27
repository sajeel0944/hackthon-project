// -------------------------------------------------------------------------------------------------------------------
//                                           administration
//  -------------------------------------------------------------------------------------------------------------------

// ------------------------------------is ky andar admin login ho raha hai---------------------------------------------------------------------



export async function AdministrationLogin(adminName: string, password: string) {
  const base = "http://localhost:8000";
  if (base) {
    try {
      const reponse = await fetch(
        `${base}/administration-login?adminName=${adminName}&password=${password}`
      );

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        response: false,
        message: "Something went wrong. Please try again later.",
        adminDetail: {},
      };
    }
  } else {
    return {
      response: false,
      message: "Something went wrong. Please try again later.",
      adminDetail: {},
    };
  }
}

// ------------------------------------is ky andar patient register ho raha hai--------------------------------------

export interface PatientRegisterSchema {
  fullName: string;
  phoneNumber: string;
  age: number;
  gender: string;
  userName: string;
  password: string;
  consent: boolean;
}

export async function PatientRegister(patient_data: PatientRegisterSchema) {
  const base = process.env.NEXT_PUBLIC_ADDTOCARDAPI;
  if (base) {
    try {
      const reponse = await fetch(`${base}/patient-registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient_data),
      });

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        status: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  } else {
    return {
      status: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// ------------------------------------is ky andar doctor register ho raha hai--------------------------------------

export interface DoctorRegisterSchema {
  fullName: string;
  specialization: string;
  yearsOfExperience: number;
  hospital: string;
  gender: string;
  phoneNumber: string;
  userName: string;
  password: string;
  consent: boolean;
}

export async function DoctorRegister(doctor_data: DoctorRegisterSchema) {
  const base = process.env.NEXT_PUBLIC_ADDTOCARDAPI;
  if (base) {
    try {
      const reponse = await fetch(`${base}/doctor-registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor_data),
      });

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        status: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  } else {
    return {
      status: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// -------------------------------------------------------------------------------------------------------------------
//                                           Doctor
//  -------------------------------------------------------------------------------------------------------------------

// ------------------------------------is ky andar doctor login ho raha hai---------------------------------------------------------------------

export async function DoctorSignIn(doctorName: string, password: string) {
  const base = process.env.NEXT_PUBLIC_ADDTOCARDAPI;
  if (base) {
    try {
      const reponse = await fetch(
        `${base}/doctor/doctor-login?doctorName=${doctorName}&password=${password}`
      );

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        response: false,
        message: "Something went wrong. Please try again later.",
        doctorDetail: {},
      };
    }
  } else {
    return {
      response: false,
      message: "Something went wrong. Please try again later.",
      doctorDetail: {},
    };
  }
}

// ------------------------------------is ky andar doctor patient ki detaill add kar raha hai--------------------------------------------

export interface AddPatientDetailsSchema {
  hospital: string;
  doctorfullName: string;
  doctorUserName: string;
  doctorSpecialization: string;
  patientUserName: string;
  primaryDiagnosis?: string;
  bloodType?: string;
  currentMedications?: string;
  allergies?: string;
  prescribedMedication?: string;
  monitoringInstructions: string;
  systolicBP_Max?: string;
  diastolicBP_Max?: string;
  GlucoseMax?: string;
}

export async function AddPatientDetails(detail: AddPatientDetailsSchema) {
  const base = process.env.NEXT_PUBLIC_ADDTOCARDAPI;
  if (base) {
    try {
      const reponse = await fetch(`${base}/doctor/add-patient-detail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        status: false,
        response:
          "Something went wrong while updating the patient details. Please try again later or contact support.",
      };
    }
  } else {
    return {
      status: false,
      response:
        "Something went wrong while updating the patient details. Please try again later or contact support.",
    };
  }
}

// -------------------------------------------------------------------------------------------------------------------
//                                           Patient
//  -------------------------------------------------------------------------------------------------------------------

// ------------------------------------is ky andar patient login ho raha hai---------------------------------------------------------------------

export async function PatientSignIn(patientName: string, password: string) {
  const base = process.env.NEXT_PUBLIC_ADDTOCARDAPI;
  if (base) {
    try {
      const reponse = await fetch(
        `${base}/patient-login?patientName=${patientName}&password=${password}`
      );

      const convert = await reponse.json();
      return convert;
    } catch (error) {
      return {
        response: false,
        message: "Something went wrong. Please try again later.",
        patientData: {},
      };
    }
  } else {
    return {
      response: false,
      message: "Something went wrong. Please try again later.",
      patientData: {},
    };
  }
}
