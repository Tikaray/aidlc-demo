import React, { useEffect, useRef } from 'react'

/**
 * Renders a soft radial spotlight that follows the mouse cursor.
 * Attach to any container — it positions itself via pointer events.
 */
export default function MouseSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let x = -500, y = -500

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(59,130,246,0.04) 0%, transparent 100%)`
    }
    const leave = () => {
      el.style.background = 'none'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 1,
        transition: 'background 0.1s ease',
      }}
    />
  )
}
