import React from 'react'
import { Tooltip } from "@material-ui/core"
import { MdFlag, MdNavigation } from 'react-icons/md'
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import Select from "react-select"
import {useSpring, animated} from "react-spring"

function SideMenu({menuOpen, toggle,clearPath, resetGrid, isSelectingStart, handleStartSelection, isSelectingTarget, handleTargetSelection, handleDrawingWalls, selectedAlgorithm, isDrawingWalls, handleDrawingWeights, algorithmOptions, handleAlgorithmChange, handleVisualization}) {

  const menuAnimation = useSpring({
    transform: menuOpen ?  `translateX(0%)` : `translateX(100%)`
  });

  const handlePathClear = () => {
    clearPath()
    toggle(false);
  }

  const handleGridReset = () => {
    resetGrid();
    toggle(false);
  }

  const handleStartSelectionAndCloseMenu = () => {
    handleStartSelection();
    toggle(false);
  }

  const handleTargetSelectionAndCloseMenu = () => {
    handleTargetSelection();
    toggle(false);
  }

  const visualizeAndCloseMenu = () => {
    handleVisualization();
    toggle(false);
  }




  return (
    <animated.div className="controls__mobile__menu hide-large" style={menuAnimation}>
      <button className="btn" style={{position: "absolute", top: 0, right: 0, marginTop: "1rem", marginRight: "1rem"}} onClick={() => toggle(false)}>Close Menu</button>
      <div>
        <button className="btn" onClick={handlePathClear}>Clear Path</button>
        <button className="btn" onClick={handleGridReset}>Reset Grid</button>
      </div>
      <div className="toggle-button-group" style={{margin: "2rem 0"}}>
            <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
              <Tooltip title={<span className="tooltip">Set Start Node</span>}>
                <ToggleButton
                  value={""}
                  color="primary"
                  selected={isSelectingStart}
                  onChange={handleStartSelectionAndCloseMenu}                  
                >
                  <MdNavigation size="2rem" color="rgb(35, 146, 104)" />
                </ToggleButton>
              </Tooltip>
              
              <Tooltip title="Set Target Node">
                <ToggleButton
                  value={""}
                  color="primary"
                  selected={isSelectingTarget}
                  onChange={handleTargetSelectionAndCloseMenu}
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
        <div style={{ width: "80%", color: "black",fontSize: "0.75rem", margin: "2rem auto" }}>
          <Select 
            options={algorithmOptions} 
            onChange={handleAlgorithmChange} 
            placeholder="Algorithm..." 
            isSearchable={false}
            defaultValue={null}  /> 
        </div>
        <button className="btn" onClick={visualizeAndCloseMenu}>Visualize</button>  
      </animated.div>
  )
}

export default SideMenu
