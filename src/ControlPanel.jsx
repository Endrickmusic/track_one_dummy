import React from "react"

const Controls = ({ onSelectPart, onRotate }) => {
  return (
    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
      <button onClick={() => onSelectPart("drums")}>Select Drums</button>
      <button onClick={() => onSelectPart("vocals")}>Select Vocals</button>
      <button onClick={() => onRotate("left")}>Rotate Left</button>
      <button onClick={() => onRotate("right")}>Rotate Right</button>
    </div>
  )
}

export default Controls
