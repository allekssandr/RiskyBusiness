import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { RootStackParamList } from './src/types';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import AddPlayersScreen from './src/screens/add-players-screen/AddPlayersScreen';
import ScenarioSelectScreen from './src/screens/scenario-select-screen/ScenarioSelectScreen';
import GameScreen from './src/screens/game-screen/GameScreen';

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#0f0f23' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddPlayers" component={AddPlayersScreen} />
            <Stack.Screen name="ScenarioSelect" component={ScenarioSelectScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;