// App.tsx
import React from 'react';
import 'react-native-url-polyfill/auto';                // polyfill de URL
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';       // sua tela de geração de receitas
import Historico from './historic'; // sua tela de histórico

export type RootStackParamList = {
    Home: undefined;
    Historico: { historico: string[] };
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
