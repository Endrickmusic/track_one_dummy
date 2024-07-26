// hooks/useAnimationControl.js

import { useState, useEffect } from "react"
import { useAnimations } from "@react-three/drei"
import { LoopOnce } from "three"

export function useAnimationControl(animations, group) {
  const { actions, names } = useAnimations(animations, group)
  const [selectedPart, setSelectedPart] = useState(null)

  const playAnimation = (animationName, loop = false) => {
    const action = actions[animationName]
    if (action) {
      action.reset().play()
      if (!loop) {
        action.clampWhenFinished = true
        action.loop = LoopOnce
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
        // playAnimation("drums_deselect")
      }
      // stopAnimation(`drums_deselect`)
      console.log(`stop Animation`)
    }

    setSelectedPart(part)
    // playAnimation(`${selectedPart}_explode`)

    console.log(`here should play the explode animation`)
  }

  const rotatePart = (direction) => {
    if (!selectedPart) return
    if (direction === "left") {
      playAnimation(`${selectedPart}_explode`)
    } else if (direction === "right") {
      playAnimation(`${selectedPart}_deexplode`)
    }
  }

  return {
    selectPart,
    rotatePart,
    selectedPart,
    playAnimation,
    stopAnimation,
  }
}
