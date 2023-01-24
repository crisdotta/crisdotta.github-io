const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');


form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value !== ""){
        createTask(itTask.value.charAt(0).toUpperCase(0)+itTask.value.slice(1));
        itTask.value = "";
        renderTasks();
    }
});


createTask = (value) => {
    const newTask = {
        id: (Math.random()*100).toString(36).slice(2),
        title: value,
        completed: false,
    };
    
    tasks.unshift(newTask);
}

renderTasks = () => {
    const html  = tasks.map(task => {
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>`:`<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
    });

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join('');

    const startButtons = document.querySelectorAll('.task .start-button');
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = 'In progress...';
            }
        })
    })
}

startButtonHandler = (id) => {
    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(() => {
        timerHandler(id);
    },1000);
}
timerHandler = (id) => {
    time--;
    renderTime();

    if(time <= 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
    }
}

markCompleted = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak() {
    time = 25 * 60;
    document.querySelector("#time #taskName").textContent = "Break";
    renderTime();
    timerBreak = setInterval(timerBreakHandler, 1000);
  }

function timerBreakHandler() {
    time--;
    renderTime();
    if (time <= 0) {
      clearInterval(timerBreak);
      current = null;
      document.querySelector("#time #taskName").textContent = "";
      renderTime();
    }
  }

renderTime = () =>{
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent= `${minutes < 10 ? "0":""}${minutes}:${seconds < 10 ? "0":""}${seconds}`;
}

renderTasks();
renderTime();


