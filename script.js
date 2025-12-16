//  Colors are coded by letter
const g = "green";
const b = "blue";
const w = "white";
const y = "yellow";
const o = "orange";
const r = "red";

let _tablesPromise = null;

//  Faces are clockwise spirals starting from top left; green is front, white is top
var fFace = [g, g, g, g, g, g, g, g];
var bFace = [b, b, b, b, b, b, b, b];
var uFace = [w, w, w, w, w, w, w, w];
var dFace = [y, y, y, y, y, y, y, y];
var lFace = [o, o, o, o, o, o, o, o];
var rFace = [r, r, r, r, r, r, r, r];

function setSolvedCube() {
    // Fill each face with its color (8 stickers per face)
    fFace = Array(8).fill(g);
    bFace = Array(8).fill(b);
    uFace = Array(8).fill(w);
    dFace = Array(8).fill(y);
    lFace = Array(8).fill(o);
    rFace = Array(8).fill(r);
}

//  Saves the current scramble for later reversion
var currentFScramble = [];
var currentBScramble = [];
var currentUScramble = [];
var currentDScramble = [];
var currentLScramble = [];
var currentRScramble = [];

//  Solution array
var solution = [];

//  Saves the scramble for reconstruction
function saveScramble(){
    currentFScramble = fFace.slice();
    currentBScramble = bFace.slice();
    currentUScramble = uFace.slice();
    currentDScramble = dFace.slice();
    currentLScramble = lFace.slice();
    currentRScramble = rFace.slice();
}

//  Reconstructs the saved scramble
function reconstructScramble(){
    fFace = currentFScramble.slice();
    bFace = currentBScramble.slice();
    uFace = currentUScramble.slice();
    dFace = currentDScramble.slice();
    lFace = currentLScramble.slice();
    rFace = currentRScramble.slice();
}

//  Global color picker variable
var colorChoice = 0;

//  Color picker button elements
var G = document.getElementById("G").onclick = () => {
    colorChoice = 1;
}
var B = document.getElementById("B").onclick = () => {
    colorChoice = 2;
}
var W = document.getElementById("W").onclick = () => {
    colorChoice = 3;
}
var Y = document.getElementById("Y").onclick = () => {
    colorChoice = 4;
}
var O = document.getElementById("O").onclick = () => {
    colorChoice = 5;
}
var R = document.getElementById("R").onclick = () => {
    colorChoice = 6;
}

//  Changes color of tile and value of index
function tileChange(tile, face, i){
    if (colorChoice == 1){
        tile.style.backgroundColor = g;
        face[i] = g;
    } else if (colorChoice == 2){
        tile.style.backgroundColor = b;
        face[i] = b;
    } else if (colorChoice == 3){
        tile.style.backgroundColor = w;
        face[i] = w;
    } else if (colorChoice == 4){
        tile.style.backgroundColor = y;
        face[i] = y;
    } else if (colorChoice == 5){
        tile.style.backgroundColor = o;
        face[i] = o;
    } else if (colorChoice == 6){
        tile.style.backgroundColor = r;
        face[i] = r;
    }
}

const ROT180 = [4,5,6,7,0,1,2,3];

// In the net with B below D, these two look correct:
const UI_TO_B = ROT180;
const UI_TO_D = [0,1,2,3,4,5,6,7]; // identity

//  Cube display button elements
var F0 = document.getElementById("F0");
F0.onclick = () => {
    tileChange(F0, fFace, 0);
}
var F1 = document.getElementById("F1");
F1.onclick = () => {
    tileChange(F1, fFace, 1);
}
var F2 = document.getElementById("F2");
F2.onclick = () => {
    tileChange(F2, fFace, 2);
}
var F3 = document.getElementById("F3");
F3.onclick = () => {
    tileChange(F3, fFace, 3);
}
var F4 = document.getElementById("F4");
F4.onclick = () => {
    tileChange(F4, fFace, 4);
}
var F5 = document.getElementById("F5");
F5.onclick = () => {
    tileChange(F5, fFace, 5);
}
var F6 = document.getElementById("F6");
F6.onclick = () => {
    tileChange(F6, fFace, 6);
}
var F7 = document.getElementById("F7");
F7.onclick = () => {
    tileChange(F7, fFace, 7);
}
var B0 = document.getElementById("B0");
B0.onclick = () => {
    tileChange(B0, bFace, UI_TO_B[0]);
}
var B1 = document.getElementById("B1");
B1.onclick = () => {
    tileChange(B1, bFace, UI_TO_B[1]);
}
var B2 = document.getElementById("B2");
B2.onclick = () => {
    tileChange(B2, bFace, UI_TO_B[2]);
}
var B3 = document.getElementById("B3");
B3.onclick = () => {
    tileChange(B3, bFace, UI_TO_B[3]);
}
var B4 = document.getElementById("B4");
B4.onclick = () => {
    tileChange(B4, bFace, UI_TO_B[4]);
}
var B5 = document.getElementById("B5");
B5.onclick = () => {
    tileChange(B5, bFace, UI_TO_B[5]);
}
var B6 = document.getElementById("B6");
B6.onclick = () => {
    tileChange(B6, bFace, UI_TO_B[6]);
}
var B7 = document.getElementById("B7");
B7.onclick = () => {
    tileChange(B7, bFace, UI_TO_B[7]);
}
var U0 = document.getElementById("U0");
U0.onclick = () => {
    tileChange(U0, uFace, 0);
}
var U1 = document.getElementById("U1");
U1.onclick = () => {
    tileChange(U1, uFace, 1);
}
var U2 = document.getElementById("U2");
U2.onclick = () => {
    tileChange(U2, uFace, 2);
}
var U3 = document.getElementById("U3");
U3.onclick = () => {
    tileChange(U3, uFace, 3);
}
var U4 = document.getElementById("U4");
U4.onclick = () => {
    tileChange(U4, uFace, 4);
}
var U5 = document.getElementById("U5");
U5.onclick = () => {
    tileChange(U5, uFace, 5);
}
var U6 = document.getElementById("U6");
U6.onclick = () => {
    tileChange(U6, uFace, 6);
}
var U7 = document.getElementById("U7");
U7.onclick = () => {
    tileChange(U7, uFace, 7);
}
var D0 = document.getElementById("D0");
D0.onclick = () => {
    tileChange(D0, dFace, UI_TO_D[0]);
}
var D1 = document.getElementById("D1");
D1.onclick = () => {
    tileChange(D1, dFace, UI_TO_D[1]);
}
var D2 = document.getElementById("D2");
D2.onclick = () => {
    tileChange(D2, dFace, UI_TO_D[2]);
}
var D3 = document.getElementById("D3");
D3.onclick = () => {
    tileChange(D3, dFace, UI_TO_D[3]);
}
var D4 = document.getElementById("D4");
D4.onclick = () => {
    tileChange(D4, dFace, UI_TO_D[4]);
}
var D5 = document.getElementById("D5");
D5.onclick = () => {
    tileChange(D5, dFace, UI_TO_D[5]);
}
var D6 = document.getElementById("D6");
D6.onclick = () => {
    tileChange(D6, dFace, UI_TO_D[6]);
}
var D7 = document.getElementById("D7");
D7.onclick = () => {
    tileChange(D7, dFace, UI_TO_D[7]);
}
var L0 = document.getElementById("L0");
L0.onclick = () => {
    tileChange(L0, lFace, 0);
}
var L1 = document.getElementById("L1");
L1.onclick = () => {
    tileChange(L1, lFace, 1);
}
var L2 = document.getElementById("L2");
L2.onclick = () => {
    tileChange(L2, lFace, 2);
}
var L3 = document.getElementById("L3");
L3.onclick = () => {
    tileChange(L3, lFace, 3);
}
var L4 = document.getElementById("L4");
L4.onclick = () => {
    tileChange(L4, lFace, 4);
}
var L5 = document.getElementById("L5");
L5.onclick = () => {
    tileChange(L5, lFace, 5);
}
var L6 = document.getElementById("L6");
L6.onclick = () => {
    tileChange(L6, lFace, 6);
}
var L7 = document.getElementById("L7");
L7.onclick = () => {
    tileChange(L7, lFace, 7);
}
var R0 = document.getElementById("R0");
R0.onclick = () => {
    tileChange(R0, rFace, 0);
}
var R1 = document.getElementById("R1");
R1.onclick = () => {
    tileChange(R1, rFace, 1);
}
var R2 = document.getElementById("R2");
R2.onclick = () => {
    tileChange(R2, rFace, 2);
}
var R3 = document.getElementById("R3");
R3.onclick = () => {
    tileChange(R3, rFace, 3);
}
var R4 = document.getElementById("R4");
R4.onclick = () => {
    tileChange(R4, rFace, 4);
}
var R5 = document.getElementById("R5");
R5.onclick = () => {
    tileChange(R5, rFace, 5);
}
var R6 = document.getElementById("R6");
R6.onclick = () => {
    tileChange(R6, rFace, 6);
}
var R7 = document.getElementById("R7");
R7.onclick = () => {
    tileChange(R7, rFace, 7);
}

