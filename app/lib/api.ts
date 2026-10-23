// fetch wrapper that adds the auth token
import { getToken } from "./auth";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function api<T>(path:string, options:RequestInit = {}):Promise<T>{
    const token = await getToken();

    const res = await fetch(`${BASE_URL}${path}`,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            ...(token ? {Authorization:`Bearer ${token}`}:{} ),
            ...options.headers,
        },
    });
    const data = await res.json().catch(()=>({}));

    if(!res.ok){
        throw new Error(data?.error ?? `Request failed (${res.status})`);
    }
    return data as T
}