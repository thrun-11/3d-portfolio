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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16"
      style={{ backgroundColor: '#0e0e0e' }}
    >
      {/* Sophisticated Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32 relative z-10">

        {/* Left Column: Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start gap-12 lg:order-1 order-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary font-medium opacity-80">
              FULL STACK & MACHINE LEARNING
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-on-surface leading-[0.95] drop-shadow-glow">
              {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ').slice(1).join(' ')}.<br />
              <span className="text-on-surface-variant tracking-[-0.03em] mt-2 block drop-shadow-none" style={{ fontSize: '0.65em' }}>Building the future of AI.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
              Architecting intelligent systems and immersive digital experiences with technical precision and editorial aesthetics.
            </p>

            {/* Social Links ported to Left Side */}
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
                  className="text-on-surface-variant hover:text-primary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-10 py-5 bg-primary text-on-primary rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(198,198,199,0.1)] hover:shadow-[0_0_40px_rgba(198,198,199,0.3)] active:scale-95"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-surface-container-high border border-white/5 text-on-surface rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-surface-bright active:scale-95"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        {/* Right Column: Avatar/3D Slot */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[550px] lg:h-[800px] lg:order-2 order-1 animation-fade-up">
          {/* Glowing Placeholder Ring (Kept from Stitch for depth) */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-primary/20 flex justify-center items-center pointer-events-none">
            <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full border border-primary/10"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 blur-xl"></div>
          </div>

          {/* 3D Scene */}
          <div className="relative w-[150%] h-[120%] -right-[15%]">
            <Scene rotation={rotation} blendshapes={blendshapes} isTracking={isTracking} enableOrbitControls={true} />
          </div>

          {/* Floating Technical Metadata (UI Decorations from Stitch) */}
          <div className="absolute top-1/4 -right-12 bg-surface-container-high/60 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col gap-1 shadow-2xl pointer-events-none z-20">
            <span className="text-[0.5rem] text-primary tracking-widest uppercase">System</span>
            <span className="text-xs font-mono font-bold text-on-surface">Interactive Interface</span>
          </div>
          <div className="absolute bottom-1/4 -left-12 bg-surface-container-high/60 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col gap-1 shadow-2xl pointer-events-none z-20">
            <span className="text-[0.5rem] text-primary tracking-widest uppercase">Stack</span>
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
          flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary
          transition-colors duration-300 cursor-pointer z-50"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
        <FaChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
