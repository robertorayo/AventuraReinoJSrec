// Importaciones
import { Jugador } from './classes/Jugador.js';
import { Enemigo } from './classes/Enemigo.js';
import { Jefe } from './classes/Jefe.js';
import { Mercado } from './modules/Mercado.js';
import { Batalla } from './modules/Batalla.js';
import { Ranking } from './modules/Ranking.js';
import { formatearPrecio } from './utils.js';

/**
 * Clase principal que gestiona el flujo del juego "Aventura en el Reino de JS"
 * @class
 */
class Juego {
    /**
     * Crea una instancia del Juego e inicializa todos los componentes
     * @constructor
     */
    constructor() {
        console.log('Constructor de Juego llamado');
        /** @type {Jugador|null} Instancia del jugador */
        this.jugador = null;
        /** @type {Enemigo[]} Array con todos los enemigos del juego */
        this.enemigos = [];
        /** @type {Object[]} Array con los resultados de las batallas realizadas */
        this.batallasRealizadas = [];
        /** @type {number} Índice de la batalla actual */
        this.batallaActual = 0;
        /** @type {string|null} Rareza con descuento aplicado (si existe) */
        this.rarezaDescuento = null;

        this.inicializarJuego();
    }

    /**
     * Inicializa el juego configurando elementos DOM y eventos
     * @private
     */
    inicializarJuego() {
        console.log('Inicializando juego...');

        try {
            this.inicializarElementosDOM();
            this.inicializarEventos();
            this.iniciarJuego();
            console.log('Juego inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar el juego:', error);
        }
    }

    /**
     * Inicializa las referencias a los elementos del DOM
     * @private
     */
    inicializarElementosDOM() {
        console.log('Inicializando elementos DOM...');

        // Escenas
        /** @type {NodeList} Lista de todas las escenas del juego */
        this.escenas = document.querySelectorAll('.escena');
        console.log('Escenas encontradas:', this.escenas.length);

        // Botones de navegación
        /** @type {HTMLElement} Botón para continuar desde la escena inicial */
        this.btnContinuarInicio = document.getElementById('btn-continuar-inicio');
        /** @type {HTMLElement} Botón para continuar desde la escena del mercado */
        this.btnContinuarMercado = document.getElementById('btn-continuar-mercado');
        /** @type {HTMLElement} Botón para continuar desde la escena de estado */
        this.btnContinuarEstado = document.getElementById('btn-continuar-estado');
        /** @type {HTMLElement} Botón para continuar desde la escena de enemigos */
        this.btnContinuarEnemigos = document.getElementById('btn-continuar-enemigos');
        /** @type {HTMLElement} Botón para continuar desde la escena de batallas */
        this.btnContinuarBatallas = document.getElementById('btn-continuar-batallas');
        /** @type {HTMLElement} Botón para pasar a la siguiente batalla */
        this.btnSiguienteBatalla = document.getElementById('btn-siguiente-batalla');
        /** @type {HTMLElement} Botón para reiniciar el juego */
        this.btnReiniciar = document.getElementById('btn-reiniciar');

        console.log('Botones encontrados:', {
            inicio: !!this.btnContinuarInicio,
            mercado: !!this.btnContinuarMercado,
            estado: !!this.btnContinuarEstado,
            enemigos: !!this.btnContinuarEnemigos,
            batallas: !!this.btnContinuarBatallas,
            siguiente: !!this.btnSiguienteBatalla,
            reiniciar: !!this.btnReiniciar
        });
    }

