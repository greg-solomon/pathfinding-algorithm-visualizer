import React from 'react'
import Node from "./Node"
import "./styles/Board.scss"
function Board({ grid, setGrid, startNode, setStartNode, targetNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, isMousePressed, toggleMousePressed }) {
    const nodeProps = { grid, setGrid, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, startNode, setStartNode, targetNode, setTargetNode, isMousePressed, toggleMousePressed };
    return (
        <div className="board__wrapper">
            {grid.map((row, rowIdx) => {
                return row.map((node, nodeIdx) => {
                    return <Node {...node} key={nodeIdx} {...nodeProps} />
                })
            })}
        </div>
    )
}

export default Board
