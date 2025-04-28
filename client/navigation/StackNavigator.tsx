
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PlacesList } from '../src/widget/places-list/PlacesList'; // Экран списка мест
import { PlaceDetails } from '../src/pages/placeDetails/PlaceDetails'; // Экран подробностей места
import { RootStackParamList } from './types'; // Импорт типов навигации

const Stack = createStackNavigator<RootStackParamList>(); // Указываем тип для StackNavigator

export function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlacesList">
        <Stack.Screen name="PlacesList" component={PlacesList} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
