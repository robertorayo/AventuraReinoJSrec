/**
 * Representa un producto que se puede comprar en el mercado
 * @class
 */
export class Producto {
    /**
     * Crea una instancia de Producto
     * @param {string} nombre - Nombre del producto
     * @param {string} imagen - Ruta de la imagen del producto
     * @param {string} rareza - Rareza del producto ('comun', 'rara', 'epica', 'legendaria')
     * @param {string} tipo - Tipo de producto ('Arma', 'Armadura', 'Consumible')
     * @param {number} bonus - Valor del bonus que proporciona el producto
     * @param {number} precio - Precio del producto en moneda del juego
     */
    constructor(nombre, imagen, rareza, tipo, bonus, precio) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        this.precio = precio;
    }

    /**
     * Devuelve un objeto con los atributos formateados del producto
     * @returns {Object} Objeto con todos los atributos del producto
     * @returns {string} .nombre - Nombre del producto
     * @returns {string} .imagen - Ruta de la imagen del producto
     * @returns {string} .rareza - Rareza del producto
     * @returns {string} .tipo - Tipo de producto
     * @returns {number} .bonus - Valor del bonus
     * @returns {number} .precio - Precio del producto
     */
    formatearAtributos() {
        return {
            nombre: this.nombre,
            imagen: this.imagen,
            rareza: this.rareza,
            tipo: this.tipo,
            bonus: this.bonus,
            precio: this.precio
        };
    }
}
