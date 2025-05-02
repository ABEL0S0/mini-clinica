import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('patientName')
    .notEmpty().withMessage('El nombre del paciente es obligatorio'),
  
  body('doctorName')
    .notEmpty().withMessage('El nombre del doctor es obligatorio'),
  
  body('appointment_time')
    .notEmpty().withMessage('La fecha de la cita es obligatoria')
    .isISO8601().withMessage('La fecha debe tener un formato válido (ISO 8601)'),
  body('reason')
    .notEmpty().withMessage('El motivo de la cita es obligatorio'),
  body('status')
    .notEmpty().withMessage('El estado de la cita es obligatorio')
    .isIn(['pendiente', 'confirmada', 'cancelada'])
    .withMessage('El estado debe ser: pendiente, confirmada o cancelada'),
];

