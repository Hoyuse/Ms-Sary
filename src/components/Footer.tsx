import { BookOpen, Calendar, AtSign, Share2 } from 'lucide-react';

interface FooterProps {
  currentPage: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact';
  setCurrentPage: (page: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact') => void;
}

export default function Footer({ currentPage, setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#00236f] text-white border-t border-[#00174e] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-8 items-start">
        
        {/* Brand identity column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-[#00236f] rounded-md">
              <BookOpen size={20} />
            </div>
            <h3 className="font-serif font-bold text-2xl tracking-normal">
              Ms. Sary
            </h3>
          </div>
          <p className="font-sans text-sm text-[#ccd7f0] max-w-sm leading-relaxed font-light">
            Excelencia y Rigor Académico para estudiantes que buscan lo mejor. Ofreciendo herramientas de vanguardia, bilingüismo formal y acompañamiento experto y honesto.
          </p>
        </div>

        {/* Links column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif font-bold text-lg text-[#fed65b]">
            Páginas del Portal
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[#ccd7f0]">
            <li>
              <button 
                onClick={() => handleLinkClick('home')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'home' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Inicio (Presentación)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('mission-vision')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'mission-vision' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Misión, Visión & Video
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('services')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'services' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Servicios & Diagnóstico
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('about')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'about' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Sobre Mí (Credenciales Profesionales)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('faqs')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'faqs' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Preguntas Frecuentes (FAQ)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('contact')} 
                className={`transition-colors cursor-pointer text-left focus:outline-none ${
                  currentPage === 'contact' ? 'text-[#fed65b] font-semibold' : 'hover:text-white'
                }`}
              >
                Contacto & Agendamiento
              </button>
            </li>
          </ul>
        </div>

        {/* Working Hours column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-serif font-bold text-lg text-[#fed65b] flex items-center gap-2">
            <Calendar size={18} />
            Horario de Atención
          </h4>
          <p className="font-sans text-sm text-[#ccd7f0] leading-relaxed">
            Lunes a Sábado: 8:00 AM - 6:00 PM <br />
            Atención remota bilingüe en toda Colombia y el exterior.
          </p>

          {/* Social shares */}
          <div className="flex items-center gap-4.5 pt-4 border-t border-[#001d5d]">
            <a 
              href="mailto:jramosr3@unicartagena.edu.co" 
              className="p-2 border border-[#ccd7f0]/20 hover:border-[#fed65b] text-[#ccd7f0] hover:text-[#fed65b] rounded-full transition-colors"
              title="Contacto Directo por Email"
            >
              <AtSign size={16} />
            </a>
            <button 
              onClick={() => {
                const textShare = "Descubre Ms. Sary // Asesorías Académicas. Tutorías personalizadas bilingües y asesoría de trabajos de alta calidad.";
                if (navigator.share) {
                  navigator.share({
                    title: 'Ms. Sary - Asesorías Académicas',
                    text: textShare,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(`${textShare} - ${window.location.href}`);
                  alert('¡Enlace de recomendación copiado al portapapeles!');
                }
              }}
              className="p-2 border border-[#ccd7f0]/20 hover:border-[#fed65b] text-[#ccd7f0] hover:text-[#fed65b] rounded-full transition-colors focus:outline-none"
              title="Compartir enlace de recomendación"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Deep Copyright Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#001d5d] mt-16 pt-8 text-center text-xs text-[#8c9fc4] space-y-4">
        <p>
          © {currentYear} Ms. Sary // Asesorías Académicas. Excelencia y Rigor Académico.
        </p>
        
        {/* Creative Commons License Section */}
        <div className="flex flex-col items-center gap-2 pt-1 pb-1">
          <a 
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-[#00174e] text-white border border-[#ccd7f0]/10 hover:border-[#fed65b] transition-all shadow-inner"
          >
            <img 
              src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" 
              alt="Licencia Creative Commons Atribución-NoComercial-CompartirIgual" 
              className="h-6 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-sans font-semibold text-[10px] text-[#ccd7f0] uppercase tracking-wider">
              Licencia CC BY-NC-SA 4.0
            </span>
          </a>
          <p className="max-w-xl mx-auto font-sans text-[11px] leading-relaxed text-[#8c9fc4] font-light">
            Este portal y sus materiales asociados están bajo la protección de una licencia de{' '}
            <a 
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#fed65b] hover:underline font-medium"
            >
              Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)
            </a>.
          </p>
        </div>

        <p className="font-light">
          Diseñado con estándares de alta calidad editorial. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
