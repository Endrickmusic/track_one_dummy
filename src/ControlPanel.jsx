// components/ControlPanel.js

import React from "react"

export function ControlPanel({ onUpDown, onRotate }) {
  return (
    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
      <button
        onClick={() => {
          console.log("Up button pressed")
          onUpDown("up")
        }}
      >
        Up
      </button>
      <button
        onClick={() => {
          console.log("Down button pressed")
          onUpDown("down")
        }}
      >
        Down
      </button>
      <button onClick={() => onRotate("left")}>Left</button>
      <button onClick={() => onRotate("right")}>Right</button>
    </div>
  )
}
