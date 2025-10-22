"use client"

import { useEffect, useRef } from "react"

export function AnimatedChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configuration
    const config = {
      color: '#06D6D6',
      lineWidth: 3,
      pointSpacing: 6,
      speed: 0.5,
      volatility: 0.035,
      upwardTrend: -1.5,
      baseDownwardShift: 0.08,
      minBoundary: 0.3, // 30% from top
      maxBoundary: 0.7  // 70% from top
    }

    let dataPoints: number[] = []
    let offset = 0
    let verticalOffset = 0
    let downwardShift = config.baseDownwardShift
    let animationFrame: number
    let drawProgress = 0 // 0 to 1, for initial drawing animation
    let isInitialAnimationComplete = false
    let outOfBoundsFrames = 0 // Track how long the line has been out of bounds

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initDataPoints()
    }

    // Initialize data points
    const initDataPoints = () => {
      if (canvas.width === 0 || canvas.height === 0) return

      dataPoints = []
      const numPoints = Math.ceil(canvas.width / config.pointSpacing)
      let currentY = canvas.height * 0.75

      for (let i = 0; i < numPoints; i++) {
        const randomChange = (Math.random() - 0.5) * canvas.height * config.volatility
        const bigMove = Math.random() < 0.05 ? (Math.random() - 0.5) * canvas.height * config.volatility * 4 : 0
        currentY = currentY + config.upwardTrend + randomChange + bigMove
        dataPoints.push(currentY)
      }

      verticalOffset = 0
    }

    // Draw function
    const draw = () => {
      if (canvas.width === 0 || canvas.height === 0) return

      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let displayPoints: { x: number; y: number }[] = []
      for (let i = 0; i < dataPoints.length; i++) {
        const x = i * config.pointSpacing - offset
        if (x > -config.pointSpacing && x < canvas.width + config.pointSpacing) {
          displayPoints.push({ x, y: dataPoints[i] + verticalOffset })
        }
      }

      if (displayPoints.length === 0) return

      // Apply initial drawing animation with easeOut
      if (!isInitialAnimationComplete) {
        // easeOut: fast start, slow end
        const easedProgress = 1 - Math.pow(1 - drawProgress, 3)
        const pointsToShow = Math.floor(displayPoints.length * easedProgress)
        displayPoints = displayPoints.slice(0, Math.max(1, pointsToShow))
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, config.color)
      gradient.addColorStop(1, 'rgba(6, 214, 214, 0)')

      // Draw filled area
      ctx.beginPath()
      ctx.moveTo(displayPoints[0].x, canvas.height)
      displayPoints.forEach(point => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.lineTo(displayPoints[displayPoints.length - 1].x, canvas.height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.3
      ctx.fill()

      // Draw line
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.strokeStyle = config.color
      ctx.lineWidth = config.lineWidth
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.moveTo(displayPoints[0].x, displayPoints[0].y)
      displayPoints.forEach(point => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()

      // Glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = config.color
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw circle at the rightmost point
      if (displayPoints.length > 0) {
        const lastPoint = displayPoints[displayPoints.length - 1]

        // Draw outer circle (white)
        ctx.beginPath()
        ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 0
        ctx.fill()

        // Draw border (cyan)
        ctx.beginPath()
        ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2)
        ctx.strokeStyle = config.color
        ctx.lineWidth = 3
        ctx.stroke()

        // Add glow to circle
        ctx.shadowBlur = 8
        ctx.shadowColor = config.color
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    // Check and adjust downward shift based on line position
    const adjustDownwardShift = () => {
      if (dataPoints.length === 0) return

      // Find the average Y position of visible points
      let sum = 0
      let curMin = canvas.height;
      let curMax = 0;
      for (let i = 0; i < dataPoints.length; i++) {
        curMax = Math.max(curMax, dataPoints[i] + verticalOffset);
        curMin = Math.min(curMin, dataPoints[i] + verticalOffset);
      }

      // Define thresholds
      const minY = canvas.height * config.minBoundary
      const maxY = canvas.height * config.maxBoundary

      // Adjust downward shift based on position
      if (curMin < minY) {
        // Line is too high (above threshold), increase downward shift
        outOfBoundsFrames++
        const distanceFromMin = (minY - curMin) / canvas.height
        // Multiply by time factor: more frames out of bounds = stronger correction
        const timeFactor = Math.min(outOfBoundsFrames / 20, 10) // Cap at 3x after 1 second
        downwardShift = config.baseDownwardShift + distanceFromMin * 2 * (1 + timeFactor)
      } else if (curMax > maxY) {
        // Line is too low (below threshold), decrease downward shift
        outOfBoundsFrames++
        const distanceFromMax = (curMax - maxY) / canvas.height
        // Multiply by time factor: more frames out of bounds = stronger correction
        const timeFactor = Math.min(outOfBoundsFrames / 20, 10) // Cap at 3x after 1 second
        downwardShift = Math.max(-config.baseDownwardShift, config.baseDownwardShift - distanceFromMax * 2 * (1 + timeFactor))
      } else {
        // Line is within bounds, reset counter and gradually return to base speed
        outOfBoundsFrames = 0
        downwardShift += (config.baseDownwardShift - downwardShift) * 0.1
      }
    }

    // Animation loop
    const animate = () => {
      if (dataPoints.length === 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      // Handle initial drawing animation (1 second)
      if (!isInitialAnimationComplete) {
        drawProgress += 1 / 90 // Assuming 60fps, 1 second = 60 frames
        if (drawProgress >= 1) {
          drawProgress = 1
          isInitialAnimationComplete = true
        }
      } else {
        // Adjust downward shift to keep line in bounds
        adjustDownwardShift()

        // Normal scrolling animation
        offset += config.speed
        verticalOffset += downwardShift

        if (offset >= config.pointSpacing) {
          offset -= config.pointSpacing
          dataPoints.shift()

          const lastPoint = dataPoints[dataPoints.length - 1]
          const randomChange = (Math.random() - 0.5) * canvas.height * config.volatility
          const bigMove = Math.random() < 0.05 ? (Math.random() - 0.5) * canvas.height * config.volatility * 3 : 0
          const newY = lastPoint + config.upwardTrend + randomChange + bigMove
          dataPoints.push(newY)
        }
      }

      draw()
      animationFrame = requestAnimationFrame(animate)
    }

    // Use ResizeObserver for better resize handling
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(container)

    // Initial setup
    resizeCanvas()
    animate()

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
