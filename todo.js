
let tasks=[];
const TaskInput = document.getElementById('add');
const addButton= document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const tasksCounter = document.getElementById('tasks-counter');


//Show task to Dom
function addTaskToDom(task){
    const li=document.createElement('li');

    li.innerHTML=`
            <li>
                <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : " "} class="custom-checkbox">
                <label for="${task.id}">${task.text}</label>
                <img src="delete.png" class="dlt-btn" id="${task.id}" />
            </li> `

        taskList.append(li);
}


function markTaskAsComplete(taskId){
    const Task=tasks.filter((task)=>{
        return task.id == taskId;
    });

    if(Task.length > 0){
        const currentTask = Task[0];

        currentTask.done = !currentTask.done;
        if(currentTask.done==true){
            showNotification('Task accomplished successfully!');
        }
        renderList();
        return;
    }
    
    showNotification('Cant toggle the task');
}



function renderList(){
    taskList.innerHTML=" ";
    for(let i=0; i<tasks.length; i++){
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

//Add Task function
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('New Task Added');
    }else{
        showNotification('Task not added!!!')
    }
    return;
}

//deleteTask function
function deleteTask (taskId) {
    const newTask=tasks.filter((task)=>{
        return task.id !== taskId;
    })

    tasks=newTask;
    renderList();
    showNotification('Task Deleted Successfully!!');
}


//shownotification
function showNotification(text){
    alert(text);
}


//click Events
function handleClickListener(e){
    const target= e.target;
    console.log(target);

    if(target.className == 'dlt-btn'){
        const taskId=target.id;
        deleteTask(taskId);
    }else if(target.className == 'custom-checkbox'){
        const taskId=target.id;
        markTaskAsComplete(taskId)
    }else if(target.id=='add-task-btn'){
       const text=TaskInput.value;
       if(!text){
        showNotification('please add a task!')
    }

    const task={
        text,
        id:Date.now().toString(),
        done:false,
    }
        TaskInput.value="";
        addTask(task);
    }else if(target.id=='clear-task-btn'){
        tasks.splice(0, tasks.length);
        showNotification('All Tasks Removed!');
        renderList();
    }
}

//keyevents handling function
function handleKeypress(e){
    if(e.key=='Enter'){

        const text= e.target.value;

        if(!text){
            showNotification('please add a task!')
        }

        const task={
            text,
            id:Date.now().toString(),
            done:false,
        }

        e.target.value="";
        addTask(task);
    }
    
}

//eventListeners
TaskInput.addEventListener('keyup', handleKeypress);
document.addEventListener('click', handleClickListener);


