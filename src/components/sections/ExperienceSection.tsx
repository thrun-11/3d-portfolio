import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { experience } from '../../utils/portfolioData';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const companyColors: Record<string, string> = {
  'Meta': '#818CF8',
  'Convo AI': '#22D3EE',
  'Freelance': '#A78BFA'
};

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 relative"
      style={{ background: 'linear-gradient(180deg, #0a0a14 0%, #06060b 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Where I've honed my craft and made an impact
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px]"
            style={{ background: 'linear-gradient(180deg, #818CF8 0%, #818CF8/50 50%, transparent 100%)' }} />

          <div className="space-y-8">
            {experience.map((exp, index) => {
              const color = companyColors[exp.company] || '#818CF8';

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full border-[3px] border-[#06060b]"
                    style={{
                      background: color,
                      boxShadow: `0 0 12px ${color}50`
                    }}
                  />

                  {/* Card */}
                  <div
                    className="glass rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300"
                    style={{ borderLeft: `2px solid ${color}30` }}
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-lg font-bold text-white font-[Space_Grotesk]">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="text-base font-semibold mb-2" style={{ color }}>
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="w-3.5 h-3.5" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="w-3.5 h-3.5" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#94A3B8] mb-4 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                          <span style={{ color }} className="mt-0.5 font-bold">›</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: `${color}10`,
                            color: color,
                            border: `1px solid ${color}20`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
