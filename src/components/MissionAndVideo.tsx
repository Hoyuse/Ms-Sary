import { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, Core, RotateCcw, 
  Tv, Compass, HelpCircle, GraduationCap, Target, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaptionLine {
  time: number; // in seconds
  text: string;
  enText: string;
  speaker: string;
}

const WELCOME_SCRIPT: CaptionLine[] = [
  { 
    time: 0, 
    text: "¡Hola! Bienvenidos a Ms. Sary // Asesorías Académicas.", 
    enText: "Hello! Welcome to Ms. Sary // Academic Advising.",
    speaker: "Ms. Sary"
  },
  { 
    time: 5, 
    text: "Mi propósito es impulsarte a alcanzar la verdadera excelencia académica, sin importar la materia o nivel.", 
    enText: "My purpose is to empower you to reach true academic excellence, regardless of the subject or level.", 
    speaker: "Ms. Sary"
  },
  { 
    time: 12, 
    text: "Creemos firmemente en el rigor, la honestidad científica y el poder del bilingüismo formal.", 
    enText: "We deeply believe in academic rigor, scientific honesty, and the power of formal bilingualism.", 
    speaker: "Ms. Sary"
  },
  { 
    time: 18, 
    text: "Ofrecemos tutorías personalizadas hechas a tu medida, adaptadas a tu propio ritmo de aprendizaje.", 
    enText: "We offer tailored personalized tutoring, fully adapted to your own learning pace.", 
    speaker: "Ms. Sary"
  },
  { 
    time: 24, 
    text: "Desde la primaria hasta proyectos de maestría y doctorado, estamos aquí para guiarte en el camino al éxito.", 
    enText: "From primary school matching to master's and doctoral projects, we are here to support your ladder to success.", 
    speaker: "Ms. Sary"
  },
  { 
    time: 31, 
    text: "¡Hagamos equipo hoy mismo! Agenda tu sesión y alcancemos juntos tus metas más altas.", 
    enText: "Let us team up today! Book your session and let's achieve your highest goals together.", 
    speaker: "Ms. Sary"
  }
];

export default function MissionAndVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'en'>('es');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [qrUrl, setQrUrl] = useState('https://ms-sary.vercel.app');

  useEffect(() => {
    setQrUrl('https://ms-sary.vercel.app');
  }, []);
  
  const videoDuration = 38; // total mock duration in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Playback timer effects
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= videoDuration) {
            handleStop();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Speech Voiceover trigger effect to read out sync subtitles ("con letras")
  useEffect(() => {
    if (isPlaying && voiceEnabled) {
      // Find the current caption chunk
      const currentCaption = [...WELCOME_SCRIPT]
        .reverse()
        .find(line => currentTime >= line.time);

      if (currentCaption) {
        const textToSpeak = selectedLanguage === 'es' ? currentCaption.text : currentCaption.enText;
        
        // Stop any currently speaking voice to avoid stacking
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = selectedLanguage === 'es' ? 'es-MX' : 'en-US';
          utterance.rate = 1.05;
          utterance.volume = isMuted ? 0 : 0.8;
          activeUtteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        }
      }
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [currentTime, isPlaying, selectedLanguage, voiceEnabled, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
  };

  const handleSkimToChapter = (time: number) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  // Find active caption line based on playing time
  const currentCaption = [...WELCOME_SCRIPT]
    .reverse()
    .find(line => currentTime >= line.time) || WELCOME_SCRIPT[0];

  return (
    <section id="mission-video" className="py-20 bg-[#f8f9ff] border-b border-[#dde9ff]">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        
        {/* Welcome Video Section with letras */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[#735c00] block mb-2">
              Mensaje en Video de Ms. Sary
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#00236f] inline-block relative pb-3">
              Video del Sistema de Bienvenida
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#735c00] rounded" />
            </h2>
            <p className="font-sans text-[#444651] max-w-lg mx-auto text-sm md:text-base mt-4 font-light">
              Escuche a Ms. Sary presentar su visión bilingüe, con subtítulos dinámicos interactivos y lecturas guiadas en vivo.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: The Interactive Welcome Video Player Canvas */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden border border-[#dde9ff] shadow-xl flex flex-col justify-between relative min-h-[400px] group/player">
              
              {/* Notebook Paper Ambient Video Simulation Layer */}
              <div className="absolute inset-0 opacity-10 bg-grid-lines pointer-events-none grid-notebook" />

              {/* Decorative Camera Frame UI */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300">
                  {isPlaying ? 'REC // PLAYING' : 'READY // PAUSED'}
                </span>
              </div>

              <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400">
                  AUDIO OUT: {voiceEnabled && !isMuted ? 'ACTIVE (AI)' : 'MUTED'}
                </span>
              </div>

              {/* Video Body Content Viewport */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
                <AnimatePresence mode="wait">
                  {!isPlaying && currentTime === 0 ? (
                    /* Thumbnail Welcome Trigger */
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 max-w-md cursor-pointer"
                      onClick={handlePlayPause}
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 hover:bg-[#735c00] backdrop-blur-md text-white flex items-center justify-center mx-auto shadow-lg transition-all group-hover/player:scale-110">
                        <Play size={36} className="fill-current translate-x-1" />
                      </div>
                      <h4 className="font-serif italic text-2xl text-white">
                        "Descubre una nueva forma de aprender"
                      </h4>
                      <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Presiona play para iniciar la reproducción y escuchar las palabras de bienvenida de Ms. Sary en tiempo real.
                      </p>
                    </motion.div>
                  ) : (
                    /* Live Subtitle Letters Overlay (Highlighting dynamic letters) */
                    <motion.div
                      key="lyrics-display"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="w-full max-w-2xl px-4 space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#fed65b]">
                          {currentCaption.speaker} — Presentación Oficial
                        </span>
                      </div>

                      {/* Display spoken sentence in spanish with gorgeous letters styling */}
                      <p className="font-serif text-2xl md:text-3.5xl text-white font-bold leading-snug tracking-tight">
                        {selectedLanguage === 'es' ? currentCaption.text : currentCaption.enText}
                      </p>

                      {/* Secondary translation subtitles below */}
                      <p className="font-sans text-xs text-slate-400 italic">
                        {selectedLanguage === 'es' ? currentCaption.enText : currentCaption.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video Bottom Control Panel Overlay */}
              <div className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-800 p-4 space-y-3 z-20">
                {/* Durability slider range tracking */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={videoDuration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="flex-grow accent-[#735c00] h-1 bg-slate-700 rounded-lg cursor-pointer appearance-none outline-none"
                  />
                  <span className="font-mono text-[10px] text-slate-400">
                    {Math.floor(videoDuration / 60)}:{(videoDuration % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Control switches row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Play Button */}
                    <button
                      onClick={handlePlayPause}
                      className="p-1 px-3.5 rounded bg-white hover:bg-[#fed65b] text-slate-950 font-sans font-bold text-xs uppercase flex items-center gap-1.5 transition-all outline-none"
                      title={isPlaying ? 'Pausar' : 'Reproducir'}
                    >
                      {isPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>

                    {/* Reset State */}
                    <button
                      onClick={handleStop}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
                      title="Reiniciar"
                    >
                      <RotateCcw size={14} />
                    </button>
                    
                    {/* Voice Synth Toggle */}
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`p-1 px-2.5 border rounded text-[10px] font-sans font-bold uppercase transition-all ${
                        voiceEnabled 
                          ? 'border-[#735c00] bg-[#735c00]/20 text-[#fed65b]' 
                          : 'border-slate-700 bg-transparent text-slate-400'
                      }`}
                      title="Activar narración de voz del sistema bilingüe"
                    >
                      {voiceEnabled ? 'VOICE: ON' : 'VOICE: OFF'}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Subtitle language switcher */}
                    <div className="flex items-center rounded border border-slate-700 p-0.5 bg-slate-950">
                      <button
                        onClick={() => setSelectedLanguage('es')}
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded transition-all outline-none ${
                          selectedLanguage === 'es' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        ESP
                      </button>
                      <button
                        onClick={() => setSelectedLanguage('en')}
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded transition-all outline-none ${
                          selectedLanguage === 'en' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        ENG
                      </button>
                    </div>

                    {/* Volume Mute Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Chapters & Scannable QR Code column (side by side with the video) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Card 1: Interactive Chapters scroll list */}
              <div className="bg-white border border-[#dde9ff] rounded-2xl p-5 flex flex-col justify-between shadow-sm flex-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#dde9ff] pb-3">
                    <Tv size={16} className="text-[#00236f]" />
                    <span className="font-serif font-bold text-sm md:text-base text-[#00236f]">
                      Capítulos de Bienvenida
                    </span>
                  </div>
                  
                  {/* Chapters Index Buttons list */}
                  <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                    {WELCOME_SCRIPT.map((script, sIdx) => {
                      const isActive = currentTime >= script.time && (sIdx === WELCOME_SCRIPT.length - 1 || currentTime < WELCOME_SCRIPT[sIdx + 1].time);
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleSkimToChapter(script.time)}
                          className={`w-full text-left p-2.5 rounded-lg border text-[11px] transition-all flex items-start gap-2.5 outline-none ${
                            isActive 
                              ? 'bg-[#eff4ff] border-[#00236f] ring-1 ring-[#00236f]/10 font-medium'
                              : 'bg-[#f8f9ff] border-slate-100 hover:border-[#dde9ff] text-slate-600 hover:text-[#0d1c2f]'
                          }`}
                        >
                          <span className="font-mono text-[8px] bg-slate-200 p-0.5 px-1.5 rounded font-bold shrink-0 text-slate-700">
                            0:{(script.time).toString().padStart(2, '0')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-sans font-semibold leading-tight mb-0.5">
                              {script.text}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status indicator note */}
                <div className="mt-4 p-3 rounded-xl bg-[#eff4ff] border border-blue-50/50 flex gap-2">
                  <Compass size={14} className="text-[#00236f] mt-0.5 shrink-0" />
                  <p className="font-sans text-[10px] text-slate-600 leading-normal">
                    Haz clic en los enunciados para adelantar el video interactivo.
                  </p>
                </div>
              </div>

              {/* Card 2: Scannable QR Code leading back to this video presentation */}
              <div className="bg-white border border-[#dde9ff] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden group">
                {/* Visual top border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#735c00]" />
                
                <h4 className="font-serif font-bold text-sm text-[#00236f] mb-1 flex items-center gap-1.5 justify-center">
                  <Sparkles size={14} className="text-[#735c00]" />
                  QR de Acceso Móvil
                </h4>
                <p className="font-sans text-[10px] text-[#444651] max-w-[220px] mb-4 font-light leading-tight">
                  Escanea para ver este mensaje y los subtítulos bilingües directamente en tu dispositivo móvil.
                </p>

                {/* QR Code graphic container */}
                <div className="relative p-3 bg-white border border-[#dde9ff] rounded-xl shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(qrUrl)}&color=00236f`}
                    alt="Código QR del Video de Ms. Sary"
                    className="w-[120px] h-[120px] rounded object-contain"
                  />
                </div>

                {/* Instruction tag */}
                <span className="mt-3.5 font-mono text-[9px] tracking-widest text-[#735c00] font-bold uppercase bg-[#fcf8e5] px-2.5 py-1 rounded">
                  ESCANEAR CON LA CÁMARA
                </span>

                {/* Action shortcut to copy direct links */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(qrUrl);
                    alert("¡Enlace de la sección de video bilingüe copiado al portapapeles!");
                  }}
                  className="mt-2.5 text-[9px] font-sans text-slate-400 hover:text-[#00236f] hover:underline focus:outline-none transition-colors"
                >
                  O haz clic para copiar el enlace directo
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Mission and Vision cards block (side by side, beautifully crafted) */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch pt-6">
          
          {/* Misión Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#dde9ff] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between align-stretch relative overflow-hidden"
          >
            {/* Top right icon decorative */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00236f]/5 rounded-bl-full pointer-events-none" />

            <div>
              {/* Badged icon */}
              <div className="w-12 h-12 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00236f] mb-6">
                <Target size={22} />
              </div>

              <h3 className="font-serif font-bold text-2xl text-[#00236f] mb-4">
                Nuestra Misión
              </h3>

              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-light mb-6">
                Nuestra misión es empoderar a estudiantes de todos los niveles educativos mediante una <b>mentoría personalizada de máxima excelencia</b>, inculcando rigurosidad metodológica, disciplina conceptual y el dominio de un bilingüismo formal para que alcancen la máxima idoneidad en sus estudios y superen sus obstáculos académicos con honestidad.
              </p>
            </div>

            {/* Checklist values list */}
            <div className="border-t border-slate-100 pt-4 mt-auto">
              <ul className="grid grid-cols-2 gap-3 text-xs font-mono text-[#00236f] font-semibold uppercase tracking-wider">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#735c00] rounded-sm" />
                  Rigor Analítico
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#735c00] rounded-sm" />
                  Honestidad
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#735c00] rounded-sm" />
                  Bilingüismo
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#735c00] rounded-sm" />
                  Excelencia
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Visión Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#dde9ff] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between align-stretch relative overflow-hidden"
          >
            {/* Top right icon decorative */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#735c00]/5 rounded-bl-full pointer-events-none" />

            <div>
              {/* Badged icon */}
              <div className="w-12 h-12 rounded-lg bg-[#fcf8e5] flex items-center justify-center text-[#735c00] mb-6">
                <Eye size={22} />
              </div>

              <h3 className="font-serif font-bold text-2xl text-[#735c00] mb-4">
                Nuestra Visión
              </h3>

              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-light mb-6">
                Para el año 2030, seremos reconocidos a nivel nacional e internacional como el <b>sistema líder de acompañamiento bilingüe y consultoría investigativa</b> de mayor impacto en la costa Caribe y el país, formando líderes éticos, aptos para superar pruebas de alto nivel y ser aceptados en renombradas universidades del exterior.
              </p>
            </div>

            {/* Checklist values list */}
            <div className="border-t border-slate-100 pt-4 mt-auto">
              <ul className="grid grid-cols-2 gap-3 text-xs font-mono text-[#735c00] font-semibold uppercase tracking-wider">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#00236f] rounded-sm" />
                  Impacto Global
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#00236f] rounded-sm" />
                  Trascendencia
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#00236f] rounded-sm" />
                  Ética Científica
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#00236f] rounded-sm" />
                  Liderazgo
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
