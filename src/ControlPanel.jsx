// ControlPanel.js
export default function ControlPanel() {
  // Logic for handling button clicks

  return (
    <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
      <button onClick={() => handleUpDown("up")}>Up</button>
      <button onClick={() => handleUpDown("down")}>Down</button>
      <button onClick={() => handleRotation("left")}>Left</button>
      <button onClick={() => handleRotation("right")}>Right</button>
    </div>
  )
}
