import { JSX, mergeProps } from "solid-js"

interface ButtonProps {
  icon?: JSX.Element
  caption: string
  class?: string
  id: string
  type?: "button" | "submit" | "reset" | undefined
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const mergedProps = mergeProps({ type: "button" as ButtonProps["type"] }, props)
  const defaultClass = "inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  
  const hanldeClick = () => {
    if (mergedProps.onClick) mergedProps.onClick()
  }
  
  return (
    <button
      type={mergedProps.type}
      class={`${defaultClass} ${mergedProps.class}`}
      id={mergedProps.id}
      onClick={hanldeClick}
    >
      {mergedProps.icon}
      {mergedProps.caption}
    </button>
  )
}

export default Button
