import { Component, OnInit, ViewChild } from '@angular/core';
import { QuoteService } from './quote.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {
  isLoading = false;
  allUsers: any;
  displayedColumns: string[] = ['position', 'name', 'gender', 'active', 'company', 'balance', 'tags', 'friends', 'registered', 'picture'];
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getGraphs().subscribe(resp => {
      this.isLoading = false;
      this.allUsers = resp.data;
      this.dataSource = new MatTableDataSource( resp.data);
      this.dataSource.sort = this.sort;
    });
  }
}
