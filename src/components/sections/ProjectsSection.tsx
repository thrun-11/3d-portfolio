import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { projects } from '../../utils/portfolioData';
import { FaExternalLinkAlt, FaGithub, FaArrowUp } from 'react-icons/fa';

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{ paddingTop: '5px', paddingBottom: '128px', backgroundColor: '#0e0e0e' }}
    >
      <div style={{ maxWidth: '1400px', marginInline: 'auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start text-left"
        >
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant font-medium opacity-80 mb-4">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-[-0.04em] leading-[0.95]">
            Featured <span className="text-on-surface-variant">Projects.</span>
          </h2>
        </motion.div>

        {/* Projects Grid — tonal cards, 0px radius */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-500 group flex flex-col
                  ${isFeatured ? 'md:col-span-2 md:flex-row' : ''}`}
              >
                {/* Visual Header / Cover Area */}
                <div
                  className={`relative bg-[#2a2a2a] flex flex-col justify-end p-8 border-b md:border-b-0 border-[#474747]/30
                  ${isFeatured ? 'md:w-5/12 border-r' : 'h-64'}`}
                >
                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
                      {project.category}
                    </span>
                  </div>

                  {/* Typographic Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                    <span className="text-[14rem] font-bold tracking-tighter text-on-surface translate-y-8 select-none">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 relative z-10 mt-auto pt-12">
                    {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <FaArrowUp className="w-3 h-3 text-on-surface-variant" />
                          <span className="text-on-surface font-bold text-lg leading-none">{value}</span>
                        </div>
                        <span className="text-on-surface-variant text-[0.65rem] uppercase tracking-widest mt-1">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Block */}
                <div className={`p-8 md:p-12 flex flex-col ${isFeatured ? 'md:w-7/12' : 'flex-1'}`}>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-4 tracking-tight group-hover:text-on-surface-variant transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 text-on-surface-variant font-light text-sm md:text-base">
                        <span className="text-on-surface-variant opacity-50 mt-1 uppercase tracking-widest text-[0.6rem] shrink-0">FEAT</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {/* Tech Stack — flat chips */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-[0.6875rem] font-medium tracking-wider uppercase bg-[#201f1f] text-on-surface-variant"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links — sharp, no rounded-full */}
                    <div className="flex flex-wrap gap-4">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-primary-container"
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={`https://${project.links.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-[#474747] bg-[#201f1f] text-on-surface text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a2a] transition-all duration-300"
                        >
                          <FaGithub className="w-4 h-4" />
                          Source Code
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
