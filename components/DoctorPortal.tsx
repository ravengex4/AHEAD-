
import React, { useState, useEffect } from 'react';
import { Patient, StructuredDiagnosis, Medication, PatientStatus } from '../types';
import { COLORS, Icons } from '../constants';

interface DoctorPortalProps {
  currentPatient: Patient;
  onNext: (diagnosis: StructuredDiagnosis) => void;
  isTransitioning: boolean;
  totalPatients: number;
  currentIndex: number;
}

const DoctorPortal: React.FC<DoctorPortalProps> = ({ 
  currentPatient, 
  onNext, 
  isTransitioning,
  totalPatients,
  currentIndex 
}) => {
  const [diagnosisState, setDiagnosisState] = useState<StructuredDiagnosis>({
    summary: '',
    diet: { recommended: [''], avoid: [''] },
    medications: []
  });

  useEffect(() => {
    if (typeof currentPatient.diagnosis === 'object') {
      setDiagnosisState(currentPatient.diagnosis);
    } else {
      setDiagnosisState({
        summary: '',
        diet: { recommended: [''], avoid: [''] },
        medications: []
      });
    }
  }, [currentPatient]);

  const addMedication = () => {
    const newMed: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      dosage: '',
      timings: { morning: false, afternoon: false, evening: false },
      instruction: 'After Food'
    };
    setDiagnosisState(prev => ({
      ...prev,
      medications: [...prev.medications, newMed]
    }));
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setDiagnosisState(prev => ({
      ...prev,
      medications: prev.medications.map(m => m.id === id ? { ...m, ...updates } : m)
    }));
  };

  const updateDiet = (type: 'recommended' | 'avoid', index: number, value: string) => {
    const newList = [...diagnosisState.diet[type]];
    newList[index] = value;
    setDiagnosisState(prev => ({
      ...prev,
      diet: { ...prev.diet, [type]: newList }
    }));
  };

  const addDietItem = (type: 'recommended' | 'avoid') => {
    setDiagnosisState(prev => ({
      ...prev,
      diet: { ...prev.diet, [type]: [...prev.diet[type], ''] }
    }));
  };

  return (
    <div className={`p-10 lg:p-14 transition-all-custom duration-700 ${isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="px-4 py-1.5 bg-slate-100/50 border border-slate-200 text-slate-500 text-[10px] font-black tracking-[0.2em] rounded-full uppercase">Clinical Encounter {currentIndex + 1} / {totalPatients}</div>
            <div 
              className="px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-2 shadow-sm"
              style={{ backgroundColor: `${COLORS.brandGreen}15`, color: COLORS.brandGreen }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {currentPatient.status}
            </div>
          </div>
          <h2 className="text-6xl font-extrabold tracking-tighter text-[#331832] mb-3 leading-none">
            {currentPatient.name}
          </h2>
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-lg">
            <span className="bg-slate-100 px-3 py-1 rounded-lg text-sm font-bold text-slate-600">{currentPatient.id}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{currentPatient.age} YRS</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="capitalize">{currentPatient.gender}</span>
          </div>
        </div>

        <button
          onClick={() => onNext(diagnosisState)}
          disabled={isTransitioning}
          className="group relative px-10 py-6 bg-[#331832] hover:bg-[#1A0C19] text-white rounded-[2rem] font-bold shadow-2xl shadow-purple-950/30 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 text-xl tracking-tight">Finalize Encounter</span>
          <div className="relative z-10 w-10 h-10 rounded-2xl bg-[#449DD1] flex items-center justify-center group-hover:rotate-12 transition-all">
            <Icons.ChevronRight />
          </div>
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-12">
          {/* Vitals Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="w-2 h-6 bg-[#449DD1] rounded-full" />
                Phenotype Metrics
              </h3>
              <div className="h-[2px] flex-1 ml-6 bg-slate-100/80" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <StatCard label="BP Gauge" value={currentPatient.phenotype.bloodPressure} unit="SYS/DIA" color="purple" />
              <StatCard label="Heart Rate" value={currentPatient.phenotype.heartRate} unit="BPM" color="blue" />
              <StatCard label="BMI Index" value={currentPatient.phenotype.bmi} unit="KG/M²" color="green" />
              <StatCard label="Thermal" value={currentPatient.phenotype.temperature} unit="" color="orange" />
              <StatCard label="Oxygen Sat" value={currentPatient.phenotype.oxygenLevel} unit="%" color="cyan" />
            </div>
          </section>

          {/* Diagnosis Box: THE CORE UPDATE */}
          <section className="relative group">
            {/* Ambient Background Blur */}
            <div className="absolute -inset-2 bg-gradient-to-br from-[#449DD1]/10 via-[#331832]/5 to-[#214E34]/10 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[3.5rem] p-12 border border-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.04)] space-y-12 overflow-hidden">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#449DD1]/10 to-transparent rounded-bl-[4rem]" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-[#331832] flex items-center justify-center text-white shadow-xl rotate-3">
                      <Icons.Beaker />
                   </div>
                   <div>
                    <h3 className="text-3xl font-black text-[#331832] tracking-tighter">Clinical Synthesis</h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Diagnostic Logic Engine v4</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-4 py-1.5 bg-[#449DD1]/10 text-[#449DD1] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#449DD1]/20">Auto-Saving</span>
                </div>
              </div>

              {/* Observation Logic */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[10px] font-black text-[#331832] uppercase tracking-[0.3em] ml-2">Clinical Logic & Narrative</label>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <textarea
                  value={diagnosisState.summary}
                  onChange={(e) => setDiagnosisState(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Record your clinical observations and logical deductions..."
                  className="w-full h-36 bg-[#F8F9FC] rounded-3xl p-8 border border-slate-200 focus:border-[#449DD1] focus:bg-white focus:ring-4 focus:ring-sky-400/10 outline-none text-lg font-medium transition-all placeholder:text-slate-300 leading-relaxed"
                />
              </div>

              {/* Nutritional Prescription */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                      <Icons.CheckCircle />
                    </div>
                    <label className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Recommended Fuel (Eat)</label>
                  </div>
                  <div className="space-y-3">
                    {diagnosisState.diet.recommended.map((item, i) => (
                      <div key={i} className="group flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="w-1.5 h-10 bg-emerald-200 rounded-full group-focus-within:bg-emerald-500 transition-colors" />
                        <input
                          value={item}
                          onChange={(e) => updateDiet('recommended', i, e.target.value)}
                          placeholder="High-fiber vegetables..."
                          className="flex-1 bg-emerald-50/10 rounded-2xl px-6 py-4 border border-emerald-100/40 focus:border-emerald-500 focus:bg-white outline-none text-sm font-semibold transition-all shadow-sm"
                        />
                      </div>
                    ))}
                    <button onClick={() => addDietItem('recommended')} className="text-[10px] font-black text-emerald-600 hover:text-emerald-800 transition-colors ml-6 uppercase tracking-widest">+ Add Nutrient Entry</button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <label className="text-[11px] font-black text-rose-700 uppercase tracking-widest">Restricted Intake (Avoid)</label>
                  </div>
                  <div className="space-y-3">
                    {diagnosisState.diet.avoid.map((item, i) => (
                      <div key={i} className="group flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="w-1.5 h-10 bg-rose-200 rounded-full group-focus-within:bg-rose-500 transition-colors" />
                        <input
                          value={item}
                          onChange={(e) => updateDiet('avoid', i, e.target.value)}
                          placeholder="Processed sodium intake..."
                          className="flex-1 bg-rose-50/10 rounded-2xl px-6 py-4 border border-rose-100/40 focus:border-rose-500 focus:bg-white outline-none text-sm font-semibold transition-all shadow-sm"
                        />
                      </div>
                    ))}
                    <button onClick={() => addDietItem('avoid')} className="text-[10px] font-black text-rose-600 hover:text-rose-800 transition-colors ml-6 uppercase tracking-widest">+ Add Restriction Policy</button>
                  </div>
                </div>
              </div>

              {/* Pharmaceutical Protocol */}
              <div className="space-y-8 pt-10 border-t border-slate-100 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#449DD1]/10 text-[#449DD1] flex items-center justify-center">
                       <Icons.Beaker />
                    </div>
                    <h4 className="text-[11px] font-black text-[#331832] uppercase tracking-[0.3em]">Pharmaceutical Protocol</h4>
                  </div>
                  <button 
                    onClick={addMedication}
                    className="px-6 py-3 bg-[#331832] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg active:scale-95"
                  >
                    Prescribe Medication
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {diagnosisState.medications.length === 0 && (
                    <div className="bg-slate-50/30 rounded-[2.5rem] p-16 text-center text-slate-300 border border-dashed border-slate-200 group-hover:bg-slate-50/50 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                        <Icons.Beaker />
                      </div>
                      <p className="font-bold text-sm uppercase tracking-widest opacity-60">No pharmaceutical agents deployed.</p>
                    </div>
                  )}
                  {diagnosisState.medications.map((med, idx) => (
                    <div key={med.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row gap-10 items-start md:items-center group/med transition-all hover:shadow-2xl hover:border-[#449DD1]/20 animate-in zoom-in-95 fade-in duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className="flex-1 w-full space-y-6">
                        <div className="relative">
                          <input
                            value={med.name}
                            onChange={(e) => updateMedication(med.id, { name: e.target.value })}
                            placeholder="Drug Identity (e.g. Lisinopril)"
                            className="w-full text-3xl font-black text-[#331832] border-b-2 border-slate-50 focus:border-[#449DD1] outline-none py-2 transition-all placeholder:text-slate-200 tracking-tight"
                          />
                          <div className="absolute top-0 right-0 px-3 py-1 bg-sky-50 text-[#449DD1] text-[9px] font-black rounded-lg border border-sky-100 uppercase tracking-tighter">Rx Validated</div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronize Cycle:</span>
                           <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                             {(['morning', 'afternoon', 'evening'] as const).map(time => (
                               <button
                                 key={time}
                                 onClick={() => updateMedication(med.id, { timings: { ...med.timings, [time]: !med.timings[time] } })}
                                 className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm ${
                                   med.timings[time] 
                                     ? 'bg-[#331832] text-white shadow-[#331832]/20' 
                                     : 'bg-transparent text-slate-400 hover:text-slate-600'
                                 }`}
                               >
                                 {time}
                               </button>
                             ))}
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[220px]">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Consumption Instruction</label>
                           <select 
                            value={med.instruction}
                            onChange={(e) => updateMedication(med.id, { instruction: e.target.value as any })}
                            className="w-full bg-[#F8F9FC] rounded-2xl px-5 py-4 text-xs font-black text-[#331832] outline-none cursor-pointer border border-slate-100 hover:border-[#449DD1] transition-all"
                          >
                            <option>Before Food</option>
                            <option>After Food</option>
                            <option>With Food</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Concentration Level</label>
                           <input
                            value={med.dosage}
                            onChange={(e) => updateMedication(med.id, { dosage: e.target.value })}
                            placeholder="Dosage (e.g. 10mg)"
                            className="w-full bg-[#F8F9FC] rounded-2xl px-5 py-4 text-xs font-black outline-none border border-slate-100 focus:bg-white focus:border-[#449DD1] transition-all"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setDiagnosisState(prev => ({ ...prev, medications: prev.medications.filter(m => m.id !== med.id) }))}
                        className="opacity-0 group-hover/med:opacity-100 p-4 text-slate-300 hover:text-rose-500 transition-all rounded-full hover:bg-rose-50 active:scale-90"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 6m-4.74 0 .34-6m9.27-2.31a1.21 1.21 0 0 1-1.21 1.21H5.47a1.21 1.21 0 0 1-1.21-1.21m15.35 0a2.42 2.42 0 0 0-2.41-2.41H7.17a2.42 2.42 0 0 0-2.41 2.41m15.35 0a2.42 2.42 0 0 0 2.41 2.41H7.17a2.42 2.42 0 0 0-2.41-2.41" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Intelligence Sidebar */}
        <div className="xl:col-span-4 space-y-10">
          <section className="bg-gradient-to-b from-[#331832] to-[#1A0C19] text-white rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#449DD1] rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-12">Clinical Chronology</h3>
            <div className="space-y-10 relative z-10">
              {currentPatient.history.map((event, i) => (
                <div key={i} className="flex gap-8 relative animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="relative">
                    <div className="w-[2px] h-full bg-white/5 absolute left-1/2 -translate-x-1/2" />
                    <div className="w-4 h-4 bg-[#449DD1] rounded-full relative z-10 ring-[10px] ring-white/5 shadow-lg shadow-sky-500/20" />
                  </div>
                  <div className="pb-6">
                    <div className="text-xl font-bold tracking-tight mb-1">{event}</div>
                    <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Verified Record</div>
                  </div>
                </div>
              ))}
              {currentPatient.history.length === 0 && <div className="text-white/20 italic font-medium p-6 border border-white/5 rounded-3xl">No archival records present for this ID.</div>}
            </div>
          </section>

          <section className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#449DD1]/5 rounded-bl-full" />
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
               <Icons.Chart /> Intelligence Feed
             </h3>
             <div className="space-y-6">
                <div className="p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100/50 relative overflow-hidden group hover:bg-amber-50 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/50" />
                    <div className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Clinical Alert</div>
                  </div>
                  <p className="text-sm text-amber-900 font-bold leading-relaxed">System detects trend in hypertensive episodes. Immediate diet modification recommended.</p>
                </div>
                <div className="p-8 bg-sky-50/50 rounded-[2.5rem] border border-sky-100/50 relative overflow-hidden group hover:bg-sky-50 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#449DD1]" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#449DD1]" />
                    <div className="text-[10px] font-black text-[#449DD1] uppercase tracking-widest">Predictive Insight</div>
                  </div>
                  <p className="text-sm text-sky-900 font-bold leading-relaxed">High metabolic resilience detected. Protocol 9.2 efficacy likely > 94%.</p>
                </div>
             </div>
          </section>

          <div className="bg-gradient-to-br from-[#214E34] via-[#163523] to-[#0F2418] text-white rounded-[3.5rem] p-12 shadow-2xl flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-[2rem] backdrop-blur-xl border border-white/10 text-emerald-400 flex items-center justify-center shadow-2xl">
                <Icons.CheckCircle />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tight leading-none">Genomic Ready</h4>
                <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest mt-2">Precision Tier 1</p>
              </div>
            </div>
            <p className="text-white/70 font-medium leading-relaxed mb-8 relative z-10">
              Phenotype match indicates strong candidacy for advanced epigenetic screening. Priority sequencing authorized.
            </p>
            <button className="w-full py-5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 relative z-10">
              Initiate Sequencing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
  color: 'purple' | 'blue' | 'green' | 'orange' | 'cyan';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, color }) => {
  const colorMap = {
    purple: 'border-purple-100 text-[#331832] bg-purple-50/20',
    blue: 'border-blue-100 text-blue-600 bg-blue-50/20',
    green: 'border-emerald-100 text-emerald-600 bg-emerald-50/20',
    orange: 'border-orange-100 text-orange-600 bg-orange-50/20',
    cyan: 'border-cyan-100 text-cyan-600 bg-cyan-50/20',
  };

  return (
    <div className={`p-8 rounded-[2.5rem] border ${colorMap[color]} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden flex flex-col justify-between h-40`}>
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
         <div className={`w-full h-full rounded-full bg-current blur-3xl`} />
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{label}</div>
      <div>
        <div className="text-4xl font-black tabular-nums tracking-tighter mb-1 leading-none">
          {value}
        </div>
        <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">{unit}</div>
      </div>
    </div>
  );
};

export default DoctorPortal;
