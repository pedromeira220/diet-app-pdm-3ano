import React, { createContext, ReactNode, useState } from "react";
import { Meal } from "../interfaces/meal";

type MealContextType = {
  addMealToList: (meal: Meal) => void
  meals: Meal[]
  getPercentOfMealsInDiet: () => number
  getMealById: (id: string) => Meal | null
  deleteMealById: (id: string) => void
}

export const MealContext = createContext({} as MealContextType)

type MealContextProviderProps = {
  children: ReactNode
}

export const MealContextProvider: React.FC<MealContextProviderProps> = ({children}) => {

  const [meals, setMeals] = useState<Meal[]>([])
  
  /*
    [
      {
        name: "X tudo"
        description: "x tudo"
        dateTime: Date
        isOnDiet: false  
      },
      {
        name: "Whey"
        description: "x tudo"
        dateTime: Date
        isOnDiet: true  
      },
      {
        name: "Whey"
        description: "x tudo"
        dateTime: Date
        isOnDiet: true  
      },
    ]
  
  */

  const addMealToList = (meal: Meal) => {
    setMeals(state => [...state, meal])
  }

  const getPercentOfMealsInDiet = () => {
    const totalOfMeal = meals.length
    let totalOfMealInDiet = 0

    meals.forEach((meal) => {
      if(meal.isOnDiet) {
        totalOfMealInDiet++
      }
    })

    return totalOfMealInDiet / totalOfMeal // 0.66
    
  }

  const getMealById = (id: string): Meal | null=> {
    const mealFound = meals.find(meal => meal.id === id)

    if(!mealFound) {
      return null
    }

    return mealFound
  }

  const deleteMealById = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  return (
    <MealContext.Provider value={{addMealToList, meals, getPercentOfMealsInDiet, getMealById, deleteMealById}}>
      {children}
    </MealContext.Provider>
  )
}