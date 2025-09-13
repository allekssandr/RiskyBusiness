# Risky Business

**Risky Business** — это монорепозиторий, содержащий мобильное приложение "Правда или Действие" с интеграцией LLM для генерации вопросов и действий, серверную часть и общие компоненты.

## 🏗️ Архитектура

```
Mobile App (Expo RN) ← Backend API (Node.js) ← Database (PostgreSQL) + Cache (Redis) + Storage (MinIO)
```

## 📁 Структура монорепозитория

Монорепозиторий организован следующим образом:

```
risky-business/
├── mobile/                 # Мобильное приложение (Expo + React Native)
│   ├── src/
│   │   ├── screens/        # Экраны приложения
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── AddPlayersScreen.tsx
│   │   │   ├── ScenarioSelectScreen.tsx
│   │   │   └── GameScreen.tsx
│   │   ├── components/     # Переиспользуемые компоненты
│   │   ├── hooks/          # Кастомные хуки
│   │   ├── api/            # API клиент
│   │   └── types/          # TypeScript типы
│   ├── App.tsx             # Главный компонент приложения
│   ├── app.json            # Конфигурация Expo
│   ├── babel.config.js     # Конфигурация Babel
│   └── package.json
├── server/                 # Серверная часть (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/    # Логика обработки запросов
│   │   │   ├── gameController.ts
│   │   │   ├── playerController.ts
│   │   │   └── scenarioController.ts
│   │   ├── services/       # Бизнес-логика приложения
│   │   ├── routes/         # Определения маршрутов API
│   │   │   ├── gameRoutes.ts
│   │   │   ├── playerRoutes.ts
│   │   │   └── scenarioRoutes.ts
│   │   ├── middlewares/    # Middleware для обработки запросов
│   │   ├── types/          # Общие типы и интерфейсы
│   │   └── config/         # Конфигурация (БД, Redis, MinIO)
│   ├── prisma/             # Prisma ORM
│   │   └── schema.prisma   # Схема базы данных
│   ├── Dockerfile          # Docker конфигурация для production
│   ├── Dockerfile.dev      # Docker конфигурация для разработки
│   └── package.json
├── docs/                   # Документация проекта
│   └── Architecture.md     # Архитектурная документация
├── scripts/                # Скрипты для автоматизации задач
├── docker-compose.yml      # Docker сервисы (Postgres, Redis, MinIO)
├── docker-compose.dev.yml  # Docker конфигурация для разработки
├── Makefile               # Быстрые команды для разработки
├── .eslintrc.js           # Конфигурация ESLint
├── .prettierrc            # Конфигурация Prettier
├── tsconfig.json          # TypeScript конфигурация
├── .gitignore             # Игнорирование файлов
└── package.json           # Корневой package.json (workspace)
```

### Компоненты монорепозитория

