export interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    appointment_time: string;
    reason: string;
    status: 'pendiente' | 'confirmada' | 'cancelada';
    create_time: string;
  }
  