import { RequestHandler } from "express";


export const Allow:RequestHandler=(req,res,next)=>{
 const token=req.headers['tokens']

 if(!token){
     return res.json({error: 'Not authorized to access this route no token found'})
 }
 if(token!=='secret'){
    return res.json({error: 'Wrong Token'})
 }

 next()
}