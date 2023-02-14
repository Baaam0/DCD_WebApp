import React from 'react'

function Form({click, buttons}) {
  return (
   
    <form>
    <input placeholder='type the price' onSubmit={click} />
    <button onclick={buttons}>Category 1</button>
    <button onclick={buttons}>Category 2</button>
    <button onclick={buttons}>Category 3</button>
    <button onclick={buttons}>Category 4</button>
  </form>
  )
}

export default Form