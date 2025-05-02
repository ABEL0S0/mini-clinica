import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getAppointment } from '../api/appointmentApi';
import { Appointment } from '../types/Appointment';

export default function AppointmentDetail() {
  const route = useRoute<any>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    getAppointment(route.params.id).then(setAppointment);
  }, []);

  if (!appointment) return <Text style={styles.loadingText}>Cargando...</Text>;

  const renderStatusBadge = (status: string) => {
    let backgroundColor = '#ccc';
    if (status === 'pendiente') backgroundColor = '#ffc107';
    else if (status === 'confirmada') backgroundColor = '#28a745';
    else if (status === 'cancelada') backgroundColor = '#dc3545';

    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <Text style={styles.statusText}>{status.toUpperCase()}</Text>
      </View>
    );
  };
  console.log('create_time:', appointment.create_time);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la Cita</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>{appointment.patientName}</Text>

        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{appointment.doctorName}</Text>

        <Text style={styles.label}>Motivo:</Text>
        <Text style={styles.value}>{appointment.reason}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{new Date(appointment.appointment_time).toLocaleString()}</Text>

        <Text style={styles.label}>Estado:</Text>
        {renderStatusBadge(appointment.status)}

        <Text style={styles.label}>Creado el:</Text>
        <Text style={styles.value}>
          {appointment.create_time
            ? new Date(appointment.create_time).toLocaleString()
            : 'Fecha no disponible'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 8,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});