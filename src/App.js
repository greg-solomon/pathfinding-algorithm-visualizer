import React, { useState, useEffect } from 'react';
import Controls from "./components/Controls";
import Board from "./components/Board";
import { initializeGrid } from "./lib"
const ROWS = 24;
const COLUMNS = 48;

function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMousePressed, toggleMousePressed] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [isDrawingWalls, setIsDrawingWalls] = useState(true);
  const [startNode, setStartNode] = useState({ row: 12, col: 1 });
  const [targetNode, setTargetNode] = useState({ row: 12, col: 46 });
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    if (!hasMounted) {
      setGrid(initializeGrid(ROWS, COLUMNS, startNode, targetNode));
      setHasMounted(true);
    }
    console.log(`App renders`);

  }, [hasMounted, startNode, targetNode, grid, setGrid]);


  const resetGrid = () => {
    setIsDrawingWalls(true);
    document.querySelectorAll('.visited').forEach(visited => visited.classList.remove('visited'))
    document.querySelectorAll('.path').forEach(path => path.classList.remove('path'))
    setGrid(initializeGrid(ROWS, COLUMNS, startNode, targetNode));
  }

  const clearPath = () => {
    const gridCopy = grid.slice();
    gridCopy.forEach(row => row.forEach(node => {
      node.hasVisited = false
      delete node.previous;
    }));
    setGrid(gridCopy);
    document.querySelectorAll('.visited').forEach(visited => visited.classList.remove('visited'))
    document.querySelectorAll('.path').forEach(path => path.classList.remove('path'))
  }

  return (
    <div onMouseUp={() => toggleMousePressed(false)}>
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
    </div>
  );
}




export default App;
