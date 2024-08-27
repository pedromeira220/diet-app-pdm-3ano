import React, { createContext, ReactNode, useState } from "react";
import { Meal } from "../interfaces/meal";

type MealContextType = {
  addMealToList: (meal: Meal) => void
  meals: Meal[]
  getPercentOfMealsInDiet: () => number
  getMealById: (id: string) => Meal | null
  deleteMealById: (id: string) => void
  getMealsBestSequence: () => number
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
    setMeals(state => [meal, ...state])
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

  const getMealsBestSequence = () => {
    let bestSequenceCount = 0;
    let currentCount = 0;
    let previousDayWasOnDiet = true;
    const sortedMealsByMealDate = meals.sort(
      (a, b) => a.dateTime.getTime() - b.dateTime.getTime(),
    );

    sortedMealsByMealDate.forEach((meal) => {
      if (meal.isOnDiet) {
        currentCount = currentCount + 1;

        if (previousDayWasOnDiet) {
          if (currentCount > bestSequenceCount) {
            bestSequenceCount = currentCount;
          }
        }

        previousDayWasOnDiet = true;
      } else {
        currentCount = 0;

        previousDayWasOnDiet = false;
      }
    });

    if (currentCount > bestSequenceCount) {
      bestSequenceCount = currentCount;
    }

    return bestSequenceCount;
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
    <MealContext.Provider value={{
        addMealToList, 
        meals, 
        getPercentOfMealsInDiet, 
        getMealById,
        deleteMealById,
        getMealsBestSequence
      }}>
      {children}
    </MealContext.Provider>
  )
}