const solutionLine = document.getElementById("solutionLine");

const controls = document.getElementById("controls");

//  Turn buttons
var fNTurnButton = document.createElement("button");
    fNTurnButton.innerText = "F";
    controls.appendChild(fNTurnButton);
var fPTurnButton = document.createElement("button");
    fPTurnButton.innerText = "F'";
    controls.appendChild(fPTurnButton);
var bNTurnButton = document.createElement("button");
    bNTurnButton.innerText = "B";
    controls.appendChild(bNTurnButton);
var bPTurnButton = document.createElement("button");
    bPTurnButton.innerText = "B'";
    controls.appendChild(bPTurnButton);
var uNTurnButton = document.createElement("button");
    uNTurnButton.innerText = "U";
    controls.appendChild(uNTurnButton);
var uPTurnButton = document.createElement("button");
    uPTurnButton.innerText = "U'";
    controls.appendChild(uPTurnButton);
var dNTurnButton = document.createElement("button");
    dNTurnButton.innerText = "D";
    controls.appendChild(dNTurnButton);
var dPTurnButton = document.createElement("button");
    dPTurnButton.innerText = "D'";
    controls.appendChild(dPTurnButton);
var lNTurnButton = document.createElement("button");
    lNTurnButton.innerText = "L";
    controls.appendChild(lNTurnButton);
var lPTurnButton = document.createElement("button");
    lPTurnButton.innerText = "L'";
    controls.appendChild(lPTurnButton);
var rNTurnButton = document.createElement("button");
    rNTurnButton.innerText = "R";
    controls.appendChild(rNTurnButton);
var rPTurnButton = document.createElement("button");
    rPTurnButton.innerText = "R'";
    controls.appendChild(rPTurnButton);

//  Reset button
var resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.style.backgroundColor = "red";
    controls.appendChild(resetButton);

//  Scramble button
var scrambleButton = document.createElement("button");
    scrambleButton.innerText = "Scramble";
    scrambleButton.style.backgroundColor = "pink";
    controls.appendChild(scrambleButton);

//  Solve button
var solveButton = document.createElement("button");
    solveButton.innerText = "Solve";
    solveButton.style.backgroundColor = "green";
    controls.appendChild(solveButton);

//  Execute button
var executeButton = document.createElement("button");
    executeButton.innerText = "Execute";
    executeButton.style.backgroundColor = "lightblue";
    controls.appendChild(executeButton);

// ----------------------------
// Face ring index <-> (row,col)
// ring layout in your HTML is:
// 0 1 2
// 7 C 3
// 6 5 4
// ----------------------------
function ringToRC(i) {
  switch (i) {
    case 0: return [0,0];
    case 1: return [0,1];
    case 2: return [0,2];
    case 3: return [1,2];
    case 4: return [2,2];
    case 5: return [2,1];
    case 6: return [2,0];
    case 7: return [1,0];
    default: throw new Error("bad ring index " + i);
  }
}
function rcToRing(r,c) {
  if (r===0 && c===0) return 0;
  if (r===0 && c===1) return 1;
  if (r===0 && c===2) return 2;
  if (r===1 && c===2) return 3;
  if (r===2 && c===2) return 4;
  if (r===2 && c===1) return 5;
  if (r===2 && c===0) return 6;
  if (r===1 && c===0) return 7;
  throw new Error(`bad rc (${r},${c}) for ring`);
}

function rotateRingCW(faceArr) {
  // A 3x3 cw rotation maps ring indices by +2 steps in your ring order
  // Your original did pop/unshift twice; this is the same but explicit.
  const old = faceArr.slice();
  for (let i = 0; i < 8; i++) {
    faceArr[(i + 2) % 8] = old[i];
  }
}
function rotateRingCCW(faceArr) {
  const old = faceArr.slice();
  for (let i = 0; i < 8; i++) {
    faceArr[(i + 6) % 8] = old[i]; // -2 mod 8
  }
}

function idx9ToRC(k){ return [Math.floor(k/3), k%3]; }
function rcToIdx9(r,c){ return r*3 + c; }

// ----------------------------
// Geometry mapping:
// Global axes: X right, Y up, Z front
// Each sticker is on a face normal +/-X +/-Y +/-Z
// with 3x3 coordinates x,y,z in {-1,0,1} and one axis fixed at +/-1.
// ----------------------------
function faceletToXYZ(face, idx9) {
  const [r,c] = idx9ToRC(idx9);
  const x = c - 1;
  const y = 1 - r;

  if (face === "F") return { p: [x, y,  1], n: [0,0, 1] };
  if (face === "B") return { p: [-x, y, -1], n: [0,0,-1] };
  if (face === "U") return { p: [x,  1, r - 1], n: [0, 1,0] };
  if (face === "D") return { p: [x, -1, 1 - r], n: [0,-1,0] };
  if (face === "R") return { p: [ 1, y, 1 - c], n: [ 1,0,0] };
  if (face === "L") return { p: [-1, y, c - 1], n: [-1,0,0] };

  throw new Error("bad face " + face);
}

function xyzToFacelet(p, n) {
  const [x,y,z] = p;
  const [nx,ny,nz] = n;

  let face;
  if (nz ===  1) face = "F";
  else if (nz === -1) face = "B";
  else if (ny ===  1) face = "U";
  else if (ny === -1) face = "D";
  else if (nx ===  1) face = "R";
  else if (nx === -1) face = "L";
  else throw new Error("bad normal " + n);

  let r,c;
  if (face === "F") { r = 1 - y; c = x + 1; }
  else if (face === "B") { r = 1 - y; c = 1 - x; }
  else if (face === "U") { r = z + 1; c = x + 1; }
  else if (face === "D") { r = 1 - z; c = x + 1; }
  else if (face === "R") { r = 1 - y; c = 1 - z; }
  else { /* L */       r = 1 - y; c = z + 1; }

  return { face, idx9: rcToIdx9(r,c) };
}

function rot90AboutX([x,y,z]) { return [x, z, -y]; }  // +90
function rot90AboutY([x,y,z]) { return [z, y, -x]; }  // +90
function rot90AboutZ([x,y,z]) { return [y, -x, z]; }  // +90
function rotN90AboutX([x,y,z]) { return [x, -z, y]; } // -90
function rotN90AboutY([x,y,z]) { return [-z, y, x]; } // -90
function rotN90AboutZ([x,y,z]) { return [-y, x, z]; } // -90

function rotateVec90(v, axis, dir) {
  // dir: +1 means +90 (RH), -1 means -90
  if (axis === "X") return dir === 1 ? rot90AboutX(v) : rotN90AboutX(v);
  if (axis === "Y") return dir === 1 ? rot90AboutY(v) : rotN90AboutY(v);
  if (axis === "Z") return dir === 1 ? rot90AboutZ(v) : rotN90AboutZ(v);
  throw new Error("bad axis " + axis);
}

