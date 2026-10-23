import { api } from "./api";

export type Loan = {
    id:number;
    friend_name:string;
    amount:number;
    due_date:string;
    repaid_at:string | null;
    is_overdue?:boolean;
};
export type Summary = {
    totalLent : number;
    totalRepaid:number;
    overdueAmount:number;
};


export function createLoan(friendName:string,amount:number, dueDate:string){
    return api<Loan>("/loans",{
        method:"POST",
        body:JSON.stringify({ friendName,amount, dueDate}),
    });
}
export function getSummary(){
    return api<Summary>("/loans/summary");
}
export function getLoans(){
    return api<Loan[]>("/loans")
}
export function repayLoan(id:number){
    return api<Loan>(`/loans/${id}/repay`,{
        method:"PATCH"
    });
}
export function deleteLoan(id:number){
    return api<Loan>(`/loans/${id}`,{
        method:"DELETE"
    });
}