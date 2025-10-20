"use client"

import { useEffect, useRef } from "react"

export function AnimatedChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationFrame: number
    let offset = 0

    // Generate smooth curve points
    const generatePoints = (width: number, height: number) => {
      const points: { x: number; y: number }[] = []
      const segments = 50
      const amplitude = height * 0.15
      const centerY = height * 0.4

      for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i
        const progress = i / segments
        const y =
          centerY +
          Math.sin(progress * Math.PI * 4 + offset) * amplitude * 0.5 +
          Math.sin(progress * Math.PI * 2 + offset * 0.5) * amplitude * 0.3 -
          progress * amplitude * 0.8
        points.push({ x, y })
      }
      return points
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme color
      const isDark = document.documentElement.classList.contains("dark")
      const primaryColor = "#06D6D6"

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, isDark ? "rgba(6, 214, 214, 0.05)" : "rgba(6, 214, 214, 0.08)")
      gradient.addColorStop(1, isDark ? "rgba(6, 214, 214, 0)" : "rgba(6, 214, 214, 0.02)")

      const points = generatePoints(canvas.width, canvas.height)

      // Draw filled area
      ctx.beginPath()
      ctx.moveTo(points[0].x, canvas.height)
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw line
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw glow
      ctx.shadowBlur = 20
      ctx.shadowColor = primaryColor
      ctx.stroke()
      ctx.shadowBlur = 0

      offset += 0.01
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
