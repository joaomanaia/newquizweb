"use client"

import { motion } from "framer-motion"

/**
 * CircleProgress component
 * 
 * @param value - The float value of the progress (0..1)
 */
interface CircleProgressProps {
  value: number
  width: number
  strokeWith: number
  className?: string
}

export const CircleProgress: React.FC<CircleProgressProps> = ({ value, width, strokeWith = width / 10 }) => {  const radius = (width - 20) / 2

  const circumference = 2 * Math.PI * radius

  const offset = circumference - value * circumference

  return (
    <svg width={width} height={width} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-surfaceVariant"
        style={{
          strokeDasharray: circumference,
          strokeWidth: strokeWith,
        }}
      />

      <motion.circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-primary -rotate-90 transform origin-center"
        initial={{
          strokeDasharray: circumference,
          strokeDashoffset: 0,
          strokeWidth: strokeWith,
        }}
        animate={{ strokeDashoffset: offset }}
        transition={{
          stiffness: 260,
          damping: 20,
          duration: 1,
          ease: "linear",
        }}
      />
    </svg>
  )
}

/* export const CircleProgress: React.FC<CircleProgressProps> = ({ value, width }) => {
  const percentage = Math.min(Math.max(value, 0), 100)
  const radius = (width - 20) / 2

  const circumference = 2 * Math.PI * radius

  const offset = circumference - (percentage / 100) * circumference

  const strokeWith = width / 10

  return (
    <svg width={width} height={width} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-surfaceVariant"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: 0,
          strokeWidth: strokeWith,
        }}
      />

      <motion.circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-primary -rotate-90 transform origin-center"
        initial={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          strokeWidth: strokeWith,
        }}
        animate={{ strokeDashoffset: offset }}
        transition={{
          stiffness: 260,
          damping: 20,
          delay: 0.5,
          duration: 1,
          ease: "easeOut",
        }}
      />
    </svg>
  )
} */
