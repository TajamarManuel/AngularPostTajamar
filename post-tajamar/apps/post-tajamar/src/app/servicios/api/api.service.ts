import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqlDelete, SqlInsert, SqlInsertSelect, SqlProcedure, SqlUpdate } from "@post-tajamar/interfaces-sql";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  API_URI = "http://localhost:3333/api/"

  get(data: string) {
    return this.http.get(`${this.API_URI}${data}`)
  }

  getOne(tabla: string, id: number) {
    return this.http.get(`${this.API_URI}one/${tabla}/${id}`)
  }

  getAll(tabla: string) {
    return this.http.get(`${this.API_URI}${tabla}`)
  }

  post(data: SqlInsert) {
    return this.http.post(this.API_URI, data)
  }

  postSelect(data: SqlInsertSelect) {
    return this.http.post(`${this.API_URI}`, data)
  }

  put(data: SqlUpdate) {
    return this.http.put(`${this.API_URI}`, data)
  }

  delete(data: SqlDelete) {
    return this.http.delete(`${this.API_URI}${JSON.stringify(data)}`)
  }

  doProcedure(procedure: SqlProcedure) {
    return this.http.post(`${this.API_URI}procedure`, procedure)
  }

}
