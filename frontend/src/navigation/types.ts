import { Appointment } from '../types/Appointment';

export type RootStackParamList = {
  Citas: undefined;
  Formulario: { appointment?: Appointment } | undefined;
  Detalles: { id: number };
};