    /**
     * Configura los event listeners para los botones y controles del juego
     * @private
     */
    inicializarEventos() {
        console.log('Inicializando eventos...');

        // Botón Comenzar Aventura
        if (this.btnContinuarInicio) {
            this.btnContinuarInicio.addEventListener('click', () => {
                console.log('¡Botón Comenzar Aventura clickeado!');
                this.mostrarEscena('escena-mercado');
            });
        } else {
            console.error('ERROR: No se encontró el botón btn-continuar-inicio');
        }

        // Otros botones
        if (this.btnContinuarMercado) {
            this.btnContinuarMercado.addEventListener('click', () => {
                this.mostrarEscena('escena-estado');
            });
        }

        if (this.btnContinuarEstado) {
            this.btnContinuarEstado.addEventListener('click', () => {
                this.mostrarEscena('escena-enemigos');
            });
        }

        if (this.btnContinuarEnemigos) {
            this.btnContinuarEnemigos.addEventListener('click', () => {
                this.iniciarBatallas();
            });
        }

        if (this.btnContinuarBatallas) {
            this.btnContinuarBatallas.addEventListener('click', () => {
                this.mostrarEscena('escena-final');
            });
        }

        if (this.btnSiguienteBatalla) {
            this.btnSiguienteBatalla.addEventListener('click', () => {
                this.siguienteBatalla();
            });
        }

        if (this.btnReiniciar) {
            this.btnReiniciar.addEventListener('click', () => {
                this.reiniciarJuego();
            });
        }

        console.log('Eventos inicializados');
    }

    /**
     * Inicia el juego creando el jugador, enemigos y renderizando los elementos iniciales
     * @private
     */
    iniciarJuego() {
        console.log('Iniciando juego...');

        this.jugador = new Jugador('Cazador', 'assets/images/player.png');

        this.crearEnemigos();

        this.actualizarTarjetaJugador();
        this.renderizarProductos();
        this.renderizarEnemigos();
        this.actualizarEstadisticasMercado();

        console.log('Juego iniciado correctamente');
    }

    /**
     * Crea los enemigos del juego: Goblin, Orco y Dragón (jefe)
     * @private
     */
    crearEnemigos() {
        this.enemigos = [
            new Enemigo('Goblin', 'assets/images/goblin.png', 15, 80),
            new Enemigo('Orco', 'assets/images/orc.png', 25, 120),
            new Jefe('Dragón', 'assets/images/dragon.png', 40, 200, 1.5)
        ];
    }

    /**
     * Muestra una escena específica y oculta las demás
     * @param {string} idEscena - ID de la escena a mostrar
     */
    mostrarEscena(idEscena) {
        console.log('Cambiando a escena:', idEscena);

        // Ocultar todas las escenas
        this.escenas.forEach(escena => {
            escena.classList.remove('activa');
        });

        // Mostrar la escena objetivo
        const escenaTarget = document.getElementById(idEscena);
        if (escenaTarget) {
            escenaTarget.classList.add('activa');
            console.log('Escena cambiada exitosamente');
        } else {
            console.error('No se encontró la escena:', idEscena);
        }

        // Actualizar información específica
        if (idEscena === 'escena-estado') {
            this.actualizarEstadoJugador();
        } else if (idEscena === 'escena-final') {
            this.mostrarResultadoFinal();
        }
    }

    /**
     * Actualiza la tarjeta del jugador en la escena inicial con sus estadísticas actuales
     * @private
     */
    actualizarTarjetaJugador() {
        this.actualizarElemento('ataque-jugador', this.jugador.obtenerAtaqueTotal());
        this.actualizarElemento('defensa-jugador', this.jugador.obtenerDefensaTotal());
        this.actualizarElemento('vida-jugador', this.jugador.obtenerVidaTotal());
        this.actualizarElemento('puntos-jugador', this.jugador.puntos);
    }

    /**
     * Actualiza la tarjeta del jugador en la escena de estado actualizado
     * @private
     */
    actualizarEstadoJugador() {
        this.actualizarElemento('ataque-jugador-estado', this.jugador.obtenerAtaqueTotal());
        this.actualizarElemento('defensa-jugador-estado', this.jugador.obtenerDefensaTotal());
        this.actualizarElemento('vida-jugador-estado', this.jugador.obtenerVidaTotal());
        this.actualizarElemento('puntos-jugador-estado', this.jugador.puntos);
    }

    /**
     * Actualiza las estadísticas mostradas en el mercado (ataque, defensa y vida extra)
     * @private
     */
    actualizarEstadisticasMercado() {
        this.actualizarElemento('ataque-total', this.jugador.obtenerAtaqueTotal());
        this.actualizarElemento('defensa-total', this.jugador.obtenerDefensaTotal());

        const bonusVida = this.jugador.inventario
            .filter(item => item.tipo === 'Consumible')
            .reduce((total, consumible) => total + consumible.bonus, 0);
        this.actualizarElemento('vida-extra', bonusVida);
    }

