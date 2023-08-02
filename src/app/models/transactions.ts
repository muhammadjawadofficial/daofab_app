// Model for transactions
export interface Transactions {
    id: number, // id of the transaction
    sender: string, // sender of the transaction
    receiver: string, // receiver of the transaction
    totalAmount: number, // total amount of the transaction
    totalPaidAmount: number, // total paid amount of the transaction
}
