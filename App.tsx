import React, { useState, useEffect, useRef } from 'react';
import { USER_INFO, PROJECTS } from './constants';
import { Project } from './types';
import ProjectCard from './components/ProjectCard';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Organization from './components/Organization';
import ParticleBackground from './components/ParticleBackground';
import ProjectModal from './components/ProjectModal';
import { Github, Linkedin, Mail, ChevronDown, Terminal, Database, Sparkles, FileText } from 'lucide-react';

// Typing Effect Component
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [projects] = useState<Project[]>(PROJECTS); // Use static manual projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
      revealElements.forEach((el) => observerRef.current?.observe(el));
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white bg-cosmic text-slate-200 overflow-x-hidden">

      {/* Dynamic Particle Background & Stars */}
      <div className="stars"></div>
      <ParticleBackground />

      {/* Background Gradient Overlays for depth */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-primary/80 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-white/5 glass-nav ${isScrolled ? 'py-4 shadow-2xl' : 'py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-white group relative">
            <div className="absolute -inset-2 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-10 h-10 relative z-10 flex items-center justify-center">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-mono text-white group-hover:text-accent transition-all relative z-10">
              Fernando
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['Bio', 'Skills', 'Projects', 'Experience', 'Organization'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_theme('colors.accent')]"></span>
              </a>
            ))}
          </div>

          <a href="#contact" className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-accent hover:text-slate-900 hover:border-accent transition-all duration-300 text-sm font-semibold backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            Contact Me
          </a>
        </div>
      </nav>

      {/* Hero / Bio Section */}
      <header id="bio" className="relative min-h-screen flex items-center pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left Content: Text */}
            <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800/40 rounded-full border border-accent/20 mb-8 backdrop-blur-md hover:border-accent/50 transition-colors cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_theme('colors.accent')]"></span>
                </span>
                <span className="text-accent text-xs font-mono tracking-wider font-semibold">OPEN TO OPPORTUNITIES</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Turning Raw Data into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-purple animate-pulse-slow">
                  Business Value
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl text-slate-300 font-medium mb-8 flex items-center justify-center lg:justify-start gap-3">
                <span className="text-accent font-mono">01.</span> {USER_INFO.role}
              </h2>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm mb-10 max-w-2xl mx-auto lg:mx-0 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-purple"></div>
                <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
                  <p>
                    <span className="text-accent font-mono mr-2">&gt;</span>
                    <Typewriter text={USER_INFO.bio[0]} delay={20} />
                  </p>
                  <p className="hidden md:block opacity-80">{USER_INFO.bio[1]}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16 flex-wrap">
                <a href="#projects" className="group relative px-8 py-4 bg-accent text-slate-900 rounded-lg font-bold overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2">Explore Projects <Database size={18} /></span>
                </a>

                {USER_INFO.cvUrl && (
                  <a
                    href={USER_INFO.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm hover:border-accent/50 hover:text-accent flex items-center gap-2 group/cv"
                  >
                    <span>View CV</span>
                    <FileText size={18} className="group-hover/cv:-translate-y-1 transition-transform" />
                  </a>
                )}

                <a href="#contact" className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-white/5 transition-all border border-white/20 backdrop-blur-sm hover:border-white/40">
                  Let's Talk
                </a>
              </div>
            </div>

            {/* Right Content: Image */}
            <div className="lg:w-[450px] flex justify-center animate-fade-in-up relative mx-auto" style={{ animationDelay: '0.3s' }}>
              {/* Decorative Circles behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed border-accent/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>

              <div className="relative group z-10">
                {/* Hexagon Clip or Complex Shape */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-b from-slate-800 to-transparent border border-white/10 backdrop-blur-sm">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 relative">
                    <img
                      src={USER_INFO.avatarUrl}
                      alt={USER_INFO.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale contrast-125 group-hover:grayscale-0"
                    />
                    {/* Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>

                  {/* Floating Cards */}
                  <div className="absolute -bottom-6 -right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple/20 rounded-lg text-purple">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Status</div>
                        <div className="text-sm font-bold text-white">Developing...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 opacity-50 hidden md:block z-10">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* Skills Section */}
      <div className="container mx-auto max-w-7xl">
        <Skills />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
            <div className="relative">
              <div className="absolute -left-6 top-0 w-1 h-12 bg-accent"></div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple">Projects</span></h2>
              <p className="text-slate-400 max-w-xl text-lg">
                Implementasi nyata dari analisis data dan machine learning yang memberikan dampak.
              </p>
            </div>
            <a href={`https://${USER_INFO.github}`} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-accent hover:text-slate-900 transition-all group backdrop-blur-sm">
              <span>View All on Github</span>
              <Github size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={project.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                <ProjectCard
                  project={project}
                  onClick={(p) => setSelectedProject(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experience Journey</h2>
            <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-sm font-mono">
              Professional & Part-time Roles
            </div>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Organization Section */}
      <section id="organization" className="py-24 relative glass">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 reveal">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Organization & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple">Leadership</span></h2>
              <p className="text-slate-400 max-w-xl text-lg">
                Pengalaman memimpin tim dan berkontribusi dalam komunitas teknologi.
              </p>
            </div>
          </div>
          <div className="reveal">
            <Organization />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617] to-accent/10 z-0"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple">Connect?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Saya siap membawa etos kerja keras dan kemampuan analisis data saya ke tim Anda. Mari diskusikan peluang kolaborasi.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href={`mailto:${USER_INFO.email}`}
              className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl hover:bg-accent hover:text-slate-900 text-white transition-all transform hover:-translate-y-2 border border-white/10 shadow-2xl reveal-zoom hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              style={{ transitionDelay: '0ms' }}
            >
              <Mail size={32} />
            </a>
            <a
              href={`https://${USER_INFO.linkedin}`}
              className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl hover:bg-[#0077b5] hover:text-white text-white transition-all transform hover:-translate-y-2 border border-white/10 shadow-2xl reveal-zoom hover:shadow-[0_0_30px_rgba(0,119,181,0.4)]"
              style={{ transitionDelay: '100ms' }}
            >
              <Linkedin size={32} />
            </a>
            <a
              href={`https://${USER_INFO.github}`}
              className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl hover:bg-white hover:text-black text-white transition-all transform hover:-translate-y-2 border border-white/10 shadow-2xl reveal-zoom hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              style={{ transitionDelay: '200ms' }}
            >
              <Github size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/5 py-12 relative z-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-slate-200 font-bold text-xl">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" /> Fernando
          </div>
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {USER_INFO.name}. <br />Built with React & Tailwind.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}

export default App;