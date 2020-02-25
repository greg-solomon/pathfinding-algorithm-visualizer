import React from 'react'
import Node from "./Node"
import "./styles/Board.scss"
function Board({ grid, setGrid, startNode, setStartNode, targetNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, isMousePressed, toggleMousePressed, isDrawingWalls, setIsDrawingWalls }) {
  const handleMouseDown = (e, row, col) => {
    e.preventDefault();
    toggleMousePressed(true);
    if (isSelectingStart) {
      const gridCopy = grid.slice();
      gridCopy[startNode.row][startNode.col].isStart = false;
      gridCopy[row][col].isStart = true;
      setStartNode({ row, col });
      setGrid(gridCopy);
      setIsSelectingStart(false);
      return;
    }

    if (isSelectingTarget) {
      const gridCopy = grid.slice();
      gridCopy[targetNode.row][targetNode.col].isTarget = false;
      gridCopy[row][col].isTarget = true;
      setTargetNode({ row, col });
      setGrid(gridCopy);
      setIsSelectingTarget(false);
      return;
    }

    const gridCopy = grid.slice();
    if (grid[row][col].isStart || grid[row][col].isTarget) return;
    if (isDrawingWalls) {
      gridCopy[row][col].isWall = !gridCopy[row][col].isWall;
    } else {
      let weightToAdd = gridCopy[row][col].weight === 1 ? 1 : 2;
      console.log(weightToAdd);
      console.log(gridCopy[row][col].weight)
      gridCopy[row][col].weight = gridCopy[row][col].weight + weightToAdd;
      if (gridCopy[row][col].weight > 10) gridCopy[row][col].weight = 1;
    }
    setGrid(gridCopy);

  }

  const handleMouseOver = (e, row, col) => {
    e.preventDefault();
    if (!isMousePressed) return;
    if (grid[row][col].isStart || grid[row][col].isTarget) return;

    if (isDrawingWalls) {
      const gridCopy = grid.slice();
      gridCopy[row][col].isWall = !gridCopy[row][col].isWall;
      setGrid(gridCopy);
    }



  }

  const handleMouseUp = () => {
    toggleMousePressed(false);
    return;
  }
  const columns = window.innerWidth <= 768 ? `repeat(12,1fr)` : window.innerWidth > 1366 && window.innerHeight > 900 ? `repeat(48,1fr)` : `repeat(36,1fr)`
  const rows = window.innerWidth <= 768 ? `repeat(12,1fr)` : window.innerWidth > 1366 && window.innerHeight > 900 ? `repeat(24,1fr)` : `repeat(16,1fr)`
  return (
    <div className="board__wrapper">
      <div className="board" style={{gridTemplateColumns: columns, gridTemplateRows: rows }}>
        {grid.map((row, rowIdx) => {
          return row.map((node, nodeIdx) => {
            return <Node
              key={nodeIdx}
              {...node}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
              handleMouseUp={handleMouseUp}
            />
          })
        })}
      </div>
    </div>
  )
}

export default Board
