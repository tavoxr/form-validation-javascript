const {app, BrowserWindow,Menu, ipcMain, ipcRenderer}  = require('electron')
const url = require('url')
const path = require('path')
const dev =  require('electron-reload')



let registerWindow
let usersWindow

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, 'node_modules', 'bin', 'electron')
    })

}


app.on('ready',()=>{
    registerWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
          }

    })

    registerWindow.loadFile('./src/Register.html')

})



function createUsersWindow(){
    usersWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }
    })

    usersWindow.loadFile('./src/Users.html')
    
}




const users= [
    {
        name:"Karla",
        email:'karla@gmail.com',
        pass:'12345678',
        date:'2021-07-23'
    },
    {
        name:"Mario",
        email:'mario@gmail.com',
        pass:'12345678Lm/',
        date:'2021-02-18'
    },
    {
        name:"Rosa",
        email:'rosa@gmail.com',
        pass:'12345678Lm/',
        date:'2021-05-24'
    }
]



const mess = "User already exists"


ipcMain.on('user',(e,user)=>{
   
    if(!userAlreadyExists(user)){   
        users.push(user)

        createUsersWindow()
        usersWindow.webContents.on('did-finish-load',()=>{
            usersWindow.webContents.send('users',users)
        })

        registerWindow.close()
        
    }else{
        registerWindow.webContents.send('message',mess)
    }
    
// console.log('users',users)


})



const userAlreadyExists = (user)=>{

    for(var i=0; i < users.length; i++){
        if(user.name.toLowerCase() === users[i].name.toLowerCase() ){
            return true
        }else if(user.email.toLowerCase() === users[i].email.toLowerCase()){
            return true
        }

        
    }

}