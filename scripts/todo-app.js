'use strict'

const toDoList = getSavedTasks()

const filters = {
    searchText: "",
    hideCompleted: false,
}

renderList(toDoList, filters) 

document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderList(toDoList, filters)
})


// trim input
// only add todo if content is greater than 0

document.querySelector("#new-task-form").addEventListener("submit", (e) => {
    const text = e.target.elements.newForm.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        toDoList.unshift({
            id: uuidv4(),
            text: text,
            completed: false,
        })
        saveToDoList(toDoList)
        renderList(toDoList, filters)
        e.target.elements.newForm.value = ''
    
    } else {
        return " Error: must enter a character"
    }
    
})

document.querySelector("#check").addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderList(toDoList, filters)
}) 


    







