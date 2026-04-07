import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { projects } from '../../utils/portfolioData';
import { FaExternalLinkAlt, FaGithub, FaArrowUp } from 'react-icons/fa';

const categoryGradients: Record<string, { from: string; to: string }> = {
  'SaaS Product': { from: '#818CF8', to: '#6366F1' },
  'Automation': { from: '#34D399', to: '#06B6D4' },
  'Augmented Reality': { from: '#F472B6', to: '#A78BFA' },
  'Web Development': { from: '#A78BFA', to: '#818CF8' }
};

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 relative"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #0a0a14 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            A selection of projects that showcase my skills in full-stack development, AI integration, and creative technology
          </p>
        </motion.div>

        {/* Projects Grid — bento style */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const gradient = categoryGradients[project.category] || { from: '#818CF8', to: '#6366F1' };
            const isFeatured = index === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`glass rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all duration-500 group
                  ${isFeatured ? 'md:col-span-2' : ''}`}
              >
                <div className={`${isFeatured ? 'md:grid md:grid-cols-2' : ''}`}>
                  {/* Gradient Header */}
                  <div
                    className={`relative ${isFeatured ? 'h-full min-h-[240px]' : 'h-48'} overflow-hidden`}
                    style={{ background: `linear-gradient(135deg, ${gradient.from}15, ${gradient.to}08)` }}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${gradient.from} 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                      }} />

                    {/* Large gradient glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }} />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
                      style={{
                        background: `${gradient.from}15`,
                        color: gradient.from,
                        border: `1px solid ${gradient.from}25`
                      }}>
                      {project.category}
                    </div>

                    {/* Stats overlay at bottom */}
                    <div className="absolute bottom-4 left-4 flex gap-3">
                      {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs backdrop-blur-md"
                          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <FaArrowUp className="w-3 h-3" style={{ color: gradient.from }} />
                          <span className="text-white font-semibold">{value}</span>
                          <span className="text-[#94A3B8] capitalize">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 font-[Space_Grotesk] group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#64748B]">
                          <span style={{ color: gradient.from }} className="mt-0.5">+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-xs font-medium bg-white/[0.04] text-[#94A3B8] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/[0.04] text-[#64748B] border border-white/[0.06]">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-1">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={`https://${project.links.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08]
                            text-[#94A3B8] rounded-lg text-sm font-medium
                            hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
