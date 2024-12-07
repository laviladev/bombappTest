import { createEffect } from "solid-js"

interface InputProps {
  type?: string
  name: string
  caption: string
  required?: boolean
  class?: string
  value?: string | number
  onChange: (value: string) => void
}

const Input = (props: InputProps) => {

  const inputDefaultClass = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
  
  createEffect(() => {
    console.log(props.value)
  })

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    console.log(target.value)
    props.onChange(target.value)
  }

  return (
    <div>
      <label for="email" class="block text-sm/6 font-medium text-gray-900">{props.caption}</label>
      <div class="mt-2">
        <input
          type={props.type || "text"}
          name={props.name}
          autocomplete="off"
          required={props.required}
          class={`${props.class} ${inputDefaultClass}`}
          value={props.value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Input
