import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { personalInfo } from '../../utils/portfolioData';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{ paddingTop: '64px', paddingBottom: '128px', backgroundColor: '#0e0e0e' }}
    >
      <div style={{ maxWidth: '1400px', marginInline: 'auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start text-left"
        >
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant font-medium opacity-80 mb-4">
            INITIATE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-[-0.04em] leading-[0.95]">
            <span className="text-on-surface-variant">Let's</span> Connect.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12 flex flex-col"
          >
            <div>
              <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                Whether you have a strategic inquiry, want to collaborate on an interface, or seek consultation, reach out.
              </p>
            </div>

            {/* Contact Links — tonal blocks, sharp */}
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FaLinkedin, label: 'LinkedIn', value: personalInfo.linkedin, href: `https://${personalInfo.linkedin}` },
                { icon: FaGithub, label: 'GitHub', value: personalInfo.github, href: `https://${personalInfo.github}` }
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-[#1c1b1b] hover:bg-[#201f1f] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6">
                    <contact.icon className="w-5 h-5 text-on-surface-variant group-hover:text-on-surface transition-colors duration-300" />
                    <div>
                      <div className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant opacity-70 mb-1">{contact.label}</div>
                      <div className="text-on-surface font-light">{contact.value}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="pt-4" style={{ borderTop: '1px solid rgba(71,71,71,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-on-surface-variant animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Accepting engagements</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form — tonal, sharp, underline-only inputs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1c1b1b] p-8 md:p-12 space-y-8">
              {/* Name — underline only */}
              <div>
                <label htmlFor="name" className="block text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full bg-transparent border-b pb-3 focus:outline-none transition-all text-on-surface font-light placeholder-on-surface-variant/30
                    ${errors.name ? 'border-error' : 'border-[#474747] focus:border-on-surface'}`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-2 text-[0.6875rem] uppercase tracking-widest text-error">{errors.name.message}</p>
                )}
              </div>

              {/* Email — underline only */}
              <div>
                <label htmlFor="email" className="block text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full bg-transparent border-b pb-3 focus:outline-none transition-all text-on-surface font-light placeholder-on-surface-variant/30
                    ${errors.email ? 'border-error' : 'border-[#474747] focus:border-on-surface'}`}
                  placeholder="address@domain.com"
                />
                {errors.email && (
                  <p className="mt-2 text-[0.6875rem] uppercase tracking-widest text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Message — underline only */}
              <div>
                <label htmlFor="message" className="block text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Your Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className={`w-full bg-transparent border-b pb-3 focus:outline-none transition-all resize-none text-on-surface font-light placeholder-on-surface-variant/30
                    ${errors.message ? 'border-error' : 'border-[#474747] focus:border-on-surface'}`}
                  placeholder="Detail your inquiry..."
                />
                {errors.message && (
                  <p className="mt-2 text-[0.6875rem] uppercase tracking-widest text-error">{errors.message.message}</p>
                )}
              </div>

              {/* Submit — sharp, no rounded */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 font-bold uppercase tracking-widest text-[0.6875rem] text-on-primary bg-on-surface transition-all duration-300 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-on-surface/30 border-t-on-surface animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Deliver Message
                    <FaPaperPlane className="w-3 h-3" />
                  </>
                )}
              </button>

              {/* Success */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-on-surface/10"
                >
                  <FaCheckCircle className="w-4 h-4 text-on-surface" />
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface">Transmission received.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-32 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(71,71,71,0.1)' }}
        >
          <div className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {personalInfo.name}.
          </div>
          <div className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-widest opacity-50 flex gap-4">
            <span>REACT 19</span>
            <span>THREE.JS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
