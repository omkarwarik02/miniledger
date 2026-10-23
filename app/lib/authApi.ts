 import { api } from "./api";
import { saveToken } from "./auth"

 export async function requestOtp(phone:string){
    
        return await api<{message:string}>("/auth/request-otp",{
            method:"POST",
            body:JSON.stringify({phone})
        })
    

    }

    export async function verifyOtp(phone:string,code:string){
        const { token }= await api<{token:string}>("/auth/verify-otp",{
            method:"POST",
            body:JSON.stringify({phone,code}),
        })
        await saveToken(token);

    }