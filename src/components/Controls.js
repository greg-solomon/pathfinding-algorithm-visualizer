import React from 'react'
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { Tooltip } from "@material-ui/core"
import { MdFlag, MdNavigation } from 'react-icons/md'
import "./styles/Controls.scss"
function Controls({ grid, setGrid, setStartNode, setTargetNode, isSelectingStart, setIsSelectingStart, isSelectingTarget, setIsSelectingTarget }) {

    const handleStartSelection = () => {
        if (isSelectingTarget) setIsSelectingTarget(false);
        setIsSelectingStart(!isSelectingStart);
    }
    const handleTargetSelection = () => {
        if (isSelectingStart) setIsSelectingStart(false);
        setIsSelectingTarget(!isSelectingTarget);
    }
    return (
        <nav>
            <h2>Pathfinding Visualizer</h2>
            <div className="controls__menu">
                <ToggleButtonGroup exclusive style={{ backgroundColor: "transparent" }}>
                    <Tooltip title="Set Start Node">
                        <ToggleButton
                            value={""}
                            color="primary"
                            selected={isSelectingStart}
                            onChange={handleStartSelection}
                        >
                            <MdNavigation size="2.5rem" color="green" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Set Target Node">
                        <ToggleButton
                            value={""}
                            color="primary"
                            selected={isSelectingTarget}
                            onChange={handleTargetSelection}
                        >
                            <MdFlag size="2.5rem" color="red" />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </div>
        </nav>
    )
}

export default Controls
