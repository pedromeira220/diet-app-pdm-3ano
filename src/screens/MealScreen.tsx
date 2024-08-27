import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../theme/colors";
import { getStatusBarHeight } from "react-native-iphone-screen-helper";
import { MealContext } from "../contexts/meals-context";
import { format } from "date-fns";

export const MealScreen: React.FC = () => {
  const {getMealById, deleteMealById} = useContext(MealContext)

  const navigation = useNavigation() as any
  const routes = useRoute() as any
  const mealId = routes.params?.mealId
  const currentPageMeal = !!mealId ? getMealById(mealId) : null

  return (
    <View style={{
      backgroundColor: currentPageMeal?.isOnDiet ? colors.green.light : colors.red.light,
      flex: 1
    }}>
      <View style={{
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: getStatusBarHeight() + 16,
        paddingHorizontal: 24
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
          }}>Detalhes refeição</Text>
        </View>


      </View>

      {
        !currentPageMeal ? (
          <View>
            <Text>Erro, refeição não encontrada</Text>
          </View>
        ) : (
          <View style={{
            backgroundColor: colors.white,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 40
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 8
            }}>{currentPageMeal?.name}</Text>
            <Text>{currentPageMeal?.description}</Text>
    
            <Text style={{
              fontSize: 14,
              fontWeight: 600,
              marginTop: 24
            }}>Data e hora</Text>
            <Text>{format(currentPageMeal?.dateTime, "dd/MM/yyyy")} às {format(currentPageMeal?.dateTime, "HH:mm")}</Text>
    
            <View style={{
              marginTop: 24,
              backgroundColor: colors.gray[600],
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 9999,
              alignSelf: 'flex-start',
              flexDirection: "row",
              alignItems: "center"
            }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: currentPageMeal?.isOnDiet ? colors.green.dark : colors.red.dark,
                marginRight: 8
              }}/>
              <Text>{currentPageMeal?.isOnDiet ? "dentro da dieta" : "fora da dieta"}</Text>
            </View>
    
            <TouchableOpacity style={styles.deleteButton} onPress={() => {
              deleteMealById(mealId)
              navigation.navigate("Home")
            }}>
                <Text style={styles.deleteButtonText}>Deletar refeição</Text>
                </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: colors.gray[200],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: "auto",
    marginBottom: 32
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})