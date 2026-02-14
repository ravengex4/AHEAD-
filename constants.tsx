
import React from 'react';

export const COLORS = {
  primaryBase: '#331832',
  brandGreen: '#214E34',
  actionBlue: '#449DD1',
  surface: '#F1F2F6',
};

export const Icons = {
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  Beaker: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .892-.567 1.686-1.398 2.04A11.315 11.315 0 0 0 3.75 12c0 2.278.673 4.398 1.837 6.173A1.125 1.125 0 0 0 6.551 18.75h10.898a1.125 1.125 0 0 0 .964-.577A11.315 11.315 0 0 0 20.25 12c0-2.278-.673-4.398-1.837-6.173a1.125 1.125 0 0 0-1.398-2.04v-1.244A1.125 1.125 0 0 0 15.891 2H8.109a1.125 1.125 0 0 0-1.125 1.125Z" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0h.5m-1.5 0h-10" />
    </svg>
  ),
  Queue: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
};

export const INITIAL_QUEUE: any[] = [
  {
    id: 'P-1042',
    name: 'Eleanor Thorne',
    age: 64,
    gender: 'Female',
    status: 'Ready',
    history: ['Hypertension', 'Type 2 Diabetes', 'Annual Wellness 2023'],
    phenotype: {
      bloodPressure: '138/88',
      heartRate: 72,
      bmi: 28.4,
      temperature: '98.6°F',
      oxygenLevel: 98
    },
    labs: [
      { id: 'L1', test: 'HbA1c', value: '7.1', unit: '%', status: 'High' },
      { id: 'L2', test: 'LDL Cholesterol', value: '115', unit: 'mg/dL', status: 'High' },
      { id: 'L3', test: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', status: 'Normal' }
    ],
    diagnosis: ''
  },
  {
    id: 'P-1058',
    name: 'Julian Vance',
    age: 42,
    gender: 'Male',
    status: 'Ready',
    history: ['Asthma', 'Seasonal Allergies'],
    phenotype: {
      bloodPressure: '122/78',
      heartRate: 64,
      bmi: 24.1,
      temperature: '97.9°F',
      oxygenLevel: 99
    },
    labs: [
      { id: 'L4', test: 'WBC Count', value: '6.4', unit: '10^3/uL', status: 'Normal' },
      { id: 'L5', test: 'Vitamin D', value: '22', unit: 'ng/mL', status: 'Low' }
    ],
    diagnosis: ''
  },
  {
    id: 'P-1102',
    name: 'Sarah Chen',
    age: 29,
    gender: 'Female',
    status: 'Ready',
    history: ['None'],
    phenotype: {
      bloodPressure: '110/70',
      heartRate: 78,
      bmi: 21.5,
      temperature: '98.4°F',
      oxygenLevel: 100
    },
    labs: [
      { id: 'L6', test: 'Iron Serum', value: '85', unit: 'ug/dL', status: 'Normal' }
    ],
    diagnosis: ''
  }
];
