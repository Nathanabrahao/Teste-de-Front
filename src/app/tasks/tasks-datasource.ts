import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as observableOf, merge } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface TasksItem {
  usuario: string;
  tarefa: string;
  data: number;
}

const EXAMPLE_DATA: TasksItem[] = [];

export class TasksDataSource extends DataSource<TasksItem> {
  data: TasksItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private http: HttpClient) {
    super();
  }

  connect(): Observable<TasksItem[]> {
    this.buscaDados();
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => this.getPagedData(this.getSortedData([...this.data]))));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private buscaDados() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'applicationId': 'seuNomeCompleto'
      })
    };

    this.http.get<TasksItem[]>('https://dynamic-tawny.vercel.app/tarefas', httpOptions)
      .subscribe(
        response => {
          console.log('Resposta do servidor:', response);
          this.data = response;
        },
        error => {
          console.error('Erro ao enviar requisição:', error);
        }
      );
  }

  private getPagedData(data: TasksItem[]): TasksItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: TasksItem[]): TasksItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'usuario': return compare(a.usuario, b.usuario, isAsc);
        case 'data': return compare(a.data, b.data, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
