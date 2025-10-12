## Study Buddy

A comprehensive study and productivity app with Pomodoro timer, task management, flashcards, and ambient sounds.

### Features

#### Dashboard
- Quick timer overview
- Daily progress statistics
- Quick task addition
- Sticky note launcher

#### Pomodoro Timer
- Customizable work/break durations
- Visual countdown display
- Auto-switching between work and break sessions
- Focus time tracking

#### Task Manager
- Add, complete, and delete tasks
- Task completion statistics
- Real-time progress tracking

#### Flashcards
- Create custom flashcard decks
- Flip cards to reveal answers
- Navigate through card library
- Track cards reviewed

#### Focus Sounds
- Ambient background sounds
- Individual volume controls
- Master volume with mute

#### Sticky Notes
- Draggable floating notes
- 5 color options
- Stay on top of all content
- Persistent positioning

#### Settings
- Light/Dark theme
- Font family selection (System, Serif, Monospace)
- Background styles: Gradient, Solid Color, Custom Image
- Background color picker
- Custom image URL support
- Card opacity adjustment
- Settings persist across sessions

### Tech Stack
- HTML5/CSS3
- JavaScript (ES6 Classes)
- CSS Variables for theming
- LocalStorage API
- Drag and Drop API

### File Structure
```
StudyBuddy/
├── index.html
├── style.css
├── app.js
└── audio
```

### Default Settings
- Work session: 25 minutes
- Break session: 5 minutes
- Theme: Light
- Font: System default
- Background: Blue to white gradient
- Card opacity: 95%

### Keyboard Shortcuts
- `Enter`: Add task/flashcard after typing
- Click anywhere on flashcard to flip

### Customization

#### Background Options
1. **Gradient** (default): Smooth color transition
2. **Solid Color**: Single color background
3. **Custom Image**: Use any image URL

#### Font Options
- System Default: -apple-system, BlinkMacSystemFont, Segoe UI
- Serif: Georgia, Times New Roman
- Monospace: Courier New, Consolas

### Browser Support
All projects require a modern browser with support for:
- ES6 JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- Canvas API
- Web Audio API (Study Buddy)
- getUserMedia API (Hamster Face)

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
