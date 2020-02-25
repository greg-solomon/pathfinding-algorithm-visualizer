import React from 'react'
import { MdMenu } from 'react-icons/md'


function MobileControls({menuOpen, toggle}) {
  
  return (
    <div className="hide-large">
      <MdMenu size="2.5rem" onClick={() => toggle(!menuOpen)}/>
    </div>
  )
}

export default MobileControls
