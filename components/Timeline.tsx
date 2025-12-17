import React from 'react';
import { EXPERIENCES } from '../constants';
import { Briefcase, Calendar } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative space-y-12">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:-translate-x-1/2"></div>

        {EXPERIENCES.map((exp, idx) => (
          <div 
            key={exp.id} 
            className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'reveal-left md:flex-row-reverse' : 'reveal-right'}`}
          >
            
            {/* Dot on Line */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-slate-900 md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

            {/* Content Card */}
            <div className="ml-12 md:ml-0 md:w-1/2 px-4 md:px-8 w-full">
              <div className="group bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-medium border border-accent/20">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                  <Briefcase size={16} className="text-purple" />
                  {exp.company}
                </h4>
                
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-accent shrink-0 transition-colors"></span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Empty space for the other side */}
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;