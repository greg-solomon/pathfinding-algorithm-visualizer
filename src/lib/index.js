import { breadthFirstSearch } from './bfs';
import { depthFirstSearch } from "./dfs";
import { dijkstras } from "./dijkstra";

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


    return neighbors;
}
export { breadthFirstSearch, depthFirstSearch, getNeighbors, dijkstras };