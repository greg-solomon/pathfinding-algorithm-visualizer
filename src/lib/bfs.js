export function breadthFirstSearch(nodes, startNode) {
    const grid = nodes.slice();
    const queue = [];
    const visits = [];

    const firstNode = grid[startNode.row][startNode.col];
    firstNode.distance = 0;
    firstNode.hasVisited = true;
    firstNode.previous = null;

    queue.push(firstNode);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visits.push(currentNode);
        if (currentNode.isTarget) {
            currentNode.hasVisited = true;
            return { visits: visits, path: currentNode };
        }
        const neighbors = getNeighbors(grid, currentNode);

        neighbors.forEach(node => {
            queue.push(node);
        });
    }
    // no path
    return { visits: grid, path: null };
}

function getNeighbors(grid, currentNode) {
    const neighbors = [];
    const { row, col, distance } = currentNode;
    // left neighbor 
    if (col > 0 && !grid[row][col - 1].hasVisited && !grid[row][col - 1].isWall) {
        grid[row][col - 1].hasVisited = true;
        grid[row][col - 1].distance = distance + 1;
        neighbors.push({
            ...grid[row][col - 1],
            previous: currentNode,
        });
    }
    // right neighbor
    if (col < grid[0].length - 1 && !grid[row][col + 1].hasVisited && !grid[row][col + 1].isWall) {
        grid[row][col + 1].hasVisited = true;
        grid[row][col + 1].distance = distance + 1;
        neighbors.push({
            ...grid[row][col + 1],
            previous: currentNode
        });
    }
    // up neighbor
    if (row > 0 && !grid[row - 1][col].hasVisited && !grid[row - 1][col].isWall) {
        grid[row - 1][col].hasVisited = true;
        grid[row - 1][col].distance = distance + 1;
        neighbors.push({
            ...grid[row - 1][col],
            previous: currentNode
        });
    }

    // down neighbor
    if (row < grid.length - 1 && !grid[row + 1][col].hasVisited && !grid[row + 1][col].isWall) {
        grid[row + 1][col].hasVisited = true;
        grid[row + 1][col].distance = distance + 1;
        neighbors.push({
            ...grid[row + 1][col],
            previous: currentNode
        });
    }
    return neighbors;
}