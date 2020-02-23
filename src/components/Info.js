import React, { useState, useEffect } from 'react'
import { FaWeightHanging } from "react-icons/fa"
import { blue, red } from "@material-ui/core/colors"
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

    }
  }, [infoText, selectedAlgorithm])

  return (
    <div className="info__wrapper">
      <div className="info">
        <div className="legend">
          <h2 style={{ marginRight: "1rem" }}>Node Types</h2>
          <ul>
            <li>Empty Node<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }} /></li>
            <li>Wall<div className="node wall" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", cursor: "unset" }} /></li>
          </ul>
          <ul>
            <li>Visited<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", backgroundColor: "rgba(0, 190, 218, 0.75)", cursor: "unset" }} /></li>
            <li>Path<div className="node" style={{ height: "1.7vw", width: "1.7vw", marginLeft: "1rem", backgroundColor: "rgb(255, 217, 0)", cursor: "unset" }} /></li>
          </ul>
        </div>
        <div className="algorithm__info">
          <p>Create walls by clicking and dragging on the grid!</p>
          <p>{infoText}</p>
        </div>
        <div className="weight__legend">
          <h2>Weight Values</h2>
          <ul>
            <li><span>1</span> <FaWeightHanging size="2rem" color={blue[100]} style={{ marginLeft: "1rem" }} /></li>
            <li><span>2</span> <FaWeightHanging size="2rem" color={blue[300]} style={{ marginLeft: "1rem" }} /></li>
          </ul>
          <ul>
            <li><span>4</span> <FaWeightHanging size="2rem" color={blue[500]} style={{ marginLeft: "1rem" }} /></li>
            <li><span>6</span> <FaWeightHanging size="2rem" color={red[200]} style={{ marginLeft: "1rem" }} /></li>
          </ul>
          <ul>
            <li><span>8</span> <FaWeightHanging size="2rem" color={red[400]} style={{ marginLeft: "1rem" }} /></li>
            <li><span>10</span> <FaWeightHanging size="2rem" color={red[800]} style={{ marginLeft: "1rem" }} /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Info
