import React from 'react'

const ProductForm = props => {
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
        onChange={props.handlChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={props.descrption}
        onChange={props.handlChange}
      />

      <label htmlFor="image">Image Link</label>
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
