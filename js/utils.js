/**
 * Utilidades generales para el juego "Aventura en el Reino de JS"
 * @module utils
 */

/**
 * Formatea un precio añadiendo el símbolo del euro al final
 * @param {number} precio - El precio a formatear
 * @returns {string} El precio formateado con el símbolo del euro
 * @example
 * formatearPrecio(10); // Devuelve "10€"
 */
export const formatearPrecio = (precio) => {
    return `${precio}€`;
};

/**
 * Obtiene una rareza aleatoria de la lista disponible
 * @returns {string} Una rareza aleatoria entre: 'Común', 'Rara', 'Épica', 'Legendaria'
 * @example
 * obtenerRarezaAleatoria(); // Devuelve "Épica"
 */
export const obtenerRarezaAleatoria = () => {
    const rarezas = ['Común', 'Rara', 'Épica', 'Legendaria'];
    return rarezas[Math.floor(Math.random() * rarezas.length)];
};
