import { getNeighbors } from './index'
export function depthFirstSearch(nodes, startNode, random) {
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
    if (node.isTarget) return { visits, path: node, grid };

    const neighbors = getNeighbors(grid, node);
    if (random) {
      shuffle(neighbors).forEach(neighbor => stack.push(neighbor));
    } else {
      neighbors.forEach(neighbor => stack.push(neighbor));
    }
  }

  return { visits, path: null, grid };
}

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}