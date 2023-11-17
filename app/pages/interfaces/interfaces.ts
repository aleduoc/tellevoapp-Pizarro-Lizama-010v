export interface IConductores {
    id: number,
    email: string,
    sede: string,
    rut: string,
    patente: string,
    password: string,
    rol: string,

}

export interface IConductor {
    email: string,
    sede: string,
    rut: string,
    patente: string,
    password: string,
    rol: string,

}

export interface IPasajeros {
    id: number,
    email: string,
    sede: string,
    rut: string,
    password: string,
    rol: string,

}

export interface IPasajero {
    email: string,
    sede: string,
    rut: string,
    password: string,
    rol: string,
    
}

//Detalle Ruta
export interface IDetalles {
    id: number,
    email: string,
    direccion: string,
    precio: number,
    nota: string,
    patente: string,
}


export interface IDetalle {
    email: string,
    direccion: string,
    precio: number,
    nota: string,
    patente: string,
}