    /**
     * Actualiza el contenido de texto de un elemento del DOM
     * @param {string} id - ID del elemento a actualizar
     * @param {string|number} valor - Nuevo valor para el elemento
     * @private
     */
    actualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    /**
     * Renderiza los productos disponibles en el mercado
     * @private
     */
    renderizarProductos() {
        const listaProductos = document.getElementById('lista-productos');
        if (!listaProductos) {
            console.error('No se encontró lista-productos');
            return;
        }

        listaProductos.innerHTML = '';

        const productos = Mercado.obtenerProductos();

        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.className = 'producto';

            const rarezaClase = producto.rareza.toLowerCase();

            productoElement.innerHTML = `
                <div class="producto-imagen-container">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'">
                </div>
                <h4>${producto.nombre}</h4>
                <p class="producto-bonus">+${producto.bonus} ${this.obtenerTipoBonus(producto.tipo)}</p>
                <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                <p class="rareza ${rarezaClase}">${producto.rareza.toUpperCase()}</p>
                <p><small>${producto.tipo}</small></p>
                <button class="btn btn-comprar" data-nombre="${producto.nombre}" data-rareza="${producto.rareza}">Añadir al Carrito</button>
            `;
            listaProductos.appendChild(productoElement);
        });

        // Agregar event listeners
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nombreProducto = e.target.getAttribute('data-nombre');
                const rarezaProducto = e.target.getAttribute('data-rareza');
                this.manejarCompraProducto(nombreProducto, rarezaProducto, e.target);
            });
        });
    }

    /**
     * Obtiene la etiqueta de bonus según el tipo de producto
     * @param {string} tipo - Tipo de producto ('Arma', 'Armadura', 'Consumible')
     * @returns {string} Etiqueta correspondiente al tipo de bonus
     * @private
     */
    obtenerTipoBonus(tipo) {
        switch (tipo) {
            case 'Arma': return 'ATAQUE';
            case 'Armadura': return 'DEFENSA';
            case 'Consumible': return 'VIDA';
            default: return 'BONUS';
        }
    }

    /**
     * Maneja la compra o retiro de un producto del mercado
     * @param {string} nombreProducto - Nombre del producto
     * @param {string} rarezaProducto - Rareza del producto
     * @param {HTMLElement} boton - Elemento del botón que fue clickeado
     * @private
     */
    manejarCompraProducto(nombreProducto, rarezaProducto, boton) {
        const productos = Mercado.obtenerProductos();

        // Buscar el producto por nombre Y rareza
        const producto = productos.find(p =>
            p.nombre === nombreProducto && p.rareza === rarezaProducto
        );

        if (!producto) {
            console.error('Producto no encontrado:', nombreProducto, rarezaProducto);
            return;
        }

        const productoElement = boton.parentElement;
        const estaEnCesta = productoElement.classList.contains('seleccionado');

        if (!estaEnCesta) {
            this.jugador.añadirObjeto(producto);
            productoElement.classList.add('seleccionado');
            boton.textContent = 'Retirar';
            boton.className = 'btn btn-retirar';

            // Mostrar animación de confirmación
            this.mostrarAnimacionConfirmacion();
        } else {
            // Buscar y eliminar el producto exacto por nombre y rareza
            const index = this.jugador.inventario.findIndex(item =>
                item.nombre === nombreProducto && item.rareza === rarezaProducto
            );
            if (index > -1) {
                this.jugador.inventario.splice(index, 1);
            }
            productoElement.classList.remove('seleccionado');
            boton.textContent = 'Añadir al Carrito';
            boton.className = 'btn btn-comprar';
        }

        this.actualizarCesta();
        this.actualizarTarjetaJugador();
        this.actualizarEstadisticasMercado();
    }

    /**
     * Actualiza la visualización de la cesta de compra/inventario
     * @private
     */
    actualizarCesta() {
        const cesta = document.getElementById('cesta-compra');
        const totalObjetos = document.getElementById('total-objetos');

        if (!cesta) return;

        cesta.innerHTML = '';

        if (this.jugador.inventario.length === 0) {
            cesta.innerHTML = `
                <div class="cesta-vacia">
                    <i class="fas fa-box-open"></i>
                    <p>Tu inventario está vacío</p>
                </div>
            `;
            if (totalObjetos) totalObjetos.textContent = '0';
            return;
        }

        this.jugador.inventario.forEach(producto => {
            const itemElement = document.createElement('div');

            // Usar la rareza directamente en minúsculas
            const rarezaClase = producto.rareza.toLowerCase();

            itemElement.className = `item-inventario ${rarezaClase}`;

            itemElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'">
            `;
            cesta.appendChild(itemElement);
        });

        if (totalObjetos) {
            totalObjetos.textContent = this.jugador.inventario.length;
        }
    }

    /**
     * Muestra una animación de confirmación cuando se añade un producto al carrito
     * @private
     */
    mostrarAnimacionConfirmacion() {
        // Crear elemento de confirmación
        const animacion = document.createElement('div');
        animacion.className = 'animacion-confirmacion';
        animacion.textContent = '✓ Añadido al carrito';

        document.body.appendChild(animacion);

        // Remover después de la animación
        setTimeout(() => {
            if (document.body.contains(animacion)) {
                document.body.removeChild(animacion);
            }
        }, 1000);
    }

    /**
     * Renderiza los enemigos en la escena de selección de enemigos
     * @private
     */
    renderizarEnemigos() {
        const listaEnemigos = document.getElementById('lista-enemigos');
        if (!listaEnemigos) return;

        listaEnemigos.innerHTML = '';

        this.enemigos.forEach((enemigo, index) => {
            const enemigoElement = document.createElement('div');
            const esJefe = enemigo instanceof Jefe;

            enemigoElement.className = `enemigo ${esJefe ? 'jefe' : ''}`;
            enemigoElement.innerHTML = `
                <img src="${enemigo.avatar}" alt="${enemigo.nombre}" onerror="this.style.display='none'">
                <h3>${enemigo.nombre}</h3>
                <div class="estadisticas-enemigo">
                    <p><strong>Ataque:</strong> ${enemigo.ataque}</p>
                    <p><strong>Vida:</strong> ${enemigo.vida}</p>
                    ${esJefe ? `<p><strong>Multiplicador:</strong> ${enemigo.multiplicadorDaño}x</p>` : ''}
                </div>
                ${esJefe ? '<p class="jefe-label">¡JEFE FINAL!</p>' : ''}
            `;
            listaEnemigos.appendChild(enemigoElement);
        });
    }

    /**
     * Inicia la secuencia de batallas
     * @private
     */
    iniciarBatallas() {
        this.mostrarEscena('escena-batallas');
        this.batallaActual = 0;
        this.batallasRealizadas = [];
        this.iniciarBatallaIndividual();
    }

    /**
     * Inicia una batalla individual contra el enemigo actual
     * @private
     */
    iniciarBatallaIndividual() {
        if (this.batallaActual >= this.enemigos.length) {
            this.finalizarBatallas();
            return;
        }

        const enemigo = this.enemigos[this.batallaActual];

        // Preparar interfaz con animaciones
        this.prepararInterfazBatalla(enemigo);

        // Esperar a que terminen las animaciones de entrada antes de iniciar la batalla
        setTimeout(() => {
            this.simularBatallaVisual(enemigo);
        }, 900); // 900ms = 800ms de animación + 100ms de margen
    }

    /**
     * Simula una batalla visualmente y actualiza la interfaz con el resultado
     * @param {Enemigo} enemigo - Enemigo contra el que se va a combatir
     * @private
     */
    simularBatallaVisual(enemigo) {
        const resultado = Batalla.combate(enemigo, this.jugador);

        // Actualizar barras de vida
        this.actualizarBarrasVidaVisual(
            resultado.vidaJugadorFinal,
            resultado.vidaEnemigoFinal,
            resultado.vidaMaximaJugador,
            resultado.vidaMaximaEnemigo
        );

        // Mostrar resultado
        this.mostrarResultadoBatalla(resultado, enemigo);

        this.batallasRealizadas.push(resultado);

        // Mostrar botones según el resultado
        if (this.btnContinuarBatallas) this.btnContinuarBatallas.style.display = 'none';
        if (this.btnSiguienteBatalla) this.btnSiguienteBatalla.style.display = 'inline-block';

        if (resultado.ganador === 'enemigo') {
            if (this.btnSiguienteBatalla) this.btnSiguienteBatalla.style.display = 'none';
            if (this.btnContinuarBatallas) {
                this.btnContinuarBatallas.style.display = 'inline-block';
                this.btnContinuarBatallas.textContent = 'Continuar al Resultado Final';
            }
        }
    }

    /**
     * Actualiza visualmente las barras de vida del jugador y enemigo
     * @param {number} vidaJugador - Vida actual del jugador
     * @param {number} vidaEnemigo - Vida actual del enemigo
     * @param {number} vidaMaxJugador - Vida máxima del jugador
     * @param {number} vidaMaxEnemigo - Vida máxima del enemigo
     * @private
     */
    actualizarBarrasVidaVisual(vidaJugador, vidaEnemigo, vidaMaxJugador, vidaMaxEnemigo) {
        // Calcular porcentajes
        const porcentajeJugador = (vidaJugador / vidaMaxJugador) * 100;
        const porcentajeEnemigo = (vidaEnemigo / vidaMaxEnemigo) * 100;

        // Actualizar barras con animación
        const barraJugador = document.getElementById('vida-bar-jugador');
        const barraEnemigo = document.getElementById('vida-bar-enemigo');

        barraJugador.style.width = `${porcentajeJugador}%`;
        barraEnemigo.style.width = `${porcentajeEnemigo}%`;

        // Cambiar color si la vida es baja
        if (porcentajeJugador < 30) {
            barraJugador.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
        } else {
            barraJugador.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
        }

        if (porcentajeEnemigo < 30) {
            barraEnemigo.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
        } else {
            barraEnemigo.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
        }

        // Actualizar textos
        document.getElementById('vida-texto-jugador').textContent = `${Math.round(vidaJugador)}/${vidaMaxJugador}`;
        document.getElementById('vida-texto-enemigo').textContent = `${Math.round(vidaEnemigo)}/${vidaMaxEnemigo}`;
    }

    /**
     * Muestra el resultado de una batalla en la interfaz
     * @param {Object} resultado - Resultado de la batalla
     * @param {Enemigo} enemigo - Enemigo contra el que se luchó
     * @private
     */
    mostrarResultadoBatalla(resultado, enemigo) {
        const resultadoElement = document.getElementById('resultado-batalla');
        if (!resultadoElement) return;

        if (resultado.ganador === 'jugador') {
            resultadoElement.innerHTML = `
                <div class="victoria-texto">
                    <h3>¡VICTORIA!</h3>
                    <p>Has derrotado a ${enemigo.nombre}</p>
                    <p class="puntos-ganados">+${resultado.puntos} puntos</p>
                </div>
            `;
            resultadoElement.className = 'resultado-batalla victoria';
        } else {
            resultadoElement.innerHTML = `
                <div class="derrota-texto">
                    <h3>¡DERROTA!</h3>
                    <p>${enemigo.nombre} te ha vencido</p>
                </div>
            `;
            resultadoElement.className = 'resultado-batalla derrota';
        }
    }

    /**
     * Prepara la interfaz para una nueva batalla con animaciones de entrada
     * @param {Enemigo} enemigo - Enemigo contra el que se va a combatir
     * @private
     */
    prepararInterfazBatalla(enemigo) {
        document.getElementById('avatar-batalla-jugador').src = this.jugador.avatar;
        document.getElementById('nombre-batalla-jugador').textContent = this.jugador.nombre;
        document.getElementById('avatar-batalla-enemigo').src = enemigo.avatar;
        document.getElementById('nombre-batalla-enemigo').textContent = enemigo.nombre;

        const vidaJugadorMax = this.jugador.obtenerVidaTotal();
        document.getElementById('vida-texto-jugador').textContent = `${vidaJugadorMax}/${vidaJugadorMax}`;
        document.getElementById('vida-texto-enemigo').textContent = `${enemigo.vida}/${enemigo.vida}`;

        // Resetear barras al 100%
        document.getElementById('vida-bar-jugador').style.width = '100%';
        document.getElementById('vida-bar-enemigo').style.width = '100%';
        document.getElementById('vida-bar-jugador').style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
        document.getElementById('vida-bar-enemigo').style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';

        // Limpiar resultado anterior
        const resultadoElement = document.getElementById('resultado-batalla');
        if (resultadoElement) {
            resultadoElement.innerHTML = '<p>La batalla está por comenzar...</p>';
            resultadoElement.className = 'resultado-batalla';
        }

        // Obtener elementos de combatientes
        const jugadorCombatiente = document.querySelector('.jugador-combatiente');
        const enemigoCombatiente = document.querySelector('.enemigo-combatiente');

        // Reiniciar animaciones - FORZAR re-aplicación
        jugadorCombatiente.style.animation = 'none';
        enemigoCombatiente.style.animation = 'none';

        // Forzar reflow para reiniciar animaciones
        void jugadorCombatiente.offsetWidth;
        void enemigoCombatiente.offsetWidth;

        // Aplicar animaciones de entrada
        jugadorCombatiente.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
        enemigoCombatiente.style.animation = 'slideInFromRight 0.8s ease-out forwards';

        if (this.btnContinuarBatallas) this.btnContinuarBatallas.style.display = 'none';
        if (this.btnSiguienteBatalla) this.btnSiguienteBatalla.style.display = 'none';
    }

    /**
     * Avanza a la siguiente batalla en la secuencia
     * @private
     */
    siguienteBatalla() {
        this.batallaActual++;
        this.iniciarBatallaIndividual();
    }

    /**
     * Finaliza la secuencia de batallas y actualiza la interfaz
     * @private
     */
    finalizarBatallas() {
        if (this.btnSiguienteBatalla) this.btnSiguienteBatalla.style.display = 'none';
        if (this.btnContinuarBatallas) {
            this.btnContinuarBatallas.style.display = 'inline-block';
            this.btnContinuarBatallas.textContent = 'Ver Resultado Final';
        }
    }

    /**
     * Muestra el resultado final del juego con puntuación y rango
     * @private
     */
    mostrarResultadoFinal() {
        this.actualizarElemento('puntos-final', this.jugador.puntos);

        const rango = Ranking.distinguirJugador(this.jugador.puntos);
        const rangoElement = document.getElementById('rango-final');
        if (rangoElement) {
            rangoElement.textContent = rango;

            if (rango === 'Veterano') {
                rangoElement.classList.add('veterano');
                this.lanzarConfeti();
            } else {
                this.lanzarConfetiSimple();
            }
        }

        this.mostrarResumenBatallas();
    }

    /**
     * Lanza una animación de confeti especial para cuando el jugador alcanza el rango de Veterano
     * @private
     */
    lanzarConfeti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
            });
        }, 500);
    }

    /**
     * Lanza una animación simple de confeti
     * @private
     */
    lanzarConfetiSimple() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    /**
     * Muestra un resumen detallado de todas las batallas realizadas
     * @private
     */
    mostrarResumenBatallas() {
        const resumenElement = document.getElementById('resumen-combates');
        if (!resumenElement) return;

        resumenElement.innerHTML = '';

        this.batallasRealizadas.forEach((batalla, index) => {
            const enemigo = this.enemigos[index];
            const batallaElement = document.createElement('div');
            batallaElement.className = 'resumen-batalla';
            batallaElement.innerHTML = `
                <h4>Batalla ${index + 1}: vs ${enemigo.nombre}</h4>
                <p><strong>Resultado:</strong> ${batalla.ganador === 'jugador' ? '✅ Victoria' : '❌ Derrota'}</p>
                <p><strong>Puntos obtenidos:</strong> ${batalla.puntos}</p>
            `;
            resumenElement.appendChild(batallaElement);
        });
    }

    /**
     * Reinicia el juego a su estado inicial
     * @private
     */
    reiniciarJuego() {
        this.jugador = new Jugador('Cazador', 'assets/images/player.png');
        this.crearEnemigos();
        this.actualizarTarjetaJugador();
        this.renderizarProductos();
        this.actualizarCesta();
        this.actualizarEstadisticasMercado();
        this.mostrarEscena('escena-inicio');
    }
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    new Juego();
});
