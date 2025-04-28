// nav.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';       // sua Home screen
import Historico from './historic'; // sua Historic screen

// defina aqui as rotas e seus parâmetros
export type RootStackParamList = {
    Home: undefined;
    Historico: { historico: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Nav() {
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
