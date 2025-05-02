import axios from 'axios';
import { Appointment } from '../types/Appointment';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto según tu red
});

export const getAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get('/appointments');
  return res.data;
};

export const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
  const res = await api.post('/appointments', appointment);
  return res.data;
};

export const getAppointment = async (id: number): Promise<Appointment> => {
  const res = await api.get(`/appointments/${id}`);
  return res.data;
};

export const updateAppointment = async (id: number, data: Partial<Appointment>) => {
  const res = await api.put(`/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id: number) => {
  await api.delete(`/appointments/${id}`);
};


