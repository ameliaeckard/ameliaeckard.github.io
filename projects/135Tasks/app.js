class TodoApp {
    constructor() {
        this.tasks = { large: [], medium: [], small: [] };
        this.limits = { large: 1, medium: 3, small: 5 };
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateProgress();
        this.updateAllTaskLists();
    }
    
    bindEvents() {
        document.querySelectorAll('.add-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.add-task-btn').dataset.category;
                this.addTask(category);
            });
        });
        
        document.querySelectorAll('.task-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const category = e.target.id.replace('TaskInput', '').toLowerCase();
                    this.addTask(category);
                }
            });
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAllTasks();
        });
        
        document.getElementById('motivationalMessage').addEventListener('click', () => {
            this.hideMotivationalMessage();
        });
    }
    
    addTask(category) {
        const input = document.getElementById(`${category}TaskInput`);
        const text = input.value.trim();
        
        if (!text) return;
        
        if (this.tasks[category].length >= this.limits[category]) {
            alert(`Maximum ${this.limits[category]} ${category} task(s) allowed`);
            return;
        }
        
        this.tasks[category].push({
            id: Date.now(),
            text: text,
            completed: false
        });
        
        input.value = '';
        this.updateTaskList(category);
        this.saveToStorage();
        this.updateInputState(category);
        this.updateProgress();
    }
    
    toggleTask(taskId, category) {
        const task = this.tasks[category].find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.updateTaskList(category);
            this.updateProgress();
            this.saveToStorage();
            
            if (this.getAllCompletedCount() === this.getTotalTaskCount() && this.getTotalTaskCount() > 0) {
                this.celebrate();
            }
        }
    }
    
    deleteTask(taskId, category) {
        this.tasks[category] = this.tasks[category].filter(t => t.id !== taskId);
        this.updateTaskList(category);
        this.updateProgress();
        this.saveToStorage();
        this.updateInputState(category);
    }
    
    updateTaskList(category) {
        const container = document.getElementById(`${category}TaskList`);
        container.innerHTML = '';
        
        this.tasks[category].forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskDiv.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="app.toggleTask(${task.id}, '${category}')"></div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="task-delete" onclick="app.deleteTask(${task.id}, '${category}')">×</button>
            `;
            container.appendChild(taskDiv);
        });
    }
    
    updateAllTaskLists() {
        ['large', 'medium', 'small'].forEach(category => {
            this.updateTaskList(category);
            this.updateInputState(category);
        });
    }
    
    updateProgress() {
        const completed = this.getAllCompletedCount();
        const total = this.getTotalTaskCount();
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('progressPercentage').textContent = `${percentage}%`;
        document.querySelector('.progress-text').innerHTML = `Progress: <span id="completedCount">${completed}</span>/${total} tasks`;
        document.getElementById('progressFill').style.width = `${percentage}%`;
    }
    
    updateInputState(category) {
        const input = document.getElementById(`${category}TaskInput`);
        const button = input.nextElementSibling;
        const isAtLimit = this.tasks[category].length >= this.limits[category];
        
        input.disabled = isAtLimit;
        button.disabled = isAtLimit;
        
        if (isAtLimit) {
            input.placeholder = `Max ${this.limits[category]} reached`;
        } else {
            const placeholders = {
                large: "Big priority",
                medium: "Medium priority",
                small: "Quick task"
            };
            input.placeholder = placeholders[category];
        }
    }
    
    getAllCompletedCount() {
        return Object.values(this.tasks).flat().filter(task => task.completed).length;
    }
    
    getTotalTaskCount() {
        return Object.values(this.tasks).flat().length;
    }
    
    celebrate() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            this.showMotivationalMessage();
        }, 500);
    }
    
    showMotivationalMessage() {
        const message = document.getElementById('motivationalMessage');
        message.classList.remove('hidden');
        
        setTimeout(() => {
            this.hideMotivationalMessage();
        }, 5000);
    }
    
    hideMotivationalMessage() {
        document.getElementById('motivationalMessage').classList.add('hidden');
    }
    
    resetAllTasks() {
        const totalTasks = this.getTotalTaskCount();
        
        if (totalTasks === 0) {
            alert('No tasks to reset');
            return;
        }
        
        if (confirm(`Reset all ${totalTasks} tasks?`)) {
            this.tasks = { large: [], medium: [], small: [] };
            this.updateAllTaskLists();
            this.updateProgress();
            this.saveToStorage();
            this.hideMotivationalMessage();
        }
    }
    
    saveToStorage() {
        try {
            localStorage.setItem('todoApp_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Failed to save:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const savedTasks = localStorage.getItem('todoApp_tasks');
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            }
        } catch (error) {
            console.error('Failed to load:', error);
            this.tasks = { large: [], medium: [], small: [] };
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});