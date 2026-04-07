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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #06060b 0%, #0d0d1a 40%, #0a0a14 100%)' }}
    >
      {/* Ambient gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 lg:order-1 order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#818CF8] font-medium mb-3 text-sm tracking-widest uppercase font-[Space_Grotesk]">
                Full Stack Developer
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-[Space_Grotesk] leading-[1.1]">
                {personalInfo.name.split(' ')[0]}{' '}
                <span className="gradient-text">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed">
                {personalInfo.tagline}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-[#64748B] leading-relaxed max-w-lg"
            >
              {personalInfo.bio.split('.')[0]}.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300
                  hover:scale-105 active:scale-95 glow-blue"
                style={{ background: 'linear-gradient(135deg, #818CF8, #6366F1)' }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-white/[0.04] text-[#F1F5F9] border border-white/[0.1] rounded-lg font-medium
                  hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300
                  hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-3 pt-2"
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
                  className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#64748B]
                    hover:text-[#818CF8] hover:border-[#818CF8]/30 hover:bg-[#818CF8]/5
                    transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[550px] lg:h-[700px] lg:order-2 order-1"
          >
            {/* Glow ring behind avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full opacity-30 blur-[60px]"
                style={{ background: 'radial-gradient(circle, #818CF8 0%, #6366F1 30%, transparent 70%)' }} />
            </div>

            {/* 3D Scene */}
            <div className="relative h-full">
              <Scene rotation={rotation} blendshapes={blendshapes} isTracking={isTracking} enableOrbitControls={true} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2
          flex flex-col items-center gap-2 text-[#475569] hover:text-[#818CF8]
          transition-colors duration-300 cursor-pointer"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
        <FaChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
