import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skills } from '../../utils/portfolioData';

const skillCategories = [
  { key: 'languages', title: 'Languages' },
  { key: 'frontend', title: 'Frontend' },
  { key: 'backend', title: 'Backend' },
  { key: 'tools', title: 'Tools & Platforms' },
  { key: 'ai', title: 'AI & ML' }
];

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="skills"
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
            CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-[-0.04em] leading-[0.95]">
            Technical <span className="text-on-surface-variant">Arsenal.</span>
          </h2>
        </motion.div>

        {/* Editorial Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`flex flex-col ${categoryIndex % 3 !== 0 ? 'lg:border-l lg:border-white/[0.05] lg:pl-12' : ''}`}
            >
              {/* Category label */}
              <div className="border-b border-white/[0.05] pb-4 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface">
                  {category.title}
                </h3>
              </div>

              {/* Typographic List */}
              <ul className="flex flex-col gap-3">
                {skills[category.key as keyof typeof skills].map((skill: any, skillIndex: number) => {
                  return (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-on-surface-variant font-light group-hover:text-on-surface transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 pt-12 border-t border-white/[0.02]"
        >
          <p className="text-on-surface-variant text-sm font-light uppercase tracking-widest flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary/30 block"></span>
            Always exploring emerging paradigms
          </p>
        </motion.div>
      </div>
    </section>
  );
}
