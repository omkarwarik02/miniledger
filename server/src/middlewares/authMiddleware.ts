import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

declare global{
    namespace Express{
        interface Request {
            userId?:number
        }
    }
}

export function requireAuth(req:Request, res:Response, next:NextFunction){

const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ error: "Missing token"})
}

const token = authHeader.split(" ")[1];

try{
const decodeToken = jwt.verify(token, config.jwtSecret) as {userId:number};
req.userId = decodeToken.userId
next();
} catch(err){
 return res.status(401).json({ error: "Invalid or expired token"})
}

}