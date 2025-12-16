// Wrapped to ensure DOM exists before we grab elements / attach handlers.
const __runApp = () => {

  // Use the real browser timers (the previous version accidentally used _setTimeout).
  const _setTimeout = window.setTimeout.bind(window);
  const _clearTimeout = window.clearTimeout.bind(window);

  // ---- Timeout management (prevents overlapping scramble/solve/execute) ----
  let _pendingTimeouts = [];
  function __setTimeout(fn, ms) {
    const id = _setTimeout(fn, ms);
    _pendingTimeouts.push(id);
    return id;
  }
  function clearPendingTimeouts() {
    for (const id of _pendingTimeouts) _clearTimeout(id);
    _pendingTimeouts = [];
  }

  //  Colors are coded by letter
  const g = "green";
  const b = "blue";
  const w = "white";
  const y = "yellow";
  const o = "orange";
  const r = "red";
  
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
    "F": { axis:"Z", layer:  1, dir: -1 },
    "B": { axis:"Z", layer: -1, dir:  1 },
    "U": { axis:"Y", layer:  1, dir: -1 },
    "D": { axis:"Y", layer: -1, dir:  1 },
    "R": { axis:"X", layer:  1, dir: -1 },
    "L": { axis:"X", layer: -1, dir:  1 },
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
  
  // Corner positions in standard order: 0 URF, 1 UFL, 2 ULB, 3 UBR, 4 DFR, 5 DLF, 6 DBL, 7 DRB
  const CORNER_POS_STICKERS = [
    // URF
    [ {f:"U", i:2}, {f:"R", i:0}, {f:"F", i:2} ],
    // UFL
    [ {f:"U", i:6}, {f:"F", i:0}, {f:"L", i:2} ],
    // ULB
    [ {f:"U", i:0}, {f:"L", i:0}, {f:"B", i:2} ],
    // UBR
    [ {f:"U", i:2}, {f:"B", i:0}, {f:"R", i:2} ],
    // DFR
    [ {f:"D", i:2}, {f:"F", i:4}, {f:"R", i:6} ],
    // DLF
    [ {f:"D", i:0}, {f:"L", i:4}, {f:"F", i:6} ],
    // DBL
    [ {f:"D", i:6}, {f:"B", i:4}, {f:"L", i:6} ],
    // DRB
    [ {f:"D", i:4}, {f:"R", i:4}, {f:"B", i:6} ],
  ];
  
  // Edge positions in standard order: 0 UR, 1 UF, 2 UL, 3 UB, 4 DR, 5 DF, 6 DL, 7 DB, 8 FR, 9 FL, 10 BL, 11 BR
  const EDGE_POS_STICKERS = [
    // UR
    [ {f:"U", i:3}, {f:"R", i:1} ],
    // UF
    [ {f:"U", i:5}, {f:"F", i:1} ],
    // UL
    [ {f:"U", i:7}, {f:"L", i:1} ],
    // UB
    [ {f:"U", i:1}, {f:"B", i:1} ],
    // DR
    [ {f:"D", i:3}, {f:"R", i:5} ],
    // DF
    [ {f:"D", i:1}, {f:"F", i:5} ],
    // DL
    [ {f:"D", i:7}, {f:"L", i:5} ],
    // DB
    [ {f:"D", i:5}, {f:"B", i:5} ],
    // FR
    [ {f:"F", i:3}, {f:"R", i:7} ],
    // FL
    [ {f:"F", i:7}, {f:"L", i:3} ],
    // BL
    [ {f:"B", i:3}, {f:"L", i:7} ],
    // BR
    [ {f:"B", i:7}, {f:"R", i:3} ],
  ];
  
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
    const arr = getFaceArr(pos.f);
    return arr[pos.i];
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
  
  // Standard Kociemba corner orientation convention:
  // ori=0 if U/D color is on U or D
  // ori=1 if U/D color is on R or L
  // ori=2 if U/D color is on F or B
  function cornerOrientationFromStickers(stickers3, colors3) {
    // stickers3: [{f,i},...], colors3 aligned with stickers3
    const udColor = colors3.find(c => c === w || c === y);
    if (udColor === undefined) return 0;
  
    const idx = colors3.indexOf(udColor);
    const face = stickers3[idx].f;
  
    if (face === "U" || face === "D") return 0;
    if (face === "R" || face === "L") return 1;
    // F or B
    return 2;
  }
  
  // Standard Kociemba edge orientation convention:
  // - For U/D layer edges (UR,UF,UL,UB,DR,DF,DL,DB):
  //   oriented if U/D color is on U/D face
  // - For slice edges (FR,FL,BL,BR):
  //   oriented if F/B color is on F/B face
  function edgeOrientationFromStickers(edgePosIndex, stickers2, colors2) {
    const isUDLayer = (edgePosIndex <= 7); // UR..DB
    if (isUDLayer) {
      const udColor = (colors2[0] === w || colors2[0] === y) ? colors2[0]
                   : (colors2[1] === w || colors2[1] === y) ? colors2[1]
                   : null;
      if (udColor == null) return 0;
  
      const idx = colors2[0] === udColor ? 0 : 1;
      const face = stickers2[idx].f;
      return (face === "U" || face === "D") ? 0 : 1;
    } else {
      // slice edges: check F/B color placement
      const fbColor = (colors2[0] === g || colors2[0] === b) ? colors2[0]
                   : (colors2[1] === g || colors2[1] === b) ? colors2[1]
                   : null;
      if (fbColor == null) return 0;
  
      const idx = colors2[0] === fbColor ? 0 : 1;
      const face = stickers2[idx].f;
      return (face === "F" || face === "B") ? 0 : 1;
    }
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
    const eo = new Array(12);
  
    // corners
    for (let pos = 0; pos < 8; pos++) {
      const stickers = CORNER_POS_STICKERS[pos];
      const colors = stickers.map(stickerAt);
      const id = findCornerCubieId(colors);
      if (id < 0) {
        throw new Error("Invalid corner colors at position " + pos + ": " + colors.join(","));
      }
      cp[pos] = id;
      co[pos] = cornerOrientationFromStickers(stickers, colors);
    }
  
    // edges
    for (let pos = 0; pos < 12; pos++) {
      const stickers = EDGE_POS_STICKERS[pos];
      const colors = stickers.map(stickerAt);
      const id = findEdgeCubieId(colors);
      if (id < 0) {
        throw new Error("Invalid edge colors at position " + pos + ": " + colors.join(","));
      }
      ep[pos] = id;
      eo[pos] = edgeOrientationFromStickers(pos, stickers, colors);
    }
  
    // legality checks
    const eoSum = eo.reduce((a, v) => a + v, 0);
    if (eoSum % 2 !== 0) throw new Error("Illegal cube: edge flip parity");
  
    const coSum = co.reduce((a, v) => a + v, 0);
    if (coSum % 3 !== 0) throw new Error("Illegal cube: corner twist parity");
  
    const cpParity = parityOfPermutation(cp);
    const epParity = parityOfPermutation(ep);
    if (cpParity !== epParity) throw new Error("Illegal cube: permutation parity mismatch");
  
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
  
  
// ---------- Compatibility helpers ----------
// Return a NEW cubie state after applying a move (we keep applyMoveCubie as in-place).
function applyMove(state, move) {
  const ns = structuredClone(state);
  applyMoveCubie(ns, move);
  return ns;
}

// nCk convenience
function nCk(n, k) { return NCK[n][k]; }

// Lehmer unrank for permutation of length n with values 0..n-1.
function unrankPerm(rank, n) {
  const elems = [];
  for (let i = 0; i < n; i++) elems.push(i);
  const p = new Array(n);
  let r = rank;
  for (let i = 0; i < n; i++) {
    const f = FACT[n - 1 - i];
    const idx = Math.floor(r / f);
    r = r % f;
    p[i] = elems[idx];
    elems.splice(idx, 1);
  }
  return p;
}

// Precompute inverse mapping for our UDSlice coordinate (495 combos).
// This guarantees _setUDSliceFromCoord matches getUDSliceCoord() exactly.
const _UDS_POS_BY_COORD = (() => {
  const out = Array.from({ length: 495 }, () => null);
  const comb = [];
  function rec(start, left) {
    if (left === 0) {
      // build an ep with slice edges in these positions
      const ep = new Array(12).fill(-1);
      const sliceEdges = [8,9,10,11];
      const otherEdges = [0,1,2,3,4,5,6,7];
      for (let i = 0; i < 4; i++) ep[comb[i]] = sliceEdges[i];
      let j = 0;
      for (let p = 0; p < 12; p++) if (ep[p] === -1) ep[p] = otherEdges[j++];
      const coord = getUDSliceCoord(ep);
      if (!out[coord]) out[coord] = comb.slice();
      return;
    }
    for (let i = start; i <= 12 - left; i++) {
      comb.push(i);
      rec(i + 1, left - 1);
      comb.pop();
    }
  }
  rec(0, 4);
  // sanity: all filled
  for (let i = 0; i < out.length; i++) {
    if (!out[i]) throw new Error("UDSlice inverse table incomplete at " + i);
  }
  return out;
})();

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
    // Standard combinadic: choose positions of the 4 UD-slice edges (FR,FL,BL,BR => ids 8..11).
    let coord = 0;
    let k = 4;
    for (let i = 11; i >= 0; i--) {
      if (ep[i] >= 8) {
        coord += nCk(i, k);
        k--;
        if (k === 0) break;
      }
    }
    return coord;
  }
  
  // ---------- Phase 2 coordinates ----------
  
  // CP: rank of cp permutation of 8 corners
  function getCPCoord(cp) {
    return rankPerm(cp); // 0..40319
  }
  
  // UDE: rank permutation of the 8 U/D edges, in order of positions [UR,UF,UL,UB,DR,DF,DL,DB]
  // Those are edge positions 0..7.
  // We need permutation of edge *IDs* restricted to the 8 UD-edge cubies (0..7).
  function getUDECoord(ep) {
    // Extract the 8 edge IDs from positions 0..7
    const ud = ep.slice(0, 8);
    // These IDs should be 0..7 in some order in G1.
    return rankPerm(ud); // 0..40319
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
  
  
  // ---------- Pruning + move tables (fast + correct) ----------
  
  // Some environments don't have structuredClone; fall back to JSON clone for our plain objects/arrays.
  if (typeof structuredClone !== "function") {
    window.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }
  
  let _pruningBuilt = false;
  let _eoMove = null;   // [2048][18]
  let _udsMove = null;  // [495][18]
  let _coMove = null;   // [2187][18]
  let _cpMove2 = null;  // [40320][10]  (phase2 metric)
  let _udeMove2 = null; // [40320][10]  (phase2 metric)
  
  let _prEO = null;   // Uint8Array(2048)
  let _prUDS = null;  // Uint8Array(495)
  let _prCO = null;   // Uint8Array(2187)
  let _prCP = null;   // Uint8Array(40320)
  let _prUDE = null;  // Uint8Array(40320)
  
  function _makeSolvedCubie() {
    return {
      cp: [0,1,2,3,4,5,6,7],
      co: [0,0,0,0,0,0,0,0],
      ep: [0,1,2,3,4,5,6,7,8,9,10,11],
      eo: [0,0,0,0,0,0,0,0,0,0,0,0]
    };
  }
  
  function _setEdgeOriFromCoord(st, eoCoord) {
    let sum = 0;
    for (let i=0;i<11;i++) {
      const bit = (eoCoord >> i) & 1;
      st.eo[i] = bit;
      sum ^= bit;
    }
    st.eo[11] = sum; // parity so total sum mod2 = 0
  }
  
  function _unrankComb(n, k, idx) {
    // returns sorted chosen positions in [0..n-1], lex order
    const chosen = [];
    let x = 0;
    for (let i = k; i >= 1; i--) {
      while (x < n) {
        const c = nCk(n - x - 1, i - 1);
        if (idx < c) {
          chosen.push(x);
          x++;
          break;
        } else {
          idx -= c;
          x++;
        }
      }
    }
    return chosen;
  }
  
  function _setUDSliceFromCoord(st, udsCoord) {
    // choose 4 positions among 12 where the slice edges (FR,FL,BL,BR = 8,9,10,11) will go
    // coord order matches getUDSliceCoord(): scan i=11..0 accumulating when ep[i] in slice set.
    // We'll build chosen positions in ascending order then place edges.
    const chosen = _unrankComb(12, 4, udsCoord); // positions 0..11 ascending
    const sliceEdges = [8,9,10,11];
    const otherEdges = [0,1,2,3,4,5,6,7];
  
    const ep = new Array(12).fill(-1);
  
    // place slice edges into chosen positions
    for (let i=0;i<4;i++) ep[chosen[i]] = sliceEdges[i];
  
    // fill remaining positions with other edges in order
    let j = 0;
    for (let p=0;p<12;p++) {
      if (ep[p] === -1) ep[p] = otherEdges[j++];
    }
    st.ep = ep;
  }
  
  function _setCornerOriFromCoord(st, coCoord) {
    let sum = 0;
    for (let i=0;i<7;i++) {
      const v = coCoord % 3;
      st.co[i] = v;
      sum += v;
      coCoord = Math.floor(coCoord / 3);
    }
    st.co[7] = (3 - (sum % 3)) % 3;
  }
  
  
  function _setCornerPermFromCoord(st, cpCoord) {
    st.cp = unrankPerm(cpCoord, 8);
  }
  
  function _setUDEPermFromCoord(st, udeCoord) {
    // udeCoord ranks permutation of ep[0..7] only. Keep slice edges fixed in 8..11.
    const p = unrankPerm(udeCoord, 8);
    const ep = [0,1,2,3,4,5,6,7,8,9,10,11];
    for (let i=0;i<8;i++) ep[i] = p[i];
    st.ep = ep;
  }
  
  function _buildCoordMoveTables() {
    // Build EO move table
    _eoMove = Array.from({length: 2048}, () => new Uint16Array(MOVES_18.length));
    for (let eo=0; eo<2048; eo++) {
      const st = _makeSolvedCubie();
      _setEdgeOriFromCoord(st, eo);
      for (let mi=0; mi<MOVES_18.length; mi++) {
        const ns = applyMove(st, MOVES_18[mi]);
        _eoMove[eo][mi] = getEOCoord(ns.eo);
      }
    }
  
    // Build UDSlice move table
    _udsMove = Array.from({length: 495}, () => new Uint16Array(MOVES_18.length));
    for (let uds=0; uds<495; uds++) {
      const st = _makeSolvedCubie();
      _setUDSliceFromCoord(st, uds);
      for (let mi=0; mi<MOVES_18.length; mi++) {
        const ns = applyMove(st, MOVES_18[mi]);
        _udsMove[uds][mi] = getUDSliceCoord(ns.ep);
      }
    }
  
    // Build CO move table
    _coMove = Array.from({length: 2187}, () => new Uint16Array(MOVES_18.length));
    for (let co=0; co<2187; co++) {
      const st = _makeSolvedCubie();
      _setCornerOriFromCoord(st, co);
      for (let mi=0; mi<MOVES_18.length; mi++) {
        const ns = applyMove(st, MOVES_18[mi]);
        _coMove[co][mi] = getCOCoord(ns.co);
      }
    }
  
    // Phase 2 move tables (in phase2 metric only)
    _cpMove2 = Array.from({length: 40320}, () => new Uint16Array(MOVES_10.length));
    for (let cp=0; cp<40320; cp++) {
      const st = _makeSolvedCubie();
      _setCornerPermFromCoord(st, cp);
      for (let mi=0; mi<MOVES_10.length; mi++) {
        const ns = applyMove(st, MOVES_10[mi]);
        _cpMove2[cp][mi] = rankPerm(ns.cp);
      }
    }
  
    _udeMove2 = Array.from({length: 40320}, () => new Uint16Array(MOVES_10.length));
    for (let ude=0; ude<40320; ude++) {
      const st = _makeSolvedCubie();
      _setUDEPermFromCoord(st, ude);
      for (let mi=0; mi<MOVES_10.length; mi++) {
        const ns = applyMove(st, MOVES_10[mi]);
        _udeMove2[ude][mi] = getUDECoord(ns.ep);
      }
    }
  }
  
  function _bfsPruning(moveTable, start, nMoves) {
    const N = moveTable.length;
    const dist = new Uint8Array(N);
    dist.fill(0xFF);
    const q = new Int32Array(N);
    let qh = 0, qt = 0;
    dist[start] = 0;
    q[qt++] = start;
  
    while (qh < qt) {
      const v = q[qh++];
      const dv = dist[v];
      for (let mi=0; mi<nMoves; mi++) {
        const nv = moveTable[v][mi];
        if (dist[nv] === 0xFF) {
          dist[nv] = dv + 1;
          q[qt++] = nv;
        }
      }
    }
    return dist;
  }
  
  function ensurePruningBuilt() {
    if (_pruningBuilt) return;
  
    _buildCoordMoveTables();
  
    // Phase 1 heuristic in 18-move metric
    _prEO  = _bfsPruning(_eoMove, 0, MOVES_18.length);
    _prUDS = _bfsPruning(_udsMove, 0, MOVES_18.length);
    _prCO  = _bfsPruning(_coMove, 0, MOVES_18.length);
  
    // Phase 2 heuristic in 10-move metric
    _prCP  = _bfsPruning(_cpMove2, 0, MOVES_10.length);
    _prUDE = _bfsPruning(_udeMove2, 0, MOVES_10.length);
  
    _pruningBuilt = true;
  }
  
  // Compatibility wrappers used by existing IDA code (but now fast & correct).
  function buildPhase1Pruning() {
    ensurePruningBuilt();
    return { prEO: _prEO, prUDS: _prUDS, prCO: _prCO };
  }
  
  /* buildPhase2Pruning replaced by ensurePruningBuilt() (see above) */
  function buildPhase2Pruning(){ ensurePruningBuilt(); return {prCP:_prCP, prUDE:_prUDE}; }
  
  
  
  function buildPhase2Pruning() {
    const prCP = new Uint8Array(40320 * 24);
    const prUDE = new Uint8Array(40320 * 24);
    prCP.fill(0xFF);
    prUDE.fill(0xFF);
  
    const solved = {
      cp: [0,1,2,3,4,5,6,7],
      co: [0,0,0,0,0,0,0,0],
      ep: [0,1,2,3,4,5,6,7,8,9,10,11],
      eo: [0,0,0,0,0,0,0,0,0,0,0,0],
    };
  
    const qState = [];
    const qDepth = [];
    const push = (st, d) => { qState.push(st); qDepth.push(d); };
  
    const cp0 = getCPCoord(solved.cp);
    const ude0 = getUDECoord(solved.ep);
    const ese0 = getESECoord(solved.ep);
    prCP[idxCP_ESE(cp0, ese0)] = 0;
    prUDE[idxUDE_ESE(ude0, ese0)] = 0;
    push(structuredClone(solved), 0);
  
    let head = 0;
    while (head < qState.length) {
      const st = qState[head];
      const d = qDepth[head];
      head++;
  
      for (const mv of MOVES_10) {
        const ns = structuredClone(st);
        applyMoveCubie(ns, mv);
  
        // In phase 2 we assume we stay in G1; these coords are valid
        const cp = getCPCoord(ns.cp);
        const ude = getUDECoord(ns.ep);
        const ese = getESECoord(ns.ep);
  
        const i1 = idxCP_ESE(cp, ese);
        const i2 = idxUDE_ESE(ude, ese);
  
        let discovered = false;
        if (prCP[i1] === 0xFF) { prCP[i1] = d + 1; discovered = true; }
        if (prUDE[i2] === 0xFF) { prUDE[i2] = d + 1; discovered = true; }
  
        if (discovered) push(ns, d + 1);
      }
    }
  
    return { prCP, prUDE };
  }
  
  function h1(eoCoord, coCoord, udsCoord, prEO, prUDS, prCO) {
    return Math.max(prEO[eoCoord], prUDS[udsCoord], prCO[coCoord]);
  }
  
  
  function h2(cp, ude, prCP, prUDE) {
    return Math.max(prCP[cp], prUDE[ude]);
  }
  
  
  function sameFace(a, b) {
    return a[0] === b[0];
  }
  
  function idaPhase1(startState, prEO, prUDS, prCO, maxDepth = 12) {
    const path = [];
  
    function dfs(state, g, bound, lastMove) {
      const eo = getEOCoord(state.eo);
      const co = getCOCoord(state.co);
      const uds = getUDSliceCoord(state.ep);
      const hv = h1(eo, co, uds, prEO, prUDS, prCO);
      if (g + hv > bound) return g + hv;
      if (eo === 0 && co === 0 && uds === 0) return true;
  
      let minNext = Infinity;
  
      for (const mv of MOVES_18) {
        if (lastMove && sameFace(lastMove, mv)) continue;
  
        const ns = structuredClone(state);
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
      return h1(eo, co, uds, prEO, prUDS, prCO);
    })();
  
    for (let depth = bound; depth <= maxDepth; depth++) {
      const res = dfs(structuredClone(startState), 0, depth, null);
      if (res === true) return path.slice();
      if (res === Infinity) break;
      bound = res;
    }
    return null;
  }
  
  function idaPhase2(startStateG1, prCP, prUDE, maxDepth = 18) {
    const path = [];
  
    function dfs(state, g, bound, lastMove) {
      const cp = getCPCoord(state.cp);
      const ude = getUDECoord(state.ep);
      const hv = h2(cp, ude, prCP, prUDE);
      if (g + hv > bound) return g + hv;
      if (cp === 0 && ude === 0) return true;
  
      let minNext = Infinity;
  
      for (const mv of MOVES_10) {
        if (lastMove && sameFace(lastMove, mv)) continue;
  
        const ns = structuredClone(state);
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
      const cp = getCPCoord(startStateG1.cp);
      const ude = getUDECoord(startStateG1.ep);
      return h2(cp, ude, prCP, prUDE);
      })();
  
    for (let depth = bound; depth <= maxDepth; depth++) {
      const res = dfs(structuredClone(startStateG1), 0, depth, null);
      if (res === true) return path.slice();
      if (res === Infinity) break;
      bound = res;
    }
    return null;
  }
  
  function kociembaSolveFromStickers() {
    // 1) Convert your current UI stickers to cubie state
    const st = stickersToCubie(); // {cp,co,ep,eo}
  
    // 2) Build pruning tables (for first working version, build at runtime)
    // Later you’ll cache these in localStorage or ship as precomputed blobs.
    const { prEO, prUDS, prCO } = buildPhase1Pruning();
    const { prCP, prUDE } = buildPhase2Pruning();
  
    // 3) Phase 1
    const seq1 = idaPhase1(structuredClone(st), prEO, prUDS, prCO, 14);
    if (!seq1) throw new Error("Phase 1 failed");
  
    // Apply seq1 to get G1 state
    const g1 = structuredClone(st);
    for (const mv of seq1) applyMoveCubie(g1, mv);
  
    // 4) Phase 2
    const seq2 = idaPhase2(g1, prCP, prUDE, 20);
    if (!seq2) throw new Error("Phase 2 failed");
  
    return seq1.concat(seq2);
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
      __setTimeout(function(){
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
  solveButton.onclick = () => {
      
      clearPendingTimeouts();
saveScramble();
      
      solution = [];
      solutionLine.textContent = "Solving...";
  
      let moves;
      try {
          moves = kociembaSolveFromStickers();
      } catch (e) {
          alert(e.message);
          return;
      }
  
      // Replace solution array with Kociemba output
      solution = moves.slice();
  
      // Reset cube to scrambled state (important!)
      reconstructScramble();
      updateCubeDisplay();
  
      solutionLine.textContent = solution.join(" ");
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
      console.warn("Unknown move token:", m);
  }
  
  function executionTimer(i){
      __setTimeout(function(){
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

};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __runApp);
} else {
  __runApp();
}