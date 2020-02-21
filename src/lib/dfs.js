import { getNeighbors } from './index'
export function depthFirstSearch(nodes, startNode) {
    const grid = nodes.slice();
    const stack = [];
    const visits = [];

    const currentNode = grid[startNode.row][startNode.col];
    currentNode.previous = null;
    currentNode.hasVisited = true;
    stack.push(currentNode);
    while (stack.length > 0) {
        const node = stack.pop();
        visits.push(node);
        if (node.isTarget) return { visits, path: node };

        const neighbors = getNeighbors(grid, node);
        neighbors.forEach(neighbor => stack.push(neighbor));
    }

    return { visits, path: null };
}