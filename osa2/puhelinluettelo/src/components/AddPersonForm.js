import React from 'react'

const AddPersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.nameOnChange} />
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.numberOnChange} />
        </div>
        <button type="submit">add</button>
      </form>
    )
}

export default AddPersonForm
