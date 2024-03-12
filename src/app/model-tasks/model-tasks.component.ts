import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-model-tasks',
  templateUrl: './model-tasks.component.html',
  styleUrl: './model-tasks.component.css'
})


export class ModelTasksComponent {
  usuario: string = '';
  tarefa: string = '';
  data: string = '';

  constructor(private http: HttpClient) { }

  salvar() {
    const coletaTask = {
      "usuario": this.usuario,
      "tarefa": this.tarefa,
      "data": Date.parse(this.data)
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'applicationId': 'seuNomeCompleto'
      })

    };


    this.http.post<any>('https://dynamic-tawny.vercel.app/tarefas', JSON.stringify(coletaTask), httpOptions)
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
