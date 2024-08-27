import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from "react-native";
import { MealContext } from "../contexts/meals-context";
import { getStatusBarHeight } from "react-native-iphone-screen-helper";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import Feather from '@expo/vector-icons/Feather';
import { format } from "date-fns";

export const HomeScreen: React.FC = () => {
  const { height, width } = Dimensions.get('window');

  const { meals, getPercentOfMealsInDiet } = useContext(MealContext)

  const navigation = useNavigation() as any

  const percentOfMealsInDiet = useMemo(() => {
    return getPercentOfMealsInDiet()
  }, [meals])

  return (
    <View style={styles.container}>
      <View style={{
        marginTop: getStatusBarHeight() + 16,
        paddingHorizontal: 24
      }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
      </View>

      {
        meals.length != 0 ? (
          <TouchableOpacity style={{
            backgroundColor: percentOfMealsInDiet >= 0.5 ? colors.green.light : colors.red.light,
            marginHorizontal: 24,
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 20,
            marginTop: 16
          }} onPress={() => {
            navigation.navigate("Statistics")
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: 600,
              marginBottom: 2
            }}>{(percentOfMealsInDiet * 100).toFixed(2)}%</Text>
            <Text>das refeições dentro da dieta</Text>

            <Feather name="arrow-up-right" size={24} color={percentOfMealsInDiet >= 0.5 ? colors.green.dark : colors.red.dark} style={{
              position: "absolute",
              top: 8,
              right: 8
            }} />
          </TouchableOpacity>
        ) : null
      }



      <View style={styles.header}>
        <Button onPress={() => {
          navigation.navigate("CreateMeal")
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
          }}>Nova refeição</Text>
        </Button>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={meals}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{
              borderWidth: 1,
              borderRadius: 6,
              flexDirection: "row",
              alignItems: 'center',
              padding: 16,
              borderColor: "#DDDEDF",
              justifyContent: "space-between",
              marginTop: index == 0 ? 0 : 12
            }} onPress={() => {
              navigation.navigate("Meal", {
                mealId: item.id
              })
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 500
                }}>{format(item?.dateTime, "dd/MM/yyyy")} - {format(item?.dateTime, "HH:mm")}</Text>
                <View
                  style={{
                    width: 2,
                    height: 14,
                    backgroundColor: "#DDDEDF",
                    marginHorizontal: 12
                  }}
                />

                <Text style={{
                  fontSize: 16
                }}>{item.name}</Text>
              </View>

              <View
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: item.isOnDiet ? colors.green.mid : colors.red.mid,
                  borderRadius: 9999
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
    backgroundColor: colors.white
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 82,
    height: 37,
    resizeMode: 'contain',
    marginBottom: 10,
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
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  listItemContainer: {
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