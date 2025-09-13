## 1. Обзор
**Risky Business** — мобильное кроссплатформенное приложение (Expo / React Native), в котором игроки играют в «Правда или Действие».  
Ключевая особенность — интеграция LLM для генерации:
- вопросов и действий,
- психологических портретов игроков,
- сценариев (сеттингов игры).

При недоступности LLM используется fallback — локальная база вопросов/действий.

---

## 2. Архитектура системы
### Общая схема
```

Mobile App (Expo RN)
⬍
Backend API (Node.js + Express/NestJS)
⬍
Database (PostgreSQL) + Cache (Redis) + Media Storage (S3)
⬍
LLM Adapter Layer (Gemini → Local/OpenAPI)

```

---

## 3. Компоненты

### Mobile (Expo / React Native)
- UI/UX для создания игры, добавления игроков и выбора сценария.
- Экран генерации вопросов/действий.
- Fallback локальная база (JSON).
- Синхронизация состояния с backend.
- Хранение токена и настроек в AsyncStorage.

### Backend (Node.js + TypeScript)
- REST API (Express/NestJS).
- ORM: Prisma или TypeORM.
- Логика управления играми, игроками, сценариями и ходами.
- LLM Adapter (поддержка нескольких провайдеров).
- Кэширование результатов в Redis.
- Система безопасного фильтра контента (safe/18+).

### Database (PostgreSQL)
Основные сущности:
- **users** — игроки/хосты,
- **games** — сессии игр,
- **players** — участники игры,
- **player_profiles** — психологические профили,
- **scenarios** — сеттинги (с описанием и тоном),
- **generated_items** — вопросы/действия/сценарии от LLM,
- **turns** — история ходов.

### Redis
- Кэш LLM-ответов (по hash prompt).
- Блокировки для синхронного вызова генерации.

### LLM Adapter
- Единый интерфейс `generate(params)`:
  - вход: описание игрока + сценарий + тип (truth/dare),
  - выход: JSON с вопросом/действием.
- Реализации:
  - **GeminiAdapter** (MVP),
  - **LocalAdapter** (self-hosted модели, позже),
  - **FallbackAdapter** (локальные данные).

---

## 4. API (основное)
- `POST /games` — создать игру.  
- `POST /games/:id/players` — добавить игрока.  
- `POST /games/:id/start` — запустить игру.  
- `POST /games/:id/next` — получить вопрос/действие для игрока.  
- `POST /turns/:id/submit` — отправить результат хода.  
- `GET /scenarios` — список сценариев.  
- `POST /profiles/generate` — генерация профиля игрока.

---

## 5. Data Flow (ход игры)
1. Игрок создаёт игру и добавляет участников.  
2. Выбирается сценарий (или генерируется ИИ).  
3. Игрок делает ход → клиент вызывает `POST /games/:id/next`.  
4. Backend:
   - собирает контекст (профиль + сценарий),
   - обращается к LLM (или fallback),
   - сохраняет результат,
   - возвращает игроку.  
5. Игрок выполняет задание → `POST /turns/:id/submit`.  
6. Ход переходит следующему игроку.  

---

## 6. Хранение данных (ERD кратко)
```

users ─┬─< games >─┬─ players >─┬─ player\_profiles
│            │            │
│            └─ scenarios ┘
│
└─ generated\_items >─ turns

```

---

## 7. Dev Workflow
- Monorepo: `/mobile` (Expo) и `/server` (Node).  
- Docker Compose: Postgres + Redis + MinIO (локальный S3).  
- Mobile запускается через Expo Go.  
- Backend через `ts-node-dev`/`nodemon`.  
- LLMAdapter сначала мокается → потом Gemini API → потом локальные модели.

---

## 8. Безопасность и контент
- Проверка возраста (18+ сценарии).  
- Фильтр нежелательного контента (profanity list + safety метки).  
- Минимум PII (имена/аватары).  
- Удаление данных по запросу (GDPR-friendly).  

---

## 9. Планы развития
- MVP: Gemini API + локальный fallback.  
- V2: Локальная LLM (например, Llama 3 через vLLM).  
- V3: Асинхронные сценарии (мини-истории с выбором).  
- V4: Онлайн-мультиплеер (WebSocket).  

---

## 10. Технологический стек
**Frontend:** Expo, React Native, React Navigation, React Query.  
**Backend:** Node.js, Express/NestJS, TypeScript, Prisma.  
**DB:** PostgreSQL.  
**Cache:** Redis.  
**Storage:** AWS S3 (или DigitalOcean Spaces).  
**LLM:** Gemini API (MVP), Local (позже).  
**CI/CD:** GitHub Actions + Expo EAS.  

---
```

---