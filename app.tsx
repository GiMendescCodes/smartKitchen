import React from 'react';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';
import Historico from './historic';
import ReceitaDetalhada from './ReceitaDetalhada';
import Favoritos from './Favoritos';

export type RootStackParamList = {
  Home: undefined;
  Historico: { historico: string[] };
  ReceitaDetalhada: { receita: string };
  Favoritos: { favoritos: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Cozinha Fácil' }}
        />
        <Stack.Screen
          name="Historico"
          component={Historico}
          options={{ title: 'Histórico de Receitas' }}
        />
        <Stack.Screen
          name="ReceitaDetalhada"
          component={ReceitaDetalhada}
          options={{ title: 'Receita Detalhada' }}
        />
        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={{ title: 'Receitas Favoritas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
