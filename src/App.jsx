import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import "./index.css"

import CubeModel from "./CubeModel"
import ControlPanel from "./ControlPanel"

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
        <Environment files="./textures/envmap.hdr" />
        <color attach="background" args={["#eeeeee"]} />
        <CubeModel />
      </Canvas>
      <ControlPanel />
    </>
  )
}
