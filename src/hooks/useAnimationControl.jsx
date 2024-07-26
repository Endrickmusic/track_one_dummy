// hooks/useAnimationControl.js

import { useState, useEffect } from "react"
import { useAnimations } from "@react-three/drei"

export function useAnimationControl(animations) {
  const { actions, names } = useAnimations(animations)
  const [selectedPart, setSelectedPart] = useState(null)

  console.log("Available animations:", Object.keys(animations))
  console.log("Available actions:", names)

  const playAnimation = (animationName, loop = false) => {
    const action = actions[animationName]
    if (action) {
      action.reset().play()
      if (!loop) {
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
      }
    } else {
      console.error(`Animation ${animationName} not found`)
    }
  }

  const stopAnimation = (animationName) => {
    const action = actions[animationName]
    console.log(actions)
    if (action) {
      action.stop()
    }
  }

  const selectPart = (part) => {
    if (selectedPart === part) return

    if (selectedPart) {
      // Deselect current part
      if (selectedPart === "drums") {
        playAnimation("drums_deselect")
        // actions["drums_deselect"].reset().play()
        console.log("if drums selected, play drums deselect")
      }
      // stopAnimation(`${selectedPart}_select`)
      stopAnimation(`drums_select`)
      // actions["drums_select"].reset().play()
      console.log(`stop Animation`)
    }

    setSelectedPart(part)
    // playAnimation(`${part}_select`)
    // playAnimation(`${part}_explode`)
    playAnimation(`vocals_explode`)
    // actions["drums_select"].reset().play()
    console.log(`here should play the explode animation`)
  }

  const rotatePart = (direction) => {
    if (!selectedPart) return
    // playAnimation(`${selectedPart}_rotate_${direction}`)
    playAnimation(`${selectedPart}_explode`)
    actions["drums_select"].reset().play()
    // console.log(`${selectedPart}_rotate_${direction}`)
    console.log("rotation")
  }

  return {
    selectPart,
    rotatePart,
    selectedPart,
    playAnimation,
    stopAnimation,
  }
}
