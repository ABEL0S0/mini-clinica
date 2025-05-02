import express from 'express';
import appointmentRoutes from './routes/appointment.routes';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
app.use(express.json());
app.use('/appointments', appointmentRoutes);

export default app;


