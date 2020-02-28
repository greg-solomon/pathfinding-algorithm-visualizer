import React, { useState } from 'react'
import Info from "./Info"
import DesktopControls from "./DesktopControls"
import MobileControls from "./MobileControls"
import SideMenu from "./SideMenu";
import { breadthFirstSearch, depthFirstSearch, dijkstras, animate, aStar, sortPath } from "../lib";

import "./styles/Controls.scss"

function Controls({ menuOpen, toggle, hasAnimated, setHasAnimated, clearPath, grid, setGrid, startNode, targetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget, resetGrid, isDrawingWalls, setIsDrawingWalls }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  
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

    setHasAnimated(true);
    switch (selectedAlgorithm) {
      case 0:
        const { visits: bfsVisits, path: bfsPath, grid: bfsGrid } = breadthFirstSearch(grid, startNode);
        const sortedBfs = sortPath(bfsPath);
        animate(bfsVisits, sortedBfs);
        setGrid(bfsGrid);
        break;
      case 1:
        const { visits: dfsRVisits, path: dfsRPath, grid: dfsRGrid } = depthFirstSearch(grid, startNode, true);
        const sortedDfsR = sortPath(dfsRPath);
        animate(dfsRVisits, sortedDfsR);
        setGrid(dfsRGrid);
        break;
      case 2:
        const { visits: dfsOVisits, path: dfsOPath, grid: dfsOGrid } = depthFirstSearch(grid, startNode, false);
        const sortedDfsO = sortPath(dfsOPath)
        animate(dfsOVisits, sortedDfsO);
        setGrid(dfsOGrid);
        break;
      case 3:
        const { visits: dijkstrasVisits, path: dijkstrasPath, grid: dijkstraGrid } = dijkstras(grid, startNode);
        const sortedDijkstra = sortPath(dijkstrasPath);
        animate(dijkstrasVisits, sortedDijkstra);
        setGrid(dijkstraGrid);
        break;
      case 4:
        // A*
        const { visits: aStarVisits, path: aStarPath, grid: aStarGrid } = aStar(grid, startNode, targetNode);
        const sortedAStar = sortPath(aStarPath);
        animate(aStarVisits, sortedAStar);
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
    { value: 3, label: `Dijkstra's Algorithm (Weighted)` },
    { value: 4, label: 'A* Search (Weighted)' }
  ]

  const handleAlgorithmChange = e => {
    if (e.value < 3) {
      clearWeights();
    }
    setSelectedAlgorithm(e.value);
  }

  const visualizeAndCloseMenu = () => {
    handleVisualization();
    toggle(false);
  }
  return (
    <>
      <nav>
        <h2 className="controls__title">Pathfinding Visualizer</h2>
         <DesktopControls 
          handleStartSelection={handleStartSelection}
          handleTargetSelection={handleTargetSelection}
          handleVisualization={handleVisualization}
          handleDrawingWalls={handleDrawingWalls}
          handleDrawingWeights={handleDrawingWeights}
          algorithmOptions={algorithmOptions}
          handleAlgorithmChange={handleAlgorithmChange}
          clearPath={clearPath}
          resetGrid={resetGrid}
          isSelectingStart={isSelectingStart}
          isSelectingTarget={isSelectingTarget}
          isDrawingWalls={isDrawingWalls}
        />  
        <MobileControls 
          menuOpen={menuOpen}
          toggle={toggle}
          closeMenu={visualizeAndCloseMenu}
        />
      </nav >
      <SideMenu 
        handleStartSelection={handleStartSelection}
        handleTargetSelection={handleTargetSelection}
        handleVisualization={handleVisualization}
        handleDrawingWalls={handleDrawingWalls}
        handleDrawingWeights={handleDrawingWeights}
        algorithmOptions={algorithmOptions}
        handleAlgorithmChange={handleAlgorithmChange}
        clearPath={clearPath}
        resetGrid={resetGrid}
        isSelectingStart={isSelectingStart}
        isSelectingTarget={isSelectingTarget}
        isDrawingWalls={isDrawingWalls}
        menuOpen={menuOpen}
        toggle={toggle}
      />
      <Info selectedAlgorithm={selectedAlgorithm} />
    </>
  )
}

export default Controls;
