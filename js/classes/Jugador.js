/**
 * Representa al jugador en el juego
 * @class
 */
export class Jugador {
    /**
     * Crea una instancia de Jugador
     * @param {string} nombre - Nombre del jugador
     * @param {string} avatar - Ruta de la imagen del avatar del jugador
     */
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.inventario = [];
        this.vida = 100;
        this.vidaMaxima = 100;
    }

    /**
     * Añade un objeto al inventario del jugador
     * @param {Producto} producto - Producto a añadir al inventario
     */
    añadirObjeto(producto) {
        const clonProducto = JSON.parse(JSON.stringify(producto));
        this.inventario.push(clonProducto);
    }

    /**
     * Suma puntos al jugador
     * @param {number} cantidad - Cantidad de puntos a sumar
     */
    sumarPuntos(cantidad) {
        this.puntos += cantidad;
    }

    /**
     * Calcula el ataque total del jugador sumando los bonus de todas las armas en el inventario
     * @returns {number} Ataque total del jugador
     */
    obtenerAtaqueTotal() {
        return this.inventario
            .filter(item => item.tipo === 'Arma')
            .reduce((total, arma) => total + arma.bonus, 0);
    }

    /**
     * Calcula la defensa total del jugador sumando los bonus de todas las armaduras en el inventario
     * @returns {number} Defensa total del jugador
     */
    obtenerDefensaTotal() {
        return this.inventario
            .filter(item => item.tipo === 'Armadura')
            .reduce((total, armadura) => total + armadura.bonus, 0);
    }

    /**
     * Calcula la vida total del jugador sumando los bonus de todos los consumibles en el inventario
     * @returns {number} Vida total del jugador (vida base + bonus de consumibles)
     */
    obtenerVidaTotal() {
        const bonusVida = this.inventario
            .filter(item => item.tipo === 'Consumible')
            .reduce((total, consumible) => total + consumible.bonus, 0);
        return this.vidaMaxima + bonusVida;
    }
}
