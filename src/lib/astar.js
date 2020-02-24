// g cost -> distance from start node
// h cost -> distance from end node
export function aStar(gridNodes, startingNode, targetNode) {
  const grid = gridNodes.slice();
  const { row: startRow, col: startCol } = startingNode;

  const openList = [];
  const closedList = [];

  grid[startRow][startCol].f = 0;
  grid[startRow][startCol].g = 0;
  grid[startRow][startCol].previous = null;
  openList.push(grid[startRow][startCol]);
  
  while(openList.length) {
    openList.sort((a, b) => a.f - b.f);

    const current = openList.shift();
    closedList.push(current);
    // generate q's 4 successors
    if(current.isTarget) {
      return { visits: closedList, path: current, grid };
    }

    const neighbors = [];
    getNeighbors(grid, current,neighbors);

    neighbors.forEach(n => {
      if (!closedList.includes(n)) {
        var tempG = current.g + n.weight;
        if(openList.includes(n)) {
          if(tempG < n.g) {
            n.g = tempG;
          }
        } else {
          n.g = tempG;
          openList.push(n)
        }
        
        n.h = heuristic(n, targetNode);
        n.f = n.g + n.h;
        n.previous = current;
      }
    });
    
  }
  // no solution
}


function heuristic(current, target) {
    const { row: targetRow, col: targetCol } = target;
    const { row: currentRow, col: currentCol} = current;

    let y = Math.abs(targetRow - currentRow);
    let x = Math.abs(targetCol - currentCol);
    return y + x;
}


function getNeighbors(grid, current, neighbors) {
  const { row, col } = current;

  if(row > 0  && !grid[row-1][col].isWall) {
    neighbors.push(grid[row-1][col]);
  }

  if(col > 0 && !grid[row][col-1].isWall) {
    neighbors.push(grid[row][col-1]);
  }

  if(row < grid.length - 1  && !grid[row+1][col].isWall) {
    neighbors.push(grid[row+1][col]);
  }

  if(col < grid[0].length - 1  && !grid[row][col+1].isWall) {
    neighbors.push(grid[row][col+1]);
  }
}

