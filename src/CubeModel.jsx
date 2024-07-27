import React, { useRef, useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useAnimationControl } from "./hooks/useAnimationControl"

const CubeModel = ({ selectedPart, previousPart, onRotationFinished }) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/cube.glb")
  const { playSelectAnimation, playDeselectAnimation } = useAnimationControl(
    animations,
    group
  )

  // Animation state
  const [props, set] = useSpring(() => ({ rotation: [0, 0, 0] }))
  const hasMounted = useRef(false)
  const [rotationProps, setRotation] = useSpring(() => ({
    rotation: [0, 0, 0],
  }))

  useEffect(() => {
    if (previousPart && previousPart !== selectedPart) {
      playDeselectAnimation(previousPart)
    }
    if (selectedPart) {
      playSelectAnimation(selectedPart)

      // Rotate the cube based on the selected part
      const rotationAngle = selectedPart === "drums" ? -Math.PI / 2 : 0
      setRotation({
        rotation: [0, 0, rotationAngle],
        onRest: onRotationFinished,
      })
    } else {
      // Rotate back to the default position if no part is selected
      setRotation({ rotation: [0, 0, 0], onRest: onRotationFinished })
    }
  }, [
    selectedPart,
    previousPart,
    setRotation,
    playSelectAnimation,
    playDeselectAnimation,
    onRotationFinished,
  ])

  return (
    <animated.group ref={group} {...rotationProps} dispose={null}>
      <group name="Scene">
        <group name="Cube" position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <mesh
            name="0_drums"
            castShadow
            receiveShadow
            geometry={nodes["0_drums"].geometry}
            material={materials.Material}
            position={[-1.521, 0, 0]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            name="1_vocals"
            castShadow
            receiveShadow
            geometry={nodes["1_vocals"].geometry}
            material={materials.Material}
            position={[0.506, 1.52, 0]}
          />
          <mesh
            name="2_highs"
            castShadow
            receiveShadow
            geometry={nodes["2_highs"].geometry}
            material={materials.Material}
            position={[0.506, 0.508, 0]}
          />
          <mesh
            name="3_mids"
            castShadow
            receiveShadow
            geometry={nodes["3_mids"].geometry}
            material={materials.Material}
            position={[0.506, -0.507, 0]}
          />
          <mesh
            name="4_lows"
            castShadow
            receiveShadow
            geometry={nodes["4_lows"].geometry}
            material={materials.Material}
            position={[0.506, -1.519, 0]}
          />
        </group>
      </group>
    </animated.group>
  )
}

useGLTF.preload("/models/cube.glb")

export default CubeModel
