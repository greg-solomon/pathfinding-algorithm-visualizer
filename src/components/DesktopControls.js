import React from 'react'
import { Tooltip } from "@material-ui/core"
import { MdFlag, MdNavigation } from 'react-icons/md'
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import Select from "react-select"

function DesktopControls({clearPath, resetGrid, isSelectingStart, handleStartSelection, isSelectingTarget, handleTargetSelection, handleDrawingWalls, selectedAlgorithm, isDrawingWalls, handleDrawingWeights, algorithmOptions, handleAlgorithmChange, handleVisualization}) {
  return (
    <div className="controls__menu show-large">
          <button className="btn" onClick={clearPath}>Clear Path</button>
          <button className="btn" onClick={resetGrid}>Reset Grid</button>
          <div className="toggle-button-group">
            <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
              <Tooltip title={<span className="tooltip">Set Start Node</span>}>
                <ToggleButton
                  value={""}
                  color="primary"
                  selected={isSelectingStart}
                  onChange={handleStartSelection}                  
                >
                  <MdNavigation size="2rem" color="rgb(35, 146, 104)" />
                </ToggleButton>
              </Tooltip>
              <Tooltip title="Set Target Node">
                <ToggleButton
                  value={""}
                  color="primary"
                  selected={isSelectingTarget}
                  onChange={handleTargetSelection}
                >
                  <MdFlag size="2rem" color="red" />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </div>
          <div className="toggle-button-group">
            <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
              <Tooltip title="Draw Walls">
                <ToggleButton
                  value={""}
                  color="primary"
                  onChange={handleDrawingWalls}
                  style={{ color: "white", fontWeight: "bold", letterSpacing: "0.0725rem", backgroundColor: isDrawingWalls ? "rgb(35, 146, 104)" : "transparent", fontSize: "0.75rem" }}
                >
                  Wall
              </ToggleButton>
              </Tooltip>
              <Tooltip title={selectedAlgorithm >= 3 ? "Draw Weights" : "Select a weighted algorithm to use weights"}>
                <ToggleButton
                  value={""}
                  color="primary"
                  onChange={handleDrawingWeights}
                  style={{ color: "white", fontWeight: "bold", letterSpacing: "0.0725rem", backgroundColor: !isDrawingWalls ? "rgb(35, 146, 104)" : "transparent", fontSize: "0.75rem" }}
                >
                  Weight
              </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </div>
          <div style={{ width: "240px", color: "black",fontSize: "0.75rem" }}>
            <Select 
              options={algorithmOptions}
              onChange={handleAlgorithmChange} 
              isSearchable={false}
              placeholder="Algorithm..." 
              defaultValue={null}  />
          </div>
          <button className="btn" onClick={handleVisualization}>Visualize</button>
        </div>
  )
}

export default DesktopControls
