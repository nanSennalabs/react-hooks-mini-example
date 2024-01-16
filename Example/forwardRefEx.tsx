() => {
    const ref = React.useRef(null);
  
    const alertText = () => {
      const input = ref.current
      if (input.value) alert(input.value)
      else input.focus()
    }
  
    const InputText = React.forwardRef((props, ref) => (
      <input ref={ref} {...props} />
    ))
  
    return (
      <>
        <InputText ref={ref} placeholder="Enter text..." />
        <button onClick={alertText}>Focus</button>
      </>
    )
  }