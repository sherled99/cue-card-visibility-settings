# Angular Trigger List Component

A sophisticated Angular component for managing triggers and their synonyms in cue card applications. This component provides a complete solution for creating, editing, and managing triggers with associated synonyms through an intuitive user interface.

## 🚀 Features

- **Trigger Management**: Create, view, and delete triggers
- **Synonym Management**: Add and remove synonyms for each trigger
- **Real-time Updates**: Dynamic UI updates with immediate feedback
- **Keyboard Navigation**: Full keyboard support with Enter key functionality
- **Error Handling**: Comprehensive error handling and validation
- **Responsive Design**: Mobile-friendly interface
- **Service Integration**: Seamless backend integration with configurable service calls

## 📦 Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

```bash
git clone https://github.com/sherled99/angular-trigger-list.git
cd angular-trigger-list
npm install
```

## 🛠️ Development

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 🎯 Usage

### Basic Component Usage

```typescript
<cuecard-trigger 
  [baseUrl]="'your-api-base-url'"
  [cueCardId]="currentCueCardId"
  [serviceHelper]="yourServiceHelper">
</cuecard-trigger>
```

### Component Inputs

| Input | Type | Description |
|-------|------|-------------|
| `baseUrl` | string | Base URL for API calls |
| `cueCardId` | any | ID of the current cue card |
| `serviceHelper` | any | Service helper for making API calls |

## 🏗️ Component Structure

### Main Component
- **File**: `src/app/angular-trigger-list/angular-trigger-list.component.ts`
- **Selector**: `cuecard-trigger`
- **Responsibilities**: 
  - Trigger and synonym lifecycle management
  - API communication
  - User input handling
  - State management

### Data Models

```typescript
interface Trigger {
  id: string;
  title: string;
  synonyms: Synonym[];
  note: string;
  newSynonym: string;
  newSynonymConfirmed: boolean;
}

interface Synonym {
  id: string;
  name: string;
}
```

## 🔧 API Integration

The component expects the following API endpoints:

### GetTriggersTable
- **Purpose**: Fetch all triggers with their synonyms
- **Parameters**: `{ cueCardId: string }`
- **Response**: Array of trigger objects

### CreateTrigger
- **Purpose**: Create a new trigger
- **Parameters**: `{ cueCardId: string, triggerName: string }`
- **Response**: `{ CreateTriggerResult: { Id: string, Text: string, Synonyms: Array } }`

### DeleteTrigger
- **Purpose**: Delete an existing trigger
- **Parameters**: `{ cueCardId: string, triggerId: string }`
- **Response**: `{ DeleteTriggerResult: { success: boolean } }`

### AddSynonym
- **Purpose**: Add a synonym to a trigger
- **Parameters**: `{ triggerId: string, synonymText: string }`
- **Response**: `{ AddSynonymResult: { Id: string } }`

### RemoveSynonym
- **Purpose**: Remove a synonym from a trigger
- **Parameters**: `{ synonymId: string }`
- **Response**: `{ RemoveSynonymResult: { success: boolean } }`

## 🎨 Styling

The component includes comprehensive SCSS styling with:
- Clean, modern design
- Responsive layout
- Interactive hover effects
- Form validation styling
- Accessibility considerations

## ⌨️ Keyboard Shortcuts

- **Enter**: Add new trigger or synonym (when focused on respective input)
- **Tab**: Navigate between input fields
- **Escape**: Clear input fields (can be extended)

## 🐛 Error Handling

The component includes robust error handling for:
- Invalid API responses
- Network failures
- Duplicate entries
- Empty input validation
- Missing trigger references

## 🔄 State Management

- Automatic UI updates when data changes
- Optimistic updates for better UX
- Rollback on API failures
- Real-time synchronization with backend

## 📁 Project Structure

```
src/app/angular-trigger-list/
├── angular-trigger-list.component.ts    # Main component logic
├── angular-trigger-list.component.html  # Template
└── angular-trigger-list.component.scss  # Styles
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Projects

- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Documentation](https://angular.io/docs)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

*Built with ❤️ using Angular*

---

# Angular Trigger List Component (Русская версия)

Продвинутый Angular компонент для управления триггерами и их синонимами в приложениях с карточками-подсказками. Этот компонент предоставляет полное решение для создания, редактирования и управления триггерами с соответствующими синонимами через интуитивный пользовательский интерфейс.

## 🚀 Возможности

- **Управление триггерами**: Создание, просмотр и удаление триггеров
- **Управление синонимами**: Добавление и удаление синонимов для каждого триггера
- **Обновления в реальном времени**: Динамические обновления UI с мгновенной обратной связью
- **Навигация с клавиатуры**: Полная поддержка клавиатуры с функциональностью клавиши Enter
- **Обработка ошибок**: Комплексная обработка ошибок и валидация
- **Адаптивный дизайн**: Дружественный к мобильным устройствам интерфейс
- **Интеграция с сервисами**: Бесшовная интеграция с бэкендом через настраиваемые вызовы сервисов

## 📦 Установка

Этот проект был создан с помощью [Angular CLI](https://github.com/angular/angular-cli) версии 16.1.4.

```bash
git clone https://github.com/sherled99/angular-trigger-list.git
cd angular-trigger-list
npm install
```

## 🛠️ Разработка

### Сервер разработки

Выполните `ng serve` для запуска сервера разработки. Перейдите на `http://localhost:4200/`. Приложение автоматически перезагрузится при изменении исходных файлов.

