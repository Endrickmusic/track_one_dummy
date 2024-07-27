import React, { useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CubeModel from "./CubeModel"
import Controls from "./ControlPanel"

const parts = ["drums", "vocals", "highs", "mids", "lows"]

const App = () => {
  const [selectedPart, setSelectedPart] = useState("vocals")
  const [rotationDirection, setRotationDirection] = useState(null)

  const handleSelectPart = useCallback(
    (direction) => {
      const currentIndex = parts.indexOf(selectedPart)
      let newIndex
      if (direction === "up") {
        newIndex = (currentIndex + 1) % parts.length
      } else if (direction === "down") {
        newIndex = (currentIndex - 1 + parts.length) % parts.length
      }
      setSelectedPart(parts[newIndex])
      console.log(`Selected part: ${selectedPart}`)
    },
    [selectedPart]
  )

  const handleRotatePart = useCallback((direction) => {
    setRotationDirection(direction)
    // Log the rotation direction
    console.log(`Rotating ${direction}`)
  }, [])

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
