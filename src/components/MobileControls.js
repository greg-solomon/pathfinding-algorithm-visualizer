import React from 'react'
import { MdMenu } from 'react-icons/md'


function MobileControls({menuOpen, toggle, closeMenu}) {
  
  return (
    <div className="hide-large">
      <button className="btn" onClick={closeMenu}>Visualize</button> 
      <MdMenu size="2.5rem" onClick={() => toggle(!menuOpen)}/>
    </div>
  )
}

export default MobileControls
