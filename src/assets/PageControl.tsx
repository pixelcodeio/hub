import * as React from "react"

export const PageControl: React.FC = (props) => {
  return (
    <svg width={33} height={6} viewBox="0 0 33 6" fill="none" {...props}>
      <circle cx={3} cy={3} r={3} fill="#707173" />
      <circle cx={12} cy={3} r={3} fill="#E3E3E3" />
      <circle cx={21} cy={3} r={3} fill="#E3E3E3" />
      <circle cx={30} cy={3} r={3} fill="#E3E3E3" />
    </svg>
  )
}
