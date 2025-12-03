/**
 * Módulo que gestiona el sistema de combate del juego
 * @module Batalla
 */
export const Batalla = {
    /**
     * Simula un combate entre el jugador y un enemigo
     * @param {Enemigo} enemigo - El enemigo a combatir
     * @param {Jugador} jugador - El jugador que participa en el combate
     * @returns {Object} Resultado del combate con las siguientes propiedades:
     * @returns {string} resultado.ganador - 'jugador' si gana el jugador, 'enemigo' si gana el enemigo
     * @returns {number} resultado.puntos - Puntos obtenidos si gana el jugador
     * @returns {number} resultado.vidaJugadorFinal - Vida restante del jugador
     * @returns {number} resultado.vidaEnemigoFinal - Vida restante del enemigo
     * @returns {number} resultado.vidaMaximaJugador - Vida máxima inicial del jugador
     * @returns {number} resultado.vidaMaximaEnemigo - Vida máxima inicial del enemigo
     */
    combate(enemigo, jugador) {
        let vidaJugador = jugador.obtenerVidaTotal();
        let vidaEnemigo = enemigo.vida;
        const ataqueBaseJugador = jugador.obtenerAtaqueTotal();
        const defensaBaseJugador = jugador.obtenerDefensaTotal();
        const vidaMaximaJugador = jugador.obtenerVidaTotal();
        const vidaMaximaEnemigo = enemigo.vida;

        const resultado = {
            ganador: '',
            puntos: 0,
            vidaJugadorFinal: vidaJugador,
            vidaEnemigoFinal: vidaEnemigo,
            vidaMaximaJugador: vidaMaximaJugador,
            vidaMaximaEnemigo: vidaMaximaEnemigo
        };

        let turno = 1;
        while (vidaJugador > 0 && vidaEnemigo > 0) {
            // Turno del jugador
            const ataqueJugador = ataqueBaseJugador + Math.floor(Math.random() * 5);
            vidaEnemigo = Math.max(0, vidaEnemigo - ataqueJugador);

            if (vidaEnemigo <= 0) break;

            // Turno del enemigo
            const ataqueEnemigo = enemigo.ataque + Math.floor(Math.random() * 3);
            const dañoReal = Math.max(0, ataqueEnemigo - defensaBaseJugador);
            vidaJugador = Math.max(0, vidaJugador - dañoReal);

            turno++;
        }

        resultado.vidaJugadorFinal = vidaJugador;
        resultado.vidaEnemigoFinal = vidaEnemigo;

        if (vidaJugador > 0) {
            resultado.ganador = 'jugador';
            resultado.puntos = 100 + enemigo.ataque;
            if (enemigo.multiplicadorDaño) {
                resultado.puntos = Math.floor(resultado.puntos * enemigo.multiplicadorDaño);
            }
            jugador.sumarPuntos(resultado.puntos);
        } else {
            resultado.ganador = 'enemigo';
        }

        return resultado;
    }
};
