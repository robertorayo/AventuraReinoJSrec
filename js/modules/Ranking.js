/**
 * Módulo que gestiona el sistema de ranking del juego
 * @module Ranking
 */
export const Ranking = {
    /**
     * Determina el rango del jugador basado en su puntuación
     * @param {number} puntuacion - Puntuación total del jugador
     * @param {number} [umbral=400] - Umbral mínimo para ser considerado "Veterano"
     * @returns {string} Rango del jugador: "Leyenda", "Veterano" o "Novato"
     * @example
     * distinguirJugador(450); // Devuelve "Veterano"
     * distinguirJugador(350); // Devuelve "Novato"
     * distinguirJugador(700); // Devuelve "Leyenda"
     */
    distinguirJugador(puntuacion, umbral = 400) {
        if (puntuacion > 700) return "Leyenda";
        if (puntuacion > umbral) return "Veterano";
        return "Novato";
    }
};
