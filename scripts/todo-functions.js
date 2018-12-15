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

const removeTodo = (id) => {
    const todoIndex = toDoList.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        toDoList.splice(todoIndex, 1)
    }
}

// Render toDoList 

const renderList = (toDoList, filters) => {
    const todoEl = document.querySelector("#tasks")
    const search = toDoList.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    }) 

    const notComplete = search.filter((todo) => !todo.completed)

    todoEl.innerHTML = ""
    todoEl.appendChild(generateSummaryDOM(notComplete))
    
    if (search.length > 0) {
        search.forEach((toDo) => {
            todoEl.appendChild(generateToDoDOM(toDo))
            })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'no to-dos to show'
        todoEl.appendChild(messageEl)
    }
    
}

// generate the todo DOM,

const generateToDoDOM = (todo) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const todoText = document.createElement("span")
    const removeButton = document.createElement("button")
    
    // Setup todo checkbox,
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", (e) => {
        toggleBox(todo.id)
        saveToDoList(toDoList)
        renderList(toDoList, filters)
    })

    // Setup todo text,
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //setup container

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup removeButton,
    removeButton.textContent = "remove"
    removeButton.classList.add("button", "button--text")
    todoEl.appendChild(removeButton)
    removeButton.addEventListener("click", (e) => {
        removeTodo(todo.id)
        saveToDoList(toDoList)
        renderList(toDoList, filters)
    })

    return todoEl
}

// get the DOM's element for list summary,

const generateSummaryDOM = (notComplete) => {
    const summary = document.createElement("h4")
    const plural = notComplete.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${notComplete.length} uncompleted todo${plural}`
    
    return summary
}