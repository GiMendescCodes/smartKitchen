import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

export default function Historico() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { historico } = route.params as { historico: string[] };

  return (
    <View style={styles.container}>
      <FlatList
        data={historico}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const titulo = item.split('\n')[0].trim();
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('ReceitaDetalhada', { receita: item })}
            >
              <Text style={styles.text}>{`Receita ${index + 1}: ${titulo}`}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  text: {
    fontSize: 16,
  },
});
