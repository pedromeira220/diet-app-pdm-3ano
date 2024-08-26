import React, { createContext, ReactNode, useState } from "react";
import { Meal } from "../interfaces/meal";

type MealContextType = {
  addMealToList: (meal: Meal) => void
  meals: Meal[]
  getPercentOfMealsInDiet: () => number
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

  return (
    <MealContext.Provider value={{addMealToList, meals, getPercentOfMealsInDiet}}>
      {children}
    </MealContext.Provider>
  )
}