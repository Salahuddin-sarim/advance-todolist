let tasks = [];
const btn=document.getElementById('btn');
const taskinput=document.getElementById('taskinput');
const tasklist = document.getElementById('task-list');

const addtask= ()=>{
const text = taskinput.value.trim()
 if(text){
    tasks.push({text: text, completed: false});
    taskinput.Value = "";
    updatetasklist();
    updatestats();
    savetasks();
 }

};

const savetasks = ()=>{
    localStorage.setItem('tasks' ,JSON.stringify(tasks))
}

const toggletask= (index)=>{
    tasks[index].completed = !tasks[index].completed;
    updatetasklist();
    updatestats();
    savetasks();
};

const deletetask = (index)=> {
    tasks.splice(index, 1);
    updatetasklist();
    updatestats();
    savetasks();
};
const edittask = (index)=> {
    taskinput.value = tasks[index].text
    tasks.splice(index,1)
    updatetasklist(); 
    updatestats();
}

const updatestats = ()=>{
    const  completetasks = tasks.filter(task => task.completed).length
    const totaltasks = tasks.length
    const progress = (completetasks/totaltasks)*100
    const progressbar = document.getElementById('progress')

    progressbar.style.width =`${progress}%` 
    document.getElementById('numbers').innerText = `${completetasks}/ ${totaltasks}`;
}

const updatetasklist = ()=>{
    tasklist.innerHTML = "";

     tasks.forEach((task, index) =>{
        const listitem = document.createElement("li");

        listitem.innerHTML= `
        <div class="taskitem">
    <div class="task ${task.completed ? "completed" : ""} ">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : "" } />
        <p>${task.text}</p>
    </div>
    <div class="icons">
        <img src="./edit.png" onclick="editTask(${index})" />
        <img src="./bin.png" onclick="deletetask(${index})" >
    </div>
</div>
`;
listitem.addEventListener("change", () => toggletask(index));
tasklist.append(listitem);


updatestats();


     });
    
};

btn.addEventListener('click',function(e){
    e.preventDefault()

    addtask();
})