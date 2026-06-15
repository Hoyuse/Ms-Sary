import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import MissionAndVideo from './components/MissionAndVideo';
import Profile from './components/Profile';
import Faqs from './components/Faqs';
import AcademicCalculator from './components/Calculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'mission-vision' | 'services' | 'about' | 'faqs' | 'contact'>('home');
  const [selectedService, setSelectedService] = useState<
    'Clases Particulares / Tutoría' | 'Realización y Asesoría de Trabajos' | 'Preparación para Exámenes' | 'Otro' | ''
  >('');

  const handleSelectService = (
    serviceName: 'Clases Particulares / Tutoría' | 'Realización y Asesoría de Trabajos'
  ) => {
    setSelectedService(serviceName);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmissionSuccess = () => {
    // Reset selection after success
    setSelectedService('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-between selection:bg-[#fed65b] selection:text-[#00236f]">
      {/* Universal Sticky Header with dedicated Page Navigation */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Page Routing Stage */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <div key="page-home" className="space-y-0">
                {/* Visual Editorial presentation header */}
                <Hero onNavigate={setCurrentPage} />
              </div>
            )}

            {currentPage === 'mission-vision' && (
              <div key="page-mission-vision" className="space-y-0">
                {/* Video de Bienvenida interactivo, Misión & Visión */}
                <MissionAndVideo />
              </div>
            )}

            {currentPage === 'services' && (
              <div key="page-services" className="space-y-0">
                {/* Specific Tutoring & Advisory catalog list */}
                <Services onSelectService={handleSelectService} />
                
                {/* Multi-subject Diagnostics & GPACalculator form */}
                <AcademicCalculator />
              </div>
            )}

            {currentPage === 'about' && (
              <div key="page-about" className="py-8">
                {/* Detailed credential sheet and Crest identifier */}
                <Profile />
              </div>
            )}

            {currentPage === 'faqs' && (
              <div key="page-faqs" className="space-y-0">
                {/* Accordion FAQ list */}
                <Faqs />
              </div>
            )}

            {currentPage === 'contact' && (
              <div key="page-contact" className="py-8">
                {/* Custom service contact list and scheduler */}
                <ContactForm 
                  selectedService={selectedService} 
                  onSubmissionSuccess={handleSubmissionSuccess} 
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Editorial Footer with routing callback hooks */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