// Move definition: axis + layer value (+/-1) + dir for clockwise-from-outside view
// Clockwise-from-outside corresponds to -90 around the face normal.
// For faces with normal negative, that flips sign.
const MOVE_DEF = {
  "F": { axis:"Z", layer:  1, dir:  1 },  // was -1
  "B": { axis:"Z", layer: -1, dir: -1 },  // was  1
  "U": { axis:"Y", layer:  1, dir: -1 },  // keep
  "D": { axis:"Y", layer: -1, dir:  1 },  // keep
  "R": { axis:"X", layer:  1, dir:  1 },  // was -1
  "L": { axis:"X", layer: -1, dir: -1 },  // was  1
};

function faceRingTo9(faceArr, centerColor) {
  // returns 9-array in row-major: [0..8]
  // ring indices: 0,1,2,7,_,3,6,5,4  (see your HTML ordering)
  const out = new Array(9);
  out[0] = faceArr[0];
  out[1] = faceArr[1];
  out[2] = faceArr[2];
  out[3] = faceArr[7];
  out[4] = centerColor;
  out[5] = faceArr[3];
  out[6] = faceArr[6];
  out[7] = faceArr[5];
  out[8] = faceArr[4];
  return out;
}

function face9ToRing(face9) {
  // inverse of above
  return [
    face9[0], // 0
    face9[1], // 1
    face9[2], // 2
    face9[5], // 3
    face9[8], // 4
    face9[7], // 5
    face9[6], // 6
    face9[3], // 7
  ];
}

function applyQuarterTurn(faceChar, clockwise=true) {
  const { axis, layer, dir } = MOVE_DEF[faceChar];
  const turnDir = clockwise ? dir : -dir;

  // Build 9-sticker faces including centers
  const F9 = faceRingTo9(fFace, g);
  const B9 = faceRingTo9(bFace, b);
  const U9 = faceRingTo9(uFace, w);
  const D9 = faceRingTo9(dFace, y);
  const L9 = faceRingTo9(lFace, o);
  const R9 = faceRingTo9(rFace, r);

  const FACE9 = { F:F9, B:B9, U:U9, D:D9, L:L9, R:R9 };

  // snapshot all 54 stickers
  const stickers = [];
  for (const face of ["U","D","F","B","L","R"]) {
    const arr9 = FACE9[face];
    for (let k = 0; k < 9; k++) {
      const col = arr9[k];
      const { p, n } = faceletToXYZ(face, k);
      stickers.push({ col, p, n });
    }
  }

  // next faces (9 each)
  const next9 = {
    U: new Array(9),
    D: new Array(9),
    F: new Array(9),
    B: new Array(9),
    L: new Array(9),
    R: new Array(9),
  };

  for (const s of stickers) {
    const coord = axis === "X" ? s.p[0] : axis === "Y" ? s.p[1] : s.p[2];
    let p2 = s.p;
    let n2 = s.n;

    if (coord === layer) {
      p2 = rotateVec90(p2, axis, turnDir);
      n2 = rotateVec90(n2, axis, turnDir);
    }

    const dest = xyzToFacelet(p2, n2);
    next9[dest.face][dest.idx9] = s.col;
  }

  // write back: convert 9 -> ring (ignore centers, they stay fixed by color)
  uFace = face9ToRing(next9.U);
  dFace = face9ToRing(next9.D);
  fFace = face9ToRing(next9.F);
  bFace = face9ToRing(next9.B);
  lFace = face9ToRing(next9.L);
  rFace = face9ToRing(next9.R);
}

// Wrappers keeping your existing function names
function fNTurn(){ applyQuarterTurn("F", true); }
function fPTurn(){ applyQuarterTurn("F", false); }
function bNTurn(){ applyQuarterTurn("B", true); }
function bPTurn(){ applyQuarterTurn("B", false); }
function uNTurn(){ applyQuarterTurn("U", true); }
function uPTurn(){ applyQuarterTurn("U", false); }
function dNTurn(){ applyQuarterTurn("D", true); }
function dPTurn(){ applyQuarterTurn("D", false); }
function lNTurn(){ applyQuarterTurn("L", true); }
function lPTurn(){ applyQuarterTurn("L", false); }
function rNTurn(){ applyQuarterTurn("R", true); }
function rPTurn(){ applyQuarterTurn("R", false); }

//  When clicked, turn occurs
fNTurnButton.onclick = function(){
    fNTurn();
    updateCubeDisplay();
}
fPTurnButton.onclick = function(){
    fPTurn();
    updateCubeDisplay();
}
bNTurnButton.onclick = function(){
    bNTurn();
    updateCubeDisplay();
}
bPTurnButton.onclick = function(){
    bPTurn();
    updateCubeDisplay();
}
uNTurnButton.onclick = function(){
    uNTurn();
    updateCubeDisplay();
}
uPTurnButton.onclick = function(){
    uPTurn();
    updateCubeDisplay();
}
dNTurnButton.onclick = function(){
    dNTurn();
    updateCubeDisplay();
}
dPTurnButton.onclick = function(){
    dPTurn();
    updateCubeDisplay();
}
lNTurnButton.onclick = function(){
    lNTurn();
    updateCubeDisplay();
}
lPTurnButton.onclick = function(){
    lPTurn();
    updateCubeDisplay();
}
rNTurnButton.onclick = function(){
    rNTurn();
    updateCubeDisplay();
}
rPTurnButton.onclick = function(){
    rPTurn();
    updateCubeDisplay();
}

// idx9 -> ring index mapping (inverse of faceRingTo9, excluding center)
const IDX9_TO_RING = {
  0: 0,
  1: 1,
  2: 2,
  3: 7,
  5: 3,
  6: 6,
  7: 5,
  8: 4,
};

const FACE_NORMAL = {
  U: [0, 1, 0],
  D: [0,-1, 0],
  F: [0, 0, 1],
  B: [0, 0,-1],
  R: [1, 0, 0],
  L: [-1,0, 0],
};

// corner cubie positions (by cubie coordinate) and which faces they touch
const CORNER_COORDS = [
  { faces:["U","R","F"], p:[ 1, 1, 1] }, // URF
  { faces:["U","F","L"], p:[-1, 1, 1] }, // UFL
  { faces:["U","L","B"], p:[-1, 1,-1] }, // ULB
  { faces:["U","B","R"], p:[ 1, 1,-1] }, // UBR
  { faces:["D","F","R"], p:[ 1,-1, 1] }, // DFR
  { faces:["D","L","F"], p:[-1,-1, 1] }, // DLF
  { faces:["D","B","L"], p:[-1,-1,-1] }, // DBL
  { faces:["D","R","B"], p:[ 1,-1,-1] }, // DRB
];

// edge cubie positions
const EDGE_COORDS = [
  { faces:["U","R"], p:[ 1, 1, 0] }, // UR
  { faces:["U","F"], p:[ 0, 1, 1] }, // UF
  { faces:["U","L"], p:[-1, 1, 0] }, // UL
  { faces:["U","B"], p:[ 0, 1,-1] }, // UB
  { faces:["D","R"], p:[ 1,-1, 0] }, // DR
  { faces:["D","F"], p:[ 0,-1, 1] }, // DF
  { faces:["D","L"], p:[-1,-1, 0] }, // DL
  { faces:["D","B"], p:[ 0,-1,-1] }, // DB
  { faces:["F","R"], p:[ 1, 0, 1] }, // FR
  { faces:["F","L"], p:[-1, 0, 1] }, // FL
  { faces:["B","L"], p:[-1, 0,-1] }, // BL
  { faces:["B","R"], p:[ 1, 0,-1] }, // BR
];

