import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import SingleProduct from './components/SingleProduct'
import Products from './components/products'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path="/products" component={Products} />
      <Route path="/products/:productId" component={SingleProduct} />
      <Routes />
    </div>
  )
}

export default App
