import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TasksDataSource, TasksItem } from './tasks-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { ModelTasksComponent } from '../model-tasks/model-tasks.component';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TasksItem>;
  dataSource: TasksDataSource;

  displayedColumns: string[] = ['usuario', 'tarefa', 'data', 'comandos'];

  constructor(private matDialog: MatDialog, private http: HttpClient) {
    this.dataSource = new TasksDataSource(http);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.connect(); // Connect the data source after setting paginator and sort
  }

  openDialogTask() {
    this.matDialog.open(ModelTasksComponent, {
      width: '60%'
    });
  }

  editDialog() {
    this.matDialog.open(ModelTasksComponent, {
      width: '60%'
    });
  }
}
