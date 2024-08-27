import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/HomeScreen";
import { CreateMealScreen } from "../screens/CreateMealScreen";
import { MealScreen } from "../screens/MealScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Meal" component={MealScreen} />
        <Stack.Screen name="CreateMeal" component={CreateMealScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}