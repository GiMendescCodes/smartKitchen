import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

export default function ReceitaDetalhada() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { receita } = route.params;

  const [favoritos, setFavoritos] = useState<string[]>([]);

  function adicionarAosFavoritos() {
    if (!favoritos.includes(receita)) {
      setFavoritos((prev) => [...prev, receita]);
      Alert.alert('Sucesso', 'Receita adicionada aos favoritos!');
    } else {
      Alert.alert('Aviso', 'Essa receita já está nos favoritos.');
    }
  }

  function verFavoritos() {
    navigation.navigate('Favoritos', { favoritos });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Receita Detalhada</Text>
      <Text style={styles.texto}>{receita}</Text>

      <TouchableOpacity style={styles.button} onPress={adicionarAosFavoritos}>
        <Text style={styles.buttonText}>⭐ Adicionar aos Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={verFavoritos}>
        <Text style={styles.buttonText}>📂 Ver Favoritos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
