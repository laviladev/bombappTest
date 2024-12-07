const Card = (props) => {
  return (
    <div class="grid place-items-center min-h-screen">
      <div class="h-[160px] aspect aspect-[2] rounded-[16px] shadow-[0_0_0_4px_hsl(0_0%_0%_/_15%)]">
        {props.children}
      </div>
    </div>
  )
}

export default Card
