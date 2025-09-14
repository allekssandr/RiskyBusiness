import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomeScreen from './src/screens/HomeScreen';
import AddPlayersScreen from './src/screens/AddPlayersScreen';
import ScenarioSelectScreen from './src/screens/ScenarioSelectScreen';
import GameScreen from './src/screens/GameScreen';

type RootStackParamList = {
  Home: undefined;
  AddPlayers: undefined;
  ScenarioSelect: undefined;
  Game: { scenarioId: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Risky Business' }}
          />
          <Stack.Screen
            name="AddPlayers"
            component={AddPlayersScreen}
            options={{ title: 'Add Players' }}
          />
          <Stack.Screen
            name="ScenarioSelect"
            component={ScenarioSelectScreen}
            options={{ title: 'Select Scenario' }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: 'Game' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
