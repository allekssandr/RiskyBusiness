# Устранение ошибки TypeScript в Docker контейнере

## Проблема
Ошибка TS5083: Cannot read file '/tsconfig.json' при запуске сервера в Docker контейнере.

## Анализ проблемы

### Первый параграф - структура проекта
Проект использует монорепозиторий с корневым `tsconfig.json` и отдельными конфигурациями для `mobile` и `server`. В `server/tsconfig.json` есть `"extends": "../tsconfig.json"`, что означает зависимость от корневого файла. Docker контейнер запускается из папки `/app`, но ts-node ищет `tsconfig.json` в корне контейнера.

### Второй параграф - Docker конфигурация
В `docker-compose.dev.yml` видно, что `tsconfig.json` монтируется как volume: `./server/tsconfig.json:/app/tsconfig.json`. Это означает, что в контейнере должен быть файл `/app/tsconfig.json`, но ts-node все равно не может его найти. Проблема может быть в том, что ts-node запускается из рабочей директории `/app`, но ищет конфигурацию относительно текущего процесса.

### Третий параграф - возможные причины
Ошибка TS5083 "Cannot read file '/tsconfig.json'" указывает на абсолютный путь. Это может происходить из-за неправильной настройки ts-node или конфликта между корневым tsconfig.json и server/tsconfig.json. Также возможно, что Docker volume не монтируется корректно или есть проблемы с правами доступа к файлу в контейнере.

## Решение

Проблема была решена в несколько этапов:

### 1. Исправлена конфигурация tsconfig.json
- Убрал `"extends": "../tsconfig.json"` из `server/tsconfig.json`
- Сделал его самостоятельным файлом конфигурации

### 2. Заменил path mapping импорты
- Заменил все `@/` импорты на относительные пути `../`
- Обновил импорты в файлах:
  - `server/src/index.ts`
  - `server/src/routes/gameRoutes.ts`
  - `server/src/routes/playerRoutes.ts`
  - `server/src/routes/scenarioRoutes.ts`
  - `server/src/controllers/gameController.ts`
  - `server/src/controllers/playerController.ts`
  - `server/src/controllers/scenarioController.ts`

### 3. Понизил версию uuid
- Изменил версию с `^13.0.0` на `^9.0.1` в `package.json`
- Версия 13 является ES модулем, что конфликтует с CommonJS

### 4. Исправил Prisma схему
- Добавил обратную связь `generatedItems GeneratedItem[]` в модель `PlayerProfile`
- Исправил ошибку валидации схемы

### 5. Сгенерировал Prisma клиент
- Выполнил `npx prisma generate` в контейнере
- Создал необходимые файлы клиента

## Результат
Сервер успешно запускается и отвечает на health check запросы:
```
🚀 Server running on port 3000
📱 Health check: http://localhost:3000/health
```

## Команды для проверки
```bash
# Проверка health check
curl http://localhost:3000/health

# Просмотр логов
docker-compose -f ../docker-compose.dev.yml logs server-dev --tail=10
```
