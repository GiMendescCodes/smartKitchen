// Favoritos.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Favoritos() {
  const route = useRoute<any>();
  const { favoritos } = route.params as { favoritos: string[] };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const titulo = item.split('\n')[0].trim();
          return (
            <View style={styles.item}>
              <Text style={styles.text}>{`Favorito ${index + 1}: ${titulo}`}</Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma receita favoritada ainda.</Text>
        }
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
  empty: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#888',
  },
});
