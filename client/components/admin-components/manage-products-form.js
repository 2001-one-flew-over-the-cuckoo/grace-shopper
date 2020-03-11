import React from 'react'
import {withRouter} from 'react-router-dom'

const ProductForm = props => {
  return (
    <div className="prod-form-container">
      {props.location.pathname === '/products' ? (
        <h3>Add New Product</h3>
      ) : (
        <h3>Edit Product</h3>
      )}
      <form className="prod-form" onSubmit={props.handleSubmit}>
        <div className="prod-form-item">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={props.name}
            onChange={props.handleChange}
          />
        </div>

        <div className="prod-form-item">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={props.price}
            onChange={props.handleChange}
          />
        </div>

        <div className="prod-form-item">
          <label htmlFor="description">Description</label>
          <input
            className="description"
            type="textarea"
            name="description"
            value={props.description}
            onChange={props.handleChange}
          />
        </div>

        <div className="prod-form-item">
          <label htmlFor="image">Image Link (optional)</label>
          <input
            type="text"
            name="image"
            value={props.image}
            onChange={props.handleChange}
          />
        </div>

        <div className="prod-form-btn">
          <button type="submit" disabled={!props.name || !props.price}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(ProductForm)
