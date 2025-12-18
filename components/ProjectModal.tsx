import React, { useState } from 'react';
import { X, ExternalLink, FileCode, AlertCircle, Download, FileSpreadsheet, ChevronLeft, ChevronRight, MonitorPlay, FileText } from 'lucide-react';
import { Project } from '../types';
import NotebookViewer from './NotebookViewer';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Check if the file is an HTML export (renderable) or raw ipynb
  const isHtmlNotebook = project.notebookPath?.endsWith('.html');
  const isPdfNotebook = project.notebookPath?.endsWith('.pdf');
  const isIpynb = project.notebookPath?.endsWith('.ipynb'); // Check for ipynb

  const canEmbed = isHtmlNotebook || isPdfNotebook;

  // Gallery State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prevent scrolling on body when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const nextSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev === project.gallery!.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev === 0 ? project.gallery!.length - 1 : prev - 1));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="w-full max-w-6xl h-[90vh] glass-high rounded-2xl overflow-hidden shadow-2xl flex flex-col relative border border-white/10 animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              {project.gallery ? <MonitorPlay size={20} /> : project.reportPath ? <FileText size={20} /> : <FileCode size={20} />}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
              <p className="text-slate-200 text-xs font-mono">
                {project.notebookPath ? 'Notebook Preview' : (project.gallery ? 'Prototype Gallery' : (project.reportPath ? 'Project Report' : 'Project Details'))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.datasetPath && (
              <a
                href={project.datasetPath}
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 transition-colors text-sm font-medium"
              >
                <FileSpreadsheet size={14} /> Download Dataset
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                GitHub <ExternalLink size={14} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 bg-transparent relative overflow-hidden flex flex-col">
          {project.notebookPath ? (
            /* NOTEBOOK VIEW */
            canEmbed ? (
              <iframe
                src={project.notebookPath}
                className="w-full h-full border-none bg-white"
                title="Notebook Viewer"
              />
            ) : isIpynb ? (
              <NotebookViewer url={project.notebookPath!} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] text-slate-200 gap-6 p-8 text-center">
                <div className="p-6 bg-slate-800 rounded-full border border-white/5">
                  <FileCode size={48} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">File Notebook Tersedia</h4>
                  <p className="max-w-md text-sm text-slate-300">
                    File ini berformat <code>.ipynb</code> dan tidak dapat dipreview langsung di browser tanpa server Jupyter.
                  </p>
                </div>
                <a
                  href={project.notebookPath}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg hover:shadow-cyan-500/20"
                >
                  <Download size={18} /> Download Notebook
                </a>
              </div>
            )
          ) : project.reportPath ? (
            <iframe
              src={project.reportPath}
              className="w-full h-full border-none bg-white"
              title="Project Report"
            />
          ) : project.gallery && project.gallery.length > 0 ? (
            /* GALLERY VIEW (For Web Prototypes) */
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

              {/* Main Content (Preview/Gallery) */}
              <div className="flex-1 bg-black/40 relative flex flex-col min-h-[400px] lg:min-h-full">
                <div className="flex-1 relative flex items-center justify-center p-4">
                  <img
                    src={project.gallery[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
                  />

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 p-3 bg-slate-900/50 hover:bg-accent/80 hover:text-slate-900 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-accent shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 p-3 bg-slate-900/50 hover:bg-accent/80 hover:text-slate-900 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-accent shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Info Text Overlay */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-xs text-slate-100 border border-white/10 pointer-events-none">
                  Screenshot {currentSlide + 1} of {project.gallery.length}
                </div>
              </div>

              {/* Sidebar (Details) */}
              <div className="w-full lg:w-[350px] bg-black/10 border-l border-white/5 p-6 overflow-y-auto custom-scrollbar backdrop-blur-md">
                <h4 className="text-lg font-bold text-white mb-4">Gallery Snapshots</h4>
                <div className="flex flex-wrap gap-2">
                  {project.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative h-14 w-24 rounded-md overflow-hidden border-2 transition-all ${currentSlide === idx ? 'border-accent opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* DEFAULT / NO PREVIEW */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent text-slate-200 gap-4 p-8 text-center">
              <div className="p-4 bg-slate-800 rounded-full">
                <AlertCircle size={40} className="text-slate-500" />
              </div>
              <h4 className="text-xl font-bold text-white">Preview Tidak Tersedia</h4>
              <p className="max-w-md">Tidak ada preview visual atau notebook yang dilampirkan untuk proyek ini.</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 px-6 py-3 bg-accent text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Buka di GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;