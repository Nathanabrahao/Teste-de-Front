import { Component } from '@angular/core';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {

}

export class adiciona {
  private inputName: HTMLInputElement;
  private inputEmail: HTMLInputElement;
  private inputCargo: HTMLInputElement;
  private inputCpf: HTMLInputElement;
  private inputData: HTMLInputElement;
  private coletas: any[] = [];

  constructor() {
    this.inputName = document.querySelector("#nome") as HTMLInputElement;
    this.inputEmail = document.querySelector("#email") as HTMLInputElement;
    this.inputCargo = document.querySelector("#cargo") as HTMLInputElement;
    this.inputCpf = document.querySelector("#cpf") as HTMLInputElement;
    this.inputData = document.querySelector("#data") as HTMLInputElement;

    const saveButton = document.querySelector("button[type='submit']") as HTMLButtonElement;
    saveButton.addEventListener("click", this.salvarColeta.bind(this));
  }

  private salvarColeta(event: Event) {
    event.preventDefault(); // Evita que o formulário seja submetido

    const coleta = {
      nome: this.inputName.value,
      email: this.inputEmail.value,
      cargo: this.inputCargo.value,
      cpf: this.inputCpf.value,
      data: this.inputData.value
    };

    this.coletas.push(coleta);
    console.log("Coleta salva:", coleta);
    console.log("Todas as coletas:", this.coletas);
    
    // Aqui você pode fazer o que quiser com a lista de coletas, como enviar para um servidor, etc.
  }
}