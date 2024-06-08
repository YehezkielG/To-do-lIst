var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// i == index

let getTasks = []

function ShowData(filter) {
    let totalcompleted = 0;
    document.getElementById("totalTask").textContent = tasks.length;
    removeChild();
        getTasks = tasks;
    getTasks.forEach((value, index) => {
        let logo = "radio_button_unchecked";
        if (value.completed) {
            logo = 'check_circle';
            totalcompleted++;
        }
        let list = document.createElement("div");
        list.className = "clear-both";
        list.innerHTML = `
        <div class="flex bg-gray-100 my-1 z-10 shadow-sm">
        <div class="flex items-center px-2">
        <button class="flex bg-none hover:text-green-500 ${value.completed ? 'text-green-500' : 'text-cyan-500'}"  onclick="completed(${index})">
            <span class="material-symbols-outlined text-2xl">
             ${logo}
            </span>
        </button>
        </div>
            <div class="w-full py-2">
                <input type="text" id="task${index}" class="font-medium outline-none w-full text-lg bg-transparent ${value.completed ? "line-through" : ""} " readonly value = "${value.taskName}" placeholder="Can't edit task to empty">
            </div>
            <div class="flex items-center">
            <button class="flex items-center h-full px-2 text-white hidden bg-blue-500" id="checklogo${index}" onclick="update(${index})">
            <span class="material-symbols-outlined text-lg">
            check
            </span>
            </button>
            <button class=" flex items-center px-2" onclick="${value.completed ? `removeTask(${index})` : `showMenu(${index})`}" id="sidebtn${index}"">
           <span class="material-symbols-outlined text-lg" id="menuToggle${index}">
               ${value.completed ?  "close" : "expand_more"}
           </span>
           </button>  
        </div>
        
        </div>
        <div class="hidden text-white w-full transition" id='menu${index}'>
        <div class="flex align-center">
        <button class="bg-red-400 w-1/3 p-2 flex content-center justify-center max-sm:block" onclick="removeTask(${index})" >
        <span class="material-symbols-outlined mr-1 max-sm:m-0 block">
                delete
        </span>             
        </button>
        <button class="bg-blue-400 w-1/3 p-2 flex items-center justify-center max-sm:block" onclick="updateInput(${index})">
        <span class="material-symbols-outlined mr-1 max-sm:m-0 block">
        edit
        </span>
        </button>
        <button class="bg-yellow-400 w-1/3 flex items-center justify-center max-sm:block">
                <input type="datetime-local" class="outline-none border-none w-2 bg-transparent dateTimeCostom absolute" oninput="inputDateTime(${index},this)">
        <span class="material-symbols-outlined mr-1 max-sm:m-0 block">
            notifications_active
        </span>
        </button>
        </div>
        <div class="">
        </div>
        </div>

                 ${!value.completed ? `<small class='w-full' id='ShowDateTime${index}'>${value.DateTime.split('T').join(' ')}</small>` : ``}
`
        ;
        document.getElementById("totalCompleted").textContent = totalcompleted;
        document.getElementById("tasksList").appendChild(list);
    });
}

function addData() {
    let input = document.getElementById("inputTask").value;
    if (input == "") {
        document.getElementById("invalid").classList.remove("hidden");
    } else {
        getTasks = tasks;
        getTasks.push({
            taskName: input.trim(),
            completed: false,
            DateTime:""
        });
        localStorage.setItem('tasks', JSON.stringify(getTasks));
        document.getElementById("inputTask").value = "";
        document.getElementById("invalid").classList.add("hidden");
        ShowData();
    }
}

function removeChild() {
    var parentElement = document.getElementById("tasksList");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

// i == index

function removeTask(i) {
    closeMenu();
    getTasks = tasks;
    getTasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    ShowData();
}

function completed(i) {
    getTasks = tasks;
    getTasks[i].completed = true;
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    ShowData();
}


function showMenu(i) {
    let menu = document.getElementById("menu" + i);
    if (menu.classList.contains("hidden")) {
        closeMenu();
        menu.classList.remove("hidden");
        document.getElementById("menuToggle" + i).textContent = "expand_less";
    }
    else {
        menu.classList.add("hidden");
        document.getElementById("menuToggle" + i).textContent = "expand_more";
    }
}

function updateInput(i) {
    closeMenu();
    let taskInputBox = document.getElementById("task" + i);
    taskInputBox.removeAttribute('readonly');
    taskInputBox.focus();
    document.getElementById("checklogo"+i).classList.remove("hidden");
    document.getElementById("sidebtn" + i).classList.add("hidden");
}

function closeMenu() {
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById("menu" + i).classList.add("hidden");
        if(document.getElementById("menuToggle" + i).textContent == "expand_less"){
            document.getElementById("menuToggle" + i).textContent = "expand_more";
        }
        document.getElementById("sidebtn" + i).classList.remove("hidden");
        document.getElementById("checklogo"+i).classList.add("hidden");
        document.getElementById("task"+i).readOnly = true;
    }
}

function update(i){
    let edit = document.getElementById("task"+i).value;
    if(edit != ""){
    getTasks = tasks;
    getTasks[i].taskName = edit;
    localStorage.setItem('tasks',JSON.stringify(getTasks));
    document.getElementById("checklogo"+i).classList.add("hidden");
    document.getElementById("sidebtn" + i).classList.remove("hidden");
    }
    else{        
    ShowData();
    }
    closeMenu();
}

function inputDateTime(i,This){
    document.getElementById("ShowDateTime"+i).textContent = This.value.split('T').join(' ');
    console.log(This.value);
    getTasks = tasks;
    getTasks[i].DateTime= This.value;
    localStorage.setItem("tasks",JSON.stringify(getTasks));
    notification();
}

window.onload = function () {
    notification();
    ShowData();
};

let taskCategory = document.querySelectorAll("#TaskCategory");

taskCategory.forEach((ul,index)=>{
    ul.addEventListener("click",()=>{
        taskCategory.forEach((ul)=>{
            ul.classList.remove("bg-gray-100");
            ul.classList.remove("text-blue-700");    
        })
        if(index == 1){
            ShowData(false);
        }
        else if(index == 2){
            ShowData(true);
        }
        else{
            ShowData();
        }
        ul.classList.add("bg-gray-100");
        ul.classList.add("text-blue-700");
    })
})

//notification
function notification(){
    getTasks = tasks.filter(task => task.DateTime != "").forEach((task)=>{
        scheduleNotification(task.DateTime,task.taskName);
    });
}


function getDelayUntil(dateTime) {
    const targetTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
    return targetTime - currentTime;
}

function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification("Complete your task!",{
            body:`${message}`,
            icon:"icon.png",
        });
    } else {
        alert(message);
    }
}

function scheduleNotification(dateTime, message) {
    const delay = getDelayUntil(dateTime);
    if (delay > 0) {
        setTimeout(() => {
            showNotification(message);
        }, delay);
    } 
}

function requestNotificationPermission() {
    // Cek apakah Notification API didukung oleh browser
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
    } else if (Notification.permission !== 'granted') {
        // Meminta izin dari pengguna
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('Notification permission granted.');
            }
        });
    }
}

// Meminta izin notifikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', requestNotificationPermission);