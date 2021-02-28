const {ipcRenderer} = require('electron')
const form = document.querySelector('.form')
const userName =  document.querySelector('#name')
const email = document.querySelector('#email')
const password1 = document.querySelector('#password')
const password2  =    document.querySelector('#password-confirm')
const date= document.querySelector('#birthDate')
const btnSubmit = document.querySelector('.btn-submit')



// const users= [
//     {
//         name:"Karla",
//         email:'karla@gmail.com',
//         pass:'12345678',
//         date:'2021-07-23'
//     }
// ]

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const user = {
        name: userName.value,
        email: email.value,
        pass: password1.value,
        date: date.value
    }
     
    ipcRenderer.send('user',user)
       
})



ipcRenderer.on('message',(e,mess)=>{

     
swal({
    title: 'This user already exists, please try again',
    // text:'',
    icon:'warning'
})
    console.log('mess',mess)
    reset()
})





const reset=()=>{
    userName.value = ""
    email.value = ""
    password1.value = ""
    password2.value = ""
    date.value = ""



}