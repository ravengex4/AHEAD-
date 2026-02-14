
import React from 'react';
import { COLORS, Icons } from '../constants';
import { PortalView } from '../types';

interface LoginPageProps {
  onLogin: (role: PortalView) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#F8F9FC]">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#449DD1]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#331832]/10 rounded-full blur-[120px]" />

      <div className="max-w-5xl w-full z-10 px-6">
        <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full border border-slate-100 neo-shadow">
            <span className="w-2 h-2 rounded-full bg-[#449DD1] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Clinical OS v2.4.0</span>
          </div>
          <h1 className="text-7xl font-extrabold tracking-tighter text-[#331832] mb-4">
            A<span className="text-[#449DD1]">HEAD</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto leading-relaxed">
            The next generation of high-performance medical workflows. Experience the Super Clinic interface.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-1000 delay-300">
          {/* Doctor Portal Login */}
          <button
            onClick={() => onLogin('DOCTOR')}
            className="group relative h-[400px] flex flex-col justify-end p-10 rounded-[3rem] bg-[#331832] overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(51,24,50,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#331832] via-[#331832] to-[#449DD1]/30 opacity-60" />
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <Icons.User />
            </div>
            <div className="relative z-10">
              <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-2 block">Provider Access</span>
              <h3 className="text-4xl font-bold text-white mb-4">Clinical Workspace</h3>
              <p className="text-white/60 mb-8 max-w-xs leading-relaxed">Full phenotype history, AI-assisted diagnosis, and lab telemetry synthesis.</p>
              <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all">
                Enter Dashboard <Icons.ChevronRight />
              </div>
            </div>
          </button>

          {/* Receptionist Portal Login */}
          <button
            onClick={() => onLogin('RECEPTION')}
            className="group relative h-[400px] flex flex-col justify-end p-10 rounded-[3rem] bg-white border border-slate-200 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
          >
            <div className="absolute top-10 left-10 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500">
              <div className="text-[#214E34]"><Icons.Queue /></div>
            </div>
            <div className="relative z-10">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Operational Access</span>
              <h3 className="text-4xl font-bold text-[#331832] mb-4">Logistics Core</h3>
              <p className="text-slate-500 mb-8 max-w-xs leading-relaxed">Manage patient flow, queue synchronization, and clinic resource allocation.</p>
              <div className="flex items-center gap-3 text-[#449DD1] font-bold group-hover:gap-5 transition-all">
                Launch Operations <Icons.ChevronRight />
              </div>
            </div>
          </button>
        </div>

        <footer className="mt-20 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Powered by AHEAD Global Health Systems &bull; HIPAA Compliant
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
