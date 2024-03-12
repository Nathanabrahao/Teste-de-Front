import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersDataSource } from '../users/users-datasource'

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

  constructor(private http: HttpClient) { }

  validarEmail(email: string): boolean {
    // Expressão regular para validar o formato de e-mail
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(this.email);
  }


  salvar() {
    const coleta = {
      "name": this.nome,
      "email": this.email,
      "cargo": this.cargo,
      "cpf": this.cpf,
      "nascimento": Date.parse(this.data)
    };

    this.validarEmail(this.email)

    if (this.email) {
      console.log("O e-mail é válido.");
    } else {
      console.log("O e-mail não é válido.");
    }

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


