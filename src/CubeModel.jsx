import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { useGLTF } from "@react-three/drei"
import { useAnimationControl } from "./hooks/useAnimationControl.jsx"

const parts = ["drums", "vocals", "highs", "mids", "lows"]

const CubeModel = forwardRef((props, ref) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/cube.glb")
  const { selectPart, rotatePart, selectedPart, playAnimation } =
    useAnimationControl(animations, group)

  useEffect(() => {
    console.log("CubeModel mounted")
    selectPart(parts[0])
  }, [])

  const handleUpDown = (direction) => {
    console.log("CubeModel handleUpDown called with direction:", direction)
    const currentIndex = parts.indexOf(selectedPart)
    const newIndex =
      direction === "up"
        ? (currentIndex + 1) % parts.length
        : (currentIndex - 1 + parts.length) % parts.length
    selectPart(parts[newIndex])
  }

  useImperativeHandle(
    ref,
    () => ({
      handleUpDown,
      rotatePart,
    }),
    [selectedPart]
  )

  console.log("CubeModel rendering")

  return (
    <group ref={group} {...props} dispose={null} position={[0, -2, 0]}>
      <group name="Scene">
        <group name="Cube" position={[0, 2, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh
            name="0_drums"
            castShadow
            receiveShadow
            geometry={nodes["0_drums"].geometry}
            material={materials.Material}
            position={[-1.621, 0.3, 0]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            name="1_vocals"
            castShadow
            receiveShadow
            geometry={nodes["1_vocals"].geometry}
            material={materials.Material}
            position={[0.606, 2.12, 0]}
          />
          <mesh
            name="2_highs"
            castShadow
            receiveShadow
            geometry={nodes["2_highs"].geometry}
            material={materials.Material}
            position={[0.606, 0.908, 0]}
          />
          <mesh
            name="3_mids"
            castShadow
            receiveShadow
            geometry={nodes["3_mids"].geometry}
            material={materials.Material}
            position={[0.606, -0.307, 0]}
          />
          <mesh
            name="4_lows"
            castShadow
            receiveShadow
            geometry={nodes["4_lows"].geometry}
            material={materials.Material}
            position={[0.606, -1.519, 0]}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload("./models/cube.glb")

export default CubeModel
