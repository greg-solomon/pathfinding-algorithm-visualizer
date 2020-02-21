import React, { useState } from 'react'
import Select from "react-select"
import { breadthFirstSearch, depthFirstSearch } from "../lib";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { Tooltip } from "@material-ui/core"
import { MdFlag, MdNavigation } from 'react-icons/md'
import "./styles/Controls.scss"
function Controls({ grid, setGrid, startNode, setStartNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, resetGrid }) {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
    const handleStartSelection = () => {
        if (isSelectingTarget) setIsSelectingTarget(false);
        setIsSelectingStart(!isSelectingStart);
    }
    const handleTargetSelection = () => {
        if (isSelectingStart) setIsSelectingStart(false);
        setIsSelectingTarget(!isSelectingTarget);
    }

    const handleVisualization = () => {

        switch (selectedAlgorithm) {
            case 0:
                const { visits: bfsVisits, path: bfsPath } = breadthFirstSearch(grid, startNode);
                animate(bfsVisits, bfsPath);
                break;
            case 1:
                let { visits: dfsVisits, path: dfsPath } = depthFirstSearch(grid, startNode);
                animate(dfsVisits, dfsPath);
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }

    const algorithmOptions = [
        { value: 0, label: `Breadth First Search ` },
        { value: 1, label: `Depth First Search` },
        { value: 2, label: `Dijkstra's Algorithm` },
        { value: 3, label: 'A* Algorithm' }
    ]

    return (
        <nav>
            <h2>Pathfinding Visualizer</h2>
            <div className="controls__menu">
                <button className="btn" onClick={resetGrid}>Reset Grid</button>
                <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
                    <Tooltip title="Set Start Node">
                        <ToggleButton
                            value={""}
                            color="primary"
                            selected={isSelectingStart}
                            onChange={handleStartSelection}
                        >
                            <MdNavigation size="2.5rem" color="green" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Set Target Node">
                        <ToggleButton
                            value={""}
                            color="primary"
                            selected={isSelectingTarget}
                            onChange={handleTargetSelection}
                        >
                            <MdFlag size="2.5rem" color="red" />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
                <div style={{ width: "200px", color: "black" }}>
                    <Select options={algorithmOptions} onChange={e => setSelectedAlgorithm(e.value)} />
                </div>
                <button className="btn" onClick={handleVisualization}>Visualize</button>
            </div>
        </nav>
    )
}

function animatePath(sortedPath) {
    for (let i = 0; i < sortedPath.length; i++) {
        setTimeout(() => {
            const { row, col } = sortedPath[i];
            document.querySelector(`.row-${row}_col-${col}`).classList.add('path');
        }, i * 7);
    }
}

function sortPath(path) {
    const ret = [];
    while (path.previous !== null) {
        ret.push(path);
        path = path.previous;
    }

    ret.push(path);
    return ret;
}

function animate(visits, path) {
    const sortedPath = sortPath(path);
    // animate search
    for (let i = 0; i < visits.length; i++) {
        if (i === visits.length - 1 && sortedPath !== null) {
            setTimeout(() => {
                document.querySelector(
                    `.row-${visits[visits.length - 1].row}_col-${visits[visits.length - 1].col}`
                ).classList.add("visited");
            }, i * 7)
            setTimeout(() => {
                animatePath(sortedPath);
            }, i * 7);
        } else {
            if (visits[i].isStart) console.log(`START`);
            setTimeout(() => {
                const cell = document.querySelector(
                    `.row-${visits[i].row}_col-${visits[i].col}`
                );
                cell.classList.add("visited");
            }, i * 7);
        }
    }
}
export default Controls
