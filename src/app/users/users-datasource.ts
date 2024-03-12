import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// TODO: Replace this with your own data model type
export interface UsersItem {
  name: string;
  email: string;
  cargo: string;
  cpf: number;
  nascimento: number
};




// TODO: replace this with real data from your application
const EXAMPLE_DATA: UsersItem[] = [
];




/**
 * Data source for the Users view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersDataSource extends DataSource<UsersItem> {
  data: UsersItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private http: HttpClient) {
    super();
  }


  buscaDados() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'applicationId': 'seuNomeCompleto'
      })
    };

    if (this.http) {
      this.http.get<any>('https://dynamic-tawny.vercel.app/usuarios', httpOptions)
        .subscribe(
          response => {
            console.log('Resposta do servidor:', response);
            // Você pode adicionar aqui qualquer ação adicional após o sucesso da requisição
          },
          error => {
            console.error('Erro ao enviar requisição:', error);
            // Você pode adicionar aqui qualquer ação adicional para lidar com o erro
          }
        );
    }
  }
  


// Instantiate HttpClient before passing it to the constructor of UsersDataSource







/**
 * Connect this data source to the table. The table will only update when
 * the returned stream emits new items.
 * @returns A stream of the items to be rendered.
 */
connect(): Observable < UsersItem[] > {
  this.buscaDados();
  if(this.paginator && this.sort) {
  // Combine everything that affects the rendered data into one update
  // stream for the data-table to consume.
  return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
    .pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
} else {
  throw Error('Please set the paginator and sort on the data source before connecting.');
}
  }

/**
 *  Called when the table is being destroyed. Use this function, to clean up
 * any open connections or free any held resources that were set up during connect.
 */
disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UsersItem[]): UsersItem[] {
  if (this.paginator) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  } else {
    return data;
  }
}

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UsersItem[]): UsersItem[] {
  if (!this.sort || !this.sort.active || this.sort.direction === '') {
    return data;
  }

  return data.sort((a, b) => {
    const isAsc = this.sort?.direction === 'asc';
    switch (this.sort?.active) {
      case 'name': return compare(a.name, b.name, isAsc);
      case 'id': return compare(+a.name, +b.name, isAsc);
      default: return 0;
    }
  });
}
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


