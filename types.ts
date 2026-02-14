
export enum PatientStatus {
  READY = 'Ready',
  IN_CONSULTATION = 'In-Consultation',
  LAB_PENDING = 'Lab Pending',
  COMPLETE = 'Complete'
}

export interface PhenotypeData {
  bloodPressure: string;
  heartRate: number;
  bmi: number;
  temperature: string;
  oxygenLevel: number;
}

export interface LabResult {
  id: string;
  test: string;
  value: string;
  unit: string;
  status: 'Normal' | 'High' | 'Low';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  timings: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  instruction: 'Before Food' | 'After Food' | 'With Food';
}

export interface StructuredDiagnosis {
  summary: string;
  diet: {
    recommended: string[];
    avoid: string[];
  };
  medications: Medication[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: PatientStatus;
  history: string[];
  phenotype: PhenotypeData;
  labs: LabResult[];
  diagnosis: string | StructuredDiagnosis;
}

export type PortalView = 'DOCTOR' | 'RECEPTION';
