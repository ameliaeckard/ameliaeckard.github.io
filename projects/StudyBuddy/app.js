class StudyBuddy {
    constructor() {
        this.settings = {
            theme: 'light',
            font: 'system',
            bgStyle: 'gradient',
            bgColor: '#4facfe',
            bgImage: '',
            cardOpacity: 95
        };
        
        this.timer = {
            minutes: 25,
            seconds: 0,
            isRunning: false,
            isWork: true,
            workTime: 25,
            breakTime: 5,
            interval: null,
            totalFocusMinutes: 0
        };
        
        this.tasks = [];
        this.taskId = 0;
        
        this.flashcards = [
            {id: 1, front: "What is HTML?", back: "HyperText Markup Language"},
            {id: 2, front: "CSS stands for?", back: "Cascading Style Sheets"}
        ];
        this.cardId = 3;
        this.currentCard = 0;
        this.showingFront = true;
        this.cardsReviewed = 0;
        
        this.sounds = [
            {name: "Ocean Waves", icon: "~", volume: 0},
            {name: "Rain", icon: "◦", volume: 0},
            {name: "Cafe Chatter", icon: "※", volume: 0}
        ];
        
        this.notes = [];
        this.noteId = 0;
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.applySettings();
        this.initClock();
        this.initTabs();
        this.initSettings();
        this.initTimer();
        this.initTasks();
        this.initFlashcards();
        this.initSounds();
        this.initNotes();
        this.updateDashboard();
    }
    
    loadSettings() {
        const saved = localStorage.getItem('studyBuddySettings');
        if (saved) {
            this.settings = {...this.settings, ...JSON.parse(saved)};
        }
    }
    
    saveSettings() {
        localStorage.setItem('studyBuddySettings', JSON.stringify(this.settings));
    }
    
    applySettings() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        document.documentElement.setAttribute('data-font', this.settings.font);
        
        if (this.settings.bgStyle === 'gradient') {
            document.body.classList.remove('bg-image');
            document.body.style.backgroundImage = '';
            
            if (this.settings.theme === 'dark') {
                document.documentElement.style.setProperty('--bg-gradient-start', '#1a1d23');
                document.documentElement.style.setProperty('--bg-gradient-end', '#2c3e50');
            } else {
                document.documentElement.style.setProperty('--bg-gradient-start', this.settings.bgColor);
                document.documentElement.style.setProperty('--bg-gradient-end', '#ffffff');
            }
        } else if (this.settings.bgStyle === 'solid') {
            document.body.classList.remove('bg-image');
            document.body.style.backgroundImage = '';
            document.documentElement.style.setProperty('--bg-gradient-start', this.settings.bgColor);
            document.documentElement.style.setProperty('--bg-gradient-end', this.settings.bgColor);
        } else if (this.settings.bgStyle === 'image' && this.settings.bgImage) {
            document.body.classList.add('bg-image');
            document.body.style.backgroundImage = `url(${this.settings.bgImage})`;
        }
        
        const opacity = this.settings.cardOpacity / 100;
        if (this.settings.theme === 'dark') {
            document.documentElement.style.setProperty('--card-bg', `rgba(37, 40, 46, ${opacity})`);
        } else {
            document.documentElement.style.setProperty('--card-bg', `rgba(255, 255, 255, ${opacity})`);
        }
    }
    
    initSettings() {
        const modal = document.getElementById('settingsModal');
        document.getElementById('settingsBtn').addEventListener('click', () => {
            modal.classList.add('active');
            this.populateSettings();
        });
        
        document.getElementById('closeSettings').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        document.getElementById('bgStyleSelect').addEventListener('change', (e) => {
            const imageSection = document.getElementById('bgImageSection');
            if (e.target.value === 'image') {
                imageSection.classList.remove('hidden');
            } else {
                imageSection.classList.add('hidden');
            }
        });
        
        document.getElementById('applyBgImage').addEventListener('click', () => {
            const url = document.getElementById('bgImageInput').value.trim();
            if (url) {
                this.settings.bgImage = url;
                this.applySettings();
            }
        });
        
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.settings.theme = document.getElementById('themeSelect').value;
            this.settings.font = document.getElementById('fontSelect').value;
            this.settings.bgStyle = document.getElementById('bgStyleSelect').value;
            this.settings.bgColor = document.getElementById('bgColorPicker').value;
            this.settings.cardOpacity = parseInt(document.getElementById('cardOpacity').value);
            
            this.saveSettings();
            this.applySettings();
            modal.classList.remove('active');
        });
    }
    
    populateSettings() {
        document.getElementById('themeSelect').value = this.settings.theme;
        document.getElementById('fontSelect').value = this.settings.font;
        document.getElementById('bgStyleSelect').value = this.settings.bgStyle;
        document.getElementById('bgColorPicker').value = this.settings.bgColor;
        document.getElementById('bgImageInput').value = this.settings.bgImage;
        document.getElementById('cardOpacity').value = this.settings.cardOpacity;
        
        if (this.settings.bgStyle === 'image') {
            document.getElementById('bgImageSection').classList.remove('hidden');
        }
    }
    
    initClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
    
    updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        const date = now.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
        document.getElementById('currentTime').textContent = time;
        document.getElementById('currentDate').textContent = date;
    }
    
    initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }
    
    initTimer() {
        document.getElementById('startBtn').addEventListener('click', () => this.startTimer());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetTimer());
        document.getElementById('quickStart').addEventListener('click', () => this.startTimer());
        document.getElementById('quickReset').addEventListener('click', () => this.resetTimer());
        
        document.getElementById('workTime').addEventListener('change', (e) => {
            this.timer.workTime = parseInt(e.target.value);
            if (!this.timer.isRunning && this.timer.isWork) {
                this.timer.minutes = this.timer.workTime;
                this.timer.seconds = 0;
                this.updateTimerDisplay();
            }
        });
        
        document.getElementById('breakTime').addEventListener('change', (e) => {
            this.timer.breakTime = parseInt(e.target.value);
        });
        
        this.updateTimerDisplay();
    }
    
    startTimer() {
        if (!this.timer.isRunning) {
            this.timer.isRunning = true;
            this.timer.interval = setInterval(() => this.tick(), 1000);
            document.getElementById('statusLabel').textContent = this.timer.isWork ? 'Working' : 'Break';
            
            const startBtns = [document.getElementById('startBtn'), document.getElementById('quickStart')];
            startBtns.forEach(btn => {
                if (btn) {
                    btn.textContent = 'Stop';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-secondary');
                }
            });
        } else {
            this.pauseTimer();
        }
    }
    
    pauseTimer() {
        this.timer.isRunning = false;
        if (this.timer.interval) {
            clearInterval(this.timer.interval);
        }
        document.getElementById('statusLabel').textContent = 'Paused';
        
        const startBtns = [document.getElementById('startBtn'), document.getElementById('quickStart')];
        startBtns.forEach(btn => {
            if (btn) {
                btn.textContent = 'Start';
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
            }
        });
    }
    
    resetTimer() {
        this.pauseTimer();
        this.timer.minutes = this.timer.isWork ? this.timer.workTime : this.timer.breakTime;
        this.timer.seconds = 0;
        document.getElementById('statusLabel').textContent = 'Ready';
        this.updateTimerDisplay();
        
        const startBtns = [document.getElementById('startBtn'), document.getElementById('quickStart')];
        startBtns.forEach(btn => {
            if (btn) {
                btn.textContent = 'Start';
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
            }
        });
    }
    
    tick() {
        if (this.timer.seconds > 0) {
            this.timer.seconds--;
        } else if (this.timer.minutes > 0) {
            this.timer.minutes--;
            this.timer.seconds = 59;
            if (this.timer.isWork) {
                this.timer.totalFocusMinutes++;
                this.updateDashboard();
            }
        } else {
            this.timerComplete();
        }
        this.updateTimerDisplay();
    }
    
    timerComplete() {
        this.pauseTimer();
        this.timer.isWork = !this.timer.isWork;
        this.timer.minutes = this.timer.isWork ? this.timer.workTime : this.timer.breakTime;
        this.timer.seconds = 0;
        this.updateTimerDisplay();
        document.getElementById('statusLabel').textContent = 'Complete!';
        alert(this.timer.isWork ? 'Break complete! Time to work!' : 'Work session complete! Take a break!');
    }
    
    updateTimerDisplay() {
        const mins = String(this.timer.minutes).padStart(2, '0');
        const secs = String(this.timer.seconds).padStart(2, '0');
        const display = `${mins}:${secs}`;
        
        document.getElementById('timerDisplay').textContent = display;
        document.getElementById('timerDisplayDash').textContent = display;
        document.getElementById('timerSmall').textContent = display;
        document.getElementById('timerMode').textContent = this.timer.isWork ? 'Work Session' : 'Break Time';
    }
    
    initTasks() {
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask('taskInput'));
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask('taskInput');
        });
        
        document.getElementById('dashAddTask').addEventListener('click', () => this.addTask('dashTaskInput'));
        document.getElementById('dashTaskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask('dashTaskInput');
        });
        
        this.renderTasks();
    }
    
    addTask(inputId) {
        const input = document.getElementById(inputId);
        const text = input.value.trim();
        if (text) {
            this.tasks.push({id: this.taskId++, text, completed: false});
            input.value = '';
            this.renderTasks();
            this.updateDashboard();
        }
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.updateDashboard();
        }
    }
    
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.renderTasks();
        this.updateDashboard();
    }
    
    renderTasks() {
        const list = document.getElementById('taskList');
        const completed = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        const statsText = `${completed}/${total} completed`;
        document.getElementById('taskStats').textContent = statsText;
        
        list.innerHTML = '';
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => this.toggleTask(task.id));
            
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;
            
            const btn = document.createElement('button');
            btn.className = 'task-delete';
            btn.textContent = '×';
            btn.addEventListener('click', () => this.deleteTask(task.id));
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btn);
            list.appendChild(li);
        });
    }
    
    updateDashboard() {
        const completed = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        document.getElementById('dashTaskCount').textContent = `${completed}/${total}`;
        document.getElementById('dashFocusTime').textContent = `${this.timer.totalFocusMinutes}m`;
        document.getElementById('dashCardCount').textContent = this.cardsReviewed;
    }
    
    initFlashcards() {
        document.getElementById('addCardBtn').addEventListener('click', () => this.addCard());
        document.getElementById('flipCardBtn').addEventListener('click', () => this.flipCard());
        document.getElementById('prevCardBtn').addEventListener('click', () => this.prevCard());
        document.getElementById('nextCardBtn').addEventListener('click', () => this.nextCard());
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
        
        document.getElementById('cardFront').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('cardBack').focus();
        });
        
        document.getElementById('cardBack').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCard();
        });
        
        this.renderCards();
        this.renderFlashcard();
    }
    
    addCard() {
        const front = document.getElementById('cardFront').value.trim();
        const back = document.getElementById('cardBack').value.trim();
        if (front && back) {
            this.flashcards.push({id: this.cardId++, front, back});
            document.getElementById('cardFront').value = '';
            document.getElementById('cardBack').value = '';
            this.currentCard = this.flashcards.length - 1;
            this.showingFront = true;
            this.renderCards();
            this.renderFlashcard();
        }
    }
    
    deleteCard(id) {
        if (confirm('Delete this card?')) {
            const cardIndex = this.flashcards.findIndex(c => c.id === id);
            this.flashcards = this.flashcards.filter(c => c.id !== id);
            
            if (this.flashcards.length === 0) {
                this.currentCard = 0;
            } else if (this.currentCard >= this.flashcards.length) {
                this.currentCard = this.flashcards.length - 1;
            } else if (cardIndex <= this.currentCard && this.currentCard > 0) {
                this.currentCard--;
            }
            
            this.renderCards();
            this.renderFlashcard();
        }
    }
    
    selectCard(index) {
        this.currentCard = index;
        this.showingFront = true;
        this.renderCards();
        this.renderFlashcard();
    }
    
    flipCard() {
        if (this.flashcards.length > 0) {
            this.showingFront = !this.showingFront;
            if (!this.showingFront) {
                this.cardsReviewed++;
                this.updateDashboard();
            }
            this.renderFlashcard();
        }
    }
    
    prevCard() {
        if (this.flashcards.length > 0) {
            this.currentCard = (this.currentCard - 1 + this.flashcards.length) % this.flashcards.length;
            this.showingFront = true;
            this.renderCards();
            this.renderFlashcard();
        }
    }
    
    nextCard() {
        if (this.flashcards.length > 0) {
            this.currentCard = (this.currentCard + 1) % this.flashcards.length;
            this.showingFront = true;
            this.renderCards();
            this.renderFlashcard();
        }
    }
    
    renderCards() {
        const list = document.getElementById('cardList');
        list.innerHTML = '';
        this.flashcards.forEach((card, index) => {
            const li = document.createElement('li');
            li.className = `card-item ${index === this.currentCard ? 'active' : ''}`;
            
            const span = document.createElement('span');
            span.textContent = card.front;
            span.addEventListener('click', () => this.selectCard(index));
            
            const actions = document.createElement('div');
            actions.className = 'card-actions';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => this.deleteCard(card.id));
            
            actions.appendChild(deleteBtn);
            li.appendChild(span);
            li.appendChild(actions);
            list.appendChild(li);
        });
    }
    
    renderFlashcard() {
        const content = document.getElementById('flashcardContent');
        const counter = document.getElementById('cardCounter');
        
        if (this.flashcards.length === 0) {
            content.textContent = 'No cards yet';
            counter.textContent = '0/0';
        } else {
            const card = this.flashcards[this.currentCard];
            content.textContent = this.showingFront ? card.front : card.back;
            counter.textContent = `${this.currentCard + 1}/${this.flashcards.length}`;
        }
    }
    
    initSounds() {
        const container = document.getElementById('soundList');
        
        document.getElementById('masterVolume').addEventListener('input', (e) => {
            console.log('Master volume:', e.target.value);
        });
        
        document.getElementById('muteBtn').addEventListener('click', (e) => {
            e.target.textContent = e.target.textContent === '🔊' ? '🔇' : '🔊';
        });
        
        this.sounds.forEach((sound, index) => {
            const item = document.createElement('div');
            item.className = 'sound-item';
            item.innerHTML = `
                <div class="sound-icon">${sound.icon}</div>
                <div class="sound-name">${sound.name}</div>
                <input type="range" class="sound-slider" min="0" max="100" value="${sound.volume}" data-index="${index}">
                <div class="sound-value">${sound.volume}%</div>
            `;
            container.appendChild(item);
            
            const slider = item.querySelector('.sound-slider');
            const value = item.querySelector('.sound-value');
            slider.addEventListener('input', (e) => {
                this.sounds[index].volume = parseInt(e.target.value);
                value.textContent = `${e.target.value}%`;
            });
        });
    }
    
    initNotes() {
        const addNoteBtn = document.getElementById('addNoteBtn');
        const dashAddNote = document.getElementById('dashAddNote');
        
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.addNote();
            });
        }
        
        if (dashAddNote) {
            dashAddNote.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.addNote();
            });
        }
    }
    
    addNote() {
        const colors = ['yellow', 'pink', 'blue', 'green', 'purple'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const note = {
            id: this.noteId++,
            text: '',
            color: color,
            x: 120 + (this.notes.length * 40),
            y: 120 + (this.notes.length * 40)
        };
        this.notes.push(note);
        this.renderNote(note);
        console.log('Note created:', note);
    }
    
    renderNote(note) {
        const container = document.getElementById('stickyNotesContainer');
        const div = document.createElement('div');
        div.className = `sticky-note ${note.color}`;
        div.style.left = `${note.x}px`;
        div.style.top = `${note.y}px`;
        div.id = `note-${note.id}`;
        
        const header = document.createElement('div');
        header.className = 'sticky-note-header';
        
        const pin = document.createElement('span');
        pin.textContent = '📌';
        
        const controls = document.createElement('div');
        controls.className = 'sticky-note-controls';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => this.deleteNote(note.id));
        
        controls.appendChild(deleteBtn);
        header.appendChild(pin);
        header.appendChild(controls);
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Type here...';
        textarea.value = note.text;
        textarea.addEventListener('input', (e) => this.updateNoteText(note.id, e.target.value));
        
        div.appendChild(header);
        div.appendChild(textarea);
        container.appendChild(div);
        
        this.makeDraggable(div, note);
    }
    
    makeDraggable(element, note) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector('.sticky-note-header');
        
        if (!header) return;
        
        header.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            const newX = element.offsetLeft - pos1;
            const newY = element.offsetTop - pos2;
            element.style.top = newY + "px";
            element.style.left = newX + "px";
            note.x = newX;
            note.y = newY;
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    updateNoteText(id, text) {
        const note = this.notes.find(n => n.id === id);
        if (note) note.text = text;
    }
    
    deleteNote(id) {
        this.notes = this.notes.filter(n => n.id !== id);
        document.getElementById(`note-${id}`).remove();
    }
    
    escape(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StudyBuddy();
});