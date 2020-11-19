export interface CategoriasTrabajadores {
    id?: number,
    categoria: string,
    incrementoSalarial: number,
    descripcion: string
}

export interface Oficinas {
    id?: number,
    oficina: string,
    descripcion: string,
    direccion: string
}

export interface EstadosPersona {
    id?: number,
    estado: string
}

export interface Personas {
    id?: number,
    dni: string,
    nombre: string,
    apellidos: string,
    direccion: string,
    discapacidad: number,
    email: string,
    telefono: number,
    numeroHijos: number,
    estadoId: number,
    fechaNacimiento: Date
    contrasena: string
}

export interface Trabajadores {
    id?: number,
    personaId: number,
    sueldoBase: number,
    fechaEntrada: Date,
    fechaSalida: Date,
    motivoDespido: string,
    fechaBaja: Date,
    motivoBaja: string,
    oficinaId: number,
    categoriaTrabajadorId: number,
}

export interface HistoricosCategorias {
    id?: number,
    fechaUpgrade: Date,
    fechaSalida: Date,
    categoriasTrabajadorId: number,
    trabajadorId: number
}

export interface Administracion {
    id?: number,
    accion: string,
    fecha: Date,
    trabajadorId?: number
}