import React from 'react'
import { MdFlag, MdNavigation } from 'react-icons/md'
const Node = React.memo((props) => {
  const { row, col, isWall, weight, handleMouseDown, handleMouseOver, handleMouseUp, isStart, isTarget } = props;
  

  return (
    <div
      className={`row-${row}_col-${col} node ${isWall ? "wall" : ""}`}
      onMouseDown={e => handleMouseDown(e, row, col)}
      onMouseOver={e => handleMouseOver(e, row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStart && <MdNavigation size="3rem" color="rgb(35, 146, 104)" />}
      {isTarget && <MdFlag size="3rem" color="red" />}
      {weight !== 1 && `${weight}x`}
    </div>
  )
});

export default Node
