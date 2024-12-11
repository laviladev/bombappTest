import { JSX } from "solid-js"

interface CardProps {
  children: JSX.Element;
  class: string;
}
const Card = (props: CardProps) => {
  return (
    <div class="grid place-items-center min-h-screen">
      <div
        classList={{"rounded-[16px]": true, [props.class]: true}}
        style={{
          "border": "1px solid rgb(235 235 235)",
          "-webkit-box-shadow": "0px 0px 15px -12px rgba(0,0,0,0.75)",
          "-moz-box-shadow": "0px 0px 15px -12px rgba(0,0,0,0.75)",
          "box-shadow": "0px 0px 15px -12px rgba(0,0,0,0.75)",
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Card
