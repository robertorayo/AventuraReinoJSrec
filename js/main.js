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
        /** @type {HTMLElement} Botón para ver el ranking */
        this.btnVerRanking = document.getElementById('btn-ver-ranking');
        /** @type {HTMLElement} Botón para volver al resultado desde el ranking */
        this.btnVolverFinal = document.getElementById('btn-volver-final');
        /** @type {HTMLElement} Botón para reiniciar desde el ranking */
        this.btnReiniciarRanking = document.getElementById('btn-reiniciar-ranking');
        this.btnCrearPersonaje = document.getElementById('btn-crear-personaje');
        this.headerTitulo = document.getElementById('header-titulo');
        this.headerSubtitulo = document.getElementById('header-subtitulo');
        this.inventarioFooter = document.getElementById('inventario-footer');
        this.espaciosDisponibles = document.getElementById('espacios-disponibles');


        console.log('Botones encontrados:', {
            inicio: !!this.btnContinuarInicio,
            mercado: !!this.btnContinuarMercado,
            estado: !!this.btnContinuarEstado,
            enemigos: !!this.btnContinuarEnemigos,
            batallas: !!this.btnContinuarBatallas,
            siguiente: !!this.btnSiguienteBatalla,
            reiniciar: !!this.btnReiniciar,
            verRanking: !!this.btnVerRanking,
            volverFinal: !!this.btnVolverFinal,
            reiniciarRanking: !!this.btnReiniciarRanking
        });
    }

    /**
     * Configura los event listeners para los botones y controles del juego
     * @private
     */
    inicializarEventos() {
        console.log('Inicializando eventos...');

        if (this.btnCrearPersonaje) {
            this.btnCrearPersonaje.addEventListener('click', () => {
                this.crearPersonaje();
            });
        }

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

        if (this.btnVerRanking) {
            this.btnVerRanking.addEventListener('click', () => {
                this.mostrarRanking();
            });
        }

        if (this.btnVolverFinal) {
            this.btnVolverFinal.addEventListener('click', () => {
                this.mostrarEscena('escena-final');
            });
        }

        if (this.btnReiniciarRanking) {
            this.btnReiniciarRanking.addEventListener('click', () => {
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

        // ELIMINAR ESTA LÍNEA: this.jugador = new Jugador('Cazador', 'assets/images/player.png');
        // EL JUGADOR AHORA SE CREA EN LA ESCENA DE CREACIÓN DEL PERSONAJE

        this.crearEnemigos();

        // Configurar la creación del personaje
        this.configurarCreacionPersonaje();

        // No llamamos a estas funciones aquí porque el jugador aún no existe
        // Se llamarán después de crear el personaje
        // this.actualizarTarjetaJugador();
        this.renderizarProductos();
        this.renderizarEnemigos();
        // this.actualizarEstadisticasMercado();

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

            // Actualizar el header según la escena
            this.actualizarHeader(idEscena);
        } else {
            console.error('No se encontró la escena:', idEscena);
        }

        // Actualizar información específica
        if (idEscena === 'escena-estado') {
            this.actualizarEstadoJugador();
        } else if (idEscena === 'escena-final') {
            this.mostrarResultadoFinal();
        } else if (idEscena === 'escena-ranking') {
            this.cargarTablaRanking();
        }
    }

    /**
 * Actualiza el header según la escena actual
 * @param {string} idEscena - ID de la escena actual
 * @private
 */
    actualizarHeader(idEscena) {
        const titulos = {
            'escena-creacion': {
                titulo: 'CREACIÓN DEL PERSONAJE',
                subtitulo: 'Forja tu leyenda'
            },
            'escena-inicio': {
                titulo: 'AVENTURA EN EL REINO DE JS',
                subtitulo: 'La Batalla por el Trono'
            },
            'escena-mercado': {
                titulo: 'MERCADO NEGRO',
                subtitulo: 'Equípate para la batalla'
            },
            'escena-estado': {
                titulo: 'ESTADO ACTUALIZADO',
                subtitulo: 'Tu poder ha crecido'
            },
            'escena-enemigos': {
                titulo: 'ENEMIGOS DEL REINO',
                subtitulo: 'Elige tu destino'
            },
            'escena-batallas': {
                titulo: 'CAMPO DE BATALLA',
                subtitulo: 'La lucha por la supervivencia'
            },
            'escena-final': {
                titulo: 'AVENTURA COMPLETADA',
                subtitulo: 'Tu leyenda ha sido escrita'
            },
            'escena-ranking': {
                titulo: 'RANKING DE JUGADORES',
                subtitulo: 'Los más grandes del reino'
            }
        };

        if (titulos[idEscena]) {
            this.headerTitulo.textContent = titulos[idEscena].titulo;
            this.headerSubtitulo.textContent = titulos[idEscena].subtitulo;
        }
    }

    /**
 * Actualiza el inventario del footer
 * @private
 */
    actualizarInventarioFooter() {
        if (!this.inventarioFooter) return;

        // Limpiar el inventario del footer
        this.inventarioFooter.innerHTML = '';

        // Crear 6 celdas (vacías o con objetos)
        for (let i = 0; i < 6; i++) {
            const celda = document.createElement('div');
            celda.className = 'celda-inventario vacia';
            celda.setAttribute('data-indice', i);

            if (this.jugador && i < this.jugador.inventario.length) {
                // Celda ocupada con objeto
                const producto = this.jugador.inventario[i];
                celda.classList.remove('vacia');
                celda.classList.add('ocupada');

                const rarezaClase = producto.rareza.toLowerCase();

                celda.innerHTML = `
                <div class="celda-contenido">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="item-footer" onerror="this.style.display='none'">
                    <div class="rareza-indicator ${rarezaClase}"></div>
                </div>
            `;
            } else {
                // Celda vacía
                celda.innerHTML = `
                <div class="celda-contenido">
                    <span class="numero-celda">${i + 1}</span>
                </div>
            `;
            }

            this.inventarioFooter.appendChild(celda);
        }

        // Actualizar contador de espacios disponibles
        if (this.espaciosDisponibles && this.jugador) {
            const espaciosOcupados = Math.min(this.jugador.inventario.length, 6);
            const espaciosLibres = 6 - espaciosOcupados;
            this.espaciosDisponibles.textContent = espaciosLibres;
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
        this.actualizarElemento('dinero-jugador-inicio', this.jugador.dinero);
        this.jugador.actualizarMonedero();
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
        this.actualizarElemento('dinero-jugador-estado', this.jugador.dinero);
        this.jugador.actualizarMonedero();
    }

    /**
     * Actualiza las estadísticas mostradas en el mercado (ataque, defensa y vida extra)
     * @private
     */
    actualizarEstadisticasMercado() {
        this.actualizarElemento('ataque-total', this.jugador.obtenerAtaqueTotal());
        this.actualizarElemento('defensa-total', this.jugador.obtenerDefensaTotal());
        this.actualizarElemento('dinero-disponible', this.jugador.dinero);

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
                <button class="btn btn-comprar" data-nombre="${producto.nombre}" data-rareza="${producto.rareza}" data-precio="${producto.precio}">Comprar</button>
            `;
            listaProductos.appendChild(productoElement);
        });

        // Agregar event listeners
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nombreProducto = e.target.getAttribute('data-nombre');
                const rarezaProducto = e.target.getAttribute('data-rareza');
                const precioProducto = parseInt(e.target.getAttribute('data-precio'));

                // Verificar si el jugador tiene suficiente dinero
                if (this.jugador.dinero >= precioProducto) {
                    this.manejarCompraProducto(nombreProducto, rarezaProducto, precioProducto, e.target);
                } else {
                    this.mostrarMensajeError('¡No tienes suficiente dinero!');
                }
            });
        });
    }

    /**
     * Muestra un mensaje de error temporal
     * @param {string} mensaje - Mensaje de error a mostrar
     * @private
     */
    mostrarMensajeError(mensaje) {
        const errorElement = document.createElement('div');
        errorElement.className = 'animacion-error';
        errorElement.textContent = mensaje;

        document.body.appendChild(errorElement);

        setTimeout(() => {
            if (document.body.contains(errorElement)) {
                document.body.removeChild(errorElement);
            }
        }, 1500);
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
     * @param {number} precioProducto - Precio del producto
     * @param {HTMLElement} boton - Elemento del botón que fue clickeado
     * @private
     */
    manejarCompraProducto(nombreProducto, rarezaProducto, precioProducto, boton) {
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
            // Verificar si hay suficiente dinero
            if (this.jugador.restarDinero(precioProducto)) {
                this.jugador.añadirObjeto(producto);
                productoElement.classList.add('seleccionado');
                boton.textContent = 'Vender';
                boton.className = 'btn btn-retirar';

                // Mostrar animación de confirmación
                this.mostrarAnimacionConfirmacion();
            } else {
                this.mostrarMensajeError('¡No tienes suficiente dinero!');
                return;
            }
        } else {
            // Vender el producto (recuperar el 80% del precio)
            const precioVenta = Math.floor(precioProducto * 0.8);
            this.jugador.sumarDinero(precioVenta);

            // Buscar y eliminar el producto exacto por nombre y rareza
            const index = this.jugador.inventario.findIndex(item =>
                item.nombre === nombreProducto && item.rareza === rarezaProducto
            );
            if (index > -1) {
                this.jugador.inventario.splice(index, 1);
            }
            productoElement.classList.remove('seleccionado');
            boton.textContent = 'Comprar';
            boton.className = 'btn btn-comprar';

            // Mostrar animación de venta
            this.mostrarAnimacionVenta(precioVenta);
        }

        this.actualizarCesta();
        this.actualizarTarjetaJugador();
        this.actualizarEstadisticasMercado();
    }

    /**
     * Muestra una animación de venta cuando se vende un producto
     * @param {number} precioVenta - Precio de venta del producto
     * @private
     */
    mostrarAnimacionVenta(precioVenta) {
        const animacion = document.createElement('div');
        animacion.className = 'animacion-venta';
        animacion.textContent = `+${precioVenta} €`;

        document.body.appendChild(animacion);

        setTimeout(() => {
            if (document.body.contains(animacion)) {
                document.body.removeChild(animacion);
            }
        }, 1000);
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
        } else {
            this.jugador.inventario.forEach(producto => {
                const itemElement = document.createElement('div');
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

        // ¡IMPORTANTE! Actualizar también el inventario del footer
        this.actualizarInventarioFooter();
    }

    /**
     * Muestra una animación de confirmación cuando se añade un producto al carrito
     * @private
     */
    mostrarAnimacionConfirmacion() {
        // Crear elemento de confirmación
        const animacion = document.createElement('div');
        animacion.className = 'animacion-confirmacion';
        animacion.textContent = '✓ Comprado';

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
                    <p><strong>Recompensa:</strong> ${this.calcularRecompensa(enemigo)}€</p>
                </div>
                ${esJefe ? '<p class="jefe-label">¡JEFE FINAL!</p>' : ''}
            `;
            listaEnemigos.appendChild(enemigoElement);
        });
    }

    /**
     * Calcula la recompensa en monedas por derrotar a un enemigo
     * @param {Enemigo} enemigo - Enemigo a calcular recompensa
     * @returns {number} Cantidad de monedas de recompensa
     * @private
     */
    calcularRecompensa(enemigo) {
        let recompensa = 10;
        if (enemigo.nombre === 'Orco') recompensa = 20;
        if (enemigo.nombre === 'Dragón') recompensa = 50;
        return recompensa;
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
        } else {
            // Si gana el jugador, mostrar animación de monedas
            this.mostrarAnimacionMonedas();

            // Sumar dinero al jugador
            const recompensa = this.calcularRecompensa(enemigo);
            this.jugador.sumarDinero(recompensa);
        }
    }

    /**
     * Muestra la animación de monedas cayendo
     * @private
     */
    mostrarAnimacionMonedas() {
        // Posiciones: 25%, 50%, 75% del ancho de la pantalla
        const posiciones = ['25%', '50%', '75%'];

        posiciones.forEach((pos, index) => {
            // Crear elemento moneda
            const moneda = document.createElement('div');
            moneda.className = 'moneda-animada';
            moneda.style.left = pos;

            // Crear imagen de moneda (500x500)
            const img = document.createElement('img');
            img.src = 'assets/images/moneda.png';
            img.alt = 'Moneda';
            img.style.width = '60px';
            img.style.height = '60px';

            moneda.appendChild(img);
            document.body.appendChild(moneda);

            // Retraso escalonado para cada moneda
            setTimeout(() => {
                if (document.body.contains(moneda)) {
                    document.body.removeChild(moneda);
                }
            }, 2500 + (index * 100));
        });
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

        const recompensa = this.calcularRecompensa(enemigo);

        if (resultado.ganador === 'jugador') {
            resultadoElement.innerHTML = `
                <div class="victoria-texto">
                    <h3>¡VICTORIA!</h3>
                    <p>Has derrotado a ${enemigo.nombre}</p>
                    <p class="puntos-ganados">+${resultado.puntos} puntos</p>
                    <p class="monedas-ganadas">+${recompensa} monedas</p>
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
 * Maneja la creación del personaje desde la escena 0
 * @private
 */
    crearPersonaje() {
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre-personaje').value.trim() || 'Cazador';
        const avatar = document.querySelector('.avatar-option.active').getAttribute('data-avatar');
        const vida = parseInt(document.getElementById('vida-base').value);
        const ataque = parseInt(document.getElementById('ataque-base').value);
        const defensa = parseInt(document.getElementById('defensa-base').value);

        // Crear jugador con los valores personalizados
        this.jugador = new Jugador(nombre, avatar, vida, ataque, defensa);

        // Actualizar la interfaz
        this.actualizarTarjetaJugador();
        this.actualizarEstadisticasMercado();
        this.actualizarCesta();

        // Actualizar inventario del footer
        this.actualizarInventarioFooter();

        // Cambiar a la escena de inicio
        this.mostrarEscena('escena-inicio');
    }

    /**
     * Configura los eventos para la creación del personaje
     * @private
     */
    configurarCreacionPersonaje() {
        // Sliders de estadísticas
        const vidaSlider = document.getElementById('vida-base');
        const ataqueSlider = document.getElementById('ataque-base');
        const defensaSlider = document.getElementById('defensa-base');

        // Actualizar valores en tiempo real
        vidaSlider.addEventListener('input', (e) => {
            document.getElementById('vida-valor').textContent = e.target.value;
            document.getElementById('resumen-vida').textContent = e.target.value;
            this.calcularPuntosUsados();
        });

        ataqueSlider.addEventListener('input', (e) => {
            document.getElementById('ataque-valor').textContent = e.target.value;
            document.getElementById('resumen-ataque').textContent = e.target.value;
            this.calcularPuntosUsados();
        });

        defensaSlider.addEventListener('input', (e) => {
            document.getElementById('defensa-valor').textContent = e.target.value;
            document.getElementById('resumen-defensa').textContent = e.target.value;
            this.calcularPuntosUsados();
        });

        // Selección de avatar
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
            });
        });

        // Nombre del personaje
        const nombreInput = document.getElementById('nombre-personaje');
        nombreInput.addEventListener('input', (e) => {
            if (e.target.value.length > 20) {
                e.target.value = e.target.value.substring(0, 20);
            }
        });
    }

    /**
     * Calcula los puntos usados en la creación del personaje
     * @private
     */
    calcularPuntosUsados() {
        const vida = parseInt(document.getElementById('vida-base').value);
        const ataque = parseInt(document.getElementById('ataque-base').value);
        const defensa = parseInt(document.getElementById('defensa-base').value);

        // Fórmula: (vida - 80)/10 + ataque + defensa
        const puntosVida = Math.max(0, (vida - 80) / 10);
        const puntosTotales = puntosVida + ataque + defensa;

        document.getElementById('puntos-usados').textContent = puntosTotales.toFixed(1);

        // Cambiar color si se excede el límite
        const puntosElement = document.getElementById('puntos-usados');
        if (puntosTotales > 10) {
            puntosElement.style.color = 'var(--color-danger)';
        } else {
            puntosElement.style.color = 'var(--color-success)';
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

        // Guardar el resultado en el ranking
        this.guardarEnRanking();
    }

    /**
     * Guarda los datos del jugador en el ranking (LocalStorage)
     * @private
     */
    guardarEnRanking() {
        // Obtener datos del jugador
        const datosJugador = this.jugador.obtenerDatosParaRanking();

        // Obtener ranking actual de LocalStorage o crear uno nuevo
        let ranking = JSON.parse(localStorage.getItem('ranking-juego-js')) || [];

        // Añadir nuevo jugador al ranking
        ranking.push(datosJugador);

        // Ordenar por puntuación (descendente)
        ranking.sort((a, b) => b.puntuacion - a.puntuacion);

        // Mantener solo los 10 mejores resultados
        ranking = ranking.slice(0, 10);

        // Guardar en LocalStorage
        localStorage.setItem('ranking-juego-js', JSON.stringify(ranking));
    }

    /**
     * Muestra la escena de ranking
     * @private
     */
    mostrarRanking() {
        this.mostrarEscena('escena-ranking');
    }

    /**
     * Carga y muestra la tabla de ranking
     * @private
     */
    cargarTablaRanking() {
        const cuerpoTabla = document.getElementById('cuerpo-tabla-ranking');
        if (!cuerpoTabla) return;

        // Obtener ranking de LocalStorage
        let ranking = JSON.parse(localStorage.getItem('ranking-juego-js')) || [];

        // Si no hay datos, crear algunos datos de ejemplo
        if (ranking.length === 0) {
            ranking = this.crearDatosEjemploRanking();
        }

        // Limpiar tabla
        cuerpoTabla.innerHTML = '';

        // Llenar tabla con los datos
        ranking.forEach((jugador, index) => {
            const fila = document.createElement('tr');

            // Determinar clase especial para los primeros puestos
            let claseFila = '';
            if (index === 0) claseFila = 'primer-puesto';
            if (index === 1) claseFila = 'segundo-puesto';
            if (index === 2) claseFila = 'tercer-puesto';

            fila.className = claseFila;

            // Emoji para los primeros puestos
            let emojiPosicion = `${index + 1}`;
            if (index === 0) emojiPosicion = '🥇';
            if (index === 1) emojiPosicion = '🥈';
            if (index === 2) emojiPosicion = '🥉';

            fila.innerHTML = `
                <td>${emojiPosicion}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntuacion}</td>
                <td>${jugador.monedas}</td>
                <td>${jugador.fecha}</td>
            `;

            cuerpoTabla.appendChild(fila);
        });
    }

    /**
     * Crea datos de ejemplo para el ranking
     * @returns {Array} Datos de ejemplo
     * @private
     */
    crearDatosEjemploRanking() {
        return [
            { nombre: "Arturo", puntuacion: 850, monedas: 320, fecha: "15/01/2024" },
            { nombre: "Morgana", puntuacion: 720, monedas: 280, fecha: "14/01/2024" },
            { nombre: "Galahad", puntuacion: 650, monedas: 240, fecha: "13/01/2024" },
            { nombre: "Lancelot", puntuacion: 580, monedas: 210, fecha: "12/01/2024" },
            { nombre: "Guinevere", puntuacion: 520, monedas: 190, fecha: "11/01/2024" },
            { nombre: "Merlín", puntuacion: 480, monedas: 170, fecha: "10/01/2024" },
            { nombre: "Percival", puntuacion: 420, monedas: 150, fecha: "09/01/2024" },
            { nombre: "Gawain", puntuacion: 380, monedas: 130, fecha: "08/01/2024" },
            { nombre: "Bedivere", puntuacion: 320, monedas: 110, fecha: "07/01/2024" },
            { nombre: "Tristán", puntuacion: 280, monedas: 90, fecha: "06/01/2024" }
        ];
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

            const recompensa = this.calcularRecompensa(enemigo);

            batallaElement.innerHTML = `
                <h4>Batalla ${index + 1}: vs ${enemigo.nombre}</h4>
                <p><strong>Resultado:</strong> ${batalla.ganador === 'jugador' ? '✅ Victoria' : '❌ Derrota'}</p>
                <p><strong>Puntos obtenidos:</strong> ${batalla.puntos}</p>
                ${batalla.ganador === 'jugador' ? `<p><strong>Monedas ganadas:</strong> ${recompensa}</p>` : ''}
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
