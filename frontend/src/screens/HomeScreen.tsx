import React, { useEffect, useState } from 'react';
import {  FlatList,  Text,  View,  Alert,  Button,  TouchableOpacity,  StyleSheet, Platform,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAppointments, deleteAppointment } from '../api/appointmentApi';
import { Appointment } from '../types/Appointment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function HomeScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Error al cargar las citas:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const intervalId = setInterval(() => {
      fetchAppointments();
    }, 1000);
  
    return () => clearInterval(intervalId);  
  }, []);
  
  const handleDelete = (id: number) => {
    console.log('Eliminando cita con ID:', id);
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
      if (confirmed) {
        deleteAppointment(id)
          .then(() => {
            console.log('Cita eliminada');
            fetchAppointments();
          })
          .catch((err) => {
            console.error('Error al eliminar:', err);
            alert('Error: No se pudo eliminar la cita');
          });
      }
    } else {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que deseas eliminar esta cita?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteAppointment(id);
                console.log('Cita eliminada');
                fetchAppointments();
              } catch (err) {
                console.error('Error al eliminar:', err);
                Alert.alert('Error', 'No se pudo eliminar la cita');
              }
            },
          },
        ]
      );
    }
  };
  

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
  console.log('Citas actuales:', appointments);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Citas Médicas</Text>
      <Button title="➕ Nueva Cita" onPress={() => navigation.navigate('Formulario')} />
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              Cita #{item.id}
            </Text>
            <Text style={styles.subtitle}>
              Paciente: {item.patientName}
            </Text>
            <Text style={styles.subtitle}>
              Doctor: {item.doctorName}
            </Text>
            <Text style={styles.subtitle}>
              Motivo: {item.reason}
            </Text>
            <Text style={styles.subtitle}>
              Fecha de la cita: {new Date(item.appointment_time).toLocaleString()}
            </Text>
            <View style={styles.statusRow}>
              {renderStatusBadge(item.status)}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() => navigation.navigate('Detalles', { id: item.id })}
              >
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate('Formulario', { appointment: item })}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 10,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  detailBtn: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  editBtn: {
    backgroundColor: '#17a2b8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});