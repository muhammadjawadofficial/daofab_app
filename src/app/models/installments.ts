// Model for installments
export interface Installments {
    id: number; // id of the installment
    paidAmount: number; // paid amount of the installment
    parentId: number; // transaction id of the installment
    sender: string; // sender of the installment
    receiver: string; // receiver of the installment
    totalAmount: number; // total amount of the transaction
}
