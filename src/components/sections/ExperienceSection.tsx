import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { experience } from '../../utils/portfolioData';

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 relative"
      style={{ backgroundColor: '#0e0e0e' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start text-left"
        >
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary font-medium opacity-80 mb-4">
            HISTORY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-[-0.04em] leading-[0.95]">
            <span className="text-on-surface-variant">Professional</span> Experience.
          </h2>
        </motion.div>

        {/* Timeline translated into Editorial Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-10 space-y-16">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start"
              >
                {/* Left side: Meta (Dates/Location) */}
                <div className="md:col-span-4 flex flex-col gap-2 pt-1 border-t border-white/[0.05] md:border-none md:pt-0">
                  <div className="text-[0.6875rem] font-bold tracking-widest uppercase text-on-surface-variant">
                    {exp.period}
                  </div>
                  <div className="text-sm font-light text-on-surface-variant/70 flex items-center gap-1.5">
                    {exp.location}
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="md:col-span-8 flex flex-col gap-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="text-xl font-light text-on-surface-variant uppercase tracking-widest text-[0.85rem]">
                      {exp.company}
                    </div>
                  </div>

                  <p className="text-on-surface-variant leading-relaxed font-light text-lg">
                    {exp.description}
                  </p>

                  <ul className="space-y-6 pt-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-8 text-on-surface-variant font-light">
                        <span className="text-primary mt-1 text-[0.6rem] uppercase tracking-widest opacity-80 shrink-0">0{i+1}</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Minimalist Tech Stack */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-white/[0.02]">
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-primary w-full md:w-auto md:py-2 opacity-50 shrink-0">STACK</span>
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-surface-container-low border border-white/[0.02] rounded-full text-xs font-light text-on-surface-variant tracking-wider transition-all duration-300 hover:bg-surface-container-high hover:text-on-surface"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
