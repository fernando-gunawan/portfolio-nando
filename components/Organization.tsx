import React from 'react';
import { ORGANIZATIONS } from '../constants';
import { Users, Calendar, Award, UserCheck } from 'lucide-react';

const Organization: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ORGANIZATIONS.map((org, idx) => (
        <div 
          key={org.id}
          className="group relative bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500"></div>

          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-accent/10 group-hover:text-accent text-slate-400 transition-colors">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-white/5">
              <Calendar size={12} />
              {org.period}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">
              {org.role}
            </h3>
            <h4 className="text-slate-400 font-medium text-sm mb-4 flex items-center gap-2">
              <Award size={14} className="text-purple" />
              {org.name}
            </h4>
            
            <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {org.description}
            </p>
          </div>

          {/* Hover Bottom Line */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-purple group-hover:w-full transition-all duration-500 ease-out"></div>
        </div>
      ))}
      
      {/* Optional: Add a "More" card or Call to Action if needed */}
      <div className="hidden lg:flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-2xl text-slate-500 hover:text-accent hover:border-accent/30 transition-all cursor-default group">
         <UserCheck size={40} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
         <p className="text-sm font-medium text-center">Active Contributor &<br/>Team Player</p>
      </div>
    </div>
  );
};

export default Organization;