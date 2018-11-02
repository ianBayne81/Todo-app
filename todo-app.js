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

document.querySelector("#new-task-form").addEventListener("submit", (e) => {
    e.preventDefault()
    toDoList.unshift({
        id: uuidv4(),
        text: e.target.elements.newForm.value,
        completed: false,
    })
    saveToDoList(toDoList)
    renderList(toDoList, filters)
    e.target.elements.newForm.value = ''
})

document.querySelector("#check").addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderList(toDoList, filters)
}) 


    







