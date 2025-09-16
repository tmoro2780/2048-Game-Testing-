// Creamos el tablero en forma de matriz 4x4
let tablero = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

// Guardamos los bloques (celdas HTML) en un array
const bloques = [];
for (let i = 0; i < 16; i++) {
  bloques.push(document.getElementById(i));
}

// Función para mostrar el tablero en el HTML
function renderizarTablero() {
  let index = 0;
  for (let fila = 0; fila < 4; fila++) {
    for (let col = 0; col < 4; col++) {
      const valor = tablero[fila][col];
      bloques[index].textContent = valor === 0 ? "" : valor;
      index++;
    }
  }
  actualizarColores(); // 🔥 Se llama cada vez que se renderiza
}


// Función para generar un número 2 en una posición aleatoria vacía
function spawnNumber() {
  const posicionesLibres = [];

  // Buscar todas las posiciones vacías (con 0)
  for (let fila = 0; fila < 4; fila++) {
    for (let col = 0; col < 4; col++) {
      if (tablero[fila][col] === 0) {
        posicionesLibres.push({ fila, col });
      }
    }
  }
  // Si hay al menos una posición libre, poner un 2 en una aleatoria
  if (posicionesLibres.length > 0) {
    const randomIndex = Math.floor(Math.random() * posicionesLibres.length);
    const posicion = posicionesLibres[randomIndex];
    tablero[posicion.fila][posicion.col] = 2;
  }
}

// Función para iniciar el juego
function startGame() {
  // Reiniciamos el tablero
  tablero = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  spawnNumber();         // Agrega un 2 al tablero
  renderizarTablero();   // Muestra el tablero en la pantalla
}

function move(direction) {
    // Usamos la direccion en la que se toco la tecla
    switch (direction) {
      case "up":
        // Si el bloque arriba es igual a 2, lo eliminamos
        if (tablero[0][0] === 2) {
          tablero[0][0] = 0;
          renderizarTablero();
        }
        // Si el bloque arriba es igual a 4, lo eliminamos
        if (tablero[0][0] === 4) {
          tablero[0][0] = 0;
          renderizarTablero();
        }
        // Si el bloque arriba no es igual a 2 o 4, lo sumamos a la columna
        else {
          tablero[0][0] += 2;
          renderizarTablero();
        }
        break;
      case "down":
        // Si el bloque abajo es igual a 2, lo eliminamos
        if (tablero[3][0] === 2) {
          tablero[3][0] = 0;
          renderizarTablero();
        }
        // Si el bloque abajo es igual a 4, lo eliminamos
        if (tablero[3][0] === 4) {
          tablero[3][0] = 0;
          renderizarTablero();
        }
        // Si el bloque abajo no es igual a 2 o 4, lo sumamos a la columna
        else {
          tablero[3][0] += 2;
          renderizarTablero();
        }
        break;
      case "left":
        // Si el bloque a la izquierda es igual a 2, lo eliminamos
        if (tablero[0][0] === 2) {
          tablero[0][0] = 0;
          renderizarTablero();
        }
        // Si el bloque a la izquierda es igual a 4, lo eliminamos
        if (tablero[0][0] === 4) {
          tablero[0][0] = 0;
          renderizarTablero();
        }
        // Si el bloque a la izquierda no es igual a 2 o 4, lo sumamos a la columna
        else {
          tablero[0][0] += 2;
          renderizarTablero();
        }
        break;
      case "right":
        // Si el bloque a la derecha es igual a 2, lo eliminamos
        if (tablero[0][3] === 2) {
          tablero[0][3] = 0;
          renderizarTablero();
        }
        // Si el bloque a la derecha es igual a 4, lo eliminamos
        if (tablero[0][3] === 4) {
          tablero[0][3] = 0;
          renderizarTablero();
        }
        // Si el bloque a la derecha no es igual a 2 o 4, lo sumamos a la columna
        else {
          tablero[0][3] += 2;
          renderizarTablero();
        }
        break;
    }
}

function actualizarColores() {
  for (let fila = 0; fila < 4; fila++) {
    for (let col = 0; col < 4; col++) {
      const valor = tablero[fila][col];
      const celda = bloques[fila * 4 + col];

      switch (valor) {
        case 0:
          celda.style.backgroundColor = "white";
          break;
        case 2:
          celda.style.backgroundColor = "#FF5B5B";
          break;
        case 4:
          celda.style.backgroundColor = "#EE526B";
          break;
        case 8:
          celda.style.backgroundColor = "#DD497C";
          break;
        case 16:
          celda.style.backgroundColor = "#CC408C";
          break;
        case 32:
          celda.style.backgroundColor = "#BB379D";
          break;
        case 64:
          celda.style.backgroundColor = "#AA2EAD";
          break;
        case 128:
          celda.style.backgroundColor = "#9924BD";
          break;
        case 256:
          celda.style.backgroundColor = "#881BCE";
          break;
        case 512:
          celda.style.backgroundColor = "#7712DE";
          break;
        case 1024:
          celda.style.backgroundColor = "#6609EF";
          break;
        case 2048:
          celda.style.backgroundColor = "#5500FF";
          break;
        default:
          celda.style.backgroundColor = "black"; // por si se va de rango
          break;
      }
    }
  }
}

document.addEventListener('keydown', function(event) {
    console.log("Presionaste la tecla:", event.key);
    move("down");
});

document.addEventListener('keyup', function(event) {
    console.log("Presionaste la tecla:", event.key);
    move("up");
});

document.addEventListener('keyright', function(event) {
    console.log("Presionaste la tecla:", event.key);
    move("right");
});

document.addEventListener('keyleft', function(event) {
    console.log("Presionaste la tecla:", event.key);
    move("left");
});
// Llamamos a startGame() cuando cargue la página
startGame();
