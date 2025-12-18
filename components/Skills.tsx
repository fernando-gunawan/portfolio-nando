import React from 'react';
import { SKILLS } from '../constants';
import {
  Cpu, Database, Layout, Terminal,
  Code2, Sigma, BarChart, Zap, Grid,
  BrainCircuit, Sparkles, LineChart, GitBranch,
  Box
} from 'lucide-react';

const Skills: React.FC = () => {

  const getSkillIcon = (name: string, category: string) => {
    const n = name.toLowerCase();

    // Specific mappings
    if (n.includes('python')) return <Code2 size={24} />;
    if (n.includes('sql')) return <Database size={24} />;
    if (n === 'r') return <Sigma size={24} />;
    if (n.includes('tableau') || n.includes('power bi')) return <BarChart size={24} />;
    if (n.includes('spark')) return <Zap size={24} />;
    if (n.includes('pandas') || n.includes('numpy')) return <Grid size={24} />;
    if (n.includes('scikit') || n.includes('tensorflow')) return <BrainCircuit size={24} />;
    if (n.includes('cleaning')) return <Sparkles size={24} />;
    if (n.includes('intelligence')) return <LineChart size={24} />;
    if (n.includes('git')) return <GitBranch size={24} />;

    // Category fallbacks
    switch (category) {
      case 'Language': return <Terminal size={24} />;
      case 'Tool': return <Cpu size={24} />;
      case 'Framework': return <Box size={24} />;
      default: return <Layout size={24} />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Technical <span className="text-accent">Arsenal</span>
          </h2>
          <p className="text-slate-200 max-w-xl mx-auto">
            Rangkaian teknologi yang saya gunakan untuk mengubah raw data menjadi solusi cerdas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="group reveal-zoom bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-5 rounded-xl hover:border-accent/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-accent/20 group-hover:text-accent text-slate-400 transition-colors">
                  {getSkillIcon(skill.name, skill.category)}
                </div>
                <span className="text-xs font-mono text-slate-500">{skill.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                {skill.name}
              </h3>
              <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-purple w-[0%] group-hover:w-[85%] transition-all duration-1000 ease-out rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;