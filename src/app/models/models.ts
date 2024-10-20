// Interfaz para usuarios
export interface User {
    id?: number;
    username: string;
    password: string;
    isAdmin: boolean;
}

// Interfaz para categorías
export interface Categoria {
    id?: number;
    nombre: string;
    descripcion: string;
    imagen?: string;
}

// Interfaz para productos
export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
    categoriaId: number;
}
