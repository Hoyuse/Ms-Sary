import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactRequest } from '../types';

interface ContactFormProps {
  selectedService: 'Clases Particulares / Tutoría' | 'Realización y Asesoría de Trabajos' | 'Preparación para Exámenes' | 'Otro' | '';
  onSubmissionSuccess: () => void;
}

export default function ContactForm({ selectedService, onSubmissionSuccess }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<ContactRequest['serviceType']>('Clases Particulares / Tutoría');
  const [preferredLanguage, setPreferredLanguage] = useState<ContactRequest['preferredLanguage']>('Español');
  const [description, setDescription] = useState('');
  
  // Validation and status triggers
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Sync with selected service from cards
  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService);
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation checks
    if (!fullName.trim()) {
      setErrorMsg('Por favor ingrese su nombre completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor ingrese su número de teléfono.');
      return;
    }
    // Simple Colombian phone validation (or general)
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Por favor ingrese un número de teléfono válido (mínimo 7 dígitos).');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Por favor detalle brevemente los temas o requerimientos que necesita.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database network write delay
    setTimeout(() => {
      try {
        const newRequest: ContactRequest = {
          id: 'REQ_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          fullName: fullName.trim(),
          phone: phone.trim(),
          serviceType,
          preferredLanguage,
          description: description.trim(),
          createdAt: new Date().toISOString(),
          status: 'Nueva',
        };

        // Save to Client Local Storage
        const currentRequestsRaw = localStorage.getItem('sary_requests');
        const currentRequests: ContactRequest[] = currentRequestsRaw ? JSON.parse(currentRequestsRaw) : [];
        currentRequests.unshift(newRequest);
        localStorage.setItem('sary_requests', JSON.stringify(currentRequests));

        const messageText = `¡Hola Ms. Sary! 👋 Deseo solicitar una asesoría académica.\n\n` +
          `📝 *Detalles de Solicitud*:\n` +
          `• *Nombre*: ${fullName.trim()}\n` +
          `• *Teléfono*: ${phone.trim()}\n` +
          `• *Servicio*: ${serviceType}\n` +
          `• *Idioma*: ${preferredLanguage}\n` +
          `• *Requerimientos*: ${description.trim()}`;

        const generatedUrl = `https://wa.me/573014591627?text=${encodeURIComponent(messageText)}`;
        setWhatsappUrl(generatedUrl);

        setIsSubmitting(false);
        setIsSuccess(true);
        onSubmissionSuccess();

        // Perform instant redirect to WhatsApp
        window.location.href = generatedUrl;
      } catch (err) {
        setIsSubmitting(false);
        setErrorMsg('Disculpe, ocurrió un inconveniente guardando su solicitud. Por favor intente nuevamente.');
      }
    }, 1200);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setDescription('');
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-20 bg-[#eff4ff] relative">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#00236f] mb-4">
            Solicitar Asesoría
          </h2>
          <p className="font-sans text-[#444651] text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
            Complete el siguiente formulario y nos pondremos en contacto a la brevedad.
          </p>
        </div>

        {/* Animated form sheet */}
        <div className="bg-white rounded-xl border border-[#dde9ff] shadow-lg p-6 md:p-10 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                id="form-solicitud"
              >
                {/* Error Banner */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded text-red-700 flex items-center gap-3 text-sm font-medium"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-4 py-3 rounded border border-[#dde9ff] focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/10 bg-[#f8f9ff] text-sm text-[#0d1c2f] placeholder-[#757682] transition-all"
                    disabled={isSubmitting}
                    id="input-name"
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-2">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 3001234567"
                    className="w-full px-4 py-3 rounded border border-[#dde9ff] focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/10 bg-[#f8f9ff] text-sm text-[#0d1c2f] placeholder-[#757682] transition-all"
                    disabled={isSubmitting}
                    id="input-phone"
                  />
                </div>

                {/* Service type select */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-2">
                      Tipo de Servicio
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ContactRequest['serviceType'])}
                      className="w-full px-4 py-3 rounded border border-[#dde9ff] focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/10 bg-[#f8f9ff] text-sm text-[#0d1c2f] transition-all"
                      disabled={isSubmitting}
                      id="select-service"
                    >
                      <option value="Clases Particulares / Tutoría">Clases Particulares / Tutoría</option>
                      <option value="Realización y Asesoría de Trabajos">Realización y Asesoría de Trabajos</option>
                      <option value="Preparación para Exámenes">Preparación para Exámenes</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-2">
                      Idioma Preferido
                    </label>
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value as ContactRequest['preferredLanguage'])}
                      className="w-full px-4 py-3 rounded border border-[#dde9ff] focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/10 bg-[#f8f9ff] text-sm text-[#0d1c2f] transition-all"
                      disabled={isSubmitting}
                      id="select-language"
                    >
                      <option value="Español">Español</option>
                      <option value="English">English</option>
                      <option value="Bilingüe (Español/Inglés)">Bilingüe (Español/Inglés)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider uppercase text-[#0d1c2f] mb-2">
                    Descripción breve de su solicitud
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Cuéntenos más sobre lo que necesita..."
                    rows={4}
                    className="w-full px-4 py-3 rounded border border-[#dde9ff] focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/10 bg-[#f8f9ff] text-sm text-[#0d1c2f] placeholder-[#757682] transition-all"
                    disabled={isSubmitting}
                    id="input-desc"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#735c00] hover:bg-[#8c7000] text-white font-sans font-semibold text-sm tracking-wider uppercase px-6 py-4 rounded transition-all shadow-md active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none focus:outline-none"
                  id="form-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Enviando Solicitud...
                    </>
                  ) : (
                    <>
                      Solicitar Asesoría
                      <Send size={15} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 space-y-6 flex flex-col items-center"
              >
                {/* Success Icon Animation */}
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={44} className="stroke-[2.5]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-2xl text-[#00236f]">
                    ¡Solicitud Enviada con Éxito!
                  </h3>
                  <p className="font-sans text-[#444651] max-w-md text-sm md:text-base leading-relaxed font-light">
                    Redirigiéndote automáticamente al WhatsApp de <strong>Ms. Sary</strong> para coordinar tu sesión...
                  </p>
                  <p className="font-sans text-xs text-slate-500 max-w-sm">
                    Si no eres redirigido automáticamente en unos segundos (debido al bloqueo de ventanas de tu navegador o sandbox), haz clic en el botón de abajo para enviar los datos de tu solicitud por chat.
                  </p>
                </div>

                {/* Direct WhatsApp link button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 duration-200"
                >
                  <MessageSquare size={16} />
                  Abrir Chat de WhatsApp
                </a>

                {/* Back Link */}
                <button
                  onClick={handleResetForm}
                  className="mt-4 font-sans font-semibold text-xs tracking-wider uppercase text-[#00236f] hover:text-[#735c00] transition-colors border-b border-[#00236f]/30 hover:border-[#735c00] pb-0.5 focus:outline-none"
                >
                  Enviar otra solicitud
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
