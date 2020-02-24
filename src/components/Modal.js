import React, { useState } from "react";
import "./styles/Modal.scss";
const Modal = ({setTutorialOpen}) => {
  const directions = [];
  const [step, setStep] = useState(0);
  return (
    <div className="modal-bg">
        <div className="modal-card">
        <h2 className="modal-title">Pathfinding Visualizer Tutorial</h2>
        <div className="modal-info">
          {step === 0 && 
            <>
              <p>Toggle walls by clicking and dragging over empty grid cells while "Wall" is selected in the menu</p>
              <video width="250px" height="250px" autoPlay={true} loop src="assets/walls.mp4" />
            </>
          }
          {step === 1 && 
            <>
              <p>Add weights by selecting a weighted algorithm and changing the draw mode to weight</p>
              <video width="450px" height="144px" autoPlay={true} loop src="assets/weights.mp4" />
            </>
          }
          {step === 2 && 
            <>
              <p>Once your walls and weights are drawn, select your algorithm and click visualize!</p>
            </>

          }

        </div>
        <div className="modal-controls">
        <button className="btn" onClick={() => setTutorialOpen(false)}>Close Tutorial</button>
        {step > 0 && <button className="btn-secondary" onClick={() => setStep(step-1)}>Back</button>}
        <button className="btn-secondary" onClick={() => setStep(step+1)}>Next</button>
        </div>
        </div>
      </div>
  );
}
export default Modal;