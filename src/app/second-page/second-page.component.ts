import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  tagsInput: any;
  friendsInput: any;
  nameInput: any;
  isActive = false;
  filtered: any;
  displayedColumns: string[] = [
    'position',
    'name',
    'gender',
    'active',
    'company',
    'balance',
    'tags',
    'friends',
    'registered',
    'picture'
  ];
  dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  get getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  constructor(private quoteService: QuoteService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getGraphs().subscribe(resp => {
      this.isLoading = false;
      this.allUsers = resp.data;
      this.filtered = this.allUsers;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.sort = this.sort;
    });
  }

  public changed() {
    if (this.nameInput) {
      this.filtered = this.filtered.filter((elem: any) => {
        return elem.name.includes(this.nameInput);
      });
    }
    if (this.tagsInput) {
      this.filtered = this.filtered.filter((elem: any) => {
        return elem.tags.find((tag: any) => tag === this.tagsInput);
      });
    }

    if (this.friendsInput) {
      this.filtered = this.filtered.filter((elem: any) => {
        return elem.friends.find((tag: any) => tag.name.includes(this.friendsInput));
      });
    }
    if (!this.nameInput && !this.tagsInput && !this.friendsInput) {
      this.dataSource = new MatTableDataSource(this.allUsers);
    }
    if (this.filtered.length) {
      this.dataSource = new MatTableDataSource(this.filtered);
    } else {
      this.filtered = this.allUsers;
      this.dataSource = new MatTableDataSource(this.allUsers);
    }
    this.dataSource.sort = this.sort;
  }

  public setIsActive() {
    if (!this.isActive) {
      this.isActive = true;
      this.filtered = this.filtered.filter((elem: any) => {
        return elem.isActive;
      });
      this.dataSource = new MatTableDataSource(this.filtered);
    } else {
      this.filtered = this.allUsers;
      this.isActive = false;
      this.dataSource = new MatTableDataSource(this.filtered);
    }
  }

  public dateFunc(value: string) {
    return value.substring(0,value.indexOf('+'));
  }
}
