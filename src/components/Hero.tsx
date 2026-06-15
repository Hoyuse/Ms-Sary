import { CalendarRange, Sparkles, BookOpen, Film } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (page: 'home' | 'mission-vision' | 'services' | 'about' | 'contact') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <header 
      id="home"
      className="grid-notebook border-b border-[#dde9ff] relative overflow-hidden"
    >
      {/* Decorative notebook left vertical margin line */}
      <div className="absolute left-[30px] md:left-[60px] top-0 bottom-0 w-[2px] bg-red-200/50 pointer-events-none" />

      {/* Hero Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center relative z-10 flex flex-col items-center">
        {/* Academic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#00236f] bg-[#f8f9ff] mb-8 shadow-sm"
        >
          <Sparkles size={14} className="text-[#735c00]" />
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#00236f]">
            Educación Bilingüe & Rigor Académico
          </span>
        </motion.div>

        {/* Brand Headline with custom italics */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold text-4xl md:text-6.5xl text-[#00236f] leading-[1.15] md:leading-[1.12] tracking-tight max-w-3xl mb-8"
        >
          Impulsa tu rendimiento académico con{' '}
          <span className="font-serif italic text-[#735c00]">Ms. Sary</span>
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base md:text-xl text-[#444651] max-w-2xl leading-relaxed mb-12 font-light"
        >
          Ofrecemos tutorías personalizadas bilingües en <span className="font-semibold text-[#00236f]">cualquier materia</span> y asesoría integral para la elaboración de trabajos de investigación, garantizando excelencia y honestidad en cada proyecto.
        </motion.p>

        {/* Action Button Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Main Primary CTA (Soft Gold styling) */}
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#735c00] hover:bg-[#8c7000] text-white font-sans font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all focus:outline-none"
            id="hero-cta-book"
          >
            <CalendarRange size={16} />
            Agendar Sesión
          </button>

          {/* Secondary Ghost CTA */}
          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white border border-[#dde9ff] hover:bg-[#eff4ff] text-[#00236f] font-sans font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-md shadow-sm transition-all focus:outline-none"
            id="hero-cta-services"
          >
            <BookOpen size={16} />
            Ver Servicios Bilingües
          </button>
        </motion.div>

        {/* Additional welcome video with words shortcut link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <button
            onClick={() => onNavigate('mission-vision')}
            className="inline-flex items-center gap-2 font-sans font-bold text-xs tracking-wider uppercase text-[#00236f] hover:text-[#735c00] transition-colors border-b-2 border-dashed border-[#00236f]/30 hover:border-[#735c00]/30 pb-1 focus:outline-none"
          >
            <Film size={14} className="text-[#fed65b] fill-current" />
            Ver Misión, Visión & Video de Bienvenida con letras
          </button>
        </motion.div>
      </div>
    </header>
  );
}
