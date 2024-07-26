import { useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function CubeModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/dummy_ani_03.glb")
  const { actions, names } = useAnimations(animations)

  // Animation control logic here

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
}

useGLTF.preload("/dummy_ani_03.glb")
