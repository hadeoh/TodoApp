const addButton = document.querySelector('.btn-todo')
const tr = document.querySelector('#tr-todo')
const error = document.querySelector('.errormsg')
const input = document.querySelector('.add-todo')
const searchInput = document.querySelector('.search')
const search = document.querySelector('.btn-search')
// const arrayList = localStorage.getItem('items') || []
// console.log(arrayList);


function errorMessage(){
    setTimeout(() => {
        error.innerHTML = ''
    }, 2000)
}

function displayList(){
    const todos = JSON.parse(localStorage.getItem('items')) || []
    todos.forEach((todo, i) => {
    tr.innerHTML += `
    <tr>
        <td scope="row">${i + 1}</td>
        <td>${todo.text}</td>
        <td>${todo.time}</td>
        <td>
          <button class="ml-3 btn btn-primary" onClick =editItem(event) id="${todo.time}">Edit</button>
          <button class="ml-3 btn btn-danger" onClick =deleteItem(event) id="${todo.time}">Delete</button>
        </td>
      </tr>`
        
    });
 }

displayList()

function addItem(item){
    const arrayList = JSON.parse(localStorage.getItem('items')) || []
    
    const time = new Date();
    //let content = input.value;
    const todo = {}
    todo["time"] = time
    todo["text"] = item
    arrayList.unshift(todo)
    localStorage.setItem("items", JSON.stringify(arrayList));  
  }

addButton.addEventListener('click', function(e){
    e.preventDefault()
    if (input.value == ''){
        error.innerHTML = 'Input cannot be empty'
       return errorMessage()    
    }
    addItem(input.value)
    location.reload()  
})

  function deleteItem(event) {
    let prompt = confirm("Are you sure you want to delete this item");
    if(prompt){
        const todos = JSON.parse(localStorage.getItem('items')) || []
         const index = todos.findIndex(todo => todo.time == event.target.id)
         todos.splice(index,1)
         localStorage.setItem("items", JSON.stringify(todos)); 
    }
     location.reload();
  }

  function editItem(event) {
    addButton.innerHTML = 'Save';
    const todos = JSON.parse(localStorage.getItem('items')) || []
    const index = todos.findIndex(todo => todo.time == event.target.id)
    input.value = todos[index].text
    todos.splice(index,1)
    localStorage.setItem("items", JSON.stringify(todos)); 
  }

  searchInput.addEventListener('keyup', function(e){
      
        const todos = JSON.parse(localStorage.getItem('items')) || []

        const todoList = todos.filter(todo => {
          return todo.text.toLowerCase().startsWith(e.target.value.toLowerCase())
        })
    tr.innerHTML = '' 
    todoList.forEach((todo, i) => {
        tr.innerHTML += `
        <tr>
            <td scope="row">${i + 1}</td>
            <td>${todo.text}</td>
            <td>${todo.time}</td>
            <td>
              <button class="ml-3 btn btn-primary" onClick =editItem(event) id="${todo.time}">Edit</button>
              <button class="ml-3 btn btn-danger" onClick =deleteItem(event) id="${todo.time}">Delete</button>
            </td>
          </tr>`
            
        });

  })
