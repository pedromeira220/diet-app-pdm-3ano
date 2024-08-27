import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MealContext } from "../contexts/meals-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

export const StatisticsScreen: React.FC = () => {
  const { meals, getPercentOfMealsInDiet, getMealsBestSequence} = useContext(MealContext);

  const navigation = useNavigation()

  const percentOfMealsInDiet = getPercentOfMealsInDiet();
  const mealsBestSequeceCount = getMealsBestSequence()

  return (
    <View style={styles.container}>

      <TouchableOpacity style={{
        marginBottom: 16
      }} onPress={() => {
        navigation.goBack()
      }}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <View style={[styles.statistic, {
           backgroundColor: percentOfMealsInDiet >= 0.5 ? colors.green.light : colors.red.light,
      }]}>
        <Text style={styles.statsText}>Percentagem dentro da dieta</Text>
        <Text style={[styles.statsValue, {
              color:  percentOfMealsInDiet >= 0.5 ? colors.green.dark : colors.red.dark,
        }]}>{(percentOfMealsInDiet * 100).toFixed(2)}%</Text>
      </View>

      <View style={[styles.statistic, {
           backgroundColor: colors.gray[600]
      }]}>
        <Text style={styles.statsText}>Melhor sequência</Text>
        <Text style={[styles.statsValue, {
              color: "#000"
        }]}>{mealsBestSequeceCount}</Text>
      </View>

      <View style={[styles.statistic, {
           backgroundColor: colors.gray[600]
      }]}>
        <Text style={styles.statsText}>Quantidade de refeições</Text>
        <Text style={[styles.statsValue, {
              color: "#000"
        }]}>{meals.length}</Text>
      </View>

      <View style={styles.mealsList}>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealItem}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealDescription}>{meal.description}</Text>
            <Text style={styles.mealDateTime}>{meal.dateTime.toString()}</Text>
            <Text style={styles.mealDietStatus}>
              {percentOfMealsInDiet >= 0.5 ? "Dentro da dieta" : "Fora da dieta"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  statistic: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  mealsList: {
    marginTop: 20,
  },
  mealItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mealDescription: {
    fontSize: 14,
    color: "#555",
  },
  mealDateTime: {
    fontSize: 12,
    color: "#888",
  },
  mealDietStatus: {
    fontSize: 14,
    color: "#00796b",
    marginTop: 5,
  },
});

export default StatisticsScreen;