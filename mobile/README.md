# Risky Business Mobile

Мобильное приложение для игры "Risky Business" - интерактивной игры типа "Правда или действие" для компаний.

## Технологии

- **React Native** с **Expo SDK 54**
- **TypeScript** (строгий режим)
- **React Navigation** для навигации
- **React Query** для управления состоянием и кэширования
- **Expo Linear Gradient** для эффектов

## Архитектура

```
src/
├── screens/           # Экраны приложения
│   ├── home-screen/
│   ├── add-players-screen/
│   ├── scenario-select-screen/
│   └── game-screen/
├── components/        # Переиспользуемые компоненты
├── types/            # TypeScript типы
├── constants/        # Константы и конфигурация
├── api/             # API клиенты
├── hooks/           # Кастомные хуки
└── utils/           # Утилиты
```

## Запуск

```bash
# Установка зависимостей
pnpm install

# Запуск dev server
pnpm start

# Запуск на Android
pnpm run android

# Запуск на iOS
pnpm run ios

# Запуск в браузере
pnpm run web
```

## Функциональность

### Реализовано:
- ✅ Главный экран с навигацией
- ✅ Добавление игроков (2-8 человек)
- ✅ Выбор сценария игры
- ✅ Игровой процесс с карточками
- ✅ Glassmorphism UI дизайн
- ✅ TypeScript типизация

### Планируется:
- 🔄 Интеграция с backend API
- 🔄 Сохранение истории игр
- 🔄 Кастомные сценарии
- 🔄 Мультиплеер через WebSocket

## Дизайн

Приложение использует современный дизайн в стиле glassmorphism с:
- Темной цветовой схемой
- Полупрозрачными элементами
- Градиентными фонами
- Плавными анимациями

## Конфигурация

- **Minimum players**: 2
- **Maximum players**: 8
- **Default rounds**: 10
- **Theme**: Dark mode only