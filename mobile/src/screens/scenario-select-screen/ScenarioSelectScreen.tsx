import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import type { RootStackParamList, GameScenario } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, GLASSMORPHISM } from '../../constants';

type ScenarioSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScenarioSelect'>;
type ScenarioSelectScreenRouteProp = RouteProp<RootStackParamList, 'ScenarioSelect'>;

interface ScenarioSelectScreenProps {
  navigation: ScenarioSelectScreenNavigationProp;
  route: ScenarioSelectScreenRouteProp;
}

const mockScenarios: GameScenario[] = [
  {
    id: '1',
    title: 'Классическая правда или действие',
    description: 'Традиционная игра с вопросами и заданиями для веселой компании',
    difficulty: 'easy',
    estimatedTime: 30,
    minPlayers: 2,
    maxPlayers: 8,
  },
  {
    id: '2',
    title: 'Откровенные признания',
    description: 'Игра для близких друзей с более личными вопросами',
    difficulty: 'medium',
    estimatedTime: 45,
    minPlayers: 3,
    maxPlayers: 6,
  },
  {
    id: '3',
    title: 'Экстремальные вызовы',
    description: 'Для самых смелых! Сложные задания и каверзные вопросы',
    difficulty: 'hard',
    estimatedTime: 60,
    minPlayers: 4,
    maxPlayers: 8,
  },
];

const getDifficultyColor = (difficulty: GameScenario['difficulty']): string => {
  switch (difficulty) {
    case 'easy':
      return COLORS.success;
    case 'medium':
      return COLORS.warning;
    case 'hard':
      return COLORS.error;
    default:
      return COLORS.textSecondary;
  }
};

const getDifficultyText = (difficulty: GameScenario['difficulty']): string => {
  switch (difficulty) {
    case 'easy':
      return 'Легко';
    case 'medium':
      return 'Средне';
    case 'hard':
      return 'Сложно';
    default:
      return '';
  }
};

const ScenarioSelectScreen: React.FC<ScenarioSelectScreenProps> = ({
  navigation,
  route,
}) => {
  const { players } = route.params;

  const handleSelectScenario = (scenario: GameScenario): void => {
    if (players.length < scenario.minPlayers || players.length > scenario.maxPlayers) {
      return;
    }

    navigation.navigate('Game', { players, scenario });
  };

  const renderScenario = ({ item }: { item: GameScenario }) => {
    const isAvailable = players.length >= item.minPlayers && players.length <= item.maxPlayers;

    return (
      <TouchableOpacity
        style={[styles.scenarioCard, !isAvailable && styles.disabledCard]}
        onPress={() => handleSelectScenario(item)}
        disabled={!isAvailable}
        activeOpacity={0.8}
      >
        <View style={styles.scenarioHeader}>
          <Text style={styles.scenarioTitle}>{item.title}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>
              {getDifficultyText(item.difficulty)}
            </Text>
          </View>
        </View>

        <Text style={styles.scenarioDescription}>{item.description}</Text>

        <View style={styles.scenarioInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Время:</Text>
            <Text style={styles.infoValue}>{item.estimatedTime} мин</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Игроки:</Text>
            <Text style={styles.infoValue}>
              {item.minPlayers}-{item.maxPlayers}
            </Text>
          </View>
        </View>

        {!isAvailable && (
          <Text style={styles.unavailableText}>
            Недоступно для {players.length} игроков
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.secondary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Выбор сценария</Text>
          <Text style={styles.subtitle}>
            Игроков: {players.length}
          </Text>

          <FlatList
            data={mockScenarios}
            renderItem={renderScenario}
            keyExtractor={item => item.id}
            style={styles.scenariosList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scenariosContainer}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
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
  scenariosList: {
    flex: 1,
  },
  scenariosContainer: {
    paddingBottom: SPACING.lg,
  },
  scenarioCard: {
    ...GLASSMORPHISM,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  disabledCard: {
    opacity: 0.5,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  scenarioTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.md,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  scenarioDescription: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  scenarioInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
  },
  unavailableText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
  backButton: {
    ...GLASSMORPHISM,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: SPACING.md,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
});

export default ScenarioSelectScreen;