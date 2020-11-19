export interface SqlWhere {
    campo?: string,
    logico?: "=" | "<>" | ">" | "<" | "<=" | ">="
    valor?: any
    in?: Array<any>
    between?: Array<number>
    like?: Array<"_" | string | "porc">
    or?: boolean
    parentesis?: "(" | ")" 
}