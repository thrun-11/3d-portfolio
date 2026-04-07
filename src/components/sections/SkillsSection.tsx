import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skills } from '../../utils/portfolioData';

const skillCategories = [
  { key: 'languages', title: 'Languages', color: '#818CF8' },
  { key: 'frontend', title: 'Frontend', color: '#22D3EE' },
  { key: 'backend', title: 'Backend', color: '#34D399' },
  { key: 'tools', title: 'Tools & Platforms', color: '#F472B6' },
  { key: 'ai', title: 'AI & ML', color: '#A78BFA' }
];

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 relative"
      style={{ background: 'linear-gradient(180deg, #0a0a14 0%, #06060b 100%)' }}
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
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience and continuous learning
          </p>
        </motion.div>

        {/* Skills Cloud */}
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: category.color }} />
                <h3 className="text-sm font-semibold uppercase tracking-wider font-[Space_Grotesk]"
                  style={{ color: category.color }}>
                  {category.title}
                </h3>
                <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${category.color}20, transparent)` }} />
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {skills[category.key as keyof typeof skills].map((skill: any, skillIndex: number) => {
                  // Scale chip sizes by proficiency
                  const level = skill.level || 80;
                  const isHigh = level >= 90;
                  const isMid = level >= 80 && level < 90;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                      className={`
                        px-4 py-2 rounded-xl font-medium cursor-default
                        transition-all duration-300 hover:scale-105
                        ${isHigh ? 'text-sm' : isMid ? 'text-sm' : 'text-xs'}
                      `}
                      style={{
                        background: `${category.color}${isHigh ? '15' : '08'}`,
                        color: isHigh ? category.color : `${category.color}B0`,
                        border: `1px solid ${category.color}${isHigh ? '30' : '15'}`,
                        boxShadow: isHigh ? `0 0 16px ${category.color}10` : 'none'
                      }}
                      whileHover={{
                        boxShadow: `0 0 20px ${category.color}25`,
                        borderColor: `${category.color}50`
                      }}
                    >
                      {skill.name}
                      {isHigh && (
                        <span className="ml-2 opacity-50 text-xs">{level}%</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[#475569] text-sm">
            Always learning and exploring new technologies to stay at the forefront of development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
