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

  listmovi(id: number): Observable<any>{
    return this.httpClient.get<EmpleadosModel[]>('http://localhost:9000/api/vacaciones'+'/listm/'+ id).pipe(map(res => res));
  }

  insertEmpleados(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/vacaciones'+'/insert',request).pipe(map(res => res));
  }

  deleteEmpleados(id: number): Observable<any>{
    return this.httpClient.get<any>('http://localhost:9000/api/vacaciones'+'/delete/' + id).pipe(map(res => res));
  }

  modEmpleados(id: number, nombre: string, puesto: string, nuevaId: number): Observable<any>{
    const request: any = null;
    return this.httpClient.put<any>('http://localhost:9000/api/vacaciones'+'/mod/'+ nuevaId + "/" + nombre + "/" + puesto + "/" + id, request).pipe(map(res => res));
  }

  insertMovimientos(id: number, tipoMovi: string, monto: number): Observable<any>{
    const request: any = null;
    return this.httpClient.put<any>('http://localhost:9000/api/vacaciones'+'/insertm/'+id + "/" +tipoMovi + "/" + monto, request).pipe(map(res => res));
  }

}

