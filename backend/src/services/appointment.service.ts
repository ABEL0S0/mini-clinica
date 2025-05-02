import { connectDB } from '../config/db';
import { Appointment } from '../entities/appointment.entity';

export class AppointmentService {
  static async getAll(): Promise<Appointment[]> {
    const db = await connectDB();
    return db.all<Appointment[]>(
      'SELECT * FROM appointment ORDER BY appointment_time DESC'
    );
  }

  static async getById(id: number): Promise<Appointment | undefined> {
    const db = await connectDB();
    return db.get<Appointment>('SELECT * FROM appointment WHERE id = ?', id);
  }

  static async create(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    const db = await connectDB();
    const appointmentTime = new Date(data.appointment_time);
    const createTime = new Date(data.create_time);
    const stmt = await db.run(
      `INSERT INTO appointment (patientName, doctorName, appointment_time, reason, status, create_time)
       VALUES (?, ?, ?, ?, ?, ?)`,
      data.patientName,
      data.doctorName,
      appointmentTime.toISOString(),
      data.reason,
      data.status,
      createTime.toISOString()
    );
  
    return {
      id: stmt.lastID!,
      ...data,
      appointment_time: appointmentTime,
      create_time: createTime
    };
  }

  static async delete(id: number): Promise<void> {
    const db = await connectDB();
    await db.run('DELETE FROM appointment WHERE id = ?', id);
  }

  static async update(id: number, data: Partial<Appointment>): Promise<Appointment | undefined> {
    const db = await connectDB();
    const existingAppointment = await this.getById(id);
    if (!existingAppointment) return undefined;
  
    const updatedData = { ...existingAppointment, ...data };
    const appointmentTime = new Date(updatedData.appointment_time);
    const createTime = new Date(updatedData.create_time);
  
    await db.run(
      `UPDATE appointment SET patientName = ?, doctorName = ?, appointment_time = ?, reason = ?, status = ?, create_time = ? WHERE id = ?`,
      updatedData.patientName,
      updatedData.doctorName,
      appointmentTime.toISOString(),
      updatedData.reason,
      updatedData.status,
      createTime.toISOString(),
      id
    );
  
    return {
      ...updatedData,
      appointment_time: appointmentTime,
      create_time: createTime
    };
  }
  

  static async updateStatus(id: number, status: string): Promise<Appointment | undefined> {
    const db = await connectDB();
    const existingAppointment = await this.getById(id);
    if (!existingAppointment) return undefined;
    await db.run(
      `UPDATE appointment SET status = ? WHERE id = ?`,
      status,
      id
    );
    return { ...existingAppointment, status };
  }
}