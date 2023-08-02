import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { InstallmentTableComponent } from './components/installment-table/installment-table.component';

const routes: Routes = [
  // default router that will load all the transactions
  { path: '', component: TransactionTableComponent }, 

  // router that will load the installments for a specific transaction. 'transactionId' is a parameter that will be passed to the 
  // installment table component and will be used to fetch the installments for that specific transaction
  { path: 'installments/:transactionId', component: InstallmentTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
