
// Read existing notes from local storage,

const getSavedTasks = function () {
    toDoListJSON = localStorage.getItem("toDoList")

    if (toDoListJSON !== null) {
        return JSON.parse(toDoListJSON)
    } else {
        return []
    }
}

// Save toDoList data

const saveToDoList = function (toDoList) {
    localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

// Render toDoList 

const renderList = function (toDoList, filters) {
    const search = toDoList.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    }) 

    const notComplete = search.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector("#tasks").innerHTML = ""
    document.querySelector("#tasks").appendChild(generateSummaryDOM(notComplete)) 
    
    search.forEach(function (toDo) {
     document.querySelector("#tasks").appendChild(generateToDoDOM(toDo))
    })
}

// remove todo button function,

const removeButton = function (id) {
    const todoIndex = toDoList.findIndex(function (todo) {
    return todo.id === id
    })
    
    if (todoIndex > -1) {
        toDoList.splice(todoIndex, 1)
    }
}
    
// generate the todo DOM,

const generateToDoDOM = function (todo) {
    const todoEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const todoText = document.createElement("span")
    const button = document.createElement("button")
    
    // Setup todo checkbox,
    checkbox.setAttribute("type", "checkbox")
    todoEl.appendChild(checkbox)

    // Setup todo text,
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup removeButton,
    button.textContent = "x"
    todoEl.appendChild(button)
    button.addEventListener("click", function (e) {
        removeButton(todo.id)
        saveToDoList(toDoList)
        renderList(toDoList, filters)
    })

    return todoEl
}

// get the DOM's element for list summary,

const generateSummaryDOM = function (notComplete) {
    const summary = document.createElement("h4")
    summary.textContent = `You have ${notComplete.length} uncompleted tasks left to complete!`
    return summary
}