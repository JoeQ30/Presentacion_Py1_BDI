import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmpleadosModel } from '../model/empleados-model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpClient: HttpClient) {}

  login(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/vacaciones'+'/login',request).pipe(map(res => res));
  }

  listi(id: number): Observable<any>{
    return this.httpClient.get<EmpleadosModel[]>('http://localhost:9000/api/vacaciones'+'/listi?id='+ id).pipe(map(res => res));
  }

  listn(nm: string): Observable<any>{
    return this.httpClient.get<EmpleadosModel[]>('http://localhost:9000/api/vacaciones'+'/listn?nombre='+ nm).pipe(map(res => res));
  }

  insertEmpelados(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/vacaciones'+'/insert',request).pipe(map(res => res));
  }

}

