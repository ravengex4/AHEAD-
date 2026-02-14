
import React, { useState } from 'react';
import { Patient, PatientStatus } from '../types';
import { COLORS, Icons } from '../constants';

interface ReceptionPortalProps {
  queue: Patient[];
  onAddPatient: (p: Patient) => void;
  onUpdateStatus: (id: string, status: PatientStatus) => void;
}

const ReceptionPortal: React.FC<ReceptionPortalProps> = ({ queue, onAddPatient, onUpdateStatus }) => {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    
    const newPatient: Patient = {
      id: `P-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      age: Math.floor(20 + Math.random() * 50),
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      status: PatientStatus.READY,
      history: [],
      phenotype: {
        bloodPressure: '120/80',
        heartRate: 70,
        bmi: 22.5,
        temperature: '98.6°F',
        oxygenLevel: 99
      },
      labs: [],
      diagnosis: ''
    };
    
    onAddPatient(newPatient);
    setNewName('');
    setShowForm(false);
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#331832]">Queue Manager</h2>
          <p className="text-slate-500 font-medium">Real-time clinical throughput monitoring</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-[#331832] text-white rounded-2xl font-bold shadow-xl shadow-purple-900/20 hover:scale-105 transition-transform active:scale-95"
        >
          {showForm ? 'Cancel Registration' : 'Register New Patient'}
        </button>
      </header>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 mb-12 border-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleRegister} className="flex gap-4 max-w-2xl">
            <input
              type="text"
              placeholder="Patient Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:border-[#449DD1] outline-none text-lg"
              autoFocus
            />
            <button type="submit" className="px-8 py-4 bg-[#214E34] text-white rounded-2xl font-bold">
              Confirm Check-in
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queue.map((patient) => (
          <div key={patient.id} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`} 
                 style={{ backgroundColor: patient.status === PatientStatus.COMPLETE ? COLORS.brandGreen : COLORS.actionBlue }} />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <span className="text-xs font-black text-slate-300 tracking-widest">{patient.id}</span>
                <h3 className="text-xl font-bold text-[#331832] group-hover:text-[#449DD1] transition-colors">{patient.name}</h3>
              </div>
              <div 
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter`}
                style={{ 
                  backgroundColor: patient.status === PatientStatus.COMPLETE ? '#E8F5E9' : '#E3F2FD',
                  color: patient.status === PatientStatus.COMPLETE ? '#2E7D32' : '#1565C0'
                }}
              >
                {patient.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Age</div>
                <div className="font-bold">{patient.age} YRS</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Gender</div>
                <div className="font-bold">{patient.gender}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {patient.status !== PatientStatus.COMPLETE && (
                <button 
                  onClick={() => onUpdateStatus(patient.id, PatientStatus.IN_CONSULTATION)}
                  className="w-full py-3 bg-[#449DD1] text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-900/10 hover:bg-[#388bbd]"
                >
                  Mark as In-Consultation
                </button>
              )}
              <button className="w-full py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                View Lab History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionPortal;
