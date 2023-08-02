import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/models/transactions';
import { TransactionsResponse } from 'src/app/models/transactions-response';
import { TransactionApiService } from 'src/app/services/transaction-api.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  constructor(
    // TransactionApiService is the service that will be used to fetch the transactions from the backend
    private transactionApiService: TransactionApiService,
    // Router will be used to navigate to the installments page
    private router: Router
  ) { }

  // The columns that will be displayed in the table
  displayedColumns: string[] = ['id', 'sender', 'receiver', 'totalAmount', 'totalPaidAmount'];
  // The data source that will be used to populate the table
  dataSource: MatTableDataSource<Transactions> = new MatTableDataSource<Transactions>();
  // isLoading will be used to show a loading progressbar while the data is being fetched from the backend
  isLoading = false;
  // totalRows will be used to show the total number of transactions, and for the pagination
  totalRows = 0;
  // pageSize will be used to show the number of transactions per page, and for the pagination. The default value is 2 as mentioned in the requirements
  pageSize = 2;
  // currentPage will be used to show the current page number, and for the pagination. The default value is 0
  currentPage = 0;
  // pageSizeOptions will be used to show the number of transactions per page, and for the pagination. The default options are 2, 4, and 6
  pageSizeOptions: number[] = [2, 4, 6];
  // sortBy will be used to show the column that the transactions will be sorted by. The default value is id
  sortBy = 'id';
  // sortOrder will be used to show the order that the transactions will be sorted by. The default value is asc
  sortOrder = 'asc';

  // The following two decorators are used to get the paginator and sort instances from the template
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    // The following two lines are used to set the paginator and sort instances to the dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // The following line is used to load the data for the first time when the component is initialized with the default values
    this.loadData();
  }

  // This function is used to fetch the transactions from the backend
  loadData() {
    // options is a string that will be used to pass the query parameters to the backend
    const options = "?page=" + this.currentPage + "&pageSize=" + this.pageSize + "&sortBy=" + this.sortBy + "&sortOrder=" + this.sortOrder;
    // isLoading is set to true to show the loading progressbar
    this.isLoading = true;
    // The following line is used to clear the data source before loading the new data
    this.dataSource.data = []
    // The following line is used to fetch the transactions from the backend
    this.transactionApiService.getTransactions(options)
      .subscribe({
        next: (response: TransactionsResponse) => {
          // The following line is used to set the data source with the fetched transactions
          this.dataSource.data = response.data;
          // The following line is used to set the totalRows with the total number of transactions fetched from the backend
          this.totalRows = response.totalRecords;
          // The following line is used to set the current page with the current page number and the paginator length with the total number of transactions
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.totalRows;
          });
        },
        error: (error) => {
          // The following line is used to log the error to the console in case of an error
          console.log(error);
        },
        complete: () => {
          // isLoading is set to false to hide the loading progressbar
          this.isLoading = false;
        }
      });
  }

  // The following function is used to handle the page change event
  pageChanged(event: PageEvent) {
    // The following lines are used to set the pageSize and currentPage with the new values
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // The following line is used to load the data with the new values
    this.loadData();
  }

  // The following function is used to handle the row click event
  handleClick(row: Transactions) {
    // The following line is used to navigate to the installments page with the transaction id as a parameter
    this.router.navigate(['/installments', row.id]);
  }

  // The following function is used to handle the sort change event
  announceSortChange(sortState: Sort) {
    // The following lines are used to set the sortBy and sortOrder with the new values
    this.sortBy = sortState.active;
    if (sortState.direction) {
      this.sortOrder = sortState.direction;
    } else {
      this.sortOrder = 'asc';
    }
    // The following line is used to load the data with the new values
    this.loadData();
  }
}
