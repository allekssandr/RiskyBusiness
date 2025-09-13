import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  AddPlayers: undefined;
  ScenarioSelect: undefined;
  Game: undefined;
};

type ScenarioSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScenarioSelect'>;

interface Props {
  navigation: ScenarioSelectScreenNavigationProp;
}

const scenarios = [
  { id: '1', name: 'Classic', description: 'Traditional truth or dare' },
  { id: '2', name: 'Party', description: 'Fun party questions and dares' },
  { id: '3', name: 'Deep', description: 'Meaningful conversations' },
  { id: '4', name: 'Wild', description: '18+ content (adults only)' },
];

export default function ScenarioSelectScreen({ navigation }: Props) {
  const selectScenario = (scenarioId: string) => {
    navigation.navigate('Game', { scenarioId });
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Select Scenario</Text>
        <Text style={styles.subtitle}>Choose the type of game you want to play</Text>

        {scenarios.map(scenario => (
          <TouchableOpacity
            key={scenario.id}
            style={styles.scenarioButton}
            onPress={() => selectScenario(scenario.id)}
          >
            <BlurView intensity={20} style={styles.scenarioBlur}>
              <Text style={styles.scenarioName}>{scenario.name}</Text>
              <Text style={styles.scenarioDescription}>{scenario.description}</Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  scenarioButton: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  scenarioBlur: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scenarioName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#ccc',
  },
});
