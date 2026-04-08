import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { personalInfo, stats } from '../../utils/portfolioData';
import { FaCode, FaUsers, FaRocket, FaAward } from 'react-icons/fa';

const statsData = [
  { icon: FaCode, label: 'Years Experience', value: stats.experience, gradient: 'from-[#818CF8] to-[#6366F1]' },
  { icon: FaRocket, label: 'Projects Completed', value: stats.projects, gradient: 'from-[#22D3EE] to-[#06B6D4]' },
  { icon: FaUsers, label: 'Happy Users', value: stats.users, gradient: 'from-[#34D399] to-[#10B981]' },
  { icon: FaAward, label: 'Lines of Code', value: stats.code, gradient: 'from-[#F472B6] to-[#EC4899]' }
];

const highlights = [
  { label: 'Founded', detail: 'Convo AI, serving 1000+ users' },
  { label: 'Interned', detail: "at Meta's Llama Team" },
  { label: 'Created', detail: 'AR filters with 100K+ impressions' },
  { label: 'Built', detail: 'automation systems handling 5000+ daily messages' }
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-24 pb-32 md:pt-32 md:pb-48 relative"
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
            BACKGROUND
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-[-0.04em] leading-[0.95]">
            About <span className="text-on-surface-variant">Me.</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Left: Bio & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-10"
          >
            <p className="text-on-surface-variant leading-relaxed text-xl font-light">
              {personalInfo.bio}
            </p>

            <div className="space-y-6 pt-4">
              <div className="bg-surface-container-low border border-white/[0.05] rounded-3xl p-8">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`flex items-start gap-6 ${i !== highlights.length - 1 ? 'border-b border-white/[0.05] pb-6 mb-6' : ''}`}
                  >
                    <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary mt-1 w-24 shrink-0 font-bold">
                      {item.label}
                    </span>
                    <p className="text-on-surface text-lg font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center justify-center px-10 py-5 bg-surface-container-high border border-white/5 text-on-surface rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-surface-bright active:scale-95"
              >
                Let's Work Together
              </a>
            </div>
          </motion.div>

          {/* Right: Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 p-8 rounded-3xl bg-surface-container-low border border-white/[0.05] hover:bg-surface-container transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary mb-4">Currently</div>
              <div className="text-on-surface font-light text-2xl tracking-tight leading-tight">Building AI-powered products</div>
              <div className="text-on-surface-variant font-light mt-3">Full-stack development with a focus on machine learning integration.</div>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container-low border border-white/[0.05] hover:bg-surface-container transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary mb-4">Location</div>
              <div className="text-on-surface font-light text-xl">{personalInfo.location}</div>
            </div>
            <div className="p-8 rounded-3xl bg-surface-container-low border border-white/[0.05] hover:bg-surface-container transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary mb-4">Education</div>
              <div className="text-on-surface font-light text-xl mb-1">CS Student</div>
              <div className="text-on-surface-variant text-sm">Class of 2026</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="bg-surface-container-low border border-white/[0.05] rounded-3xl p-8 hover:bg-surface-container transition-all duration-500 group flex flex-col justify-between min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-full border border-white/[0.05] flex items-center justify-center bg-surface-container mb-8 group-hover:scale-110 transition-transform duration-500">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="border-t border-white/[0.1] pt-6 mt-4 w-full">
                <div className="text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-light text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
