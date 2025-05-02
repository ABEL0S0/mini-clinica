import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';

export class AppointmentController {
  static async getAll(req: Request, res: Response) {
    const appointments = await AppointmentService.getAll();
    res.json(appointments);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const appointment = await AppointmentService.create(data);
    res.status(201).json(appointment);
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const appointment = await AppointmentService.getById(id);
    if (appointment) res.json(appointment);
    else res.status(404).json({ message: 'Appointment not found' });
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await AppointmentService.delete(id);
    res.status(204).send();
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updatedAppointment = await AppointmentService.update(id, data);
    if (updatedAppointment) res.json(updatedAppointment);
    else res.status(404).json({ message: 'Appointment not found' });
  }
  static async updateStatus(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const updatedAppointment = await AppointmentService.updateStatus(id, status);
    if (updatedAppointment) res.json(updatedAppointment);
    else res.status(404).json({ message: 'Appointment not found' });
  }
}
