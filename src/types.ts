export interface ContactRequest {
  id: string;
  fullName: string;
  phone: string;
  serviceType: 'Clases Particulares / Tutoría' | 'Realización y Asesoría de Trabajos' | 'Preparación para Exámenes' | 'Otro';
  preferredLanguage: 'Español' | 'English' | 'Bilingüe (Español/Inglés)';
  description: string;
  createdAt: string;
  status: 'Nueva' | 'En Proceso' | 'Completada' | 'Archivada';
  adminNotes?: string;
}

export interface AcademicDiagnostic {
  level: 'Primaria' | 'Bachillerato' | 'Pregrado' | 'Postgrado';
  frequency: 'regular' | 'exam_prep' | 'thesis_help';
  hoursNeed: number;
  recommendation: string;
}
