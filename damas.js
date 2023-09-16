const tablero = [];

//funcion que coloca las fichas en las posiciones iniciales
function inicializarTablero() {
    for (let i = 0; i < 8; i++) { // fila
        let fila = [];
        for (let j = 0; j < 8; j++) { // columna
            if ((i + j) % 2 === 0) { // en estas posiciones hay piezas
                if (i < 3) { // en las filas 0,1 y 2 hay fichas blancas
                    fila.push('X');
                } else if (i > 4) { // en las filas 5,6 y 7 hay fichas negras
                    fila.push('O');
                } else {
                    // se insertan los espacios vacíos
                    fila.push(' ');
                }
            } else {
                fila.push(' '); // en las posiciones con i+j impares se insertan espacios vacios
            }
        }
        tablero.push(fila); // se mete la fila en el tablero
    }
}

// funcion para imprimir el tablero
function mostrarTablero() {
    // las letras para decorar el tablero
    console.log('|   | A | B | C | D | E | F | G | H |');
    for (let i = 0; i < 8; i++) {
        // el numero de la fila para decorar el tablero y luego se imprime por fila
        let row = '| ' + (i + 1) + ' | ' + tablero[i].join(' | ') + ' |';
        console.log(row);
        console.log('--------------------------------------');
    }
    console.log('| A | B | C | D | E | F | G | H |');
}

// se verifica que la ficha que el jugador esta seleccionando, le corresponde
// si el usuario juega, la ficha en la posicion de origen debe ser X
function validarOrigen(fila_origen, columna_origen, jugador) {
    return tablero[fila_origen][columna_origen] === jugador;
}

// una vez validado el movimiento, se mueve la ficha
function moverPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador) {
    tablero[fila_destino][columna_destino] = jugador; // se coloca la ficha en la posicion de destino
    tablero[fila_origen][columna_origen] = ' '; // se vacia la posicion de origen
}

// se verifica que el movimiento es valido segun las reglas del juego (movimiento en diagonal)
function validarDestino(fila_origen, columna_origen, fila_destino, columna_destino, oponente, jugador) {
    // isEmpty es una variable booleana
    const isEmpty = tablero[fila_destino][columna_destino] === ' '; // es true o false, si la posición donde se está intentando mover está vacía

    let filaDest;
    let filaDest2;
    let filaOp;

    if (jugador === 'X') { // si está jugando la blanca, el movimiento es hacia abajo
        // filaDest y filaDest2 son variables booleanas
        filaDest = ((fila_destino === fila_origen + 1) && (fila_origen + 1) <= 7);
        filaDest2 = ((fila_destino === fila_origen + 2) && (fila_origen + 2) <= 7);

        // filaOp es una variable numerica -> es la fila donde debe estar el oponente
        filaOp = fila_origen + 1; // la fila del oponente (si la ficha es blanca, el oponente esta una fila hacia abajo)

    } else if (jugador === 'O') { // si está jugando la negra, el movimiento es hacia arriba
        filaDest = ((fila_destino === fila_origen - 1) && (fila_origen - 1) >= 0);
        filaDest2 = ((fila_destino === fila_origen - 2) && (fila_origen - 2) >= 0);
        filaOp = fila_origen - 1; // la fila del oponente (si la ficha es negra, el oponente esta una fila hacia arriba)
    }

    // variables booleanas que verifican si hay un oponente en la posicion adyacente
    const hayOponenteRight = tablero[filaOp][columna_origen + 1] === oponente;
    const hayOponenteLeft = tablero[filaOp][columna_origen - 1] === oponente

    if (isEmpty) {
        if (filaDest) { // se mueve un paso
            if (
                (columna_destino === columna_origen + 1) ||
                (columna_destino === columna_origen - 1)
            ) {
                return 0;
            }
        }
        if (filaDest2) { // se mueve 2 pasos si hay un oponente en la posicion adyacente
            if ((columna_destino === columna_origen + 2) && (columna_origen + 2 <= 7)) {
                if (hayOponenteRight) {
                    tablero[filaOp][columna_origen + 1] = ' '; // se come al oponente
                    return 1; // se retorna 1 que significa que le comio a un oponente
                }

            }
            else if ((columna_destino === columna_origen - 2) && (columna_origen - 2 >= 0)) {
                if (hayOponenteLeft) {
                    tablero[filaOp][columna_origen - 1] = ' ';
                    return 1;
                }

            }
        }
    }

    return -1;
}


function jugarPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador) {
    let oponente;
    if (jugador === 'X') {
        oponente = 'O';
    } else if (jugador === 'O') {
        oponente = 'X';
    }
    const isValidOrigen = validarOrigen(fila_origen, columna_origen, jugador);

    if (isValidOrigen) {
        const isValidDestino = validarDestino(fila_origen, columna_origen, fila_destino, columna_destino, oponente, jugador);
        if (isValidDestino >= 0) {
            moverPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador);
            return isValidDestino;
        }
    }
    return -1;
}

function juegaUsuario() {
    let isValid = -1;
    while (isValid == -1) {
        const fila_origen = parseInt(prompt('Ingresa la fila de origen')) - 1;
        const columna_origen = parseInt(prompt('Ingresa la columna de origen')) - 1;
        const fila_destino = parseInt(prompt('Ingresa la fila destino')) - 1;
        const columna_destino = parseInt(prompt('Ingresa la columna destino')) - 1;
        isValid = jugarPieza(fila_origen, columna_origen, fila_destino, columna_destino, 'X');
        if (isValid == -1) {
            alert('Movimiento no válido');
        }
    }
    return isValid;
}

function juegaComputadora() {
    let isValid = -1;
    let fila_origen;
    let columna_origen;
    let fila_destino;
    let columna_destino;
    while (isValid == -1) {
        fila_origen = Math.floor(Math.random() * 8);
        columna_origen = Math.floor(Math.random() * 8);
        fila_destino = Math.floor(Math.random() * 8);
        columna_destino = Math.floor(Math.random() * 8);
        isValid = jugarPieza(fila_origen, columna_origen, fila_destino, columna_destino, 'O');
    }
    alert(`La computadora jugó de (${fila_origen + 1},${columna_origen + 1}) a (${fila_destino + 1},${columna_destino + 1})`);
    return isValid;
}

function jugarDamas() {
    inicializarTablero();
    let terminoJuego = false;
    let contUsuario = 0;
    let contComputadora = 0;
    while (!terminoJuego) {
        mostrarTablero();
        // las funciones juegaUsuario y juegaComputadora retornan un 0 o 1 si le comio o no a un oponente, eso vamos sumando para saber cuando un jugador come todas las piezas del oponente y termina el juego
        contUsuario += juegaUsuario();
        mostrarTablero();
        contComputadora += juegaComputadora();

        console.log(contUsuario, contComputadora);
        if (contUsuario == 12 || contComputadora == 12) {
            // si uno de los jugadores come 12 piezas del oponente, el juego termina
            terminoJuego == true;
        }
    }
}
jugarDamas();
