# Cue Card Visibility Settings Component

Angular component for managing cue card visibility rules through agent and queue filtering system.

## Features

- **Dynamic Data Loading**: Loads agents and queues from API endpoints
- **Real-time Synchronization**: Automatically syncs filter changes with backend
- **Intuitive UI**: Simple dropdown-based interface with visual filter tags
- **Selective Clearing**: Remove individual filters or clear by type (agents/queues)
- **Error Handling**: Displays loading states and error messages

## Component Overview

The `CueCardVisibilitySettingsComponent` provides a user interface for managing visibility rules for cue cards. Users can select agents and queues from dropdown lists, and the component automatically synchronizes these selections with the backend API.

## API Integration

The component integrates with the following API methods:

### Data Loading
- **GetUsers**: Retrieves available agents
- **GetQueues**: Retrieves available queues  
- **GetVisibilityRules**: Loads existing visibility rules on component initialization

### Data Updates
- **UpdateCueCardVisibilityRules**: Syncs filter changes to backend in real-time

## Usage

### Basic Implementation

```html
<cue-card-visibility-settings 
  [serviceHelper]="serviceHelper" 
  [cueCardId]="currentCueCardId">
</cue-card-visibility-settings>
```

### Required Inputs

- `serviceHelper`: Service helper instance for API communication
- `cueCardId`: Unique identifier for the cue card

### Service Helper Interface

The component expects a service helper with the following structure:

```typescript
interface ServiceHelper {
  callService(config: {
    serviceName: string;
    methodName: string;
    data: any;
    callback: (response: any) => void;
    scope: any;
  }): void;
}
```

## Data Structures

### Filter Item
```typescript
interface FilterItem {
  type: "agent" | "queue";
  value: string;        // Agent ID or Queue name
  displayName: string;  // Human-readable name
}
```

### API Response Formats

#### GetUsers Response
```json
{
  "GetUsersResult": {
    "success": true,
    "users": [
      {
        "ContactId": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
        "Name": "Supervisor"
      }
    ]
  }
}
```

#### GetQueues Response
```json
{
  "GetQueuesResult": {
    "success": true,
    "queues": [
      {
        "queue_id": "QUEUE.AD test 3",
        "name": "AD test 3"
      }
    ]
  }
}
```

#### GetVisibilityRules Response
```json
{
  "GetVisibilityRulesResult": [
    {
      "name": "Supervisor",
      "type": "agent", 
      "value": "410006e1-ca4e-4502-a9ec-e54d922d2c00"
    },
    {
      "name": "QUEUE.AD test 3",
      "type": "queue",
      "value": "QUEUE.AD test 3"
    }
  ]
}
```

## User Interface

### Layout
- **Vertical Layout**: Agent and queue sections stacked vertically
- **Dropdown Selects**: Simple select elements for choosing items
- **Filter Tags**: Visual representation of selected filters
- **Clear Buttons**: Individual and group clearing options

### Interactions
1. **Select Agent/Queue**: Choose from dropdown → automatically adds to filters
2. **Remove Individual Filter**: Click × on filter tag
3. **Clear Agent Filters**: Click × button in Agent section  
4. **Clear Queue Filters**: Click × button in Queue section

### Auto-Reset Behavior
After selecting an item from dropdown, the select automatically resets to placeholder state for additional selections.

## Development

### Project Structure
```
src/app/cue-card-visibility-settings/
├── cue-card-visibility-settings.component.ts     # Main component logic
├── cue-card-visibility-settings.component.html   # Template
└── cue-card-visibility-settings.component.scss   # Styles
```

### Building
```bash
npm run build
```

### Dependencies
- Angular (latest)
- FormsModule (for ngModel)

## Technical Details

### State Management
- `selectedFilters`: Main array containing all selected items
- `availableAgents`: Loaded agent list from API
- `availableQueues`: Loaded queue list from API
- Loading states and error handling

### API Communication
- Uses callback-based service helper pattern
- Automatic retry capability for failed requests
- Comprehensive error logging

### Performance
- Prevents duplicate filter additions
- Efficient filtering using Array methods
- Minimal DOM updates with Angular change detection

## Error Handling

The component handles various error scenarios:
- API service unavailability
- Network request failures  
- Invalid response formats
- Missing required inputs

Error messages are displayed in the UI and logged to console for debugging.

## Browser Support

Compatible with all modern browsers supporting Angular applications.
