import React from 'react'

const ProductForm = props => {
  console.log('hello')
  console.log('props', props)
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        name="name"
        value={props.name}
        onChange={props.handleChange}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={props.price}
        onChange={props.handleChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="textarea"
        name="description"
        value={props.description}
        onChange={props.handleChange}
      />

      <label htmlFor="image">Image Link (optional)</label>
      <input
        type="text"
        name="image"
        value={props.image}
        onChange={props.handleChange}
      />

      <button type="submit" disabled={!props.name || !props.price}>
        Submit
      </button>
    </form>
  )
}

export default ProductForm
