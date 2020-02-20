import React from 'react'
import { MdFlag, MdNavigation } from 'react-icons/md'

function Node({ row, col, isWall, isStart, isTarget, grid, setGrid, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, startNode, setStartNode, targetNode, setTargetNode, isMousePressed, toggleMousePressed }) {
    const handleMouseDown = e => {
        e.preventDefault();
        if (isSelectingStart) {
            const gridCopy = grid.slice();
            gridCopy[startNode.row][startNode.col].isStart = false;
            gridCopy[row][col].isStart = true;
            setStartNode({ row, col });
            setGrid(gridCopy);
            setIsSelectingStart(false);
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
        toggleMousePressed(true);
        const gridCopy = grid.slice();
        gridCopy[row][col].isWall = true;
        setGrid(gridCopy);
    }

    const handleMouseOver = e => {
        if (!isMousePressed) return;
        e.preventDefault();
        const gridCopy = grid.slice();
        gridCopy[row][col].isWall = true;
        setGrid(gridCopy);
    }

    const handleMouseUp = () => {
        toggleMousePressed(false);
    }
    return (
        <div
            className={`row-${row}_col-${col} node`}
            style={{ backgroundColor: isWall ? 'black' : "transparent" }}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseUp={handleMouseUp}
        >
            {/* isWall && <MdTexture size="3rem" color="yellow" />*/}
            {isStart && <MdNavigation size="3rem" color="green" />}
            {isTarget && <MdFlag size="3rem" color="red" />}
        </div>
    )
}

export default Node
