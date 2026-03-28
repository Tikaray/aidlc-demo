import { useCallback } from 'react'

/**
 * Returns onMouseMove / onMouseLeave handlers that apply a 3D tilt
 * to the event's currentTarget based on cursor position.
 */
export default function useTilt(maxDeg = 6) {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -maxDeg
    const rotateY = ((x - cx) / cx) * maxDeg
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`
  }, [maxDeg])

  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = ''
  }, [])

  return { onMouseMove, onMouseLeave }
}
