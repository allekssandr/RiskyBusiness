import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  AddPlayers: undefined;
  ScenarioSelect: undefined;
  Game: undefined;
};

type AddPlayersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddPlayers'>;

interface Props {
  navigation: AddPlayersScreenNavigationProp;
}

interface Player {
  id: string;
  name: string;
}

export default function AddPlayersScreen({ navigation }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');

  const addPlayer = () => {
    if (playerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: playerName.trim(),
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const startGame = () => {
    if (players.length >= 2) {
      navigation.navigate('ScenarioSelect');
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Add Players</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Player name"
            placeholderTextColor="#999"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={addPlayer}
          />
          <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BlurView intensity={20} style={styles.playerItem}>
              <Text style={styles.playerName}>{item.name}</Text>
              <TouchableOpacity onPress={() => removePlayer(item.id)}>
                <Text style={styles.removeButton}>×</Text>
              </TouchableOpacity>
            </BlurView>
          )}
          style={styles.playersList}
        />

        <TouchableOpacity
          style={[styles.startButton, players.length < 2 && styles.startButtonDisabled]}
          onPress={startGame}
          disabled={players.length < 2}
        >
          <BlurView intensity={20} style={styles.buttonBlur}>
            <Text style={styles.startButtonText}>
              Start Game ({players.length} players)
            </Text>
          </BlurView>
        </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  playersList: {
    flex: 1,
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    color: '#ff4444',
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  buttonBlur: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
