/**
 * Representa a un enemigo en el juego
 * @class
 */
export class Enemigo {
    /**
     * Crea una instancia de Enemigo
     * @param {string} nombre - Nombre del enemigo
     * @param {string} avatar - Ruta de la imagen del avatar del enemigo
     * @param {number} ataque - Valor de ataque del enemigo
     * @param {number} vida - Vida máxima del enemigo
     */
    constructor(nombre, avatar, ataque, vida) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.ataque = ataque;
        this.vida = vida;
    }
}
