import { useCallback } from "react"
import { LoopOnce } from "three"
import { useAnimations } from "@react-three/drei"

export function useAnimationControl(animations, group) {
  const { actions } = useAnimations(animations, group)

  const playAnimation = useCallback(
    (animationName) => {
      const action = actions[animationName]

      if (action) {
        // Log the duration of the animation
        const duration = action.getClip().duration
        console.log(
          `Playing animation: ${animationName}, Duration: ${duration} seconds`
        )
        action.loop = LoopOnce
        action.clampWhenFinished = true
        action.reset().play()
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

  return {
    playExplodeAnimation,
  }
}
