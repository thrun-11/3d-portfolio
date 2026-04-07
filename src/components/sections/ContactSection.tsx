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
      className="py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060b 0%, #0a0a14 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #818CF8, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3 font-[Space_Grotesk]">
                Let's Connect
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Whether you have a question, want to collaborate, or just want to say hi,
                feel free to reach out through any of these channels.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              {[
                { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#818CF8' },
                { icon: FaLinkedin, label: 'LinkedIn', value: personalInfo.linkedin, href: `https://${personalInfo.linkedin}`, color: '#22D3EE' },
                { icon: FaGithub, label: 'GitHub', value: personalInfo.github, href: `https://${personalInfo.github}`, color: '#A78BFA' }
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: `${contact.color}15` }}
                  >
                    <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B]">{contact.label}</div>
                    <div className="text-[#F1F5F9] text-sm font-medium">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Status card */}
            <div className="hidden lg:block pt-4">
              <div className="p-5 rounded-xl glass">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400 font-medium">Available for work</span>
                </div>
                <p className="text-[#64748B] text-sm">
                  Open to freelance opportunities, collaborations, and exciting projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 transition-all text-white placeholder-[#475569]
                    ${errors.name
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-white/[0.08] focus:ring-[#818CF8]/50 focus:border-[#818CF8]/50'
                    }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 transition-all text-white placeholder-[#475569]
                    ${errors.email
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-white/[0.08] focus:ring-[#818CF8]/50 focus:border-[#818CF8]/50'
                    }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-white/[0.03] border focus:outline-none focus:ring-1 transition-all resize-none text-white placeholder-[#475569]
                    ${errors.message
                      ? 'border-red-500/50 focus:ring-red-500/50'
                      : 'border-white/[0.08] focus:ring-[#818CF8]/50 focus:border-[#818CF8]/50'
                    }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg font-medium text-white
                  hover:scale-[1.02] transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  flex items-center justify-center gap-2 glow-blue"
                style={{ background: 'linear-gradient(135deg, #818CF8, #6366F1)' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                >
                  <FaCheckCircle className="w-5 h-5" />
                  <span>Thanks for reaching out! I'll get back to you soon.</span>
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
          className="mt-20 pt-8 border-t border-white/[0.06] text-center"
        >
          <p className="text-[#475569] text-sm">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React, Three.js & passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
