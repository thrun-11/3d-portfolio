import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { personalInfo, stats } from '../../utils/portfolioData';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{ paddingTop: '64px', paddingBottom: '50px', backgroundColor: '#131313' }}
    >
      <div style={{ maxWidth: '1400px', marginInline: 'auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '64px' }}
        >
          <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c6c6c6', fontWeight: 500, opacity: 0.8, marginBottom: '16px' }}>
            BACKGROUND
          </span>
          <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            About <span style={{ color: '#c6c6c6' }}>Me.</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'start', marginBottom: '96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', alignItems: 'start' }}>
            {/* Left: Bio & CTA */}
            <motion.div
              style={{ gridColumn: 'span 7' }}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p style={{ color: '#c6c6c6', lineHeight: 1.75, fontSize: '1.25rem', fontWeight: 300, marginBottom: '32px' }}>
                {personalInfo.bio}
              </p>

              {/* CTA */}
              <div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center"
                  style={{ padding: '20px 40px', backgroundColor: '#2a2a2a', color: '#e5e2e1', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s' }}
                >
                  Let&apos;s Work Together
                </a>
              </div>
            </motion.div>

            {/* Right: Bento Grid */}
            <motion.div
              style={{ gridColumn: 'span 5', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div style={{ gridColumn: 'span 2', padding: '24px', backgroundColor: '#1c1b1b' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c6c6c6', marginBottom: '12px' }}>Currently</div>
                <div style={{ color: '#e5e2e1', fontWeight: 300, fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Building AI-powered products</div>
                <div style={{ color: '#c6c6c6', fontWeight: 300, marginTop: '12px', fontSize: '0.875rem' }}>Full-stack development with a focus on machine learning integration.</div>
              </div>
              <div style={{ padding: '24px', backgroundColor: '#1c1b1b' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c6c6c6', marginBottom: '12px' }}>Location</div>
                <div style={{ color: '#e5e2e1', fontWeight: 300, fontSize: '1.25rem' }}>{personalInfo.location}</div>
              </div>
              <div style={{ padding: '24px', backgroundColor: '#1c1b1b' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c6c6c6', marginBottom: '12px' }}>Education</div>
                <div style={{ color: '#e5e2e1', fontWeight: 300, fontSize: '1.25rem', marginBottom: '4px' }}>CS Student</div>
                <div style={{ color: '#c6c6c6', fontSize: '0.875rem' }}>Class of 2026</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}
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
              style={{ backgroundColor: '#1c1b1b', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}
            >
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c6c6c6', opacity: 0.7 }}>
                {stat.label}
              </div>
              <div style={{ borderTop: '1px solid rgba(71,71,71,0.3)', paddingTop: '12px', marginTop: '8px', width: '100%' }}>
                <div style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.05em', marginBottom: '8px' }}>
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