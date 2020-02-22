import { breadthFirstSearch } from './bfs';
import { depthFirstSearch } from "./dfs";
import { dijkstras } from "./dijkstra";

function getNeighbors(grid, currentNode) {
  const neighbors = [];
  const { row, col, distance } = currentNode;

  // down neighbor
  if (row < grid.length - 1 && !grid[row + 1][col].hasVisited && !grid[row + 1][col].isWall) {
    grid[row + 1][col].hasVisited = true;
    grid[row + 1][col].distance = distance + 1;
    grid[row + 1][col].previous = currentNode;
    neighbors.push({
      ...grid[row + 1][col],

    });
  }

  // right neighbor
  if (col < grid[0].length - 1 && !grid[row][col + 1].hasVisited && !grid[row][col + 1].isWall) {
    grid[row][col + 1].hasVisited = true;
    grid[row][col + 1].distance = distance + 1;
    grid[row][col + 1].previous = currentNode;
    neighbors.push({
      ...grid[row][col + 1],
      previous: currentNode
    });
  }
  // up neighbor
  if (row > 0 && !grid[row - 1][col].hasVisited && !grid[row - 1][col].isWall) {
    grid[row - 1][col].hasVisited = true;
    grid[row - 1][col].distance = distance + 1;
    grid[row - 1][col].previous = currentNode;
    neighbors.push({
      ...grid[row - 1][col],
      previous: currentNode
    });
  }
  // left neighbor 
  if (col > 0 && !grid[row][col - 1].hasVisited && !grid[row][col - 1].isWall) {
    grid[row][col - 1].hasVisited = true;
    grid[row][col - 1].distance = distance + 1;
    neighbors.push({
      ...grid[row][col - 1],
      previous: currentNode,
    });
  }





  return neighbors;
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
        hasVisited: false,
        distance: Infinity,
        weight: 1
      });
    }
  }
  return grid;
}
export { breadthFirstSearch, depthFirstSearch, getNeighbors, dijkstras, initializeGrid };