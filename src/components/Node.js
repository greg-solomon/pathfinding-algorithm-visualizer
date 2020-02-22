import React from 'react'
import { MdFlag, MdNavigation } from 'react-icons/md'
import { FaWeightHanging } from 'react-icons/fa'
import { blue, red } from "@material-ui/core/colors"
const Node = React.memo((props) => {
  const { row, col, isWall, weight, handleMouseDown, handleMouseOver, handleMouseUp, isStart, isTarget } = props;
  let weightColor;
  switch (weight) {
    case 1:
    default:
      break;
    case 2:
      weightColor = blue[300];
      break;
    case 4:
      weightColor = blue[500];
      break;
    case 6:
      weightColor = red[200];
      break;
    case 8:
      weightColor = red[400];
      break;
    case 10:
      weightColor = red[800];
      break;
  }

  return (
    <div
      className={`row-${row}_col-${col} node ${isWall ? "wall" : ""}`}
      onMouseDown={e => handleMouseDown(e, row, col)}
      onMouseOver={e => handleMouseOver(e, row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStart && <MdNavigation size="3rem" color="green" />}
      {isTarget && <MdFlag size="3rem" color="red" />}
      {weight > 1 && <FaWeightHanging size="1.5rem" color={weightColor} />}
    </div>
  )
});

export default Node
