import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http:HttpClient) {



   }
   get(){
   return this.http.get("http://localhost:8080/test/api/v1", { responseType: 'text' });

   }
  
}
