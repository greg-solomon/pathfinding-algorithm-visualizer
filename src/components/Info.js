import React, { useState, useEffect } from 'react'
import { MdFlag, MdNavigation } from 'react-icons/md'
function Info({ selectedAlgorithm }) {
  const [infoText, setInfoText] = useState("");
  useEffect(() => {
    switch (selectedAlgorithm) {
      case -1:
      default:
        setInfoText("Select an algorithm from the dropdown");
        break;
      case 0:
        setInfoText("Breadth First Search is unweighted and always finds the shortest path");
        break;
      case 1:
      case 2:
        setInfoText("Depth First Search is unweighted and does not always find the shortest path");
        break;
      case 3:
        setInfoText("Dijkstra's is weighted and always finds the shortest path");
        break;
      case 4:
        setInfoText('A* Search is weighted and always finds the shortest path')

    }
  }, [infoText, selectedAlgorithm])

  return (
    <div className="info__wrapper">
      <div className="info">
        <div className="legend">
          <ul>
            <li>Empty Node<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }} /></li>
            <li>Wall<div className="node wall" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }} /></li>
          </ul>
          <ul>
            <li>Visited<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", backgroundColor: "rgb(109, 169, 236)", cursor: "unset" }} /></li>
            <li>Path<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", backgroundColor: "rgb(35, 146, 104)", cursor: "unset" }} /></li>
          </ul>
          <ul>
            <li>Start<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }}><MdNavigation color="rgb(35, 146, 104)" size="2rem" /></div></li>
            <li>Target<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }}><MdFlag size="2rem" color="red" /></div></li>
          </ul>
        </div>
        <div className="algorithm__info">
          <p>Create walls by clicking and dragging on the grid!</p>
          <p>{infoText}</p>
        </div>
      </div>
    </div>
  )
}

export default Info
