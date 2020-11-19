import { Injectable } from '@angular/core';
import { SqlDelete, SqlInsert, SqlInsertSelect, SqlProcedure, SqlUpdate, SqlWhere } from "@post-tajamar/interfaces-sql";

@Injectable({
  providedIn: 'root'
})
export class SqlConcatService {

  hacerInsert(JsonInsert: SqlInsert) {
    const insert = "Insert into " + JsonInsert.tabla + "(" + JsonInsert.valores.map(x => x.campo).join(", ") + ")" + (JsonInsert.valores.length !== 0 ? 'values' : 'value') + "(" + JsonInsert.valores.map(x => this.formatoCampo(x.valor)).join(",") + ")"

    return insert
  }

  hacerInsertConSelect(JsonInsert: SqlInsertSelect) {
    const insert = "Insert into " + JsonInsert.tabla + " " + JsonInsert.select

    return insert
  }

  hacerUpdate(JsonUpdate: SqlUpdate) {
    const update = "Update " + JsonUpdate.tabla + " set " + JsonUpdate.valores.map(x => x.campo + "=" + this.formatoCampo(x.valor)).join(", ")
    const where = JsonUpdate.where.length !== 0 ? this.formarWhere(JsonUpdate.where) : null

    return update + where
  }

  hacerDelete(JsonDelete: SqlDelete) {
    const borrar = "Delete " + JsonDelete.tabla
    const where = JsonDelete.where.length !== 0 ? this.formarWhere(JsonDelete.where) : null

    return borrar + where
  }

  hacerProcedure(JsonProcedure: SqlProcedure) {
    const nombre = JsonProcedure.nombre
    const valores = JsonProcedure.valores.map(x => this.formatoCampo(x)).join()

    return "call " + nombre + " (" + valores + ")"
  }

  private formarWhere(where: Array<SqlWhere>) {
    let respuesta = ' where '
    where.forEach((x, i) => {


      // Añadir el or o el and

      if (i !== 0) {
        if (x.or) {
          respuesta = respuesta + " or "
        } else {
          respuesta = respuesta + " and "
        }
      }


      // Añadir el primer parentesis

      if (x.parentesis === "(") {
        respuesta = respuesta + "("
      }


      // Vemos el tipo de operación que necesitamos

      if (x.logico) {
        respuesta = respuesta + " " + x.campo + " " + x.logico + this.formatoCampo(x.valor)
      } else if (x.between) {
        const ordenBetween = x.between.sort((a, b) => a - b)
        respuesta = respuesta + "(between " + ordenBetween.join(" and ") + ")"
      } else if (x.like) {
        respuesta = respuesta + "like " + x.like.join()
      } else if (x.in) {
        respuesta = respuesta + "in (" + x.in.map(y => this.formatoCampo(y)).join(", ") + ")"
      }


      // Añadimos el segundo parentesis

      if (x.parentesis === ")") {
        respuesta = respuesta + ")"
      }

    })


    // Control de errores de parentesis
    let parentesisNecesitados = Object.keys(respuesta).filter(x => x === "(").length - Object.keys(respuesta).filter(x => x === ")").length
    if (parentesisNecesitados > 0) {
      while (parentesisNecesitados !== 0) {
        respuesta = respuesta + ")"
        parentesisNecesitados = parentesisNecesitados - 1
      }
    }

    return respuesta
  }

  private formatoCampo(valor: any) {
    if (typeof valor !== "number" && typeof valor !== "boolean") {
      valor = "'" + valor + "'"
    }
    return valor
  }
}
