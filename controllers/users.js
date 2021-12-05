import { info } from 'console';
import { v4 as uuidv4} from 'uuid';
import logger from '../config/logger.js'

//log functions
const infoLog = (req) =>{
    logger.info(`User reached successfully to -> ${req.method} users${req.url}`)
}

const errorLog = (req,res) => {
    logger.error(`User could not reach to -> ${req.method} users${req.url} and got error -> ${res.statusCode} `)
}

//this array will act as db 
const users = [
    {
        "firstName": "Ecem",
        "lastName": "Altınel",
        "age": 25,
        "id": "55f85249-01d6-4312-ad4c-6ab55fc91334"
    }
];

//controllers

export const getUsers = (req,res)=>{
    infoLog(req)
    res.send(users)
}

export const getUserbyId = (req,res)=>{
    const id  = req.params.id
    const found = users.find((user)=>user.id==id)
    if(found == undefined){
        res.status(404).send("No such user found")
        errorLog(req,res)
    }
    else {
        infoLog(req)
        res.status(200).send(found)
    }
     
}

export const createUser = (req,res)=>{
    var newUserIds = []
    for (const user of req.body) {
        const _user = user
        //uuid module ensures to create unique ids each time. It uses timestamps to create id
        const _userId = uuidv4()
        users.push({..._user, id: _userId })
        newUserIds.push(_userId)
    }
    infoLog(req)
    res.send(`User added to database with id ${newUserIds.join(",")}`)
}

export const deleteUserbyId = (req,res)=>{
    const id = req.params.id
    const indexOfUser = users.findIndex((user)=>user.id==id)

    if(indexOfUser == -1){
        errorLog(req,res)
        res.status(400).send("No such user found")
    }
    else{
        users.splice(indexOfUser,1)
        res.status(200).send("User deleted") 
        infoLog(req)
    }
    
}

export const changeUserbyId = (req,res)=>{
    const id = req.params.id
    const {firstName, lastName, age} = req.body
    const user = users.find((user)=>user.id==id) 

    const patch = (user) =>{
        if(firstName) user.firstName = firstName
        if(lastName) user.lastName = lastName
        if(age) user.age = age
    }

    if(user == undefined){
        errorLog(req,res)
        res.status(400).send("No such user found")

    }
    else{
        patch(user); 
        res.status(200).send(`User info changed as ${JSON.stringify(user)}`) 
        infoLog(req)
    }

}

export const updateUserbyId = (req,res) =>{
    const id = req.params.id
    const body = req.body
    const newUser = {...body,id}
    const indexOfUser = users.findIndex((user)=>user.id==id)
    if(indexOfUser==-1){
        errorLog(req,res)
        res.status(400).send("No such user found")
    }
    else{
        users[indexOfUser] = newUser
        res.status(200).send(`User info updates as ${JSON.stringify(newUser)}`) 
        infoLog(req)
    }
}
