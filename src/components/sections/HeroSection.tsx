import { motion } from 'framer-motion';
import { FaChevronDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Scene } from '../Scene';
import { personalInfo } from '../../utils/portfolioData';

interface HeroSectionProps {
  rotation: { pitch: number; yaw: number; roll: number };
  blendshapes: Record<string, number>;
  isTracking: boolean;
}

export function HeroSection({ rotation, blendshapes, isTracking }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '30px', paddingBottom: '64px', backgroundColor: '#0e0e0e' }}
    >
      {/* Architectural Void Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#131313] to-[#0e0e0e] pointer-events-none" />

      {/* Subtle chrome glow — left side */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10" style={{ maxWidth: '1400px', marginInline: 'auto', padding: '0 2rem' }}>

        {/* Left Column: Content — asymmetric offset */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start gap-12 lg:order-1 order-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant font-medium opacity-80">
              FULL STACK & MACHINE LEARNING
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-on-surface leading-[0.95]">
              {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ').slice(1).join(' ')}.<br />
              <span className="text-on-surface-variant tracking-[-0.03em] mt-2 block drop-shadow-none" style={{ fontSize: '0.65em' }}>Building the future of AI.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
              Architecting intelligent systems and immersive digital experiences with technical precision and editorial aesthetics.
            </p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-4"
            >
              {[
                { icon: FaGithub, href: `https://${personalInfo.github}` },
                { icon: FaLinkedin, href: `https://${personalInfo.linkedin}` },
                { icon: FaEnvelope, href: `mailto:${personalInfo.email}` }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* CTA Buttons — 0px radius, sharp */}
          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-10 py-5 bg-primary text-on-primary font-bold text-sm tracking-widest uppercase transition-all hover:bg-primary-container active:scale-95"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-transparent border border-[#474747] text-on-surface font-bold text-sm tracking-widest uppercase transition-all hover:bg-[#2a2a2a] hover:border-[#919191] active:scale-95"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        {/* Right Column: Avatar/3D Slot */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[600px] lg:h-[800px] lg:order-2 order-1">
          {/* Geometric placeholder ring — sharp */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-[#474747]/30 flex justify-center items-center pointer-events-none">
            <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] border border-[#474747]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05] blur-xl"></div>
          </div>

          {/* 3D Scene */}
          <div className="relative w-[150%] h-[120%] -right-[15%]">
            <Scene rotation={rotation} blendshapes={blendshapes} isTracking={isTracking} enableOrbitControls={true} />
          </div>

          {/* Floating Technical Metadata — chrome glass, sharp corners */}
          <div className="absolute top-1/4 -right-12 bg-[#2a2a2a]/60 backdrop-blur-md p-4 flex flex-col gap-1 pointer-events-none z-20">
            <span className="text-[0.5rem] text-on-surface-variant tracking-widest uppercase">System</span>
            <span className="text-xs font-mono font-bold text-on-surface">Interactive Interface</span>
          </div>
          <div className="absolute bottom-1/4 -left-12 bg-[#2a2a2a]/60 backdrop-blur-md p-4 flex flex-col gap-1 pointer-events-none z-20">
            <span className="text-[0.5rem] text-on-surface-variant tracking-widest uppercase">Stack</span>
            <span className="text-xs font-mono font-bold text-on-surface">React • MERN • LLMs</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2
          flex flex-col items-center gap-2 text-on-surface-variant hover:text-on-surface
          transition-colors duration-300 cursor-pointer z-50"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
        <FaChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
