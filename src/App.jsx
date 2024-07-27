import React, { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import CubeModel from "./CubeModel"
import Controls from "./ControlPanel"

const App = () => {
  const [selectedPart, setSelectedPart] = useState("vocals")
  console.log(selectedPart)

  const handleSelectPart = (part) => {
    setSelectedPart(part)
  }

  const handleRotatePart = (direction) => {
    console.log(`Rotating ${direction}`)
    // Additional rotation logic if needed
  }

  return (
    <>
      <Canvas>
        <OrbitControls />
        <pointLight position={[0, 10, 8]} intensity={50} />
        <pointLight position={[-5, -10, -5]} intensity={120} />
        <pointLight position={[2, -3, 2]} intensity={40} />
        <CubeModel
          selectedPart={selectedPart}
          onRotationFinished={() => console.log("Rotation finished")}
        />
      </Canvas>
      <Controls onSelectPart={handleSelectPart} onRotate={handleRotatePart} />
    </>
  )
}

export default App
