import React, { useState } from 'react';
import { Database, Code2, ArrowUpRight, Star, GitFork, Eye, BarChart3, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [showVisual, setShowVisual] = useState(false);

  return (
    <div 
      className="group relative rounded-2xl transition-all duration-500 hover:-translate-y-2 h-full cursor-pointer"
      onClick={() => onClick && onClick(project)}
    >
      {/* Animated Glow Effect Background */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-accent via-purple to-accent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl blur-sm group-hover:animate-pulse-slow"></div>
      
      {/* Card Content */}
      <div className="relative h-full bg-[#0b1121] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-xl">
        
        {/* Media Section: Image or Interactive Chart */}
        <div className="relative h-52 overflow-hidden bg-slate-900">
          
          {showVisual && project.visualConfig?.type === 'bar' && project.visualConfig.data ? (
             // Interactive Bar Chart
             <div 
                className="w-full h-full p-6 flex items-end justify-center gap-3 animate-fade-in-up bg-slate-900/50 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()} // Prevent modal open when clicking chart
             >
                {project.visualConfig.data.values.map((val, i) => (
                  <div key={i} className="relative group/bar flex flex-col items-center gap-2 w-full h-full justify-end">
                      {/* Bar */}
                      <div
                        className="w-full max-w-[40px] bg-accent/20 border border-accent/50 rounded-t-sm transition-all duration-500 hover:bg-accent/60 relative hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        style={{ height: `${val}%` }}
                      >
                         {/* Tooltip */}
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-white/10 z-20 pointer-events-none shadow-lg font-bold">
                            {val}%
                         </div>
                      </div>
                      {/* Label */}
                      <span className="text-[10px] text-slate-400 font-mono text-center truncate w-full uppercase tracking-wider">{project.visualConfig.data?.labels[i]}</span>
                  </div>
                ))}
             </div>
          ) : (
            // Standard Image Preview
            <>
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500 z-10" />
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </>
          )}

          {/* Toggle Visual Button (If available) */}
          {project.visualConfig && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowVisual(!showVisual); }}
              className="absolute top-4 right-14 z-30 p-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 text-white hover:text-accent hover:border-accent/50 transition-all shadow-lg group/toggle"
              title={showVisual ? "Lihat Gambar" : "Lihat Grafik Data"}
            >
               {showVisual ? <ImageIcon size={18} /> : <BarChart3 size={18} />}
               <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-xs rounded border border-white/10 opacity-0 group-hover/toggle:opacity-100 transition-opacity whitespace-nowrap">
                 {showVisual ? "Image Preview" : "Interactive Data"}
               </span>
            </button>
          )}
          
          {/* Floating Category Icon (Moved if toggle exists) */}
          <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-white/10 text-accent shadow-lg translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Code2 size={20} />
          </div>

           {/* Preview Badge Overlay (Only show on Image Mode) */}
           {!showVisual && (
             <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
               <div className="px-3 py-1.5 bg-accent text-slate-900 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg">
                  <Eye size={12} /> Detail
               </div>
             </div>
           )}
        </div>
        
        {/* Text Content */}
        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-[#0b1121] to-[#020617]">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-tight break-words">
                {project.title}
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
              {project.description || "No description available."}
            </p>
          </div>
          
          {/* Stats (Stars/Forks) - Only show if available */}
          {(project.stars !== undefined || project.forks !== undefined) && (
            <div className="flex gap-4 mb-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1">
                <Star size={12} className={project.stars && project.stars > 0 ? "text-yellow-500" : ""} />
                <span>{project.stars || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={12} />
                <span>{project.forks || 0}</span>
              </div>
            </div>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-white/5 text-xs font-mono font-medium text-slate-300 rounded-full border border-white/5 group-hover:border-accent/30 group-hover:text-accent/90 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <button className="text-xs font-bold font-mono text-slate-500 hover:text-white flex items-center gap-2 transition-colors group/btn uppercase tracking-wider">
              <Database size={14} />
              <span className="group-hover/btn:translate-x-1 transition-transform">Details</span>
            </button>
            {project.link && (
              <a 
                href={project.link} 
                className="text-white hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-full group/link"
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking the link button
              >
                <ArrowUpRight size={20} className="group-hover/link:rotate-45 transition-transform duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;