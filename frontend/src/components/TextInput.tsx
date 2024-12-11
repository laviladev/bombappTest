import { Accessor } from "solid-js"

interface InputProps {
  type?: string
  name: string
  caption: string
  required?: boolean
  class?: string
  value?: Accessor<string>
  placeholder?: string
  containerClass?: string
  onChange: (value: string) => void
}

const TextInput = (props: InputProps) => {

  const inputDefaultClass = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    console.log(target.value)
    props.onChange(target.value)
  }

  return (
    <div class={props.containerClass}>
      <label for="email" class="block text-sm/6 font-medium text-gray-900">{props.caption}</label>
      <div class="mt-2">
        <input
          type={props.type || "text"}
          name={props.name}
          autocomplete="off"
          required={props.required}
          placeholder={props.placeholder}
          class={`${props.class} ${inputDefaultClass}`}
          value={props.value && props.value()}
          onInput={handleChange}
        />
      </div>
    </div>
  )
}

export default TextInput
