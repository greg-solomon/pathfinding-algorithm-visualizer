function animatePath(sortedPath) {
  // put arrows in here later, display path length in info
  for (let i = 0; i < sortedPath.length; i++) {
    setTimeout(() => {
      const { row, col } = sortedPath[i];
      const pathNode = document.querySelector(`.row-${row}_col-${col}`)
      pathNode.classList.add('path');
      if (i !== 0 && i !== sortedPath.length - 1) {
        // pathNode.innerHTML = i;
      }
    }, i * 16);
  }
}

export function sortPath(path) {
  if (path === null) return null;
  const ret = [];
  while (path.previous !== null) {
    ret.push(path);
    path = path.previous;
  }

  if (path !== null) {
    ret.push(path);
  }
  return ret.reverse();
}

export function animate(visits, sortedPath) {
  // animate search
  for (let i = 0; i < visits.length; i++) {
    if (i === visits.length - 1 && sortedPath !== null) {
      setTimeout(() => {
        document.querySelector(`.row-${visits[i].row}_col-${visits[i].col}`).classList.add("visited");
      }, i * 16);

      setTimeout(() => {
        animatePath(sortedPath);
      }, i * 16);
    } 
    else {
      setTimeout(() => document.querySelector(`.row-${visits[i].row}_col-${visits[i].col}`).classList.add("visited"), i * 16);
    }
  }
}

