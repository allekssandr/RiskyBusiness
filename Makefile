# Risky Business - Makefile для быстрого запуска

.PHONY: help setup dev dev-mobile dev-server build clean docker-up docker-down docker-logs db-setup db-reset

# Показать справку
help:
	@echo "Risky Business - Доступные команды:"
	@echo ""
	@echo "  setup        - Установка всех зависимостей"
	@echo "  dev          - Запуск в режиме разработки (mobile + server)"
	@echo "  dev-mobile   - Запуск только мобильного приложения"
	@echo "  dev-server   - Запуск только сервера"
	@echo "  build        - Сборка всех компонентов"
	@echo "  clean        - Очистка node_modules и build файлов"
	@echo ""
	@echo "Docker команды:"
	@echo "  docker-up    - Запуск Docker сервисов (Postgres, Redis, MinIO)"
	@echo "  docker-down  - Остановка Docker сервисов"
	@echo "  docker-logs  - Просмотр логов Docker сервисов"
	@echo ""
	@echo "База данных:"
	@echo "  db-setup     - Настройка базы данных"
	@echo "  db-reset     - Сброс базы данных"

# Установка зависимостей
setup:
	@echo "📦 Установка зависимостей..."
	pnpm install
	cd server && pnpm install
	cd ../mobile && pnpm install
	@echo "✅ Зависимости установлены"

# Запуск в режиме разработки
dev:
	@echo "🚀 Запуск в режиме разработки..."
	pnpm run dev

# Запуск мобильного приложения
dev-mobile:
	@echo "📱 Запуск мобильного приложения..."
	cd mobile && pnpm start

# Запуск сервера
dev-server:
	@echo "🖥️ Запуск сервера..."
	cd server && pnpm run dev

# Сборка
build:
	@echo "🔨 Сборка проекта..."
	pnpm run build

# Очистка
clean:
	@echo "🧹 Очистка..."
	rm -rf node_modules
	rm -rf server/node_modules
	rm -rf mobile/node_modules
	rm -rf server/dist
	rm -rf mobile/.expo
	@echo "✅ Очистка завершена"

# Docker команды
docker-up:
	@echo "🐳 Запуск Docker сервисов..."
	docker-compose up -d
	@echo "✅ Сервисы запущены:"
	@echo "   PostgreSQL: localhost:5432"
	@echo "   Redis: localhost:6379"
	@echo "   MinIO: localhost:9000 (API), localhost:9001 (Console)"

docker-down:
	@echo "🛑 Остановка Docker сервисов..."
	docker-compose down

docker-logs:
	@echo "📋 Логи Docker сервисов..."
	docker-compose logs -f

# Настройка базы данных
db-setup:
	@echo "🗄️ Настройка базы данных..."
	cd server && pnpm run db:generate
	cd server && pnpm run db:push
	@echo "✅ База данных настроена"

# Сброс базы данных
db-reset:
	@echo "🔄 Сброс базы данных..."
	docker-compose down -v
	docker-compose up -d postgres
	sleep 10
	cd server && pnpm run db:generate
	cd server && pnpm run db:push
	@echo "✅ База данных сброшена"

# Полная настройка проекта
init: setup docker-up db-setup
	@echo "🎉 Проект готов к разработке!"
	@echo ""
	@echo "Следующие шаги:"
	@echo "1. Скопируйте server/env.example в server/.env"
	@echo "2. Настройте переменные окружения"
	@echo "3. Запустите: make dev"
