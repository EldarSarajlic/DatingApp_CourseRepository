import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css'
})
export class TestErrors {
protected client = inject(HttpClient);
validationErrors = signal<string[]>([]);
baseURL = "https://localhost:5001/api";

  get404Error(){
    this.client.get(this.baseURL + "/buggy/not-found").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
}

  get400Error(){
    this.client.get(this.baseURL + "/buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this.client.get(this.baseURL + "/buggy/auth").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error(){
    this.client.get(this.baseURL + "/buggy/server-error").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError(){
    this.client.post(this.baseURL + "/account/register", {}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors.set(error);
      }
    })
  }
}
