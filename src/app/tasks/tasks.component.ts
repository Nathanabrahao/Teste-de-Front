import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TasksDataSource, TasksItem } from './tasks-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TasksItem>;
  dataSource = new TasksDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private matDialog: MatDialog) { }

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
