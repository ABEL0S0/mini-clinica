import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AppointmentForm from './src/screens/AppointmentForm';
import AppointmentDetail from './src/screens/AppointmentDetail';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Citas" component={HomeScreen} />
        <Stack.Screen name="Formulario" component={AppointmentForm} />
        <Stack.Screen name="Detalles" component={AppointmentDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

