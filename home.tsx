import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from './App';

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GEMINI = process.env.EXPO_PUBLIC_GEMINI_KEY!;

const genAI = new GoogleGenerativeAI(KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const generationConfig = {
  temperature: 1, topP: 0.95, topK: 64,
  maxOutputTokens: 500, responseMimeType: 'text/plain',
};

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [load, setLoad] = useState(false);
  const [receita, setReceita] = useState('');
  const [ingr1, setIngr1] = useState('');
  const [ingr2, setIngr2] = useState('');
  const [ingr3, setIngr3] = useState('');
  const [ingr4, setIngr4] = useState('');
  const [ocasiao, setOcasiao] = useState('');
  const [historico, setHistorico] = useState<string[]>([]);

  async function gerarReceita() {
    if (!ingr1 || !ingr2 || !ingr3 || !ingr4 || !ocasiao) {
      Alert.alert('Atenção', 'Informe todos os ingredientes!', [{ text: 'Beleza!' }]);
      return;
    }
    setReceita('');
    setLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma receita detalhada para o ${ocasiao} usando os ingredientes: ${ingr1}, ${ingr2}, ${ingr3} e ${ingr4} e pesquise a receita no YouTube. Caso encontre, informe o link.`;
    try {
      const chatSession = model.startChat({ generationConfig, history: [] });
      const result = await chatSession.sendMessage(prompt);
      const novaReceita = result.response.text();
      setReceita(novaReceita);
      setHistorico((prev) => [...prev, novaReceita]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  }

  function irParaHistorico() {
  
    navigation.navigate('Historico', { historico });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#F1F1F1" />
      <View style={styles.form}>
        <Text style={styles.label}>Insira os ingredientes abaixo:</Text>
        {['ingr1','ingr2','ingr3','ingr4'].map((_, i) => (
          <TextInput
            key={i}
            placeholder={`Ingrediente ${i+1}`}
            style={styles.input}
            onChangeText={(t) => [setIngr1, setIngr2, setIngr3, setIngr4][i](t)}
            value={[ingr1,ingr2,ingr3,ingr4][i]}
          />
        ))}
        <TextInput
          placeholder="Refeição?"
          style={styles.input}
          onChangeText={setOcasiao}
          value={ocasiao}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={gerarReceita}>
        <Text style={styles.buttonText}>Gerar receita</Text>
        <MaterialCommunityIcons name="food-variant" size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'green', marginTop: 8 }]}
        onPress={irParaHistorico}
      >
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>

      <ScrollView style={styles.containerScroll} contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}>
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Produzindo receita...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        {receita ? (
          <View style={styles.content}>
            <Text style={styles.title}>Sua receita 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: alturaStatusBar! + 10, backgroundColor: '#FFF', paddingHorizontal: 16,
  },
  form: { marginVertical: 16 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  input: {
    height: 48, borderColor: '#CCC', borderWidth: 1,
    borderRadius: 8, paddingLeft: 12, marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF6347', paddingVertical: 12,
    borderRadius: 8, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 16, marginRight: 8 },
  containerScroll: { flex: 1 },
  content: { marginTop: 16, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});
