const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants")
const { ipcRenderer } = require("electron")

const nameCell = document.querySelector('#name-cell')
const emailCell = document.querySelector('#email-cell')
const passCell = document.querySelector('#pass-cell')
const birthCell = document.querySelector('#birth-cell')
const btn = document.querySelector('#btn')
const tableBody = document.querySelector('#table-body')



ipcRenderer.on('users',(e,users)=>{
    console.log('users', users)
    swal({
        title: 'User registered successfully',
        // text:'Usuario registrado con exito',
        icon:'success'
    })

    for(var i=0; i <users.length; i++){
        let row = `<tr>
                        <td>${users[i].name}</td>
                        <td>${users[i].email}</td>
                        <td>${users[i].pass}</td>
                        <td>${users[i].date}</td>
                   <tr/>`

            tableBody.innerHTML +=row
        
    }
})





