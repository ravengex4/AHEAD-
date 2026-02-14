
import React, { useState } from 'react';
import { Patient, PortalView, PatientStatus, StructuredDiagnosis } from './types';
import { INITIAL_QUEUE, COLORS, Icons } from './constants';
import DoctorPortal from './components/DoctorPortal';
import ReceptionPortal from './components/ReceptionPortal';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<PortalView | null>(null);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_QUEUE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextPatient = (updatedDiagnosis: StructuredDiagnosis) => {
    setIsTransitioning(true);
    
    const updatedPatients = [...patients];
    updatedPatients[currentIndex] = {
      ...updatedPatients[currentIndex],
      diagnosis: updatedDiagnosis,
      status: PatientStatus.COMPLETE,
    };
    
    setPatients(updatedPatients);

    setTimeout(() => {
      const nextIdx = (currentIndex + 1) % patients.length;
      setCurrentIndex(nextIdx);
      setIsTransitioning(false);
    }, 600);
  };

  const addPatient = (newPatient: Patient) => {
    setPatients(prev => [...prev, newPatient]);
  };

  const updateStatus = (id: string, status: PatientStatus) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const logout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <LoginPage onLogin={setUserRole} />;
  }

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-[#F8F9FC] animate-in fade-in duration-700">
      {/* Sleek Floating Sidebar */}
      <aside 
        className="m-6 w-24 lg:w-72 flex flex-col h-[calc(100vh-3rem)] rounded-[2.5rem] text-white z-20 transition-all duration-500 ease-in-out shadow-2xl relative overflow-hidden"
        style={{ background: userRole === 'DOCTOR' ? 'linear-gradient(180deg, #331832 0%, #1A0C19 100%)' : 'linear-gradient(180deg, #214E34 0%, #0F2418 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="p-8 relative z-10">
          <h1 className="text-2xl font-black tracking-tighter flex items-center justify-center lg:justify-start gap-3">
            <span className="w-10 h-10 flex items-center justify-center bg-white text-slate-900 rounded-2xl shadow-xl font-extrabold">A</span>
            <span className="hidden lg:inline uppercase tracking-widest text-lg font-bold">HEAD</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-4 px-6 mt-12 relative z-10">
          <div className="px-4 py-2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hidden lg:block">
            Workspace
          </div>
          <div className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl bg-white/10 border border-white/10 shadow-lg cursor-default">
            <div className="text-[#449DD1]">
              {userRole === 'DOCTOR' ? <Icons.User /> : <Icons.Queue />}
            </div>
            <span className="hidden lg:inline font-bold tracking-tight">
              {userRole === 'DOCTOR' ? 'Doctor Portal' : 'Logistics Core'}
            </span>
          </div>

          <div className="pt-8">
            <div className="px-4 py-2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hidden lg:block mb-2">
              Management
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl hover:bg-white/5 transition-all text-white/40 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              <span className="hidden lg:inline font-semibold">Terminate Session</span>
            </button>
          </div>
        </nav>

        <div className="p-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 hidden lg:block border border-white/5">
            <div className="text-[10px] font-black text-white/30 mb-2 uppercase tracking-widest">Operator Identity</div>
            <div className="font-bold text-sm tracking-tight truncate">
              {userRole === 'DOCTOR' ? 'Dr. Harrison Wells' : 'Clinical Manager'}
            </div>
            <div className="text-[11px] font-medium text-[#449DD1]">
              {userRole === 'DOCTOR' ? 'Specialist Oncology' : 'Operations Lead'}
            </div>
          </div>
        </div>
      </aside>

      {/* Modern High-Contrast Canvas */}
      <main className="flex-1 relative bg-[#F8F9FC] overflow-y-auto pt-6 pr-6 pb-6">
        <div className="h-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-y-auto">
          {userRole === 'DOCTOR' ? (
            <DoctorPortal 
              currentPatient={patients[currentIndex]} 
              onNext={handleNextPatient}
              isTransitioning={isTransitioning}
              totalPatients={patients.length}
              currentIndex={currentIndex}
            />
          ) : (
            <ReceptionPortal 
              queue={patients} 
              onAddPatient={addPatient}
              onUpdateStatus={updateStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
