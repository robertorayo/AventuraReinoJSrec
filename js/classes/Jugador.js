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
    constructor(nombre, avatar, vidaBase = 100, ataqueBase = 5, defensaBase = 5) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.dinero = 100;
        this.inventario = [];
        this.vida = vidaBase;
        this.vidaMaxima = vidaBase;
        this.ataqueBase = ataqueBase;  // Nueva propiedad
        this.defensaBase = defensaBase; // Nueva propiedad
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
     * Suma dinero al jugador
     * @param {number} cantidad - Cantidad de dinero a sumar
     */
    sumarDinero(cantidad) {
        this.dinero += cantidad;
        this.actualizarMonedero();
    }

    /**
     * Resta dinero al jugador
     * @param {number} cantidad - Cantidad de dinero a restar
     * @returns {boolean} True si tenía suficiente dinero, False en caso contrario
     */
    restarDinero(cantidad) {
        if (this.dinero >= cantidad) {
            this.dinero -= cantidad;
            this.actualizarMonedero();
            return true;
        }
        return false;
    }

    /**
     * Actualiza el monedero en la interfaz
     */
    actualizarMonedero() {
        const monederoElement = document.getElementById('dinero-jugador');
        if (monederoElement) {
            monederoElement.textContent = this.dinero;
        }
    }

    /**
     * Calcula el ataque total del jugador sumando los bonus de todas las armas en el inventario
     * @returns {number} Ataque total del jugador
     */
    obtenerAtaqueTotal() {
        const bonusArmas = this.inventario
            .filter(item => item.tipo === 'Arma')
            .reduce((total, arma) => total + arma.bonus, 0);
        return this.ataqueBase + bonusArmas;
    }

    /**
     * Calcula la defensa total del jugador sumando los bonus de todas las armaduras en el inventario
     * @returns {number} Defensa total del jugador
     */
    obtenerDefensaTotal() {
        const bonusArmaduras = this.inventario
            .filter(item => item.tipo === 'Armadura')
            .reduce((total, armadura) => total + armadura.bonus, 0);
        return this.defensaBase + bonusArmaduras;
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

    /**
     * Obtiene los datos del jugador para guardar en el ranking
     * @returns {Object} Datos del jugador
     */
    obtenerDatosParaRanking() {
        return {
            nombre: this.nombre,
            puntuacion: this.puntos,
            monedas: this.dinero,
            fecha: new Date().toLocaleDateString('es-ES')
        };
    }
}
