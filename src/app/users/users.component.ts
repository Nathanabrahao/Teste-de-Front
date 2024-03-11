import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersDataSource, UsersItem } from './users-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from './model/model.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // corrected styleUrl to styleUrls
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsersItem>;
  dataSource = new UsersDataSource();


  displayedColumns = ['name', 'email', 'cargo', 'cpf', 'nascimento', 'comandos'];

  constructor(private matDialog: MatDialog) { } // Removed incorrect parenthesis

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openDialog() { // Define openDialog outside the constructor
    this.matDialog.open(ModelComponent, {
      width: '60%'
    });
  }

  editDialog(){
    this.matDialog.open(ModelComponent, {
      width: '60%'
    });
  }



}
