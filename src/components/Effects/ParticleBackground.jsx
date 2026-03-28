import React, { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []
    const mouse = { x: -9999, y: -9999, radius: 180 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 2 + 0.5
        this.size = this.baseSize
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.baseOpacity = Math.random() * 0.4 + 0.1
        this.opacity = this.baseOpacity
        // Each particle has a slight color variation
        this.hue = 210 + Math.random() * 30 // blue range
      }
      update() {
        // Mouse attraction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          // Attract towards mouse
          this.vx += Math.cos(angle) * force * 0.08
          this.vy += Math.sin(angle) * force * 0.08
          // Grow and brighten near mouse
          this.size = this.baseSize + force * 3
          this.opacity = Math.min(this.baseOpacity + force * 0.6, 1)
        } else {
          this.size += (this.baseSize - this.size) * 0.05
          this.opacity += (this.baseOpacity - this.opacity) * 0.05
        }

        // Friction
        this.vx *= 0.98
        this.vy *= 0.98

        this.x += this.vx
        this.y += this.vy

        // Wrap around edges
        if (this.x < -10) this.x = canvas.width + 10
        if (this.x > canvas.width + 10) this.x = -10
        if (this.y < -10) this.y = canvas.height + 10
        if (this.y > canvas.height + 10) this.y = -10
      }
      draw() {
        // Glow effect for particles near mouse
        if (this.size > this.baseSize + 0.5) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity * 0.1})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`
        ctx.fill()
      }
    }

    const COUNT = 80
    for (let i = 0; i < COUNT; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mouse glow aura
      if (mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius)
        grad.addColorStop(0, 'rgba(59, 130, 246, 0.06)')
        grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.02)')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(mouse.x - mouse.radius, mouse.y - mouse.radius, mouse.radius * 2, mouse.radius * 2)
      }

      particles.forEach(p => { p.update(); p.draw() })

      // Draw connections — brighter near mouse
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            // Check if either particle is near mouse for brighter lines
            const midX = (particles[i].x + particles[j].x) / 2
            const midY = (particles[i].y + particles[j].y) / 2
            const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2)
            const nearMouse = mouseDist < mouse.radius

            const alpha = nearMouse
              ? 0.15 * (1 - dist / 160)
              : 0.04 * (1 - dist / 160)

            ctx.beginPath()
            ctx.strokeStyle = nearMouse
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = nearMouse ? 1 : 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        // Draw lines from particles to mouse when close
        const dx = mouse.x - particles[i].x
        const dy = mouse.y - particles[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius * 0.8) {
          const alpha = 0.12 * (1 - dist / (mouse.radius * 0.8))
          ctx.beginPath()
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
