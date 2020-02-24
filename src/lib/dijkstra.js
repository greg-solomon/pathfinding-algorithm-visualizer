import { getNeighbors } from './index'
export function dijkstras(nodes, startNode) {
  const grid = nodes.slice();
  const visits = [];
  grid[startNode.row][startNode.col].distance = 0;
  grid[startNode.row][startNode.col].previous = null;

  const unvisited = getNodes(grid);

  while (unvisited.length) {
    sortNodesByDistance(unvisited);
    const closestNode = unvisited.shift();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return { visits, path: null, grid };

    closestNode.hasVisited = true;
    visits.push(closestNode);

    if (closestNode.isTarget) return { visits, path: closestNode, grid };
    getNeighbors(grid, closestNode);
  }
  return { visits, path: null, grid};
}

function sortNodesByDistance(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}
function getNodes(nodes) {
  const allNodes = [];
  nodes.forEach(row => {
    row.forEach(node => {
      allNodes.push(node);
    })
  });
  return allNodes;
}