function faceletToRingPos(face, p) {
  const n = FACE_NORMAL[face];
  const { face: f2, idx9 } = xyzToFacelet(p, n);
  if (f2 !== face) throw new Error(`xyzToFacelet mismatch: expected ${face}, got ${f2}`);
  if (idx9 === 4) throw new Error("center shouldn't appear in corner/edge");
  const ring = IDX9_TO_RING[idx9];
  if (ring === undefined) throw new Error("bad idx9 " + idx9);
  return { f: face, i: ring };
}

const CORNER_POS_STICKERS = CORNER_COORDS.map(c =>
  c.faces.map(face => faceletToRingPos(face, c.p))
);

const EDGE_POS_STICKERS = EDGE_COORDS.map(e =>
  e.faces.map(face => faceletToRingPos(face, e.p))
);

// Corner cubie IDs in the same order as corner positions
const CORNER_CUBIE_COLORS = [
  [w, r, g], // URF
  [w, g, o], // UFL
  [w, o, b], // ULB
  [w, b, r], // UBR
  [y, g, r], // DFR
  [y, o, g], // DLF
  [y, b, o], // DBL
  [y, r, b], // DRB
];

// Edge cubie IDs in same order as edge positions
const EDGE_CUBIE_COLORS = [
  [w, r], // UR
  [w, g], // UF
  [w, o], // UL
  [w, b], // UB
  [y, r], // DR
  [y, g], // DF
  [y, o], // DL
  [y, b], // DB
  [g, r], // FR
  [g, o], // FL
  [b, o], // BL
  [b, r], // BR
];

function getFaceArr(face) {
  switch (face) {
    case "U": return uFace;
    case "D": return dFace;
    case "F": return fFace;
    case "B": return bFace;
    case "L": return lFace;
    case "R": return rFace;
    default: throw new Error("bad face " + face);
  }
}

function stickerAt(pos) {
  return getFaceArr(pos.f)[pos.i];
}

function sameUnordered2(a, b) {
  return (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);
}

function sameUnordered3(a, b) {
  // a,b length 3. compare as multisets
  const aa = a.slice().sort().join("|");
  const bb = b.slice().sort().join("|");
  return aa === bb;
}

function findEdgeCubieId(colors2) {
  for (let id = 0; id < EDGE_CUBIE_COLORS.length; id++) {
    if (sameUnordered2(colors2, EDGE_CUBIE_COLORS[id])) return id;
  }
  return -1;
}

function findCornerCubieId(colors3) {
  for (let id = 0; id < CORNER_CUBIE_COLORS.length; id++) {
    if (sameUnordered3(colors3, CORNER_CUBIE_COLORS[id])) return id;
  }
  return -1;
}

function cornerOriFromCubieAndObserved(cubieId, observed3) {
  const ref = CORNER_CUBIE_COLORS[cubieId]; // canonical order for that cubie

  // orientation 0: [ref0, ref1, ref2]
  if (observed3[0] === ref[0] && observed3[1] === ref[1] && observed3[2] === ref[2]) return 0;

  // orientation 1: [ref2, ref0, ref1]  (twist clockwise)
  if (observed3[0] === ref[2] && observed3[1] === ref[0] && observed3[2] === ref[1]) return 1;

  // orientation 2: [ref1, ref2, ref0]
  if (observed3[0] === ref[1] && observed3[1] === ref[2] && observed3[2] === ref[0]) return 2;

  // If we matched by unordered set earlier, we should always match one of these 3.
  throw new Error(`Corner orientation mismatch for cubie ${cubieId}: obs=${observed3.join(",")} ref=${ref.join(",")}`);
}

function edgeOriFromCubieAndObserved(cubieId, observed2) {
  const ref = EDGE_CUBIE_COLORS[cubieId]; // canonical order

  // orientation 0: same order
  if (observed2[0] === ref[0] && observed2[1] === ref[1]) return 0;

  // orientation 1: flipped
  if (observed2[0] === ref[1] && observed2[1] === ref[0]) return 1;

  throw new Error(
    `Edge orientation mismatch for cubie ${cubieId}: obs=${observed2.join(",")} ref=${ref.join(",")}`
  );
}

function parityOfPermutation(p) {
  // returns 0 for even, 1 for odd
  const n = p.length;
  const seen = new Array(n).fill(false);
  let parity = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i]) continue;
    let cycleLen = 0;
    let j = i;
    while (!seen[j]) {
      seen[j] = true;
      j = p[j];
      cycleLen++;
    }
    if (cycleLen > 0) parity ^= (cycleLen + 1) % 2; // equivalent to (cycleLen-1) parity
  }
  return parity;
}

function stickersToCubie() {
  const cp = new Array(8);
  const co = new Array(8);
  const ep = new Array(12);
  const eo = new Array(12).fill(0);

  // corners
  for (let pos = 0; pos < 8; pos++) {
    const stickers3 = CORNER_POS_STICKERS[pos];
    const colors3 = stickers3.map(stickerAt);

    const cubieId = findCornerCubieId(colors3);
    if (cubieId < 0) {
      throw new Error(`Invalid corner colors at position ${pos}: ${colors3.join(",")}`);
    }
    cp[pos] = cubieId;

    // NEW:
    co[pos] = cornerOriFromCubieAndObserved(cubieId, colors3);
  }

  // edges
  for (let pos = 0; pos < 12; pos++) {
    const stickers2 = EDGE_POS_STICKERS[pos];
    const colors2 = stickers2.map(stickerAt);

    const cubieId = findEdgeCubieId(colors2);
    if (cubieId < 0) {
      throw new Error(`Invalid edge colors at position ${pos}: ${colors2.join(",")}`);
    }
    ep[pos] = cubieId;
    eo[pos] = edgeOriFromCubieAndObserved(cubieId, colors2);
  }

  // orientation constraints
  const eoSum = eo.reduce((a,b)=>a+b,0);
  if (eoSum % 2 !== 0) throw new Error("Edge flip parity error");
  const coSum = co.reduce((a,b)=>a+b,0);
  if (coSum % 3 !== 0) throw new Error("Corner twist sum error");

  // permutation parity
  if (parityOfPermutation(cp) !== parityOfPermutation(ep)) {
    throw new Error("Permutation parity mismatch");
  }

  return { cp, co, ep, eo };
}

// Corner positions: 0 URF, 1 UFL, 2 ULB, 3 UBR, 4 DFR, 5 DLF, 6 DBL, 7 DRB
// Edge positions:   0 UR,  1 UF,  2 UL,  3 UB,  4 DR,  5 DF,  6 DL,  7 DB,  8 FR,  9 FL,  10 BL, 11 BR

