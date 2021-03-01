const {ipcRenderer} = require('electron')
const form = document.querySelector('.form')
const userName =  document.querySelector('#name')
const email = document.querySelector('#email')
const password1 = document.querySelector('#password')
const password2  =    document.querySelector('#password-confirm')
const date= document.querySelector('#birthDate')
const btnSubmit = document.querySelector('.btn-submit')


form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const exprEmail = RegExp("([a-zA-Z0-9]*)\@([a-zA-Z0-9]*)\.([a-zA-Z0-9]){3}")
    const exprPass = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}')
    let emailValidated = false
    let passValidated = false

    if(userName.value === ""){
        swal({
            title:'Invalid Username',
            text:'Enter a  Username',
            icon:'warning'
        })
    }

    //=======================================email Validation=====================================
    if(!email.value.match(exprEmail)){
        swal({
            title:'Invalid Email, must be name@email.com',
            icon:'warning'
        })
    }else{
        emailValidated = true
    }

    //====================================Password Validation=================================
    if(!password1.value.match(exprPass)){
        swal({
            title:'Invalid Password  ',
            text: 'Your password must contain at least 8 characters, 1 capital Letter, 1 lowercase and 1 special character.',
            icon:'warning'
        })  
    }else{
        passValidated = true
    }


    if(password1.value !== password2.value){
        swal({
            title:"Password doesn't match",
            icon:'warning'
        })
        passValidated =false
    }else{
        passValidated =true
    }
    
   
    if(date.value === ""){
        swal({
            title:'Invalid date',
            text:'Enter a date',
            icon:'warning'
        })
    }
   

    if((emailValidated && passValidated) && (date.value !=="" && userName.value !== "")){
        const user = {
            name: userName.value,
            email: email.value,
            pass: password1.value,
            date: date.value
            }
        ipcRenderer.send('user',user)

    }    
    

       
})



ipcRenderer.on('message',(e,mess)=>{

swal({
    title: 'This user already exists, please try again',
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