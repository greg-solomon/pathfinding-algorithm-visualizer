// import { getNeighbors } from './index'
export function breadthFirstSearch(nodes, startNode) {
  const grid = nodes.slice();
  const queue = [];
  const visits = [];

  const firstNode = grid[startNode.row][startNode.col];
  firstNode.hasVisited = true;
  firstNode.previous = null;

  queue.push(firstNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visits.push(currentNode);
    if (currentNode.isTarget) {
      currentNode.hasVisited = true;
      return { visits: visits, path: currentNode, grid };
    }
    getNeighbors(grid, currentNode, queue);
  }
  // no path
  return { visits: visits, path: null, grid };
}

function getNeighbors(grid, currNode, queue) {
  const { row, col } = currNode;

  if(row > 0 && !grid[row-1][col].isWall && !grid[row-1][col].hasVisited) {
    grid[row-1][col].hasVisited = true;
    grid[row-1][col].previous = currNode;
    queue.push(grid[row-1][col]);
  }

  if(col > 0 && !grid[row][col-1].isWall && !grid[row][col-1].hasVisited) {
    grid[row][col-1].hasVisited = true;
    grid[row][col-1].previous = currNode;
    queue.push(grid[row][col-1]);
  }

  if(row < grid.length - 1 && !grid[row+1][col].isWall && !grid[row+1][col].hasVisited) {
    grid[row+1][col].hasVisited = true;
    grid[row+1][col].previous = currNode;
    queue.push(grid[row+1][col]);
  }

  if(col < grid[0].length - 1 && !grid[row][col + 1].isWall && !grid[row][col+1].hasVisited) {
    grid[row][col+1].hasVisited = true;
    grid[row][col+1].previous = currNode;
    queue.push(grid[row][col+1]);
  } 
}