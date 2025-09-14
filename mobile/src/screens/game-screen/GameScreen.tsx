import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import type { RootStackParamList, GameAction } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, GLASSMORPHISM } from '../../constants';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
}

const mockActions: GameAction[] = [
  {
    id: '1',
    type: 'question',
    content: 'Какой самый странный сон тебе снился?',
    difficulty: 'easy',
    category: 'personal',
  },
  {
    id: '2',
    type: 'dare',
    content: 'Станцуй танец робота 30 секунд',
    difficulty: 'medium',
    category: 'action',
  },
  {
    id: '3',
    type: 'question',
    content: 'О чем ты врал родителям в детстве?',
    difficulty: 'medium',
    category: 'secrets',
  },
  {
    id: '4',
    type: 'dare',
    content: 'Покажи свою самую смешную фотографию',
    difficulty: 'easy',
    category: 'social',
  },
];

const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { players, scenario } = route.params;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentAction, setCurrentAction] = useState<GameAction | null>(null);
  const [round, setRound] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentPlayer = players[currentPlayerIndex];

  const getRandomAction = (): GameAction => {
    return mockActions[Math.floor(Math.random() * mockActions.length)];
  };

  const handleDrawCard = (): void => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentAction(getRandomAction());
  };

  const handleNextPlayer = (): void => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    if (nextPlayerIndex === 0) {
      setRound(prev => prev + 1);
    }
    
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentAction(null);
  };

  const handleEndGame = (): void => {
    navigation.navigate('Home');
  };

  const getActionTypeText = (type: GameAction['type']): string => {
    switch (type) {
      case 'question':
        return 'Правда';
      case 'dare':
        return 'Действие';
      case 'choice':
        return 'Выбор';
      default:
        return '';
    }
  };

  const getActionTypeColor = (type: GameAction['type']): string => {
    switch (type) {
      case 'question':
        return COLORS.primary;
      case 'dare':
        return COLORS.secondary;
      case 'choice':
        return COLORS.accent;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.primary, COLORS.secondary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.scenarioTitle}>{scenario.title}</Text>
            <Text style={styles.roundInfo}>Раунд {round}</Text>
          </View>

          <View style={styles.currentPlayerContainer}>
            <Text style={styles.currentPlayerLabel}>Ход игрока:</Text>
            <Text style={styles.currentPlayerName}>{currentPlayer.name}</Text>
          </View>

          <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
            {currentAction ? (
              <View style={styles.actionCard}>
                <View style={styles.actionHeader}>
                  <View style={[
                    styles.actionTypeBadge,
                    { backgroundColor: getActionTypeColor(currentAction.type) }
                  ]}>
                    <Text style={styles.actionTypeText}>
                      {getActionTypeText(currentAction.type)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.actionContent}>{currentAction.content}</Text>
              </View>
            ) : (
              <View style={styles.drawCardContainer}>
                <Text style={styles.drawCardText}>
                  {currentPlayer.name}, твой ход!
                </Text>
                <TouchableOpacity
                  style={styles.drawButton}
                  onPress={handleDrawCard}
                  activeOpacity={0.8}
                >
                  <Text style={styles.drawButtonText}>Вытянуть карту</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>

          <View style={styles.playersContainer}>
            <Text style={styles.playersTitle}>Игроки:</Text>
            <View style={styles.playersList}>
              {players.map((player, index) => (
                <View
                  key={player.id}
                  style={[
                    styles.playerItem,
                    index === currentPlayerIndex && styles.activePlayer,
                  ]}
                >
                  <Text
                    style={[
                      styles.playerName,
                      index === currentPlayerIndex && styles.activePlayerText,
                    ]}
                  >
                    {player.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.controlButtons}>
            {currentAction && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextPlayer}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Следующий игрок</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.endButton}
              onPress={handleEndGame}
              activeOpacity={0.7}
            >
              <Text style={styles.endButtonText}>Завершить игру</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  scenarioTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  roundInfo: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
  },
  currentPlayerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  currentPlayerLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  currentPlayerName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  actionCard: {
    ...GLASSMORPHISM,
    padding: SPACING.xl,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  actionHeader: {
    marginBottom: SPACING.lg,
  },
  actionTypeBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  actionTypeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  actionContent: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  drawCardContainer: {
    ...GLASSMORPHISM,
    padding: SPACING.xl,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  drawCardText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  drawButton: {
    ...GLASSMORPHISM,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  drawButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  playersContainer: {
    marginBottom: SPACING.lg,
  },
  playersTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  playersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  playerItem: {
    ...GLASSMORPHISM,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activePlayer: {
    backgroundColor: COLORS.primary,
  },
  playerName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  activePlayerText: {
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  controlButtons: {
    gap: SPACING.md,
  },
  nextButton: {
    ...GLASSMORPHISM,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.success,
  },
  nextButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  endButton: {
    ...GLASSMORPHISM,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  endButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
});

export default GameScreen;