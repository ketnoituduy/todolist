const input = document.querySelector('form input')
const button = document.querySelector('button')
let list = document.querySelector('.list')
let form = document.querySelector('form')

button.addEventListener('click',(e)=>{
    let value = input.value.trim();
    if (value){
        adElement({
            text:value
        })
        saveData()
    }
    input.value = ''
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let value = input.value.trim();
    if (value){
        adElement({
            text:value
        })
        saveData()
    }
    input.value = ''
})

function adElement(todo){
    let li = document.createElement('li');
    li.innerHTML = `<input type="text" readonly value="${todo.text}">
    <i class='bx bxs-edit' ></i>
    <i class='bx bxs-trash'></i>`;
    if(todo.status === 'completed'){
        li.querySelector('input').setAttribute('class','completed')
        saveData()
    }
    li.querySelector('input').addEventListener('click',function(){
        this.classList.toggle('completed')
        saveData()
    })
    li.querySelector('.bxs-trash').addEventListener('click',(e)=>{
        li.remove();
        saveData()
    })
    li.querySelector('.bxs-edit').addEventListener('click',(e)=>{
        li.querySelector('input').readOnly = false
        saveData()
    })
    list.appendChild(li);
}

function saveData(){
    let storage = []
    list.querySelectorAll('li').forEach(item=>{
        let text = item.querySelector('input').value;
        let status = item.querySelector('input').getAttribute('class');
        storage.push({
            text:text,
            status:status
        })
    })
    localStorage.setItem('todolist',JSON.stringify(storage))
    console.log(localStorage.getItem('todolist'))
}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'));
    if (data){
        data.forEach(item=>{
            adElement({
                text: item.text,
                status: item.status
            })
        })
    }
}
init()