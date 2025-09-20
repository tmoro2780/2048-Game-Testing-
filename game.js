// ================== Estado ==================
let tablero = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

// Tomamos las 16 celdas por id 0..15 (como en tu HTML)
const bloques = [];
for (let i = 0; i < 16; i++) {
  bloques.push(document.getElementById(String(i)));
}

// ================== Render ==================
function renderizarTablero() {
  let index = 0;
  for (let fila = 0; fila < 4; fila++) {
    for (let col = 0; col < 4; col++) {
      const valor = tablero[fila][col];
      const celda = bloques[index];
      celda.textContent = valor === 0 ? "" : valor;
      // opcional: tamaño de fuente un poco responsive
      celda.style.fontWeight = "700";
      celda.style.fontSize =
        valor >= 1024 ? "22px" :
        valor >= 128  ? "26px" :
        valor >= 16   ? "28px" : "32px";
      index++;
    }
  }
  actualizarColores();
}

// Si ya tenías esta función en otro archivo, podés mantener la tuya.
// De lo contrario, te dejo una versión lista:
function actualizarColores() {
  for (let fila = 0; fila < 4; fila++) {
    for (let col = 0; col < 4; col++) {
      const valor = tablero[fila][col];
      const celda = bloques[fila * 4 + col];

      switch (valor) {
        case 0:    celda.style.backgroundColor = "white"; break;
        case 2:    celda.style.backgroundColor = "#FF5B5B"; break;
        case 4:    celda.style.backgroundColor = "#EE526B"; break;
        case 8:    celda.style.backgroundColor = "#DD497C"; break;
        case 16:   celda.style.backgroundColor = "#CC408C"; break;
        case 32:   celda.style.backgroundColor = "#BB379D"; break;
        case 64:   celda.style.backgroundColor = "#AA2EAD"; break;
        case 128:  celda.style.backgroundColor = "#9924BD"; break;
        case 256:  celda.style.backgroundColor = "#881BCE"; break;
        case 512:  celda.style.backgroundColor = "#7712DE"; break;
        case 1024: celda.style.backgroundColor = "#6609EF"; break;
        case 2048: celda.style.backgroundColor = "#5500FF"; break;
        default:   celda.style.backgroundColor = "black";   break;
      }

      celda.style.color = valor <= 4 ? "#333" : "white";
      celda.style.display = "flex";
      celda.style.alignItems = "center";
      celda.style.justifyContent = "center";
      celda.style.borderRadius = "10px";
      celda.style.minWidth = "64px";
      celda.style.minHeight = "64px";
    }
  }
}

// ================== Utilidades ==================
function clonarTablero(b) { return b.map(fila => fila.slice()); }

function tablerosIguales(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}

function transponer(b) {
  const t = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) t[j][i] = b[i][j];
  }
  return t;
}

// Desliza a la izquierda y combina (regla de 2048: 1 fusión por par)
function deslizarFila(fila) {
  const numeros = fila.filter(v => v !== 0);
  for (let i = 0; i < numeros.length - 1; i++) {
    if (numeros[i] === numeros[i + 1]) {
      numeros[i] *= 2;
      numeros[i + 1] = 0;
      i++; // saltear la siguiente para evitar doble combinación
    }
  }
  const compacta = numeros.filter(v => v !== 0);
  while (compacta.length < 4) compacta.push(0);
  return compacta;
}

// ================== Spawneo ==================
function generarNumero() {
  const libres = [];
  for (let f = 0; f < 4; f++) {
    for (let c = 0; c < 4; c++) {
      if (tablero[f][c] === 0) libres.push({ f, c });
    }
  }
  if (libres.length === 0) return;
  const { f, c } = libres[Math.floor(Math.random() * libres.length)];
  tablero[f][c] = Math.random() < 0.9 ? 2 : 4; // 90% 2, 10% 4
}

// ================== Movimientos ==================
function moverIzquierda() {
  const antes = clonarTablero(tablero);
  for (let f = 0; f < 4; f++) tablero[f] = deslizarFila(tablero[f]);
  return !tablerosIguales(antes, tablero);
}

function moverDerecha() {
  const antes = clonarTablero(tablero);
  for (let f = 0; f < 4; f++) {
    const invertida = tablero[f].slice().reverse();
    tablero[f] = deslizarFila(invertida).reverse();
  }
  return !tablerosIguales(antes, tablero);
}

function moverArriba() {
  const antes = clonarTablero(tablero);
  let t = transponer(tablero);
  for (let f = 0; f < 4; f++) t[f] = deslizarFila(t[f]);
  tablero = transponer(t);
  return !tablerosIguales(antes, tablero);
}

function moverAbajo() {
  const antes = clonarTablero(tablero);
  let t = transponer(tablero);
  for (let f = 0; f < 4; f++) {
    const invertida = t[f].slice().reverse();
    t[f] = deslizarFila(invertida).reverse();
  }
  tablero = transponer(t);
  return !tablerosIguales(antes, tablero);
}

function hayMovimientos() {
  for (let f = 0; f < 4; f++) {
    for (let c = 0; c < 4; c++) {
      if (tablero[f][c] === 0) return true;
      if (c < 3 && tablero[f][c] === tablero[f][c + 1]) return true;
      if (f < 3 && tablero[f][c] === tablero[f + 1][c]) return true;
    }
  }
  return false;
}

// Dirección en texto: "izquierda" | "derecha" | "arriba" | "abajo"
function mover(direccion) {
  let movio = false;
  if (direccion === "izquierda") movio = moverIzquierda();
  if (direccion === "derecha")   movio = moverDerecha();
  if (direccion === "arriba")    movio = moverArriba();
  if (direccion === "abajo")     movio = moverAbajo();

  if (movio) {
    generarNumero();
    renderizarTablero();
    actualizarPuntaje();
    if (!hayMovimientos()) setTimeout(() => alert("¡Game Over!"), 50);
  }
}

function actualizarPuntaje() {
  let puntaje = 0;
  for (let f = 0; f < 4; f++) {
    for (let c = 0; c < 4; c++) {
      puntaje += tablero[f][c];
    }
  }
  document.getElementById("puntaje").textContent =" "+ puntaje;

}
// ================== Inicio / Reinicio ==================
function iniciarJuego() {
  tablero = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  generarNumero();
  generarNumero();
  renderizarTablero();
}

// ================== Teclado y Botones ==================


document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","a","A","d","D","w","W","s","S"].includes(k)) {
    e.preventDefault(); // evita scroll con flechas
  }
  if (k === "ArrowLeft" || k === "a" || k === "A") mover("izquierda");
  if (k === "ArrowRight"|| k === "d" || k === "D") mover("derecha");
  if (k === "ArrowUp"   || k === "w" || k === "W") mover("arriba");
  if (k === "ArrowDown" || k === "s" || k === "S") mover("abajo");
});

// Botón Reiniciar (id="reiniciar" en tu HTML)
document.getElementById("reiniciar").addEventListener("click", iniciarJuego);

document.getElementById("instrucciones").addEventListener("click", () => {
  alert("Usa las flechas del teclado o las teclas W A S D para mover las fichas.\nCuando dos fichas con el mismo número se tocan, se combinan en una sola con su suma.\n\nEl objetivo es llegar a la ficha 2048. ¡Buena suerte!");
});

// ================== Inicio ==================
// ¡a jugar!
iniciarJuego();
