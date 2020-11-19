import { Injectable } from '@nestjs/common';
import { SqlDelete, SqlInsert, SqlInsertSelect, SqlProcedure, SqlUpdate } from '@post-tajamar/interfaces-sql';
import pool from './database'
import { SqlConcatService } from "./sql-concat.service";
@Injectable()
export class AppService {

  constructor(public concatSql: SqlConcatService) { }

  get(sqlSelect: string) {
    const query = sqlSelect
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  getOne(tabla: string, id: number) {
    const query = `SELECT * FROM ${tabla} WHERE id = ${id}`
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  getAll(tabla: string) {
    const query = `SELECT * FROM ${tabla}`
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  post(sqlInsert: SqlInsert) {
    const query = this.concatSql.hacerInsert(sqlInsert)
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  postSelect(sqlInsert: SqlInsertSelect) {
    const query = this.concatSql.hacerInsertConSelect(sqlInsert)
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  put(sqlUpdate: SqlUpdate) {
    const query = this.concatSql.hacerUpdate(sqlUpdate)
    console.log("\x1b[32m", query)
    return pool.query(query)
  }

  delete(sqldelete: SqlDelete) {
    const query = this.concatSql.hacerDelete(sqldelete)
    console.log("\x1b[32m", query)
    return pool.query(query)
  }
  
  procedure(sqlProcedure: SqlProcedure) {
    const query = this.concatSql.hacerProcedure(sqlProcedure)
    console.log("\x1b[32m", query)
    return pool.query(query)
  }
}
