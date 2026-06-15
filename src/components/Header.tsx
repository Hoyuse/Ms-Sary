import { useState } from 'react';
import { BookOpen, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact';
  setCurrentPage: (page: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact') => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', target: 'home' as const },
    { label: 'Misión & Visión', target: 'mission-vision' as const },
    { label: 'Servicios & Diagnóstico', target: 'services' as const },
    { label: 'Sobre Mí', target: 'about' as const },
    { label: 'Preguntas Frecuentes', target: 'faqs' as const },
    { label: 'Contacto & Agendamiento', target: 'contact' as const },
  ];

  const handleNavClick = (page: 'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#dde9ff] px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title/Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
          id="nav-logo"
        >
          <div className="p-2 bg-[#00236f] text-white rounded-md transition-transform group-hover:scale-105">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-serif font-bold text-lg md:text-xl text-[#00236f] leading-none block">
              Ms. Sary //
            </span>
            <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[#735c00] block">
              Asesorías Académicas
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = currentPage === item.target;
            return (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={`font-sans font-semibold text-sm relative py-1 transition-colors group focus:outline-none ${
                  isActive ? 'text-[#00236f]' : 'text-[#444651] hover:text-[#00236f]'
                }`}
                id={`nav-item-${item.target}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#00236f] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            );
          })}

          <div className="h-4 w-px bg-slate-300" />
          
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase bg-[#00236f] text-white hover:bg-[#735c00] transition-colors shadow-sm"
          >
            <Sparkles size={12} className="text-[#fed65b]" />
            Reservar Cupo
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#00236f] hover:bg-[#eff4ff] rounded-md transition-colors focus:outline-none"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#f8f9ff] border-t border-[#dde9ff]"
          >
            <div className="flex flex-col gap-2 py-4 px-2">
              {menuItems.map((item) => {
                const isActive = currentPage === item.target;
                return (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className={`w-full text-left font-sans font-semibold text-base py-2.5 px-4 rounded transition-all focus:outline-none ${
                      isActive 
                        ? 'bg-[#eff4ff] text-[#00236f]' 
                        : 'text-[#444651] hover:text-[#00236f] hover:bg-slate-100'
                    }`}
                    id={`mobile-nav-item-${item.target}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
