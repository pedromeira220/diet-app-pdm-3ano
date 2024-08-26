import React from 'react';
import { AppNavigator } from './src/navigators';
import { MealContextProvider } from './src/contexts/meals-context';

export default function App() {
  return (
    <MealContextProvider>
      <AppNavigator />
    </MealContextProvider>
  );
}
