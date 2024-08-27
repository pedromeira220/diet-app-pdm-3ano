import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from "react-native";
import { MealContext } from "../contexts/meals-context";

export const HomeScreen: React.FC = () => {
  const { height, width } = Dimensions.get('window');

  const {meals, getPercentOfMealsInDiet} = useContext(MealContext)

  const navigation = useNavigation() as any

  // Lista de refeições disponíveis
  // const meals = ["Café da Manhã", "Almoço", "Jantar", "Lanche da Tarde", "Lanche da Manhã", "Ceia", "Sobremesa"];

  // Lista de horários possíveis
  const times = ["08:00", "12:00", "18:00", "15:00", "10:00", "21:00", "22:00"];

  // Função para embaralhar a lista
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Função para gerar os próximos 7 dias com refeições e horários aleatórios
  const generateNext7DaysWithMealsAndTimes = () => {
    let days = [];
    let shuffledMeals = shuffleArray([...meals]); // Embaralha as refeições
    let shuffledTimes = shuffleArray([...times]); // Embaralha os horários

    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i); // Incrementa o dia
      let formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });

      days.push({
        date: formattedDate,
        meal: shuffledMeals[i % shuffledMeals.length], // Associa a refeição embaralhada ao dia
        time: shuffledTimes[i % shuffledTimes.length] // Associa o horário embaralhado ao dia
      });
    }
    return days;
  };

  // Gera a lista de datas com refeições e horários
  const daysWithMealsAndTimes = generateNext7DaysWithMealsAndTimes();

  return (
    <View style={styles.container}>
      <View style={styles.garfo}>
        <Image 
        source={require('../assets/garfo.webp')} // Certifique-se de que o caminho esteja correto
        style={styles.image}
        />
        <Text style={styles.image}>Daily Diet</Text>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.comida}>Refeições</Text>
        <TouchableOpacity
          style={styles.comidaButton}
          
          onPress={() => navigation.navigate('CreateMeal')}
        >
          <Text style={styles.comidaButtonText}>+Nova Refeição</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dateContainer} onPress={() => {
              navigation.navigate("Meal", {
                mealId: item.id
              })
            }}>
              <Text style={styles.dateText}>{item.dateTime.toISOString()}</Text>
              <Text style={styles.mealText}>{item.name}</Text>
              <Text style={styles.timeText}>{item.dateTime.toISOString()}</Text>
  
              <View 
                style={{
                  width: 2,
                  height: 14,
                  backgroundColor: "#F3BABD",
                  borderRadius: 99999
                }}
              />

            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100, // Defina a largura desejada
    height: 100, // Defina a altura desejada
    resizeMode: 'contain', // Pode usar 'cover', 'contain', etc.
    marginBottom: 10,
    color: 'black',
    fontSize: 0.05 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
    flexDirection: 'row'
  },
  comida: {
    fontSize: 0.07 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
    fontWeight: 'bold',
    color: 'gray',
  },
  comidaButton: {
    backgroundColor: 'gray',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    marginTop: '5%',
  },
  comidaButtonText: {
    color: 'white',
    fontSize: 0.05 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
  },
  listContainer: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#fff',
  },
  dateContainer: {
    marginBottom: '5%',
    padding: '5%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 0.06 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  mealText: {
    fontSize: 0.05 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
    color: 'black',
  },
  timeText: {
    fontSize: 0.04 * Dimensions.get('window').width, // Responsivo ao tamanho da tela
    color: 'gray',
  },
});

export default HomeScreen;