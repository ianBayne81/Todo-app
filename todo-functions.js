'use strict'

// Fetch existing notes from local storage,

const getSavedTasks = () => {
    const toDoListJSON = localStorage.getItem('toDoList')

    try {
        return toDoListJSON ? JSON.parse(toDoListJSON) : []
    } catch (e) {
        return []
    }
}
    
// Save toDoList data

const saveToDoList = (toDoList) => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}

// toggle check box to change todo to completed

const toggleBox = (id) => {
    const todo = toDoList.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
} 

// remove todo button function,

const removeButton = (id) => {
    const todoIndex = toDoList.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        toDoList.splice(todoIndex, 1)
    }
}

// Render toDoList 

const renderList = (toDoList, filters) => {
    const search = toDoList.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    }) 

    const notComplete = search.filter((todo) => !todo.completed)

    document.querySelector("#tasks").innerHTML = ""
    document.querySelector("#tasks").appendChild(generateSummaryDOM(notComplete)) 
    
    search.forEach((toDo) => {
     document.querySelector("#tasks").appendChild(generateToDoDOM(toDo))
    })
}

// generate the todo DOM,

const generateToDoDOM = (todo) => {
    const todoEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const todoText = document.createElement("span")
    const button = document.createElement("button")
    
    // Setup todo checkbox,
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener("change", (e) => {
        toggleBox(todo.id)
        saveToDoList(toDoList)
        renderList(toDoList, filters)
    })

    // Setup todo text,
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup removeButton,
    button.textContent = "x"
    todoEl.appendChild(button)
    button.addEventListener("click", (e) => {
        removeButton(todo.id)
        saveToDoList(toDoList)
        renderList(toDoList, filters)
    })

    return todoEl
}

// get the DOM's element for list summary,

const generateSummaryDOM = (notComplete) => {
    const summary = document.createElement("h4")
    summary.textContent = `You have ${notComplete.length} uncompleted tasks left to complete!`
    return summary
}