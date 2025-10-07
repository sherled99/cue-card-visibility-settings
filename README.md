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
