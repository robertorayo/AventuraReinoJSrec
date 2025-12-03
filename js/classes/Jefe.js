import { Enemigo } from './Enemigo.js';

/**
 * Representa a un enemigo jefe con multiplicador de daño
 * @class
 * @extends Enemigo
 */
export class Jefe extends Enemigo {
    /**
     * Crea una instancia de Jefe
     * @param {string} nombre - Nombre del jefe
     * @param {string} avatar - Ruta de la imagen del avatar del jefe
     * @param {number} ataque - Valor de ataque del jefe
     * @param {number} vida - Vida máxima del jefe
     * @param {number} [multiplicadorDaño=1.2] - Multiplicador de daño que aplica el jefe
     */
    constructor(nombre, avatar, ataque, vida, multiplicadorDaño = 1.2) {
        super(nombre, avatar, ataque, vida);
        this.multiplicadorDaño = multiplicadorDaño;
    }
}
