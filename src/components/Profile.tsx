import { Phone, MapPin, Award, MessageSquare, Copy, Check, GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import portrait1 from '../assets/images/profile-photo-optimized.jpeg';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Profile() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('3014591627');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 bg-[#eff4ff] border-b border-[#dde9ff]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Container with standard thin border and soft ambient shadow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl border border-[#dde9ff] overflow-hidden shadow-lg grid md:grid-cols-12"
        >
          {/* Typographic Academic Crest / Monogram decoration block replacing the portrait image */}
          <div className="md:col-span-5 relative h-72 md:h-auto min-h-[300px] bg-[#00236f] text-white flex flex-col justify-between p-0 overflow-hidden select-none">
            {/* Portrait image for Sobre mí */}
            <div className="absolute inset-0 opacity-10 bg-grid-lines pointer-events-none grid-notebook" />
            <img src={portrait1} alt="Retrato de Ms. Sary" className="w-full h-full object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00174e]/80 pointer-events-none" />
            <div className="relative z-10 p-4 md:p-6 flex flex-col justify-end h-full">
              <div className="flex items-center justify-between">
                <span className="font-sans font-bold text-[9px] tracking-widest uppercase text-[#fed65b] border border-[#fed65b]/30 px-2 py-0.5 rounded">
                  Oficial Seal
                </span>
                <Sparkles size={14} className="text-[#fed65b]" />
              </div>

              <div className="mt-auto">
                <div className="w-20 h-20 rounded-full border-2 border-[#fed65b] flex items-center justify-center bg-[#00174e] shadow-xl mb-3">
                  <GraduationCap size={36} className="text-[#fed65b]" />
                </div>
                <span className="font-serif italic text-2xl font-bold tracking-tight text-white block">
                  Ms. Sary
                </span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#ccd7f0] font-semibold mt-1">
                  Asesorías Académicas
                </span>
              </div>
            </div>
          </div>

          {/* Credentials and Details Column */}
          <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Overheading details */}
              <div className="flex flex-col gap-1 mb-4">
                <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#735c00] flex items-center gap-1.5">
                  <Award size={13} />
                  Profesional en Lenguas Modernas y Cultura
                </span>
                <span className="font-sans font-medium text-xs text-[#444651] tracking-wide uppercase">
                  4 Años de Experiencia Docente
                </span>
              </div>

              {/* Teacher Name */}
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#00236f] mb-6">
                Sarai Johana Viloria González
              </h3>

              {/* Academic Pull-quote Style testimonial */}
              <div className="border-l-[3px] border-[#735c00] pl-5 py-1.5 mb-8 bg-[#f8f9ff]">
                <p className="font-serif italic text-[#444651] text-[15px] md:text-[16px] leading-relaxed">
                  "Mi compromiso es brindar las herramientas necesarias para que cada estudiante descubra su potencial y alcance la excelencia académica a través de la disciplina y el acompañamiento experto."
                </p>
              </div>
            </div>

            {/* Direct Contact triggers */}
            <div className="space-y-4 pt-4 border-t border-[#dde9ff]">
              
              {/* Telephone with copy and direct call */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#0d1c2f]">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#00236f]" />
                  <a href="tel:+573014591627" className="font-mono font-medium hover:text-[#00236f] hover:underline">
                    3014591627
                  </a>
                </div>
                
                {/* Secondary instant contact buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPhone}
                    className="p-1 px-2.5 rounded bg-[#f8f9ff] hover:bg-[#eff4ff] text-xs font-sans font-medium text-[#444651] border border-[#dde9ff] flex items-center gap-1.5 transition-colors focus:outline-none"
                    title="Copiar número"
                  >
                    {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                  <a
                    href="https://wa.me/573014591627?text=Hola%20Ms.%20Sary,%20quisiera%20asesoría%20académica."
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 px-2.5 rounded bg-green-50 hover:bg-green-100 text-xs font-sans font-semibold text-green-700 border border-green-200 flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare size={12} />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Address / Location with trigger link */}
              <div className="flex items-center gap-3 text-sm text-[#0d1c2f]">
                <MapPin size={16} className="text-[#00236f] shrink-0" />
                <span className="font-sans font-normal text-slate-700">
                  Diagonal 22 #47-70
                </span>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
