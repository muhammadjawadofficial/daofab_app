import { Transactions } from "./transactions";

// Model for transactions response
export interface TransactionsResponse {
    status: number;  // status code of the response
    success: boolean; // success status of the response
    totalRecords: number; // total number of records
    data: Transactions[]; // array of transactions
}
