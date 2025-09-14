import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import type { RootStackParamList, Player } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, GLASSMORPHISM, GAME_CONFIG } from '../../constants';

type AddPlayersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddPlayers'>;

interface AddPlayersScreenProps {
  navigation: AddPlayersScreenNavigationProp;
}

const AddPlayersScreen: React.FC<AddPlayersScreenProps> = ({ navigation }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');

  const addPlayer = (): void => {
    if (!playerName.trim()) {
      Alert.alert('Ошибка', 'Введите имя игрока');
      return;
    }

    if (players.length >= GAME_CONFIG.maxPlayers) {
      Alert.alert('Ошибка', `Максимум ${GAME_CONFIG.maxPlayers} игроков`);
      return;
    }

    if (players.some(p => p.name.toLowerCase() === playerName.toLowerCase().trim())) {
      Alert.alert('Ошибка', 'Игрок с таким именем уже добавлен');
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerName.trim(),
    };

    setPlayers(prev => [...prev, newPlayer]);
    setPlayerName('');
  };

  const removePlayer = (playerId: string): void => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const handleContinue = (): void => {
    if (players.length < GAME_CONFIG.minPlayers) {
      Alert.alert('Ошибка', `Минимум ${GAME_CONFIG.minPlayers} игрока`);
      return;
    }

    navigation.navigate('ScenarioSelect', { players });
  };

  const renderPlayer = ({ item }: { item: Player }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removePlayer(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.primary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Добавить игроков</Text>
          <Text style={styles.subtitle}>
            От {GAME_CONFIG.minPlayers} до {GAME_CONFIG.maxPlayers} игроков
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Имя игрока"
              placeholderTextColor={COLORS.textSecondary}
              maxLength={20}
              returnKeyType="done"
              onSubmitEditing={addPlayer}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addPlayer}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.playersContainer}>
            <Text style={styles.playersTitle}>
              Игроки ({players.length})
            </Text>
            <FlatList
              data={players}
              renderItem={renderPlayer}
              keyExtractor={item => item.id}
              style={styles.playersList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Добавьте игроков для начала игры
                </Text>
              }
            />
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.continueButton,
                players.length < GAME_CONFIG.minPlayers && styles.disabledButton,
              ]}
              onPress={handleContinue}
              disabled={players.length < GAME_CONFIG.minPlayers}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Продолжить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  input: {
    ...GLASSMORPHISM,
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
  },
  addButton: {
    ...GLASSMORPHISM,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  addButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  playersContainer: {
    flex: 1,
    marginBottom: SPACING.lg,
  },
  playersTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  playersList: {
    flex: 1,
  },
  playerItem: {
    ...GLASSMORPHISM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  playerName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    flex: 1,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  backButton: {
    ...GLASSMORPHISM,
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  continueButton: {
    ...GLASSMORPHISM,
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  continueButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
  },
});

export default AddPlayersScreen;