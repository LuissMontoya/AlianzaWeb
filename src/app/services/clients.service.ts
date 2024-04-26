import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/client.model';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${environment.API_URL}/getAll`);
  }

  getById(key: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${environment.API_URL}/search?sharedKey=${key}`);
  }

  create(client: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${environment.API_URL}/create`, client);
  }

  edit(client: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${environment.API_URL}/update`, client);
  }
}