- **/mobile**: Мобильное приложение, разработанное с использованием [Expo](https://expo.dev/) и [React Native](https://reactnative.dev/)
- **/server**: Серверная часть, построенная на [Node.js](https://nodejs.org/) с использованием [TypeScript](https://www.typescriptlang.org/)
- **/docs**: Документация проекта
- **/scripts**: Скрипты для автоматизации задач

## 🚀 Быстрый старт

### Предварительные требования

- [Node.js](https://nodejs.org/) версии 18 или выше
- [npm](https://www.npmjs.com/) 9+ или [Yarn](https://yarnpkg.com/) для управления зависимостями
- [Docker](https://www.docker.com/) и [Docker Compose](https://docs.docker.com/compose/) для контейнеризации
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`pnpm install -g @expo/cli`)

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/risky-business.git
cd risky-business
```

### 2. Установка зависимостей

```bash
# Установка всех зависимостей (корень, mobile, server)
pnpm run setup

# Или вручную:
pnpm install
cd mobile && pnpm install
cd ../server && pnpm install
```

### 3. Настройка окружения

```bash
# Скопируйте пример конфигурации
cp server/env.example server/.env

# Отредактируйте переменные окружения
nano server/.env
```

### 4. Запуск проекта с использованием Docker Compose

```bash
# Запуск всех сервисов (PostgreSQL, Redis, MinIO)
docker-compose up -d

# Или для разработки с hot-reload
docker-compose -f docker-compose.dev.yml up -d
```

### 5. Настройка базы данных

```bash
cd server
pnpm run db:generate
pnpm run db:push
```

### 6. Запуск приложений

```bash
# В отдельных терминалах:

# Backend (порт 3000)
pnpm run dev:server

# Mobile (Expo)
pnpm run dev:mobile

# Или запуск всего сразу
pnpm run dev
```

## 📱 Мобильное приложение

### Запуск

```bash
cd mobile
pnpm start
```

### Сборка

```bash
# Android
pnpm run build:android

# iOS
pnpm run build:ios
```

## 🖥️ Backend API

### Запуск

```bash
cd server
pnpm run dev
```

### API Endpoints

- `GET /health` - Проверка здоровья сервера
- `POST /api/games` - Создание игры
- `GET /api/games/:id` - Получение игры
- `POST /api/games/:id/players` - Добавление игрока
- `POST /api/games/:id/start` - Запуск игры
- `POST /api/games/:id/next` - Следующий ход
- `GET /api/scenarios` - Список сценариев

### База данных

```bash
# Генерация Prisma клиента
pnpm run db:generate

# Применение миграций
pnpm run db:migrate

# Prisma Studio (GUI для БД)
pnpm run db:studio
```

## 🐳 Docker

### Основные сервисы

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

### Сервисы

- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
- **MinIO**: `localhost:9000` (API), `localhost:9001` (Console)

## 🛠️ Разработка

### Линтинг и форматирование

```bash
# Проверка кода
pnpm run lint

# Автоисправление
pnpm run lint:fix

# Форматирование
pnpm run format
```

### Тестирование

```bash
# Запуск тестов
pnpm run test

# Тесты в watch режиме
pnpm run test:watch
```

## 📊 Мониторинг

### Health Checks

- Backend: `http://localhost:3000/health`
- MinIO Console: `http://localhost:9001`
- Prisma Studio: `http://localhost:5555` (после `pnpm run db:studio`)

### Логи

```bash
# Все сервисы
pnpm run docker:logs

# Конкретный сервис
docker-compose logs -f postgres
```

## 🔧 Конфигурация

### Переменные окружения (server/.env)

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/risky_business"

# Redis
REDIS_URL="redis://localhost:6379"

# MinIO
MINIO_ENDPOINT="localhost"
MINIO_PORT="9000"
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"

# Server
PORT="3000"
NODE_ENV="development"

# LLM
GEMINI_API_KEY="your-gemini-api-key"
```

## 🎯 Функциональность

### Игровой процесс

1. **Создание игры** - Хост создаёт игру и выбирает сценарий
2. **Добавление игроков** - Участники присоединяются к игре
3. **Генерация контента** - LLM создаёт вопросы/действия на основе профилей игроков
4. **Выполнение ходов** - Игроки выбирают "Правда" или "Действие"
5. **Завершение** - Игра завершается по условиям

### Сценарии

- **Classic** - Классические вопросы и действия
- **Party** - Весёлые вопросы для вечеринок
- **Deep** - Глубокие личные вопросы
- **Wild** - 18+ контент (только для взрослых)

## 🚀 Деплой

### Production сборка

```bash
# Сборка всех компонентов
pnpm run build

# Запуск в production
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Документация

Подробная документация доступна в директории `/docs`:
- [Architecture.md](./docs/Architecture.md) - Архитектурная документация проекта

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта. Пожалуйста, ознакомьтесь с [CONTRIBUTING.md](./CONTRIBUTING.md) для получения информации о том, как внести свой вклад.

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под лицензией MIT. См. файл [LICENSE](./LICENSE) для получения подробной информации.

## 📞 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории.
