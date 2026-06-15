import { useState, useEffect } from 'react';
import { Calculator, Hourglass, CheckSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function AcademicCalculator() {
  const [level, setLevel] = useState<'Primaria' | 'Bachillerato' | 'Pregrado' | 'Postgrado'>('Bachillerato');
  const [goal, setGoal] = useState<'regular' | 'exam_prep' | 'thesis_help'>('regular');
  const [estimate, setEstimate] = useState({ hours: 4, text: '', list: [] as string[] });

  useEffect(() => {
    let hours = 2;
    let text = '';
    let list: string[] = [];

    if (level === 'Primaria') {
      if (goal === 'regular') {
        hours = 2;
        text = 'Refuerzo regular para mantener el ritmo escolar en asignaturas bilingües.';
        list = ['Tutorías de 1 hora, dos veces por semana.', 'Foco en hábitos de estudio y comprensión de textos.', 'Retroalimentación continua a padres de familia.'];
      } else if (goal === 'exam_prep') {
        hours = 4;
        text = 'Preparación express para exámenes trimestrales o de admisión internacional.';
        list = ['Sesiones dinámicas interactivas.', 'Simulacros de preguntas clave.', 'Consejos para manejo de la ansiedad en pruebas.'];
      } else {
        hours = 3;
        text = 'Acompañamiento en proyectos creativos, ensayos cortos u oratoria.';
        list = ['Redacción creativa guiada.', 'Estructuración básica de ideas.', 'Prácticas de presentación oral bilingüe.'];
      }
    } else if (level === 'Bachillerato') {
      if (goal === 'regular') {
        hours = 4;
        text = 'Nivelación formal enfocado en asignaturas críticas y bilingüismo.';
        list = ['Revisión rigurosa de gramática y vocabulario avanzado.', 'Soporte en Ciencias o Matemáticas bilingües.', 'Evaluaciones semanales de progreso académico.'];
      } else if (goal === 'exam_prep') {
        hours = 6;
        text = 'Preparación exhaustiva para pruebas de certificación de idiomas (Sable, IELTS, TOEFL) o de ingreso.';
        list = ['Análisis profundo de la estructura de las pruebas.', 'Gramática especializada e intensiva.', 'Sesiones de simulación cronometrada de speaking y writing.'];
      } else {
        hours = 5;
        text = 'Edición estructural y soporte gramatical en monografías (como Bachillerato Internacional) y ensayos de grado.';
        list = ['Estructuración lógica basada en rúbricas oficiales.', 'Corrección detallada de estilo bilingüe.', 'Verificación de fuentes secundarias y citas bibliográficas.'];
      }
    } else if (level === 'Pregrado') {
      if (goal === 'regular') {
        hours = 4;
        text = 'Asesoramiento universitario para consolidar conceptos técnicos complejos o redacción académica avanzada.';
        list = ['Clarificación de conceptos de especialidad.', 'Adaptación a estándares de escritura científica académica.', 'Enfoque estructurado de autoestudio guiado por rúbricas.'];
      } else if (goal === 'exam_prep') {
        hours = 6;
        text = 'Entrenamiento crítico previo a parciales universitarios o validaciones de lengua extranjera.';
        list = ['Práctica avanzada de casos de estudio.', 'Redacción técnica y traducción experta.', 'Manejo asertivo de tiempos de respuesta en testings de alta complejidad.'];
      } else {
        hours = 8;
        text = 'Dirección académica estratégica para tesis de grado, proyectos de investigación formal y artículos científicos.';
        list = ['Asesoría completa en planteamiento del problema y metodología.', 'Alineación de normas APA actualizadas y consistencia teórica.', 'Simulacros orales con retroalimentación para sustentaciones.'];
      }
    } else { // Postgrado
      if (goal === 'regular') {
        hours = 4;
        text = 'Mentoría de doctorado o maestría en el diseño y pulido de papers u exposiciones bilingües.';
        list = ['Análisis crítico de coherencia argumentativa.', 'Terminología técnica de alta especialización.', 'Asesoría para co-autorías y congresos internacionales.'];
      } else if (goal === 'exam_prep') {
        hours = 6;
        text = 'Soporte en la preparación de defensas de candidatura doctoral o exámenes de suficiencia lingüística internacional.';
        list = ['Asesoría en dialéctica académica ante comités de expertos.', 'Análisis detallado de temarios especializados.', 'Simulación rigorosa de preguntas e interpelación académica.'];
      } else {
        hours = 10;
        text = 'Acompañamiento premium integral en la edificación, redacción, revisión y publicación de tesis y manuscritos doctorales.';
        list = ['Verificación metodológica formal y estructura científica.', 'Edición literaria bilingüe experta y normas internacionales (IEEE, APA, Harvard).', 'Orientación de respuestas formales a jurados y dictámenes editoriales.'];
      }
    }

    setEstimate({ hours, text, list });
  }, [level, goal]);

  return (
    <section id="calculator" className="py-20 bg-white border-b border-[#dde9ff]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center mb-14">
          <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[#735c00] block mb-2">
            Autodiagnóstico
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#00236f] inline-block relative pb-3">
            Calculadora de Necesidad Académica
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#00236f] rounded" />
          </h2>
          <p className="font-sans text-[#444651] max-w-lg mx-auto text-sm md:text-base mt-4 font-light">
            Encuentre la recomendación ideal de horas de estudio según su nivel educativo y metas particulares.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Input Selector Column */}
          <div className="lg:col-span-5 bg-[#f8f9ff] border border-[#dde9ff] rounded-xl p-6 flex flex-col justify-between">
            <div>
              {/* Educational Level Selection */}
              <div className="mb-8">
                <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-4">
                  Nivel de Estudios
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Primaria', 'Bachillerato', 'Pregrado', 'Postgrado'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`py-3 px-4 rounded text-xs font-sans font-bold uppercase tracking-wider text-center border transition-all duration-200 outline-none ${
                        level === lvl
                          ? 'bg-[#00236f] border-[#00236f] text-white shadow-sm'
                          : 'bg-white border-[#dde9ff] hover:bg-[#eff4ff] text-[#444651]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal or Assistance Needed Selection */}
              <div>
                <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-4">
                  Objetivo del Acompañamiento
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'regular' as const, title: 'Refuerzo Escolar/Universitario' },
                    { id: 'exam_prep' as const, title: 'Preparación de Exámenes' },
                    { id: 'thesis_help' as const, title: 'Tesis, Ensayos o Proyectos' }
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setGoal(o.id)}
                      className={`w-full text-left py-3.5 px-4 rounded border transition-all duration-200 text-sm font-sans font-medium flex items-center justify-between outline-none ${
                        goal === o.id
                          ? 'bg-white border-[#735c00] text-[#735c00] font-semibold'
                          : 'bg-white border-[#dde9ff] text-[#444651] hover:bg-[#f6f9ff]'
                      }`}
                    >
                      {o.title}
                      {goal === o.id && <Sparkles size={14} className="text-[#735c00]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="font-mono text-[11px] text-[#757682] mt-6 bg-[#f0f4ff] p-3 rounded leading-normal border border-blue-50/50">
              *Las horas se calculan de manera semanal recomendada en base a métricas de asimilación pedagógica.
            </p>
          </div>

          {/* Diagnostic results presentation column */}
          <div className="lg:col-span-7 bg-[#f8f9ff] border border-[#dde9ff] rounded-xl overflow-hidden p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="font-sans font-bold text-xs tracking-wider uppercase bg-[#735c00] text-white py-1 px-3 rounded-full">
                  Resultado Diagnóstico
                </span>
                <h4 className="font-serif font-bold text-2xl text-[#00236f] mt-3">
                  Plan de Estudio Sugerido
                </h4>
              </div>
              <div className="p-3 bg-[#00236f]/10 text-[#00236f] rounded-lg shrink-0">
                <Calculator size={24} />
              </div>
            </div>

            {/* Graphic hours highlight */}
            <div className="bg-white rounded-lg p-5 border border-[#dde9ff] flex flex-col sm:flex-row items-center gap-5 mb-6 shadow-sm">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#eff4ff] text-[#00236f] shrink-0">
                <Hourglass size={28} className="animate-spin-slow" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-baseline justify-center sm:justify-start gap-1">
                  <span className="font-mono font-bold text-4xl text-[#00236f]">{estimate.hours}</span>
                  <span className="font-sans font-semibold text-sm text-[#444651] uppercase">Horas semanales</span>
                </div>
                <p className="font-sans text-xs text-[#757682] mt-1">Recomendación óptima sugerida por Ms. Sary</p>
              </div>
            </div>

            {/* Dynamic narrative describing the custom plan */}
            <div className="mb-6">
              <p className="font-sans text-[#0d1c2f] text-[15px] font-semibold leading-relaxed mb-4">
                {estimate.text}
              </p>
              
              {/* Steps/Bullets list (using literal check squares) */}
              <ul className="space-y-3">
                {estimate.list.map((step, sIdx) => (
                  <li key={sIdx} className="flex gap-3">
                    <span className="text-[#00236f] mt-0.5 shrink-0">
                      <CheckSquare size={16} />
                    </span>
                    <span className="font-sans text-sm text-[#444651]">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit call to action */}
            <p className="font-sans text-xs text-[#757682] italic border-t border-[#dde9ff] pt-4 leading-normal">
              ¿Listo para dar el primer paso? Agende una sesión abajo detallando estos resultados en su solicitud para iniciar su planificación bilingüe de inmediato.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
