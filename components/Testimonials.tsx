import React from 'react';
import { RECOMMENDATIONS, USER_INFO } from '../constants';
import { Quote, Linkedin, ExternalLink } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECOMMENDATIONS.map((rec) => (
          <div 
            key={rec.id}
            className="group relative bg-[#0b1121] border border-white/5 p-8 rounded-2xl hover:border-accent/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-slate-800 group-hover:text-accent/20 transition-colors">
              <Quote size={40} className="transform rotate-180" />
            </div>

            {/* Content */}
            <div className="flex-grow mb-6 relative z-10">
              <p className="text-slate-300 leading-relaxed italic relative">
                <span className="text-accent text-xl font-serif">"</span>
                {rec.text}
                <span className="text-accent text-xl font-serif">"</span>
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img 
                  src={rec.avatarUrl} 
                  alt={rec.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm group-hover:text-accent transition-colors">{rec.name}</h4>
                <p className="text-slate-500 text-xs">{rec.role}</p>
                <p className="text-slate-600 text-xs">{rec.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect on LinkedIn CTA */}
      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-[#0077b5]/10 to-[#0077b5]/5 border border-[#0077b5]/20 rounded-2xl p-8 backdrop-blur-sm reveal-zoom">
        <div className="p-4 bg-[#0077b5]/20 rounded-full text-[#0077b5] mb-4 shadow-[0_0_15px_rgba(0,119,181,0.3)]">
           <Linkedin size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Let's Connect Professionally</h3>
        <p className="text-slate-400 max-w-lg mb-6">
          Tertarik untuk berkolaborasi atau melihat detail karir saya lebih lanjut? Kunjungi profil LinkedIn saya untuk melihat riwayat lengkap dan endorsement lainnya.
        </p>
        <a 
          href={`https://${USER_INFO.linkedin}`} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#0077b5] hover:bg-[#006097] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-[#0077b5]/40 transform hover:-translate-y-1"
        >
          <span>Connect on LinkedIn</span>
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

export default Testimonials;