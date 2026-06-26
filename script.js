let tasks = [];
const title = document.getElementById("title");
const subject = document.getElementById("subject");
const priority = document.getElementById("priority");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

const dateTime = document.getElementById("dateTime");
const darkMode = document.getElementById("darkMode");
          //add task part start
addTask.addEventListener("click", () => {
    if (title.value === "" || subject.value === "") {
        alert("Please fill all fields");
        return;
    }

    const task = {
        title: title.value,
        subject: subject.value,
        priority: priority.value,
        completed: false
    };
    tasks.push(task);

    title.value = "";
    subject.value = "";

    displayTasks(tasks);
});

         //display tasks starts
function displayTasks(taskArray) {
        taskList.innerHTML = "";
        taskArray.forEach((task, index) => {

               const card = document.createElement("div");
               card.className = task.completed ? "task completed" : "task";

        card.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Subject:</strong> ${task.subject}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong>${task.completed ? "Completed ✅" : "Pending ⏳"}</p>

            <div class="buttons">
                <button class="completeBtn" onclick="completeTask(${index})">${task.completed ? "Completed" : "Complete"}</button>

                <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
            </div>
          `;
        taskList.appendChild(card);
    });
    updateCounter();
}

           //complete task starts
 function completeTask(index){
    tasks[index].completed = true;
    displayTasks(tasks);
}

                //delete task starts
function deleteTask(index){
    tasks.splice(index,1);
    displayTasks(tasks);
}

             //filter task starts
function filterTasks(type){
    if(type==="all"){
        displayTasks(tasks);
    }
    else if(type==="completed"){
        let completedTasks = tasks.filter(task=>task.completed);
        displayTasks(completedTasks);
    }
    else{
        let pendingTasks = tasks.filter(task=>!task.completed);
        displayTasks(pendingTasks);
    }
}

              //Counter starts
function updateCounter(){
    total.textContent = tasks.length;
    completed.textContent =
    tasks.filter(task=>task.completed).length;
    pending.textContent =
    tasks.filter(task=>!task.completed).length;
}

             //date & time
function showDateTime(){
    let now = new Date();
    dateTime.innerHTML =
    "Today : " +
    now.toLocaleDateString() +
    " | " +
    now.toLocaleTimeString();
}
showDateTime();
setInterval(showDateTime,1000);

          //darkmode
darkMode.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
});