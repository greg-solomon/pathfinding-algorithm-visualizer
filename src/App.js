import React, { useState, useEffect } from 'react';
import Controls from "./components/Controls";
import Board from "./components/Board";
import Modal from "./components/Modal";
import { initializeGrid } from "./lib"
const ROWS = window.innerWidth <= 768 ? 12 : window.innerWidth > 1366 && window.innerHeight > 900 ? 24 : 16;
const COLUMNS = window.innerWidth <= 768 ? 12 : window.innerWidth > 1366 && window.innerHeight > 900 ? 48 : 36;

function App() {
  const [tutorialOpen,setTutorialOpen] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMousePressed, toggleMousePressed] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [isDrawingWalls, setIsDrawingWalls] = useState(true);
  const [startNode, setStartNode] = useState({ row: ROWS / 2, col: 1 });
  const [targetNode, setTargetNode] = useState({ row: ROWS/2, col: COLUMNS - 2 });
  const [grid, setGrid] = useState([]);
  const [menuOpen, toggle] = useState(false);  
  useEffect(() => {
    if (!hasMounted) {
      setGrid(initializeGrid(ROWS, COLUMNS, startNode, targetNode));
      setHasMounted(true);
    }
    console.log(`App renders`);
    console.log(`Rows `, ROWS, `Columns`, COLUMNS)

  }, [hasMounted, startNode, targetNode, grid, setGrid]);


  const resetGrid = () => {
    setIsDrawingWalls(true);
    document.querySelectorAll('.visited').forEach(visited => visited.classList.remove('visited'))
    document.querySelectorAll('.path').forEach(path => path.classList.remove('path'))
    setGrid(initializeGrid(ROWS, COLUMNS, startNode, targetNode));
    setHasAnimated(false);
  }

  const clearPath = () => {
    const gridCopy = grid.slice();
    gridCopy.forEach(row => row.forEach(node => {
      node.hasVisited = false
      node.previous = null;
    }));
    setGrid(gridCopy);
    document.querySelectorAll('.visited').forEach(visited => visited.classList.remove('visited'))
    document.querySelectorAll('.path').forEach(path => path.classList.remove('path'))
    setHasAnimated(false);
  }


  return (
    <div className="app" onMouseUp={() => toggleMousePressed(false)}>
      <Controls
        grid={grid}
        setGrid={setGrid}
        startNode={startNode}
        setStartNode={setStartNode}
        targetNode={targetNode}
        setTargetNode={setTargetNode}
        isSelectingStart={isSelectingStart}
        setIsSelectingStart={setIsSelectingStart}
        isSelectingTarget={isSelectingTarget}
        setIsSelectingTarget={setIsSelectingTarget}
        isMousePressed={isMousePressed}
        toggleMousePressed={toggleMousePressed}
        isDrawingWalls={isDrawingWalls}
        setIsDrawingWalls={setIsDrawingWalls}
        clearPath={clearPath}
        resetGrid={resetGrid}
        hasAnimated={hasAnimated}
        setHasAnimated={setHasAnimated}
        menuOpen={menuOpen}
        toggle={toggle}
      />
      <Board
        grid={grid}
        setGrid={setGrid}
        startNode={startNode}
        setStartNode={setStartNode}
        targetNode={targetNode}
        setTargetNode={setTargetNode}
        isSelectingStart={isSelectingStart}
        setIsSelectingStart={setIsSelectingStart}
        isSelectingTarget={isSelectingTarget}
        setIsSelectingTarget={setIsSelectingTarget}
        isMousePressed={isMousePressed}
        toggleMousePressed={toggleMousePressed}
        isDrawingWalls={isDrawingWalls}
        setIsDrawingWalls={setIsDrawingWalls}
      />
      {tutorialOpen && <Modal setTutorialOpen={setTutorialOpen}/>}
    </div>
  );
}




export default App;
