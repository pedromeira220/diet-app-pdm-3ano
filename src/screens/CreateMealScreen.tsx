import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MealContext } from '../contexts/meals-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import AntDesign from '@expo/vector-icons/AntDesign';

export const CreateMealScreen = () => {
  const { addMealToList } = useContext(MealContext)

  const navigation = useNavigation() as any

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [dentroDieta, setDentroDieta] = useState<boolean | null>(null);
  const [isRegisterCompleteModalShow, setIsRegisterCompleteModalShow] = useState(false)

  const handleCadastro = () => {
    console.log(
      {
        name: nome,
        description: descricao,
        dateTime: new Date(),
        isOnDiet: dentroDieta
      }
    );

    if (dentroDieta == null || !nome || !descricao) {
      console.log("dados invalidos");
      return
    }

    addMealToList({
      name: nome,
      description: descricao,
      dateTime: new Date(),
      isOnDiet: dentroDieta,
      id: String(new Date().getTime())
    })

    setIsRegisterCompleteModalShow(true)

  };

  return (
    <>
      {
        isRegisterCompleteModalShow ? (
          <View style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 32
          }}>
            <Text style={{
              marginBottom: 8,
              color: dentroDieta ? colors.green.dark : colors.red.dark,
              fontSize: 24,
              fontWeight: 600
            }}>{
                dentroDieta ? "Continue assim!" : "Que pena!"
              }</Text>
            <Text style={{
              textAlign: "center"
            }}>
              {
                dentroDieta ? "Você continua dentro da dieta. Muito bem!" : "Você saiu da dieta dessa vez, mas continue se esforçando e não desista!"
              }
            </Text>

            <TouchableOpacity style={{
              backgroundColor: colors.gray[200],
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 32
            }} onPress={() => {
              navigation.navigate("Home")
              setIsRegisterCompleteModalShow(false)
            }}>
              <Text style={styles.cadastrarButtonText}>Ir para página inicial</Text>
            </TouchableOpacity>
          </View>
        ) :
          (
            <View style={styles.container}>
              <View style={{
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
              }}>
                <TouchableOpacity onPress={() => {
                  navigation.goBack()
                }}>
                  <AntDesign name="left" size={24} color={colors.gray[200]} />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18
                  }}>Nova refeição</Text>
                </View>
              </View>

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

              <Text style={styles.label}>Está dentro da dieta?</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.optionButton, dentroDieta === true && styles.selectedTrue]}
                  onPress={() => setDentroDieta(true)}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: colors.green.dark,
                      borderRadius: 9999,
                      marginRight: 8
                    }}
                  />
                  <Text style={styles.optionText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionButton, dentroDieta === false && styles.selectedFalse]}
                  onPress={() => setDentroDieta(false)}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: colors.red.dark,
                      borderRadius: 9999,
                      marginRight: 8
                    }}
                  />
                  <Text style={styles.optionText}>Não</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastro}>
                <Text style={styles.cadastrarButtonText}>Cadastrar refeição</Text>
              </TouchableOpacity>
            </View>
          )
      }
    </>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight() + 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold"
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
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.gray[600],
    borderWidth: 1,
    borderColor: colors.gray[600]
  },
  selectedTrue: {
    backgroundColor: colors.green.light,
    borderWidth: 1,
    borderColor: colors.green.dark
  },
  selectedFalse: {
    backgroundColor: colors.red.light,
    borderWidth: 1,
    borderColor: colors.red.dark
  },
  optionText: {
    fontSize: 16,
  },
  cadastrarButton: {
    backgroundColor: colors.gray[200],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: "auto",
    marginBottom: 32
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});