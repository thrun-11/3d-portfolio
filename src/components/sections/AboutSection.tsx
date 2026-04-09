import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { personalInfo, stats } from '../../utils/portfolioData';

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
      className="relative"
      style={{ paddingTop: '50px', paddingBottom: '160px', backgroundColor: '#131313' }}
    >
      <div style={{ maxWidth: '1400px', marginInline: 'auto', padding: '0 2rem' }}>
        {/* Section Header — Architectural Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start text-left"
        >
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant font-medium opacity-80 mb-4">
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

            {/* Highlights — tonal block, no border */}
            <div className="space-y-6 pt-4">
              <div className="bg-[#1c1b1b] p-8">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`flex items-start gap-6 ${i !== highlights.length - 1 ? 'pb-6 mb-6' : ''}`}
                    style={i !== highlights.length - 1 ? { borderBottom: '1px solid rgba(71,71,71,0.15)' } : {}}
                  >
                    <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface mt-1 w-24 shrink-0 font-bold">
                      {item.label}
                    </span>
                    <p className="text-on-surface text-lg font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA — sharp corners */}
            <div className="pt-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center justify-center px-10 py-5 bg-[#2a2a2a] text-on-surface font-bold text-sm tracking-widest uppercase transition-all hover:bg-[#353534] active:scale-95"
              >
                Let's Work Together
              </a>
            </div>
          </motion.div>

          {/* Right: Bento Grid — tonal tiles, sharp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 p-8 bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Currently</div>
              <div className="text-on-surface font-light text-2xl tracking-tight leading-tight">Building AI-powered products</div>
              <div className="text-on-surface-variant font-light mt-3">Full-stack development with a focus on machine learning integration.</div>
            </div>
            <div className="p-8 bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Location</div>
              <div className="text-on-surface font-light text-xl">{personalInfo.location}</div>
            </div>
            <div className="p-8 bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-500">
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Education</div>
              <div className="text-on-surface font-light text-xl mb-1">CS Student</div>
              <div className="text-on-surface-variant text-sm">Class of 2026</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid — tonal blocks, sharp corners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Years Experience', value: stats.experience },
            { label: 'Projects Completed', value: stats.projects },
            { label: 'Happy Users', value: stats.users },
            { label: 'Lines of Code', value: stats.code }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-500 flex flex-col justify-between min-h-[200px] p-8"
            >
              <div className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant opacity-70">
                {stat.label}
              </div>
              <div className="border-t border-[#474747]/30 pt-6 mt-4 w-full">
                <div className="text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-2">
                  {stat.value}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
