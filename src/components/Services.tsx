import { Languages, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onSelectService: (serviceName: 'Clases Particulares / Tutoría' | 'Realización y Asesoría de Trabajos') => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const services = [
    {
      id: 'tutoring' as const,
      title: 'Clases Particulares / Tutorías',
      serviceType: 'Clases Particulares / Tutoría' as const,
      icon: Languages,
      description: 'Refuerzo escolar y universitario integral en TODAS las materias y asignaturas (Matemáticas, Ciencias, Física, Química, Biología, Sociales, Inglés, etc.). Modalidad bilingüe o en español adaptada al ritmo de cada alumno.',
      bullets: [
        'Acompañamiento en cualquier materia o nivel de estudio.',
        'Preparación integral para exámenes nacionales e internacionales.',
        'Refuerzo en bilingüismo, nivelación de idiomas y gramática.',
        'Apoyo pedagógico dinámico y metodologías personalizadas.'
      ],
      color: 'border-l-4 border-l-[#00236f]'
    },
    {
      id: 'research' as const,
      title: 'Realización y Asesoría de Trabajos',
      serviceType: 'Realización y Asesoría de Trabajos' as const,
      icon: FileText,
      description: 'Acompañamiento profesional en la redacción, edición y estructuración de proyectos académicos, ensayos y trabajos de grado.',
      bullets: [
        'Corrección de estilo y normas APA/IEEE.',
        'Investigación documental estructurada.',
        'Edición bilingüe de manuscritos.'
      ],
      color: 'border-l-4 border-l-[#735c00]'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white border-b border-[#dde9ff]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#00236f] inline-block relative pb-3">
            Nuestros Servicios
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#735c00] rounded" />
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((svc, index) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`bg-[#f8f9ff] rounded-xl p-8 border border-[#dde9ff] shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${svc.color} group`}
            >
              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00236f] mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svc.icon size={26} />
                </div>

                {/* Service Heading */}
                <h3 className="font-serif font-bold text-xl md:text-2xl text-[#00236f] mb-4">
                  {svc.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans text-[#444651] text-sm md:text-base leading-relaxed mb-6 font-light">
                  {svc.description}
                </p>

                {/* Checklist bullets */}
                <ul className="space-y-3.5 mb-8">
                  {svc.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#735c00] mt-1 shrink-0">
                        <CheckCircle2 size={15} />
                      </span>
                      <span className="font-sans text-sm md:text-[15px] text-[#0d1c2f] font-normal">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link inside Card */}
              <button
                onClick={() => onSelectService(svc.serviceType)}
                className="inline-flex items-center gap-2 mt-auto font-sans font-semibold text-xs tracking-wider uppercase text-[#00236f] hover:text-[#735c00] border-b border-[#00236f]/30 hover:border-[#735c00] pb-1 self-start transition-all focus:outline-none"
              >
                Solicitar Asesoría
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
