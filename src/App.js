import React, { useState, useEffect } from 'react';
import Controls from "./components/Controls";
import Board from "./components/Board";
const ROWS = 21;
const COLUMNS = 57;

function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMousePressed, toggleMousePressed] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [startNode, setStartNode] = useState({ row: 10, col: 1 });
  const [targetNode, setTargetNode] = useState({ row: 10, col: 55 });
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    if (!hasMounted) {
      setGrid(initializeGrid(ROWS, COLUMNS, startNode, targetNode));
      setHasMounted(true);
    }
  }, [hasMounted, startNode, targetNode]);

  const boardProps = { grid, setGrid, startNode, setStartNode, targetNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, isMousePressed, toggleMousePressed };
  const controlProps = { grid, setGrid, setStartNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget };
  return (
    <>
      <Controls {...controlProps} />
      <Board {...boardProps} />
    </>
  );
}


function initializeGrid(rows, columns, startNode, targetNode) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < columns; j++) {
      grid[i].push({
        row: i,
        col: j,
        isWall: false,
        isStart: startNode.row === i && startNode.col === j ? true : false,
        isTarget: targetNode.row === i && targetNode.col === j ? true : false,
      });
    }
  }
  return grid;
}

export default App;