const MOVE_U = {
  cpPerm: [1, 2, 3, 0, 4, 5, 6, 7],
  coAdd:  [0, 0, 0, 0, 0, 0, 0, 0],
  epPerm: [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11],
  eoXor:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MOVE_R = {
  cpPerm: [4, 1, 2, 0, 7, 5, 6, 3],
  coAdd:  [2, 0, 0, 1, 1, 0, 0, 2],
  epPerm: [8, 1, 2, 3, 11, 5, 6, 7, 4, 9, 10, 0],
  eoXor:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MOVE_F = {
  cpPerm: [1, 5, 2, 3, 0, 4, 6, 7],
  coAdd:  [1, 2, 0, 0, 2, 1, 0, 0],
  epPerm: [0, 9, 2, 3, 4, 8, 6, 7, 1, 5, 10, 11],
  eoXor:  [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
};

const MOVE_D = {
  cpPerm: [0, 1, 2, 3, 7, 4, 5, 6],
  coAdd:  [0, 0, 0, 0, 0, 0, 0, 0],
  epPerm: [0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11],
  eoXor:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MOVE_L = {
  cpPerm: [0, 5, 1, 3, 4, 6, 2, 7],
  coAdd:  [0, 1, 2, 0, 0, 2, 1, 0],
  epPerm: [0, 1, 9, 3, 4, 5, 10, 7, 8, 6, 2, 11],
  eoXor:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const MOVE_B = {
  cpPerm: [0, 1, 3, 7, 4, 5, 2, 6],
  coAdd:  [0, 0, 1, 2, 0, 0, 2, 1],
  epPerm: [0, 1, 2, 10, 4, 5, 6, 11, 8, 9, 7, 3],
  eoXor:  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
};

const BASE_MOVES = { U: MOVE_U, R: MOVE_R, F: MOVE_F, D: MOVE_D, L: MOVE_L, B: MOVE_B };

function applyBaseMoveCubie(state, baseFace) {
  const mv = BASE_MOVES[baseFace];
  const { cp, co, ep, eo } = state;

  const ncp = new Array(8);
  const nco = new Array(8);
  const nep = new Array(12);
  const neo = new Array(12);

  for (let i = 0; i < 8; i++) {
    const src = mv.cpPerm[i];
    ncp[i] = cp[src];
    nco[i] = (co[src] + mv.coAdd[i]) % 3;
  }
  for (let i = 0; i < 12; i++) {
    const src = mv.epPerm[i];
    nep[i] = ep[src];
    neo[i] = (eo[src] ^ mv.eoXor[i]) & 1;
  }

  state.cp = ncp; state.co = nco;
  state.ep = nep; state.eo = neo;
}

function applyMoveCubie(state, move) {
  // move like "R", "R2", "R'"
  const face = move[0];
  if (!(face in BASE_MOVES)) throw new Error("Bad move: " + move);

  let turns = 1;
  if (move.length === 2 && move[1] === "2") turns = 2;
  else if (move.length === 2 && move[1] === "'") turns = 3;

  for (let i = 0; i < turns; i++) applyBaseMoveCubie(state, face);
}

// ---------- Math helpers ----------
const FACT = (() => {
  const f = new Int32Array(13);
  f[0] = 1;
  for (let i = 1; i < f.length; i++) f[i] = f[i - 1] * i;
  return f;
})();

// nCk table for combinations up to n=12
const NCK = (() => {
  const nMax = 12;
  const C = Array.from({ length: nMax + 1 }, () => new Int32Array(nMax + 1));
  for (let n = 0; n <= nMax; n++) {
    C[n][0] = 1;
    C[n][n] = 1;
    for (let k = 1; k < n; k++) C[n][k] = C[n - 1][k - 1] + C[n - 1][k];
  }
  return C;
})();

// Lehmer rank for permutation of length n with values 0..n-1 (unique)
function rankPerm(p) {
  const n = p.length;
  let rank = 0;
  const used = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    let smaller = 0;
    for (let v = 0; v < p[i]; v++) if (!used[v]) smaller++;
    rank += smaller * FACT[n - 1 - i];
    used[p[i]] = true;
  }
  return rank;
}

// ---------- Phase 1 coordinates ----------

// EO: 2^11 (last edge implied)
function getEOCoord(eo) {
  let idx = 0;
  for (let i = 0; i < 11; i++) {
    idx = (idx << 1) | (eo[i] & 1);
  }
  return idx;
}

// CO: 3^7 (last corner implied)
function getCOCoord(co) {
  let idx = 0;
  for (let i = 0; i < 7; i++) {
    idx = idx * 3 + (co[i] % 3);
  }
  return idx;
}

// UD-slice coord: which positions contain E-slice edge cubies {8,9,10,11} (FR,FL,BL,BR)
function getUDSliceCoord(ep) {
  // standard Kociemba-style combination rank
  // idx in [0..494]
  let idx = 0;
  let k = 4;
  for (let pos = 11; pos >= 0; pos--) {
    if (ep[pos] >= 8) {              // slice cubie (FR,FL,BL,BR)
      idx += NCK[pos][k];
      k--;
      if (k === 0) break;
    }
  }
  return idx;
}

const SOLVED_EP = [0,1,2,3,4,5,6,7,8,9,10,11];
const SOLVED_UDS = getUDSliceCoord(SOLVED_EP);

// ---------- Phase 2 coordinates ----------

// CP: rank of cp permutation of 8 corners
function getCPCoord(cp) {
  return rankPerm(cp); // 0..40319
}

// UDE: rank permutation of the 8 U/D edges, in order of positions [UR,UF,UL,UB,DR,DF,DL,DB]
// Those are edge positions 0..7.
// We need permutation of edge *IDs* restricted to the 8 UD-edge cubies (0..7).
function getUDECoord(ep) {
  const ud = ep.slice(0, 8);
  // ensure it’s a permutation of 0..7
  const seen = new Array(8).fill(false);
  for (const v of ud) {
    if (v < 0 || v > 7 || seen[v]) throw new Error("Not in G1: UD edges not 0..7");
    seen[v] = true;
  }
  return rankPerm(ud);
}

// ESE: permutation of the 4 slice edge cubies (8..11) within the slice positions (8..11 positions in our edge index list are not slice positions; careful!)
// Slice *positions* are edge positions 8..11? No: positions 8..11 correspond to FR,FL,BL,BR in our standard edge position list.
// So in G1, the slice cubies live in those positions. Perfect.
function getESECoord(ep) {
  // Extract edge IDs at positions 8..11; map from {8,9,10,11} to {0,1,2,3} then rank.
  const slice = new Array(4);
  for (let i = 0; i < 4; i++) slice[i] = ep[8 + i] - 8;
  return rankPerm(slice); // 0..23
}

function idxEOCO(eoCoord, coCoord) {
  return eoCoord * 2187 + coCoord;
}
function idxUDSCO(udsCoord, coCoord) {
  return udsCoord * 2187 + coCoord;
}

function idxCP_ESE(cp, ese) { return cp * 24 + ese; }
function idxUDE_ESE(ude, ese) { return ude * 24 + ese; }

// ---------- Move indexing ----------
const MOVES_18 = [
  "U","U2","U'","R","R2","R'","F","F2","F'",
  "D","D2","D'","L","L2","L'","B","B2","B'"
];

// Phase 2 allowed moves
const MOVES_10 = ["U","U2","U'","D","D2","D'","R2","L2","F2","B2"];

// ---------- Fixed: structuredClone fallback ----------
const _clone = (obj) => (typeof structuredClone === "function" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)));

// ---------- Fixed: cancelable timers for scramble/execute ----------
let _pendingTimers = [];
function _clearTimers() { for (const t of _pendingTimers) clearTimeout(t); _pendingTimers = []; }
function _setLater(fn, ms) { const id = setTimeout(fn, ms); _pendingTimers.push(id); return id; }

// ---------- UI: loading overlay + control lock ----------
let _tablesReady = false;
let _loadingOverlay = null;
function _setControlsEnabled(enabled) {
  const controls = document.getElementById("controls");
  if (!controls) return;
  controls.style.pointerEvents = enabled ? "auto" : "none";
  controls.style.opacity = enabled ? "1" : "0.5";
}
function _showLoading(msg) {
  if (_loadingOverlay) return;
  _loadingOverlay = document.createElement("div");
  _loadingOverlay.id = "solverLoadingOverlay";
  _loadingOverlay.style.position = "fixed";
  _loadingOverlay.style.inset = "0";
  _loadingOverlay.style.display = "flex";
  _loadingOverlay.style.alignItems = "center";
  _loadingOverlay.style.justifyContent = "center";
  _loadingOverlay.style.background = "rgba(0,0,0,0.7)";
  _loadingOverlay.style.zIndex = "9999";
  _loadingOverlay.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  _loadingOverlay.style.color = "white";
  _loadingOverlay.style.padding = "24px";
  _loadingOverlay.style.textAlign = "center";
  _loadingOverlay.innerHTML = `<div style="max-width:520px">
      <div style="font-size:22px; font-weight:700; margin-bottom:10px">Building solver tables…</div>
      <div id="solverLoadingMsg" style="font-size:14px; opacity:0.9">${msg || ""}</div>
      <div style="margin-top:14px; font-size:12px; opacity:0.75">This happens once per page load.</div>
    </div>`;
  document.body.appendChild(_loadingOverlay);
  _setControlsEnabled(false);
}
function _updateLoading(msg) {
  const el = document.getElementById("solverLoadingMsg");
  if (el) el.textContent = msg;
}
function _hideLoading() {
  if (_loadingOverlay) _loadingOverlay.remove();
  _loadingOverlay = null;
  _setControlsEnabled(true);
}

// ---------- Combinatorics ----------
function unrankPerm8(idx) {
  // factoradic -> permutation of [0..7]
  const items = [0,1,2,3,4,5,6,7];
  const perm = new Array(8);
  let x = idx;
  for (let i = 7; i >= 0; i--) {
    const f = FACT[i];
    const q = Math.floor(x / f);
    x = x % f;
    perm[7 - i] = items.splice(q, 1)[0];
  }
  return perm;
}
function rankPerm8(p) { return rankPerm(p); } // existing

function unrankUDSliceCoord(coord) {
  // inverse of getUDSliceCoord
  // returns an array of 4 positions (ascending) where slice edges should be placed
  let idx = coord;
  let k = 4;
  const pos = [];
  for (let n = 11; n >= 0; n--) {
    if (idx >= NCK[n][k]) {
      pos.push(n);
      idx -= NCK[n][k];
      k--;
      if (k === 0) break;
    }
  }
  pos.sort((a,b)=>a-b);
  return pos;
}

// ---------- Coordinate move tables + pruning (built once) ----------
let _eoMove=null, _coMove=null, _udsMove=null;
let _cpMove=null, _udeMove=null;
let _prEOUDS=null, _prCOUDS=null, _prCP=null, _prUDE=null;

function _stateFromEO(eoCoord){
  const st={cp:[0,1,2,3,4,5,6,7], co:[0,0,0,0,0,0,0,0], ep:[0,1,2,3,4,5,6,7,8,9,10,11], eo:new Array(12).fill(0)};
  // decode eoCoord into first 11 bits, last is parity
  let parity=0;
  for (let i=0;i<11;i++){
    const bit=(eoCoord>>i)&1;
    st.eo[i]=bit; parity^=bit;
  }
  st.eo[11]=parity;
  return st;
}
function _eoCoordFromState(st){ return getEOCoord(st.eo); }

function _stateFromCO(coCoord){
  const st={cp:[0,1,2,3,4,5,6,7], co:new Array(8).fill(0), ep:[0,1,2,3,4,5,6,7,8,9,10,11], eo:new Array(12).fill(0)};
  let sum=0, x=coCoord;
  for (let i=0;i<7;i++){
    const d = x%3; x=Math.floor(x/3);
    st.co[i]=d; sum+=d;
  }
  st.co[7]=(3-(sum%3))%3;
  return st;
}
function _coCoordFromState(st){ return getCOCoord(st.co); }

function _stateFromUDS(udsCoord){
  const st={cp:[0,1,2,3,4,5,6,7], co:[0,0,0,0,0,0,0,0], ep:new Array(12), eo:new Array(12).fill(0)};
  const pos = unrankUDSliceCoord(udsCoord); // positions that should hold slice edges
  const sliceIds=[8,9,10,11];
  const otherIds=[0,1,2,3,4,5,6,7];
  // Fill positions with a deterministic arrangement
  let si=0, oi=0;
  for (let i=0;i<12;i++){
    if (pos.includes(i)) st.ep[i]=sliceIds[si++];
    else st.ep[i]=otherIds[oi++];
  }
  return st;
}
function _udsCoordFromState(st){ return getUDSliceCoord(st.ep); }

function _stateFromCP(cpCoord){
  const st={cp:unrankPerm8(cpCoord), co:[0,0,0,0,0,0,0,0], ep:[0,1,2,3,4,5,6,7,8,9,10,11], eo:new Array(12).fill(0)};
  return st;
}
function _cpCoordFromState(st){ return getCPCoord(st.cp); }

function _stateFromUDE(udeCoord){
  const st={cp:[0,1,2,3,4,5,6,7], co:[0,0,0,0,0,0,0,0], ep:new Array(12), eo:new Array(12).fill(0)};
  const p = unrankPerm8(udeCoord);
  for (let i=0;i<8;i++) st.ep[i]=p[i];
  // remaining edges fixed
  st.ep[8]=8; st.ep[9]=9; st.ep[10]=10; st.ep[11]=11;
  return st;
}
function _udeCoordFromState(st){ return getUDECoord(st.ep); }

function _applyMoveClone(st, mv){
  const ns=_clone(st);
  applyMoveCubie(ns, mv);
  return ns;
}

function _buildMoveTablesAsync(updateFn){
  return new Promise((resolve)=>{
    _updateLoading("Building move tables…");
    // Allocate
    _eoMove = new Uint16Array(2048*18);
    _coMove = new Uint16Array(2187*18);
    _udsMove = new Uint16Array(495*18);
    _cpMove = new Uint16Array(40320*10);
    _udeMove = new Uint16Array(40320*10);

    let phase="eo", i=0;
    function step(){
      const chunk=256;
      let end;
      if (phase==="eo"){
        end=Math.min(2048, i+chunk);
        for (; i<end; i++){
          const st=_stateFromEO(i);
          for (let m=0;m<18;m++){
            const ns=_applyMoveClone(st, MOVES_18[m]);
            _eoMove[i*18+m]=_eoCoordFromState(ns);
          }
        }
        updateFn(`Move tables: EO ${end}/2048`);
        if (i>=2048){ phase="co"; i=0; }
      } else if (phase==="co"){
        end=Math.min(2187, i+chunk);
        for (; i<end; i++){
          const st=_stateFromCO(i);
          for (let m=0;m<18;m++){
            const ns=_applyMoveClone(st, MOVES_18[m]);
            _coMove[i*18+m]=_coCoordFromState(ns);
          }
        }
        updateFn(`Move tables: CO ${end}/2187`);
        if (i>=2187){ phase="uds"; i=0; }
      } else if (phase==="uds"){
        end=Math.min(495, i+chunk);
        for (; i<end; i++){
          const st=_stateFromUDS(i);
          for (let m=0;m<18;m++){
            const ns=_applyMoveClone(st, MOVES_18[m]);
            _udsMove[i*18+m]=_udsCoordFromState(ns);
          }
        }
        updateFn(`Move tables: UDS ${end}/495`);
        if (i>=495){ phase="cp"; i=0; }
      } else if (phase==="cp"){
        end=Math.min(40320, i+128);
        for (; i<end; i++){
          const st=_stateFromCP(i);
          for (let m=0;m<10;m++){
            const ns=_applyMoveClone(st, MOVES_10[m]);
            _cpMove[i*10+m]=_cpCoordFromState(ns);
          }
        }
        updateFn(`Move tables: CP ${end}/40320`);
        if (i>=40320){ phase="ude"; i=0; }
      } else if (phase==="ude"){
        end=Math.min(40320, i+128);
        for (; i<end; i++){
          const st=_stateFromUDE(i);
          for (let m=0;m<10;m++){
            const ns=_applyMoveClone(st, MOVES_10[m]);
            _udeMove[i*10+m]=_udeCoordFromState(ns);
          }
        }
        updateFn(`Move tables: UDE ${end}/40320`);
        if (i>=40320){ resolve(); return; }
      }
      setTimeout(step, 0);
    }
    step();
  });
}

function _buildPruningAsync(updateFn){
  return new Promise((resolve)=>{
    _updateLoading("Building pruning tables…");
    _prEOUDS = new Uint8Array(2048*495);
    _prCOUDS = new Uint8Array(2187*495);
    _prCP = new Uint8Array(40320);
    _prUDE = new Uint8Array(40320);
    _prEOUDS.fill(0xFF); _prCOUDS.fill(0xFF); _prCP.fill(0xFF); _prUDE.fill(0xFF);

    // Phase1 pruning from solved (eo=0, uds=0) etc
    const q1 = new Int32Array(2048*495);
    let qh=0, qt=0;
    const rootEOUDS = 0 * 495 + SOLVED_UDS;
    q1[qt++] = rootEOUDS;
    _prEOUDS[rootEOUDS] = 0;

    const q2 = new Int32Array(2187*495);
    let q2h=0, q2t=0;
    const rootCOUDS = 0 * 495 + SOLVED_UDS;
    q2[q2t++] = rootCOUDS;
    _prCOUDS[rootCOUDS] = 0;

    function bfs1(){
      const chunk=20000;
      let processed=0;
      while (qh<qt && processed<chunk){
        const idx=q1[qh++]; processed++;
        const d=_prEOUDS[idx];
        const eo=Math.floor(idx/495);
        const uds=idx%495;
        for (let m=0;m<18;m++){
          const neo=_eoMove[eo*18+m];
          const nuds=_udsMove[uds*18+m];
          const nidx=neo*495+nuds;
          if (_prEOUDS[nidx]===0xFF){
            _prEOUDS[nidx]=d+1;
            q1[qt++]=nidx;
          }
        }
      }
      updateFn(`Pruning: EO+UDS ${qh}/${qt}`);
      if (qh<qt) { setTimeout(bfs1,0); return; }
      setTimeout(bfs2,0);
    }

    function bfs2(){
      const chunk=20000;
      let processed=0;
      while (q2h<q2t && processed<chunk){
        const idx=q2[q2h++]; processed++;
        const d=_prCOUDS[idx];
        const co=Math.floor(idx/495);
        const uds=idx%495;
        for (let m=0;m<18;m++){
          const nco=_coMove[co*18+m];
          const nuds=_udsMove[uds*18+m];
          const nidx=nco*495+nuds;
          if (_prCOUDS[nidx]===0xFF){
            _prCOUDS[nidx]=d+1;
            q2[q2t++]=nidx;
          }
        }
      }
      updateFn(`Pruning: CO+UDS ${q2h}/${q2t}`);
      if (q2h<q2t) { setTimeout(bfs2,0); return; }
      setTimeout(bfs3,0);
    }

    function bfs3(){
      // CP distance under phase2 moves (10)
      const q = new Int32Array(40320);
      let h=0,t=0;
      q[t++]=0; _prCP[0]=0;
      function step(){
        const chunk=5000;
        let processed=0;
        while (h<t && processed<chunk){
          const cur=q[h++]; processed++;
          const d=_prCP[cur];
          for (let m=0;m<10;m++){
            const nxt=_cpMove[cur*10+m];
            if (_prCP[nxt]===0xFF){
              _prCP[nxt]=d+1;
              q[t++]=nxt;
            }
          }
        }
        updateFn(`Pruning: CP ${h}/${t}`);
        if (h<t) { setTimeout(step,0); return; }
        setTimeout(bfs4,0);
      }
      step();
    }

    function bfs4(){
      const q = new Int32Array(40320);
      let h=0,t=0;
      q[t++]=0; _prUDE[0]=0;
      function step(){
        const chunk=5000;
        let processed=0;
        while (h<t && processed<chunk){
          const cur=q[h++]; processed++;
          const d=_prUDE[cur];
          for (let m=0;m<10;m++){
            const nxt=_udeMove[cur*10+m];
            if (_prUDE[nxt]===0xFF){
              _prUDE[nxt]=d+1;
              q[t++]=nxt;
            }
          }
        }
        updateFn(`Pruning: UDE ${h}/${t}`);
        if (h<t) { setTimeout(step,0); return; }
        resolve();
      }
      step();
    }

    bfs1();
  });
}

async function ensureTablesBuilt() {
  if (_tablesReady) return;

  // single-flight: if we're already building, just await it
  if (_tablesPromise) {
    await _tablesPromise;
    return;
  }

  _showLoading("");
  _tablesPromise = (async () => {
    await _buildMoveTablesAsync(_updateLoading);
    await _buildPruningAsync(_updateLoading);

    // sanity: these must exist now
    if (!_prCP || !_prUDE || !_prEOUDS || !_prCOUDS) {
      throw new Error("Table build finished but tables missing");
    }

    _tablesReady = true;
    _hideLoading();
  })();

  try {
    await _tablesPromise;
  } catch (e) {
    console.error(e);
    _updateLoading("Error building tables: " + (e?.message || e));
    // don't keep a broken promise around
    _tablesPromise = null;
    throw e;
  }
}

// ---------- Updated heuristics ----------
function h1(eo, co, uds) {
  const idx1 = eo * 495 + uds;
  const idx2 = co * 495 + uds;

  const a = _prEOUDS?.[idx1];
  const b = _prCOUDS?.[idx2];

  if (a === undefined || b === undefined) {
    throw new Error("Heuristic table not ready or bad index (phase1)");
  }
  return Math.max(a, b);
}

function h2(cp, ude) {
  const a = _prCP?.[cp];
  const b = _prUDE?.[ude];

  if (a === undefined || b === undefined) {
    throw new Error("Heuristic table not ready or bad index (phase2)");
  }
  return Math.max(a, b);
}

function buildPhase1Pruning(){ return { prEOUDS:_prEOUDS, prCOUDS:_prCOUDS }; }

function buildPhase2Pruning(){ return { prCP:_prCP, prUDE:_prUDE }; }

// h1 overridden above

// h2 overridden above

function sameFace(a, b) {
  return a[0] === b[0];
}

function cloneState(st){
  return {
    cp: st.cp.slice(),
    co: st.co.slice(),
    ep: st.ep.slice(),
    eo: st.eo.slice(),
  };
}

function idaPhase1(startState, maxDepth = 12) {
  const path = [];

  function dfs(state, g, bound, lastMove) {
    if (g === bound) {
      // can't go deeper in this iteration
      const eo = getEOCoord(state.eo);
      const co = getCOCoord(state.co);
      const uds = getUDSliceCoord(state.ep);
      return (eo === 0 && co === 0 && uds === 0) ? true : Infinity;
    }
    const eo = getEOCoord(state.eo);
    const co = getCOCoord(state.co);
    const uds = getUDSliceCoord(state.ep);
    const hv = h1(eo, co, uds);
    if (g + hv > bound) return g + hv;
    if (eo === 0 && co === 0 && uds === SOLVED_UDS) return true;

    let minNext = Infinity;

    for (const mv of MOVES_18) {
      if (lastMove && sameFace(lastMove, mv)) continue;

      const ns = cloneState(state);
      applyMoveCubie(ns, mv);

      path.push(mv);
      const res = dfs(ns, g + 1, bound, mv);
      if (res === true) return true;
      if (res < minNext) minNext = res;
      path.pop();
    }
    return minNext;
  }

  let bound = (() => {
    const eo = getEOCoord(startState.eo);
    const co = getCOCoord(startState.co);
    const uds = getUDSliceCoord(startState.ep);
    return h1(eo, co, uds);
  })();

  for (let depth = bound; depth <= maxDepth; depth++) {
    const res = dfs(cloneState(startState), 0, depth, null);
    if (res === true) return path.slice();
    if (res === Infinity) break;
    bound = res;
  }
  return null;
}

function idaPhase2(startState, maxDepth = 18) {
  const path = [];

  function dfs(state, g, bound, lastMove) {
    if (g === bound) {
      const cp = getCPCoord(state.cp);
      const ude = getUDECoord(state.ep);
      const ese = getESECoord(state.ep);
      return (cp === 0 && ude === 0 && ese === 0) ? true : Infinity;
    }
    const cp = getCPCoord(state.cp);
    const ude = getUDECoord(state.ep);
    const ese = getESECoord(state.ep);
    const hv = h2(cp, ude);
    if (g + hv > bound) return g + hv;
    if (cp === 0 && ude === 0 && ese === 0) return true;

    let minNext = Infinity;

    for (const mv of MOVES_10) {
      if (lastMove && sameFace(lastMove, mv)) continue;

      const ns = cloneState(state);
      applyMoveCubie(ns, mv);

      path.push(mv);
      const res = dfs(ns, g + 1, bound, mv);
      if (res === true) return true;
      if (res < minNext) minNext = res;
      path.pop();
    }
    return minNext;
  }

  let bound = (() => {
    const cp = getCPCoord(startState.cp);
    const ude = getUDECoord(startState.ep);
    const ese = getESECoord(startState.ep);
    return h2(cp, ude);
  })();

  for (let depth = bound; depth <= maxDepth; depth++) {
    const res = dfs(cloneState(startState), 0, depth, null);
    if (res === true) return path.slice();
    if (res === Infinity) break;
    bound = res;
  }
  return null;
}

//  When clicked, cube is reset
resetButton.onclick = function(){
    colorChoice = 0;
    solution = [];
    fFace = [g, g, g, g, g, g, g, g];
    bFace = [b, b, b, b, b, b, b, b];
    uFace = [w, w, w, w, w, w, w, w];
    dFace = [y, y, y, y, y, y, y, y];
    lFace = [o, o, o, o, o, o, o, o];
    rFace = [r, r, r, r, r, r, r, r];
    updateCubeDisplay();
}

//  When clicked, cube is randomly scrambled
scrambleButton.onclick = function(){
    for (var i = 0; i < 40; i++){
        scrambleTimer(i);
    }
}

//  Scramble function with timer
function scrambleTimer(i){
    setTimeout(function(){
        var j = Math.floor((Math.random() * 12)) + 1;
        if (j == 1){
            fNTurn();
            updateCubeDisplay();
        } else if (j == 2){
            fPTurn();
            updateCubeDisplay();
        } else if (j == 3){
            bNTurn();
            updateCubeDisplay();
        } else if (j == 4){
            bPTurn();
            updateCubeDisplay();
        } else if (j == 5){
            uNTurn();
            updateCubeDisplay();
        } else if (j == 6){
            uPTurn();
            updateCubeDisplay();
        } else if (j == 7){
            dNTurn();
            updateCubeDisplay();
        } else if (j == 8){
            dPTurn();
            updateCubeDisplay();
        } else if (j == 9){
            lNTurn();
            updateCubeDisplay();
        } else if (j == 10){
            lPTurn();
            updateCubeDisplay();
        } else if (j == 11){
            rNTurn();
            updateCubeDisplay();
        } else if (j == 12){
            rPTurn();
            updateCubeDisplay();
        }
    }, (50 * i));
}

//  When clicked, a solution to the current scramble is found and displayed
solveButton.onclick = async () => {
  try {
    await ensureTablesBuilt();
    if (!_tablesReady) throw new Error("Tables not ready");

    const cubie = stickersToCubie();

    const p1 = idaPhase1(_clone(cubie), 12);
    if (!p1) throw new Error("Phase 1 failed");

    const mid = _clone(cubie);
    for (const mv of p1) applyMoveCubie(mid, mv);
    
    const p2 = idaPhase2(mid, 18);
    if (!p2) throw new Error("Phase 2 failed");

    solution = [...p1, ...p2];
    solutionLine.textContent = solution.join(" ");
  } catch (e) {
    solutionLine.textContent = (e?.message || String(e));
    console.error(e);
  }
};

//  When clicked, cube solves itself turn by turn
executeButton.onclick = function(){
    for (var i = 0; i < solution.length; i++){
        executionTimer(i);
    }
}

//  Move function for execution
//  Execution function with timer

function doOneMove(m) {
    if (m === "F") return fNTurn();
    if (m === "F'") return fPTurn();
    if (m === "B") return bNTurn();
    if (m === "B'") return bPTurn();
    if (m === "U") return uNTurn();
    if (m === "U'") return uPTurn();
    if (m === "D") return dNTurn();
    if (m === "D'") return dPTurn();
    if (m === "L") return lNTurn();
    if (m === "L'") return lPTurn();
    if (m === "R") return rNTurn();
    if (m === "R'") return rPTurn();
}

function executionTimer(i){
    setTimeout(function(){
        const m = solution[i];
        if (!m) return;

        if (m.endsWith("2")) {
            // "R2" => do "R" twice
            const base = m[0];
            doOneMove(base);
            doOneMove(base);
        } else {
            doOneMove(m);
        }

        updateCubeDisplay();
    }, (100 * i));
}

//  Updates the cube display
function updateCubeDisplay(){
    F0.style.backgroundColor = fFace[0];
    F1.style.backgroundColor = fFace[1];
    F2.style.backgroundColor = fFace[2];
    F3.style.backgroundColor = fFace[3];
    F4.style.backgroundColor = fFace[4];
    F5.style.backgroundColor = fFace[5];
    F6.style.backgroundColor = fFace[6];
    F7.style.backgroundColor = fFace[7];
    B0.style.backgroundColor = bFace[UI_TO_B[0]];
    B1.style.backgroundColor = bFace[UI_TO_B[1]];
    B2.style.backgroundColor = bFace[UI_TO_B[2]];
    B3.style.backgroundColor = bFace[UI_TO_B[3]];
    B4.style.backgroundColor = bFace[UI_TO_B[4]];
    B5.style.backgroundColor = bFace[UI_TO_B[5]];
    B6.style.backgroundColor = bFace[UI_TO_B[6]];
    B7.style.backgroundColor = bFace[UI_TO_B[7]];
    U0.style.backgroundColor = uFace[0];
    U1.style.backgroundColor = uFace[1];
    U2.style.backgroundColor = uFace[2];
    U3.style.backgroundColor = uFace[3];
    U4.style.backgroundColor = uFace[4];
    U5.style.backgroundColor = uFace[5];
    U6.style.backgroundColor = uFace[6];
    U7.style.backgroundColor = uFace[7];
    D0.style.backgroundColor = dFace[UI_TO_D[0]];
    D1.style.backgroundColor = dFace[UI_TO_D[1]];
    D2.style.backgroundColor = dFace[UI_TO_D[2]];
    D3.style.backgroundColor = dFace[UI_TO_D[3]];
    D4.style.backgroundColor = dFace[UI_TO_D[4]];
    D5.style.backgroundColor = dFace[UI_TO_D[5]];
    D6.style.backgroundColor = dFace[UI_TO_D[6]];
    D7.style.backgroundColor = dFace[UI_TO_D[7]];
    L0.style.backgroundColor = lFace[0];
    L1.style.backgroundColor = lFace[1];
    L2.style.backgroundColor = lFace[2];
    L3.style.backgroundColor = lFace[3];
    L4.style.backgroundColor = lFace[4];
    L5.style.backgroundColor = lFace[5];
    L6.style.backgroundColor = lFace[6];
    L7.style.backgroundColor = lFace[7];
    R0.style.backgroundColor = rFace[0];
    R1.style.backgroundColor = rFace[1];
    R2.style.backgroundColor = rFace[2];
    R3.style.backgroundColor = rFace[3];
    R4.style.backgroundColor = rFace[4];
    R5.style.backgroundColor = rFace[5];
    R6.style.backgroundColor = rFace[6];
    R7.style.backgroundColor = rFace[7];
}

//  Shows current permutation of cube (DEBUG ONLY)
function showCube(){
    console.log(fFace);
    console.log(bFace);
    console.log(uFace);
    console.log(dFace);
    console.log(lFace);
    console.log(rFace);
    console.log(solution);
}

setSolvedCube();
updateCubeDisplay();


// Build tables on page load (blocking UI with overlay until ready)
window.addEventListener("load", () => { ensureTablesBuilt(); });
