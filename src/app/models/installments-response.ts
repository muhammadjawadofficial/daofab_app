import { Installments } from "./installments";

// Model for installments response
export interface InstallmentsResponse {
    success: boolean; // success status of the response
    status: number; // status code of the response
    data: Installments[]; // array of installments
}
