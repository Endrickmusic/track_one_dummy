import React from "react"

const Controls = ({ onSelectPart, onRotate }) => {
  return (
    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
      <button onClick={() => onSelectPart("Up")}>Up</button>
      <button onClick={() => onSelectPart("Down")}>Down</button>
      <button onClick={() => onRotate("left")}>Left</button>
      <button onClick={() => onRotate("right")}>Right</button>
    </div>
  )
}

export default Controls
