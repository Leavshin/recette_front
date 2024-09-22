// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import { Observable, BehaviorSubject } from 'rxjs';
// @ts-ignore
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class EnumService {

  private apiUrl = environment.apiUrl + '/enum/';

  constructor(private  http: HttpClient) {
  }

  getAllergy(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}allergy`);
  }

  getRecipeCategory(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}recipe_category`);
  }

  getPreference(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}preference`);
  }


}
