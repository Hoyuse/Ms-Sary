import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Metodología' | 'Materias y Niveles' | 'Trabajos e Investigación' | 'Pagos y Agendamiento';
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Materias y Niveles',
    question: '¿Qué asignaturas o materias enseña Ms. Sary?',
    answer: 'Ms. Sary ofrece asesoría integral en cualquier materia del pensum académico nacional e internacional. Esto incluye Ciencias Exactas (Matemáticas, Física, Química, Biología), Humanidades (Historia, Ciencias Sociales), Idiomas (Inglés, Español) y competencias de Lectura Crítica.'
  },
  {
    category: 'Metodología',
    question: '¿Las sesiones son particulares/individuales o grupales?',
    answer: 'Todas nuestras sesiones están diseñadas bajo un esquema 100% personalizado e individualizado. Esto nos permite adaptarnos al ritmo de aprendizaje de cada alumno, detectar falencias específicas y consolidar el conocimiento de forma asertiva.'
  },
  {
    category: 'Metodología',
    question: '¿Las clases se imparten de forma virtual o presencial?',
    answer: 'Ofrecemos tutorías en modalidad virtual interactiva utilizando herramientas pedagógicas avanzadas, pizarras colaborativas digitales y videoconferencia de alta resolución, permitiendo dar cobertura a estudiantes en toda Colombia y el exterior sin importar la distancia.'
  },
  {
    category: 'Trabajos e Investigación',
    question: '¿Cómo garantizan la honestidad y ética en la asesoría de trabajos?',
    answer: 'Trabajamos bajo un estricto código de ética y honestidad científica. No realizamos fraude académico; en su lugar, brindamos acompañamiento experto en co-creación, estructuración metodológica, corrección de estilo, aplicación de normas internacionales (APA, IEEE, Harvard) y simulación de sustentaciones para que el estudiante defienda su propio proyecto con total propiedad intelectual.'
  },
  {
    category: 'Materias y Niveles',
    question: '¿Atienden niveles de bachillerato internacional u otros programas avanzados?',
    answer: 'Sí. Contamos con amplia trayectoria preparando a estudiantes de Bachillerato Internacional (IB), currículos Cambridge y entrenando para exámenes estandarizados internacionales (IELTS, TOEFL, SAT) con altos estándares pedagógicos bilingües.'
  },
  {
    category: 'Pagos y Agendamiento',
    question: '¿Cómo puedo agendar una consulta y cuáles son las formas de pago?',
    answer: 'Es muy sencillo: diríjase a la pestaña de "Contacto & Agendamiento", complete sus datos y método preferido. Nos comunicaremos de inmediato (menos de 24 horas) para agendar su sesión. Los servicios se coordinan de forma transparente y segura.'
  }
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'Todos' | FaqItem['category']>('Todos');

  const categories: ('Todos' | FaqItem['category'])[] = [
    'Todos', 
    'Metodología', 
    'Materias y Niveles', 
    'Trabajos e Investigación', 
    'Pagos y Agendamiento'
  ];

  const filteredFaqs = FAQ_DATA.filter(item => 
    activeCategory === 'Todos' ? true : item.category === activeCategory
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-b border-[#dde9ff]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[#735c00] block mb-2">
            Resolución de Dudas
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#00236f] inline-block relative pb-3">
            Preguntas Frecuentes
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#00236f] rounded" />
          </h2>
          <p className="font-sans text-[#444651] max-w-lg mx-auto text-sm md:text-base mt-4 font-light leading-relaxed">
            Conozca en detalle nuestra metodología bilingüe de tutorías, honestidad intelectual y logística de agendamiento.
          </p>
        </div>

        {/* Categories Quick Filter Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); // auto-expand first item of filtered category
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 outline-none ${
                activeCategory === cat
                  ? 'bg-[#00236f] text-white shadow-sm'
                  : 'bg-[#f8f9ff] text-[#444651] hover:bg-[#eff4ff] border border-[#dde9ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Faq Accordion List Grid */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-[#00236f] bg-[#f8f9ff] shadow-sm' 
                    : 'border-[#dde9ff] bg-white hover:border-[#ccd7f0]'
                }`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 outline-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-[#735c00]">
                      <HelpCircle size={18} />
                    </span>
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-[#735c00] font-bold mb-1">
                        {faq.category}
                      </span>
                      <h4 className="font-serif font-bold text-base md:text-lg text-[#0d1c2f] leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#00236f] text-white' : 'bg-[#eff4ff] text-[#00236f]'
                  }`}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Sub-body Answer content drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[#dde9ff]/50 font-sans text-sm text-slate-700 leading-relaxed font-light pl-11">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick bottom call-out */}
        <div className="mt-12 p-6 rounded-2xl bg-[#eff4ff] border border-[#dde9ff] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white text-[#735c00] rounded-lg">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <h5 className="font-serif font-bold text-base text-[#00236f]">¿Tiene alguna otra duda particular?</h5>
              <p className="font-sans text-xs text-slate-500">Estamos listos para atenderle con gusto y resolver cualquier inquietud.</p>
            </div>
          </div>
          <a
            href="https://wa.me/573014591627?text=Hola%20Ms.%20Sary,%20tengo%20una%20pregunta%20sobre%20las%20asesor%C3%ADas..."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-colors shrink-0"
          >
            <MessageSquare size={14} />
            Consultar via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
