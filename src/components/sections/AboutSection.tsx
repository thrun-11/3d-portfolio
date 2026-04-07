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
      className="py-32 relative"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #0a0a14 100%)' }}
    >
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#818CF8]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Combining creativity with technical expertise to build innovative solutions
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-[#94A3B8] leading-relaxed text-lg">
              {personalInfo.bio}
            </p>

            <div className="space-y-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#818CF8] shrink-0" />
                  <p className="text-[#94A3B8]">
                    <span className="font-semibold text-white">{item.label}</span>{' '}
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium
                  hover:scale-105 transition-all duration-300 glow-blue"
                style={{ background: 'linear-gradient(135deg, #818CF8, #6366F1)' }}
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
            className="grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 p-6 rounded-2xl glass hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-sm text-[#818CF8] font-medium mb-2 font-[Space_Grotesk]">Currently</div>
              <div className="text-white font-semibold text-lg">Building AI-powered products</div>
              <div className="text-[#64748B] text-sm mt-1">Full-stack development with focus on ML integration</div>
            </div>
            <div className="p-5 rounded-2xl glass hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-sm text-[#22D3EE] font-medium mb-2 font-[Space_Grotesk]">Location</div>
              <div className="text-white font-medium">{personalInfo.location}</div>
            </div>
            <div className="p-5 rounded-2xl glass hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-sm text-[#A78BFA] font-medium mb-2 font-[Space_Grotesk]">Education</div>
              <div className="text-white font-medium">CS Student</div>
              <div className="text-[#64748B] text-xs mt-1">Class of 2026</div>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 
                group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1 font-[Space_Grotesk]">
                {stat.value}
              </div>
              <div className="text-sm text-[#64748B]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
