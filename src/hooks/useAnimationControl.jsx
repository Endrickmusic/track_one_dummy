// hooks/useAnimationControl.js

import { useState, useCallback } from "react"
import { useAnimations } from "@react-three/drei"
import { LoopOnce } from "three"

export function useAnimationControl(animations, group, cube) {
  const { actions, names } = useAnimations(animations, group)
  console.log(names)
  const [selectedPart, setSelectedPart] = useState("vocals")
  console.log("selectedPart:", selectedPart)

  const playAnimation = useCallback(
    (animationName) => {
      const action = actions[animationName]
      if (action) {
        // Get the duration of the animation in seconds
        const duration = action.getClip().duration
        console.log(
          `Playing animation: ${animationName}, Duration: ${duration} seconds`
        )
        // Reset and play the animation with LoopOnce
        action.clampWhenFinished = true // Ensures it stops at the last frame
        action.reset().setLoop(LoopOnce, 2)
        action.play()
        // console.log(action.clampWhenFinished)
      } else {
        console.error(`Animation ${animationName} not found`)
      }
    },
    [actions]
  )

  const playExplodeAnimation = () => {
    playAnimation(`drums_explode`)
    playAnimation(`vocals_explode`)
    playAnimation(`highs_explode`)
    playAnimation(`mids_explode`)
    playAnimation(`lows_explode`)
  }

  const playDrumsSelect = () => {
    playAnimation(`drums_select`)
    playExplodeAnimation()
  }

  const playDrumsDeSelect = () => {
    playAnimation(`drums_deselect`)
    playExplodeAnimation()
  }

  const selectPart = useCallback(
    (part) => {
      console.log("selectPart called with:", part)
      playDrumsSelect()
      setSelectedPart(part)
    },
    [selectedPart, playAnimation, playDrumsSelect]
  )

  const rotatePart = useCallback(
    (direction) => {
      playDrumsDeSelect()
      console.log(actions.drums_deselect.clampWhenFinished)
    },
    [selectedPart, playAnimation, playDrumsDeSelect]
  )

  return {
    selectPart,
    rotatePart,
    selectedPart,
    playAnimation,
  }
}
