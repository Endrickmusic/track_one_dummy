import React, { useRef, useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useAnimationControl } from "./hooks/useAnimationControl"

const CubeModel = ({ selectedPart, onRotationFinished }) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/cube.glb")
  const { playExplodeAnimation } = useAnimationControl(animations, group)

  // Animation state
  const [props, set] = useSpring(() => ({ rotation: [0, 0, 0] }))
  const hasMounted = useRef(false)

  useEffect(() => {
    if (hasMounted.current && selectedPart) {
      // Play explode animation for the selected part
      playExplodeAnimation(selectedPart)

      // Rotate the cube based on the selected part
      const rotationAngle = selectedPart === "drums" ? -Math.PI / 2 : 0
      set({ rotation: [0, 0, rotationAngle], onRest: onRotationFinished })
    } else {
      // Rotate back to the default position if no part is selected
      set({ rotation: [0, 0, 0], onRest: onRotationFinished })
    }
    hasMounted.current = true
  }, [selectedPart, set, playExplodeAnimation, onRotationFinished, hasMounted])

  return (
    <animated.group ref={group} {...props} dispose={null}>
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
