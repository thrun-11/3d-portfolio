import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#818CF8] via-[#22D3EE] to-[#A78BFA]"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 12px rgba(129, 140, 248, 0.5), 0 0 24px rgba(34, 211, 238, 0.3)'
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}
