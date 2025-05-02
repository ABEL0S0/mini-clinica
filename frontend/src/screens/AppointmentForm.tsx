import React, { useState } from 'react';
import { View, TextInput, Button, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createAppointment, updateAppointment } from '../api/appointmentApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import 'react-datepicker/dist/react-datepicker.css';

let DatePickerWeb: any = null;
if (Platform.OS === 'web') {
  DatePickerWeb = require('react-datepicker').default;
}

export default function AppointmentForm() {
  const route = useRoute<any>();
  const editing = !!route.params?.appointment;
  const nav = useNavigation();

  const [patientName, setPatientName] = useState(route.params?.appointment?.patientName || '');
  const [doctorName, setDoctorName] = useState(route.params?.appointment?.doctorName || '');
  const [appointmentTime, setAppointmentTime] = useState(
    route.params?.appointment ? new Date(route.params.appointment.appointment_time) : new Date()
  );
  const [reason, setReason] = useState(route.params?.appointment?.reason || '');
  const [status, setStatus] = useState<'pendiente' | 'confirmada' | 'cancelada'>(
    route.params?.appointment?.status || 'pendiente'
  );
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const submit = async () => {
    const payload = {
      patientName,
      doctorName,
      appointment_time: appointmentTime.toISOString(),
      reason,
      status,
      create_time: new Date().toISOString(),
    };

    try {
      if (editing) {
        await updateAppointment(route.params.appointment.id, payload);
      } else {
        await createAppointment(payload);
      }
      nav.goBack();
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0]?.msg || 'Error al enviar el formulario');
    }
  };

  return (
    <View style={{ padding: 20, gap: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{editing ? 'Editar Cita' : 'Nueva Cita'}</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Text>Paciente</Text>
      <TextInput
        value={patientName}
        onChangeText={setPatientName}
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
        placeholder="Nombre del paciente"
      />

      <Text>Doctor</Text>
      <TextInput
        value={doctorName}
        onChangeText={setDoctorName}
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
        placeholder="Nombre del doctor"
      />

      <Text>Motivo</Text>
      <TextInput
        value={reason}
        onChangeText={setReason}
        style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
        placeholder="Motivo de la cita"
      />

      <Text>Fecha y hora</Text>
      {Platform.OS === 'web' && DatePickerWeb ? (
        <DatePickerWeb
          selected={appointmentTime}
          onChange={(date: Date) => setAppointmentTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="custom-datepicker"
        />
      ) : (
        <>
          <Button title={appointmentTime.toLocaleString()} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={appointmentTime}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setAppointmentTime(selectedDate);
              }}
            />
          )}
        </>
      )}

      <Text>Estado</Text>
      <Picker selectedValue={status} onValueChange={(value) => setStatus(value)} style={{ borderWidth: 1 }}>
        <Picker.Item label="Pendiente" value="pendiente" />
        <Picker.Item label="Confirmada" value="confirmada" />
        <Picker.Item label="Cancelada" value="cancelada" />
      </Picker>

      <Button title={editing ? 'Actualizar' : 'Crear'} onPress={submit} />
    </View>
  );
}

