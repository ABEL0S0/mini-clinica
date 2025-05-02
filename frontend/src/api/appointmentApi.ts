import axios from 'axios';
import { Appointment } from '../types/Appointment';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000',
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