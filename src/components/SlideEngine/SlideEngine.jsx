import React, { useState, useCallback, useEffect, useRef } from 'react'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'
import ParticleBackground from '../Effects/ParticleBackground'
import MouseSpotlight from '../Effects/MouseSpotlight'
import './SlideEngine.css'

export default function SlideEngine({ slides }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [animating, setAnimating] = useState(false)
  const containerRef = useRef(null)

  const total = slides.length

  const goTo = useCallback((index) => {
    if (animating || index === current || index < 0 || index >= total) return
    setDirection(index > current ? 1 : -1)
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 450)
  }, [current, total, animating])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Touch swipe support
  const touchRef = useRef({ startX: 0, startY: 0 })
  const onTouchStart = useCallback((e) => {
    touchRef.current.startX = e.touches[0].clientX
    touchRef.current.startY = e.touches[0].clientY
  }, [])
  const onTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX
    const dy = e.changedTouches[0].clientY - touchRef.current.startY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
  }, [next, prev])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (e.key === 'Escape') { e.preventDefault(); goTo(1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, goTo])

  const CurrentSlide = slides[current]?.component

  return (
    <div className="slide-engine" ref={containerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <ParticleBackground />
      <MouseSpotlight />
      <div className="slide-viewport">
        <div
          className="slide-container"
          key={current}
          style={{
            animation: `slideIn${direction > 0 ? 'Right' : 'Left'} 0.4s cubic-bezier(0.16,1,0.3,1) forwards`
          }}
        >
          {CurrentSlide && <CurrentSlide goTo={goTo} current={current} total={total} />}
        </div>
        {current > 1 && (
          <button
            onClick={() => goTo(1)}
            aria-label="返回目录"
            style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(20,27,45,0.7)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 12, padding: '5px 10px', borderRadius: 8,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              transition: 'all 0.25s ease', zIndex: 5,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
              e.currentTarget.style.color = 'var(--color-primary-light)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ◂ 目录
          </button>
        )}
      </div>
      <Navigation current={current} total={total} onPrev={prev} onNext={next} />
      <ProgressBar current={current} total={total} />
    </div>
  )
}
