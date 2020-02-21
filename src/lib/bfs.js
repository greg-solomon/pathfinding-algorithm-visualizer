import { getNeighbors } from './index'
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