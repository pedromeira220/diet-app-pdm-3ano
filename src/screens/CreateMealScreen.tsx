import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { MealContext } from '../contexts/meals-context';
import { useNavigation } from '@react-navigation/native';

export const CreateMealScreen = () => {
  const {addMealToList} = useContext(MealContext)

  const navigation = useNavigation()

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [dentroDieta, setDentroDieta] = useState<boolean | null>(null);

  const handleCadastro = () => {
    // Aqui você pode adicionar a lógica para cadastrar a refeição
    if(!dentroDieta)
      return

    addMealToList({
      name: nome,
      description: descricao,
      dateTime: new Date(),
      isOnDiet: dentroDieta
    })

    navigation.navigate("Home")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.descricao]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            value={hora}
            onChangeText={setHora}
          />
        </View>
      </View>

      <Text style={styles.label}>Está dentro da dieta?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.optionButton, dentroDieta === true && styles.selected]}
          onPress={() => setDentroDieta(true)}
        >
          <Text style={styles.optionText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, dentroDieta === false && styles.selected]}
          onPress={() => setDentroDieta(false)}
        >
          <Text style={styles.optionText}>Não</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastro}>
        <Text style={styles.cadastrarButtonText}>Cadastrar refeição</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  descricao: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  optionButton: {
    flex: 1,
    padding: 16,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#e0f7fa',
  },
  optionText: {
    fontSize: 16,
  },
  cadastrarButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});