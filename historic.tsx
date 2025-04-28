import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Historico() {
  const route = useRoute<any>();
  const { historico } = route.params as { historico: string[] };

  return (
    <View style={styles.container}>
      <FlatList
        data={historico}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          // Extrai até a primeira quebra de linha e remove espaços em branco
          const titulo = item.split('\n')[0].trim();
          return (
            <View style={styles.item}>
              <Text style={styles.text}>{`Receita ${index + 1}: ${titulo}`}</Text>
            </View>
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
