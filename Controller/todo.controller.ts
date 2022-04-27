import  Todo  from "../Model/Todo";
import { v1 as uid} from 'uuid'
import { NextFunction, Request, RequestHandler, Response } from "express";
// interface TodoInterface{
//     todoId:string
//     TotoTitle:string;
//     Tododescription:string
// }

// interface is a typescript type this means that when we compile to JS
// i wont compile to Js But classes will because they are Part of ES6

const Todos:Todo[]=[]

 export const createTodo=(req:Request,res:Response,next:NextFunction)=>{
     const todoid=uid()
    const{todotitle,tododescription}= req.body as Todo
    const newTodo=new Todo(todoid,todotitle,tododescription)
    Todos.push(newTodo)

    res.status(200).json({
        "message":'User successfully added',
        newTodo
    })
}

export const getTodos:RequestHandler=(req,res,next)=>{
    res.json(Todos)   
}

export const getTodo:RequestHandler<{id:string}>=(req,res)=>{
 const id =req.params.id
 console.log(typeof id);
 
   const  todo = Todos.filter(X=>X.todoid===id)
    if(!todo[0]){
        res.json({message:`Todo with id :${id} Is Not Found`})
    }else{
        res.json(todo)
    }
   
   
}

export const updateTodo:RequestHandler<{id:string}>=(req,res)=>{
    const id =req.params.id
    const{todotitle,tododescription}= req.body as Todo
    const  todo = Todos.filter(X=>X.todoid===id)
    if(!todo[0]){
        res.json({message:`Todo with id :${id} Is Not Found`})
    }else{
        todo[0].todotitle=todotitle
        todo[0].tododescription=tododescription
    
        res.json(todo)
    }
  
}

export const deleteTodo:RequestHandler<{id:string}>= (req,res)=>{
    const id = req.params.id
     const index = Todos.findIndex(x=>x.todoid===id) 
     console.log(typeof index , index);
     
     if(index<0){
        res.json({message:`Todo with id :${id} Is Not Found`})
    }else{
        Todos.splice(index,1)
        res.json({message:`Todo with id :${id} is Deleted`})
    }
    
     
}