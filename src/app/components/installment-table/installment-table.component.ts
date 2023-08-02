import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Installments } from 'src/app/models/installments';
import { InstallmentsResponse } from 'src/app/models/installments-response';
import { InstallmentsApiService } from 'src/app/services/installments-api.service';

@Component({
  selector: 'app-installment-table',
  templateUrl: './installment-table.component.html',
  styleUrls: ['./installment-table.component.scss']
})
export class InstallmentTableComponent implements OnInit {

  constructor(
    // API services that will be used to fetch the data from the backend
    private installmentsApiService: InstallmentsApiService,
    // ActivatedRoute will be used to get the transactionId from the URL
    private route: ActivatedRoute,
    // Router will be used to navigate to the transactions page
    private router: Router
  ) { }

  // The columns that will be displayed in the table
  displayedColumns: string[] = ['id', 'sender', 'receiver', 'totalAmount', 'paidAmount'];
  // The data source that will be used to populate the table
  dataSource: MatTableDataSource<Installments> = new MatTableDataSource<Installments>();
  // isLoading will be used to show a loading progressbar while the data is being fetched from the backend
  isLoading = false;
  // totalRows will be used to show the total number of installments, and for the pagination
  totalRows = 0;
  // sortBy will be used to show the column that the installments will be sorted by. The default value is id
  sortBy = 'id';
  // sortOrder will be used to show the order that the installments will be sorted by. The default value is asc
  sortOrder = 'asc';

  // The following two decorators are used to get the paginator and sort instances from the template  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    // The following line is used to set the sort instances to the dataSource
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // The following line is used to load the data for the first time when the component is initialized with the default values
    this.loadData();
  }

  // The following function is used to load the data from the backend
  loadData() {
    // The following line is used to show the loading progressbar
    this.isLoading = true;
    // The following line is used to empty the data source
    this.dataSource.data = [];
    // The following line is used to get the transactionId from the URL
    const transactionId = this.route.snapshot.paramMap.get('transactionId');

    // If the transactionId is not present in the URL, then navigate to the transactions page
    if (!transactionId) {
      // The following line is used to navigate to the transactions page
      this.router.navigate(['/transactions']);
      // The following line is used to stop the execution of the function
      return;
    }

    // The following line is used to get the installments of a specific transaction using transactionId from the backend using the installmentsApiService
    this.installmentsApiService.getInstallments(+transactionId).subscribe({
      next: (response: InstallmentsResponse) => {
        // The following line is used to set the data source with the response data
        this.dataSource.data = response.data;
        // The following line is used to set the totalRows with the response data length
        this.totalRows = response.data.length;
      },
      error: (error) => {
        // The following line is used to log the error in the console
        console.log(error);
      },
      complete: () => {
        // The following line is used to hide the loading progressbar
        this.isLoading = false;
      }
    });
  }
}
