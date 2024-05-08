var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// i == index

let getTasks = [];

function ShowData() {
    let totalComplated = 0;
    document.getElementById("totalTask").textContent = tasks.length;
    removeChild();
    tasks.forEach((value, index) => {
        let logo = "radio_button_unchecked";
        if (value.Complated) {
            logo = 'check_circle';
            totalComplated++;
        }

        let list = document.createElement("div");
        list.className = "clear-both ";
        list.innerHTML = `<div class="flex bg-gray-100 my-1 z-10">
        <div class="flex items-center px-2">
        <button class="flex bg-none hover:text-green-500 ${value.Complated ? 'text-green-500' : 'text-cyan-500'}"  onclick="Complated(${index})">
            <span class="material-symbols-outlined text-2xl">
             ${logo}
            </span>
        </button>
        </div>
            <div class="w-full py-2">
                <input type="text" id="task${index}" class="font-medium outline-none w-full text-lg bg-transparent ${value.Complated ? "line-through" : ""} " readonly value = "${value.taskName}">
            </div>
            <div class="flex items-center mr-2">
            <button class="flex" onclick="showMenu(${index})">
            <span class="material-symbols-outlined text-lg" id="menuToggle${index}">
                expand_more
            </span>
            </button> 
        </div>
        </div>
        <div class="flex align-center hidden text-white w-full transition" id='menu${index}'>
            <button class="bg-red-400 w-1/3 p-2 flex content-center justify-center">
            <span class="material-symbols-outlined mr-1">
                    delete
            </span> Delete
            </button>
            <button class="bg-blue-400 w-1/3 p-2 flex items-center justify-center" onclick="update(${index})">
            <span class="material-symbols-outlined mr-1">
            edit
            </span>
            Update</button>
            <button class="bg-yellow-400 w-1/3 p-2 flex items-center justify-center">
            <span class="material-symbols-outlined mr-1">
            notifications_active
            </span>Reminder</button>
        </div>
        `;
        document.getElementById("totalComplated").textContent = totalComplated;
        document.getElementById("tasksList").appendChild(list);
    });
}
function addData() {
    let input = document.getElementById("inputTask").value;
    getTasks = tasks;
    getTasks.push({
        taskName: input.trim(),
        Complated: false,
    });
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    document.getElementById("inputTask").value = "";
    ShowData();
}

function removeChild() {
    var parentElement = document.getElementById("tasksList");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

// i == index

function removeTask(i) {
    getTasks = tasks;
    getTasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    ShowData();
}

function Complated(i) {
    getTasks = tasks;
    getTasks[i].Complated = true;
    localStorage.setItem('tasks', JSON.stringify(getTasks));
    ShowData();
}

document.querySelectorAll("#task").forEach((list, index) => {
    console.log(list);
    list.addEventListener("input", () => {
        alert(index);
        getTasks = tasks;
        getTasks[index].taskName = list.value;
        localStorage.setItem('tasks', JSON.stringify(getTasks));
        ShowData();
    })
})

function showMenu(i){
    let menu = document.getElementById("menu"+i);
    if(menu.classList.contains("hidden")){
        closeMenu();
        menu.classList.remove("hidden");
        document.getElementById("menuToggle"+i).textContent = "expand_less";
    }
    else{
        menu.classList.add("hidden");
        document.getElementById("menuToggle"+i).textContent = "expand_more";
    }
}

function update(i){
    getTasks = tasks;
    let taskInputBox = document.getElementById("task"+i);
    taskInputBox.removeAttribute('readonly');
    taskInputBox.pla = "";
    closeMenu();
    taskInputBox.focus();
}

function closeMenu(){
    for(let i=0; i<tasks.length; i++){
        document.getElementById("menu"+i).classList.add("hidden");
        document.getElementById("menuToggle"+i).textContent = "expand_more";    
    }
}

window.onload = function () {
    ShowData();
};