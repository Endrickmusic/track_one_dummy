// components/App.js

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CubeModel from "./CubeModel.jsx"
import { ControlPanel } from "./ControlPanel"

export default function App() {
  const cubeRef = useRef()

  const handleUpDown = (direction) => {
    console.log("handleUpDown called with direction:", direction)
    console.log("cubeRef.current:", cubeRef.current)
    cubeRef.current?.handleUpDown(direction)
  }

  const handleRotate = (direction) => {
    cubeRef.current?.rotatePart(direction)
  }

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.0} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.35}
          penumbra={0.5}
          intensity={180}
        />
        <CubeModel ref={cubeRef} />
      </Canvas>
      <ControlPanel onUpDown={handleUpDown} onRotate={handleRotate} />
    </>
  )
}
