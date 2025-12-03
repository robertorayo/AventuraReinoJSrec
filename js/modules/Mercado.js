import { Producto } from '../classes/Producto.js';

/**
 * Módulo que gestiona el mercado del juego
 * @module Mercado
 */
export const Mercado = (() => {
    /** @type {Producto[]} Lista de productos disponibles en el mercado */
    let productos = [
        new Producto('Espada', 'assets/images/sword.png', 'comun', 'Arma', 15, 6),
        new Producto('Espada', 'assets/images/sword.png', 'legendaria', 'Arma', 30, 50),
        new Producto('Armadura', 'assets/images/armor.png', 'comun', 'Armadura', 10, 8),
        new Producto('Armadura', 'assets/images/armor.png', 'rara', 'Armadura', 25, 25),
        new Producto('Poción', 'assets/images/potion.png', 'comun', 'Consumible', 20, 3),
        new Producto('Poción', 'assets/images/potion.png', 'epica', 'Consumible', 45, 20)
    ];

    return {
        /**
         * Obtiene todos los productos disponibles en el mercado
         * @returns {Producto[]} Array con todos los productos
         */
        obtenerProductos: () => [...productos],

        /**
         * Filtra productos por rareza
         * @param {string} rareza - Rareza por la que filtrar ('comun', 'rara', 'epica', 'legendaria')
         * @returns {Producto[]} Array con los productos filtrados
         */
        filtrarProductos: (rareza) => productos.filter(p => p.rareza === rareza),

        /**
         * Busca productos por nombre (búsqueda parcial insensible a mayúsculas/minúsculas)
         * @param {string} nombre - Nombre o parte del nombre a buscar
         * @returns {Producto[]} Array con los productos que coinciden con la búsqueda
         */
        buscarProducto: (nombre) => productos.filter(p =>
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        )
    };
})();
