import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css'
})
export class UrlFormComponent {

  successMessage: string | null = null;
  errorMessage: string | null = null;

  urlForm = this.formBuilder.group({
    url: '',
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ){

  }

  onSubmit(): void {
    const body = {"url" : this.urlForm.value.url || ''};

    try{
      this.http.post<any>('http://localhost:3000/scrapeRecipe', body).subscribe({
      next: (response) => {
        console.log('respuesta del servidor:', response);
        this.successMessage = '¡La petición se ha realizado con éxito!';
        this.errorMessage = null;
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: (error) => {
        this.successMessage = null;
        this.errorMessage = 'Error al realizar la petición: ' + error.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
    }catch(err){
      console.log(err);
      this.successMessage = null;
      this.errorMessage = 'Error al realizar la petición: ' + err;
    }
    

    this.urlForm.reset();
  }

}
