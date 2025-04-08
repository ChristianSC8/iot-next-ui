import React from "react"
import { cx } from "@/utils/utils"

type DividerProps = {
  orientation?: "horizontal" | "vertical"
  className?: string
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      className={cx(
        "bg-primary-br",
        orientation === "horizontal"
          ? "w-full h-px "
          : "h-full w-px ",
        className
      )}
    />
  )
}
