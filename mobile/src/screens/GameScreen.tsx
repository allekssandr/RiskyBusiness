import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  AddPlayers: undefined;
  ScenarioSelect: undefined;
  Game: { scenarioId: string };
};

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
}

export default function GameScreen({ navigation, route }: Props) {
  const { scenarioId } = route.params;
  const [currentPlayer] = useState('Player 1');
  const [currentQuestion] = useState('What is your biggest fear?');

  const handleTruth = () => {
    // Handle truth response
  };

  const handleDare = () => {
    // Handle dare response
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.playerName}>{currentPlayer}'s Turn</Text>
        
        <BlurView intensity={20} style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion}</Text>
        </BlurView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.truthButton} onPress={handleTruth}>
            <BlurView intensity={20} style={styles.buttonBlur}>
              <Text style={styles.buttonText}>Truth</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dareButton} onPress={handleDare}>
            <BlurView intensity={20} style={styles.buttonBlur}>
              <Text style={styles.buttonText}>Dare</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  questionCard: {
    padding: 30,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 150,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  truthButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  dareButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonBlur: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
