# rubiks-cube-solver

Interactive **3×3 Rubik’s Cube** tool: paint a scramble on a 2D net, perform face turns, and view a computed solution sequence.  
Built with **HTML, CSS, JavaScript** (no frameworks). **Runs in the browser.**

**Live demo:** https://bradenrflournoy.github.io/rubiks-cube-solver/

## Features
- **Clickable net** for all six faces (U, D, F, B, L, R) with a **color picker** (G/B/W/Y/O/R).  
- **Turn controls**: `U, U', U2, … R, R', R2, …` buttons generated at runtime (also Reset/Scramble/Solve/Execute).  
- **Solution display** panel shows the move sequence.  
- **Responsive UI** with compact tiles and accessible labels.

## Run Locally
Just open `index.html` in your browser.

**(Recommended) Local server**
```bash
python -m http.server 8000
# visit http://localhost:8000/
