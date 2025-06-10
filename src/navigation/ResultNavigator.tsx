import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ResultStackParamList } from './ResultStackParamList';

import ResultScreen from '../views/Result/ResultScreen';
import CompareScreen from '../views/Compare/CompareScreen';
import BeforeAfterScreen from '../views/Compare/BeforeAfterScreen';
import EvolutionScreen from '../views/Evolution/EvolutionGraphScreen';

const Stack = createNativeStackNavigator<ResultStackParamList>();

const ResultNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Result"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Compare" component={CompareScreen} />
        <Stack.Screen name="BeforeAfter" component={BeforeAfterScreen}/>
        <Stack.Screen name="Evolution" component={EvolutionScreen}/>
      </Stack.Navigator>
    );
};

export default ResultNavigator;
