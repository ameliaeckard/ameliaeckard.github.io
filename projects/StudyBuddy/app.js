class StudyBuddyApp {
    constructor() {
        this.settings = {
            workTime: 25,
            breakTime: 5,
            volume: 0.5,
            theme: 'light'
        };
        
        this.sampleTasks = ["Review Chapter 3", "Complete homework", "Study flashcards"];
        this.sampleFlashcards = [
            {id: 1, front: "What is HTML?", back: "HyperText Markup Language"},
            {id: 2, front: "CSS stands for?", back: "Cascading Style Sheets"},
            {id: 3, front: "What is JavaScript?", back: "A programming language for web development"}
        ];
        
        this.backgroundSounds = [
            {name: "Ocean Waves", emoji: "🌊", defaultVolume: 0, file: "ocean.mp3"},
            {name: "Rain", emoji: "🌧️", defaultVolume: 0, file: "rain.mp3"},
            {name: "Background Talking", emoji: "💬", defaultVolume: 0, file: "talking.mp3"}
        ];

        this.audioContext = null;
        this.masterGain = null;
        this.soundGains = {};
        this.soundSources = {};
        this.audioBuffers = {};
        this.isMuted = false;

        this.sessionPlan = {
            totalMinutes: 120,
            sessions: [],
            isPlanned: false
        };

        this.globalTimer = {
            elapsedMinutes: 0,
            elapsedSeconds: 0,
            totalMinutes: 0,
            isRunning: false,
            intervalId: null
        };

        this.timer = {
            minutes: this.settings.workTime,
            seconds: 0,
            isRunning: false,
            isWorkSession: true,
            currentSessionIndex: 0,
            intervalId: null
        };

        this.tasks = [];
        this.taskIdCounter = 0;

        this.flashcards = [...this.sampleFlashcards];
        this.cardIdCounter = 4;
        this.currentCardIndex = 0;
        this.showingFront = true;

        this.init();
    }

    async init() {
        this.initTheme();
        await this.initAudio();
        this.initSessionPlanner();
        this.initTimer();
        this.initTasks();
        this.initFlashcards();
        this.initBackgroundSounds();
        this.loadSampleData();
    }

    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.settings.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon();

        themeToggle.addEventListener('click', () => {
            this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.settings.theme);
            localStorage.setItem('theme', this.settings.theme);
            this.updateThemeIcon();
        });
    }

    updateThemeIcon() {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = this.settings.theme === 'light' ? '🌙' : '☀️';
    }

    async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = this.settings.volume;
            
            await this.loadTimerSounds();
        } catch (error) {
            console.warn('Audio context initialization failed:', error);
        }
    }

    async loadTimerSounds() {
        try {
            const startResponse = await fetch('audio/start.mp3');
            if (startResponse.ok) {
                const startArrayBuffer = await startResponse.arrayBuffer();
                this.audioBuffers.start = await this.audioContext.decodeAudioData(startArrayBuffer);
            }
        } catch (error) {
            console.warn('Could not load start.mp3:', error);
        }

        try {
            const completeResponse = await fetch('audio/complete.mp3');
            if (completeResponse.ok) {
                const completeArrayBuffer = await completeResponse.arrayBuffer();
                this.audioBuffers.complete = await this.audioContext.decodeAudioData(completeArrayBuffer);
            }
        } catch (error) {
            console.warn('Could not load complete.mp3:', error);
        }
    }

    initSessionPlanner() {
        const totalTimeInput = document.getElementById('total-time');
        const planSessionBtn = document.getElementById('plan-session-btn');
        const startSessionBtn = document.getElementById('start-session-btn');
        const pauseSessionBtn = document.getElementById('pause-session-btn');
        const stopSessionBtn = document.getElementById('stop-session-btn');

        totalTimeInput.addEventListener('change', () => this.planSession());
        planSessionBtn.addEventListener('click', () => this.planSession());
        startSessionBtn.addEventListener('click', () => this.startSession());
        pauseSessionBtn.addEventListener('click', () => this.pauseSession());
        stopSessionBtn.addEventListener('click', () => this.stopSession());

        this.planSession();
    }

    planSession() {
        const totalMinutes = parseInt(document.getElementById('total-time').value);
        this.sessionPlan.totalMinutes = totalMinutes;
        this.sessionPlan.sessions = this.generateSessionPlan(totalMinutes);
        this.sessionPlan.isPlanned = true;

        this.displaySessionPlan();
        this.resetGlobalTimer();
        
        document.getElementById('start-session-btn').disabled = false;
    }

    generateSessionPlan(totalMinutes) {
        const sessions = [];
        let remainingMinutes = totalMinutes;
        let sessionCount = 0;

        while (remainingMinutes > 0) {
            if (remainingMinutes >= 25) {
                sessions.push({type: 'work', duration: 25});
                remainingMinutes -= 25;
                sessionCount++;

                if (remainingMinutes > 0) {
                    const isLongBreak = totalMinutes >= 120 && sessionCount % 4 === 0;
                    const breakDuration = isLongBreak ? 15 : 5;
                    sessions.push({type: isLongBreak ? 'long-break' : 'break', duration: breakDuration});
                }
            } else {
                sessions.push({type: 'work', duration: remainingMinutes});
                remainingMinutes = 0;
            }
        }

        return sessions;
    }

    displaySessionPlan() {
        const suggestionDiv = document.getElementById('session-suggestion');
        const timelineDiv = document.getElementById('timeline-display');
        const workSessionsSpan = document.getElementById('work-sessions-count');
        const breakTimeSpan = document.getElementById('break-time-total');

        suggestionDiv.classList.remove('hidden');

        timelineDiv.innerHTML = '';
        this.sessionPlan.sessions.forEach((session, index) => {
            const item = document.createElement('div');
            item.className = `timeline-item ${session.type}`;
            item.textContent = `${session.type === 'work' ? 'W' : session.type === 'long-break' ? 'LB' : 'B'}${session.duration}`;
            timelineDiv.appendChild(item);
        });

        const workSessions = this.sessionPlan.sessions.filter(s => s.type === 'work').length;
        const totalBreakTime = this.sessionPlan.sessions
            .filter(s => s.type === 'break' || s.type === 'long-break')
            .reduce((sum, s) => sum + s.duration, 0);

        workSessionsSpan.textContent = `${workSessions} work sessions`;
        breakTimeSpan.textContent = `${totalBreakTime} min breaks`;
    }

    startSession() {
        if (!this.sessionPlan.isPlanned) return;

        this.globalTimer.totalMinutes = this.sessionPlan.totalMinutes;
        this.globalTimer.isRunning = true;
        this.globalTimer.intervalId = setInterval(() => this.tickGlobalTimer(), 1000);

        this.timer.currentSessionIndex = 0;
        this.startCurrentPomodoro();

        document.getElementById('start-session-btn').disabled = true;
        document.getElementById('pause-session-btn').disabled = false;
        document.getElementById('stop-session-btn').disabled = false;
        document.getElementById('total-sessions').textContent = this.sessionPlan.sessions.filter(s => s.type === 'work').length;
    }

    pauseSession() {
        this.globalTimer.isRunning = false;
        if (this.globalTimer.intervalId) {
            clearInterval(this.globalTimer.intervalId);
            this.globalTimer.intervalId = null;
        }

        this.stopTimer();

        document.getElementById('start-session-btn').disabled = false;
        document.getElementById('pause-session-btn').disabled = true;
    }

    stopSession() {
        this.resetGlobalTimer();
        this.resetTimer();
        this.timer.currentSessionIndex = 0;

        document.getElementById('start-session-btn').disabled = false;
        document.getElementById('pause-session-btn').disabled = true;
        document.getElementById('stop-session-btn').disabled = true;
        document.getElementById('timer-mode').textContent = 'Ready to Start';
    }

    startCurrentPomodoro() {
        if (this.timer.currentSessionIndex >= this.sessionPlan.sessions.length) {
            this.completeAllSessions();
            return;
        }

        const currentSession = this.sessionPlan.sessions[this.timer.currentSessionIndex];
        this.timer.isWorkSession = currentSession.type === 'work';
        this.timer.minutes = currentSession.duration;
        this.timer.seconds = 0;

        if (currentSession.type === 'work') {
            document.getElementById('timer-mode').textContent = 'Work Session';
            document.querySelector('.timer-circle').className = 'timer-circle work-mode pulse';
            const workSessionNumber = this.sessionPlan.sessions.slice(0, this.timer.currentSessionIndex + 1)
                .filter(s => s.type === 'work').length;
            document.getElementById('current-session').textContent = workSessionNumber;
        } else {
            const breakType = currentSession.type === 'long-break' ? 'Long Break' : 'Break Time';
            document.getElementById('timer-mode').textContent = breakType;
            document.querySelector('.timer-circle').className = 'timer-circle break-mode pulse';
        }

        this.updateTimerDisplay();
        this.startTimer();
    }

    tickGlobalTimer() {
        this.globalTimer.elapsedSeconds++;
        if (this.globalTimer.elapsedSeconds >= 60) {
            this.globalTimer.elapsedMinutes++;
            this.globalTimer.elapsedSeconds = 0;
        }

        this.updateGlobalTimerDisplay();
    }

    updateGlobalTimerDisplay() {
        const elapsedStr = `${String(this.globalTimer.elapsedMinutes).padStart(2, '0')}:${String(this.globalTimer.elapsedSeconds).padStart(2, '0')}`;
        const totalStr = `${String(this.globalTimer.totalMinutes).padStart(2, '0')}:00`;
        document.getElementById('global-timer-display').textContent = `${elapsedStr} / ${totalStr}`;

        const totalSeconds = this.globalTimer.totalMinutes * 60;
        const elapsedSeconds = this.globalTimer.elapsedMinutes * 60 + this.globalTimer.elapsedSeconds;
        const progress = Math.min((elapsedSeconds / totalSeconds) * 100, 100);
        document.getElementById('global-progress-bar').style.width = `${progress}%`;
    }

    resetGlobalTimer() {
        this.globalTimer.elapsedMinutes = 0;
        this.globalTimer.elapsedSeconds = 0;
        this.globalTimer.isRunning = false;
        if (this.globalTimer.intervalId) {
            clearInterval(this.globalTimer.intervalId);
            this.globalTimer.intervalId = null;
        }
        this.updateGlobalTimerDisplay();
    }

    completeAllSessions() {
        this.resetGlobalTimer();
        this.resetTimer();
        document.getElementById('timer-mode').textContent = 'Session Complete!';
        this.playCompletionSound();
        
        document.getElementById('start-session-btn').disabled = false;
        document.getElementById('pause-session-btn').disabled = true;
        document.getElementById('stop-session-btn').disabled = true;
    }

    initTimer() {
        const workTimeInput = document.getElementById('work-time');
        const breakTimeInput = document.getElementById('break-time');
        
        workTimeInput.addEventListener('change', (e) => {
            this.settings.workTime = parseInt(e.target.value);
            if (!this.timer.isRunning) {
                this.resetTimer();
            }
        });
        
        breakTimeInput.addEventListener('change', (e) => {
            this.settings.breakTime = parseInt(e.target.value);
        });

        this.updateTimerDisplay();
    }

    startTimer() {
        if (!this.timer.isRunning) {
            this.timer.isRunning = true;
            this.playStartSound();
            this.timer.intervalId = setInterval(() => this.tick(), 1000);
        }
    }

    stopTimer() {
        this.timer.isRunning = false;
        if (this.timer.intervalId) {
            clearInterval(this.timer.intervalId);
            this.timer.intervalId = null;
        }
        document.querySelector('.timer-circle').classList.remove('pulse');
    }

    resetTimer() {
        this.stopTimer();
        if (this.timer.isWorkSession) {
            this.timer.minutes = this.settings.workTime;
        } else {
            this.timer.minutes = this.settings.breakTime;
        }
        this.timer.seconds = 0;
        this.updateTimerDisplay();
    }

    tick() {
        if (this.timer.seconds > 0) {
            this.timer.seconds--;
        } else if (this.timer.minutes > 0) {
            this.timer.minutes--;
            this.timer.seconds = 59;
        } else {
            this.completeCurrentPomodoro();
        }
        this.updateTimerDisplay();
    }

    completeCurrentPomodoro() {
        this.stopTimer();
        this.playCompletionSound();
        
        this.timer.currentSessionIndex++;
        
        setTimeout(() => {
            if (this.globalTimer.isRunning) {
                this.startCurrentPomodoro();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const display = document.getElementById('timer-display');
        const minutes = String(this.timer.minutes).padStart(2, '0');
        const seconds = String(this.timer.seconds).padStart(2, '0');
        display.textContent = `${minutes}:${seconds}`;
    }

    initTasks() {
        const addTaskBtn = document.getElementById('add-task-btn');
        const newTaskInput = document.getElementById('new-task');

        addTaskBtn.addEventListener('click', () => this.addTask());
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    addTask(taskText = null) {
        const input = document.getElementById('new-task');
        const text = taskText || input.value.trim();
        
        if (text) {
            const task = {
                id: this.taskIdCounter++,
                text: text,
                completed: false
            };
            
            this.tasks.push(task);
            this.renderTasks();
            
            if (!taskText) {
                input.value = '';
                this.playTaskSound();
            }
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            if (task.completed) {
                this.playTaskCompleteSound();
            }
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        const taskCounter = document.getElementById('task-counter');
        
        taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="app.toggleTask(${task.id})">
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="task-delete" onclick="app.deleteTask(${task.id})">×</button>
            `;
            li.classList.add('fade-in');
            taskList.appendChild(li);
        });
        
        const completed = this.tasks.filter(t => t.completed).length;
        taskCounter.textContent = `${completed}/${this.tasks.length} tasks completed`;
    }

    

    initFlashcards() {
        const addCardBtn = document.getElementById('add-card-btn');
        const cardFrontInput = document.getElementById('card-front');
        const cardBackInput = document.getElementById('card-back');
        const flipBtn = document.getElementById('flip-card-btn');
        const prevBtn = document.getElementById('prev-card-btn');
        const nextBtn = document.getElementById('next-card-btn');
        const cardElement = document.getElementById('current-card');

        addCardBtn.addEventListener('click', () => this.addFlashcard());
        flipBtn.addEventListener('click', () => this.flipCard());
        prevBtn.addEventListener('click', () => this.previousCard());
        nextBtn.addEventListener('click', () => this.nextCard());
        cardElement.addEventListener('click', () => this.flipCard());

        cardFrontInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                document.getElementById('card-back').focus();
            }
        });
        cardBackInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addFlashcard();
        });

        this.renderFlashcardList();
        this.renderFlashcard();
    }

    addFlashcard() {
        const frontInput = document.getElementById('card-front');
        const backInput = document.getElementById('card-back');
        const front = frontInput.value.trim();
        const back = backInput.value.trim();
        
        if (front && back) {
            const card = {
                id: this.cardIdCounter++,
                front,
                back
            };
            
            this.flashcards.push(card);
            frontInput.value = '';
            backInput.value = '';
            this.currentCardIndex = this.flashcards.length - 1;
            this.showingFront = true;
            this.renderFlashcardList();
            this.renderFlashcard();
            this.playTaskSound();
        }
    }

    editFlashcard(cardId) {
        const card = this.flashcards.find(c => c.id === cardId);
        if (!card) return;

        const newFront = prompt('Edit front:', card.front);
        if (newFront !== null && newFront.trim()) {
            const newBack = prompt('Edit back:', card.back);
            if (newBack !== null && newBack.trim()) {
                card.front = newFront.trim();
                card.back = newBack.trim();
                this.renderFlashcardList();
                this.renderFlashcard();
            }
        }
    }

    deleteFlashcard(cardId) {
        if (confirm('Delete this flashcard?')) {
            this.flashcards = this.flashcards.filter(c => c.id !== cardId);
            if (this.currentCardIndex >= this.flashcards.length) {
                this.currentCardIndex = Math.max(0, this.flashcards.length - 1);
            }
            this.renderFlashcardList();
            this.renderFlashcard();
        }
    }

    selectCard(index) {
        this.currentCardIndex = index;
        this.showingFront = true;
        this.renderFlashcardList();
        this.renderFlashcard();
    }

    flipCard() {
        if (this.flashcards.length > 0) {
            this.showingFront = !this.showingFront;
            this.renderFlashcard();
            this.playFlipSound();
        }
    }

    previousCard() {
        if (this.flashcards.length > 0) {
            this.currentCardIndex = (this.currentCardIndex - 1 + this.flashcards.length) % this.flashcards.length;
            this.showingFront = true;
            this.renderFlashcardList();
            this.renderFlashcard();
        }
    }

    nextCard() {
        if (this.flashcards.length > 0) {
            this.currentCardIndex = (this.currentCardIndex + 1) % this.flashcards.length;
            this.showingFront = true;
            this.renderFlashcardList();
            this.renderFlashcard();
        }
    }

    renderFlashcardList() {
        const cardList = document.getElementById('card-list');
        
        cardList.innerHTML = '';
        
        this.flashcards.forEach((card, index) => {
            const li = document.createElement('li');
            li.className = `card-list-item ${index === this.currentCardIndex ? 'active' : ''}`;
            li.innerHTML = `
                <div class="card-front-preview" onclick="app.selectCard(${index})">${this.escapeHtml(card.front)}</div>
                <div class="card-list-actions">
                    <button class="card-edit-btn" onclick="app.editFlashcard(${card.id})" title="Edit">✏️</button>
                    <button class="card-delete-btn" onclick="app.deleteFlashcard(${card.id})" title="Delete">×</button>
                </div>
            `;
            cardList.appendChild(li);
        });
    }

    renderFlashcard() {
        const cardContent = document.getElementById('card-content-text');
        const cardCounter = document.getElementById('card-counter');
        
        if (this.flashcards.length === 0) {
            cardContent.textContent = 'No cards available';
            cardCounter.textContent = '0/0';
        } else {
            const currentCard = this.flashcards[this.currentCardIndex];
            cardContent.textContent = this.showingFront ? currentCard.front : currentCard.back;
            cardCounter.textContent = `${this.currentCardIndex + 1}/${this.flashcards.length}`;
        }
    }

    initBackgroundSounds() {
        const masterVolumeSlider = document.getElementById('master-volume');
        const muteBtn = document.getElementById('mute-btn');
        const soundMixer = document.getElementById('sound-mixer');

        masterVolumeSlider.addEventListener('input', (e) => {
            this.settings.volume = e.target.value / 100;
            if (this.masterGain) {
                this.masterGain.gain.value = this.isMuted ? 0 : this.settings.volume;
            }
        });

        muteBtn.addEventListener('click', () => this.toggleMute());

        this.backgroundSounds.forEach(sound => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'sound-track';
            trackDiv.innerHTML = `
                <div class="sound-emoji">${sound.emoji}</div>
                <div class="sound-name">${sound.name}</div>
                <input type="range" class="volume-slider sound-volume" 
                       id="volume-${sound.name.toLowerCase()}" 
                       min="0" max="100" value="${sound.defaultVolume * 100}">
                <div class="volume-value" id="value-${sound.name.toLowerCase()}">${Math.round(sound.defaultVolume * 100)}%</div>
            `;
            soundMixer.appendChild(trackDiv);

            const slider = trackDiv.querySelector('.sound-volume');
            const valueDisplay = trackDiv.querySelector('.volume-value');
            
            slider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                valueDisplay.textContent = `${e.target.value}%`;
                this.setSoundVolume(sound.name.toLowerCase(), volume);
            });

            this.initSoundTrack(sound.name.toLowerCase(), sound.defaultVolume, sound.file);
        });
    }

    async initSoundTrack(soundName, defaultVolume, fileName) {
        if (!this.audioContext) return;

        try {
            const gainNode = this.audioContext.createGain();
            gainNode.connect(this.masterGain);
            gainNode.gain.value = 0;
            this.soundGains[soundName] = gainNode;

            try {
                const response = await fetch(`audio/${fileName}`);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                    this.audioBuffers[soundName] = audioBuffer;
                    this.createLoopingSource(soundName, gainNode);
                } else {
                    throw new Error(`Failed to load ${fileName}`);
                }
            } catch (error) {
                console.warn(`Could not load ${fileName}, using fallback:`, error);
                this.createFallbackSound(soundName, gainNode);
            }
        } catch (error) {
            console.warn(`Failed to initialize ${soundName}:`, error);
        }
    }

    createLoopingSource(soundName, gainNode) {
        if (!this.audioBuffers[soundName]) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffers[soundName];
        source.loop = true;
        source.connect(gainNode);
        source.start();
        this.soundSources[soundName] = source;
    }

    createFallbackSound(soundName, gainNode) {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.3;
        }
        
        const source = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        
        source.buffer = noiseBuffer;
        source.loop = true;
        source.connect(filter);
        filter.connect(gainNode);
        source.start();
        this.soundSources[soundName] = source;
    }

    setSoundVolume(soundName, volume) {
        if (this.soundGains[soundName]) {
            this.soundGains[soundName].gain.value = volume;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = document.getElementById('mute-btn');
        
        if (this.masterGain) {
            this.masterGain.gain.value = this.isMuted ? 0 : this.settings.volume;
        }
        
        muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }

    playStartSound() {
        if (this.audioBuffers.start) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.audioBuffers.start;
            source.connect(this.masterGain);
            source.start();
        } else {
            this.playBeep(800, 0.1, 0.1);
        }
    }

    playCompletionSound() {
        if (this.audioBuffers.complete) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.audioBuffers.complete;
            source.connect(this.masterGain);
            source.start();
        } else {
            if (!this.audioContext) return;
            
            const now = this.audioContext.currentTime;
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(523, now);
            oscillator1.frequency.exponentialRampToValueAtTime(784, now + 0.3);
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(659, now);
            oscillator2.frequency.exponentialRampToValueAtTime(988, now + 0.3);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            oscillator1.start(now);
            oscillator2.start(now);
            oscillator1.stop(now + 0.5);
            oscillator2.stop(now + 0.5);
        }
    }

    playTaskCompleteSound() {
        this.playBeep(600, 0.15, 0.05);
    }

    playTaskSound() {
        this.playBeep(400, 0.1, 0.03);
    }

    playFlipSound() {
        this.playBeep(300, 0.05, 0.02);
    }

    playBeep(frequency, duration, volume) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const now = this.audioContext.currentTime;
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    loadSampleData() {
        this.sampleTasks.forEach(task => this.addTask(task));
        this.renderFlashcardList();
        this.renderFlashcard();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new StudyBuddyApp();
    
    document.addEventListener('click', () => {
        if (window.app.audioContext && window.app.audioContext.state === 'suspended') {
            window.app.audioContext.resume();
        }
    }, { once: true });
});
