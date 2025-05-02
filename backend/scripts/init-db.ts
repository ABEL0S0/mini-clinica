import { connectDB } from '../src/config/db';

(async () => {
  const db = await connectDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS appointment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName VARCHAR(40),
      doctorName VARCHAR(40),
      appointment_time DATETIME,
      reason VARCHAR(100),
      status VARCHAR(20),
      create_time DATETIME
    )
  `);
  console.log('Database initialized');
})();
