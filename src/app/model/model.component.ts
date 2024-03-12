import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})


export class ModelComponent {
  nome: string = '';
  email: string = '';
  cargo: string = '';
  cpf: string = '';
  data: string = '';

  constructor(private http: HttpClient) {}

  salvar() {
    const coleta = {
      "name": this.nome,
      "email": this.email,
      "cargo": this.cargo,
      "cpf": this.cpf,
      "nascimento": Date.parse(this.data)
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'applicationId': 'seuNomeCompleto'
      })
      
    };


    this.http.post<any>('https://dynamic-tawny.vercel.app/usuarios', JSON.stringify(coleta), httpOptions)
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
