// hooks/useAnimationControl.js

import { useCallback } from "react"
import { useAnimations } from "@react-three/drei"
import { LoopOnce } from "three"

export function useAnimationControl(animations, group) {
  const { actions } = useAnimations(animations, group)

  const playAnimation = useCallback(
    (animationName) => {
      const action = actions[animationName]
      if (action) {
        const duration = action.getClip().duration
        action.reset().setLoop(LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()
      } else {
        console.error(`Animation ${animationName} not found`)
      }
    },
    [actions]
  )

  const playExplodeAnimation = useCallback(
    (part) => {
      playAnimation(`${part}_explode`)
    },
    [playAnimation]
  )

  const playSelectAnimation = useCallback(
    (part) => {
      const parts = ["drums", "vocals", "highs", "mids", "lows"]
      parts.forEach((p) => {
        if (p !== part) playExplodeAnimation(p)
      })
      playAnimation(`vocals_select`)
    },
    [playExplodeAnimation, playAnimation]
  )

  const playDeselectAnimation = useCallback(
    (part) => {
      playAnimation(`${part}_deselect`)
    },
    [playAnimation]
  )

  return {
    playSelectAnimation,
    playDeselectAnimation,
  }
}
