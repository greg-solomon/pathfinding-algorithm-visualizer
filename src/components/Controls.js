import React, { useState } from 'react'
import Info from "./Info"
import Select from "react-select"
import { breadthFirstSearch, depthFirstSearch, dijkstras, animate, aStar } from "../lib";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { Tooltip } from "@material-ui/core"
import { MdFlag, MdNavigation } from 'react-icons/md'
import "./styles/Controls.scss"

function Controls({ clearPath, grid, setGrid, startNode, targetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, resetGrid, isDrawingWalls, setIsDrawingWalls }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);

  const clearWeights = () => {
    const gridCopy = grid.slice();
    gridCopy.forEach(row => row.forEach(node => node.weight = 1));
    setGrid(gridCopy);
  }

  const handleStartSelection = () => {
    if (isSelectingTarget) setIsSelectingTarget(false);
    setIsSelectingStart(!isSelectingStart);
  }

  const handleTargetSelection = () => {
    if (isSelectingStart) setIsSelectingStart(false);
    setIsSelectingTarget(!isSelectingTarget);
  }

  const handleVisualization = () => {
    if (hasAnimated) clearPath();
    switch (selectedAlgorithm) {
      case 0:
        const { visits: bfsVisits, path: bfsPath, grid: bfsGrid } = breadthFirstSearch(grid, startNode);
        animate(bfsVisits, bfsPath);
        console.log(`Visits`, bfsVisits, `Path`, bfsPath, `Grid`, bfsGrid);
        setGrid(bfsGrid);
        break;
      case 1:
        const { visits: dfsRVisits, path: dfsRPath, grid: dfsRGrid } = depthFirstSearch(grid, startNode, true);
        animate(dfsRVisits, dfsRPath);
        setGrid(dfsRGrid);
        break;
      case 2:
        const { visits: dfsOVisits, path: dfsOPath, grid: dfsOGrid } = depthFirstSearch(grid, startNode, false);
        animate(dfsOVisits, dfsOPath);
        setGrid(dfsOGrid);
        break;
      case 3:
        const { visits: dijkstrasVisits, path: dijkstrasPath, grid: dijkstraGrid } = dijkstras(grid, startNode);
        console.log(dijkstrasPath)
        animate(dijkstrasVisits, dijkstrasPath);
        setGrid(dijkstraGrid);
        break;
      case 4:
        // A*
        const { visits: aStarVisits, path: aStarPath, grid: aStarGrid } = aStar(grid, startNode, targetNode);
        console.log(`Path`, aStarPath);
        console.log(`Visits`, aStarVisits);
        console.log(`Grid`, aStarGrid);
        // animate(aStarVisits, aStarPath);
        setGrid(aStarGrid);
        break;
      default:
        break;
    }
    setHasAnimated(true);
  }

  const handleDrawingWalls = () => {
    if (!isDrawingWalls) {
      setIsDrawingWalls(true);
    }
  }

  const handleDrawingWeights = () => {
    if (selectedAlgorithm < 3) return;
    if (isDrawingWalls) {
      setIsDrawingWalls(false);
    }
  }

  const algorithmOptions = [
    { value: 0, label: `Breadth First Search ` },
    { value: 1, label: `Depth First Search (Random)` },
    { value: 2, label: `Depth First Search (Ordered)` },
    { value: 3, label: `Dijkstra's Algorithm` },
    { value: 4, label: 'A* Algorithm' }
  ]

  const handleAlgorithmChange = e => {
    if (e.value < 3) {
      clearWeights();
    }
    setSelectedAlgorithm(e.value);
  }
  return (
    <>
      <nav>
        <h2>Pathfinding Visualizer</h2>
        <div className="controls__menu">
          <button className="btn" onClick={clearPath}>Clear Path</button>
          <button className="btn" onClick={resetGrid}>Reset Grid</button>
          <div className="toggle-button-group">
            <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
              <Tooltip title={<span className="tooltip">Set Start Node</span>}>
                <ToggleButton
                  value={""}
                  color="primary"
                  selected={isSelectingStart}
                  onChange={handleStartSelection}
                >
                  <MdNavigation size="2.5rem" color="rgb(35, 146, 104)" />
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
          </div>
          <div className="toggle-button-group">
            <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
              <Tooltip title="Draw Walls">
                <ToggleButton
                  value={""}
                  color="primary"
                  onChange={handleDrawingWalls}
                  style={{ color: "white", fontWeight: "bold", letterSpacing: "0.0725rem", backgroundColor: isDrawingWalls ? "rgb(35, 146, 104)" : "transparent" }}
                >
                  Wall
              </ToggleButton>
              </Tooltip>
              <Tooltip title={selectedAlgorithm >= 3 ? "Draw Weights" : "Select a weighted algorithm to use weights"}>
                <ToggleButton
                  value={""}
                  color="primary"
                  onChange={handleDrawingWeights}
                  style={{ color: "white", fontWeight: "bold", letterSpacing: "0.0725rem", backgroundColor: !isDrawingWalls ? "rgb(35, 146, 104)" : "transparent" }}
                >
                  Weight
              </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </div>
          <div style={{ width: "280px", color: "black" }}>
            <Select options={algorithmOptions} onChange={handleAlgorithmChange} placeholder="Algorithm..." defaultValue={null} />
          </div>
          <button className="btn" onClick={handleVisualization}>Visualize</button>
        </div>
      </nav >
      <Info selectedAlgorithm={selectedAlgorithm} />
    </>
  )
}


export default Controls
