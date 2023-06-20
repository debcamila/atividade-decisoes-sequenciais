// INICIALIZANDO MATRIZES DE TRANSICAO PARA AS ACOES UP, RIGHT, DOWN E LEFT
let t_up = [];
for (let i = 1; i <= 6; i++) {
  t_up[i] = [];
  for (let j = 1; j <= 6; j++) {
    t_up[i][j] = 0;
  }
}

let t_right = [];
for (let i = 1; i <= 6; i++) {
  t_right[i] = [];
  for (let j = 1; j <= 6; j++) {
    t_right[i][j] = 0;
  }
}

let t_down = [];
for (let i = 1; i <= 6; i++) {
  t_down[i] = [];
  for (let j = 1; j <= 6; j++) {
    t_down[i][j] = 0;
  }
}

let t_left = [];
for (let i = 1; i <= 6; i++) {
  t_left[i] = [];
  for (let j = 1; j <= 6; j++) {
    t_left[i][j] = 0;
  }
}

// MATRIZ DE TRANSICAO PARA A ACAO UP
t_up[1][1] = 0.1;
t_up[1][2] = 0.1;
t_up[1][3] = 0.8;

t_up[2][2] = 0.1;
t_up[2][1] = 0.1;
t_up[2][4] = 0.8;

t_up[3][3] = 0.1;
t_up[3][4] = 0.1;
t_up[3][5] = 0.8;

t_up[4][4] = 0.1;
t_up[4][3] = 0.1;
t_up[4][6] = 0.8;

// MATRIZ DE TRANSICAO PARA A ACAO RIGHT
t_right[1][1] = 0.1;
t_right[1][2] = 0.8;
t_right[1][3] = 0.1;

t_right[2][2] = 0.9;
t_right[2][4] = 0.1;

t_right[3][1] = 0.1;
t_right[3][4] = 0.8;
t_right[3][5] = 0.1;

t_right[4][2] = 0.1;
t_right[4][4] = 0.8;
t_right[4][6] = 0.1;

// MATRIZ DE TRANSICAO PARA A ACAO DOWN
t_down[1][1] = 0.9;
t_down[1][2] = 0.1;

t_down[2][2] = 0.9;
t_down[2][1] = 0.1;

t_down[3][1] = 0.8;
t_down[3][3] = 0.1;
t_down[3][4] = 0.1;

t_down[4][4] = 0.1;
t_down[4][2] = 0.8;
t_down[4][3] = 0.1;

// MATRIZ DE TRANSICAO PARA A ACAO LEFT
t_left[1][1] = 0.9;
t_left[1][3] = 0.1;

t_left[2][1] = 0.8;
t_left[2][2] = 0.1;
t_left[2][4] = 0.1;

t_left[3][1] = 0.1;
t_left[3][3] = 0.8;
t_left[3][5] = 0.1;

t_left[4][2] = 0.1;
t_left[4][3] = 0.8;
t_left[4][6] = 0.1;

// FUNCAO PARA RECALCULAR OS VALORES DAS UTILIDADES DOS ESTADOS
function update_value(t_up, t_down, t_right, t_left, rw, value, gamma) {
  console.log("INPUT UTILITIES");
  let aux = [];
  for (let i = 1; i <= 3; i++) {
    aux[i] = [];
    for (let j = 1; j <= 2; j++) {
      aux[i][j] = 0;
    }
  }
  aux[1] = [value[5], value[6]];
  aux[2] = [value[3], value[4]];
  aux[3] = [value[1], value[2]];

  console.table(aux);

  let value_aux = Array(6).fill(0);

  for (let s = 1; s <= 6; s++) {
    // PARA CALCULAR A UTILIDADE ESPERADA DOS RESULTADOS DA ACAO NO ESTADO S
    let v_up = t_up[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_down = t_down[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_left = t_left[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_right = t_right[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    // EQUACAO DE BELMAN
    value_aux[s] = rw[s] + gamma * Math.max(...[v_up, v_down, v_left, v_right]);
  }

  value = value_aux;

  aux = [];
  for (let i = 1; i <= 3; i++) {
    aux[i] = [];
    for (let j = 1; j <= 2; j++) {
      aux[i][j] = 0;
    }
  }
  aux[1] = [value[5], value[6]];
  aux[2] = [value[3], value[4]];
  aux[3] = [value[1], value[2]];
  console.log("OUTPUT UTILITIES");
  console.table(aux);

  return value_aux;
}

// FUNCAO QUE RETORNA A POLICY
function return_policy(t_up, t_down, t_right, t_left, value) {
  let policy = [null];

  for (let s = 1; s <= 4; s++) {
    let v_up = t_up[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_down = t_down[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_left = t_left[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let v_right = t_right[s]
      .map((t, i) => t * value[i])
      .reduce((t, a, i) => (i != 0 ? t + a : a), 0);

    let biggestIndex = [v_up, v_down, v_left, v_right].indexOf(
      Math.max(...[v_up, v_down, v_left, v_right])
    );
    policy.push(biggestIndex);
  }

  let actions = ["UP", "DW", "LF", "RG"];

  let s1 = `-1 +1`;
  let s2 = `${actions[policy[3]]} ${actions[policy[4]]}`;
  let s3 = `${actions[policy[1]]} ${actions[policy[2]]}`;

  console.log(`
      ${s1}
      ${s2}
      ${s3}
    `);
}

// EXECUCAO PRINCIPAL DO CODIGO
let rw = Array(6).fill(-0.04);

rw[5] = -1;
rw[6] = 1;

let gamma = 1;

let value = Array(6).fill(0);

value[5] = -1;
value[6] = 1;

for (let f = 1; f <= 20; f++) {
  value = update_value(t_up, t_down, t_right, t_left, rw, value, gamma);
}
let policy = return_policy(t_up, t_down, t_right, t_left, value);