### Сборка

Выполните `ng build` для сборки проекта. Артефакты сборки будут сохранены в директории `dist/`.

### Запуск тестов

Выполните `ng test` для запуска модульных тестов через [Karma](https://karma-runner.github.io).

## 🎯 Использование

### Базовое использование компонента

```typescript
<cuecard-trigger 
  [baseUrl]="'your-api-base-url'"
  [cueCardId]="currentCueCardId"
  [serviceHelper]="yourServiceHelper">
</cuecard-trigger>
```

### Входные параметры компонента

| Параметр | Тип | Описание |
|----------|-----|----------|
| `baseUrl` | string | Базовый URL для API вызовов |
| `cueCardId` | any | ID текущей карточки-подсказки |
| `serviceHelper` | any | Помощник сервиса для выполнения API вызовов |

## 🏗️ Структура компонента

### Основной компонент
- **Файл**: `src/app/angular-trigger-list/angular-trigger-list.component.ts`
- **Селектор**: `cuecard-trigger`
- **Обязанности**: 
  - Управление жизненным циклом триггеров и синонимов
  - Связь с API
  - Обработка пользовательского ввода
  - Управление состоянием

### Модели данных

```typescript
interface Trigger {
  id: string;
  title: string;
  synonyms: Synonym[];
  note: string;
  newSynonym: string;
  newSynonymConfirmed: boolean;
}

interface Synonym {
  id: string;
  name: string;
}
```

## 🔧 Интеграция с API

Компонент ожидает следующие API эндпоинты:

### GetTriggersTable
- **Назначение**: Получение всех триггеров с их синонимами
- **Параметры**: `{ cueCardId: string }`
- **Ответ**: Массив объектов триггеров

### CreateTrigger
- **Назначение**: Создание нового триггера
- **Параметры**: `{ cueCardId: string, triggerName: string }`
- **Ответ**: `{ CreateTriggerResult: { Id: string, Text: string, Synonyms: Array } }`

### DeleteTrigger
- **Назначение**: Удаление существующего триггера
- **Параметры**: `{ cueCardId: string, triggerId: string }`
- **Ответ**: `{ DeleteTriggerResult: { success: boolean } }`

### AddSynonym
- **Назначение**: Добавление синонима к триггеру
- **Параметры**: `{ triggerId: string, synonymText: string }`
- **Ответ**: `{ AddSynonymResult: { Id: string } }`

### RemoveSynonym
- **Назначение**: Удаление синонима из триггера
- **Параметры**: `{ synonymId: string }`
- **Ответ**: `{ RemoveSynonymResult: { success: boolean } }`

## 🎨 Стилизация

Компонент включает комплексную SCSS стилизацию с:
- Чистым, современным дизайном
- Адаптивным макетом
- Интерактивными эффектами при наведении
- Стилизацией валидации форм
- Соображениями доступности

## ⌨️ Горячие клавиши

- **Enter**: Добавить новый триггер или синоним (при фокусе на соответствующем поле ввода)
- **Tab**: Навигация между полями ввода
- **Escape**: Очистка полей ввода (может быть расширено)

## 🐛 Обработка ошибок

Компонент включает надежную обработку ошибок для:
- Недействительных ответов API
- Сбоев сети
- Дублирующихся записей
- Валидации пустого ввода
- Отсутствующих ссылок на триггеры

## 🔄 Управление состоянием

- Автоматические обновления UI при изменении данных
- Оптимистичные обновления для лучшего UX
- Откат при сбоях API
- Синхронизация с бэкендом в реальном времени

## 📁 Структура проекта

```
src/app/angular-trigger-list/
├── angular-trigger-list.component.ts    # Основная логика компонента
├── angular-trigger-list.component.html  # Шаблон
└── angular-trigger-list.component.scss  # Стили
```

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте вашу ветку функциональности (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте ваши изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл LICENSE для деталей.

## 🔗 Связанные проекты

- [Angular CLI](https://github.com/angular/angular-cli)
- [Документация Angular](https://angular.io/docs)

## 📞 Поддержка

Для поддержки, пожалуйста, откройте issue в GitHub репозитории или свяжитесь с командой разработки.

---

*Создано с ❤️ используя Angular*
